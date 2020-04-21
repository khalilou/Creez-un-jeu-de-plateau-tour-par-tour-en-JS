//generate ramdon position
function genRandomNumber(range){
  return Math.floor(Math.random() * range)
}

let RandomPosition = function(range) {
  this.x=genRandomNumber(range);
  this.y=genRandomNumber(range);
}

class MapClass {
  constructor(size, nbObstacles,playerOne,playerTwo){
      this.size= size;
      this.obstaclesNumber= nbObstacles;
      this.weaponsNumber= 4;
      this.playerOne = playerOne;
      this.playerTwo = playerTwo;
      //access to the dom to display the game map
      this.domGameMap = $('#gameMap');
  }

  generateMap(){
      this.domGameMap.html("");

      // Generate the core map empty
      //fill the game map and set box type to default(available)
      for (var y = 0; y < this.size; y++) {
          var row = $('<div>').addClass('boxesRow');
          for (var x = 0; x < this.size; x++) {
              var box = $('<div>').addClass('box available');
              box.attr('id', "box-" +  x + y);
              row.append(box);
          }
          this.domGameMap.append(row);
      }
      this.addObstacles();
      this.addWeapon();
      this.addPlayer(this.playerOne, this.playerTwo);
  }

  addObstacles(){
       //add the obstacles
    for (var x = 0; x < this.obstaclesNumber; x++) {
      var randomPosition = new RandomPosition(this.size);
      console.log("randomPosition", randomPosition.x, randomPosition.y);
      // check that the case is not yet an obstacle
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable')){
          console.error("Un obstacle existe ici");
          x--;
      }else{
          console.log('ajout de l\'obstacle n°' + x);
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box unavailable');
      }
     
    }
  }

  addWeapon(){
      //add weapons
    this.weapons = ['weapon dague', 'weapon sword', 'weapon laser', 'weapon double_sword'];
    
    for (var x = 0; x < this.weaponsNumber; x++) {
      var randomPosition = new RandomPosition(this.size);
      //clear box class as available
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable') || $('#box-'+randomPosition.x+randomPosition.y).hasClass('weapon')){
          console.error("il y a ici un obstacle ou une arme");
          x--;
      }else{
          console.log('ajout de l\'arme n°' + x);
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          //place a weapon
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box '+ this.weapons[x]);
      } 
      
    }
  }
  
  addPlayer(playerOne, playerTwo) {
  //find an available random box
  var randomPosition = new RandomPosition(this.size);
  while(!$('#box-'+randomPosition.x+randomPosition.y).hasClass('available')){
    randomPosition = new RandomPosition(this.size);
    console.log(randomPosition);
    }

  
  //find an available random box, where the player do not touch
  var randomPosition = new RandomPosition(this.size);

    this.playerOne.x = randomPosition.x;
    this.playerTwo.y = randomPosition.y;

    //avoid that players touch in the initial position
    while(checkPlayersTouch(playerOne, playerTwo) || !$('#box-'+playerTwo.x+playerTwo.y).hasClass('available')){
      randomPosition = new RandomPosition(this.size);
      console.log("test -1")
      this.playerOne.x = randomPosition.x;
      this.playerTwo.y = randomPosition.y;
    }

    $('#box-'+this.playerOne.x+this.playerOne.y).removeClass();//remove available class
    $('#box-'+this.playerOne.x+this.playerOne.y).addClass('box '+ this.playerOne.name );//place player 1

    $('#box-'+this.playerTwo.x+this.playerTwo.y).removeClass();//remove available class
    $('#box-'+this.playerTwo.x+this.playerTwo.y).addClass('box '+ this.playerTwo.name );//place player 2
  }
}
let checkPlayersTouch = function(player, nextPlayer) {

  if( player.x === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }

  if( player.x === nextPlayer.x && player.y+1 === nextPlayer.y ){
    return true;
  }
  if( player.x === nextPlayer.x && player.y-1 === nextPlayer.y ){
    return true;
  }
  if( player.x+1 === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }
  if( player.x-1 === nextPlayer.x && player.y === nextPlayer.y ){
    return true;
  }

  return false;
}