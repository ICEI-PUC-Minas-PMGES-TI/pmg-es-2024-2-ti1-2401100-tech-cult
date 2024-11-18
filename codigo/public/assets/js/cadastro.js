document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cadastroForm");
    const temCnpjCheckbox = document.getElementById("temCnpj");
    const cnpjField = document.getElementById("cnpj");

    temCnpjCheckbox.addEventListener("change", function() {
        cnpjField.style.display = temCnpjCheckbox.checked ? "block" : "none";
    });

    function salvarDadosLocalmente(dados) {
        const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuariosExistentes.push(dados);
        localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const confirmaEmail = document.getElementById("confirmaEmail").value;
        const senha = document.getElementById("senha").value;
        const confirmaSenha = document.getElementById("confirmaSenha").value;
        const generoEvento = document.getElementById("generoEvento").value;
        const temCnpj = temCnpjCheckbox.checked;
        const cnpj = temCnpj ? cnpjField.value : null;

        if (email !== confirmaEmail) {
            alert("Os e-mails não coincidem.");
            return;
        }
        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const dadosUsuario = {
            nome,
            email,
            senha, 
            generoEvento,
            temCnpj,
            cnpj
        };

        salvarDadosLocalmente(dadosUsuario);

        alert("Usuário cadastrado com sucesso!");
        form.reset();
        cnpjField.style.display = "none";
    });
});
