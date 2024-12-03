// Lógica para enviar os dados de cadastro para o servidor
document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const confirmeEmail = document.getElementById("confirme-email").value;
    const senha = document.getElementById("senha").value;
    const confirmeSenha = document.getElementById("confirme-senha").value;

    // Verificação de e-mail e senha
    if (email !== confirmeEmail) {
      alert("Os e-mails não coincidem");
      return;
    }
    if (senha !== confirmeSenha) {
      alert("As senhas não coincidem");
      return;
    }

    // Enviar dados para o servidor
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "../../modulos/login/login.html"; // Redireciona para a tela de login após o cadastro
    } else {
      alert("Erro no cadastro");
    }
  });
