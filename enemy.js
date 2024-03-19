class Enemy {
    constructor(sprite, x, y, tileSize) {
        this.sprites = sprite;
        this.enemyx = x;
        this.enemyy = y;
        this.enemySize = tileSize;


    }
    display() {
    
        imageMode(CORNER);
        image(this.sprites, 350, 100, tileSize, tileSize); // 8,1 is going by pixels but we want it to go by tile co ordinates
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
        image(this.sprites, 2, 1, tileSize, tileSize); // 8,1 is going by pixels but we want it to go by tile co ordinates
    }




}