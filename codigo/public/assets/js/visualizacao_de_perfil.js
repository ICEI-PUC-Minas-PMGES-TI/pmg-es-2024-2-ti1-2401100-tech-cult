// Dados mocados para visualização de perfil
const mockUsuarioVisualizacaoDePerfil = {
    id: "12345",
    nome: "Joao Victor",
    descricao: "Professor de música",
    fotoPerfil: "../../assets/images/visualizacaoDePerfil/FotoDePerfil.jpg",
};

// Adicionando dados mocados ao LocalStorage
localStorage.setItem("usuarioId", mockUsuarioVisualizacaoDePerfil.id);
localStorage.setItem("usuario", JSON.stringify(mockUsuarioVisualizacaoDePerfil));

console.log("Mock data set in localStorage");

// Conseguir e exibir dados do usuário
function obterPerfilUsuario(usuarioId) {
    const usuario = JSON.parse(localStorage.getItem("usuario")); 
    if (usuario) {
        document.getElementById("nome_usuario").textContent = usuario.nome;
        document.getElementById("descricao_usuario").textContent = usuario.descricao;
        document.getElementById("foto_perfil").src = "/assets/images/visualizacaoDePerfil/FotoDePerfil.jpg"
    } else {
        console.error("Usuário não encontrado");
    }
}

// Chamando a função para exibir os dados do usuário
window.onload = function() {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
        obterPerfilUsuario(usuarioId);
    } else {
        console.error("Usuário não autenticado");
    }
};

