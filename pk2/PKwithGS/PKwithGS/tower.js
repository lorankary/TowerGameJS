class Tower {
  constructor(loc, cost, bullet) {
    this.loc = loc;
    this.placed = false;
    this.visible = false;
    this.cost = cost;
    this.bullet = bullet;
    this.towerNum = 0;
    this.towAngle = 0;
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
    var mouseLoc = createVector(mouseX, mouseY);
    var dx = this.loc.x - mouseLoc.x;
    var dy = this.loc.y - mouseLoc.y;
    this.towAngle = atan2(dy, dx) - (PI/2);

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
