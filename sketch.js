var marioani, mario;
var coinimg, coin;
var princessimg, princess;
var bg;
var enemyani, enemyGroup;
var groundimg, ground;
var invisGround1
var flowerani, flowerGroup
var mario_fall
var gameState, score;
var PLAY, START, END, WIN
var pipeimg, pipeGroup
var startimg, starts
var liveimg, life, lives
var time
var resetimg, reset;
var gameOverimg, gameOver

function preload() {
bg = loadImage("sprites/bg.png")

enemyani = loadAnimation("sprites/enemy1.png", "sprites/enemy2.png")

groundimg = loadImage("sprites/ground.png")

marioani = loadAnimation("sprites/mario1.png", "sprites/mario2.png")

flowerani = loadImage("sprites/PIPE.png", "sprites/flower1.png")

mario_fall = loadAnimation("sprites/mario_dead.png")

pipeimg = loadImage("sprites/pipes.png")

startimg = loadImage("sprites/sprite_game0 (2).png")

resetimg = loadImage("sprites/restart.png")

gameOverimg = loadImage("sprites/gameOver.png")
}

function setup(){
    var canvas = createCanvas(displayWidth - 20, displayHeight);

 
ground = createSprite(600,850,1000,10)
ground.addImage(groundimg)
ground.x = ground.width/2
ground.velocityX = -3

mario = createSprite(100, 770, 10, 01)
mario.addAnimation("running", marioani)
mario.scale = 0.5

reset = createSprite(700,600,404,040)
reset.addImage("resets", resetimg)
reset.visible = false

gameOver = createSprite(700,400,404,040)
gameOver.addAnimation("gameover", gameOverimg)
gameOver.visible = false

pipeGroup = new Group()

enemyGroup = new Group()

invisGround1 = createSprite(600, 841, 2000,20)
invisGround1.visible = false

starts = createSprite(700,400,060,060)
starts.addImage("starting", startimg)
starts.scale = 0.7
starts.visible = false

time = 400

score = 0

START = 0
PLAY = 1
END = 2
WIN = 3
DEAD = 4

life = 3

gameState = START


}

function draw(){
    background(bg);

    mario.collide(invisGround1)
mario.collide(pipeGroup)

  mario.depth = 100
  pipeGroup.setDepthEach(mario.depth - 100)

  if (keyDown("space") && mario.y >= 10 && mario.isTouching(ground) ){
      mario.velocityY = -20
  }

  if (keyDown(UP_ARROW) && mario.y >= 10 && mario.isTouching(ground) ){
    mario.velocityY = -20
}

if (gameState === START){
starts.visible = true
score = 0
mario.visible = false
if(mousePressedOver(starts)){
  gameState = PLAY
  mario.visible = true
  mario.y = 1
  mario.velocityY = 10
  starts.visible = false
  }
}

if (gameState === PLAY){
  score = score + Math.round(World.frameRate/60)
  
  if (score>0 && score % 10 === 0){
    time = time - 1
    }
  }




if (gameState === END){
reset.visible = true
gameOver.visible = true
mario.destroy()
enemyGroup.destroyEach()
pipeGroup.destroyEach()
if(mousePressedOver(reset)) {
  resetting()
}
}

  
    goombaSpawn()
    pipeSpawn()


if (mario.x < 1000){
  gameState = END
}

if(time === 0){
gameState = END
}

  mario.velocityY = mario.velocityY +0.5

    if (ground.x < 0){
        ground.x = ground.width/2;
     }

    if (enemyGroup.collide(mario)) {
      mario.changeAnimation("mariofalling", mario_fall)
      enemyGroup.destroyEach()
      life = life - 1
      }

     //console.log(frameCount)

 drawSprites()   

 stroke("black");
  strokeWeight(4);
  fill("black");
  textSize(40);
text("Score: "+ score, 100, 100);
text("Time Remaining:"+ time,90,150)

}

function goombaSpawn() {
  if(frameCount % random(40,230) === 0) {
  var enemy = createSprite(2000,780,10,40);
enemy.velocityX = -10
enemy.addAnimation("goomba", enemyani);
enemy.scale = 0.2
enemyGroup.add(enemy)
}  
}



    function pipeSpawn() {
      if(frameCount % 390 === 0) {
           var pipe = createSprite(2000,780,10,40);
             pipe.velocityX = -4
             pipe.addImage("pipes ", pipeimg);
             pipe.scale = 0.7
             pipeGroup.add(pipe)
             
         }  
         }

         function resetting(){
           gameState = PLAY
           score = score
           time = 400
           reset.visible = false
gameOver.visible = false
         }