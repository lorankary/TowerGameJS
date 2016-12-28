class Tower {
  constructor(loc, cost, bullet) {
    this.loc = loc;
    this.placed = false;
    this.visible = false;
    this.cost = cost;
    this.bullet = bullet;
    this.towerNum = 0;
  }
  run() {
    this.render();
  }
  render() {
    push();
    fill(200, 100, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      ellipse(this.loc.x, this.loc.y, 30, 30);
      strokeWeight(4);
      line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
  update() {
    //console.log(this.placed);
  }

}//  end Tower class

class TowerOne extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.placed = false;
    this.visible = false;
    this.towerNum = 1;
    this.t1Img = loadImage('tow0.png');

  }

  render() {
    push();
    fill(100, 200, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      image(this.t1Img, this.loc.x, this.loc.y);//    t1Imgellipse(this.loc.x, this.loc.y, 30, 30);
      //strokeWeight(4);
    //  line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
}//  end Tower_One class

class TowerTwo extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.placed = false;
    this.visible = false;
    this.towerNum = 1;
    this.t1Img = loadImage('tow1.png');

  }

  render() {
    push();
    fill(100, 200, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      image(this.t1Img, this.loc.x, this.loc.y);//    t1Imgellipse(this.loc.x, this.loc.y, 30, 30);
      //strokeWeight(4);
    //  line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
}//  end Tower_Two class

class TowerThree extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.placed = false;
    this.visible = false;
    this.towerNum = 1;
    this.t1Img = loadImage('tow2.png');

  }

  render() {
    push();
    fill(100, 200, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      image(this.t1Img, this.loc.x, this.loc.y);//    t1Imgellipse(this.loc.x, this.loc.y, 30, 30);
      //strokeWeight(4);
    //  line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
}//  end Tower_three class

class TowerFour extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.placed = false;
    this.visible = false;
    this.towerNum = 1;
    this.t1Img = loadImage('tow3.png');

  }

  render() {
    push();
    fill(100, 200, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      image(this.t1Img, this.loc.x, this.loc.y);//    t1Imgellipse(this.loc.x, this.loc.y, 30, 30);
      //strokeWeight(4);
    //  line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
}//  end Tower_three class


class TowerFive extends Tower {
  constructor(loc, cost, bullet) {
    super(loc, cost, bullet);
    this.placed = false;
    this.visible = false;
    this.towerNum = 1;
    this.t1Img = loadImage('tow4.png');

  }

  render() {
    push();
    fill(100, 200, 50);
    stroke(22);
    if (this.visible) { //  not visible when first created
      strokeWeight(1);
      image(this.t1Img, this.loc.x, this.loc.y);//    t1Imgellipse(this.loc.x, this.loc.y, 30, 30);
      //strokeWeight(4);
    //  line(this.loc.x, this.loc.y, this.loc.x + 30, this.loc.y);
    }
    pop();
  }
}//  end Tower_three class
