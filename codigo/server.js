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
const usuariosPath = path.join(__dirname, "db", "usuarios.json");
console.log(`Caminho para eventos.json: ${eventosPath}`);
console.log(`Caminho para usuarios.json: ${usuariosPath}`);

// Funções auxiliares para leitura e escrita de eventos
function lerEventos(callback) {
  fs.readFile(eventosPath, "utf8", (err, data) => {
    if (err) return callback(err, null);
    const eventos = data ? JSON.parse(data) : [];
    callback(null, eventos);
  });
}

function salvarEventos(eventos, callback) {
  fs.writeFile(eventosPath, JSON.stringify(eventos, null, 2), (err) => {
    if (err) return callback(err);
    callback(null);
  });
}

// Funções auxiliares para leitura e escrita de usuários
function lerUsuarios(callback) {
  fs.readFile(usuariosPath, "utf8", (err, data) => {
    if (err) return callback(err, null);
    const usuarios = data ? JSON.parse(data) : [];
    callback(null, usuarios);
  });
}

function salvarUsuarios(usuarios, callback) {
  fs.writeFile(usuariosPath, JSON.stringify(usuarios, null, 2), (err) => {
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

      // Campo de local (se não enviado, usa um valor padrão)
      evento.local = evento.local || "Local não informado";

      // O ID do usuário é atribuído do frontend
      evento.usuarioId = evento.usuarioId;

      // Inicializa o campo de comentários
      evento.comentarios = evento.comentarios || [];

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

// Endpoint para cadastro de novos usuários
app.post("/api/signup", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ success: false, message: "Campos obrigatórios faltando!" });
  }

  // Verifica se o e-mail já existe
  lerUsuarios((err, usuariosExistentes) => {
    if (err) {
      console.error("Erro ao ler os usuários:", err);
      return res.status(500).json({
        success: false,
        message: "Erro ao ler o arquivo de usuários.",
      });
    }

    const usuarioExistente = usuariosExistentes.find(
      (user) => user.email === email
    );
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail já cadastrado!" });
    }

    // Cria um novo usuário e o adiciona
    const novoUsuario = {
      id: usuariosExistentes.length
        ? usuariosExistentes[usuariosExistentes.length - 1].id + 1
        : 1,
      nome,
      email,
      senha, // Aqui, idealmente, você deve fazer a criptografia da senha
    };

    usuariosExistentes.push(novoUsuario);

    salvarUsuarios(usuariosExistentes, (err) => {
      if (err) {
        console.error("Erro ao salvar os usuários:", err);
        return res
          .status(500)
          .json({ success: false, message: "Erro ao salvar o usuário." });
      }

      res
        .status(200)
        .json({ success: true, message: "Cadastro realizado com sucesso!" });
    });
  });
});

// Endpoint para login de usuários
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  // Lê o arquivo de usuários para verificar as credenciais
  lerUsuarios((err, usuarios) => {
    if (err) {
      console.error("Erro ao ler os usuários:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de usuários" });
    }

    // Busca o usuário com o e-mail fornecido
    const usuario = usuarios.find((user) => user.email === email);

    if (!usuario) {
      return res.status(400).json({ error: "E-mail não encontrado." });
    }

    // Verifica se a senha está correta
    if (usuario.senha !== senha) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Login bem-sucedido - agora retornamos o ID do usuário e o nome dentro de um objeto 'usuario'
    res.status(200).json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id, // ID do usuário
        nome: usuario.nome, // Nome do usuário
        email: usuario.email, // Email do usuário
      },
    });
  });
});

// Endpoint para editar o perfil do usuário
app.post("/api/editarPerfil", upload.single("imagemPerfil"), (req, res) => {
  const { nome, bio, localizacao, usuarioId } = req.body; // Recupera os dados do corpo da requisição
  const imagemPerfil = req.file ? req.file.filename : null; // Recupera o nome da imagem, se enviada

  if (!usuarioId) {
    return res.status(400).json({ error: "ID do usuário não fornecido." });
  }

  // Lê o arquivo de usuários
  lerUsuarios((err, usuarios) => {
    if (err) {
      console.error("Erro ao ler os usuários:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler os dados dos usuários" });
    }

    // Busca o usuário pelo ID
    const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Atualiza as informações do usuário
    usuario.nome = nome || usuario.nome; // Atualiza ou mantém o nome
    usuario.bio = bio || usuario.bio; // Atualiza ou mantém a bio
    usuario.localizacao = localizacao || usuario.localizacao; // Atualiza ou mantém a localização

    // Se houver uma imagem de perfil, atualiza o campo da imagem
    if (imagemPerfil) {
      usuario.imagemPerfil = `http://localhost:3000/uploads/${imagemPerfil}`;
    }

    // Salva os dados atualizados no arquivo usuarios.json
    salvarUsuarios(usuarios, (err) => {
      if (err) {
        console.error("Erro ao salvar os usuários:", err);
        return res
          .status(500)
          .json({ error: "Erro ao salvar as alterações do perfil" });
      }

      // Envia o usuário atualizado como resposta
      res.status(200).json({
        message: "Perfil atualizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          bio: usuario.bio,
          localizacao: usuario.localizacao,
          imagemPerfil: usuario.imagemPerfil,
        },
      });
    });
  });
});

// Endpoint para obter o perfil de um usuário específico
app.get("/api/usuarios/:usuarioId", (req, res) => {
  const usuarioId = parseInt(req.params.usuarioId); // Pega o ID do usuário da URL

  // Lê o arquivo de usuários
  lerUsuarios((err, usuarios) => {
    if (err) {
      console.error("Erro ao ler os usuários:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler os dados dos usuários" });
    }

    // Busca o usuário pelo ID
    const usuario = usuarios.find((u) => u.id === usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Retorna as informações do usuário
    res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        bio: usuario.bio,
        localizacao: usuario.localizacao,
        imagemPerfil: usuario.imagemPerfil, // Retorna a URL da imagem de perfil
      },
    });
  });
});

// Endpoint para salvar um comentário no evento
app.post("/api/comments/save", (req, res) => {
  const { eventoId, comentario, userId } = req.body;

  // Verifica se os campos obrigatórios estão presentes
  if (!eventoId || !comentario || !userId) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }

  lerEventos((err, eventos) => {
    if (err) {
      console.error("Erro ao ler eventos:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de eventos" });
    }

    // Encontra o evento pelo ID
    const evento = eventos.find((e) => e.id === eventoId);
    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado!" });
    }

    // Adiciona o comentário ao evento
    if (!evento.comentarios) {
      evento.comentarios = []; // Garante que o campo 'comentarios' esteja presente
    }
    evento.comentarios.push({ comentario, userId, data: new Date() }); // Adiciona a data junto com o comentário

    // Salva os eventos atualizados no arquivo
    salvarEventos(eventos, (err) => {
      if (err) {
        console.error("Erro ao salvar eventos:", err);
        return res.status(500).json({ error: "Erro ao salvar os eventos" });
      }

      // Envia a resposta de sucesso
      res.status(200).json({ message: "Comentário salvo com sucesso!" });
    });
  });
});

// Endpoint para listar os comentários de um evento
app.get("/api/comments/:eventoId", (req, res) => {
  const eventoId = parseInt(req.params.eventoId);

  lerEventos((err, eventos) => {
    if (err) {
      console.error("Erro ao ler eventos:", err);
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de eventos" });
    }

    const evento = eventos.find((e) => e.id === eventoId);

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado!" });
    }

    // Retorna os comentários do evento
    res.status(200).json(evento.comentarios || []);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
