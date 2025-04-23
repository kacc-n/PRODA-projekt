// Inicializace mapy
const map = L.map('map', {
    zoomControl: false,       // Skrytí defaultního ovládání zoomu
    dragging: false,          // Zakázání přetahování mapy
    scrollWheelZoom: false,   // Zakázání zoomování kolečkem
    doubleClickZoom: false,   // Zakázání zoomování dvojklikem
    touchZoom: false,         // Zakázání pinch zoomu
    tap: false,               // Zakázání tap ovládání (mobilní zařízení)
    boxZoom: false            // Zakázání výběrového zoomu
}).setView([51.505, -0.09], 13);

const initialCenter = [51.505, -0.09];
const initialZoom = 13;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let zoomInterval = null;
let zoomDirection = null;
let moveInterval = null;
let moveDirection = null;
let isWPressed = false;

function zoomMap() {
    if (isWPressed && zoomDirection) {
        if (zoomDirection === 'in') {
            map.zoomIn(1);
        } else if (zoomDirection === 'out') {
            map.zoomOut(1);
        }
    }
}

function moveMap() {
    if (isWPressed && moveDirection) {
        let moveBy = [0, 0];
        switch (moveDirection) {
            case 'up': moveBy = [0, -50]; break;
            case 'down': moveBy = [0, 50]; break;
            case 'left': moveBy = [-50, 0]; break;
            case 'right': moveBy = [50, 0]; break;
        }
        map.panBy(moveBy);
    }
}

function stopMovement() {
    clearInterval(moveInterval);
    moveInterval = null;
    moveDirection = null;
}

function stopZoom() {
    clearInterval(zoomInterval);
    zoomInterval = null;
    zoomDirection = null;
}

function startMove(direction) {
    stopMovement();
    moveDirection = direction;
    if (isWPressed) {
        moveInterval = setInterval(moveMap, 100);
    }
}

function startZoom(direction) {
    stopZoom();
    zoomDirection = direction;
    if (isWPressed) {
        zoomInterval = setInterval(zoomMap, 200);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        isWPressed = true;
        if (moveDirection && !moveInterval) {
            moveInterval = setInterval(moveMap, 100);
        }
        if (zoomDirection && !zoomInterval) {
            zoomInterval = setInterval(zoomMap, 200);
        }
    }
    if (e.key === 'h') {
        map.setView(initialCenter, initialZoom);
    }
    if (e.key === 'i') {
        const helpOverlay = document.getElementById('helpOverlay');
        helpOverlay.classList.toggle('hidden');
        helpVisible = !helpOverlay.classList.contains('hidden');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') {
        isWPressed = false;
        stopZoom();
        stopMovement();
    }
});

document.querySelector('.zone-top').addEventListener('mouseenter', () => startMove('up'));
document.querySelector('.zone-bottom').addEventListener('mouseenter', () => startMove('down'));
document.querySelector('.zone-left').addEventListener('mouseenter', () => startMove('left'));
document.querySelector('.zone-right').addEventListener('mouseenter', () => startMove('right'));

document.querySelector('.zone-zoomin.top-left').addEventListener('mouseenter', () => startZoom('in'));
document.querySelector('.zone-zoomin.top-right').addEventListener('mouseenter', () => startZoom('in'));
document.querySelector('.zone-zoomout.bottom-left').addEventListener('mouseenter', () => startZoom('out'));
document.querySelector('.zone-zoomout.bottom-right').addEventListener('mouseenter', () => startZoom('out'));

document.querySelectorAll('.zone').forEach(zone => {
    zone.addEventListener('mouseleave', () => {
        stopMovement();
        stopZoom();
    });
});

let helpVisible = false;

// Zobraz nápovědu při načtení stránky
window.addEventListener('load', () => {
    const helpOverlay = document.getElementById('helpOverlay');
    helpOverlay.classList.remove('hidden');
    helpVisible = true;
});
