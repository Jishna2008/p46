class Form{
    constructor(){
        this.title=createElement('h2');
        this.title.html("Multiplayer Moon Runner");
        this.title.position(200,100);

        this.input=createInput("Name");
        this.input.position(200,200);

        this.button=createButton("Play");
        this.button.position(300,300);
  
        this.reset=createButton("Reset");
        this.reset.position(500,50);
    }

    disappear(){
        this.title.hide();
        this.greetings.hide();
    }
    display(){
        this.button.mousePressed(()=>{

            this.input.hide();
            this.button.hide();  

            playerCount+=1;
            player.index=playerCount
            player.updateCount(playerCount);

            player.name=this.input.value();
            player.updateName();
        
            console.log(player.name)
          
            this.greetings=createElement('h1');
            this.greetings.html("welcome");
           this.greetings.position(300,300);
        
        
        }    )
        this.reset.mousePressed(()=>{
            game.updateState(0);
            player.updateCount(0);
        })
        // text(player.name,200,300);
         
     
    }
 
}