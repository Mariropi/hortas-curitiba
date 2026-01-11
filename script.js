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
    imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg"
  },
  {
    nome: "Fazenda Urbana CIC",
    tipo: "fazenda",
    lat: -25.4900288,
    lng: -49.3539665,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600"
  },
  {
    nome: "Fazenda Urbana Tatuquara",
    tipo: "fazenda",
    lat: -25.5877,
    lng: -49.3482,
    endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara"
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
    endereco: "R. Afrânio Peixoto, 330 – Fazendinha",
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMAH5qow5GWBHrvVFD1OC0YM6iwhqv2eQJpqvtV=w600"
  },
  {
    nome: "Horta Comunitária Uma Nova Curitiba",
    tipo: "horta",
    lat: -25.4280,
    lng: -49.3606,
    endereco: "Rua Olívia G. Freitas, 471 – Orleans",
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy2i08SAzI2KnbTqXSqcRvYu_pW3B1QRjVTp4wqsyAxaUrZ6tdytO6tkHfxsbrciErVjW0RGvF6sbOKn71lOSO83S3ZJ-NhU9Sd8ErejjQww08Uqq4y8OIoGaaZNCb7DXl068aRsA=w600"
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

  const cards = document.getElementById("cards");

  locais.forEach(local => {
    const div = document.createElement("div");
    div.className = local.tipo === "fazenda" ? "card fazenda" : "card";
div.innerHTML = `
  <h3>${local.nome}</h3>
  <p>${local.endereco}</p>
  ${local.tipo === "fazenda" ? 
    `<button class="btn-fazenda" onclick="abrirModal(${index})">
      Conhecer a Fazenda
    </button>` 
    : ""}
  <button onclick="verNoMapa(${local.lat}, ${local.lng})">
    Ver no mapa
  </button>
`;
    cards.appendChild(div);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

window.buscarEndereco = function () {
  const endereco = document.getElementById("endereco").value;

  if (!endereco) {
    alert("Por favor, digite seu endereço.");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
    .then(response => response.json())
    .then(data => {
      if (!data || data.length === 0) {
        alert(
          "Endereço não encontrado.\n\n" +
          "Procure o coordenador da horta mais próxima (associações de moradores),\n" +
          "ou entre em contato com a Prefeitura pela Central 156 ou\n" +
          "agriculturaurbana@curitiba.pr.gov.br"
        );
        return;
      }

      const origemLat = parseFloat(data[0].lat);
      const origemLng = parseFloat(data[0].lon);

      let maisProxima = null;
      let menorDistancia = Infinity;

   locais.forEach((local, index) => {
        const distancia = Math.sqrt(
          Math.pow(local.lat - origemLat, 2) +
          Math.pow(local.lng - origemLng, 2)
        );

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisProxima = local;
        }
      });

      if (!maisProxima) {
        alert(
          "Nenhuma horta encontrada próxima a você.\n\n" +
          "Entre em contato com a Central 156 ou agriculturaurbana@curitiba.pr.gov.br"
        );
        return;
      }

      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${maisProxima.lat},${maisProxima.lng}`,
        "_blank"
      );
    })
    .catch(() => {
      alert("Erro ao buscar o endereço. Tente novamente.");
    });
};

  window.abrirModal = function () {
    document.getElementById("modalFazenda").style.display = "block";
  };
  
window.abrirModal = function (index) {
  const local = locais[index];

  document.getElementById("modalTitulo").innerText = local.nome;
  document.getElementById("modalEndereco").innerText = local.endereco;

  const img = document.getElementById("modalImagem");
  if (local.imagem) {
    img.src = local.imagem;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  document.getElementById("modalFazenda").style.display = "block";
};

};

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});
