function changePosition (player, x,  y, nextPlayer){
  //remove player from old box
  let box = $('#box-'+player.x+player.y);
  box.removeClass(player.name);
  //remove position active player
  removePlayerPos(player);
  //check if the player crossed a weapon when moving
  checkWeapon(player, x,  y);
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
    let boxes = $(".active").toArray();
    boxes.forEach(box => {
      $(box).off("click");
      $(box).removeClass("active")
    });
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

//check if player crossed a weapon when moving from old position to new one
function checkWeapon(player, x, y) {
  if((player.x < x) && (player.y === y)) {
    for (var i = player.x+1; i < x+1; i++) {
      getWeapon(player,i,player.y);
    }
  }

  if((player.x === x) && (player.y < y)) {
    for (var i = player.y+1; i < y+1; i++) {
      getWeapon(player,player.x,i);
    }
  }

  if((player.x === x) && (player.y > y)) {
    for (var i = player.y-1; i > y-1; i--) {
      getWeapon(player,player.x,i);
    }
  }
  
  if((player.x > x) && (player.y === y)) {
    for (var i = player.x-1; i > x-1; i--) {
      getWeapon(player,i,player.y);
    }
  }

}

//get the weapon and it damage power
function getWeapon(player,x,y){
  let box = $('#box-'+x+y);
  if(box.hasClass('weapon')){
    if(box.hasClass('dague'))
    {
      player.weapon = "dague";
      player.damagePower = 50;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('dague');
      box.removeClass('weapon');
      box.removeClass('dague');
    }
    if(box.hasClass('laser'))
    {
      player.weapon = "laser";
      player.damagePower = 40;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('laser');
      box.removeClass('weapon');
      box.removeClass('laser');
    }
    if(box.hasClass('sword'))
    {
      player.weapon = "sword";
      player.damagePower = 30;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('sword');
      box.removeClass('weapon');
      box.removeClass('sword');
    }
    if(box.hasClass('double_sword'))
    {
      player.weapon = "double_sword";
      player.damagePower = 20;
      $('#' + player.name +'-damagePower').html(player.damagePower);
      $('#' + player.name +'-weapon').removeClass();
      $('#' + player.name +'-weapon').addClass('double_sword');
      box.removeClass('weapon');
      box.removeClass('double_sword');
    }
  }
}
