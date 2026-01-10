var map = L.map('map').setView([-25.4284, -49.2733], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// Lista completa de hortas e fazendas
const locais = [
  {
    nome: "Fazenda Urbana Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    tipo: "fazenda",
    descricao: "Espaço pioneiro no Brasil dedicado à educação para a agricultura urbana."
  },
  {
    nome: "Fazenda Urbana CIC",
    lat: -25.5645,
    lng: -49.3349,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    tipo: "fazenda",
    descricao: "Capacitação e testagem de técnicas do ecossistema alimentar."
  },
  {
    nome: "Fazenda Urbana Tatuquara",
    lat: -25.5877,
    lng: -49.3482,
    endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
    tipo: "fazenda",
    descricao: "Praça viva de convivência, cultivo e geração de renda local."
  },
  {
    nome: "Horta Comunitária Dembinski II",
    lat: -25.5206,
    lng: -49.3073,
    endereco: "Rua Rio do Sul, em frente ao nº 2290 – CIC",
    tipo: "horta",
    descricao: "Produção comunitária e segurança alimentar."
  },
  {
    nome: "Horta Comunitária do Jacu",
    lat: -25.4189,
    lng: -49.2731,
    endereco: "Rua Ângelo Zeni, em frente ao nº 56 – Bom Retiro",
    tipo: "horta",
    descricao: "Educação ambiental e integração social."
  },
  {
    nome: "Horta Comunitária de Calçada Cristo Rei",
    lat: -25.4359,
    lng: -49.2413,
    endereco: "R. Roberto Cichon, 183 – Cristo Rei",
    tipo: "horta",
    descricao: "Horta urbana integrada ao espaço público."
  },
  {
    nome: "Horta Maria Angélica",
    lat: -25.5385,
    lng: -49.2958,
    endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho",
    tipo: "horta",
    descricao: "Horta comunitária com foco em alimentação saudável."
  }
];

// Marcadores e cards
locais.forEach(l => {
  L.marker([l.lat, l.lng]).addTo(map)
    .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

  document.getElementById("cards").innerHTML += `
    <div class="card">
      <h3>${l.nome}</h3>
      <p><strong>Endereço:</strong> ${l.endereco}</p>
      <p>${l.descricao}</p>

      ${l.tipo === "fazenda" ? `<button onclick="abrirModal()">Conhecer a Fazenda Urbana</button>` : ""}

      <button onclick="map.setView([${l.lat}, ${l.lng}], 16)">Ver no mapa</button>
    </div>
  `;
});

// Função de distância
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

  if (!endereco) {
    alert("Digite um endereço para buscar.");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
    .then(r => r.json())
    .then(d => {
      if (!d.length) {
        alert("Endereço não encontrado.");
        return;
      }

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
Informações e questionamentos podem respondidos pelos seguintes canais:

Telefone fixo: (41) 3267-9128
Celular corporativo: (41) 99957-5913 (ligações)
WhatsApp: (41) 9951-0900 (mensagens)
E-mail: fazendaurbana@curitiba.pr.gov.br
E-mail: agriculturaurbana@curitiba.pr.gov.br
Secretaria Municipal de Segurança Alimentar e Nutricional`
        );
        map.setView([uLat, uLng], 13);
        return;
      }

      map.setView([proximo.lat, proximo.lng], 16);

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
