document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input');
    const emailOuNome = inputs[0].value.trim();
    const senha = inputs[1].value.trim();

    // Verifica se os campos estão preenchidos
    if (!emailOuNome || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Busca usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procura o usuário pelo nome OU email
    const usuarioEncontrado = usuarios.find(
        user => (user.email === emailOuNome || user.nome === emailOuNome) && user.senha === senha
    );

    if (usuarioEncontrado) {
        alert(`✅ Login realizado com sucesso!\nBem-vindo, ${usuarioEncontrado.nome}!`);
        
        // Armazena o usuário logado (opcional)
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

        // Redireciona para a página inicial
        window.location.href = "home.html";
    } else {
        alert('❌ Login ou senha incorretos!');
    }

    // Limpa o formulário
    this.reset();
});
