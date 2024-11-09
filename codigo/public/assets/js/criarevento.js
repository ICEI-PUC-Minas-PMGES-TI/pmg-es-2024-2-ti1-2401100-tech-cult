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
        name: eventName,
        date: eventDate,
        time: eventTime,
        description: eventDescription,
        rules: eventRules,
        tags: eventTags
    };

    let events = localStorage.getItem('events');
    if (events) {
        events = JSON.parse(events);
    } else {
        events = [];
    }

    events.push(eventInfo);
    localStorage.setItem('events', JSON.stringify(events));

    alert('Evento salvo com sucesso!');
}

function displayEvents() {
    const events = localStorage.getItem('events');
    if (events) {
        const eventsArray = JSON.parse(events);
        let eventsList = '';
        eventsArray.forEach(event => {
            eventsList += `<li>${event.name} - ${event.date} ${event.time}: ${event.description}</li>`;
        });
        document.getElementById('eventsList').innerHTML = eventsList;
    } else {
        document.getElementById('eventsList').innerHTML = 'Nenhum evento cadastrado.';
    }
}

// Adicione um listener para o formulário
document.getElementById('criar-evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEvent();
    displayEvents();
});