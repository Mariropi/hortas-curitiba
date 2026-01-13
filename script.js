document.addEventListener("DOMContentLoaded", () => {

 
  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const locais = [
    { nome:"Fazenda Urbana Cajuru", tipo:"fazenda", bairro:"Cajuru", lat:-25.4422, lng:-49.2316,
      imagem:"https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
      descricao:"Educação para agricultura urbana, visitas e cursos." },

    { nome:"Fazenda Urbana CIC", tipo:"fazenda", bairro:"CIC", lat:-25.49, lng:-49.3539,
      descricao:"Capacitações e tecnologias agrícolas." },

    { nome:"Fazenda Urbana Tatuquara", tipo:"fazenda", bairro:"Tatuquara", lat:-25.5877, lng:-49.3482,
      descricao:"Praça viva de produção e bem-estar." },

    { nome:"Horta Projeto Oásis", tipo:"horta", bairro:"Boqueirão", lat:-25.5203, lng:-49.2569 },
    { nome:"Horta Cristo Rei", tipo:"horta", bairro:"Cristo Rei", lat:-25.4359, lng:-49.2413 },
    { nome:"Horta Maria Angélica", tipo:"horta", bairro:"Pinheirinho", lat:-25.5385, lng:-49.2958 },
    { nome:"Horta Amigos da Fazendinha", tipo:"horta", bairro:"Fazendinha", lat:-25.4914, lng:-49.3283 },
    { nome:"Horta Dembinski II", tipo:"horta", bairro:"CIC", lat:-25.5006, lng:-49.3554 },
    { nome:"Horta do Jacu", tipo:"horta", bairro:"Bom Retiro", lat:-25.4079, lng:-49.2708 }
  ];

  const cards = document.getElementById("cards");
  const naoEncontrou = document.getElementById("naoEncontrou");
  const markers = [];

  function render(lista) {
    cards.innerHTML = "";
    naoEncontrou.style.display = lista.length ? "none" : "block";

    markers.forEach(m => map.removeLayer(m));

    lista.forEach((l,i) => {
      const m = L.marker([l.lat, l.lng]).addTo(map).bindPopup(l.nome);
      markers.push(m);

      const c = document.createElement("div");
      c.className = "card";
      c.innerHTML = `
        ${l.imagem ? `<img src="${l.imagem}">` : ""}
        <h3>${l.nome}</h3>
        <p>${l.bairro}</p>
        ${l.tipo==="fazenda" ? `<button onclick="abrirModal(${i})">Conhecer a Fazenda</button>`:""}
        <button onclick="verNoMapa(${l.lat},${l.lng},${i})">Ver no mapa</button>
      `;
      cards.appendChild(c);
    });
  }

  render(locais);

  window.verNoMapa = (lat,lng,i) => {
    map.setView([lat,lng],16);
    markers[i].openPopup();
    document.getElementById("map").scrollIntoView({behavior:"smooth"});
  };

  window.buscarEndereco = () => {
    const v = document.getElementById("endereco").value.toLowerCase();
    const filtrado = locais.filter(l => l.bairro.toLowerCase().includes(v));
    render(filtrado);
  };

  window.abrirModal = i => {
    document.getElementById("modalTitulo").innerText = locais[i].nome;
    document.getElementById("modalDescricao").innerHTML = `
      ${locais[i].descricao}<hr>
      Visitas: seg-sex 8h–12h / 13h–17h<br>
      Cursos gratuitos (SMSAN)
    `;
    document.getElementById("modalFazenda").style.display="flex";
  };

  window.fecharModal = () =>
    document.getElementById("modalFazenda").style.display="none";

});

