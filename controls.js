// Ovládání mapy po načtení stránky
window.addEventListener('DOMContentLoaded', () => {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const moveUpBtn = document.getElementById('up');
    const moveDownBtn = document.getElementById('down');
    const moveLeftBtn = document.getElementById('left');
    const moveRightBtn = document.getElementById('right');
    const homeBtn = document.getElementById('home');

    // Pomocná funkce pro výpočet zoom-faktoru pro pohyb
    function getZoomFactor() {
        let zoom = map.getZoom();
        let factor = 0.001 * (20 - zoom);
        return zoom < 12 ? factor * 6 : factor * 0.5;
    }

    // ---------- ZOOM IN ----------
    let zoomInInterval = null;
    zoomInBtn.addEventListener("mouseenter", () => {
        zoomInInterval = setInterval(() => {
            let currentZoom = map.getZoom();
            if (currentZoom < map.getMaxZoom()) {
                map.setZoom(currentZoom + 1);
            } else {
                clearInterval(zoomInInterval);
            }
        }, 700);
    });
    zoomInBtn.addEventListener("mouseleave", () => clearInterval(zoomInInterval));

    // ---------- ZOOM OUT ----------
    let zoomOutInterval = null;
    zoomOutBtn.addEventListener("mouseenter", () => {
        zoomOutInterval = setInterval(() => {
            let currentZoom = map.getZoom();
            if (currentZoom > map.getMinZoom()) {
                map.setZoom(currentZoom - 1);
            } else {
                clearInterval(zoomOutInterval);
            }
        }, 700);
    });
    zoomOutBtn.addEventListener("mouseleave", () => clearInterval(zoomOutInterval));

    // ---------- MOVE UP ----------
    let upInterval = null;
    moveUpBtn.addEventListener("mouseenter", () => {
        upInterval = setInterval(() => {
            let center = map.getCenter();
            map.setView([center.lat + getZoomFactor(), center.lng], map.getZoom());
        }, 700);
    });
    moveUpBtn.addEventListener("mouseleave", () => clearInterval(upInterval));

    // ---------- MOVE DOWN ----------
    let downInterval = null;
    moveDownBtn.addEventListener("mouseenter", () => {
        downInterval = setInterval(() => {
            let center = map.getCenter();
            map.setView([center.lat - getZoomFactor(), center.lng], map.getZoom());
        }, 700);
    });
    moveDownBtn.addEventListener("mouseleave", () => clearInterval(downInterval));

    // ---------- MOVE LEFT ----------
    let leftInterval = null;
    moveLeftBtn.addEventListener("mouseenter", () => {
        leftInterval = setInterval(() => {
            let center = map.getCenter();
            map.setView([center.lat, center.lng - getZoomFactor()], map.getZoom());
        }, 700);
    });
    moveLeftBtn.addEventListener("mouseleave", () => clearInterval(leftInterval));

    // ---------- MOVE RIGHT ----------
    let rightInterval = null;
    moveRightBtn.addEventListener("mouseenter", () => {
        rightInterval = setInterval(() => {
            let center = map.getCenter();
            map.setView([center.lat, center.lng + getZoomFactor()], map.getZoom());
        }, 700);
    });
    moveRightBtn.addEventListener("mouseleave", () => clearInterval(rightInterval));

    // ---------- ZOOM TO HOME ----------
    homeBtn.addEventListener("mouseenter", () => {
        homeTimeout = setTimeout(() => {
            map.setView([49.594672528789296, 17.250552746699768], 13);
        }, 700);
    });
    homeBtn.addEventListener("mouseleave", () => clearTimeout(homeTimeout));
});