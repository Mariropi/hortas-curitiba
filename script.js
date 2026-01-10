document.addEventListener("DOMContentLoaded", function () {

  const map = L.map('map').setView([-25.4284, -49.2733], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const locais = [
    {
      nome: "Fazenda Urbana Cajuru",
      tipo: "fazenda",
      lat: -25.4422,
      lng: -49.2316,
      endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
      imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
      descricao: "Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil. Atua como centro de referência, com hortas modelo, estufas, composteiras, sala multiuso e escola de gastronomia social."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900,
      lng: -49.3539,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
      descricao: "Atua na capacitação e testagem de técnicas do ecossistema alimentar, com forte integração regional."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao: "Praça viva de convivência e bem-estar, integrando paisagismo, cultivo e geração de renda."
    },
    {
      nome: "Horta Projeto Oásis",
      tipo: "horta",
      lat: -25.5203,
      lng: -49.2569,
      endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão",
      imagem: "",
      descricao: "Horta comunitária voltada à produção de alimentos e fortalecimento comunitário."
    },
    {
      nome: "Horta Comunitária Amigos da Fazendinha",
      tipo: "horta",
      lat: -25.4911,
      lng: -49.3281,
      endereco: "R. Afrânio Peixoto, 330 – Fazendinha",
      imagem: "https://lh3.googleusercontent.com/p/AF1QipMAH5qow5GWBHrvVFD1OC0YM6iwhqv2eQJpqvtV=w600",
      descricao: "Espaço comunitário de cultivo e convivência."
    },
    {
      nome: "Horta Comunitária Uma Nova Curitiba",
      tipo: "horta",
      lat: -25.4280,
      lng: -49.3606,
      endereco: "Rua Olívia G. Freitas, 471 – Orleans",
      imagem: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy2i08SAzI2KnbTqXSqcRvYu_pW3B1QRjVTp4wqsyAxaUrZ6tdytO6tkHfxsbrciErVjW0RGvF6sbOKn71lOSO83S3ZJ-NhU9Sd8ErejjQww08Uqq4y8OIoGaaZNCb7DXl068aRsA=w600",
      descricao: "Horta urbana voltada à integração social."
    },
    {
      nome: "Horta Comunitária Cristo Rei",
      tipo: "horta",
      lat: -25.4359,
      lng: -49.2413,
      endereco: "R. Roberto Cichon, 183 – Cristo Rei",
      imagem: "",
      descricao: "Horta comunitária implantada em área pública."
    },
    {
      nome: "Horta Maria Angélica",
      tipo: "horta",
      lat: -25.5385,
      lng: -49.2958,
      endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho",
      imagem: "",
      descricao: "Produção comunitária e educação alimentar."
    }
  ];

  const cards = document.getElementById("cards");

  locais.forEach(l => {
    L.marker([l.lat, l.lng]).addTo(map)
      .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

    cards.innerHTML += `
      <div class="card">
        <h3>${l.nome}</h3>
        ${l.imagem ? `<img src="${l.imagem}" alt="${l.nome}">` : ""}
        <p><strong>Endereço:</strong> ${l.endereco}</p>
        <p>${l.descricao}</p>

        ${l.tipo === "fazenda"
          ? `<button onclick="abrirModal()">Conhecer a Fazenda</button>`
          : ""
        }

        <button onclick="verNoMapa(${l.lat}, ${l.lng})">Ver no mapa</button>
      </div>
    `;
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;
    if (!endereco) {
      alert("Digite seu endereço.");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          alert(
`Procure o coordenador da horta mais próxima, entre em contato com a Prefeitura pelo 156 ou pelos e-mails:
fazendaurbana@curitiba.pr.gov.br
agriculturaurbana@curitiba.pr.gov.br`
          );
          return;
        }

        const rota = `https://www.google.com/maps/dir/?api=1&origin=${data[0].lat},${data[0].lon}&destination=${locais[0].lat},${locais[0].lng}`;
        window.open(rota, "_blank");
      });
  };

  window.abrirModal = function () {
    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});


