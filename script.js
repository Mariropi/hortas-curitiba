document.addEventListener("DOMContentLoaded", () => {

 
  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map").setView([-25.4284, -49.2733], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

 const locais = [
  {
    nome: "Fazenda Urbana Cajuru",
    tipo: "fazenda",
    bairro: "Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
    descricao: `
      <strong>FAZENDA URBANA CAJURU</strong><br><br>
      Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil.
      Atua como centro de referência, operacionalizando suas estações de produção agrícola
      com visitas e cursos.<br><br>
      Sua estrutura dispõe de modelos de hortas, estufas, composteiras,
      sala multiuso e escola de gastronomia social.<br><br>

      <strong>Quem pode visitar?</strong><br>
      Qualquer cidadão (menores acompanhados) e pessoas com deficiência (PcD).<br><br>

      <strong>Visitas:</strong><br>
      Segunda a sexta, das 8h às 12h e das 13h às 17h.<br>
      Visitas guiadas via Guia Curitiba.<br><br>

      <strong>Cursos:</strong><br>
      Cursos presenciais mensais e cursos EAD pelo Aprendere (SMSAN).<br><br>

      <strong>Contato:</strong><br>
      ☎️ (41) 3267-9128<br>
      📱 WhatsApp (41) 9951-0900<br>
      ✉️ fazendaurbana@curitiba.pr.gov.br
    `
  },

  {
    nome: "Fazenda Urbana CIC",
    tipo: "fazenda",
    bairro: "CIC",
    lat: -25.4900288,
    lng: -49.3539665,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
    descricao: `
      <strong>FAZENDA URBANA CIC</strong><br><br>
      Operando desde outubro de 2025, possui proposta semelhante à Fazenda Urbana Cajuru,
      com diferencial de maior aproximação com o ecossistema de produção de alimentos
      da Região Metropolitana de Curitiba.<br><br>

      É dedicada a capacitações em temas relacionados ao ecossistema alimentar,
      assim como à testagem de técnicas e tecnologias.<br><br>

      <strong>Quem pode visitar?</strong><br>
      Qualquer cidadão (menores acompanhados) e PcD.<br><br>

      <strong>Visitas:</strong><br>
      Segunda a sexta, das 8h às 12h e das 13h às 17h.<br>
      Visitas guiadas via Guia Curitiba.<br><br>

      <strong>Cursos:</strong><br>
      Presenciais mensais e cursos EAD pelo Aprendere (SMSAN).<br><br>

      <strong>Contato:</strong><br>
      ☎️ (41) 3267-9128<br>
      📱 WhatsApp (41) 9951-0900<br>
      ✉️ fazendaurbana@curitiba.pr.gov.br
    `
  },

  {
    nome: "Fazenda Urbana Tatuquara",
    tipo: "fazenda",
    bairro: "Tatuquara",
    lat: -25.5877,
    lng: -49.3482,
    endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
    descricao: `
      <strong>FAZENDA URBANA TATUQUARA</strong><br><br>
      Uma praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem.<br><br>

      Um espaço aberto que valoriza a produção de alimentos,
      o empreendedorismo e a geração de renda local.<br><br>

      <strong>Quem pode visitar?</strong><br>
      Qualquer cidadão (menores acompanhados) e PcD.<br><br>

      <strong>Visitas:</strong><br>
      Segunda a sexta, das 8h às 12h e das 13h às 17h.<br>
      Visitas guiadas via Guia Curitiba.<br><br>

      <strong>Cursos:</strong><br>
      Presenciais mensais e cursos EAD pelo Aprendere (SMSAN).<br><br>

      <strong>Contato:</strong><br>
      ☎️ (41) 3267-9128<br>
      📱 WhatsApp (41) 9951-0900<br>
      ✉️ fazendaurbana@curitiba.pr.gov.br
    `
  },

  {
    nome: "Horta Projeto Oásis",
    tipo: "horta",
    bairro: "Alto Boqueirão",
    lat: -25.5203,
    lng: -49.2569,
    endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão"
  },
  {
    nome: "Horta Comunitária Cristo Rei",
    tipo: "horta",
    bairro: "Cristo Rei",
    lat: -25.4359,
    lng: -49.2413,
    endereco: "R. Roberto Cichon, 183 – Cristo Rei"
  },
  {
    nome: "Horta Maria Angélica",
    tipo: "horta",
    bairro: "Pinheirinho",
    lat: -25.5385,
    lng: -49.2958,
    endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho"
  },
  {
    nome: "Horta Comunitária Amigos da Fazendinha",
    tipo: "horta",
    bairro: "Fazendinha",
    lat: -25.4914,
    lng: -49.3283,
    endereco: "R. Afrânio Peixoto, 330 – Fazendinha"
  },
  {
    nome: "Horta Comunitária Dembinski II",
    tipo: "horta",
    bairro: "CIC",
    lat: -25.5006,
    lng: -49.3554,
    endereco: "R. Rio do Sul – CIC"
  },
  {
    nome: "Horta Comunitária do Jacu",
    tipo: "horta",
    bairro: "Bom Retiro",
    lat: -25.4079,
    lng: -49.2708,
    endereco: "Rua Ângelo Zeni – Bom Retiro"
  }
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

