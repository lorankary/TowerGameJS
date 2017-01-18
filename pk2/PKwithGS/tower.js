class Tower {
  // issue#1 use preloaded images
  constructor(loc, cost, tImg, bImg) {
    this.loc = loc;
    this.placed = false;
    this.visible = false;
    this.cost = cost;
    this.bulletImg = bImg;
    this.towImg = tImg;
    this.towAngle = 0;
    this.lastTime = millis();
    this.coolDown = 500;
  }
  run() {
    this.render();
    this.update();
  }
  render() {
    push();
      imageMode(CENTER);
      translate(this.loc.x, this.loc.y);
      rotate(this.towAngle);
      if (this.visible) { //  not visible when first created
        image(this.towImg, 0,0);
      }
    pop();
  }
  update() {
    //  Rotate turret to follow mouse
    let dx = this.loc.x - mouseX;
    let dy = this.loc.y - mouseY;
    this.towAngle = atan2(dy, dx) - (PI/2);
    this.checkEnemies();
  }

  checkEnemies(){

    if(this.placed &&
      this.loc.dist(createVector(mouseX, mouseY)) < 100 &&
      (millis()-this.lastTime > this.coolDown )){
          // reset lastTime to current time
          this.lastTime = millis();
          let bulletLocation = createVector(this.loc.x, this.loc.y);
          let b = new Bullet(bulletLocation , this.bulletImg, this.towAngle);
          towerGame.bullets.push(b);
    }
  }

}//  end Tower class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
