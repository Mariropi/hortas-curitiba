document.addEventListener("DOMContentLoaded", () => {

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

  locais.forEach(local => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${local.nome}</h3>
      <p><strong>Endereço:</strong> ${local.endereco}</p>

      ${local.tipo === "fazenda"
        ? `<button onclick="abrirModal()">Conhecer a Fazenda</button>`
        : ""
      }

      <button onclick="verNoMapa(${local.lat}, ${local.lng})">
        Ver no mapa
      </button>
    `;

    cards.appendChild(div);
  });

  /* ===== FUNÇÕES GLOBAIS ===== */
  window.verNoMapa = (lat, lng) => {
    map.setView([lat, lng], 16);
  };

  window.abrirModal = () => {
    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = () => {
    document.getElementById("modalFazenda").style.display = "none";
  };

  window.buscarEndereco = () => {
    const endereco = document.getElementById("endereco").value;

    if (!endereco) {
      alert("Digite seu endereço.");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          alert(
            "Endereço não encontrado em Curitiba.\n\nEntre em contato com a Central 156 ou agriculturaurbana@curitiba.pr.gov.br"
          );
          return;
        }

        const origemLat = parseFloat(data[0].lat);
        const origemLng = parseFloat(data[0].lon);

        let maisProxima = locais[0];
        let menor = Infinity;

        locais.forEach(l => {
          const d = Math.sqrt(
            Math.pow(l.lat - origemLat, 2) +
            Math.pow(l.lng - origemLng, 2)
          );

          if (d < menor) {
            menor = d;
            maisProxima = l;
          }
        });

        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${maisProxima.lat},${maisProxima.lng}`,
          "_blank"
        );
      });
  };

});
