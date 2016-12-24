'use strict'

// Game is the top level object and it contains the levels
class Game {

  constructor() { // from setup()
    this.isRunning = true;
    this.placingTower = false;
    this.currentTower = 0;
    this.towerType = 0;
    this.towers = [];
    this.enemies = [];
    this.bullets = [];
    this.bankValue = 250;
    this.cnv = createCanvas(900, 750);
    this.cnv.parent('canDiv');
    this.tileDivs = this.createTileDivs();
    //console.log('this.tileDivs = ' + this.tileDivs[1] );
    //select everything of type/class and set call backs
    loadDOMCallBacks(this.tileDivs);  //**********************************
    // select canvas for callbacks
    this.cnv.mouseMoved(handleCNVMouseMoved);
    this.cnv.mouseOver(handleCNVMouseOver);
    //this.cnv.mouseOut(handleCNVMouseOut);
    this.cnv.mouseClicked(handleCNVMouseClicked);
  }

  run() { // called from draw()
    clear();
    if (this.isRunning) {
      this.render();
    }
    for (var i = 0; i < this.towers.length; i++) {
      this.towers[i].run();
    }
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].run();
    }
  }

  render() { // draw game stuff

  }
//????????????????????????????????????????????????????????????????
  createTileDivs(){
    var tiles = [];
    var md = select('#menuDiv');
    for(var i =0; i < 5; i++){
      var d = createDiv(md,"");
      d.parent('menuDiv');
      d.addClass('menuTileDiv'); // id instead of class
      d.id = i;
      tiles.push(d);
    }

    return tiles;
  }
  getBankValue(){
    return this.bankValue;
  }
  //  Logic to add tower +++++++++++++++++++++++
  canAddTower() {
    // add conditions before allowing user to place turret
    if (mouseX < 900)
    return true;
    return false;
  }

  createTower() {
    //create a new tower object and add to array list
    var tower = new Tower(createVector(width / 2, height / 2), 100, "b1");
    this.towers.push(tower); // add tower to the end of the array of towers
  }

  placeTower() {
    // place tower into play area at location of mouse
    towerGame.towers[towerGame.towers.length-1].loc = createVector(mouseX, mouseY);
    //  tower needs to know if it is places
    towerGame.towers[towerGame.towers.length-1].placed = true;
    //  only one tower placed at a time
    towerGame.placingTower = false;
  }

} //  end class
//++++++++++++++++++++++++++++++++++++++++++++++  load callbacks
function loadDOMCallBacks(menuTiles) {//**************************************
  //  load tile menu callbacks
   for (var i = 0; i < menuTiles.length; i++) {
     menuTiles[i].mouseOver(tileRollOver);
     menuTiles[i].mouseOut(tileRollOut);
     menuTiles[i].mousePressed(tilePressed);
     menuTiles[i].mouseClicked(tileClicked);

   }

}


//  tile menu callbacks +++++++++++++++++++++++++
function tileRollOver() {
  this.style('background-color', '#f7e22a');

}

function tilePressed() {
  this.style('background-color', '#900');
}

function tileRollOut() {
  this.style('background-color', '#DDD');
}

function tileClicked() {
  //if user clicks tile and not placing tile change placing to true
  // can add Tower checks cost and other conditions
  if(towerGame.placingTower === true) return;
  if (towerGame.getBankValue() > 100) {
    towerGame.placingTower = true;
    towerGame.createTower();
  }

}
//  +++++++++++++++++++++++++ mouse handlers
function handleCNVMouseOver() {
  if(towerGame.towers.length < 1) return;
  towerGame.towers[towerGame.towers.length-1].visible = true;
}


function handleCNVMouseMoved() {
  if(towerGame.towers.length < 1) return;
  if(!towerGame.towers[towerGame.towers.length-1].placed &&
      towerGame.placingTower === true ){
    //follow mouse
    towerGame.towers[towerGame.towers.length-1].loc.x = mouseX;
    towerGame.towers[towerGame.towers.length-1].loc.y = mouseY;
  }
}
function handleCNVMouseClicked() {
   if(towerGame.canAddTower()){
     towerGame.placeTower();
   }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Other
