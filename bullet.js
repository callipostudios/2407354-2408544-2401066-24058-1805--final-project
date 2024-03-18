class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.yspeed = -3;
        this.r = 3;
    }

    display(){
        noStroke();
        //ellipse(CENTER, width/2, height/2);
        fill(255, this.a);
        ellipse(this.x, this.y, this.r * 2);
    }

    move(){
        this.y += this.yspeed;
    }

    testIntersection(dot){
        let d = dist(this.x, this.u, dot.x, dot.y);
        if(d <= this.r + dot.r){
            return true;
        }
    }
}
