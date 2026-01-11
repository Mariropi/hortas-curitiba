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
      endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru"
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900,
      lng: -49.3539,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel"
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
      nome: "Horta Comunitária Amigos da Fazendinha",
      tipo: "horta",
      lat: -25.4911,
      lng: -49.3281,
      endereco: "R. Afrânio Peixoto, 330 – Fazendinha"
    },
    {
      nome: "Horta Comunitária Uma Nova Curitiba",
      tipo: "horta",
      lat: -25.4280,
      lng: -49.3606,
      endereco: "Rua Olívia G. Freitas, 471 – Orleans"
    }
  ];

  const cards = document.getElementById("cards");

  locais.forEach(l => {
    L.marker([l.lat, l.lng]).addTo(map)
      .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

    cards.innerHTML += `
      <div class="card">
        <h3>${l.nome}</h3>
        <p><strong>Endereço:</strong> ${l.endereco}</p>

        ${l.tipo === "fazenda"
          ? `<button onclick="mostrarInfoFazenda()">Conhecer a Fazenda</button>`
          : ""
        }

        <button onclick="verNoMapa(${l.lat}, ${l.lng})">
          Ver no mapa
        </button>
      </div>
    `;
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

  function distancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

window.buscarEndereco = function () {
  const endereco = document.getElementById("endereco").value;

  if (!endereco) {
    alert("Digite seu endereço.");
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR, Brasil`)
    .then(res => res.json())
    .then(data => {
      if (!data.length || !data[0].display_name.includes("Curitiba")) {
        alert(
`Endereço não localizado em Curitiba.

Procure o coordenador da horta mais próxima ou entre em contato com:
☎️ Central 156
✉️ agriculturaurbana@curitiba.pr.gov.br`
        );
        return;
      }

      const origemLat = parseFloat(data[0].lat);
      const origemLng = parseFloat(data[0].lon);

      let maisProxima = locais[0];
      let menorDistancia = Infinity;

      locais.forEach(l => {
        const d = distancia(origemLat, origemLng, l.lat, l.lng);
        if (d < menorDistancia) {
          menorDistancia = d;
          maisProxima = l;
        }
      });

      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${maisProxima.lat},${maisProxima.lng}`,
        "_blank"
      );
    });
};


  window.mostrarInfoFazenda = function () {
    alert(
`Quem pode visitar?
Qualquer cidadão (menores acompanhados).

Visitas:
Segunda a sexta, 8h–12h e 13h–17h.
Visitas guiadas: Guia Curitiba (buscar "Fazenda Urbana").

Cursos:
Presenciais mensais e EAD pelo Aprendere (SMSAN).

Serviço gratuito.

Dúvidas:
(41) 3267-9128
WhatsApp: (41) 9951-0900
fazendaurbana@curitiba.pr.gov.br`
    );
  };

});
