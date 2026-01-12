document.addEventListener("DOMContentLoaded", function () {
  
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
        <p>
          Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil.
          Atua como centro de referência, com visitas e cursos. Possui hortas modelo,
          estufas, composteiras, sala multiuso e escola de gastronomia social.
        </p>
        <hr>
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
        <p>
          Operando desde outubro de 2025, possui proposta semelhante à Fazenda Urbana Cajuru,
          com maior integração ao ecossistema de produção de alimentos da Região Metropolitana
          de Curitiba. Atua em capacitações, testes de técnicas e tecnologias.
        </p>
        <hr>
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
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      descricao: `
        <p><strong>FAZENDA URBANA TATUQUARA</strong></p>
        <p>
          Praça viva de convivência e bem-estar, onde paisagismo e cultivo se unem.
          Espaço aberto que valoriza a produção de alimentos, o empreendedorismo
          e a geração de renda local.
        </p>
        <hr>
        <p><strong>Quem pode visitar?</strong><br>
        Qualquer cidadão (menores acompanhados) e PcD.</p>

        <p><strong>Visitas:</strong><br>
        Segunda a sexta, das 8h às 12h e das 13h às 17h.</p>

        <p><strong>Cursos:</strong><br>
        Presenciais e EAD pelo Aprendere (SMSAN).</p>

        <p><strong>Contato:</strong><br>
        ☎️ (41) 3267-9128<br>
        📱 <a href="https://wa.me/554199510900" target="_blank">WhatsApp</a><br>
        ✉️ fazendaurbana@curitiba.pr.gov.br</p>
      `
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
    },
    {
      nome: "Horta Comunitária Amigos da Fazendinha",
      tipo: "horta",
      lat: -25.4914,
      lng: -49.3283,
      endereco: "R. Afrânio Peixoto, 330 – Fazendinha"
    },
    {
      nome: "Horta Comunitária Dembinski II",
      tipo: "horta",
      lat: -25.5006,
      lng: -49.3554,
      endereco: "R. Rio do Sul – CIC"
    },
    {
      nome: "Horta Comunitária do Jacu",
      tipo: "horta",
      lat: -25.4079,
      lng: -49.2708,
      endereco: "Rua Ângelo Zeni – Bom Retiro"
    }
  ];

  const cards = document.getElementById("cards");

  locais.forEach((local, index) => {
    L.marker([local.lat, local.lng]).addTo(map);

    const card = document.createElement("div");
    card.className = local.tipo === "fazenda" ? "card fazenda" : "card";

    card.innerHTML = `
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>

      ${local.tipo === "fazenda"
        ? `<button onclick="abrirModal(${index})">Conhecer a Fazenda</button>`
        : ""
      }

      <button onclick="verNoMapa(${local.lat}, ${local.lng})">Ver no mapa</button>
    `;

    cards.appendChild(card);
  });

  window.abrirModal = function (index) {
    document.getElementById("modalTitulo").innerText = locais[index].nome;
    document.getElementById("modalDescricao").innerHTML = locais[index].descricao;
    document.getElementById("modalFazenda").style.display = "flex";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
  };

  window.buscarEndereco = function () {
    document.getElementById("naoEncontrou").style.display = "flex";
  };

});
