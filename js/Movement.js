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
    let boxes = $(".active").toArray();
    boxes.forEach(box => {
      $(box).off("click");
      $(box).removeClass("active")
    });
  }

//look for player possible moves
  function CheckPlayermoves (player,nextPlayer) {
        for (var i = -3; i < 4; i++) {
            for (var j = -3; j < 4; j++) {
              let xPos = player.x+ i;
              let yPos;
              if(xPos == player.x){
                yPos = player.y + j;
              }
              else{
                yPos = player.y;
              }
              let box = $('#box-'+xPos+yPos);
              if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)) {
              box.addClass('active');
              let x = xPos;
              let y = yPos;
              box.click(function(){
                console.log(box);             
                changePosition(player,x,y, nextPlayer)
                  });
              }
              else {
                if(yPos != player.y && j < 0) {
                  for(let xp = xPos; xp<-3;xp--){
                    console.log(box); 
                    $("box-" +xp+yPos).removeClass("active")
                  }
                }
                else if(yPos != player.y && j>0 ){
                  j = 4 ;
                }
                else if(xPos != player.x && i < 0 ){
                  for(let yp = yPos; yp<-3;yp--){
                    console.log(box); 
                    $("box-" +yp+xPos).removeClass("active")

                  }
                  j = -3;
                }
                else if(xPos != player.x && i > 0) {
                  i = 4;
                }
              }

            }
        }
    }


