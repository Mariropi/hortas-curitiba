var map = L.map('map', {
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
    nome: "Fazenda Urbana Tatuquara",
    lat: -25.5877,
    lng: -49.3482,
    endereco: "Rua Olivardo Konoroski Bueno, 177 – Tatuquara",
    tipo: "fazenda",
    imagem: "https://lh3.googleusercontent.com/p/AG0ilSyExample=w600",
    descricao: "Praça viva de convivência, cultivo e geração de renda local."
  },
  {
    nome: "Horta Comunitária Dembinski II",
    lat: -25.5206,
    lng: -49.3073,
    endereco: "Rua Rio do Sul, em frente ao nº 2290 – CIC",
    tipo: "horta",
    imagem: "",
    descricao: "Produção comunitária e segurança alimentar."
  },
  {
    nome: "Horta Comunitária do Jacu",
    lat: -25.4189,
    lng: -49.2731,
    endereco: "Rua Ângelo Zeni, em frente ao nº 56 – Bom Retiro",
    tipo: "horta",
    imagem: "",
    descricao: "Educação ambiental e integração social."
  },
  {
    nome: "Horta Comunitária de Calçada Cristo Rei",
    lat: -25.4359,
    lng: -49.2413,
    endereco: "R. Roberto Cichon, 183 – Cristo Rei",
    tipo: "horta",
    imagem: "",
    descricao: "Horta urbana implantada em área pública, promovendo convivência comunitária."
  },
  {
    nome: "Horta Maria Angélica",
    lat: -25.5385,
    lng: -49.2958,
    endereco: "Rua Monte das Oliveiras, 260 – Pinheirinho",
    tipo: "horta",
    imagem: "",
    descricao: "Horta comunitária voltada à alimentação saudável e educação ambiental."
  },
  {
    nome: "Horta Comunitária Amigos da Fazendinha",
    lat: -25.4911,
    lng: -49.3281,
    endereco: "R. Afrânio Peixoto, 330 – Fazendinha",
    tipo: "horta",
    imagem: "https://lh3.googleusercontent.com/p/AF1QipMAH5qow5GWBHrvVFD1OC0YM6iwhqv2eQJpqvtV=w600",
    descricao: "Horta comunitária com foco em convivência e alimentação saudável."
  },
  {
    nome: "Horta Comunitária Uma Nova Curitiba",
    lat: -25.4280,
    lng: -49.3606,
    endereco: "Rua Olívia G. Freitas, 471 – Orleans",
    tipo: "horta",
    imagem: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy2i08SAzI2KnbTqXSqcRvYu_pW3B1QRjVTp4wqsyAxaUrZ6tdytO6tkHfxsbrciErVjW0RGvF6sbOKn71lOSO83S3ZJ-NhU9Sd8ErejjQww08Uqq4y8OIoGaaZNCb7DXl068aRsA=w600",
    descricao: "Horta urbana voltada à integração comunitária."
  }
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
}
