class Bullet{

  constructor(location, bImg, angle){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.speed = 12;
    this.angle = angle;
    this.img = bImg;
  }

  loadImage(){
    var bImage;
     switch(this.bullTyp){
       case "b1":
          bImage = loadImage('b1.png');
       break;
       case "b2":
          bImage = loadImage('b2.png');
       break;
       case "b3":
          bImage = loadImage('b3.png');
       break;
       case "b4":
          bImage = loadImage('b4.png');
       break;
       case "b5":
          bImage = loadImage('b5.png');
       break;
      default:
          println('No bullet image chosen');
       break;
     }
    return bImage
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
    this.loc.y += sin(this.angle - (PI/2))*this.speed;
    this.loc.x += cos(this.angle- (PI/2))*this.speed;
  }
}//  end Bullet class
