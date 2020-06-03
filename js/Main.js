$(document).ready(function() {
  //button new game
  $( "#new-game" ).click(function() {
    //make new instance of the Game object
    //Object player 1
    let playerOne = new Player("playerOne");
    //Object player 2
    let playerTwo = new Player("playerTwo");
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
});
