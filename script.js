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
      descricao:
        "Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil. Atua como centro de referência com visitas e cursos. Possui hortas modelo, estufas, composteiras, sala multiuso e escola de gastronomia social."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900288,
      lng: -49.3539665,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem:
        "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w800",
      descricao:
        "Operando desde outubro de 2025, possui proposta semelhante à Fazenda Cajuru, com maior integração ao ecossistema alimentar da Região Metropolitana de Curitiba."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao:
        "Uma praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem, valorizando a produção de alimentos, o empreendedorismo e a geração de renda local."
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
      nome: "Horta Comunitária Uma Nova Curitiba",
      tipo: "horta",
      lat: -25.4280,
      lng: -49.3606,
      endereco: "Rua Olívia G. Freitas, 471 – Orleans"
    },
    {
      nome: "Horta Comunitária Dembinski II",
      tipo: "horta",
      lat: -25.5006,
      lng: -49.3554,
      endereco: "R. Rio do Sul, em frente ao nº 2290 – CIC"
    },
    {
      nome: "Horta Comunitária do Jacu",
      tipo: "horta",
      lat: -25.4079,
      lng: -49.2708,
      endereco: "Rua Ângelo Zeni, em frente ao nº 56 – Bom Retiro"
    }
  ];

  locais.forEach(local => {
    L.marker([local.lat, local.lng])
      .addTo(map)
      .bindPopup(`<strong>${local.nome}</strong><br>${local.endereco}`);
  });

  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  locais.forEach((local, index) => {
    const div = document.createElement("div");
    div.className = local.tipo === "fazenda" ? "card fazenda" : "card";

  div.innerHTML = `
  ${local.imagem 
    ? `<img src="${local.imagem}" alt="${local.nome}">`
    : `<div class="img-placeholder">🌱</div>`
  }

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

  let mapModalInstance = null;

window.verNoMapa = function (lat, lng) {
  // Se for mobile, abre modal
  if (window.innerWidth <= 768) {
    document.getElementById("mapModal").style.display = "block";

    setTimeout(() => {
      if (mapModalInstance) {
        mapModalInstance.remove();
      }

      mapModalInstance = L.map("mapModalContainer").setView([lat, lng], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(mapModalInstance);

      L.marker([lat, lng]).addTo(mapModalInstance);
    }, 200);
  } 
  // Desktop continua normal
  else {
    map.setView([lat, lng], 16);
    window.scrollTo({ top: document.getElementById("map").offsetTop - 20, behavior: "smooth" });
  }
};

window.fecharMapaModal = function () {
  document.getElementById("mapModal").style.display = "none";
  if (mapModalInstance) {
    mapModalInstance.remove();
    mapModalInstance = null;
  }
};


  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value.trim();
    if (!endereco) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(r => r.json())
      .then(data => {
        if (!data.length) {
          mostrarNaoEncontrou();
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        let maisProxima = null;
        let menor = Infinity;

        locais.forEach(local => {
          const d = distanciaKm(lat, lng, local.lat, local.lng);
          if (d <= 10 && d < menor) {
            menor = d;
            maisProxima = local;
          }
        });

        if (!maisProxima) {
          mostrarNaoEncontrou();
          return;
        }

        map.setView([maisProxima.lat, maisProxima.lng], 15);
      })
      .catch(mostrarNaoEncontrou);
  };

  function mostrarNaoEncontrou() {
    const aviso = document.createElement("div");
    aviso.className = "card aviso";
    aviso.innerHTML = `
      <h3>❓ Não encontrou uma horta?</h3>
      <p>
        Para obter a localização exata das hortas mais próximas ao seu endereço
        ou bairro específico, o canal mais eficiente é a <strong>Central 156</strong>.
      </p>
    `;
    cards.prepend(aviso);
  }

  window.abrirModal = function (index) {
    const f = locais[index];
    document.getElementById("modalTitulo").innerText = f.nome;
    document.getElementById("modalEndereco").innerText = f.endereco;
    document.getElementById("modalDescricao").innerText = f.descricao || "";
    const img = document.getElementById("modalImagem");

    if (f.imagem) {
      img.src = f.imagem;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});
