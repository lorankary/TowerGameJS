var towerGame;   // the game object and the only global variable exposed

function setup() {
  //Test Changes
  towerGame = new Game();
}

function draw() {
    towerGame.run();
}
