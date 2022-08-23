
const distribuicao = [],
figuras = [1, 2, 3, 4, 5, 6, 7]
    parrots = document.querySelector(".parrots"),
    time = document.querySelector("#time"),
    existeClicada = "clicada";
let primeiraCarta,
    segundaCarta,
    jogadaFinalizada = true,
    numCartas = 0,
    contaJogadas,
    contaAcertos,
    idInterval,
    t,
    sec = 0;

function iniciaJogo(){
    figuras.sort(comparador);
    contaJogadas = 0;
    contaAcertos = 0;
    for (let i = distribuicao.length; i > 0; i--) {
      distribuicao.pop();
    }
    while (numCartas < 4 || numCartas > 14 || numCartas % 2 != 0) {
        numCartas = prompt('Escolha um número de cartas de 4 a 14.');
        Number(numCartas);
    }
    numCartas = numCartas / 2;
    embaralhaCartas(numCartas);
    distribueCartas();
}
function embaralhaCartas(numCartas) {
    for (i = 1; i <= numCartas; i++) {
        for (j = 0; j < 2; j++) {
            distribuicao.push(figuras[i]);
        }
    }
    distribuicao.sort(comparador);
}

function comparador() {
    return Math.random() - 0.5;
}

function distribueCartas() {
    parrots.innerHTML = "";
    for (let i = 0; i < distribuicao.length; i++) {
        parrots.innerHTML += `
        <div class="parrot carta${distribuicao[i]}" id="parrot${i + 1}" onclick="parrot(this)">
        <img src="./img/front.png" alt="Parrot" />
        </div>
      `;
    }

}

function parrot(p) {
    contaJogadas++

    if (Boolean(jogadaFinalizada)) {
        if (parrots.classList.contains(existeClicada) && p.innerHTML == `<img src="./img/front.png" alt="Parrot" />`) {
            desviraCarta(p);
            jogadaFinalizada = false;
            segundaCarta = p;
            comparaCartas(primeiraCarta, segundaCarta);
        } else {
            desviraCarta(p);
            primeiraCarta = p;
            parrots.classList.add(existeClicada);
        }
    } else { 
        alert("Você clicou numa carta já desvirada ou não esperou o tempo para finalizar a jogada anterior!");
        contaJogadas-- 
    }
}

function desviraCarta(p) {
    p.classList.add('desvira-carta');
    setTimeout(() => {
        p.innerHTML = "";
        p.innerHTML = `<img src="./img/${p.classList[1]}.gif" alt="${p.classList[1]}" />`;
    }, 1000)
}

function comparaCartas(C1, C2) {
    setTimeout(() => {
        parrots.classList.remove(existeClicada);
        if (C1.classList[1] != C2.classList[1]) {
            const cartas = document.querySelectorAll(".desvira-carta"),
                carta01 = document.querySelector(`#${cartas[0].id}`),
                carta02 = document.querySelector(`#${cartas[1].id}`);
            carta01.classList.remove('desvira-carta');
            carta02.classList.remove('desvira-carta');
            carta01.classList.add('vira-carta');
            carta02.classList.add('vira-carta');
            primeiraCarta = undefined;
            setTimeout(() => {
                carta01.innerHTML = "";
                carta02.innerHTML = "";
                carta01.innerHTML = `<img src="./img/front.png" alt="Parrot" />`;
                carta02.innerHTML = `<img src="./img/front.png" alt="Parrot" />`;
            }, 1000)
            setTimeout(() => {
                carta01.classList.remove('vira-carta');
                carta02.classList.remove('vira-carta');
                jogadaFinalizada = true;
            }, 2000)
        } else {

            C1.classList.remove('desvira-carta');
            C2.classList.remove('desvira-carta');
            C1.classList.remove('desvirada');
            C2.classList.remove('desvirada');
            contaAcertos = contaAcertos + 2;
            jogadaFinalizada = true;
            if (contaAcertos == distribuicao.length){
                clearInterval(idInterval);
                alert(`Parabêns!! Você concluiu esse jogo em ${sec} segundos com ${contaJogadas/2} jogadas.`)
                let resp = prompt("Pretende continuar jogando? Responda sim ou não.")
                while(resp != "sim " || resp != "não"){
                    if (resp == "sim") {
                        iniciaJogo()
                        break
                    }else{
                        alert("Haaa, que pena! Nós gostamos de brincar com você. Volte sempre para se divertir com os parrots divertidos!!")
                        break
                    }
                }
                
            }
        }
    }, 2000)
}

idInterval = setInterval(function(){ timer() }, 1000);

function timer() {
    var d = new Date();
    sec++;
    time.innerHTML = `<p>Hora: ${d.toLocaleTimeString()}</p>
    <p>Jogo: seg= ${sec}</p>`;
}

iniciaJogo();












