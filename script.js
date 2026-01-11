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
      descricao: "Espaço pioneiro no Brasil dedicado à educação para a agricultura urbana. Atua como centro de referência, operacionalizando suas estações de produção agrícola com visitas e cursos. Sua estrutura dispõe de modelos de hortas, estufas, composteiras, sala multiuso e escola de gastronomia social"
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900,
      lng: -49.3540,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w800",
      descricao: "Fazenda voltada à capacitação e integração com o ecossistema alimentar. Dedicada a capacitações em temas relacionados ao ecossistema alimentar, assim como a testagem de técnicas e tecnologias."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao: "Uma praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem. Um espaço aberto que valoriza a produção de alimentos, o empreendedorismo e a geração de renda local."
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
    div.className = "card fazenda";

    div.innerHTML = `
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>
      <button onclick="abrirModalFazenda(${index})">Conhecer a Fazenda</button>
      <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
    `;

    cards.appendChild(div);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

  window.abrirModalFazenda = function (index) {
    const f = locais[index];

    document.getElementById("modalTitulo").innerText = f.nome;
    document.getElementById("modalDescricao").innerText = f.descricao;
    document.getElementById("modalImagem").src = f.imagem;
    document.getElementById("modalImagem").style.display = f.imagem ? "block" : "none";

    document.getElementById("modalFazenda").style.display = "flex";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});
