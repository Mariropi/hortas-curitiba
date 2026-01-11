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
      descricao: "Espaço pioneiro no Brasil dedicado à educação para a agricultura urbana, com hortas modelo, estufas, composteiras, cursos, visitas guiadas, sala multiuso e escola de gastronomia social."
    },
    {
      nome: "Fazenda Urbana CIC",
      tipo: "fazenda",
      lat: -25.4900288,
      lng: -49.3539665,
      endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
      imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w800",
      descricao: "Fazenda dedicada à capacitação em agricultura urbana e integração com o ecossistema alimentar da região metropolitana. Dedicada a capacitações em temas relacionados ao ecossistema alimentar, assim como a testagem de técnicas e tecnologias."
    },
    {
      nome: "Fazenda Urbana Tatuquara",
      tipo: "fazenda",
      lat: -25.5877,
      lng: -49.3482,
      endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
      imagem: "",
      descricao: "Praça viva de convivência e bem-estar, unindo paisagismo, cultivo de alimentos e geração de renda local."
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

  locais.forEach((local, index) => {
    const div = document.createElement("div");
    div.className = local.tipo === "fazenda" ? "card fazenda" : "card";

    div.innerHTML = `
      <h3>${local.nome}</h3>
      <p>${local.endereco}</p>

      ${local.tipo === "fazenda"
        ? `<button onclick="abrirModalFazenda(${index})">Conhecer a Fazenda</button>`
        : ""
      }

      <button onclick="verNoMapa(${local.lat}, ${local.lng})">
        Ver no mapa
      </button>
    `;

    cards.appendChild(div);
  });

  window.verNoMapa = function (lat, lng) {
    map.setView([lat, lng], 16);
  };

  window.abrirModalFazenda = function (index) {
    const fazenda = locais[index];

    document.getElementById("modalTitulo").innerText = fazenda.nome;
    document.getElementById("modalEndereco").innerText = fazenda.endereco;
    document.getElementById("modalDescricao").innerText = fazenda.descricao || "";

    const img = document.getElementById("modalImagem");
    if (fazenda.imagem) {
      img.src = fazenda.imagem;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }

    document.getElementById("modalFazenda").style.display = "block";
  };

  window.fecharModal = function () {
    document.getElementById("modalFazenda").style.display = "none";
  };

  window.buscarEndereco = function () {
    const endereco = document.getElementById("endereco").value;

    if (!endereco) {
      alert("Por favor, digite seu endereço.");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}, Curitiba, PR`)
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          mostrarSemHorta();
          return;
        }

        const origemLat = parseFloat(data[0].lat);
        const origemLng = parseFloat(data[0].lon);

        let maisProxima = null;
        let menorDist = Infinity;

        locais.forEach(local => {
          const dist = Math.sqrt(
            Math.pow(local.lat - origemLat, 2) +
            Math.pow(local.lng - origemLng, 2)
          );
          if (dist < menorDist) {
            menorDist = dist;
            maisProxima = local;
          }
        });

        if (!maisProxima) {
          mostrarSemHorta();
          return;
        }

        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${origemLat},${origemLng}&destination=${maisProxima.lat},${maisProxima.lng}`,
          "_blank"
        );
      })
      .catch(() => mostrarSemHorta());
  };

  function mostrarSemHorta() {
    document.getElementById("cardSemHorta").scrollIntoView({ behavior: "smooth" });
  }

});
