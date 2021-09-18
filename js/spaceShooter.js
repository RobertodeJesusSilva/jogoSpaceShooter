
const naveAtirador = window.document.querySelector(".atirador");
const areaPrincipal = window.document.querySelector(".areaPrincipalJogo");
const alienigenas = ['../img/monster-1.png', '../img/monster-2.png', '../img/monster-3.png'];
const iniciarJogo = window.document.querySelector(".iniciar");
const instrucoeJogo = window.document.querySelector(".instrucoes");
let intervaloAlienigena;

function movimentarDisparar(evento){
    if(evento.key === "ArrowUp"){
        evento.preventDefault();
        moverAcima();
    }
    else if(evento.key ==="ArrowDown"){
        evento.preventDefault();
        moverAbaixo();
    }
    else if(evento.key === " "){
        evento.preventDefault(); 
        disparoLaser();
    }
}

function moverAcima(){
    let posicaoTopo = window.getComputedStyle(naveAtirador).getPropertyValue("top");
    if(posicaoTopo === "0px"){
        return;
    }
    else{
        let posicao = parseInt(posicaoTopo);
        posicao -= 10;
        naveAtirador.style.top = `${posicao}px`;
    }
}

function moverAbaixo(){
    let posicaoTopo = window.getComputedStyle(naveAtirador).getPropertyValue("top");
    if(posicaoTopo === "550px"){
        return;
    }
    else{
        let posicao = parseInt(posicaoTopo);
        posicao += 10;
        naveAtirador.style.top = `${posicao}px`;
    }
}

function disparoLaser(){
    let laser = criarLaser();
    areaPrincipal.appendChild(laser);
    moverLaser(laser);
}

function criarLaser(){
    let posicaoX = parseInt(window.getComputedStyle(naveAtirador).getPropertyValue("left"));
    let posicaoY = parseInt(window.getComputedStyle(naveAtirador).getPropertyValue("top"));
    let novoLaser = window.document.createElement("img");
    novoLaser.src = "../img/shoot.png";
    novoLaser.classList.add("laser");
    novoLaser.style.left = `${posicaoX + 15}px`;
    novoLaser.style.top = `${posicaoY + 15}px`;
    return novoLaser;
}

function moverLaser(laser){
    intervaloDoLaser = setInterval(() => {
        let posicaoX = parseInt(laser.style.left);
        let alienigenas = window.document.querySelectorAll(".alienigena");
        alienigenas.forEach((allien) => {
            if(checarColisaoLaser(laser, allien)){
                allien.src = "../img/explosion.png";
                allien.classList.remove("alienigena");
                allien.classList.add("alienigenaMorto");
            }
        });        

        if(posicaoX >= 400){
            laser.remove();
        }
        else{
            laser.style.left = `${posicaoX + 10}px`;
        }
    }, 10);
}

function criarAlienigenas(){
    let novoAlienigena = window.document.createElement("img");
    let alienigenaAleatorio = alienigenas[Math.floor(Math.random() * alienigenas.length)];
    novoAlienigena.src = alienigenaAleatorio;
    novoAlienigena.classList.add("alienigena");
    novoAlienigena.classList.add("transicaoAlienigena");
    novoAlienigena.style.left = "370px";
    novoAlienigena.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    areaPrincipal.appendChild(novoAlienigena);
    moverAlienigena(novoAlienigena);
}

function moverAlienigena(alienigena){
    let intervaloMoverAlienigenas = setInterval(() => {
        let posicaoX = parseInt(window.getComputedStyle(alienigena).getPropertyValue("left"));

        if(posicaoX <= 50){
            gameOver();
        }
        if(Array.from(alienigena.classList).includes("alienigenaMorto")){
            setTimeout(() => {alienigena.remove();}, 100);
        }

        if(posicaoX > 50 && posicaoX <= 500){
            alienigena.style.left = `${posicaoX - 3}px`;
        }
        
    }, 30);
}

function checarColisaoLaser(laser, alienigena){
    let posicaoXLaser = parseInt(laser.style.left);
    let posicaoYLaser = parseInt(laser.style.top);
    let meioDoLaser = posicaoYLaser + 10;
    let frenteDoLaser = posicaoXLaser + 40;
    let posicaoXAlienigena = parseInt(alienigena.style.left);
    let topoAlienigena = parseInt(alienigena.style.top);
    let posicaoBaixoAlienigena = topoAlienigena + 59;
   
        if(posicaoXLaser <= 400 && frenteDoLaser >= posicaoXAlienigena){
            if(meioDoLaser >= topoAlienigena && meioDoLaser <= posicaoBaixoAlienigena ){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
}

function gameOver(){
    window.removeEventListener("keydown", movimentarDisparar);
    clearInterval(intervaloAlienigena);
    let alienigenas = window.document.querySelectorAll(".alienigena");
    alienigenas.forEach((allien) => { allien.remove(); });
    let laseres = window.document.querySelectorAll(".laser");
    laseres.forEach((laser) => {laser.remove(); });
    setTimeout(() => {
        window.alert("Você perdeu! Ha! Ha! Ha!")
        naveAtirador.style.top = "250px";
        iniciarJogo.style.display = "block";
        instrucoeJogo.style.display = "block";
    });

}

iniciarJogo.addEventListener('click', (event) => {
    iniciar();
})

function iniciar(){
    iniciarJogo.style.display = "none";
    instrucoeJogo.style.display = "none";
    window.addEventListener("keydown", movimentarDisparar);
    intervaloAlienigena = setInterval(() => { criarAlienigenas();}, 2000);
}

