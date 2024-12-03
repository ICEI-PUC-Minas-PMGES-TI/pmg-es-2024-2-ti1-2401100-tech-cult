// Lista de tags global
let tags = [];

// Função para adicionar uma tag
function adicionarTag() {
  const inputTag = document.getElementById("tags");
  const tagValor = inputTag.value.trim();

  if (tagValor === "") {
    alert("Por favor, insira uma tag.");
    return;
  }
  if (tags.includes(tagValor)) {
    alert("Essa tag já foi adicionada.");
    return;
  }

  // Adiciona a tag à lista
  tags.push(tagValor);
  atualizarListaTags();
  inputTag.value = ""; // Limpa o campo de entrada
}

// Função para atualizar a exibição da lista de tags
function atualizarListaTags() {
  const listaTags = document.getElementById("tags-list");
  listaTags.innerHTML = ""; // Limpa a lista atual

  tags.forEach((tag, index) => {
    const tagItem = document.createElement("li");
    tagItem.textContent = tag;

    const botaoRemover = document.createElement("button");
    botaoRemover.className = "remove-tag";

    const imgRemover = document.createElement("img");
    imgRemover.src = "../../assets/images/perfil-usuario/fechar.png";
    imgRemover.alt = "Remover tag";

    botaoRemover.appendChild(imgRemover);
    botaoRemover.onclick = () => removerTag(index);
    tagItem.appendChild(botaoRemover);
    listaTags.appendChild(tagItem);
  });
}

// Função para remover uma tag
function removerTag(index) {
  tags.splice(index, 1);
  atualizarListaTags();
}

// Função para salvar evento
function salvarEvento() {
  const nomeEvento = document.getElementById("nome-evento").value;
  const dataEvento = document.getElementById("data").value;
  const horaEvento = document.getElementById("hora").value;
  const descricaoEvento = document.getElementById("descricao").value;
  const regrasEvento = document.getElementById("regras").value;
  const imagemEvento = document.getElementById("input-image").files[0];
  const usuarioId = localStorage.getItem("id");
  

  // Validação dos campos
  if (
    !nomeEvento ||
    !dataEvento ||
    !horaEvento ||
    !descricaoEvento ||
    !regrasEvento ||
    tags.length === 0 ||
    !imagemEvento
  ) {
    alert("Por favor, preencha todos os campos antes de salvar o evento.");
    return;
  }

  const formData = new FormData();
  formData.append("imagem", imagemEvento);

  // Enviar a imagem para o servidor
  fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Erro ao enviar imagem: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      const caminhoImagem = data.caminho;

      const evento = {
        nome: nomeEvento,
        data: dataEvento,
        hora: horaEvento,
        descricao: descricaoEvento,
        regras: regrasEvento,
        tags,
        imagem: caminhoImagem,
      };

      salvarEventoLocalmente(evento);
    })
    .catch((erro) => {
      console.error("Erro ao enviar a imagem:", erro);
      alert("Erro ao enviar a imagem.");
    });
}

// Função para salvar o evento no localStorage
function salvarEventoLocalmente(evento) {
  localStorage.removeItem("eventos"); // Limpa o armazenamento local antes de salvar os novos eventos
  let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos.push(evento);
  localStorage.setItem("eventos", JSON.stringify(eventos));
  alert("Evento salvo no armazenamento local com sucesso!");
  enviarEventosParaServidor();
}

// Função para enviar eventos para o servidor
function enviarEventosParaServidor() {
  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  if (eventos.length === 0) {
    alert("Nenhum evento para enviar ao servidor.");
    return;
  }

  fetch("http://localhost:3000/api/events/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventos),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Erro ao salvar eventos: ${response.statusText}`);
      return response.json();
    })
    .then(() => {
      alert("Eventos enviados ao servidor com sucesso!");
      localStorage.removeItem("eventos"); // Limpar o armazenamento local
    })
    .catch((erro) => {
      console.error("Erro ao enviar os eventos:", erro);
      alert("Erro ao enviar os eventos para o servidor.");
    });
}

// Atualização da imagem no formulário
const inputImage = document.getElementById("input-image");
const imagemEvento = document.querySelector(".imagem-evento img");

inputImage.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagemEvento.src = e.target.result;
      imagemEvento.classList.add("cover");
      imagemEvento.style.maxWidth = "100%";
      imagemEvento.style.maxHeight = "100%";
    };
    reader.readAsDataURL(file);
  }
});

// Evento para submissão do formulário
document
  .getElementById("criar-evento-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    salvarEvento();
  });

// Botão para adicionar tags
document.getElementById("add-tag-btn").addEventListener("click", adicionarTag);
