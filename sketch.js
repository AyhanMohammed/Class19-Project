var boy,boy_running;
var coins,coinsGroup,coinsImg;
var bird,birdsGroup,bird_flying;
var obstacle,obstacleGroup,obstacleImg;
var forest,forestImg;
var invisibleBlock;
var score = 0;
var gameOver,gameOverImg;
var gameState = "play";

function preload(){

    boy_running = loadAnimation("boy1.png","boy2.png","boy3.png");

    bird_flying = loadAnimation("sprite_0.png","sprite_1.png");

    coinsImg = loadImage("coins.png");

    obstacleImg = loadImage("obstacle.png");

    forestImg = loadImage("background.png");

    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(650,600);

    forest = createSprite(300,180,10,10);
    forest.addImage(forestImg);
    forest.velocityX = -6 ;
    forest.scale=1.5 
    
    boy = createSprite(140,height-150,20,50);
    boy.addAnimation("running",boy_running);
    boy.scale = 0.8;
    //boy.debug = true;
    boy.setCollider("rectangle",0,0,30,250);

    obstacleGroup = createGroup();
    coinsGroup = createGroup();
    birdsGroup = createGroup();

    gameOver = createSprite(300,300,50,50);
    gameOver.addImage(gameOverImg);

    invisibleBlock = createSprite(width/2,height+40,width,125);
    invisibleBlock.visible = false;
    

    
 
}

function draw() {
    background("black");

    if (gameState === "play"){
        forest.velocityX = -(6 + score/10);
        if (forest.x <50){
            forest.x = forest.width/2;
           }
     
         if (keyDown("space")){
             boy.velocityY = -15
     
         }
     
         //if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-120) {
         //boy.velocityY = -5;
          //touches = [];
         //}
     
         boy.velocityY = boy.velocityY + 0.8;
     
         boy.collide(invisibleBlock);
     
         if (boy.isTouching(obstacleGroup)){
             boy.destroy();
             gameState = "end";
         }
         
         if (boy.isTouching(coinsGroup)){
             score = score+10;
             coinsGroup.destroyEach();
         }

         gameOver.visible = false

         spawnObstacle();
         spawnBird();
         spawnCoins();

    }
        if (gameState === "end"){
            forest.velocityX = 0;
            obstacleGroup.destroyEach();
            coinsGroup.destroyEach();
            birdsGroup.destroyEach();
            gameOver.visible = true;

    }

    

    

    drawSprites();

    fill("white");
    textSize(20);
    text("Score ="+score,50,50);


 
}

function spawnObstacle(){
    if (frameCount % 280 === 0){
        obstacle = createSprite(650,height-120,20,50);
        obstacle.scale = 0.3
        obstacle.velocityX = -(6 + score/10);
        obstacle.addImage(obstacleImg);
        obstacle.lifetime = 400
        obstacle.depth = boy.depth;
        boy.depth +=1;
        obstacleGroup.add(obstacle);
        //obstacle.debug = true;
        obstacle.setCollider("rectangle",0,0,300,150)
        

        
    }



}

function spawnBird(){
    if (frameCount % 260 === 0) {
        bird = createSprite(650,height-300,40,10);
        bird.y = Math.round(random(100,120));
        bird.addAnimation("flying",bird_flying);
        bird.scale = 0.8;
        bird.velocityX = -(6 + score/10);;
        //bird.debug = true;
        bird.lifetime = 900;

        birdsGroup.add(bird);
      }
}

function spawnCoins(){
    if (frameCount % 180 === 0) {
        coins = createSprite(650,height-100,40,10);
        coins.addImage(coinsImg);
        coins.scale = 0.2;
        coins.velocityX = -(6 + score/10);
        
        coins.lifetime = 900

        coinsGroup.add(coins);
      }
}
    
