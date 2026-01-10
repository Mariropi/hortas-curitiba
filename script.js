document.addEventListener("DOMContentLoaded", function () {
var map = L.map('map', {
  dragging: true,
  tap: true,
  touchZoom: true,
  scrollWheelZoom: false
}).setView([-25.4284, -49.2733], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);
const locais = [
const locais = [
  {
    nome: "Fazenda Urbana Cajuru",
    lat: -25.4422,
    lng: -49.2316,
    endereco: "Av. Prefeito Maurício Fruet, 1880 – Cajuru",
    tipo: "fazenda",
    imagem: "https://www.bemparana.com.br/wp-content/uploads/2023/07/fazenda-urbana-cajuru.jpg",
    descricao: "Espaço pioneiro no Brasil dedicado à educação para a agricultura urbana."
  },
  {
    nome: "Fazenda Urbana CIC",
    lat: -25.4900,
    lng: -49.3539,
    endereco: "Rua Maria Lúcia Locher Athayde, 7974 – São Miguel",
    tipo: "fazenda",
    imagem: "https://lh3.googleusercontent.com/p/AG0ilSzjPTTYCXlgtikRsJEsRckENO9M6ZEjW0xFJ5-PPfr4gQHPXlEBKBeYaPgU0QTbylRNqh1jqdXvpllXvv3iYnSD-A8wMeWRtw0TXLNHyogV04NjEBf-8W6gxLKFexEpCBwEopY86g=w600",
    descricao: "Capacitação e testagem de técnicas do ecossistema alimentar."
  },
  {
    nome: "Horta Projeto Oásis",
    lat: -25.5203,
    lng: -49.2569,
    endereco: "Rua Padre Stanislau Trzebialowski, 252 – Alto Boqueirão",
    tipo: "horta",
    imagem: "",
    descricao: "Horta comunitária localizada no Alto Boqueirão, voltada à produção de alimentos e fortalecimento da comunidade local."
  }
];
