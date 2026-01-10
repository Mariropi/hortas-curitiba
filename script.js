document.addEventListener("DOMContentLoaded", function () {

 
  const map = L.map('map').setView([-25.4284, -49.2733], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const locais = [
    {
      nome: "Fazenda Urbana Cajuru",
      lat: -25.4422,
      lng: -49.2316,
      endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
      tipo: "fazenda"
    },
    {
      nome: "Horta Projeto Oásis",
      lat: -25.5203,
      lng: -49.2569,
      endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão",
      tipo: "horta"
    }
  ];

  const cards = document.getElementById("cards");

  locais.forEach((l, index) => {
    L.marker([l.lat, l.lng]).addTo(map)
      .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

    cards.innerHTML += `
      <div class="card">
        <h3>${l.nome}</h3>
        <p>${l.endereco}</p>

        ${l.tipo === "fazenda"
          ? `<button onclick="abrirModal()">Conhecer</button>`
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
          alert("Endereço não encontrado.");
          return;
        }

        const origemLat = data[0].lat;
        const origemLng = data[0].lon;

        const destino = locais[0]; // por enquanto, a primeira

        const rota = `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${destino.lat},${destino.lng}`;
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
