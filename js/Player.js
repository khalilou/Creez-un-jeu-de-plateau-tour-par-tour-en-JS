class Player  {
constructor(playerName) {
    //player properties
    this.x=0;
    this.y=0;
    this.name=playerName;
    this.score = 100;
    this.weapon = "";
    this.damagePower=10;
    this.fightingOption = "attack";
    this.turn=false;
    $('#' + this.name +'-score').html(this.score);
}

  fight(nextPlayer) {
    //set player fighting option to "attack"
    this.fightingOption="attack";

    //get the damage power of the player
    let damagePower = this.weapon.damages;

    //check next player fighting option
    if(nextPlayer.fightingOption==="defend")
      damagePower = (this.weapon.damages/2);//if the next player is defending, the damage is divided by 2

    if(nextPlayer.score - damagePower > 0)
      nextPlayer.score = nextPlayer.score - damagePower;
    else//if the next player has no score left, he lose
    {
      //dislay score
      nextPlayer.score = 0;
      $('#' + nextPlayer.name +'-score').html(nextPlayer.score);
      alert("Le combat est fini");
      // $("#"+this.name+"-attack").attr("disabled", true);	
      // $("#"+this.name+"-defend").attr("disabled", true);	
      // $("#"+this.name+"-attack").addClass("disabled !important");	
      // $("#"+this.name+"-defend").addClass("disabled !important");	      
    }


    //if not a winner yet, display the scores
    $('#' + nextPlayer.name +'-score').html(nextPlayer.score);
    $('#' + nextPlayer.name +'-visualScore').css("width", nextPlayer.score + "%").attr("aria-valuenow", nextPlayer.score);

    //set next player fighting option to default ("attack")
    nextPlayer.fightingOption="attack";

    //switch players turn
    this.disableFight();
    nextPlayer.enableFight();
}

//enable fighting buttons
enableFight() {
  $("#"+this.name+"-attack").attr("disabled", false);	
  $("#"+this.name+"-defend").attr("disabled", false);
  $("#"+this.name+"-attack").removeClass("disabled");	
  $("#"+this.name+"-defend").removeClass("disabled");	
}

//disable fighting buttons
disableFight() {
  $("#"+this.name+"-attack").attr("disabled", true);	
  $("#"+this.name+"-defend").attr("disabled", true);	
  $("#"+this.name+"-attack").addClass("disabled");	
  $("#"+this.name+"-defend").addClass("disabled");	
}






  
  //combat begins when players touch horizontally and vertically
/*checkCombatBegin(nextPlayer) {
    
    if((this.x === nextPlayer.x)&&(this.y+1 === nextPlayer.y))
      return true;
  
    if((this.x === nextPlayer.x)&&(this.y-1 === nextPlayer.y))
      return true;
  
    if((this.x+1 === nextPlayer.x)&&(this.y === nextPlayer.y))
      return true;
  
    if((this.x-1 === nextPlayer.x)&&(this.y === nextPlayer.y))
      return true;
  
    return false;
  
  }*/
    }