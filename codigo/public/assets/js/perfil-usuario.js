function AbrirPopup(content) {
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

    // Adiciona o evento de submit ao formulário de criação de evento
    const form = document.getElementById('criar-evento-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            salvarEvento();
        });
    }
}

function FecharPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function EditarImagemEvento(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('event-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function AdicionarTag() {
    const tagInput = document.getElementById('tags');
    const tagList = document.getElementById('tag-list');
    const tagValue = tagInput.value.trim();

    if (tagValue) {
        const listItem = document.createElement('li');

        const tagText = document.createElement('span');
        tagText.textContent = tagValue;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-tag';

        const removeImg = document.createElement('img');
        removeImg.src = '../../assets/images/perfil-usuario/fechar.png';
        removeImg.alt = 'X';
        removeImg.width = 8;
        removeImg.height = 8;

        removeButton.appendChild(removeImg);

        removeButton.onclick = function() {
            tagList.removeChild(listItem);
        };

        listItem.appendChild(tagText);
        listItem.appendChild(removeButton);
        tagList.appendChild(listItem);
        tagInput.value = '';
    }
}
