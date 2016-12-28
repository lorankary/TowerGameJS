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
     //println("mouseY -->  " + mouseY);
  }

  render() { // draw game stuff

  }

createTileDivs(){
  var tiles = [];
  for(var i = 0; i < 5; i++){
    var mtd = createDiv("");
    mtd.parent("#menuDiv");
    mtd.id('towImgDiv' + i);
    tiles.push(mtd);
    var imgName = 'tow' + i + '.png';
    var tImg = createImg(imgName);
    tImg.parent(tiles[i]);
  }
  return tiles;
}

  getBankValue(){
    return this.bankValue;
  }
  //  Logic to add tower +++++++++++++++++++++++
  canAddTower() {
    // add conditions before allowing user to place turret
    return true;
  }

  createTower(tn) {
    //create a new tower object and add to array list
    switch(tn) {
      case 1:
        var tower = new TowerOne(createVector(width / 2, height / 2), 100, "b1");
        this.towers.push(tower); // add tower to the end of the array of towers
        break;
      case 2:
        var tower = new TowerTwo(createVector(width / 2, height / 2), 100, "b2");
        this.towers.push(tower); // add tower to the end of the array of towers
        break;
      case 3:
          var tower = new TowerThree(createVector(width / 2, height / 2), 100, "b3");
          this.towers.push(tower); // add tower to the end of the array of towers
          break;
      case 4:
          var tower = new TowerFour(createVector(width / 2, height / 2), 100, "b4");
          this.towers.push(tower); // add tower to the end of the array of towers
          break;
      case 5:
          var tower = new TowerFive(createVector(width / 2, height / 2), 100, "b5");
          this.towers.push(tower); // add tower to the end of the array of towers
          break;
      default:
        println('failed to make turret');
    }

  }

  placeTower() {
    //  place tower into play area at location of mouse
    towerGame.towers[towerGame.towers.length-1].loc = createVector(mouseX, mouseY);
    //  tower needs to know if it is placed
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
   var towNum = 0;
   if(mouseY < 122){
     towNum = 1;
   }else if(mouseY < 270){
     towNum = 2;
   }else if(mouseY < 417){
     towNum = 3;
   }else if(mouseY < 560){
     towNum = 4;
   }else if(mouseY < 710){
     towNum = 5;
   }
  //if user clicks tile and not placing tile change placing to true
  // can add Tower checks cost and other conditions
  if(towerGame.placingTower === true) return;
  if (towerGame.getBankValue() > 100) {
    towerGame.placingTower = true;
    towerGame.createTower(towNum);
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
