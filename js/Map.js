//generate ramdon position
function genRandomNumber(range){
  return Math.floor(Math.random() * range)
}

let RandomPosition = function(range) {
  this.x=genRandomNumber(range);
  this.y=genRandomNumber(range);
}

class MapClass {
  constructor(size, nbObstacles,playerOne,playerTwo, weapons){
      this.size= size;
      this.obstaclesNumber= nbObstacles;
      this.weaponsNumber= 4;
      this.playerOne = playerOne;
      this.playerTwo = playerTwo;
      //access to the dom to display the game map
      this.domGameMap = $('#gameMap');
      this.weapons = weapons
  }

  generateMap(){
      this.domGameMap.html("");
      // Generate the core map empty
      //fill the game map and set box type to default(available)
      for (let y = 0; y < this.size; y++) {
        let row = $('<div>').addClass('boxesRow');
          for (let x = 0; x < this.size; x++) {
            let box = $('<div>').addClass('box available');
              box.attr('id', "box-" +  x + y);
              row.append(box);
          }
          this.domGameMap.append(row);
      }
      //highlight player 1 possible moves
      this.addObstacles();
      this.addWeapon();
      this.addPlayer(this.playerOne, this.playerTwo);
  }

  addObstacles(){
       //add the obstacles
    for (let x = 0; x < this.obstaclesNumber; x++) {
      let randomPosition = new RandomPosition(this.size);
      // check that the case is not yet an obstacle
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable')){
          x--;
      }else{
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box unavailable');
      }

    }
  }

  addWeapon(){
      //add weapons
    for (let x = 0; x < this.weaponsNumber; x++) {
      let randomPosition = new RandomPosition(this.size);
      //clear box class as available
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable') || $('#box-'+randomPosition.x+randomPosition.y).hasClass('weapon')){
          x--;
      }else{
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          //place a weapon
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box weapon '+ this.weapons[x].name);
      }

    }
  }

  addPlayer(playerOne, playerTwo) {
  //find an available random box
  let randomPosition = new RandomPosition(this.size);
  while(!$('#box-'+randomPosition.x+randomPosition.y).hasClass('available') || !$('#box-'+randomPosition.y+randomPosition.x).hasClass('available') ){
    randomPosition = new RandomPosition(this.size);
    }

    //place player 1
    playerOne.x = randomPosition.x;
    playerOne.y = randomPosition.y;
    //place player 2
    playerTwo.x = randomPosition.x;
    playerTwo.y = randomPosition.y;

  //find an available random box, where the player do not touch
  randomPosition = new RandomPosition(this.size);

    this.playerOne.x = randomPosition.x;
    this.playerTwo.y = randomPosition.y;

    //avoid that players touch in the initial position
while(this.checkPlayersTouch(playerOne, playerTwo) || !$('#box-'+playerTwo.x+playerTwo.y).hasClass('available') || !$('#box-'+playerTwo.y+playerTwo.x).hasClass('available') )
{
      randomPosition = new RandomPosition(this.size);
      this.playerOne.x = randomPosition.x;
      this.playerTwo.y = randomPosition.y;
    }

    $('#box-'+this.playerOne.x+this.playerOne.y).removeClass();//remove available class
    $('#box-'+this.playerOne.x+this.playerOne.y).addClass('box '+ this.playerOne.name );//place player 1

    $('#box-'+this.playerTwo.x+this.playerTwo.y).removeClass();//remove available class
    $('#box-'+this.playerTwo.x+this.playerTwo.y).addClass('box '+ this.playerTwo.name );//place player 2
  }

  checkPlayersTouch = (player, nextPlayer) => {

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

  checkCombatBegin(player,nextPlayer) {
      if((player.x === nextPlayer.x)&&(player.y+1 === nextPlayer.y))
        return true;
    
      if((player.x === nextPlayer.x)&&(player.y-1 === nextPlayer.y))
        return true;
    
      if((player.x+1 === nextPlayer.x)&&(player.y === nextPlayer.y))
        return true;
    
      if((player.x-1 === nextPlayer.x)&&(player.y === nextPlayer.y))
        return true;
    
      return false;
    
    }

    checkPlayermoves (player,nextPlayer) {
        for (let i = 0; i < 4; i++) {
            let box = $('#box-'+(player.x+i)+player.y);
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)) {
                box.addClass('active');
                let x= player.x+i;
                let y= player.y;
                box.click(() =>{
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (let i = 0; i < 4; i++) {
          let box = $('#box-'+(player.x-i)+player.y);
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                let x= player.x-i;
                let y= player.y;
                box.click(() =>{
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (let i = 0; i < 4; i++) {
          let box = $('#box-'+player.x+(player.y+i));
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                let x= player.x;
                let y= player.y+i;
                box.click(() =>{
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (let i = 0; i < 4; i++) {
          let box = $('#box-'+player.x+(player.y-i));
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                let x= player.x;
                let y= player.y-i;
                box.click(() => {
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }
    }

    changePosition (player, x,  y, nextPlayer){
        //remove player from old box
        let box = $('#box-'+player.x+player.y);
        box.removeClass(player.name);
        //remove position active player
        this.removePlayerPos();
        //check if the player crossed a weapon when moving
        this.checkWeapon(player, x,  y);
        //set player position to the new one
        player.x = x;
        player.y = y;
        //add player to the new position
        box = $('#box-'+player.x+player.y);
        box.addClass(player.name);
        if(this.checkCombatBegin(player, nextPlayer) )
        {
          this.startFight(player, nextPlayer);
          return;
        }
        //active the next player possible moves
        this.checkPlayermoves(nextPlayer,player);
    }
    startFight = (player, nextPlayer) =>{
      player.enableFight();
      nextPlayer.disableFight();
    }

    //remove active status when player move
    removePlayerPos() {
        let boxes = $(".active").toArray();
        boxes.forEach(box => {
            $(box).off("click");
            $(box).removeClass("active")
        });
    }

    checkWeapon(player, x, y) {
        this.getWeapon(player,x,y);
    }

    getWeapon(player,x,y){
      let box = $('#box-'+x+y);
      if(box.hasClass('weapon')){
          let lastWeapon = player.weapon;
          let weaponName = box.attr('class').split(' ')[2];
          let weapon = this.weapons.find(element => element.name === weaponName);
          let weaponIndex = this.weapons.indexOf(weapon);
          this.weapons.splice(weaponIndex, 1);
          this.weapons.push(lastWeapon);
              player.weapon = weapon;
              $('#' + player.name +'-damagePower').html(weapon.damages);
              $('#' + player.name +'-weapon').removeClass();
              $('#' + player.name +'-weapon').addClass(weapon.name);
              box.removeClass(weapon.name);
              box.addClass(lastWeapon.name);
      }
  }
}

