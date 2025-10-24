class Database {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('funcionarios')) {
            const funcionarios = [
                {
                    id: 'FUNC001',
                    senha: 'admin123',
                    nome: 'João Silva',
                    cargo: 'Gerente',
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'FUNC002',
                    senha: 'func456',
                    nome: 'Maria Santos',
                    cargo: 'Atendente',
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'FUNC003',
                    senha: 'busca789',
                    nome: 'Pedro Costa',
                    cargo: 'Supervisor',
                    dataCriacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        }

        if (!localStorage.getItem('clientes')) {
            localStorage.setItem('clientes', JSON.stringify([]));
        }
    }

    cadastrarCliente(nome, email, senha) {
        const clientes = this.getClientes();

        if (clientes.find(c => c.email === email)) {
            return { sucesso: false, mensagem: 'Este email já está cadastrado!' };
        }

        const novoCliente = {
            id: this.gerarIdCliente(),
            nome: nome,
            email: email,
            senha: senha,
            dataCadastro: new Date().toISOString()
        };

        clientes.push(novoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!', cliente: novoCliente };
    }

    loginCliente(login, senha) {
        const clientes = this.getClientes();
        
        const cliente = clientes.find(c => 
            (c.email === login || c.nome === login) && c.senha === senha
        );

        if (cliente) {
            localStorage.setItem('usuarioLogado', JSON.stringify({
                tipo: 'cliente',
                dados: cliente
            }));
            return { sucesso: true, mensagem: `Bem-vindo, ${cliente.nome}!`, cliente: cliente };
        }

        return { sucesso: false, mensagem: 'Login ou senha incorretos!' };
    }

    loginFuncionario(id, senha) {
        const funcionarios = this.getFuncionarios();
        
        const funcionario = funcionarios.find(f => 
            f.id.toUpperCase() === id.toUpperCase() && f.senha === senha
        );

        if (funcionario) {
            localStorage.setItem('usuarioLogado', JSON.stringify({
                tipo: 'funcionario',
                dados: funcionario
            }));
            return { sucesso: true, mensagem: `Bem-vindo, ${funcionario.nome}!`, funcionario: funcionario };
        }

        return { sucesso: false, mensagem: 'ID ou senha incorretos!' };
    }

    getClientes() {
        return JSON.parse(localStorage.getItem('clientes') || '[]');
    }

    getFuncionarios() {
        return JSON.parse(localStorage.getItem('funcionarios') || '[]');
    }

    getUsuarioLogado() {
        return JSON.parse(localStorage.getItem('usuarioLogado'));
    }

    logout() {
        localStorage.removeItem('usuarioLogado');
    }

    gerarIdCliente() {
        const clientes = this.getClientes();
        return 'CLI' + String(clientes.length + 1).padStart(4, '0');
    }

    adicionarFuncionario(nome, cargo) {
        const funcionarios = this.getFuncionarios();
        
        const novoFunc = {
            id: 'FUNC' + String(funcionarios.length + 1).padStart(3, '0'),
            senha: this.gerarSenhaAleatoria(),
            nome: nome,
            cargo: cargo,
            dataCriacao: new Date().toISOString()
        };

        funcionarios.push(novoFunc);
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

        return { sucesso: true, funcionario: novoFunc };
    }

    gerarSenhaAleatoria() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let senha = '';
        for (let i = 0; i < 8; i++) {
            senha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return senha;
    }

    limparDados() {
        localStorage.removeItem('clientes');
        localStorage.removeItem('usuarioLogado');
        this.init();
    }
}

const db = new Database();