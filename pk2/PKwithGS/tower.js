class Tower {
  constructor(loc, cost, bullet) {
    this.loc = loc;
    this.placed = false;
    this.visible = false;
    this.cost = cost;
    this.bullet = bullet;
    this.towerNum = 0;
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
          let b = new Bullet(bulletLocation ,  this.bullet, this.towAngle);
          towerGame.bullets.push(b);
    }

  }

}//  end Tower class

class TowerOne extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.towerNum = 1;
    this.towImg = loadImage('tow0.png');
  }


}//  end Tower_One class

class TowerTwo extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.towerNum = 2;
    this.towImg = loadImage('tow1.png');
  }

}//  end Tower_Two class

class TowerThree extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.towerNum = 3;
    this.towImg = loadImage('tow2.png');
  }


}//  end Tower_three class

class TowerFour extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.towerNum = 4;
    this.towImg = loadImage('tow3.png');
  }

}//  end Tower_three class


class TowerFive extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.towerNum = 5;
    this.towImg = loadImage('tow4.png');

  }

}//  end Tower_three class
