//generate ramdon position
function genRandomNumber(range){
  if (range > 1)
      return Math.floor(Math.random() * Number(range))
  return 0;
}

let RandomPosition = function(range) {
  this.x=genRandomNumber(range);
  this.y=genRandomNumber(range);
}

let GameMap = function() {

    //default size of the game map is 10
    this.size= 10;
  
  
    this.obstaclesNumber= 15;
    this.weaponsNumber= 4;
  
    //access to the dom to display the game map
    var domGameMap = $('#gameMap');
    //clear game map
    domGameMap.html("");
  
  
    //fill the game map and set box type to default(available)
    for (var y = 0; y < this.size; y++) {
      var row = $('<div>').addClass('boxesRow');
      for (var x = 0; x < this.size; x++) {
        var box = $('<div>').addClass('box available');
        box.attr('id', "box-" +  x + y);
        row.append(box);
      }
      domGameMap.append(row);
    }
}