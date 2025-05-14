class Contato {
    constructor() {
        this.nome = null
        this.email = null
        this.fone = null
        this.mensagem = null
        this.data_cadastro = null
        this.tipo_contato = null
    }

    // Métodos
    Enviar() {
        this.nome = document.getElementById('nome').value;
        if (this.nome === '') {
            alerta += ', Nome';
        }
        this.email = document.getElementById('email').value;
        if (this.document === '') {
            alerta += ', Email';
        }
        this.fone = document.getElementById('fone').value;
        if (this.fone === '') {
            alerta += ', Fone';
        }
        this.mensagem = document.getElementById('mensagem').value;
        if (this.mensagem === '') {
            alerta += ', Mensagem';
        }
        this.data_cadastro = new Date();
        if (this.data_cadastro === '') {
            alerta += ', Data Cadastro';
        }
        this.tipo_contato = document.getElementById('tipo_contato').value;
        if (this.tipo_contato === '') {
            alerta += ', Tipo Contato';
        }

        if (alerta != '') {
            alert("Os seguintes campos estão com problemas: " +alerta)
        }

        let tabela = document.getElementById('dados');
        let linha = tabela.insertRow();

        linha.insertCell();
        linha.innerHtml(this.nome);

        linha.insertCell();
        linha.innerHtml(this.email);

        linha.insertCell();
        linha.innerHtml(this.fone);

        linha.insertCell();
        linha.innerHtml(this.mensagem);

        linha.insertCell();
        linha.innerHtml(this.data_cadastro);

        linha.insertCell();
        linha.innerHtml(this.tipo_contato);
    }
}

contato = new Contato();
/*
function submeter(){
    var alerta = document.getElementById('nome').value;
    alert('Aviso: '+ alerta);
}
*/