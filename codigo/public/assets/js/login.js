document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Login bem-sucedido, redireciona para a página do feed
        window.location.href = "../../modulos/feed/feed.html";
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error("Erro no login:", error);
    });
});
