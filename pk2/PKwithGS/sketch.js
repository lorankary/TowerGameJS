var towerGame;   // the game object and the only global variable exposed

function setup() {
  towerGame = new Game();
}

function draw() {
    towerGame.run();
}