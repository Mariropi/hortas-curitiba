var map = L.map('map').setView([-25.4284, -49.2733], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

const hortas = [
  {
    nome: "Horta Comunitária do Jacu",
    lat: -25.4189,
    lng: -49.2731,
    endereco: "Rua Ângelo Zeni, Bom Retiro",
    telefone: "Não informado"
  },
  {
    nome: "Fazenda Urbana do Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880",
    telefone: "(41) 3361-2524"
  }
];

hortas.forEach(horta => {
  L.marker([horta.lat, horta.lng])
    .addTo(map)
    .bindPopup(`<b>${horta.nome}</b><br>${horta.endereco}`);

  document.getElementById("cards").innerHTML += `
    <div class="card">
      <h3>${horta.nome}</h3>
      <p>${horta.endereco}</p>
      <p>📞 ${horta.telefone}</p>
      <button onclick="map.setView([${horta.lat}, ${horta.lng}], 16)">
        Ver no mapa
      </button>
    </div>
  `;
});

function buscarEndereco() {
  let endereco = document.getElementById("endereco").value;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        map.setView([data[0].lat, data[0].lon], 15);
      }
    });
}

