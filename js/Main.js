$(document).ready(() => {
  //button new game
  $( "#new-game" ).click(() => {
    //initialize
  $( "#playerOne-defend" ).off();
  $( "#playerTwo-defend" ).off();
  $( "#playerOne-attack" ).off();
  $( "#playerTwo-attack" ).off();
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
  $( "#playerOne-attack" ).click(() => {
    playerOne.fight(playerTwo);
  });

  //button defend for player 1
  $( "#playerOne-defend" ).click(() => {
    playerOne.fightingOption="defend";
    playerOne.disableFight();
    playerTwo.enableFight();
  });

  // player2 fighting panel
  //button attack for player 2
  $( "#playerTwo-attack" ).click(() => {
    playerTwo.fight(playerOne);
  });

  //button defend for player 2
  $( "#playerTwo-defend" ).click(() => {
    playerTwo.fightingOption="defend";
    playerTwo.disableFight();
    playerOne.enableFight();
  });
  
  });
});
