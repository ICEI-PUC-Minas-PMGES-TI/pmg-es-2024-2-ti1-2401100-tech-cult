document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Envia a requisição para a API de login
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((response) => {
      // Verifica o status da resposta HTTP
      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor.");
      }
      return response.json();
    })
    .then((data) => {
      // Verificando se a resposta contém a mensagem de sucesso
      if (data.message) {
        // Verificando se os dados do usuário estão corretos
        if (data.usuario) {
          // Garantir que os dados do usuário não sejam undefined
          const userId = data.usuario.id;
          const userName = data.usuario.nome;

          if (userId && userName) {
            // Verificar se os dados já estão no localStorage
            const currentUserId = localStorage.getItem("userId");
            const currentUserName = localStorage.getItem("userName");

            // Apenas salvar se os dados no localStorage forem diferentes
            if (userId !== currentUserId || userName !== currentUserName) {
              localStorage.setItem("userId", userId);
              localStorage.setItem("userName", userName);

              // Log para garantir que os dados estão sendo salvos corretamente
              console.log("User ID salvo:", localStorage.getItem("userId"));
              console.log("User Name salvo:", localStorage.getItem("userName"));
            } else {
              // Caso os dados já estejam no localStorage, não faz nada
              console.log("Dados do usuário já estão no localStorage.");
            }

            // Redireciona para a página do feed
            window.location.href = "../../modulos/feed/feed.html";
          } else {
            // Caso o ID ou o nome estejam ausentes
            alert("Erro ao recuperar os dados do usuário.");
          }
        } else {
          // Caso a resposta não contenha o campo 'usuario'
          alert("Erro no login, dados inválidos.");
        }
      } else {
        // Caso a resposta contenha um erro
        alert(data.error || "Erro desconhecido.");
      }
    })
    .catch((error) => {
      // Erro ao tentar realizar o login
      console.error("Erro no login:", error);
      alert("Erro ao tentar fazer login. Tente novamente.");
    });
});
