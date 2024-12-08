document.addEventListener("DOMContentLoaded", () => {
  // Carregar eventos e usuários dos arquivos JSON
  Promise.all([
    fetch("../../../db/eventos.json").then(response => response.json()),
    fetch("../../../db/usuarios.json").then(response => response.json())
  ])
  .then(([eventos, usuarios]) => {
    // Armazena os dados globalmente para uso na pesquisa
    window.eventosData = eventos;
    window.usuariosData = usuarios;
    carregarEventosInteressantes(eventos, usuarios);

    // Configurar o botão de pesquisa
    const searchButton = document.querySelector('.search-btn');
    searchButton.addEventListener('click', function () {
      const searchInput = document.querySelector('.search-input').value.toLowerCase();
      filtrarEventosPorTituloETag(eventos, usuarios, searchInput);
    });
  })
  .catch(error => console.error("Erro ao carregar os dados:", error));
});

function carregarEventosInteressantes(eventos, usuarios) {
  const cardsContainer = document.querySelector(".card-deck");
  cardsContainer.innerHTML = ''; // Limpar eventos anteriores

  eventos.forEach((evento, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index; // Armazena o índice do evento para referência

    const tagsHTML = evento.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');

    // Encontrar informações do criador do evento
    const creator = usuarios.find(user => user.id === parseInt(evento.usuarioId));
    let creatorName = "Desconhecido";
    let creatorLink = "#";
    if (creator) {
      creatorName = creator.nome;
      creatorLink = `../visualizar_perfil/usuario${creator.id}.html`; // Ajuste essa URL conforme sua estrutura
    }

    // Estrutura do card com os dados do evento
    card.innerHTML = `
      <img class="card-img-top" src="${evento.imagem}" alt="${evento.nome}">
      <div class="card-body">
          <h4 class="bold">${evento.nome}</h4>
          <p class="card-text">${evento.descricao}</p>
          <p class="card-date"><strong>Data:</strong> ${evento.data}</p>
          <p class="card-rules"><strong>Regras:</strong> ${evento.regras}</p>
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
    card.addEventListener('click', () => abrirModal(evento, usuarios));
    cardsContainer.appendChild(card);
  });
}

function abrirModal(evento, usuarios) {
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-left img').src = evento.imagem;
  modal.querySelector('.modal-right h2').textContent = evento.nome;
  
  // Atualizar o modal com dados adicionais do evento
  const modalContent = `
    <p><strong>Descrição:</strong> ${evento.descricao}</p>
    <p><strong>Data:</strong> ${evento.data}</p>
    <p><strong>Regras:</strong> ${evento.regras}</p>
  `;
  modal.querySelector('.comment-section').innerHTML = modalContent;

  // Encontrar informações do criador do evento
  const creator = usuarios.find(user => user.id === parseInt(evento.usuarioId));
  if (creator) {
    modal.querySelector('.agent-info a').textContent = creator.nome;
    modal.querySelector('.agent-info a').href = `../visualizar_perfil/usuario${creator.id}.html`; // Link para o perfil
    if (creator.imagemPerfil) {
      modal.querySelector('.principal-avatar').innerHTML = `<img src="${creator.imagemPerfil}" alt="Foto de perfil de ${creator.nome}">`;
    } else {
      modal.querySelector('.principal-avatar').textContent = "Sem imagem de perfil";
    }
  }
  
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

// Função para filtrar eventos
function filtrarEventosPorTituloETag(eventos, usuarios, term) {
  const filteredEventos = eventos.filter(evento => {
    const titleMatch = evento.nome.toLowerCase().includes(term);
    const tagMatch = evento.tags.some(tag => tag.toLowerCase().includes(term));
    return titleMatch || tagMatch;
  });
  carregarEventosInteressantes(filteredEventos, usuarios);
}