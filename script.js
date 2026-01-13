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
      endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
      imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
      descricao: `
        <p><strong>FAZENDA URBANA CAJURU</strong></p>
        <p>Dedicada à educação para a agricultura urbana, sendo espaço pioneiro no Brasil.</p>
        <p><strong>Quem pode visitar?</strong><br>
        Qualquer cidadão (menores acompanhados) e PcD.</p>
        <p><strong>Visitas:</strong><br>
        Segunda a sexta, das 8h às 12h e das 13h às 17h.<br>
        Visitas guiadas via Guia Curitiba.</p>
        <p><strong>Cursos:</strong><br>
        Presenciais mensais e cursos EAD pelo Aprendere (SMSAN).</p>
        <p><strong>Contato:</strong><br>
        ☎️ (41) 3267-9128<br>
        📱 <a href="https://wa.me/554199510900" target="_blank">WhatsApp</a><br>
        ✉️ fazendaurbana@curitiba.pr.gov.br</p>
      `
    },

    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900,
      lng: -49.3539,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      descricao: `
        <p><strong>FAZENDA URBANA CIC</strong></p>
        <p>Voltada à capacitação e testagem de técnicas e tecnologias do ecossistema alimentar.</p>
        <p><strong>Visitas:</strong> Segunda a sexta, 8h–12h / 13h–17h</p>
        <p><strong>Cursos:</strong> Presenciais e EAD (SMSAN)</p>
        <p><strong>Contato:</strong><br>
        ☎️ (41) 3267-9128<br>
        📱 <a href="https://wa.me/554199510900" target="_blank">WhatsApp</a></p>
      `
    },

    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      descricao: `
        <p><strong>FAZENDA URBANA TATUQUARA</strong></p>
        <p>Praça viva de convivência, produção de alimentos e geração de renda local.</p>
        <p><strong>Visitas:</strong> Segunda a sexta, 8h–12h / 13h–17h</p>
        <p><strong>Cursos:</strong> Presenciais e EAD</p>
      `
    },

    { nome: "Horta Projeto Oásis", tipo: "horta", lat: -25.5203, lng: -49.2569, endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão" },
    { nome: "Horta Comunitária Cristo Rei", tipo: "horta", lat: -25.4359, lng: -49.2413, endereco: "R. Roberto Cichon, 183 – Cristo Rei" },
    { nome: "Horta Maria Angélica", tipo: "horta", lat: -25.5385, lng: -49.2958, endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho" },
    { nome: "Horta Comunitária Amigos da Fazendinha", tipo: "horta", lat: -25.4914, lng: -49.3283, endereco: "R. Afrânio Peixoto, 330 – Fazendinha" },
    { nome: "Horta Comunitária Dembinski II", tipo: "horta", lat: -25.5006, lng: -49.3554, endereco: "R. Rio do Sul – CIC" },
    { nome: "Horta Comunitária do Jacu", tipo: "horta", lat: -25.4079, lng: -49.2708, endereco: "Rua Ângelo Zeni – Bom Retiro" }
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
