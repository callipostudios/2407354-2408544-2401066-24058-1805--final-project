//INITIALISE VARIABLES FOR TILEMAP
let tilemap = [];
let numDown = 10;
let numAcross = 10;
let tileSize = 50;
let textures = [];

let graphicMap = [ 
    //         THIS IS OUR Y AXIS
    //   0  1  2  3  4  5  6  7  8  9 
        [4, 4, 4, 4, 4, 2, 1, 4, 4, 4], // 0
        [4, 4, 4, 4, 4, 4, 4, 4, 1, 4], // 1
        [4, 4, 4, 1, 4, 4, 4, 4, 4, 4], // 2
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 3
        [4, 2, 4, 4, 4, 4, 4, 4, 4, 4], // 4    THIS IS OUR X AXIS
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 5
        [4, 4, 1, 4, 4, 4, 4, 1, 4, 4], // 6
        [4, 4, 3, 4, 4, 4, 4, 4, 4, 4], // 7
        [4, 4, 4, 4, 4, 2, 4, 4, 4, 4], // 8
        [4, 1, 1, 4, 4, 4, 1, 1, 4, 1]  // 9
    
    ]
    
    let tileRules = [ 
    //         THIS IS OUR Y AXIS
    //   0  1  2  3  4  5  6  7  8  9 
        [0, 0, 0, 0, 0, 2, 1, 0, 0, 0], // 0
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 1
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
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
let enemySpeed = 5;
let enemySprites = [];
let enemySize = tileSize;

let chichi;
let chichiSpeed= 10;
let chichiSprite = [];
let chichiSize = tileSize;

//VARIABLES FOR BULLETS
let bullets = [];

//VARIABLES FOR SFX
let mainsong;
let pew;
let walking;


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
        up: loadImage("assets/catup.png"),
        down: loadImage("assets/catdown.png"),
        left: loadImage("assets/catleft.png"),
        right: loadImage("assets/catright.png")

        }

     //Enemy sprite 
    enemySprites =  loadImage("assets/dogleft.png")
       // down: loadImage("assets/dogleft.png")
       // left: loadImage("assets/dogleft.png"),
       // right: loadImage("assassets/dogright.png")

       //Chichi sprie
       chichiSprite = loadImage("assets/chichileft.png")

        
       //Sound and music
       /*
        mainsong = loadSound("sfx/mainsong.mp3");
        pew = loadSound("sfx/pew.mp3");
        walking = loadSound("sfx/walking.mp3");

        */
       // the function loadSound is not work and is seen as undefined 
       // im not sure how to fix this
       /*
        i would have the mainsong playong from the very start of the game with
        mainsong.play();

        for pew i would have it so that it only plays when you click the mouse
        for walking it would play when the player is moving
       */
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

   


    //Create Enemy
    enemy = new Enemy(enemySprites, 8, 8, tileSize, tileSize, tileRules);
    chichi = new Chichi(chichiSprite, 2, 1, tileSize, tileSize, tileRules);


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

    

    if (pointSystem >= 3 && stage === 1) {
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
    enemy.move();
    
    chichi.display();
    chichi.move();

    //Bullets
    for (let j = bullets.length - 1; j >= 0; j--){ // moves and displayes the bullets
        bullets[j].display();
        bullets[j].move();
    
        if(bullets[j].y < 0){ // sets how high the bullets can reach
          bullets.splice(j,1);
          break;
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

// rough psuedo code for sound effect (sound file not attained yet)
//  Example: Load and play a sound using p5.js
//let mySound; // Declare a variable to store the sound

//function preload() {
  // Load the sound file (replace 'path/to/sound.mp3' with your actual sound file)
  //mySound = loadSound('path/to/sound.mp3');
//}

//function setup() {
  //createCanvas(400, 400);
//}

//function mousePressed() {
  // Play the sound when the mouse is clicked
  //mySound.play();
//}

//function keyPressed() {
  // Stop the sound when a key is pressed
  //mySound.stop();
//}



