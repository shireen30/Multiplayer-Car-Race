class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
     // background(rgb(198,135,103));
     background(0); 
     image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y=0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 3500){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      player.update();
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  
    var players=[];
      
      if(player.rank==4){
        fill(0, 0, 0, 190);
       
        rect(350,camera.position.y,700,500);
          
        for(var plr in allPlayers){
                  
        
          if(allPlayers[plr].rank==1)
            players[0]=allPlayers[plr].name;
           else if(allPlayers[plr].rank==2)
            players[1]=allPlayers[plr].name;
            else if(allPlayers[plr].rank==3)
            players[2]=allPlayers[plr].name;
            else if(allPlayers[plr].rank==4)
            players[3]=allPlayers[plr].name;
            
          }
          console.log(players);
          
noLoop();

image(trophy,620,camera.position.y+10);
fill("white");
textSize(22);
textFont('Georgia');
 text("1st Position: "+players[0],450,camera.position.y+50);
 text("2nd Position: "+players[1],450,camera.position.y+80);
 text("3rd Position: "+players[2],450,camera.position.y+110);
 text("4rth Position: "+players[3],450,camera.position.y+140);
   
      }
  }
}
