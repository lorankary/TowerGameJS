'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var towerGame;   // the global game object
const FRAME_RATE=30;

function setup() {
  towerGame = new Game();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
    towerGame.run();
    window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

// Game is the top level object and it contains the levels
class Game {
  //  This is a test
  constructor() { // from setup()
    this.isRunning = true;
    this.placingTower = false;
    this.currentTower = 0;
    this.towerType = 0;
    this.gameTime = 0;
    this.towers = [];
    this.enemies = [];
    this.bullets = [];
    this.bankValue = 500;
    this.cnv = createCanvas(900, 750);
    this.cnv.parent('canDiv');
    this.lastTime = millis();
    //select everything of type/class and set call backs
    this.tileDivs = this.createTileDivs();
    this.loadDOMCallBacks(this.tileDivs);
    // select canvas for callbacks
    this.cnv.mouseMoved(this.handleCNVMouseMoved);
    this.cnv.mouseOver(this.handleCNVMouseOver);
    this.cnv.mouseClicked(this.handleCNVMouseClicked);

  }

  // The success callback when a tower canvas image
  // or bullet image has loaded.  Hide them from
  // displaying on the page.
  hideImgElement() { this.hide(); }

  run() { // called from draw()
    clear();
    // println('bullets.length = ' + this.bullets.length);
    let gt = this.updateGameTime();
    this.updateInfoElements(gt);
    this.removeBullets();
    if (this.isRunning) {
      this.render();
    }
    for (let i = 0; i < this.towers.length; i++) {
      this.towers[i].run();
    }
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].run();
    }
    for (let i = 0; i < this.bullets.length; i++) {

      this.bullets[i].run();
    }
  }

  render() { // draw game stuff

  }

  removeBullets(){
    if(this.bullets.length < 1) return;
    for(let i = this.bullets.length-1; i >= 0; i--){

       if( this.bullets[i].loc.x < 0 ||
           this.bullets[i].loc.x > width ||
           this.bullets[i].loc.y < 0 ||
           this.bullets[i].loc.y > height ){
             this.bullets.splice(i, 1);
           }

    }
  }
  updateInfoElements(time){
    let infoElements = selectAll('.infoTileDiv');
    for(let i = 0; i < infoElements.length; i++){
      // change the html content after condition--use indexOf
      if(infoElements[i].html().indexOf('Bank') != -1){
        infoElements[i].html('Bank <br/>' + this.bankValue);
      }else if(infoElements[i].html().indexOf('Time') != -1){
        infoElements[i].html('Time <br/>' + time);
      }
    }
  }

  updateGameTime(){
    if(millis() - this.lastTime >= 1000) {
      this.gameTime++;
      this.lastTime = millis();
    }
    return this.gameTime;
  }

  // Create the divs to hold the menu of towers with
  // the large images.  This divs also contain the
  // parameters for creating towers to be drawn on the
  // canvas.
  createTileDivs(){
    var tiles = [];

    for(var i = 0; i < 5; i++){
      var mtd = createDiv("");
      var cnvTurImgPath = "tow" + (i+1) + "s.png";  // small tower image for canvas
      var cnvBulImgPath = "b" + (i+1) + ".png";     // bullet image for canvas
      mtd.cnvTurImg = createImg(cnvTurImgPath, cnvTurImgPath + "failed to load", this.hideImgElement);
      mtd.cnvBulImg = createImg(cnvBulImgPath, cnvBulImgPath + "failed to load", this.hideImgElement);
      mtd.parent("#menuDiv");
      mtd.cost = 100*i +50;
      mtd.id('towImgDiv' + i);
      tiles.push(mtd);
      var imgName = 'tow' + i + '.png'; // large image for menu tile
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
    if(towerGame.placingTower)
      return true;
    return(false);
  }

  createTower(mtd) { // menu turret div
    // create a new tower object and add to array list
    // the menu tower div contains the parameters for the tower
    var tower = new Tower( mtd.cost, mtd.cnvTurImg, mtd.cnvBulImg);
    if(tower)
      this.towers.push(tower); // add tower to the end of the array of towers
    else {
      println('failed to make tower');
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ load callbacks
  loadDOMCallBacks(menuTiles) {
    //  load tile menu callbacks
    for (var i = 0; i < menuTiles.length; i++) {
      menuTiles[i].mouseOver(this.tileRollOver);
      menuTiles[i].mouseOut(this.tileRollOut);
      menuTiles[i].mousePressed(this.tilePressed);
      menuTiles[i].mouseClicked(this.tileClicked);
    }

  }

  //+++++++++++++++++++++++++   tile menu callbacks
  tileRollOver() {
    this.style('background-color', '#f7e22a');
  }

  tileRollOut() {
    this.style('background-color', '#DDD');
  }

  tilePressed() {
    this.style('background-color', '#900');
  }

  tileClicked() {
    //if user clicks tile and not placing tile change placing to true
    // can add Tower checks cost and other conditions
    if(towerGame.placingTower === true) return;
    if (towerGame.getBankValue() > 100) {
      towerGame.placingTower = true;
      towerGame.createTower(this);
    }

  }
//  ++++++++++++++++++++++++++++++++++++++++++++++++++    mouse handlers
  handleCNVMouseOver() {
    if(towerGame.towers.length < 1) return;
    towerGame.towers[towerGame.towers.length-1].visible = true;
  }

  handleCNVMouseMoved() {
    if(towerGame.towers.length < 1) return;
    if(!towerGame.towers[towerGame.towers.length-1].placed &&
      towerGame.placingTower === true ){
        //follow mouse
        towerGame.towers[towerGame.towers.length-1].loc.x = mouseX;
        towerGame.towers[towerGame.towers.length-1].loc.y = mouseY;
      }
  }

  handleCNVMouseClicked() {
    if(towerGame.canAddTower()){
      towerGame.placeTower();
    }
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Other
} // end Game class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
