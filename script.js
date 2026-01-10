var map = L.map('map', {
  dragging: true,
  tap: true,
  touchZoom: true,
  scrollWheelZoom: false
}).setView([-25.4284, -49.2733], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

const locais = [
  {
    nome: "Fazenda Urbana Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    tipo: "fazenda",
    imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
    descricao: "Espaço pioneiro no Brasil dedicado à educação para a agricultura urbana."
  },
  {
    nome: "Fazenda Urbana CIC",
    lat: -25.4900,
    lng: -49.3539,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    tipo: "fazenda",
    imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
    descricao: "Capacitação e testagem de técnicas do ecossistema alimentar."
  },
  {
    nome: "Horta Comunitária Amigos da Fazendinha",
    lat: -25.4911,
    lng: -49.3281,
    endereco: "R. Afrânio Peixoto, 330 – Fazendinha",
    tipo: "horta",
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMAH5qow5GWBHrvVFD1OC0YM6iwhqv2eQJpqvtV=w600",
    descricao: "Horta comunitária com foco em convivência e alimentação saudável."
  },
  {
    nome: "Horta Comunitária Uma Nova Curitiba",
    lat: -25.4280,
    lng: -49.3606,
    endereco: "Rua Olívia G. Freitas, 471 – Orleans",
    tipo: "horta",
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy2i08SAzI2KnbTqXSqcRvYu_pW3B1QRjVTp4wqsyAxaUrZ6tdytO6tkHfxsbrciErVjW0RGvF6sbOKn71lOSO83S3ZJ-NhU9Sd8ErejjQww08Uqq4y8OIoGaaZNCb7DXl068aRsA=w600",
    descricao: "Horta urbana voltada à integração comunitária."
  }
];

locais.forEach(l => {
  L.marker([l.lat, l.lng]).addTo(map)
    .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

  document.getElementById("cards").innerHTML += `
    <div class="card">
      <h3>${l.nome}</h3>
      <img src="${l.imagem}" alt="${l.nome}">
      <p><strong>Endereço:</strong> ${l.endereco}</p>
      <p>${l.descricao}</p>

      ${
        l.tipo === "fazenda"
          ? `<button onclick="abrirModal()">Conhecer a Fazenda Urbana 🌱</button>`
          : ""
      }

      <button onclick="map.setView([${l.lat}, ${l.lng}], 16)">
        Ver no mapa
      </button>
    </div>
  `;
});

// Função distância
function distancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Busca endereço + rota
function buscarEndereco() {
  let endereco = document.getElementById("endereco").value;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
    .then(r => r.json())
    .then(d => {
      if (!d.length) return alert("Endereço não encontrado.");

      const uLat = d[0].lat;
      const uLng = d[0].lon;

      let proximo = null;
      let menor = Infinity;

      locais.forEach(l => {
        let dist = distancia(uLat, uLng, l.lat, l.lng);
        if (dist < menor) {
          menor = dist;
          proximo = l;
        }
      });

      if (menor > 20) {
        alert(
`Dúvidas?
Telefone: (41) 3267-9128
WhatsApp: https://wa.me/554199510900
E-mail: fazendaurbana@curitiba.pr.gov.br
E-mail: agriculturaurbana@curitiba.pr.gov.br`
        );
        map.setView([uLat, uLng], 13);
        return;
      }

      const rota = `https://www.google.com/maps/dir/?api=1&origin=${uLat},${uLng}&destination=${proximo.lat},${proximo.lng}`;
      window.open(rota, "_blank");
    });
}

// Modal
function abrirModal() {
  document.getElementById("modalFazenda").style.display = "block";
}
function fecharModal() {
  document.getElementById("modalFazenda").style.display = "none";
}
