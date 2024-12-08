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
