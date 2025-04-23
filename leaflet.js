// Nastavení mapy
var map = L.map('map', {
    zoomControl: false,       // Skrytí defaultního ovládání zoomu
    dragging: false,          // Zakázání přetahování mapy
    scrollWheelZoom: false,   // Zakázání zoomování kolečkem
    doubleClickZoom: false,   // Zakázání zoomování dvojklikem
    touchZoom: false,         // Zakázání pinch zoomu
    tap: false,               // Zakázání tap ovládání (mobilní zařízení)
    boxZoom: false            // Zakázání výběrového zoomu
});

map.setMinZoom(1);
map.setMaxZoom(20);

// Zamezení výchozímu chování při scrollování myší nad mapou
document.getElementById("map").addEventListener("wheel", function(event) {
    event.preventDefault();  
}, { passive: false });

// Načtení dlaždic z OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Počáteční pozice mapy
map.setView([49.594672528789296, 17.250552746699768], 13);