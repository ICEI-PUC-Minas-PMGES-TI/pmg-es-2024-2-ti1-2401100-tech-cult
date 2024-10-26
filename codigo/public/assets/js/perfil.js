function openPopup(content) {
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = '';

    if (content === 'Criar Evento') {
        popupContent.innerHTML = document.getElementById('criar-evento-template').innerHTML;
    } else if (content === 'Meus Eventos') {
        popupContent.innerHTML = document.getElementById('meus-eventos-template').innerHTML;
    } else {
        popupContent.innerText = content;
    }

    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}