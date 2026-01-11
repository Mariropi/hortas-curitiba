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
      descricao: "Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil. Atua como centro de referência, com hortas, estufas, composteiras, escola de gastronomia social, visitas e cursos."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900288,
      lng: -49.3539665,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
      descricao: "Operando desde outubro de 2025, possui proposta semelhante à Fazenda Cajuru, com maior integração ao ecossistema alimentar da Região Metropolitana de Curitiba."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "https://www.curitiba.pr.gov.br/sites/default/files/styles/galeria/public/2023-10/fazenda-urbana-tatuquara.jpg",
      descricao: "Uma praça viva de convivência e bem-estar, valorizando a produção de alimentos, o empreendedorismo e a geração de renda local."
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

  locais.forEach((local, index) => {
    const div = document.createElement("div");
    div.className = local.tipo === "fazenda" ? "card fazenda" : "card";

    div.innerHTML = `
      ${local.imagem ? `<img src="${local.imagem}" alt="${local.nome}">` : ""}
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
  };

  function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;
    if (!endereco) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(r => r.json())
      .then(data => {
        if (!data.length) {
          mostrarNaoEncontrado();
          return;
        }

        const origemLat = parseFloat(data[0].lat);
        const origemLng = parseFloat(data[0].lon);

        let encontrado = null;
        let menor = Infinity;

        locais.forEach(local => {
          const d = calcularDistanciaKm(origemLat, origemLng, local.lat, local.lng);
          if (d <= 10 && d < menor) {
            menor = d;
            encontrado = local;
          }
        });

        if (!encontrado) {
          mostrarNaoEncontrado();
          return;
        }

        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${encontrado.lat},${encontrado.lng}`,
          "_blank"
        );
      })
      .catch(mostrarNaoEncontrado);
  };

  function mostrarNaoEncontrado() {
    alert(
      "Não encontrou uma horta?\n\n" +
      "Para obter a localização exata das hortas mais próximas ao seu endereço ou bairro específico,\n" +
      "o canal mais eficiente é a Central 156 (telefone ou chat online).\n\n" +
      "Eles possuem dados atualizados e podem direcioná-lo corretamente."
    );
  }

  window.abrirModal = function (index) {
    const local = locais[index];
    document.getElementById("modalTitulo").innerText = local.nome;
    document.getElementById("modalImagem").src = local.imagem || "";
    document.getElementById("modalEndereco").innerText = local.endereco;
    document.getElementById("modalDescricao").innerText = local.descricao || "";
    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});
