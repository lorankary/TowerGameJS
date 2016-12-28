var towerGame;   // the game object and the only global variable exposed

function setup() {
  //Test Changes
  imageMode(CENTER);
  towerGame = new Game();
}

function draw() {
    towerGame.run();
}
