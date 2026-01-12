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
      descricao: "Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil. Atua como centro de referência, com visitas, cursos, estufas, composteiras e escola de gastronomia social."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900,
      lng: -49.3539,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
      descricao: "Capacitação em ecossistema alimentar e testagem de técnicas agrícolas, com forte integração à Região Metropolitana de Curitiba."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao: "Praça viva de convivência e bem-estar, integrando paisagismo, cultivo, empreendedorismo e geração de renda local."
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
      endereco: "R. Rio do Sul, em frente ao nº 2290 – CIC"
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
      ? `<img src="${local.imagem}" onerror="this.outerHTML='<div class=img-placeholder>🌱</div>'">`
      : `<div class="img-placeholder">🌱</div>`;

    div.innerHTML = `
      ${imagemHTML}
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>

      ${local.tipo === "fazenda"
        ? `<button onclick="abrirModal(${index})">Conhecer a Fazenda</button>`
        : ""
      }

      <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
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
    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;
    if (!endereco) return alert("Digite um endereço.");

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(r => r.json())
      .then(data => {
        if (!data.length) {
          mostrarNaoEncontrou();
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        let encontrado = false;

        locais.forEach(local => {
          const d = Math.sqrt(
            Math.pow(local.lat - lat, 2) +
            Math.pow(local.lng - lng, 2)
          ) * 111; // km aproximado

          if (d <= 10) {
            encontrado = true;
            window.open(
              `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${local.lat},${local.lng}`,
              "_blank"
            );
          }
        });

        if (!encontrado) mostrarNaoEncontrou();
      });
  };

  function mostrarNaoEncontrou() {
    document.getElementById("naoEncontrou").style.display = "flex";
  }

});
