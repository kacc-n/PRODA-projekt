let markers = [];          // Pole pro uložení všech markerů
let dKeyHeld = false;      // Sleduje, jestli je stisknuta klávesa "D"
let startPoint = null;     // Počáteční bod pro kreslení obdélníku
let rectangle = null;      // Obdélník kreslený při držení klávesy "D"
let currentMouse = null;   // Aktuální pozice kurzoru myši

// Posluchač událostí pro stisk klávesy
document.addEventListener('keydown', (e) => {
    // Pokud se stiskne D a ještě není držena
    if (e.key === 'd' && !dKeyHeld) {
        dKeyHeld = true;
        map.getContainer().style.cursor = 'crosshair';  // Změní kurzor
    }

    // Pokud se stiskne A a máme zaznamenanou pozici myši
    if (e.key === 'a' && currentMouse) {
        const marker = L.marker(currentMouse).addTo(map);  // Přidá marker
        markers.push(marker);                              // Uloží do pole
    }
});

// Posluchač událostí pro uvolnění klávesy
document.addEventListener('keyup', (e) => {
    if (e.key === 'd') {
        dKeyHeld = false;
        map.getContainer().style.cursor = '';  // Resetuje kurzor

        if (rectangle) {
            const bounds = rectangle.getBounds();  // Získá hranice obdélníku

            // Odstraní všechny markery uvnitř obdélníku
            markers = markers.filter(marker => {
                if (bounds.contains(marker.getLatLng())) {
                    map.removeLayer(marker);
                    return false; // Vynechá marker z nového pole
                }
                return true;
            });

            map.removeLayer(rectangle);  // Odstraní obdélník z mapy
            rectangle = null;
            startPoint = null;
        }
    }
});

// Posluchač pohybu myši na mapě
map.on('mousemove', (e) => {
    currentMouse = e.latlng;  // Uloží aktuální pozici kurzoru

    if (!dKeyHeld) return;    // Pokud není stisknuté D, nic nedělej

    // Nastaví počáteční bod, pokud ještě není
    if (!startPoint) {
        startPoint = e.latlng;
        return;
    }

    const bounds = L.latLngBounds(startPoint, e.latlng);  // Vypočítá hranice obdélníku

    if (!rectangle) {
        rectangle = L.rectangle(bounds, { color: 'red', weight: 2 }).addTo(map);  // Vytvoří nový
    } else {
        rectangle.setBounds(bounds);  // Aktualizuje existující obdélník
    }
});