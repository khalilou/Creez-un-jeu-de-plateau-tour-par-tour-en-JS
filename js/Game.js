let Game = function(){
    //Object player 1
    this.playerOne = new Player("playerOne",10);

    //Object player 2
    this.playerTwo = new Player("playerTwo",10);

    //Object game map
    this.MapClass = new MapClass(10,10,this.playerOne, this.playerTwo);
  }