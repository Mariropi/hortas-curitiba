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
      descricao: "Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil. Atua como centro de referência, operacionalizando suas estações de produção agrícola com visitas e cursos. Sua estrutura dispõe de modelos de hortas, estufas, composteiras, sala multiuso e escola de gastronomia social."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900288,
      lng: -49.3539665,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
      descricao: "Operando desde outubro de 2025, possui proposta semelhante à Fazenda Urbana Cajuru, com diferencial de maior aproximação com o ecossistema de produção de alimentos da Região Metropolitana de Curitiba. Dedicada a capacitações em temas relacionados ao ecossistema alimentar, assim como à testagem de técnicas e tecnologias."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao: "Uma praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem. Um espaço aberto que valoriza a produção de alimentos, o empreendedorismo e a geração de renda local."
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
    }
  ];


  locais.forEach(local => {
    L.marker([local.lat, local.lng])
      .addTo(map)
      .bindPopup(`<strong>${local.nome}</strong><br>${local.endereco}`);
  });


  const cards = document.getElementById("cards");

  locais.forEach((local, index) => {
    const div = document.createElement("div");
    div.className = "card";

    const imagemHTML = local.imagem
      ? `<img src="${local.imagem}" alt="${local.nome}">`
      : `<div class="img-placeholder">🌱</div>`;

    div.innerHTML = `
      ${imagemHTML}
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>

      ${local.tipo === "fazenda"
        ? `<button onclick="abrirModal(${index})">Conhecer a Fazenda</button>`
        : ""
      }

      <button onclick="verNoMapa(${local.lat}, ${local.lng})">
        Ver no mapa
      </button>
    `;

    cards.appendChild(div);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
  };

  window.abrirModal = function (index) {
    const f = locais[index];

    document.getElementById("modalTitulo").innerText = f.nome;
    document.getElementById("modalDescricao").innerText = f.descricao || "";
    
    if (f.imagem) {
      document.getElementById("modalImagem").src = f.imagem;
      document.getElementById("modalImagem").style.display = "block";
    } else {
      document.getElementById("modalImagem").style.display = "none";
    }

    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

  window.buscarEndereco = function () {
    document.getElementById("naoEncontrou").style.display = "flex";
  };

});
