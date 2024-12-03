const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Importante para permitir requisições de outros domínios
const multer = require("multer"); // Importante para upload de arquivos
const app = express();
const PORT = 3000;

// Configuração do Multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Diretório de destino
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Obtém a extensão do arquivo
    const filename = `${Date.now()}${extname}`; // Gera o nome do arquivo com timestamp
    cb(null, filename); // Salva o arquivo com o novo nome
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB por imagem
});

app.use(cors()); // Middleware CORS
app.use(express.json()); // Middleware para entender JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Servindo arquivos estáticos de uploads

// Caminho para o arquivo de eventos
const eventosPath = path.join(__dirname, "db", "eventos.json");
console.log(`Caminho para eventos.json: ${eventosPath}`);

// Função auxiliar para leitura de eventos
function lerEventos(callback) {
  fs.readFile(eventosPath, "utf8", (err, data) => {
    if (err) return callback(err, null);
    const eventos = data ? JSON.parse(data) : [];
    callback(null, eventos);
  });
}

// Função auxiliar para salvar eventos
function salvarEventos(eventos, callback) {
  fs.writeFile(eventosPath, JSON.stringify(eventos, null, 2), (err) => {
    if (err) return callback(err);
    callback(null);
  });
}

// Endpoint para upload de imagens
app.post("/api/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
  }
  // Retorna o caminho completo da imagem
  res
    .status(200)
    .json({ caminho: `http://localhost:3000/uploads/${req.file.filename}` });
});

// Endpoint para salvar novos eventos
app.post("/api/events/save", (req, res) => {
  const novosEventos = req.body;

  if (!Array.isArray(novosEventos) || novosEventos.length === 0) {
    return res.status(400).json({ error: "Nenhum evento para salvar." });
  }

  lerEventos((err, eventosExistentes) => {
    if (err) {
      console.error("Erro ao ler eventos:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de eventos" });
    }

    // Adiciona IDs sequenciais aos novos eventos e os insere na lista
    novosEventos.forEach((evento) => {
      evento.id = eventosExistentes.length
        ? eventosExistentes[eventosExistentes.length - 1].id + 1
        : 1;
      eventosExistentes.push(evento);
    });

    salvarEventos(eventosExistentes, (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao salvar os eventos" });
      }

      res.status(200).json({ message: "Eventos salvos com sucesso" });
    });
  });
});

// Endpoint para listar os eventos salvos
app.get("/api/events/list", (req, res) => {
  lerEventos((err, eventos) => {
    if (err) {
      console.error("Erro ao ler eventos:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de eventos" });
    }

    res.status(200).json(eventos); // Retorna a lista de eventos
  });
});

// Servindo arquivos estáticos (CSS, JS, imagens, HTML)
app.use(express.static(path.join(__dirname, "..", "public")));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
