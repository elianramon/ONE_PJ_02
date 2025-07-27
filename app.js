 // document é palavra reservada
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaAleatorio = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'Jogo do número secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 e 10');
}
 
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoTela('h1', 'Acerto! ah miseravi, me dá um grrrrre');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTextoTela('p', 'Número é menor');
        } else {
            exibirTextoTela('p', 'Número é maior');   
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() { // devolve a informação do numero
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);   
    let quantidadeElementosLista = listaAleatorio.length;

    if(quantidadeElementosLista == numeroLimite){
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