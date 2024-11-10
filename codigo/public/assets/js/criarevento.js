function saveEvent() {
    const eventName = document.getElementById('nome-evento').value;
    const eventDate = document.getElementById('data').value;
    const eventTime = document.getElementById('hora').value;
    const eventDescription = document.getElementById('descricao').value;
    const eventRules = document.getElementById('regras').value;
    const eventTags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    // Validação dos campos
    if (!eventName || !eventDate || !eventTime || !eventDescription || !eventRules || eventTags.length === 0) {
        alert('Por favor, preencha todos os campos antes de salvar o evento.');
        return;
    }

    const eventInfo = {
        nome: eventName,
        data: eventDate,
        hora: eventTime,
        descricao: eventDescription,
        regras: eventRules,
        tags: eventTags
    };

    fetch('http://localhost:3000/save-event', { // Certifique-se de que a URL está correta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventInfo)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        displayEvents();
    })
    .catch(error => {
        console.error('Erro ao salvar o evento:', error);
        alert('Erro ao salvar o evento');
    });
}

function displayEvents() {
    fetch('http://localhost:3000/db.json') // Certifique-se de que a URL está correta
        .then(response => response.json())
        .then(db => {
            let eventsList = '';
            db.eventos.forEach(event => {
                eventsList += `<li>${event.nome} - ${event.data} ${event.hora}: ${event.descricao}</li>`;
            });
            document.getElementById('eventsList').innerHTML = eventsList;
        })
        .catch(error => {
            console.error('Erro ao carregar os eventos:', error);
            document.getElementById('eventsList').innerHTML = 'Nenhum evento cadastrado.';
        });
}

// Adicione um listener para o formulário
document.getElementById('criar-evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEvent();
});