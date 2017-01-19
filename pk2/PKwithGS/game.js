'use strict'

// Game is the top level object and it contains the levels
class Game {
  ?? This is a test
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
    //console.log('this.tileDivs = ' + this.tileDivs[1] );
    //select everything of type/class and set call backs
    this.tileDivs = this.createTileDivs();
    loadDOMCallBacks(this.tileDivs);
    // select canvas for callbacks
    this.cnv.mouseMoved(handleCNVMouseMoved);
    this.cnv.mouseOver(handleCNVMouseOver);
    this.cnv.mouseClicked(handleCNVMouseClicked);

    // issue#1  preload images with createImg()
    // the small turret images
    this.tow1sImg = createImg("tow1s.png",this.hideImgElement);
    this.tow2sImg = createImg("tow2s.png",this.hideImgElement);
    this.tow3sImg = createImg("tow3s.png",this.hideImgElement);
    this.tow4sImg = createImg("tow4s.png",this.hideImgElement);
    this.tow5sImg = createImg("tow5s.png",this.hideImgElement);
    // the bullet images
    this.b1Img = createImg("b1.png",this.hideImgElement);
    this.b2Img = createImg("b2.png",this.hideImgElement);
    this.b3Img = createImg("b3.png",this.hideImgElement);
    this.b4Img = createImg("b4.png",this.hideImgElement);
    this.b5Img = createImg("b5.png",this.hideImgElement);



  }

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
    // create a new tower object and add to array list
    // issue#1 use preloaded turret and bullet images
    // and eliminate Tower (turret) subclasses.
    var loc = createVector(width / 2, height / 2);
    var cost = 100;
    var tImg, bImg;
    switch(tn) {
      case 1:
        tImg = this.tow1sImg;
        bImg = this.b1Img;
        break;
      case 2:
        tImg = this.tow2sImg;
        bImg = this.b2Img;
        break;
      case 3:
        tImg = this.tow3sImg;
        bImg = this.b3Img;
        break;
      case 4:
        tImg = this.tow4sImg;
        bImg = this.b4Img;
        break;
      case 5:
        tImg = this.tow5sImg;
        bImg = this.b5Img;
        break;
      default:
      println('failed to make turret');
    }
    var tower = new Tower(loc, cost, tImg, bImg);
    if(tower)
      this.towers.push(tower); // add tower to the end of the array of towers
    else {
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

} // end Game class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ load callbacks
function loadDOMCallBacks(menuTiles) {
  //  load tile menu callbacks
  for (var i = 0; i < menuTiles.length; i++) {
    menuTiles[i].mouseOver(tileRollOver);
    menuTiles[i].mouseOut(tileRollOut);
    menuTiles[i].mousePressed(tilePressed);
    menuTiles[i].mouseClicked(tileClicked);
  }

}

//+++++++++++++++++++++++++   tile menu callbacks
function tileRollOver() {
  this.style('background-color', '#f7e22a');
}

function tileRollOut() {
  this.style('background-color', '#DDD');
}

function tilePressed() {
  this.style('background-color', '#900');
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
//  ++++++++++++++++++++++++++++++++++++++++++++++++++    mouse handlers
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
