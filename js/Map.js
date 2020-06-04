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
      for (var y = 0; y < this.size; y++) {
          var row = $('<div>').addClass('boxesRow');
          for (var x = 0; x < this.size; x++) {
              var box = $('<div>').addClass('box available');
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
    for (var x = 0; x < this.obstaclesNumber; x++) {
      var randomPosition = new RandomPosition(this.size);
      //console.log("randomPosition", randomPosition.x, randomPosition.y);
      // check that the case is not yet an obstacle
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable')){
          console.error("Un obstacle existe ici");
          x--;
      }else{
          //console.log('ajout de l\'obstacle n°' + x);
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box unavailable');
      }

    }
  }

  addWeapon(){
      //add weapons
    //this.weapons = ['weapon dague', 'weapon sword', 'weapon laser', 'weapon double_sword'];

    for (var x = 0; x < this.weaponsNumber; x++) {
      var randomPosition = new RandomPosition(this.size);
      //clear box class as available
      if($('#box-'+randomPosition.x+randomPosition.y).hasClass('unavailable') || $('#box-'+randomPosition.x+randomPosition.y).hasClass('weapon')){
         // console.error("il y a ici un obstacle ou une arme");
          x--;
      }else{
          //console.log('ajout de l\'arme n°' + x);
          $('#box-'+randomPosition.x+randomPosition.y).removeClass();
          //place a weapon
          $('#box-'+randomPosition.x+randomPosition.y).addClass('box weapon '+ this.weapons[x].name);
      }

    }
  }

  addPlayer(playerOne, playerTwo) {
  //find an available random box
  var randomPosition = new RandomPosition(this.size);
  while(!$('#box-'+randomPosition.x+randomPosition.y).hasClass('available') || !$('#box-'+randomPosition.y+randomPosition.x).hasClass('available') ){
    randomPosition = new RandomPosition(this.size);
    //console.log(randomPosition);
    }

      //place player 1
    playerOne.x = randomPosition.x;
    playerOne.y = randomPosition.y;
    //place player 2
    playerTwo.x = randomPosition.x;
    playerTwo.y = randomPosition.y;

  //find an available random box, where the player do not touch
  var randomPosition = new RandomPosition(this.size);

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
        for (var i = 0; i < 4; i++) {
            let box = $('#box-'+(player.x+i)+player.y);
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)) {
                box.addClass('active');
                let x= player.x+i;
                let y= player.y;
                box.click(() =>{
                    //console.log("this",this);
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (var i = 0; i < 4; i++) {
            var box = $('#box-'+(player.x-i)+player.y);
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                //console.log("red-1");
                let x= player.x-i;
                let y= player.y;
                box.click(() =>{
                    //console.log("this",this);
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (var i = 0; i < 4; i++) {
            var box = $('#box-'+player.x+(player.y+i));
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                let x= player.x;
                let y= player.y+i;
                box.click(() =>{
                    //console.log("this",this);
                    this.changePosition(player,x,y, nextPlayer)
                });
            }
            else
                break;
        }

        for (var i = 0; i < 4; i++) {
            var box = $('#box-'+player.x+(player.y-i));
            if(!box.hasClass('unavailable') && !box.hasClass(nextPlayer.name)){
                box.addClass('active');
                let x= player.x;
                let y= player.y-i;
                box.click(() => {
                    //console.log("this",this);
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
        //console.log("get weapon", this);
    }

    getWeapon(player,x,y){
      let box = $('#box-'+x+y);
      if(box.hasClass('weapon')){
          let lastWeapon = player.weapon;
          //let weapons = [...this.weapons];
          let weaponName = box.attr('class').split(' ')[2];
          console.log("WeaponName ", weaponName);
          let weapon = this.weapons.find(element => element.name === weaponName);
          console.log(weapon);
          //let weaponIndex = this.weapons.indexOf(element => element.name === weaponName);
          let weaponIndex = this.weapons.indexOf(weapon);
          this.weapons.splice(weaponIndex, 1);
          console.log("Weapons tab",this.weapons);
          console.log("Weapon index",weaponIndex);
          this.weapons.push(lastWeapon);
          console.log(lastWeapon);
              player.weapon = weapon;
              console.log("Player", player)
              $('#' + player.name +'-damagePower').html(weapon.damages);
              console.log("Weapon damages", weapon.damages)
              $('#' + player.name +'-weapon').removeClass();
              $('#' + player.name +'-weapon').addClass(weapon.name);
              console.log("Weapon name", weapon.name)
              box.removeClass(weapon.name);
              box.addClass(lastWeapon.name);
              //this.weapons = [...weapons];
      }
  }
}

