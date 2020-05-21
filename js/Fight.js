function fight(player, nextPlayer) {
    //set player fighting option to "attack"
    player.fightingOption="attack";

    //get the damage power of the player
    let damagePower = player.damagePower;

    //check next player fighting option
    if(nextPlayer.fightingOption==="defend")
      damagePower = (player.damagePower/2);//if the next player is defending, the damage is divided by 2

    if(nextPlayer.score - damagePower > 0)
      nextPlayer.score = nextPlayer.score - damagePower;
    else//if the next player has no score left, he lose
    {
      //dislay score
      nextPlayer.score = 0;
      $('#' + nextPlayer.name +'-score').html(nextPlayer.score);
      alert("Le combat est fini");
    }

    //if not a winner yet, display the scores
    $('#' + nextPlayer.name +'-score').html(nextPlayer.score);
    $('#' + nextPlayer.name +'-visualScore').css("width", nextPlayer.score + "%").attr("aria-valuenow", nextPlayer.score);

    //set next player fighting option to default ("attack")
    nextPlayer.fightingOption="attack";

    //switch players turn
    disableFight(player);
    enableFight(nextPlayer);
}