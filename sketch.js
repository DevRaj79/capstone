var bg, bgImg,bg2
var bottomGround
var topGround
var balloon, balloonImg,bird;
var jumpSound,dieSound,score ,scoreSound;
var gameState = 0;
var score;
var btnimg;
var obs,obsGroup,obsImg,obsImg2,obsTri,triGrp;
var button,resButton,resButtonImg,gameOver,gameOverImg;
var uiBg,life = 4;
var scoreDelay =0;
function preload(){

bgImg = loadImage("assets/bg.jpg")
btnimg = loadImage("assets/button.png")
resButtonImg = loadImage("assets/restart.png")
gameOverImg = loadImage("assets/gameOver.png")
obsImg = loadImage("assets/obsTop1.png");
obsImg2 = loadImage("assets/obsTop2.png");

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
jumpSound = loadSound("assets/jump.mp3")
dieSound = loadSound("assets/die.mp3")
scoreSound = loadSound("assets/score.mp3")
}

function setup(){
  createCanvas(495,330)
//background image
bg = createSprite(200,165,1,1);
bg.addImage(bgImg);
bg.scale = 0.8;
bg2 = createSprite(788,165,1,1);
bg2.addImage(bgImg);
bg2.scale = 0.8;

bg.velocityX -= 3;
bg2.velocityX -= 3;
obsGroup = new Group();
triGrp = new Group();
//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
// bottomGround.visible = false;

topGround = createSprite(200,-10,800,20);
// topGround.visible = false;

//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.15;
// balloon.debug = true;
balloon.setCollider("rectangle",0,-50,200,450)

button = createSprite(250,165);
button.addImage(btnimg);
button.scale = 0.2;

score = 0;

}

function draw() {
  background("black");
  if(gameState === 0){
    
          if(mousePressedOver(button)){
            balloon.y -= 100;
            button.depth -= bg.depth
            button.depth -= bg2.depth
            button.destroy();
            gameState = 1;
          }
          
        }

        if(gameState === 1){
          scoreDelay += 1;
          console.log(scoreDelay)
          if(mouseWentDown()) {
            balloon.velocityY= -12 ;
            jumpSound.play();
          }
          if(keyWentDown("space")) {
            balloon.velocityY= -12 ;
            jumpSound.play();
          }
          balloon.velocityY = balloon.velocityY+1;
          spawnObs();
          if (obsGroup.isTouching(balloon)){
            gameState = 2;
            dieSound.play();
          }
          if (triGrp.isTouching(balloon)&&scoreDelay > 20){
            // this.destroy();

            scoreSound.play();
            score += 1;
            scoreDelay = 0;
          }
          if (bottomGround.isTouching(balloon)||topGround.isTouching(balloon)){
            gameState = 2;
            dieSound.play();
          }
          
          
        }

        if(gameState === 2){
          obsGroup.setLifetimeEach(-1);
          uiBg = createSprite(247.5,115,495,450);
          uiBg.shapeColor = "red"
          gameOver = createSprite(250,120);
          resButton = createSprite(250,180);
          if (mousePressedOver(resButton)){
            reset();
          }
          gameOver.addImage(gameOverImg);
          resButton.addImage(resButtonImg);
          resButton.scale = 0.5;
          balloon.velocityY = 0
          obsGroup.setVelocityXEach(0)
          bg.velocityX = 0;
          bg2.velocityX = 0;

        }

        if(bg.x < -370){
          bg.x = 788  
        }
        if(bg2.x < -370){
          bg2.x = 788  
        }
        
        drawSprites();
        textSize(20);
        fill("black")
        text("Score :"+score,50,50);
      }
      function spawnObs(){
        if(frameCount % 60=== 0){
          obs = createSprite(500,Math.round(random(0,200)))
    obsTri = createSprite(obs.x,250,50,330);
    obsTri.visible= false;
    var rnd = Math.round(random(1,2))
    switch(rnd){
      case 1: obs.addImage(obsImg)
      break;
      case 2: obs.addImage(obsImg2)
      break;
    }
    obs.scale = 0.07;
    obs.lifetime = 100;
    obsTri.lifetime = 100;
    obs.velocityX = -5;
    obsTri.velocityX = -5;
    obsGroup.add(obs);
    triGrp.add(obsTri);
  }
}
function reset(){
  window.location.reload();
}