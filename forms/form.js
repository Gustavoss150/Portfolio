class Contato {
    Enviar(event) {
        event.preventDefault();

        // Captura valores
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const fone = document.getElementById('fone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const radios = document.getElementsByName('tipo_contato');

        // Validação simples
        if (!nome || !email || !fone || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Captura tipo de contato (radio)
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

        // Data de cadastro automática
        const hoje = new Date();
        const data_cadastro = hoje.toLocaleDateString('pt-BR');
        // Atualiza o campo hidden
        document.getElementById('data_cadastro').value = data_cadastro;

        // Insere na tabela
        const tbody = document.querySelector('#grid tbody');
        const novaLinha = tbody.insertRow();
        [nome, email, fone, mensagem, data_cadastro, tipo_contato]
            .forEach((valor, i) => {
                const cel = novaLinha.insertCell(i);
                cel.textContent = valor;
            });

        // Limpa o formulário (reseta todos os campos, inclusive o hidden)
        event.target.reset();
    }
}

// Liga o evento ao formulário
document.addEventListener('DOMContentLoaded', () => {
    const contato = new Contato();
    const form = document.getElementById('formulario');
    form.addEventListener('submit', contato.Enviar.bind(contato));
});
