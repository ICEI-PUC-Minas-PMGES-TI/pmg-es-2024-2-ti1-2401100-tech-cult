// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')
  
// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults({ noCors: true })
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log(`JSON Server is running em http://localhost:3000`)
})

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

app.post('/save-event', (req, res) => {
    const newEvent = req.body;

    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao ler o arquivo db.json');
        }

        let db = JSON.parse(data);
        let events = db.eventos || [];
        
        // Adiciona um ID único ao novo evento
        newEvent.id = events.length ? events[events.length - 1].id + 1 : 1;
        
        events.push(newEvent);
        db.eventos = events;

        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao salvar o evento');
            }

            res.status(200).send('Evento salvo com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});