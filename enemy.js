class Enemy {
    constructor(sprite, x, y, tileSize) {
        this.sprites = sprite;
        this.enemyx = x;
        this.enemyy = y;
        this.enemySize = tileSize;
        


    }
    display() {
    
        imageMode(CORNER);
        image(this.sprites, 350, 100, tileSize, tileSize); 
        image(this.sprites, 100, 50, tileSize, tileSize); 
        image(this.sprites, 50, 150, tileSize, tileSize);
        image(this.sprites, 250, 300, tileSize, tileSize);
    
    }
    move() {
        this.x += this.speed;
    }
}



class Chichi {
    constructor(sprite, x, y, tileSize) {
    this.sprites = sprite;
    this.enemyx = x;
    this.enemyy = y;
    this.enemySize = tileSize;
   
    }
    display() {
    
        imageMode(CORNER);
        image(this.sprites, 200, 1, tileSize, tileSize); // 8,1 is going by pixels but we want it to go by tile co ordinates
    }
    move() {
        this.x += this.enemySpeed;
    }

}