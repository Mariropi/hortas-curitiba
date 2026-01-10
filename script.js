document.addEventListener("DOMContentLoaded", function () {

  const map = L.map('map').setView([-25.4284, -49.2733], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([-25.4284, -49.2733])
    .addTo(map)
    .bindPopup("Teste de mapa funcionando")
    .openPopup();

});

