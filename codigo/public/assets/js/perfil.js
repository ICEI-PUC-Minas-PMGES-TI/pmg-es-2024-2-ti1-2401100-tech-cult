function openPopup(content) {
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = '';

    if (content === 'Criar Evento') {
        const form = document.createElement('form');

        const titleLabel = document.createElement('label');
        titleLabel.innerText = 'Título:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.name = 'title';
        titleInput.required = true;

        const dateLabel = document.createElement('label');
        dateLabel.innerText = 'Data:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.name = 'date';
        dateInput.required = true;

        const locationLabel = document.createElement('label');
        locationLabel.innerText = 'Local:';
        const locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.name = 'location';
        locationInput.required = true;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.innerText = 'Descrição:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.name = 'description';
        descriptionInput.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Criar Evento';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(dateLabel);
        form.appendChild(dateInput);
        form.appendChild(locationLabel);
        form.appendChild(locationInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(submitButton);

        popupContent.appendChild(form);
    }
    
    if (content === 'Meus Eventos') {

        const events = [
            {
                img: 'https://placehold.co/80x80',
                name: 'Evento 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                tags: ['Tag1', 'Tag2']
            },
            {
                img: 'https://placehold.co/80x80',
                name: 'Evento 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                tags: ['Tag3', 'Tag4']
            }
        ];

        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';

            const eventImg = document.createElement('img');
            eventImg.src = event.img;
            eventImg.alt = 'Event Image';

            const eventInfo = document.createElement('div');
            eventInfo.className = 'event-info';

            const eventName = document.createElement('h2');
            eventName.innerText = event.name;

            const eventDescription = document.createElement('p');
            eventDescription.innerText = event.description;

            const eventTags = document.createElement('div');
            eventTags.className = 'event-tags';
            event.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.innerText = tag;
                eventTags.appendChild(tagSpan);
            });

            eventInfo.appendChild(eventName);
            eventInfo.appendChild(eventDescription);
            eventInfo.appendChild(eventTags);

            eventItem.appendChild(eventImg);
            eventItem.appendChild(eventInfo);

            popupContent.appendChild(eventItem);
        });
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