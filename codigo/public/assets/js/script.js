function handleNavigation (url) {
    window.location.href = url;
}

function handleLoginSubmit() {
    const userAdmin = {
        username: "admin",
        email: "admin@example.com",
        password: "admin123"
    }

    const userNormal = {
        username: "admin",
        email: "admin@example.com",
        password: "user123"
    }

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (username && email && confirmEmail && password && confirmPassword) {
        if (email === confirmEmail && password === confirmPassword) {
            handleNavigation('http://127.0.0.1:5500/signup-second-step.html');
        } else {
            alert("Os e-mails ou senhas não coincidem");
        }
    } else {
        alert("Preencha todos os campos");
    }
}

function handleLogin() {
    if(username == "admin" && password == "admin123") {
        
    } else {
        alert("Invalid username or password");
    }
}