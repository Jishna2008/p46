var form,game,player,allPlayer;
var database,gameState=0,playerCount=0;

var runner1,runner2,runner_Img;
var obstacles,obstacleImg1,obstacleImg2;
var reward,foodImg,jewelImg,treasureImg;
var bg1,bg2,bg3,bg,invisibleground;
var rewardGroup,obstacleGroup;
var score=0;
function preload(){
    runner_Img=loadAnimation(" img1.png"," img2.png"," img3.png",
                 " img4.png"," img5.png"," img6.png");
    obstacleImg1=loadImage(" ufo.png");
    obstacleImg2=loadImage(" alien.png");
   foodImg=loadImage(" fruit.png");
    jewelImg=loadImage(" ruby.png");
    treasureImg=loadImage(" jewel.png");
    bg1=loadImage(" moon run.PNG");
    bg2=loadImage(" bg2.PNG");
    bg3=loadImage(" bg3.PNG");
    bg=loadImage(" Good.png")
}

function setup(){
    
var canvas= createCanvas(1000,600);
database=firebase.database();
game=new Game();
game.getState();
game.start();

}

function draw(){
 
     background("white");

    if(playerCount===1){
        game.updateState(1);
    }
    if(gameState===1){
        game.play();  
        game.Obstacles();
        game.Rewards();   
    }

drawSprites();
push();
fill("white");
textSize(32);
textFont("French Script MT")
text("Score :"+score,camera.x+400,50)
pop();

push();
fill("blue");
textSize(20);
textFont("Lucida Calligraphy")
text("NOTE : Use up arrow to increase the runner size and earn rewards.",10,400)
text("Use down arrow to decrease the runner size and escape from the aliens.",10,450)
pop();
}
