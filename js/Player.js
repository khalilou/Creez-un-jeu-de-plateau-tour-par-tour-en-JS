class Player  {
constructor(playerName) {
    //player properties
    this.x=0;
    this.y=0;
    this.name=playerName;
    this.score = 100;
    this.weapon = new Weapon("swords", 20);
    this.damagePower=10;
    this.fightingOption = "attack";
    this.turn=false;
    $('#' + this.name +'-score').html(this.damages);
}

  fight(nextPlayer) {
    //set player fighting option to "attack"
    this.fightingOption="attack";

    //get the damage power of the player
    let damagePower = this.weapon.damages;

    //check next player fighting option
    if(nextPlayer.fightingOption==="defend")
      damagePower = (this.weapon.damages/2);//if the next player is defending, the damage is divided by 2

    if(nextPlayer.score - damagePower > 0)
      nextPlayer.score = nextPlayer.score - damagePower;
    else//if the next player has no score left, he lose
    {
      nextPlayer.score=0
      if(nextPlayer.name == "playerTwo")
      $('#winner').html('Player 1');
      else
      $('#winner').html('Player 2');  
      //display celebration panel
      $('#CelebrationModal').modal('show');	
      $( "#new-game" ).click(function() {
        //make new instance of the Game object
        //Object player 1
        let playerOne = new Player("playerOne");
        //disableFight(playerOne);
        //Object player 2
        let playerTwo = new Player("playerTwo");
        //disableFight(playerTwo);
        playerOne.turn =true;
        let weapons = [
            new Weapon('dague', 50),
            new Weapon('sword', 30),
            new Weapon('laser', 40),
            new Weapon('double_sword', 20)
        ];
        let startGame = new MapClass(10,10,playerOne,playerTwo, weapons);
    
        startGame.generateMap();
        startGame.checkPlayermoves(playerOne, playerTwo);
        //console.log(playerOne.turn);
    
       // player 1 fighting panel
      //button attack for player 1
      $( "#playerOne-attack" ).click(function() {
        startGame.playerOne.fight(startGame.playerTwo);
      });
    
      //button defend for player 1
      $( "#playerOne-defend" ).click(function() {
        startGame.playerOne.fightingOption="defend";
        startGame.playerOne.disableFight();
        startGame.playerTwo.enableFight();
      });
    
      // player2 fighting panel
      //button attack for player 2
      $( "#playerTwo-attack" ).click(function() {
        startGame.playerTwo.fight(startGame.playerOne);
      });
    
      //button defend for player 2
      $( "#playerTwo-defend" ).click(function() {
        startGame.playerTwo.fightingOption="defend";
        startGame.playerTwo.disableFight();
        startGame.playerOne.enableFight();
      });
      
      });    
    }


    //if not a winner yet, display the scores
    $('#' + nextPlayer.name +'-score').html(nextPlayer.score);
    $('#' + nextPlayer.name +'-visualScore').css("width", nextPlayer.score + "%").attr("aria-valuenow", nextPlayer.score);

    //set next player fighting option to default ("attack")
    nextPlayer.fightingOption="attack";

    //switch players turn
    this.disableFight();
    if(nextPlayer.score > 0) {
    nextPlayer.enableFight();
    }
}

//enable fighting buttons
enableFight() {
  $("#"+this.name+"-attack").attr("disabled", false);	
  $("#"+this.name+"-defend").attr("disabled", false);
  $("#"+this.name+"-attack").removeClass("disabled");	
  $("#"+this.name+"-defend").removeClass("disabled");	
}

//disable fighting buttons
disableFight() {
  $("#"+this.name+"-attack").attr("disabled", true);	
  $("#"+this.name+"-defend").attr("disabled", true);	
  $("#"+this.name+"-attack").addClass("disabled");	
  $("#"+this.name+"-defend").addClass("disabled");	
}






  
  //combat begins when players touch horizontally and vertically
/*checkCombatBegin(nextPlayer) {
    
    if((this.x === nextPlayer.x)&&(this.y+1 === nextPlayer.y))
      return true;
  
    if((this.x === nextPlayer.x)&&(this.y-1 === nextPlayer.y))
      return true;
  
    if((this.x+1 === nextPlayer.x)&&(this.y === nextPlayer.y))
      return true;
  
    if((this.x-1 === nextPlayer.x)&&(this.y === nextPlayer.y))
      return true;
  
    return false;
  
  }*/
    }