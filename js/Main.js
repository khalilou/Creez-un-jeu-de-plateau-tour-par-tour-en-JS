$(document).ready(function() {
  //button new game **********************************
  $( "#new-game" ).click(function() {
    //make new instance of the Game object
        //Object player 1
        this.playerOne = new Player("playerOne");
        //Object player 2
        this.playerTwo = new Player("playerTwo");
    let startGame = new MapClass(10,10,this.playerOne,this.playerTwo);


    startGame.generateMap();
  });
});