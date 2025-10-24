document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input');
    const nome = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const senha = inputs[2].value.trim();
    const confirmarSenha = inputs[3].value.trim();

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Recupera cadastros anteriores do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert('Este e-mail já está cadastrado! Faça login ou use outro e-mail.');
        return;
    }

    // Cria novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Adiciona ao array e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe mensagem de sucesso
    alert('✅ Cadastro realizado com sucesso!\n\nNome: ' + nome + '\nEmail: ' + email);

    // Limpa o formulário
    this.reset();

    // Redireciona para a página de login (verifique o nome exato do arquivo)
    window.location.href = "login.html";
});
