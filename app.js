let listaAleatorio = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag); // document é palavra reservada
    campo.innerHTML = texto;                // paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Leitura de texto.
}

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'Jogo do número secreto'); // Texto no campo h1
    exibirTextoTela('p', 'Escolha um número entre 1 e 10');
}
 
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value; // chute é igual o valor do campo 
    if (chute == numeroSecreto){
        exibirTextoTela('h1', 'Parabéns, Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Lebera o botão NOVO JOGO 
    } else{
        if (chute > numeroSecreto){ // Condicional das dicas
            exibirTextoTela('p', 'Número é menor');
        } else {
            exibirTextoTela('p', 'Número é maior');   
        }
        tentativas++;
        limparCampo(); // Limpa o campo onde se escreve o número
    }
}

function gerarNumeroAleatorio() { // devolve a informação do numero
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);   
    let quantidadeElementosLista = listaAleatorio.length;

    if(quantidadeElementosLista == numeroLimite){ // se todos da lista forem sorteados, reinicia o armazem 
        listaAleatorio == [];
    }

    if (listaAleatorio.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaAleatorio.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}