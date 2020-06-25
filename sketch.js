var trackSpr;
var pos;
var posVal;
var car;
var enemyGroup;
let speed = 1;
let gameState = 0;
function preload(){
   img = loadImage("track.png")
   ecarim = loadImage("car.jpg")
   carim = loadImage("car.jpg")
}

function setup() {
  //if (displayWidth > 720){
  createCanvas(displayWidth/2,displayHeight/2);
  /*} else {
  createCanvas(displayWidth,displayHeight);
  }*/
  pos = width/2
  posVal = 1;
  enemyGroup = createGroup(); 
  car = createSprite(pos, 5*height/6)
  car.addImage(carim)
  car.scale = 0.5;
  score = 0;
    
}

function draw() {
  background(0);  
  //rotate(45)
  if(gameState == 0){

  push();
  rectMode(CENTER)
  fill(255, 255, 255)
  //strokeWeight(10);
  textSize(50)
  text("Press Space to Start", width/2 - 120, height/2)
  pop();
  }
  car.x = pos[posVal]
  pos = [(1/4)*(width), (1/2)*(width),(3/4)*(width)]
  //console.log(mouseX," ", mouseY)
  //imageMode(CENTER);
  if (gameState == 1){
  spawnEnemies();
   if (frameCount%5==0){
   score++
   }
  if (score%50==0){
   speed+=0.3;
  }
  
  enemyGroup.overlap(car, ()=>{
   for (var i = 0; i < enemyGroup.length; i++){
 	removeSprite(enemyGroup.get(i));
    	console.log("Removed:", i)
    } 
  
    enemyGroup.clear()
    gameState = 2
    })
  }
    
  
  drawSprites();
if(gameState!=2){ 
  push();
  fill(255, 255, 255)
  textSize(15)
  text("Score:"+ score, width - 100, height - 50)
  pop();
} else{
  push();
rectMode(CENTER)
  fill(255, 255, 255)
  //strokeWeight(10);
  textSize(50)
  text("Score:"+ score, width/2-50, height/2)
  text("Press Space to Start", width/2 - 120, height/2+100)
  pop();

}
}
function keyPressed() {
  if (gameState == 1){ 
  if (keyCode === LEFT_ARROW){
	if(posVal!=0)posVal--;
  }else if (keyCode === RIGHT_ARROW){
        if(posVal!=2)posVal++;
  }
  } 
  if (keyCode == 32){
  gameState = 1;
  score = 0;
  }
}
function spawnEnemies(){
    if (frameCount % (60*(1/speed)) == 0){
    	enposVal = round(random(0, 2))
	var ecar = createSprite(pos[enposVal], -20)
	ecar.velocityY = 3 * speed
        ecar.life = width/(-3 * speed);
        ecar.addImage(ecarim)
        ecar.scale = 0.5;
        enemyGroup.add(ecar);  
    }
}