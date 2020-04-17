$(document).ready(function() {
  //button new game **********************************
  $( "#new-game" ).click(function() {
    //make new instance of the Game object
    let startGame = new MapClass(10,10,this.playerOne,this.playerTwo);
    startGame.generateMap();
  });
});