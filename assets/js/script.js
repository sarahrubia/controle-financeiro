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
        
        if ((/[0-9]+/g).test(e.key) && e.target.value.length < 20) {
            e.target.value += e.key
    } 
}
