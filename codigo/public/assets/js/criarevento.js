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

    // Salvar no localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventInfo);
    localStorage.setItem('events', JSON.stringify(events));

    alert('Evento salvo no localStorage com sucesso!');
    displayEvents();
    sendEventsToServer(); // Enviar os eventos para o servidor após salvar no localStorage
}

function sendEventsToServer() {
    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (events.length === 0) {
        alert('Nenhum evento para enviar ao servidor.');
        return;
    }

    fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(events)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os eventos para o servidor');
        }
        return response.json();
    })
    .then(data => {
        alert('Eventos enviados para o servidor com sucesso!');
        localStorage.removeItem('events'); // Limpar o localStorage após enviar
        displayEvents();
    })
    .catch(error => {
        console.error('Erro ao enviar os eventos para o servidor:', error);
        alert('Erro ao enviar os eventos para o servidor');
    });
}

function displayEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    let eventsList = '';
    events.forEach(event => {
        eventsList += `<li>${event.nome} - ${event.data} ${event.hora}: ${event.descricao}</li>`;
    });
    document.getElementById('eventsList').innerHTML = eventsList;
}

// Adicione um listener para o formulário
document.getElementById('criar-evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEvent();
});