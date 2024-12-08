document.addEventListener("DOMContentLoaded", () => {
  const usuarioId = localStorage.getItem("userId"); // Pega o ID do usuário armazenado no localStorage

  // Verifica se o usuário está autenticado e tem o ID no localStorage
  if (!usuarioId) {
    alert("Usuário não encontrado. Por favor, faça login novamente.");
    window.location.href = "/login.html"; // Redireciona para a página de login
    return;
  }

  // Função para carregar os dados do perfil
  function carregarPerfil() {
    // Exemplo de como carregar os dados do perfil usando o ID do usuário
    fetch(`http://localhost:3000/api/usuarios/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario) {
          // Preenche os dados no HTML
          document.querySelector("#nome_usuario").textContent =
            data.usuario.nome || "Nome não definido";
          document.querySelector("#bio_usuario").textContent =
            data.usuario.bio || "Bio não definida.";
          document.querySelector("#localizacao_usuario").textContent =
            data.usuario.localizacao || "Localização não definida.";

          if (data.usuario.imagemPerfil) {
            document.querySelector("#foto_perfil").src =
              data.usuario.imagemPerfil;
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o perfil:", error);
        alert("Erro ao carregar perfil.");
      });
  }

  // Chama a função para carregar os dados ao carregar a página
  carregarPerfil();
});
