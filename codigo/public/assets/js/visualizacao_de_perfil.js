console.log("entrou");

function getDadosPerfil (emailDoUsuario) {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));
    const usuario = usuariosSalvos.find(usuario => usuario.email === emailDoUsuario);
    console.log(usuariosSalvos);
    return usuario;
}

getDadosPerfil();   

// Função para obter as informações do usuário (exemplo)
function obterPerfilUsuario(usuarioId) {
    // Aqui você pode fazer uma requisição para a API ou usar dados do localStorage, por exemplo:
    const usuario = JSON.parse(localStorage.getItem("usuario")); // Supondo que as informações estejam salvas assim

    if (usuario) {
        // Preencher as informações no HTML
        document.getElementById("nome_usuario").textContent = usuario.nome;
        document.getElementById("descricao_usuario").textContent = usuario.descricao;
        document.getElementById("foto_perfil").src = usuario.fotoPerfil; // Foto do usuário
    } else {
        console.error("Usuário não encontrado");
    }
}

// Chamar a função quando a página carregar
window.onload = function() {
    const usuarioId = localStorage.getItem("usuarioId"); // Supondo que o ID do usuário esteja no localStorage
    if (usuarioId) {
        obterPerfilUsuario(usuarioId);
    } else {
        console.error("Usuário não autenticado");
    }
};