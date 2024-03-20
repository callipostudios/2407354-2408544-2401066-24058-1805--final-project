class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.yspeed = -3;
       // this.xspeed = 0;
        this.r = 3;
        this.hit = false;
    }

    //Makes the bullets
    display(){
        noStroke();
        fill(255, this.a);
        ellipse(this.x, this.y, this.r * 2);
    }

    move(){
        this.y += this.yspeed;
       // this.x += this.xspeed;  //testing 
    }
    /*
    hit() {
        if (enemy.x > this.x && enemy.x < this.x && enemy.y > this.y && enemy.y < this.y){
          this.hit = true;
          console.log("hit");
          enemy.remove();
        } 
    } */
}
