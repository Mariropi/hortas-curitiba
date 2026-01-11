document.addEventListener("DOMContentLoaded", function () {


  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);


  const locais = [
    {
      nome: "Fazenda Urbana Cajuru",
      lat: -25.4422,
      lng: -49.2316,
      endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
      tipo: "fazenda"
    },
    {
      nome: "Horta Projeto Oásis",
      lat: -25.5203,
      lng: -49.2569,
      endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão",
      tipo: "horta"
    },
    {
      nome: "Horta Comunitária Cristo Rei",
      lat: -25.4359,
      lng: -49.2413,
      endereco: "R. Roberto Cichon, 183 – Cristo Rei",
      tipo: "horta"
    },
    {
      nome: "Horta Maria Angélica",
      lat: -25.5385,
      lng: -49.2958,
      endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho",
      tipo: "horta"
    }
  ];
  
  locais.forEach(local => {
    L.marker([local.lat, local.lng])
      .addTo(map)
      .bindPopup(`<strong>${local.nome}</strong><br>${local.endereco}`);
  });

  const cards = document.getElementById("cards");

  locais.forEach(local => {
    const div = document.createElement("div");
  div.className = local.tipo === "fazenda" ? "card fazenda" : "card";
 div.innerHTML = `
  <h3>${local.nome}</h3>
  <p>${local.endereco}</p>

  ${local.tipo === "fazenda"
    ? `<button onclick="abrirModal()">Conhecer a Fazenda</button>`
    : ""
  }

  <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
`;

  <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
`;
    cards.appendChild(div);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

  window.buscarEndereco = function () {
    alert("Busca em desenvolvimento — base funcionando!");
  };
window.abrirModal = function () {
  document.getElementById("modalFazenda").style.display = "block";
};

window.fecharModal = function () {
  document.getElementById("modalFazenda").style.display = "none";
};
  
