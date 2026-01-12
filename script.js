document.addEventListener("DOMContentLoaded", function () {

  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
const locais = [
  {
    nome: "Fazenda Urbana Cajuru",
    tipo: "fazenda",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
    descricao: `
      <strong>FAZENDA URBANA CAJURU</strong><br><br>
      Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil.
      Atua como centro de referência, operacionalizando suas estações de produção agrícola
      com visitas e cursos. Possui modelos de hortas, estufas, composteiras, sala multiuso
      e escola de gastronomia social.
    `
  },
  {
    nome: "Fazenda Urbana CIC",
    tipo: "fazenda",
    lat: -25.4900,
    lng: -49.3539,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    descricao: `
      <strong>FAZENDA URBANA CIC</strong><br><br>
      Operando desde outubro de 2025, possui proposta semelhante à Fazenda Urbana Cajuru,
      com maior integração ao ecossistema de produção de alimentos da Região Metropolitana
      de Curitiba. Atua em capacitações, testagem de técnicas e tecnologias.
    `
  },
  {
    nome: "Fazenda Urbana Tatuquara",
    tipo: "fazenda",
    lat: -25.5877,
    lng: -49.3482,
    endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
    descricao: `
      <strong>FAZENDA URBANA TATUQUARA</strong><br><br>
      Uma praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem.
      Espaço aberto que valoriza a produção de alimentos, o empreendedorismo
      e a geração de renda local.
    `
  },

  {
    nome: "Horta Projeto Oásis",
    tipo: "horta",
    lat: -25.5203,
    lng: -49.2569,
    endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão"
  },
  {
    nome: "Horta Comunitária Cristo Rei",
    tipo: "horta",
    lat: -25.4359,
    lng: -49.2413,
    endereco: "R. Roberto Cichon, 183 – Cristo Rei"
  },
  {
    nome: "Horta Maria Angélica",
    tipo: "horta",
    lat: -25.5385,
    lng: -49.2958,
    endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho"
  },
  {
    nome: "Horta Comunitária Amigos da Fazendinha",
    tipo: "horta",
    lat: -25.4914,
    lng: -49.3283,
    endereco: "R. Afrânio Peixoto, 330 – Fazendinha"
  },
  {
    nome: "Horta Comunitária Dembinski II",
    tipo: "horta",
    lat: -25.5006,
    lng: -49.3554,
    endereco: "R. Rio do Sul – CIC"
  },
  {
    nome: "Horta Comunitária do Jacu",
    tipo: "horta",
    lat: -25.4079,
    lng: -49.2708,
    endereco: "Rua Ângelo Zeni – Bom Retiro"
  }
];


  const cards = document.getElementById("cards");

  locais.forEach(local => {
    L.marker([local.lat, local.lng])
      .addTo(map)
      .bindPopup(`<strong>${local.nome}</strong><br>${local.endereco}`);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${local.imagem
        ? `<img src="${local.imagem}" onerror="this.outerHTML='<div class=img-placeholder>🌱</div>'">`
        : `<div class="img-placeholder">🌱</div>`
      }
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>
      <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
    `;

    cards.appendChild(card);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
  };

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;
    document.getElementById("naoEncontrou").style.display = "none";

    if (!endereco) return alert("Digite um endereço.");

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(r => r.json())
      .then(data => {
        if (!data.length) {
          document.getElementById("naoEncontrou").style.display = "flex";
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        let achou = false;

     locais.forEach((local, index) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    ${local.imagem
      ? `<img src="${local.imagem}" onerror="this.style.display='none'">`
      : `<div class="img-placeholder">🌱</div>`
    }

    <h3>${local.nome}</h3>
    <p>${local.endereco}</p>

    ${local.tipo === "fazenda"
      ? `<button onclick="abrirModal(${index})">Conhecer a Fazenda</button>`
      : ""
    }

    <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
  `;

  cards.appendChild(card);
});

      if (!achou) {
          document.getElementById("naoEncontrou").style.display = "flex";
        }
      });
 
