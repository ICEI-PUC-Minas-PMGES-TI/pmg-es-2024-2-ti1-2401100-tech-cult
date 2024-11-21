// Lista de tags global
let tags = [];
// Função para adicionar uma tag
function adicionarTag() {
    const inputTag = document.getElementById('tags');
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
    // Limpa o campo de entrada
    inputTag.value = "";
}
// Função para atualizar a exibição da lista de tags
function atualizarListaTags() {
    const listaTags = document.getElementById('tags-list');
    listaTags.innerHTML = "";
    tags.forEach((tag, index) => {
        const tagItem = document.createElement('li');
        tagItem.textContent = tag;
        const botaoRemover = document.createElement('button');
        botaoRemover.className = "remove-tag";
        // Adiciona a imagem ao botão de remoção
        const imgRemover = document.createElement('img');
        imgRemover.src = "../../assets/images/perfil-usuario/fechar.png"; // Caminho para a imagem
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
// Função para salvar o evento no armazenamento local (localStorage) e exibir na tela
function salvarEvento() {
    const nomeEvento = document.getElementById('nome-evento').value;
    const dataEvento = document.getElementById('data').value;
    const horaEvento = document.getElementById('hora').value;
    const descricaoEvento = document.getElementById('descricao').value;
    const regrasEvento = document.getElementById('regras').value;

    // Validação dos campos
    if (!nomeEvento || !dataEvento || !horaEvento || !descricaoEvento || !regrasEvento || tags.length === 0) {
        alert('Por favor, preencha todos os campos antes de salvar o evento.');
        return;
    }

    const informacoesEvento = {
        nome: nomeEvento,
        data: dataEvento,
        hora: horaEvento,
        descricao: descricaoEvento,
        regras: regrasEvento,
        tags: tags
    };

    // Salvar no armazenamento local
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(informacoesEvento);
    localStorage.setItem('eventos', JSON.stringify(eventos));

    alert('Evento salvo no armazenamento local com sucesso!');
    enviarEventosParaServidor(); // Enviar os eventos para o servidor após salvar no armazenamento local
}
// Função para enviar os eventos para o servidor
function enviarEventosParaServidor() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    if (eventos.length === 0) {
        alert('Nenhum evento para enviar ao servidor.');
        return;
    }

    fetch('http://localhost:3000/api/events', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventos)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro ao salvar no servidor: ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(dados => {
        alert('Eventos enviados para o servidor com sucesso!');
        localStorage.removeItem('eventos'); // Limpar armazenamento após envio bem-sucedido
    })
    .catch(erro => {
        console.error('Erro ao enviar os eventos para o servidor:', erro);
        alert(`Erro ao enviar os eventos para o servidor: ${erro.message}`);
    });
}

// Imagens do Evento 
const inputImage = document.getElementById("input-image");
const imagemEvento = document.querySelector(".imagem-evento img");

inputImage.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagemEvento.src = e.target.result; // Atualiza a imagem
            imagemEvento.classList.add('cover'); // Adiciona a classe cover para preencher o espaço
            imagemEvento.style.maxWidth = '100%'; // Remove a restrição de tamanho
            imagemEvento.style.maxHeight = '100%'; // Remove a restrição de tamanho
        };
        reader.readAsDataURL(file); // Lê o arquivo como URL
    }
});

// Evento para submissão do formulário
document.getElementById('criar-evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    salvarEvento();
});
// Evento para adicionar tag ao clicar no botão
document.getElementById('add-tag-btn').addEventListener('click', adicionarTag);