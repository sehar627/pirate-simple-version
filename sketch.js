const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls=[]

var boats=[]

var boat
var cannonBall
var score=0
var isLaughing = false;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  waterSound = loadSound("./assets/cannon_water.mp3");
  pirateLaughSound = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
  brokenboat=loadImage("./assets/boat_wreck.png")

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 150, 100, 50, angle);
  

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


  Engine.update(engine);
  ground.display();
 
  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
         //boats[j].remove(j);
          Matter.World.remove(world, boats[j].body);
          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          boats.splice(j,1);
          j--;
          
          i--;
          
          
      } 
    }

    
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111//
for (var j = 0; j < boats.length; j++) {

  var collision2 = Matter.SAT.collides(tower.body, boats[j].body);
  if (collision2.collided) {
   
    if(!isLaughing && !pirateLaughSound.isPlaying()){
      pirateLaughSound.play();
      isLaughing = true
    }
    textSize(50)
    fill("black")
    text("Game Over ",600,400)
   
  } 
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
  cannon.display();
  tower.display();
showBoat()

 //Matter.Body.setVelocity(boat.body,{x:-0.9,y:0})
 
}





function keyPressed(){
  if(keyCode===DOWN_ARROW){
    cannonBall = new CannonBall(180,150,40);
    balls.push(cannonBall)
    cannonExplosion.play()
  }

}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    
    balls[balls.length-1].shoot()
   
  }
}


function showCannonBalls(ball,index){
  ball.display()

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111111//
  if(ball.body.position.x>=width||ball.body.position.y>=height){
    World.remove(world,ball)
    balls.splice(index,1)
  }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//  
}


function showBoat(){
  
 
  if (boats.length > 0) {
    if (
      boats.length < 4&&
      boats[boats.length - 1].body.position.x < 900  
    ) {
      //var positions = [-130, -100, -120, -80];
      //var position = random(positions);
      var boat = new Boat(width,400, 150, 150);
      boats.push(boat);
       console.log(boat)
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      //pirateLaughSound.play()
    }
  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100);
    boats.push(boat);
  }
}