function changePosition (player, x,  y, nextPlayer){
  //remove player from old box
  let box = $('#box-'+player.x+player.y);
  box.removeClass(player.name);
  //remove position active player
  removePlayerPos(player);
  //set player position to the new one
  player.x = x;
  player.y = y;
  //add player to the new position
  box = $('#box-'+player.x+player.y);
  box.addClass(player.name);

  //active the next player possible moves
  CheckPlayermoves(nextPlayer,player);
}

//remove active status when player move
function removePlayerPos(player) {
    for (var i = 0; i < 4; i++) {
      let box = $('#box-'+(player.x+i)+player.y);
      if(!box.hasClass('unavailable')) {
        console.log("test " + (!box.hasClass('unavailable')))
        box.removeClass('active');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+(player.x-i)+player.y);
      if(!box.hasClass('unavailable')){
        box.removeClass('active');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+player.x+(player.y+i));
      if(!box.hasClass('unavailable')){
        box.removeClass('active');
        box.off("click");
      }
      else
        break;
    }

    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+player.x+(player.y-i));
      if(!box.hasClass('unavailable')){
        box.removeClass('active');
        box.off("click");
      }
      else
        break;
    }
  }
  
//look for player possible moves
function CheckPlayermoves (player,nextPlayer) {

    for (var i = 0; i < 4; i++) {
      let box = $('#box-'+(player.x+i)+player.y);
      if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)) {
        box.addClass('active');
        console.log("red");
        let x= player.x+i;
        let y= player.y;
        box.click(function(){
            changePosition(player,x,y, nextPlayer)
            });
      }
      else
        break;
    }
  
    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+(player.x-i)+player.y);
      if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
        box.addClass('active');
        console.log("red-1");
        let x= player.x-i;
        let y= player.y;
        box.click(function(){
          changePosition(player,x,y, nextPlayer)
            });
      }
      else
        break;
    }
  
    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+player.x+(player.y+i));
      if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
        box.addClass('active');
        console.log("red-2");
        let x= player.x;
        let y= player.y+i;
        box.click(function(){
          changePosition(player,x,y, nextPlayer)
            });
      }
      else
        break;
    }
  
    for (var i = 0; i < 4; i++) {
      var box = $('#box-'+player.x+(player.y-i));
      if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
        box.addClass('active');
        console.log("red-3");
        let x= player.x;
        let y= player.y-i;
        box.click(function(){
          changePosition(player,x,y, nextPlayer)
            });
      }
      else
        break;
    }
  }