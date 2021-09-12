 class Game
 {
     constructor(){}

   getState()
   {
      var  gameStateRef =database.ref('gameState');
      gameStateRef.on("value",function(data){gameState=data.val()});

    }

   updateState(state)
   {
    gameState=state;
    database.ref('/').update({gameState:gameState});
   }

   async start()
   {
    if(gameState===0)
    {
      player= new Player();
      var playerCountRef=await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){
        player.getCount();
      }

      form= new Form();
      form.display();
      
      obstacleGroup= createGroup();
      rewardGroup =createGroup();

      runner1=createSprite(100,250,50,50);
      runner1.addAnimation("running",runner_Img);
      runner1.scale=0.7;
      invisibleground=createSprite(100,350,80,20);
      invisibleground.visible=false;
   
    }

  }
  play()
 {

    form.disappear();
    background("red");

    textSize(40);
    text('Game Start!',120,100);

    imageMode(CENTER);
    image(bg1,600,250,1200*3,600);
    image(bg2,1200*3,250,1200*3,600);
    image(bg3,1200*6,250,1200*3,600);

    runner1.velocityX=8;
    invisibleground.x=runner1.x;

    if(keyDown(UP_ARROW)&&runner1.y>=100)
    {
       runner1.velocityY=-8; 
       runner1.scale=0.1;
    }
    else if(keyDown(DOWN_ARROW))
    {
      runner1.scale=0.7;
    }

    if(runner1.y>=100){
      runner1.velocityY=runner1.velocityY+0.8;
      runner1.bounceOff(invisibleground);
     }else if(runner1.y<=100){
        runner1.velocityY=1;
      }

      camera.y=250;
      camera.x=runner1.x+400;
    if(rewardGroup.isTouching(runner1)&& runner1.scale===0.7){  
      score+=2;
    }
      if(obstacleGroup.isTouching(runner1)&&runner1.scale===0.7){
        runner1.velocityY=0;
        runner1.velocityX=0;
       // game.updateState(2);
    obstacleGroup.setLifetimeEach(-1);
    rewardGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    rewardGroup.setVelocityXEach(0);
      }
    
 }
Obstacles(){
  if(frameCount%120===0){
  
 var randY=Math.round(random(100,300));
  // randX=Math.round(random(runner.x+200,runner.x+1000));
  obstacles=createSprite(runner1.x+1000,randY,20,20);
  obstacles.shapeColor="white";
var  rand=Math.round(random(1,2));
  switch(rand){
      case 1:obstacles.addImage(obstacleImg1);
              break;
      case 2:obstacles.addImage(obstacleImg2);
              break;
              default:break;
  }
  obstacles.scale=0.5;
  obstacles.lifetime=100;
  obstacleGroup.add(obstacles);
  
  }
  }
  Rewards(){
  if(frameCount%260===0){
    
      // rex=Math.round(random(runner.x+200,runner.x+1000));
    var  rey=Math.round(random(100,350));
      reward=createSprite(runner1.x+1000,rey,30,30);
    var  rand=Math.round(random(1,2));
      switch(rand){
          case 1:reward.addImage(foodImg);
          break;
          // case 2:reward.addImage(jewelImg);
          // break;
          case 2:reward.addImage(treasureImg);
          break;
          default:break;
      }
  reward.scale=0.3;
  reward.lifetime=100;
  rewardGroup.add(reward);
  }
  }



}