// Seleciona os cards
const cards = document.querySelectorAll('.card');

// Adiciona um evento de clique a cada card
cards.forEach(card => {
    card.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'flex';
    });
});

// Fecha o modal ao clicar no botão de fechar
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});


// Fetch para carregar dados
fetch('./feed_context.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateHTMLContent(data);
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));

function updateHTMLContent(data) {
    const mainTitle = document.querySelector('.main-title h1');
    if (mainTitle) mainTitle.textContent = data.html.structure.main.sections[1].type;

    const firstCardTitle = document.querySelector('.card .feed-btn');
    const firstCardDescription = document.querySelector('.card .event-description');
    if (firstCardTitle) firstCardTitle.textContent = data.html.structure.main.sections[2].cards[0].title;
    if (firstCardDescription) firstCardDescription.textContent = data.html.structure.main.sections[2].cards[0].description;
}

// Adiciona comentário ao clicar no botão
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value;

    if (commentText) {
        const commentsList = document.getElementById('comments-list');
        const commentDiv = document.createElement('div');
        commentDiv.textContent = commentText;
        commentsList.appendChild(commentDiv);
        commentInput.value = '';
    }
});

fetch('./feed_context.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateHTMLContent(data);
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));

function updateHTMLContent(data) {
    const mainTitle = document.querySelector('.main-title h1');
    if (mainTitle) mainTitle.textContent = data.html.structure.main.sections[1].type;

    const firstCardTitle = document.querySelector('.card .feed-btn');
    const firstCardDescription = document.querySelector('.card .event-description');
    if (firstCardTitle) firstCardTitle.textContent = data.html.structure.main.sections[2].cards[0].title;
    if (firstCardDescription) firstCardDescription.textContent = data.html.structure.main.sections[2].cards[0].description;
}


