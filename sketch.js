//INITIALISE VARIABLES FOR TILEMAP
let tilemap = [];
let numDown = 10;
let numAcross = 10;
let tileSize = 50;
let textures = [];

let graphicMap = [ 
    //         THIS IS OUR Y AXIS
    //   0  1  2  3  4  5  6  7  8  9 
        [0, 0, 0, 0, 0, 2, 1, 0, 0, 0], // 0
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 1
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 4    THIS IS OUR X AXIS
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], // 6
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0], // 7
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0], // 8
        [0, 1, 1, 0, 0, 0, 1, 1, 0, 1]  // 9
    
    ]
    
    let tileRules = [ 
    //         THIS IS OUR Y AXIS
    //   0  1  2  3  4  5  6  7  8  9 
        [0, 0, 0, 0, 0, 2, 1, 0, 0, 0], // 0
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 1
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 4    THIS IS OUR xAXIS
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], // 6
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // 7
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0], // 8
        [0, 1, 1, 0, 0, 0, 1, 1, 0, 1]  // 9
    ]


// VARIABLES FOR STAGE SYSTEM
let score = 0;
let stage = 0; // controls what function should be running
//stage 0 = start 
//stage 1 = game
//stage 2 = win


//VARIABLES FOR ICECREAM POINT SYSTEM
let coinSprite; //ice cream
let pointSystem = 0;


//VARIABLES FOR PLAYER
let player;
let playerSprites = [];
let playerSpeed = 5;
let playerSize = tileSize;

//VARIABLES FOR ENEMY
let enemy;
let enemySprites = [];
let enemySize = tileSize;

//VARIABLES FOR BULLETS
let dots = [];
let bullets = [];
//Work in Progress



function preload() {
    
    
    //tilemap textures
    textures[0] = loadImage("assets/grass.png");
    textures[1] = loadImage("assets/boulder.png");
    textures[2] = loadImage("assets/icecream.png");
    textures[3] = loadImage("assets/craters.png");
    textures[4] = loadImage("assets/simplegrass.png");

    //win screen
    winIMG = loadImage ("assets/win.png"); 


    // COIN IMAGES
   //coin system (the coins are icecreams, but to make things easier for myself, they're named coins on the code - mia)

   coin = loadImage ("assets/icecream.png"); // STEP 1, IF FAILS COME BACK HERE
    //MIA
    // ICECREAMS HERE, MAKE THEM APPEAR - reminder for me
    coinSprite = loadImage("assets/icecream.png");


    //Player sprite
    playerSprites = {
        up: loadImage("assets/orangecat.png"),
        down: loadImage("assets/orangecat.png"),
        left: loadImage("assets/orangeleft.png"),
        right: loadImage("assets/orangeright.png")

    }

     //Enemy sprite 
    enemySprites =  loadImage("assets/dog.png")
       // down: loadImage("assets/dog.png")
       // left: loadImage("assets/dogleft.png"),
       // right: loadImage("assassets/dogright.png")
    }


function setup() {
    createCanvas(500, 500);

    let tileID = 0; // sets our tileID for the first tile we'll make

    //Creates all tiles
    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            //Setting Texture For Tile
            let textureNum = graphicMap[down][across];
    
            //Initialising Tile
            tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); // THIS LINE CREATES OUR NEW TILE!

            tileID++;
        }
    }
    //Tile creation finished



    //Create Player
    player = new Player(playerSprites, 3, 4, tileSize, playerSpeed, tileSize, tileRules);

    //Adds new dots to the dots array
    for(let i = 0; i < dots.length;){
        let d = new Dot(width/2, height/2);
        dots.push(d);
    }


    //Create Enemy
    enemy = new Enemy(enemySprites, 8, 8, tileSize, tileSize, tileRules);


}



// this creates a stage which flicks through the screens when needed, the game will always start with the start screen, then when clciked move into the game

function draw(){
    if (stage == 0) {
        start();
    }

    if (stage == 1) {
        game();
    }

    if (stage == 2) {
        win();
    }

    if(mouseIsPressed == true){
        stage = 1;
    }

    

    if (pointSystem >= 4 && stage === 1) {
        stage = 2;
    }
}


// draw function for the starting screen

function start(){
    background(195, 177, 225);
    
    text('CLICK TO START', 200, 250);
}


//draw function for the win screen 

function win(){
    background(195, 177, 225);
    
    image(winIMG, 0, 0, width, height);
}





// REPLACES DRAW FUNCTION FOR THE GAME STAGE
function game() {
    background(0);
    
    // Loops through all tiles each time draw() is called
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            tilemap[across][down].display(); // runs display() method for each tile!
            tilemap[across][down].debug(); // runs debug() method for each tile!
        }
    }
    // Finishes looping through all tiles within each draw() loop



    //PLAYER MOVEMENT/DISPLAY
    player.display();
    player.move();


    //ENEMY DISPLAY
    enemy.display();
    
    //Bullets
    for(let i = 0; i < dots.length; i++){
        dots[i].display();
        dots[i].move();
    }

    for (let j = bullets.length - 1; j >= 0; j--) {
        bullets[j].display();
        bullets[j].move();
    
        if(bullets[j].y < 0){
          bullets.splice(j,1);
          break;
        }
    
    for (let i = dots.length - 1; i >= 0; i--) {
          if(bullets[j].testIntersection(dots[i])){
            console.log("hit");
            dots.splice(i,1);
            bullets.splice(j,1);
            break;
          }
        }
    }

 
    // POINTS SYSTEM/ LIFE SYSTEM
    text('POINTS: 0' + pointSystem, 5, 5);
    text('POINTS: 0' + pointSystem , 5, 5);
    text('LIVES: 3', 205, 5); // come back to this wednesday


     // attempting to insert points here using if/else.  

    // player.overlap(icecreamSprite)

    //different attempt at inserting points - mia
    
}
//PLAYER MOVEMENT BY PRESSING KEY
 function keyPressed() {
    player.setDirection();
}

//START OF PLAYER CLASS - MOVED TO PLAYER.JS


// END OF PLAYER CLASS

//TILE CLASS - MOVED TO TILE.JS


// BULLET CLASS (NAMED DOT) THIS GENERATES THE CIRCLE
class Dot{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xspeed = random(-1, 1);
        this.yspeed = random(-1, 1);
        this.r = random(10, 30);
    }

    display(){
        noStroke();
        ellipseMode(CENTER);
        fill(120, 20, 200);
        ellipse(this.x, this.y, this.r * 2);
    }

    move(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        if(this.x >= width + this){
            this.x = 0 - this.r;
        } else if (this.x <= 0 - this.r) {
          this.x = width + this.r;
        } else if (this.y >= height + this.r) {
          this.y = 0 - this.r;
        } else if (this.y <= 0 - this.r) {
          this.y = height + this.r;  
        }
    }
}


// THIS MAKES THE BULLET MOVE ON COMMAND - START OF BULLET CLASS, HAS NOW BEEN MOVED TO BULLET.JS



//Cretates a bullet when pressed
function mousePressed(){
    let b = new Bullet(player.xPos + tileSize / 2, player.yPos);
    bullets.push(b);
}


//MIA CODE
// attempts at point system, further research TBD 
/*function display() {
    imageMode(CENTER);
    image(sprite, mouseX, mouseY, 50, 50); 

}
*/


// ENEMY CLASS






// ALL CODE BELOW IS CODE FOR FUTURE IMPLEMENTATIONS AND OR CODE THAT DID NOT


/*
// Anya trial enemy hit by bullet
Bullet?? class{
    this.w = w;// or enemy width + height
    this.h = h;
    this.hit = false;


    over() {
      if (bullet or dot.PosX > this.x && bullet or dot.PosX  < this.x + this.w && bullet or dot.PosY > this.y && bullet or dot.PosY  < this.y + this.h) {
        this.hit = true;
      } else {
        this.hit = false;
      }
    }
  
    update() {
      if (this.hit) {
       // deletes enemy
       .remove();
       =null;
      }
    }
}



*/


// 18/03 - first attempts for the life system (text has already been set, three lives but this will remain commented while we wait for the enemies to be completed as the life system depends on the enemies killing the player, then the amount of lives go down.)
// 


/*MIA OLD ATTEMPTS AT POINT SYSTEM CODE - ABANDONED AND NO LONGER NEEDED BUT KEEP IT HERE

// COMMENTED NEW CODE 07/03/24 - needs to be correctly placed draw section
 // coin(coinXPos, coinXPos, coinSize);

 //if (lives <= 0) {
    //speed = 0;
    //coinXPos = -100;}
    //if (coinXPos >= mouseX - playerSize/2 && coinYPos <= mouseX + playerSize/2 && coinYPos > playerSize) {
    //coinYPos = -playerSize / 2;
    //circleXPos = random(25, 426);
    //score += 1;} 
    //if (icecreamYPos >= 525) {
    //coinYPos = -playerSize / 2;
    //coinXPos = random(25, 426);
    //if (lives === 0) {
    //lives = 0;} else {lives -= 1;}}}

   // }

//OLD ATTEMPT AT VARIABLES FOR ICECREAM POINT SYSTEM (place at the top!)

let coinSprite;
let coinXPos;
let coinYPos;
let coinSize = 25;
//let pointSystem = 0;
let playerPoints = 0;

//if (playerCollision) {


// coinSprite location setting
coinYPos = -playerSize / 2; 
coinXPos = random(25, 426); // setting coin location

//let lives = 5;


    // attempting to insert points here using if/else.  

    // player.overlap(coinSprite)

    //different attempt at inserting points - mia
    
    // When the player collects an icecream (assuming coin tile index is 5)

//}

CLOSE MIA CODE */



