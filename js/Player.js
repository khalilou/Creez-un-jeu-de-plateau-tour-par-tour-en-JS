let Player = function(playerName, size) {

    //player properties
    this.x=0;
    this.y=0;
    this.name=playerName;
    this.score = 100;
    this.weapon = "";
    this.damagePower=10;
    this.fightingOption = "attack";
    this.turn=false;
    };