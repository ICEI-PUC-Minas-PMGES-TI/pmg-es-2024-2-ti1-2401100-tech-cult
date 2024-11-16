const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importando o CORS
const app = express();
const PORT = 3000;

app.use(cors()); // Adicionando o middleware CORS
app.use(express.json()); // Middleware para entender JSON

// Caminho para o arquivo de eventos
const eventosPath = path.join(__dirname, 'db', 'eventos.json');
console.log(`Caminho para eventos.json: ${eventosPath}`);

// Endpoint para salvar os eventos
app.post('/api/events', (req, res) => {
    // Lê o arquivo eventos.json para pegar os eventos salvos
    fs.readFile(eventosPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler o arquivo de eventos' });

        // Se o arquivo estiver vazio, iniciamos com um array vazio
        let events = data ? JSON.parse(data) : [];

        // Adiciona novos eventos recebidos no corpo da requisição
        req.body.forEach(event => {
            event.id = events.length ? events[events.length - 1].id + 1 : 1; // Gera um ID sequencial
            events.push(event);
        });

        // Escreve os eventos atualizados no arquivo eventos.json
        fs.writeFile(eventosPath, JSON.stringify(events, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao salvar os eventos' });
            res.status(200).json({ message: 'Eventos salvos com sucesso' });
        });
    });
});

// Endpoint POST para retornar os eventos salvos PRECISA ! SER POST, POIS O FETCH NO FRONT-END É POST !
app.post('/api/events', (req, res) => {
    fs.readFile(eventosPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler o arquivo de eventos' });

        const events = data ? JSON.parse(data) : [];
        res.status(200).json(events);  // Retorna os eventos em formato JSON
    });
});

// Servindo arquivos estáticos (CSS, JS, imagens, HTML)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
