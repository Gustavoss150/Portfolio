class Contato {
    Enviar(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const fone = document.getElementById('fone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const radios = document.getElementsByName('tipo_contato');

        if (!nome || !email || !fone || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!this.validarEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        let tipo_contato = '';
        for (let r of radios) {
            if (r.checked) {
                tipo_contato = r.value;
                break;
            }
        }
        if (!tipo_contato) {
            alert('Por favor, escolha o tipo de contato.');
            return;
        }

        const hoje = new Date();
        const data_cadastro = hoje.toLocaleDateString('pt-BR');
        document.getElementById('data_cadastro').value = data_cadastro;

        this.adicionarRegistro(nome, email, fone, mensagem, data_cadastro, tipo_contato);

        event.target.reset();
    }

    validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    adicionarRegistro(nome, email, fone, mensagem, data_cadastro, tipo_contato) {
        const tbody = document.querySelector('#grid tbody');
        const novaLinha = tbody.insertRow();
        
        const celulas = [
            nome, 
            email, 
            fone, 
            mensagem.length > 50 ? mensagem.substring(0, 50) + '...' : mensagem,
            data_cadastro,
            this.formatarTipoContato(tipo_contato)
        ];
        
        celulas.forEach((valor, i) => {
            const cel = novaLinha.insertCell(i);
            cel.textContent = valor;
            
            // Adiciona título para mensagens longas
            if (i === 3 && mensagem.length > 50) {
                cel.title = mensagem;
            }
        });
    }

    formatarTipoContato(tipo) {
        const tipos = {
            'email': 'E-mail',
            'fone': 'Telefone',
            'whatsapp': 'WhatsApp'
        };
        return tipos[tipo] || tipo;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const contato = new Contato();
    const form = document.getElementById('formulario');
    form.addEventListener('submit', (e) => contato.Enviar(e));
    
    // Máscara para telefone
    document.getElementById('fone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        // Formatação: (XX) XXXXX-XXXX
        if (value.length > 0) {
            value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, (_, g1, g2, g3) => {
                let formatted = '';
                if (g1) formatted += `(${g1}`;
                if (g2) formatted += `) ${g2}`;
                if (g3) formatted += `-${g3}`;
                return formatted;
            });
        }
        e.target.value = value;
    });
});
