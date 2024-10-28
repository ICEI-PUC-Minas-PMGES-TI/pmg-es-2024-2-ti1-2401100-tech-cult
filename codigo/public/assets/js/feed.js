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