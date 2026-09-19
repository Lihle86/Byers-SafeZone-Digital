// Sector Matrix Data Object
const sectors = {
    retail: {
        bgClass: 'retail-bg',
        description: 'Showing <strong>Retail Hub</strong> safe pathways. Active Byers fixed containers located at St Georges Mall.',
        markers: [
            { text: 'ℹ️ Mall Kiosk', top: '40%', left: '30%' },
            { text: '🛡️ Safe Container', top: '60%', left: '70%' },
            { text: '👤 You Are Here', top: '20%', left: '50%', isUser: true }
        ]
    },
    foreshore: {
        bgClass: 'foreshore-bg',
        description: 'Showing <strong>Foreshore Sector</strong>. Security checkpoints linked near the Civic Centre hub.',
        markers: [
            { text: 'ℹ️ Station Kiosk', top: '30%', left: '20%' },
            { text: '🛡️ Container 2', top: '70%', left: '50%' },
            { text: '👤 You Are Here', top: '55%', left: '40%', isUser: true }
        ]
    },
    eastcity: {
        bgClass: 'eastcity-bg',
        description: 'Showing <strong>East City Sector</strong>. High-visibility visibility routes mapped around Harrington Street.',
        markers: [
            { text: '🛡️ Safe Container', top: '25%', left: '65%' },
            { text: '👤 You Are Here', top: '80%', left: '20%', isUser: true }
        ]
    }
};

// Function to transition maps cleanly
function switchSector(sectorKey) {
    // 1. Update active button styles
    const buttons = document.querySelectorAll('.btn-sector');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find clicked button based on arguments text
    const eventTarget = window.event.target;
    if(eventTarget) eventTarget.classList.add('active');

    // 2. Extract Data
    const sectorData = sectors[sectorKey];
    const mapDisplay = document.getElementById('map-display');
    const description = document.getElementById('sector-description');

    // 3. Update map background appearance
    mapDisplay.className = 'map-graphic ' + sectorData.bgClass;
    description.innerHTML = sectorData.description;

    // 4. Reposition structural elements dynamically
    mapDisplay.innerHTML = '';
    sectorData.markers.forEach(m => {
        const markerDiv = document.createElement('div');
        markerDiv.className = m.isUser ? 'marker user-location' : 'marker';
        markerDiv.style.top = m.top;
        markerDiv.style.left = m.left;
        markerDiv.innerText = m.text;
        mapDisplay.appendChild(markerDiv);
    });
}

// Check URL parameters for custom "You Are Here" entry points via QR codes
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sectorParam = urlParams.get('sector');
    if (sectorParam && sectors[sectorParam]) {
        switchSector(sectorParam);
    }
});
