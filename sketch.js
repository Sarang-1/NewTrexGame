var gamestate;
var start=2;
var play=1;
var end=0;
var ground,groundImage,base
var dino,dino_running;
var jump,checkpoint,die,score;
var obs1,obs2,obs3,obs4,out,obsgroup;
var start,oops,ops,strt,start1;

function preload(){
 
  start1=loadSound("mixkit-bonus-earned-in-video-game-2058.wav");
  obs1=loadImage("Imported piskel.gif");
  obs2=loadImage("Imported piskel (1).gif");
  obs3=loadImage("Imported piskel (2).gif");
  obs4=loadImage("Imported piskel (3).gif");
  start=loadImage("Imported piskel (5).gif");
  oops=loadImage("Imported piskel (6).gif");
  out=loadAnimation("Imported piskel (4).gif");
  checkpoint=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  groundImage=loadImage("images.jpg");
  dino_running=loadAnimation("dino1.png","dino2.png","dino3.png","dino4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground=createSprite(width/2,height/2,20,20);
  ground.addImage(groundImage);
  ground.scale=15;
  
  obs1.scale=2;
  
  dino=createSprite(100,height-100,10,10);
  dino.addAnimation("running",dino_running); 
  dino.addAnimation("end",out);
  dino.scale=0.3;
  dino.setCollider("rectangle",0,0,380,210);
  
  base=createSprite(600,height-30,2000,20);
  base.shapeColor="crimson";
  
  ops=createSprite(width/2,height/2-50,20,20);
  ops.addImage(oops);
  
  strt=createSprite(width/2,height/2,20,20);
  strt.addImage(start);
  
  score=0;
  gamestate=start;
  
  obsgroup=new Group();
}

function draw() {
  background("lightgreen");
    
  drawSprites();
 
  dino.collide(base);
  
  if(gamestate===start){
    dino.visible=false;
    base.visible=false;
    ground.visible=false;
    ops.visible=false;
    fill("brown")
    textSize(15);
    text("1. (CLICK on screen) to jump.",70,80);
    text("2. Beware of the ostacles",70,100);
    text("3. Click on the start button below to resume",70,120);
    text("4. Please rotate your mobile to landscape made for best experience",70,140);
    
    if(mousePressedOver(strt)||touches.length>0){
      gamestate=play;
      start1.play();
      touches=[];
    }
  }
  
  if(gamestate===play){
  dino.velocityY=dino.velocityY+0.8;
  
  dino.visible=true;
  base.visible=true;
  ground.visible=true;
  strt.visible=false;
  
  if(score>0&&score%100===0){
    checkpoint.play();
  }
    
  fill("black")
  text("SCORE: "+score,width-80,50);

  score=score+Math.round(getFrameRate()/60);
  
  if(keyDown("space")&& dino.y>=height-80 ||touches.length>0 && dino.y>=height-80){
    dino.velocityY=-15;
    jump.play();
    touches=[];
  }
  spawnObstacles();
    if(dino.isTouching(obsgroup)){
      die.play();
      gamestate=end;
    }
  }
  
  if(gamestate===end){
    dino.changeAnimation("end",out);
    obsgroup.setVelocityXEach(0);
    dino.velocityY=0;
    obsgroup.setLifetimeEach(-1);
    fill("black")
    text("SCORE: "+score,width-80,50);
    ops.visible=true;
    text("Press anyware to restart",width/2,height/2);
    if(touches.length>0||keyDown("space")){
      gamestate=play;
      obsgroup.destroyEach();
      score=0;
      ops.visible=false
      start1.play();
      dino.changeAnimation("running",dino_running);
      touches=[];
    }
  }

}

function spawnObstacles(){
  if(frameCount%100===0){
  var obs=createSprite(width+10,height-80,20,20);
    obs.velocityX=-(6+score/80);
    
    var choose=Math.round(random(1,4));
    if(choose===1){
      obs.addImage(obs1);
      obs.scale=0.5;
    }else if(choose===2){
      obs.addImage(obs2);
      obs.scale=0.18;
      obs.y=height-76
    } else if(choose===3){
      obs.addImage(obs3);
      obs.scale=0.2;
      obs.y=height-76
    } else if(choose===4){
      obs.addImage(obs4);
      obs.scale=0.2;
      obs.y=height-60
    }
    obsgroup.add(obs);
    obsgroup.setLifetimeEach(200);
  }
  
}

