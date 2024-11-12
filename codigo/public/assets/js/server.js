const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importar o pacote cors
const app = express();
const PORT = 3000;

app.use(cors()); // Usar o middleware cors
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const eventosPath = path.join(__dirname, 'db', 'eventos.json');

app.post('/api/events', (req, res) => {
  fs.readFile(eventosPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read events' });
    }

    let events = JSON.parse(data) || [];

    req.body.forEach(event => {
      event.id = events.length ? events[events.length - 1].id + 1 : 1;
      events.push(event);
    });

    fs.writeFile(eventosPath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save events' });
      }
      res.status(200).json({ message: 'Events saved successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});