class Player {
    constructor(sprites, startAcross, startDown, size, speed, tileSize, tileRules) {
        //Attach sprite to key in object
        this.sprites = sprites;

        //Set current sprite
        this.currentSprite = this.sprites.down;

        //Store starting tile info. Later, we will use these to store the current tile the player is on.
        this.across = startAcross;
        this.down = startDown;
        
        //convert tile coordinates into pixel coordinates
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

        //storing size and speed
        this.size = size;
        this.speed = speed;

        //Check rules/collisions for the tile the player wants to move to (target Tile)
        this.tileRules = tileRules;
        this.tileSize = tileSize;

        //some extra properties that we will use to control player movement below
        //what direction the player will travel in
        this.dirX = 0;
        this.dirY = 0;
        
        //whether the player is currently moving to another tile
        this.isMoving = false;
        
        //the x/y position of the tile the player is moving to (the target)
        this.tx = this.xPos; //set these to the initial player pos
        this.ty = this.yPos;
    }

    setDirection() {
        //Check if we're NOT currently moving...
        if (!this.isMoving) {
            //if not, then let's set the direction the player is travelling!

            //UP
            if (key === "w") {
                this.dirX = 0;
                this.dirY = -1; //direction is up!
                this.currentSprite = this.sprites.up;
            }

            if (key === "W") {
                this.dirX = 0;
                this.dirY = -1; //direction is up!
                this.currentSprite = this.sprites.up;
            }

            //DOWN
            if (key === "s") {
                this.dirX = 0;
                this.dirY = 1; //direction is down!
                this.currentSprite = this.sprites.down;
            }

            if (key === "S") {
                this.dirX = 0;
                this.dirY = 1; //direction is down!
                this.currentSprite = this.sprites.down;
            }

            //LEFT
            if (key === "a") {
                this.dirX = -1; //direction is left!
                this.dirY = 0; 
                this.currentSprite = this.sprites.left;
            }

            if (key === "A") {
                this.dirX = -1; //direction is left!
                this.dirY = 0; 
                this.currentSprite = this.sprites.left;
            }

            //RIGHT
            if (key === "d") {
                this.dirX = 1; //direction is right!
                this.dirY = 0;
                this.currentSprite = this.sprites.right;
            }

            if (key === "D") {
                this.dirX = 1; //direction is right!
                this.dirY = 0;
                this.currentSprite = this.sprites.right;
            }

            //With the direction set, we can now move to the next code block to check if we can move!
            this.checkTargetTile();
        }
    }





    //This checks what tile the player wants to move to and if
    //the player is allowed to move there
    checkTargetTile() {
        //First, get what tile the player is currently on
        this.across = Math.floor(this.xPos / this.tileSize);
        this.down = Math.floor(this.yPos / this.tileSize);

        //Calculate the coordinates of the target tile
        let nextTileHorizontal = this.across + this.dirX;
        let nextTileVertical = this.down + this.dirY;

        //check is that tile is in bounds of the map
        // remember: && means AND (i.e. below is asking if ALL conditions are true)
        if (
            
            nextTileHorizontal >= 0 && //top of map
            nextTileHorizontal < numAcross && //bottom of map
            nextTileVertical >= 0 && //left edge of map
            nextTileVertical < numDown //right edge of map
        ) {
            //if it is in bounds, have we set it as moveable in our ruleMap:
            if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
                //if the target tile is walkable, then...
                //...calculate the precise x and y coordinate of the target tile...
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                
                //Because the player is ready to move there, we can set isMoving to true!
                this.isMoving = true;
            }
        }
    }

    move() {
        //This is in our draw loop, so called move() is called every frame BUT...
        if (this.isMoving) {
            //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
            //So first, start by moving in direction set by setDirection()
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            //Now check if player has reached targetX
            if (this.xPos === this.tx && this.yPos === this.ty) {
                //if there, stop moving and reset our variables
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;

                // ALL BELOW IS FROM 13/03 - mia's updates

                let currentTileX = Math.floor(this.xPos / this.tileSize);
                let currentTileY = Math.floor(this.yPos / this.tileSize);
                console.log("currentTileX = ", currentTileX);
                console.log("currentTileY = ", currentTileY)

              //Checking if tile the player is currently in has an ice cream in it.
              if (this.tileRules[currentTileY][currentTileX] === 2){
                console.log("Accessing!")
                //Change texture for that tile to a floor (i.e remove ice cream)
                tilemap[currentTileX][currentTileY].texture = textures[0];


                //IMPORTANT FOR POINTS
                pointSystem++;
              }

            }

        }
    }
//DISPLAY PLAYER
    display() {
        imageMode(CORNER);
        image(this.currentSprite, this.xPos, this.yPos, this.size, this.size);
    }
}
