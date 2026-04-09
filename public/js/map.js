// document.addEventListener("DOMContentLoaded", function () {
//     const map = L.map('map').setView([lat, lng], 13);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);
//     L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup("Exact location provided after booking.")
//         .openPopup()
// });
document.addEventListener("DOMContentLoaded", function () {

    // Create map
    const map = L.map('map').setView([lat, lng], 13);

    // Add map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add marker
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(title)
        .openPopup();

});