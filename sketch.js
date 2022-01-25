var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obTop1, obTop2;
var obstacleA, obstacleB, obstacleC;

function preload(){
bgImg = loadImage("assets/bg.png")

obTop1 = loadImage("assets/obsTop1.png")
obTop2 = loadImage("assets/obsTop2.png")
obstacleA = loadImage("assets/obsBottom1.png")
obstacleB = loadImage("assets/obsBottom2.png")
obstacleC = loadImage("assets/obsBottom3.png")


balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomObstaclesGroup = new Group()
topObstaclesGroup = new Group()
barGroup = new Group()
}

function draw() {
  
  background("black");
     if(gameState===PLAY){  
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
        bar()
        spawnObstaclesTop()
        spawnObstaclesBottom()
if(topObstaclesGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)||bottomObstaclesGroup.isTouching(balloon)){
  gameState=END
}
}
if(gameState===END){
  
}
drawSprites();

}
function spawnObstaclesTop(){
  if(World.frameCount%60===0){
    obstacleTop=createSprite(400,50,40,50)
    obstacleTop.velocityX=-4

    obstacleTop.y=Math.round(random(10,100))

    var r = Math.round(random(1,2))
    
    switch(r){
      case 1: obstacleTop.addImage(obTop1);
      break;
      case 2: obstacleTop.addImage(obTop2);
      break;
      default:break
    }
    obstacleTop.scale=0.1;

    obstacleTop.lifetime=200;
    topObstaclesGroup.add(obstacleTop);
    balloon.depth=balloon.depth+1;
  }
  
}

function spawnObstaclesBottom(){
  if(World.frameCount%60===0){
    obstacleBottom=createSprite(400,350,40,50)
    obstacleBottom.velocityX=-4

obstacleBottom.scale=0.1;

    obstacleBottom.y=Math.round(random(10,100))

    var r1 = Math.round(random(1,3))
    
    switch(r1){
      case 1: obstacleBottom.addImage(obstacleA);
      break;
      case 2: obstacleBottom.addImage(obstacleB);
      break;
      case 3: obstacleBottom.addImage(obstacleC);
      break;
      default:break
    }

    obstacleBottom.lifetime=100;
    
    balloon.depth=balloon.depth+1;
    bottomObstaclesGroup.add(obstacleBottom);
  }
  
}
function bar(){
if(World.frameCount%60===0){
var b1 = createSprite(400,200,10,800)
b1.velocityX=-6;
b1.depth=balloon.depth;
b1.lifetime=80;
b1.visible=false;
barGroup.add(b1);
}

}