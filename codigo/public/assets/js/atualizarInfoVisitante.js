document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"), 10);

  if (isNaN(userId)) {
    console.error("ID do usuário inválido");
    return;
  }

  // Carregar dados do usuário
  fetch("../../../db/usuarios.json")
    .then((response) => response.json())
    .then((usuarios) => {
      const usuario = usuarios.find((user) => user.id === userId);

      if (!usuario) {
        console.error("Usuário não encontrado");
        return;
      }

      exibirInformacoesDoUsuario(usuario);

      // Carregar e exibir os eventos do usuário
      carregarEventosDoUsuario(userId);
    })
    .catch((error) =>
      console.error("Erro ao carregar os dados do usuário:", error)
    );
});

function exibirInformacoesDoUsuario(usuario) {
  const fotoPerfil = document.getElementById("foto_perfil");
  const nomeUsuario = document.querySelector(".text-content h1");
  const descricaoUsuario = document.querySelector(".descricao");
  const localizacaoUsuario = document.getElementById("localizacao_usuario");

  if (usuario.imagemPerfil) {
    fotoPerfil.src = usuario.imagemPerfil;
    fotoPerfil.alt = `Foto de perfil de ${usuario.nome}`;
  } else {
    fotoPerfil.src = "../../assets/images/perfil-usuario/foto-perfil.png";
    fotoPerfil.alt = "Avatar padrão";
  }

  nomeUsuario.textContent = usuario.nome || "Nome não disponível";
  descricaoUsuario.textContent = usuario.bio || "Nenhuma descrição disponível.";
  localizacaoUsuario.textContent =
    usuario.localizacao || "Localização não especificada.";
}

// Carregar os eventos do usuário
function carregarEventosDoUsuario(usuarioId) {
  fetch("../../../db/eventos.json") // Caminho do arquivo de eventos
    .then((response) => response.json())
    .then((eventos) => {
      // Converter usuarioId para número para garantir a comparação correta
      const eventosUsuario = eventos.filter(
        (evento) => parseInt(evento.usuarioId, 10) === usuarioId
      );

      if (eventosUsuario.length === 0) {
        console.log("Nenhum evento encontrado para este usuário");
        return;
      }

      exibirEventos(eventosUsuario);
    })
    .catch((error) => console.error("Erro ao carregar os eventos:", error));
}

// Exibir os eventos no HTML
function exibirEventos(eventos) {
  const meusEventosContainer = document.querySelector(".meus-eventos");
  meusEventosContainer.innerHTML = ""; // Limpar eventos antigos

  eventos.forEach((evento) => {
    const cardEvento = document.createElement("div");
    cardEvento.classList.add("card");

    cardEvento.innerHTML = `
      <img alt="Imagem do evento" src="${evento.imagem}" />
      <div class="card-evento">
        <h1>${evento.nome}</h1>
        <h2>${evento.local}</h2>
        <p>${evento.descricao}</p>
        <hr />
        <h3>Tags</h3>
        <div class="tags">
          ${evento.tags.map((tag) => `<div class="tag">${tag}</div>`).join("")}
        </div>
      </div>
    `;

    meusEventosContainer.appendChild(cardEvento);
  });
}
