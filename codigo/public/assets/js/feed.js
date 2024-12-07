// MODAL:
const cards = document.querySelectorAll('.cards');

cards.forEach(card => {
  card.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex';
  });
});

document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("../../../db/feed.json")
    .then(response => response.json())
    .then(data => {
      carregarEventosDestaque(data.eventosEmDestaque);
      carregarEventosInteressantes(data.eventosInteressantes);
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));
});

function carregarEventosDestaque(eventos) {
  const carousel = document.querySelector(".card-deck");
  eventos.forEach(evento => {
    const cell = document.createElement("div");
    cell.className = "card-img";
    cell.innerHTML = `<img src="${evento.imagem}" alt="${evento.alt}">`;
  });
}

function carregarEventosInteressantes(eventos) {
  const cardsContainer = document.querySelector(".cards");
  eventos.forEach(evento => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img class="card-img-top" src="${evento.imagem}" alt="${evento.titulo}">
        <div class="card-body">
          <button class="feed-btn flex bold">${evento.titulo}</button>
          <h4 class="bold event-description">Descrição do evento</h4>
          <p class="card-text">${evento.descricao}
          <div class="location-info">
            <div class="location-address flex">
              <img src="../../assets/images/feed/location-icon.png" alt="Ícone de localização">
              <p>${evento.local}</p>
            </div>
            <div class="location-clock flex">
              <img src="../../assets/images/feed/clock-icon.png" alt="Ícone de relógio">
              <p>${evento.horario}</p>
            </div>
          </div>
        </div>
      `;
    cardsContainer.appendChild(card);
  });
}

// *************************************************** / 
// PESQUISA POR TAGS E POR TÍTULO

document.addEventListener("DOMContentLoaded", () => {
    fetch("../../../db/eventos.json")
        .then(response => response.json())
        .then(data => {
            mostrarEventos(data);
        })
        .catch(error => console.error("Erro ao carregar os dados:", error));
});

function mostrarEventos(data) {
    carregarEventosDestaque(data);
    carregarEventosInteressantes(data);
    
    const searchButton = document.querySelector('.search-btn');
    searchButton.addEventListener('click', function () {
        const searchInput = document.querySelector('.search-input').value.toLowerCase();
        filtrarEventosPorTituloETag(data, searchInput);
    });
}

function filtrarEventosPorTituloETag(eventos, term) {
    const filteredEventos = eventos.filter(evento => {
        const titleMatch = evento.nome.toLowerCase().includes(term);
        const tagMatch = evento.tags.some(tag => tag.toLowerCase().includes(term));
        return titleMatch || tagMatch;
    });
    carregarEventosInteressantes(filteredEventos);
}

function carregarEventosDestaque(eventos) {
    const carousel = document.querySelector(".gallery");
    carousel.innerHTML = ''; // Limpar eventos anteriores
    eventos.forEach(evento => {
        const cell = document.createElement("div");
        cell.className = "gallery-cell";
        cell.innerHTML = `<img src="${evento.imagem}" alt="${evento.nome}">`;
        carousel.appendChild(cell);
    });
}

function carregarEventosInteressantes(eventos) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = ''; // Limpar eventos anteriores
    eventos.forEach(evento => {
        const card = document.createElement("div");
        card.className = "card";
        const tagsHTML = evento.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
        card.innerHTML = `
            <img class="card-img-top" src="${evento.imagem}" alt="${evento.nome}">
            <div class="card-body">
                <h4 class="bold">${evento.nome}</h4>
                <p class="card-text">${evento.descricao}</p>
                <div class="tag-container">${tagsHTML}</div>
                <div class="location-info">
                    <div class="location-address flex">
                        <img src="../../assets/images/feed/location-icon.png" alt="Ícone de localização">
                        <p>${evento.local || 'Local não especificado'}</p>
                    </div>
                    <div class="location-clock flex">
                        <img src="../../assets/images/feed/clock-icon.png" alt="Ícone de relógio">
                        <p>${evento.hora}</p>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}