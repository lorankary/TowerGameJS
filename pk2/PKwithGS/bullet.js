class Bullet{

  constructor(location, bImg, angle){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.speed = 12;
    this.angle = angle;
    this.img = bImg;
  }

  run(){
    this.render();
    this.update();
  }
  render(){
    imageMode(CENTER);
    push()
    translate(this.loc.x, this.loc.y);
    rotate(this.angle);
    image(this.img, 0,0);

    pop();
  }

  update(){
    this.loc.y += sin(this.angle )*this.speed;
    this.loc.x += cos(this.angle)*this.speed;

  }
}//  end Bullet class
