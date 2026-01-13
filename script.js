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
      descricao: `
        <strong>FAZENDA URBANA CAJURU</strong><br><br>
        Dedicada à educação para a agricultura urbana, sendo um espaço pioneiro no Brasil.
        Atua como centro de referência municipal, promovendo visitas, cursos e atividades educativas.
        Possui modelos de hortas, estufas, composteiras, sala multiuso e escola de gastronomia social.
        <br><br>
        <strong>Quem pode visitar?</strong><br>
        Qualquer cidadão (menores acompanhados) e PcD.<br><br>
        <strong>Visitas:</strong><br>
        Segunda a sexta, das 8h às 12h e das 13h às 17h.<br>
        Visitas guiadas via Guia Curitiba.<br><br>
        <strong>Cursos:</strong><br>
        Presenciais mensais e cursos EAD pelo Aprendere (SMSAN).<br><br>
        <strong>Contato:</strong><br>
        ☎️ (41) 3267-9128<br>
        📱 <a href="https://wa.me/554199510900" target="_blank">WhatsApp</a><br>
        ✉️ <a href="mailto:fazendaurbana@curitiba.pr.gov.br">fazendaurbana@curitiba.pr.gov.br</a>
      `
    },

    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900288,
      lng: -49.3539665,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      descricao: "Fazenda Urbana CIC – integração com o ecossistema alimentar metropolitano."
    },

    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      descricao: "Praça viva de convivência, produção de alimentos e geração de renda."
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

  const markers = [];

  locais.forEach(local => {
    const marker = L.marker([local.lat, local.lng])
      .addTo(map)
      .bindPopup(`<strong>${local.nome}</strong><br>${local.endereco}`);
    markers.push({ marker, local });
  });

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;
    const naoEncontrou = document.getElementById("naoEncontrou");

    naoEncontrou.style.display = "none";

    if (!endereco) {
      alert("Digite seu endereço ou bairro.");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          naoEncontrou.style.display = "block";
          return;
        }

        const latUser = parseFloat(data[0].lat);
        const lngUser = parseFloat(data[0].lon);

        let maisProximo = null;
        let menorDistancia = Infinity;

        locais.forEach(local => {
          const distancia = Math.sqrt(
            Math.pow(local.lat - latUser, 2) +
            Math.pow(local.lng - lngUser, 2)
          );

          if (distancia < menorDistancia) {
            menorDistancia = distancia;
            maisProximo = local;
          }
        });

        // Aproximadamente 10km
        if (menorDistancia > 0.09) {
          naoEncontrou.style.display = "block";
          return;
        }

        map.setView([maisProximo.lat, maisProximo.lng], 16);

        markers.forEach(obj => {
          if (obj.local.nome === maisProximo.nome) {
            obj.marker.openPopup();
          }
        });
      })
      .catch(() => {
        naoEncontrou.style.display = "block";
      });
  };

  window.abrirModal = function (index) {
    document.getElementById("modalTitulo").innerText = locais[index].nome;
    document.getElementById("modalDescricao").innerHTML = locais[index].descricao;
    document.getElementById("modalFazenda").style.display = "flex";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

});
