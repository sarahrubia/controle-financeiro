/* JavaScript:

Validar o formulário para que todos os campos sejam preenchidos.
Adicionar uma máscara no campo “Valor” para que apenas números sejam preenchidos e com a formatação correta. (Padrão: 10,90)
Ao adicionar uma nova transação, persistir no Local Storage e já atualizar a lista com o extrato. Atualizar também o cálculo apresentado.
Ao clicar no link “Limpar dados”, apresentar uma mensagem de confirmação e em seguida apagar as informações, atualizando a lista. */

//  Validação e máscara do formulário

function mascaraValor(e) {
    e.preventDefault();
    // console.log(e)

    var meuInput = document.getElementById('valor-mercadoria');

    meuInput.addEventListener('keypress', function (e) {
        var meuInputFormatado = parseFloat(meuInput.value.replace(/\D+/g,''));
        meuInputFormatado = (meuInputFormatado/100).toFixed(2) + '';
        meuInputFormatado = meuInputFormatado.replace(".", ",");
        meuInputFormatado = meuInputFormatado.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        meuInputFormatado = meuInputFormatado.replace(/(\d)(\d{3}),/g, "$1.$2,");
        meuInput.value = meuInputFormatado
        }, false);
        
        if ((/[0-9]+/g).test(e.key) && e.target.value.length < 14) {
            e.target.value += e.key
    } 
}

// Listagem das transações

var mercadoriasRaw = localStorage.getItem('listaDeMercadorias');
if (mercadoriasRaw != null) {
    var listaDeMercadorias = JSON.parse(mercadoriasRaw)
} else {
    var listaDeMercadorias = [];
};

// var listaDeMercadorias = [
//     {
//         "tipo-transacao": "-",
//         "nome-mercadoria": "Geladeira",
//         "valor-mercadoria": 5500,
//     },
//     {
//         "tipo-transacao": "+",
//         "nome-mercadoria": "Empréstimo",
//         "valor-mercadoria": 1999.99,
//     },
//     {
//         "tipo-transacao": "-",
//         "nome-mercadoria": "Passagem",
//         "valor-mercadoria": 1200,
//     }
// ];


function adicionaTabela() {
    
    linhasExistentes = [...document.querySelectorAll('table.lista-mercadoria tbody .conteudo-dinamico')];

    linhasExistentes.forEach(element => {
        element.remove();
        
    });

    for (merc in listaDeMercadorias) {
        document.querySelector('table.lista-mercadoria tbody').innerHTML += `
        <tr class='conteudo-dinamico'>
            <td>
            ${listaDeMercadorias[merc]["tipo-transacao"] === '-' ? '-' : '+'}
            </td>
            <td>
            ${listaDeMercadorias[merc]["nome-mercadoria"]}
            </td>
            <td style="text-align:right;">
            R$ ${listaDeMercadorias[merc]["valor-mercadoria"]}
            </td>
        </tr>`
    }
    
    // Cálculo do valor total

    var total = 0;

    for (valor in listaDeMercadorias) {
        valores = parseFloat(listaDeMercadorias[valor]["valor-mercadoria"].replace(/[\.,]/g,""))

        if (listaDeMercadorias[valor]["tipo-transacao"] === '-') {
            total -= valores / 100
        } else if (listaDeMercadorias[valor]["tipo-transacao"] === '+') {
            total += valores / 100
        }
    }

    var totalFormatado = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    
    document.querySelector('table.lista-mercadoria tfoot').innerHTML += `
    <tr>
        <td class="linha-dupla-tabela" colspan="3"></td>
        <td class="linha-dupla-tabela" colspan="3"></td>
    </tr>
    <tr>
        <td></td>
        <td><strong>Total</strong></td>
        <td style="text-align:right;" id="valor-total"><strong>${totalFormatado}</strong></td>
  </tr>`

};

adicionaTabela();

// Excluindo listagem 

function limparDados(merc) {
    alert('Tem certeza que deseja limpar os dados da pagina?');
    localStorage.clear();
    document.getElementById('inicio').click();
        
}

if (mercadoriasRaw == null) {

    document.querySelector('table.lista-mercadoria tbody').innerHTML += `
    <tr class='conteudo-dinamico'>
        <td colspan="3" style ="text-align: center;"}>
            Não há transações cadastradas!
        </td>
    <tr>`
};


// Cadastrando transações

function cadastroTransacao(evt) {
    evt.preventDefault();
    console.log(evt)
    
    var mercadoriasRaw = localStorage.getItem('listaDeMercadorias');

    if (mercadoriasRaw != null) {
        var listaDeMercadorias = JSON.parse(mercadoriasRaw)
    } else {
        var listaDeMercadorias = [];
};

    listaDeMercadorias.push({
        "tipo-transacao": evt.target.elements["tipo-transacao"].value,
        "nome-mercadoria": evt.target.elements["nome-mercadoria"].value,
        "valor-mercadoria": evt.target.elements["valor-mercadoria"].value, 
    });

    localStorage.setItem('listaDeMercadorias', JSON.stringify(listaDeMercadorias));
    document.getElementById('inicio').click();
}







