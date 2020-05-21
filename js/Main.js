$(document).ready(function() {
  //button new game
  $( "#new-game" ).click(function() {
    //make new instance of the Game object
    //Object player 1
    this.playerOne = new Player("playerOne");
    //Object player 2
    this.playerTwo = new Player("playerTwo");
    this.playerOne.turn =true;
    let startGame = new MapClass(10,10,this.playerOne,this.playerTwo);

    startGame.generateMap();
    CheckPlayermoves(this.playerOne, this.playerTwo);
    console.log(this.playerOne.turn);
      // player 1 fighting panel *************************
  //button attack for player 1
  $( "#playerOne-attack" ).click(function() {
    fight(startGame.playerOne, startGame.playerTwo);
  });

  //button defend for player 1
  $( "#playerOne-defend" ).click(function() {
    startGame.playerOne.fightingOption="defend";
    disableFight(startGame.playerOne);
    enableFight(startGame.playerTwo);
  });

  // player2 fighting panel ***************************
  //button attack for player 2
  $( "#playerTwo-attack" ).click(function() {
    fight(startGame.playerTwo, startGame.playerOne);
  });

  //button defend for player 2
  $( "#playerTwo-defend" ).click(function() {
    startGame.playerTwo.fightingOption="defend";
    disableFight(startGame.playerTwo);
    enableFight(startGame.playerOne);
  });
  });
});