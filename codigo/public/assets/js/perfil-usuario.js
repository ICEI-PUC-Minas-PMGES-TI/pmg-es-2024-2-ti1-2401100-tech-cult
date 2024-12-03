document.addEventListener("DOMContentLoaded", () => {
  const containerEventos = document.querySelector(".meus-eventos");

  // Função para buscar eventos do servidor e renderizar na tela
  function carregarEventos() {
    fetch("http://localhost:3000/api/events/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao carregar eventos.");
        }
        return resposta.json();
      })
      .then((eventos) => {
        // Limpa os cards estáticos
        containerEventos.innerHTML = "";

        if (eventos.length === 0) {
          containerEventos.innerHTML = `<p>Não há eventos cadastrados.</p>`;
          return;
        }

        // Renderiza os eventos dinamicamente
        eventos.forEach((evento) => {
          const card = document.createElement("div");
          card.classList.add("card");

          // Verifica se a imagem existe, caso contrário, usa a imagem padrão
          const imagemEvento = evento.imagem
            ? `http://localhost:3000/uploads${evento.imagem}`
            : "https://placehold.co/300x200";

          card.innerHTML = `
            <img src="${imagemEvento}" alt="${evento.nome}" />
            <div class="card-evento">
              <h1>${evento.nome}</h1>
              <p>${evento.descricao || "Descrição não disponível"}</p>
              <hr />
              <h3>Tags</h3>
              <div class="tags">
                ${evento.tags
                  .map((tag) => `<div class="tag">${tag}</div>`)
                  .join("")}
              </div>
            </div>
          `;

          containerEventos.appendChild(card);
        });
      })
      .catch((erro) => {
        console.error("Erro ao carregar eventos:", erro);
        containerEventos.innerHTML = `<p>Erro ao carregar eventos. Tente novamente mais tarde.</p>`;
      });
  }

  // Chama a função ao carregar a página
  carregarEventos();
});
