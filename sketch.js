// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2; 

// velocidade da bolinha
let velocidadeXbolinha = 5;
let velocidadeYbolinha = 5;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variaveis da raquete
let xRaquete = 3;
let yRaquete = 150;

//variaveis do oponente
let xRaqueteOponente = 587;
let yRaqueteOponente = 150;
let velocidadeYoponente;

let colidiu = false; 

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// chance de errar
let chanceDeErrar = 0;

function preload (){
  trilha = loadSound ("trilha.mp3");
  ponto =  loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
 movimentaBolinha();     
  verificaColisaoBorda();
 mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
   incluirPlacar();
  marcarPonto ();
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro )
}

function movimentaBolinha (){
   xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificaColisaoBorda (){
    if ( xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXbolinha *= -1; 
  }
  if (yBolinha + raio> height || 
     yBolinha - raio< 0){
    velocidadeYbolinha *= -1; 
  }
}

function mostraRaquete(x,y){
  rect ( x, y, raqueteComprimento,
        raqueteAltura )
}

function mostraRaqueteOponente(){
  rect ( xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura )
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10; 
  }
   if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10; 
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete (x, y){
 colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura, xBolinha, yBolinha,raio);
  if (colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play(); 
  }
}


function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30; 
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
 fill(color(255, 140, 0))
  rect (150, 10, 40, 20);
  fill (255)
  text(meusPontos, 170, 26);
   fill(color(255, 140, 0))
  rect (450, 10, 40, 20);
  fill (255)
  text(pontosDoOponente, 470, 26);
}

function marcarPonto (){
  if (xBolinha > 590){
    meusPontos += 1; 
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}