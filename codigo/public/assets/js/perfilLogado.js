document.addEventListener("DOMContentLoaded", () => {
  // Recupera o userId do localStorage e valida
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("Usuário não encontrado no localStorage");
    return;
  }

  // Buscar dados dos usuários
  fetch("../../../db/usuarios.json")
    .then((response) => response.json())
    .then((usuarios) => {
      const usuario = usuarios.find((user) => user.id === Number(userId));

      if (!usuario) {
        console.error("Usuário não encontrado");
        return;
      }

      // Atualizar a imagem de perfil
      atualizarImagemDePerfil(usuario);
    })
    .catch((error) => {
      console.error("Erro ao carregar os dados do usuário:", error);
    });
});

// Função para atualizar a imagem de perfil
function atualizarImagemDePerfil(usuario) {
  const fotoPerfil = document.querySelector(".icon-perfil");
  const perfilIcon = document.querySelector(".perfil-icon");

  // Se o usuário tiver uma imagem personalizada
  if (usuario.imagemPerfil) {
    fotoPerfil.src = usuario.imagemPerfil;
    fotoPerfil.alt = `Foto de perfil de ${usuario.nome}`;

    // Remove o padding e aplica as configurações de tamanho e ajuste de imagem
    perfilIcon.style.padding = "0"; // Remove o padding do contêiner
    fotoPerfil.style.objectFit = "cover"; // A imagem se ajusta para cobrir o espaço
    fotoPerfil.style.height = "55px"; // Aumenta o tamanho da imagem
    fotoPerfil.style.width = "55px"; // Ajuste proporcional da largura
    perfilIcon.style.marginTop = "7px";
  } else {
    // Caso não tenha imagem personalizada, usa a imagem padrão
    fotoPerfil.src = "../../assets/images/perfil-usuario/perfil.png";
    fotoPerfil.alt = "Avatar padrão";

    // Mantém o padding e configura a imagem padrão
    perfilIcon.style.padding = "7px"; // Padding para imagem padrão
    fotoPerfil.style.objectFit = "contain"; // Ajuste para imagem padrão sem cortar
    fotoPerfil.style.height = "32px"; // Tamanho original
    fotoPerfil.style.width = "32px"; // Tamanho original
  }
}
