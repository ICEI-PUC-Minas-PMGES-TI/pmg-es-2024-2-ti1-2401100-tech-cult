document.addEventListener("DOMContentLoaded", () => {
  // Carregar eventos do arquivo JSON
  fetch("../../../db/eventos.json")
    .then(response => response.json())
    .then(data => {
      carregarEventosInteressantes(data);
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));
});

function carregarEventosInteressantes(eventos) {
  const cardsContainer = document.querySelector(".card-deck");
  cardsContainer.innerHTML = ''; // Limpar eventos anteriores

  eventos.forEach((evento, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index; // Armazena o índice do evento para referência

    const tagsHTML = evento.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');

    // Estrutura do card com os dados do evento
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

    // Adiciona o evento de clique ao card para abrir o modal
    card.addEventListener('click', () => abrirModal(evento));
    cardsContainer.appendChild(card);
  });
}

function abrirModal(evento) {
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-left img').src = evento.imagem;
  modal.querySelector('.modal-right h2').textContent = evento.nome;
  modal.querySelector('.comment-section').textContent = evento.descricao; // Exemplo de uso, adicionar mais se necessário
  modal.style.display = 'flex';
}

// Fechar o modal ao clicar no botão de fechar
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function (event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
});

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
  // carregarEventosDestaque(data);
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

function carregarEventosInteressantes(eventos) {
  const cardsContainer = document.querySelector(".card-deck");
  cardsContainer.innerHTML = ''; // Limpar eventos anteriores

  eventos.forEach((evento, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index; // Armazena o índice do evento para referência

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

    // Adiciona o evento de clique ao card para abrir o modal
    card.addEventListener('click', () => abrirModal(evento));
    cardsContainer.appendChild(card);
  });
}