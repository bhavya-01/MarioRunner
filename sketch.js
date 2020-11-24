
var gameState = "play";
var score = 0;

var fireball,fireballImage;
var ground;
var mario,marioImage;
var bgImage;
var base,baseImage;
var obstacle1,obstacle3;
var endline;
var coins,coinsImage,coinsGroup;

function preload() {
  
  marioImage = loadImage("mariorun.gif") 
  baseImage = loadImage("base1.png");
  bgImage = loadImage("marioground.png")
  obstacle1 = loadImage("mushroom.jpg")
coinsImage = loadImage("coins2.gif")
   obstacle3 = loadImage("villains.gif")
  fireballImage = loadImage("firemario.gif")
  
}

function setup() {
  createCanvas(1000,450);
  
  mario = createSprite(50,380,20,20);
  mario.addImage("mario",marioImage);
  mario.scale = 0.5
 
  background = createSprite(300,20);
  background.addImage(bgImage);
  background.scale = 6;

  ground = createSprite(0,420,500,10);
  
  endline = createSprite(0,145,10,500);
  endline.shapeColor = "skyblue"
  
  baseGroup = new Group();
 coinsGroup = new Group();
  obstaclesGroup = new Group();
  fireballGroup = new Group();
  
}

function draw() {
  

if(gameState === "play"){
 background.velocityX = -7;
    if (background.x < 120){
      background.x = background.width;
    }
  
  if(fireballGroup.isTouching(obstaclesGroup)){
    fireballGroup.destroyEach();
    obstaclesGroup.destroyEach();
    
  }
  
  if(mario.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
    score = score+1;
    
  }
  

  if(keyDown("space")&&mario.y>350){
    mario.velocityY = -20;

  }
  mario.velocityY = mario.velocityY +   0.8
  
  
  ground.visible = false;
  mario.collide(ground);
  mario.deph = background.depth;
  mario.depth = mario.depth+1
  
  mario.collide(baseGroup);
  
  mario.collide(endline);
  
   obstaclesGroup.depth = background.depth;
   obstaclesGroup.depth = obstaclesGroup.depth+1
  
  if(mario.isTouching(obstaclesGroup)){
    mario.destroy();
    obstaclesGroup.destroyEach();
    gameState= "end";
  }
  
  SpawnFire();
  SpawnCoins();
  SpawnObstacle();
  SpawnBase();
    drawSprites();
  
  stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Coins Collected:"+score,20,40);
  
}
  
   if(gameState=== "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over ",200,250)

    
  }


  
   
 
}

function SpawnBase(){
  if(frameCount%200 ===0){
    base = createSprite(1000,315,20,20);
    base.y = Math.round(random(200,220));
    base.addImage("base",baseImage)
    base.velocityX = -6;
    base.scale = 0.5 ;
    base.lifetime = -1;
    
    baseGroup.add(base);
  }

}

function SpawnObstacle(){
 if (frameCount % 240 === 0){
   var obstacle = createSprite(1000,370);
   obstacle.velocityX = -6 
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle3);
              break;

      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
  
   obstacle.depth = background.depth;
   obstacle.depth = obstacle.depth+1
    obstacle.lifetime =  -1;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
   obstacle.setCollider("circle",0,0,100)
   obstacle.debug = true;
 }

}

function SpawnCoins(){
  if(frameCount%50 ===0){
    coins = createSprite(1000,300,20,20);
    coins.y = Math.round(random(300,150));
    coins.addImage("base",coinsImage)
    coins.velocityX = -6;
    coins.scale = 0.05 ; 
    coins.lifetime = -1;
    
    coinsGroup.add(coins)
  }

}

function SpawnFire(){
  
  if(keyDown("s")&& frameCount%20 ===0 ){
    fireball = createSprite(mario.x,mario.y);
    fireball.addImage("fire",fireballImage);
    fireball.scale = 0.2;
    fireball.velocityX = 5;
    
    fireballGroup.add(fireball);
  }
}