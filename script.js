// Inicializa o mapa em Curitiba
var map = L.map('map').setView([-25.4284, -49.2733], 12);

// Camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Lista de hortas cadastradas
const hortas = [
  {
    nome: "Horta Comunitária Dembinski II",
    lat: -25.5206,
    lng: -49.3073,
    endereco: "Rua Rio do Sul, em frente ao nº 2290 – CIC",
    telefone: "Não informado",
    curiosidade: "Projeto comunitário voltado à segurança alimentar."
  },
  {
    nome: "Horta Comunitária do Jacu",
    lat: -25.4189,
    lng: -49.2731,
    endereco: "Rua Ângelo Zeni, em frente ao nº 56 – Bom Retiro",
    telefone: "Não informado",
    curiosidade: "Espaço de integração social e educação ambiental."
  },
  {
    nome: "Fazenda Urbana do Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    telefone: "(41) 3361-2524",
    curiosidade: "Produção sustentável e capacitação da comunidade."
  }
];

// Cria marcadores e cards
hortas.forEach(horta => {
  // Marcador no mapa
  L.marker([horta.lat, horta.lng])
    .addTo(map)
    .bindPopup(`<b>${horta.nome}</b><br>${horta.endereco}`);

  // Card da horta
  document.getElementById("cards").innerHTML += `
    <div class="card">
      <h3>${horta.nome}</h3>
      <p><strong>Endereço:</strong> ${horta.endereco}</p>
      <p><strong>Telefone:</strong> ${horta.telefone}</p>
      <p><em>${horta.curiosidade}</em></p>
      <button onclick="map.setView([${horta.lat}, ${horta.lng}], 16)">
        Ver no mapa
      </button>
    </div>
  `;
});

// Busca endereço do usuário
function buscarEndereco() {
  let endereco = document.getElementById("endereco").value;

  if (!endereco) {
    alert("Digite um endereço para buscar.");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        map.setView([data[0].lat, data[0].lon], 15);
      } else {
        alert("Endereço não encontrado.");
      }
    })
    .catch(() => alert("Erro ao buscar o endereço."));
}
