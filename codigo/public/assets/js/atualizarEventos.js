document.addEventListener("DOMContentLoaded", () => {
  // Busca o JSON com os dados dos eventos
  fetch("../../../db/eventos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados.");
      }
      return response.json();
    })
    .then((data) => {
      carregarMeusEventos(data);
    })
    .catch((error) => console.error("Erro ao carregar os dados:", error));
});

// Função para carregar e exibir os eventos na seção "Meus Eventos"
function carregarMeusEventos(eventos) {
  const containerEventos = document.querySelector(".meus-eventos");

  // Limpa os eventos antigos (se houver)
  containerEventos.innerHTML = "";

  // Obtém o userId do localStorage
  const userId = localStorage.getItem("userId");

  // Verifica se o userId foi encontrado e garante que ele seja uma string para comparação
  if (userId) {
    // Filtra os eventos com base no userId, convertendo ambos para string
    const eventosDoUsuario = eventos.filter(
      (evento) => String(evento.usuarioId) === String(userId)
    );

    // Verifica se há eventos para o usuário
    if (eventosDoUsuario.length === 0) {
      containerEventos.innerHTML = "<p>Você não tem eventos registrados.</p>";
    } else {
      // Exibe os eventos do usuário
      eventosDoUsuario.forEach((evento) => {
        const card = document.createElement("div");
        card.className = "card";

        // A imagem agora pode ser diretamente o caminho do arquivo
        const imagemEvento = evento.imagem || "https://placehold.co/300x200"; // Caso não tenha imagem

        // Monta o conteúdo do card
        card.innerHTML = `
          <img src="${imagemEvento}" alt="${evento.nome}" />
          <div class="card-evento">
            <h1>${evento.nome}</h1>
            <p>${evento.descricao || "Descrição não disponível"}</p>
            <hr />
            <h3>Tags</h3>
            <div class="tags">
              ${
                evento.tags && evento.tags.length > 0
                  ? evento.tags
                      .map((tag) => `<div class="tag">${tag}</div>`)
                      .join("")
                  : "<div class='tag'>Sem tags</div>"
              }
            </div>
          </div>
        `;

        // Adiciona o card ao container
        containerEventos.appendChild(card);
      });
    }
  } else {
    containerEventos.innerHTML = "<p>Você não está logado.</p>";
  }
}

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
  descricaoUsuario.textContent =
    usuario.descricao || "Nenhuma descrição disponível.";
  localizacaoUsuario.textContent =
    usuario.localizacao || "Localização não especificada.";
}

// Carregar os eventos do usuário
function carregarEventosDoUsuario(usuarioId) {
  fetch("../../../db/eventos.json") // Caminho do arquivo de eventos
    .then((response) => response.json())
    .then((eventos) => {
      const eventosUsuario = eventos.filter(
        (evento) => evento.usuarioId === usuarioId
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
