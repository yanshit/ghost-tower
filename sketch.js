var gameState = "play"
var gameState="END"
var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlockGroup, invisibleBlock;

function preload(){
towerImage=loadImage("tower.png");
doorImage=loadImage("door.png");
doorsGroup=new Group();

climberImage=loadImage("climber.png");
climbersGroup=new Group();
invisibleBlockGroup = new Group();
  
ghostImage=loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  
}

function draw(){
  
background(0);
if (tower.y>400)
  {
    tower.y=400;
    
  }
  if (keyDown("left_arrow"))
    {
      ghost.x=ghost.x-3;
      
      
    }

  if (keyDown("right_arrow"))
    {
      
      ghost.x=ghost.x+3;
      
    }
    
    if (keyDown("space"))
    {
      ghost.velocityY=-5;
      
    }
ghost.velocityY=ghost.velocityY+0.8;
  
  
  spawnDoor();
  
      if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }      
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
  
  drawSprites();
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
  
}

function spawnDoor()
{
  if (frameCount%240===0)
{
  door=createSprite(200,-50);
  door.addImage(doorImage);
 
  invisibleBlock = createSprite(200,15);
  
  invisibleBlock.height = 2;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
   
  
  
  climber=createSprite(200,10);
  climber.addImage(climberImage);
  
  door.x=Math.round(random(120,400));
  door.velocityY=1;
  
  climber.x=door.x
  climber.velocityY=1;
  
  door.lifetime=800;
  climber.lifetime=800;
  invisibleBlock.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  
  invisibleBlockGroup.add(invisibleBlock);
  
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;

  
}
}
