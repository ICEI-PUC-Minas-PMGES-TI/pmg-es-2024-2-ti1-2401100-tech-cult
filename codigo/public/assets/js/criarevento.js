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

// Função para adicionar uma tag na lista
function adicionarTagNaLista(tag, index) {
    const listaTags = document.getElementById('tags-list');

    const tagItem = document.createElement('li');
    tagItem.textContent = tag;

    // Clona o template do botão de remoção
    const template = document.getElementById('remove-button-template');
    const botaoRemover = template.content.cloneNode(true).querySelector('button');

    botaoRemover.onclick = () => removerTag(index);

    tagItem.appendChild(botaoRemover);
    listaTags.appendChild(tagItem);
}

// Função para remover uma tag da lista
function removerTagDaLista(index) {
    const listaTags = document.getElementById('tags-list');
    listaTags.removeChild(listaTags.childNodes[index]);
}

// Função para remover uma tag
function removerTag(index) {
    tags.splice(index, 1);
    atualizarListaTags();
}

// Função para atualizar a exibição da lista de tags
function atualizarListaTags() {
    const listaTags = document.getElementById('tags-list');
    listaTags.innerHTML = "";

    tags.forEach((tag, index) => {
        adicionarTagNaLista(tag, index);
    });
}

// Evento para adicionar tag ao clicar no botão
document.getElementById('add-tag-btn').addEventListener('click', adicionarTag);

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
    exibirEventos();
    enviarEventosParaServidor(); // Enviar os eventos para o servidor após salvar no armazenamento local
}

// Função para enviar os eventos para o servidor
function enviarEventosParaServidor() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    if (eventos.length === 0) {
        alert('Nenhum evento para enviar ao servidor.');
        return;
    }

    fetch('http://localhost:3000/api/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventos)
    })
    .then(resposta => resposta.json())
    .then(dados => {
        alert('Eventos enviados para o servidor com sucesso!');
        localStorage.removeItem('eventos'); // Limpar o armazenamento local após enviar
        exibirEventos();
    })
    .catch(erro => {
        console.error('Erro ao enviar os eventos para o servidor:', erro);
        alert('Erro ao enviar os eventos para o servidor');
    });
}

// Exibe os eventos armazenados no armazenamento local na página
function exibirEventos() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const listaEventos = document.getElementById('eventsList');
    listaEventos.innerHTML = eventos.map(evento => `<li>${evento.nome} - ${evento.data} ${evento.hora}: ${evento.descricao}</li>`).join('');
}

// Evento para submissão do formulário
document.getElementById('criar-evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    salvarEvento();
});