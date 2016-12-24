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


}
