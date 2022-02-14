var trex, trex_running, edges;
var soloing;
var solo, soloinvisivel;
var nuvens, nuvensing;
var obstaculos, obstaculos1, obstaculos2, obstaculos3, obstaculos4, obstaculos5, obstaculos6;
var pontuacao = 0;
var grupinho;
var grupinhozinho;
var PLAY=1 
var END=0 
var estadojogo=PLAY
var trex_collided
var gameoverimg
var restart
var gameover
var restartimg
var mortesom
var jumpsom
var scoresom
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png", "trex3.png","trex4.png");
  soloing = loadImage ("ground2.png");
  nuvensing = loadImage ("cloud.png")
  obstaculos1 = loadImage ("obstacle1.png")
  obstaculos2 = loadImage ("obstacle2.png")
  obstaculos3 = loadImage ("obstacle3.png")
  obstaculos4 = loadImage ("obstacle4.png")
  obstaculos5 = loadImage ("obstacle5.png")
  obstaculos6 = loadImage ("obstacle6.png")
  restartimg = loadImage ("restart.png")
  gameoverimg = loadImage ("gameOver.png")
  scoresom = loadSound ("checkpoint.mp3")
  jumpsom = loadSound ("jump.mp3")
  mortesom = loadSound ("die.mp3")
  trex_collided = loadAnimation ("trex_collided.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 25

  //criando o solo 
  solo = createSprite (width/2, height-80, width, 20);
  solo.addImage (soloing);

  //criando o solo invisivel 
  soloinvisivel = createSprite (width/2, height-70, width, 20);
  soloinvisivel.visible = false;

  grupinho= new Group ();
  grupinhozinho = new Group ();
 trex.setCollider("rectangle", 0,0, 40, trex.height);
 

restart= createSprite (width/2, height/2, 10,10)
gameover= createSprite (width/2, height/2-50, 10 ,10)
gameover.addImage(gameoverimg)
restart.addImage(restartimg)
restart.scale=0.5
gameover.scale=2
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
text ("pontuação: " + pontuacao, 40, 40);

if (estadojogo===PLAY){

  pontuacao = pontuacao + Math.round(getFrameRate()/60);
if (pontuacao > 0 && pontuacao %100 ===0){
 scoresom.play();
}
//velocidade do solo e reiniciar ele
solo.velocityX = -(4+pontuacao/ 100);
if (solo.x < 0 ) {
  solo.x = solo.width / 2; 
}

 //pular quando tecla de espaço for pressionada
 if((touches.length>0||keyDown("space"))&& trex.y >= height-120){
  trex.velocityY = -10;
  jumpsom.play();
  touches=[];
}

//gravidade do trex
trex.velocityY = trex.velocityY + 0.5;

gerarnuvens ();
gerarobstaculos ();
 gameover.visible= false; 
 restart.visible=false;
if(grupinhozinho.isTouching(trex)){
//trex.velocityY= -12;
 estadojogo=END;
mortesom.play();
}
}

else if (estadojogo===END){
solo.velocityX=0
grupinho.setVelocityXEach(0);
grupinhozinho.setVelocityXEach(0)
trex.changeAnimation ("collided", trex_collided)
trex.velocityY=0
grupinhozinho.setLifetimeEach(-1)
grupinho.setLifetimeEach (-1)
gameover.visible= true; 
 restart.visible=true;
 if (touches.length>0||mousePressedOver(restart)){
  reset()
  touches=[];
 
 }
}
 
  //registrando a posição y do trex
 
  
 
  
 //impedir que o trex caia
  trex.collide(soloinvisivel);


 
  drawSprites();


}

function gerarnuvens(){
  if (frameCount%60===0){

  

nuvens=createSprite (width+29, height-300, 40, 10);
nuvens.addImage(nuvensing);
nuvens.velocityX = -2 ;
nuvens.scale = 0.9;
nuvens.y = Math.round(random(100, 220));
nuvens.lifetime = width/nuvens.velocityX;
trex.depth=nuvens.depth;
trex.depth=trex.depth+1;
grupinho.add(nuvens)
}
}
function gerarobstaculos (){
if (frameCount%80===0){

  obstaculos=createSprite (width+29, height-95, 10, 40);
  obstaculos.velocityX = -(4+pontuacao/ 100);
  var rand= Math.round(random(1, 6));
  switch (rand) {
    case 1: obstaculos.addImage (obstaculos1);
    break;
    case 2: obstaculos.addImage (obstaculos2);
    break;
    case 3: obstaculos.addImage (obstaculos3);
    break;
    case 4: obstaculos.addImage (obstaculos4);
    break;
    case 5: obstaculos.addImage (obstaculos5);
    break;
    case 6: obstaculos.addImage (obstaculos6);
    break;
  }
  obstaculos.scale = 0.5;
  obstaculos.lifetime = width/obstaculos.velocityX;
  grupinhozinho.add (obstaculos);
}
}
function reset (){
 estadojogo= PLAY;
 grupinhozinho.destroyEach() ;          
 grupinho.destroyEach();
 pontuacao=0;
 trex.changeAnimation("running", trex_running)

}