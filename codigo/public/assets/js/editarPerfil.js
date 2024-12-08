document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formEditarPerfil");
  const nomeInput = document.querySelector("#nome");
  const bioInput = document.querySelector("#bio");
  const localizacaoInput = document.querySelector("#localizacao");
  const imagemPerfilInput = document.querySelector("#imagemPerfil");
  const imagemPreview = document.querySelector("#imagemPreview");
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
          nomeInput.value = data.usuario.nome || "";
          bioInput.value = data.usuario.bio || "";
          localizacaoInput.value = data.usuario.localizacao || "";
          if (data.usuario.imagemPerfil) {
            imagemPreview.src = data.usuario.imagemPerfil;
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o perfil:", error);
      });
  }

  // Chama a função para carregar os dados ao carregar a página
  carregarPerfil();

  // Evento de visualização da imagem de perfil antes do envio
  imagemPerfilInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagemPreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Função para enviar o formulário e atualizar o perfil
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value;
    const bio = bioInput.value;
    const localizacao = localizacaoInput.value;
    const imagemPerfil = imagemPerfilInput.files[0]; // A imagem do perfil, caso tenha sido selecionada

    const formData = new FormData();
    formData.append("usuarioId", usuarioId);
    formData.append("nome", nome);
    formData.append("bio", bio);
    formData.append("localizacao", localizacao);

    // Se uma imagem foi selecionada, inclui no FormData
    if (imagemPerfil) {
      formData.append("imagemPerfil", imagemPerfil);
    }

    // Enviar os dados para o backend
    fetch("http://localhost:3000/api/editarPerfil", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Perfil atualizado com sucesso!");
          // Opcional: Redireciona o usuário para outra página após o sucesso
          window.location.href = "/perfil.html"; // Mude a URL conforme necessário
        } else {
          alert("Erro ao atualizar perfil.");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil:", error);
        alert("Erro ao atualizar perfil.");
      });
  });
});
