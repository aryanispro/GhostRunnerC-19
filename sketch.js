var ghost, ghostImg;
var tower, towerImg;
var door, doorImg;
var climber, climberImg;
var climberGroup, doorGroup;

var Play = 1;
var End = 0;
var gameState = Play;

function preload() {


  ghostImg = loadAnimation("ghost-jumping.png", "ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");

}

function setup() {
  createCanvas(400, 600);

  tower = createSprite(200, 0, 400, 600);
  tower.velocityY = 4;
  tower.addImage(towerImg);
  tower.scale = 0.7;

  ghost = createSprite(200, 300, 20, 30);
  ghost.addAnimation("Running", ghostImg);
  ghost.scale = 0.3;

  climberGroup = new Group();
  doorGroup = new Group();

}


function draw() {
  background("white");

  if (gameState === Play) {



    if (tower.y > 400) {
      tower.y = 300;
      console.log(tower.y);
    }
    if (keyDown("Up")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown("Right")) {
      ghost.x = ghost.x + 5;
    }
    if (keyDown("Left")) {
      ghost.x = ghost.x - 5;
    }

    if (ghost.isTouching(climberGroup) || ghost.y > 600) {
      gameState = End;


    }


    spawnObs();
    drawSprites()
  }
  if (gameState === End) {
    textSize(40);
    text("Game Over", 120, 300);
    console.log(ghost.y);
  }
}

function spawnObs() {
  if (frameCount % 100 === 0) {
    door = createSprite(Math.round(random(100, 300)), Math.round(random(0, 100)), 20, 40);
    door.addImage(doorImg);
    door.scale = 0.8;
    door.lifetime = 100;
    door.velocityY = 2;
    doorGroup.add(door);


    climber = createSprite(door.x, door.y + 55, 10, 10);
    climber.addImage(climberImg);
    climber.scale = 0.6;
    climber.lifetime = 100;
    climber.velocityY = 2;
    climberGroup.add(climber);
  }

}