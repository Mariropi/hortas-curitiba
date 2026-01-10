document.addEventListener("DOMContentLoaded", function () {

  const map = L.map('map', {
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
      imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg"
    },
    {
      nome: "Horta Projeto Oásis",
      lat: -25.5203,
      lng: -49.2569,
      endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão",
      tipo: "horta",
      imagem: ""
    }
  ];

  locais.forEach(l => {
    L.marker([l.lat, l.lng]).addTo(map)
      .bindPopup(`<b>${l.nome}</b><br>${l.endereco}`);

    document.getElementById("cards").innerHTML += `
      <div class="card">
        <h3>${l.nome}</h3>
        ${l.imagem ? `<img src="${l.imagem}">` : ""}
        <p>${l.endereco}</p>
        ${l.tipo === "fazenda" ? `<button onclick="abrirModal()">Conhecer</button>` : ""}
        <button onclick="map.setView([${l.lat}, ${l.lng}], 16)">Ver no mapa</button>
      </div>
    `;
  });

  window.buscarEndereco = function () {
    const e = document.getElementById("endereco").value;
    if (!e) return alert("Digite um endereço.");

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${e}`)
      .then(r => r.json())
      .then(d => {
        if (!d.length) return alert("Endereço não encontrado.");
        const rota = `https://www.google.com/maps/dir/?api=1&origin=${d[0].lat},${d[0].lon}&destination=${locais[0].lat},${locais[0].lng}`;
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
