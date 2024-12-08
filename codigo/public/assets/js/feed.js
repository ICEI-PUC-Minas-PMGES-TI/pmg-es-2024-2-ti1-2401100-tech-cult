document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = true; // Mude para false se quiser simular um usuário deslogado

  Promise.all([
    fetch("../../../db/eventos.json").then((response) => response.json()),
    fetch("../../../db/usuarios.json").then((response) => response.json()),
  ])
    .then(([eventos, usuarios]) => {
      window.eventosData = eventos;
      window.usuariosData = usuarios;
      carregarEventosInteressantes(eventos, usuarios, usuarioLogado);
    })
    .catch((error) => console.error("Erro ao carregar os dados:", error));
});

function carregarEventosInteressantes(eventos, usuarios, usuarioLogado) {
  const cardsContainer = document.querySelector(".card-deck");
  cardsContainer.innerHTML = ""; // Limpar eventos anteriores

  eventos.forEach((evento, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const tagsHTML = evento.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join(" ");

    const creator = usuarios.find(
      (user) => user.id === parseInt(evento.usuarioId)
    );
    let creatorName = "Desconhecido";
    let creatorLink = "#";
    if (creator) {
      creatorName = creator.nome;
      creatorLink = `../perfil-visitante/perfil-visitante.html?id=${creator.id}`;
    }

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
                  <p>${evento.local || "Local não especificado"}</p>
              </div>
              <div class="location-clock flex">
                  <img src="../../assets/images/feed/clock-icon.png" alt="Ícone de relógio">
                  <p>${evento.hora}</p>
              </div>
          </div>
          <div class="creator-info">
              <p>Criado por: <a href="${creatorLink}">${creatorName}</a></p>
          </div>
      </div>
    `;

    card.addEventListener("click", () =>
      abrirModal(evento, usuarios, usuarioLogado)
    );
    cardsContainer.appendChild(card);
  });
}

function abrirModal(evento, usuarios, usuarioLogado) {
  const modal = document.getElementById("modal");
  modal.querySelector(".modal-left img").src = evento.imagem;
  modal.querySelector(".modal-right h2").textContent = evento.nome;

  const modalContent = `
    <p><strong>Descrição:</strong> ${evento.descricao}</p>
    <p><strong>Data:</strong> ${evento.data}</p>
    <p><strong>Regras:</strong> ${evento.regras}</p>
    <div class="comments-section">
      <h3 class="bold">Comentários</h3>
      <div class="comments-list"></div>
      ${
        usuarioLogado
          ? `
        <div class="comment-input">
          <input type="text" placeholder="Adicione um comentário...">
          <button id="submit-comment" class="bold">Publicar</button>
        </div>`
          : "<p>Você precisa estar logado para comentar.</p>"
      }
    </div>
  `;
  modal.querySelector(".comment-section").innerHTML = modalContent;

  // Carregar os comentários existentes para esse evento
  carregarComentarios(evento);

  document.getElementById("submit-comment")?.addEventListener("click", () => {
    const commentInput = modal.querySelector(".comment-input input");
    const newComment = commentInput.value.trim();
    if (newComment) {
      const userId = localStorage.getItem("userId"); // Obtém o userId do localStorage
      const eventoId = evento.id;

      if (!userId) {
        alert("Você precisa estar logado para comentar");
        return;
      }

      salvarComentarioNoLocalStorage(eventoId, newComment, userId);
      salvarComentarioNoServidor(eventoId, newComment, userId);

      const commentList = modal.querySelector(".comments-list");
      const commentElement = document.createElement("p");
      commentElement.textContent = newComment;
      commentList.appendChild(commentElement);
      commentInput.value = ""; // Limpa o campo de comentário
    }
  });

  const creator = usuarios.find(
    (user) => user.id === parseInt(evento.usuarioId)
  );
  if (creator) {
    modal.querySelector(".agent-info a").textContent = creator.nome;
    modal.querySelector(
      ".agent-info a"
    ).href = `../perfil-visitante/perfil-visitante.html?id=${creator.id}`;
    if (creator.imagemPerfil) {
      modal.querySelector(
        ".principal-avatar"
      ).innerHTML = `<img src="${creator.imagemPerfil}" alt="Foto de perfil de ${creator.nome}">`;
    } else {
      modal.querySelector(".principal-avatar").textContent =
        "Sem imagem de perfil";
    }
  }

  modal.style.display = "flex";
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});

// Função para carregar comentários de um evento
function carregarComentarios(evento) {
  const storedEventos = JSON.parse(localStorage.getItem("eventos")) || [];
  const eventoIndex = storedEventos.findIndex((e) => e.id === evento.id);
  if (eventoIndex !== -1 && storedEventos[eventoIndex].comentarios) {
    const commentList = document.querySelector(".comments-list");
    storedEventos[eventoIndex].comentarios.forEach((comentario) => {
      const commentElement = document.createElement("p");
      commentElement.textContent = comentario.comentario;
      commentList.appendChild(commentElement);
    });
  }
}

// Função para salvar o comentário no localStorage
function salvarComentarioNoLocalStorage(eventoId, comentario, userId) {
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

  const eventoIndex = eventos.findIndex((evento) => evento.id === eventoId);
  if (eventoIndex !== -1) {
    if (!eventos[eventoIndex].comentarios) {
      eventos[eventoIndex].comentarios = [];
    }
    eventos[eventoIndex].comentarios.push({ comentario, userId });
    localStorage.setItem("eventos", JSON.stringify(eventos));
  }
}

// Função para enviar o comentário para o servidor (eventos.json)
function salvarComentarioNoServidor(eventoId, comentario, userId) {
  fetch("http://localhost:3000/api/comments/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventoId,
      comentario,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Comentário enviado para o servidor", data);
    })
    .catch((error) =>
      console.error("Erro ao salvar comentário no servidor:", error)
    );
}
