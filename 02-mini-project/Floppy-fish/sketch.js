// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get the bird flapping — add control in keyPressed() DONE
// 2. Get pipes spawning — uncomment the spawn logic in draw() DONE
// 3. Add collision detection between the bird and pipes DONE
// 4. Add scoring when the bird passes a pipe DONE
// 5. Add game states — at minimum a playing state and a game over state DONE
// Stretch: add a start screen, a high score, or a difficulty curve. MAYBE START SCREEN

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score = 0;
let spawnCounter = 0;
let birdColor;
let restartButton;
let homeButton;
let fontA;
let fontB;
let bg;
let bgScrollX = 0;
let scrollSpeed = 4; // THIS DETERMINES BG MOVEMENT SPEED!
let fish;
let rotateFish = 0;
let baseFrame;
let back;
let lose;
let play;
let pt;
let bloop;
let bgMusic;

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 120;
const PIPE_W = 60;

// Game states: "playing" or "gameover" or "home"
let gameState = "home";

/* ----------------- SET UP & BUTTONS ----------------- */
async function setup() {
  createCanvas(480, 640);

  angleMode(DEGREES);

  fontA = await loadFont("assets/Bubble Beauty.ttf");
  fontB = await loadFont("assets/SilkR.ttf");
  bg = await loadImage("assets/BG.png");
  fish = await loadImage("assets/Fish.png");
  stal = await loadImage("assets/stal.png");
  coral = await loadImage("assets/coral.png");
  back = await loadSound("assets/back.mp3");
  lose = await loadSound("assets/lose.mp3");
  play = await loadSound("assets/play.mp3");
  pt = await loadSound("assets/point.mp3");
  bloop = await loadSound("assets/bloop.mp3");
  bgMusic = await loadSound("assets/bgmusic.mp3");

  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));

  //--Buttons---
  //font

  //restart button
  textFont(fontB);
  restartButton = createButton("NEW GAME");
  restartButton.size(140, 40);
  restartButton.position(width / 2 - 140 / 2, height / 1.75);

  //text & colour

  restartButton.style("background-color", "#58808d");
  restartButton.style("color", "#ffffff");
  restartButton.style("font-weight", "bold");

  //Border & corner
  restartButton.style("border", "none");
  restartButton.style("border-radius", "16px");

  //Detect mouse position under the restart button
  restartButton.mouseOut(ButtonNormal);
  restartButton.mouseOver(ButtonSelect);

  //button functionality
  restartButton.mousePressed(resetGame);
  restartButton.hide();

  //MainMenubutton

  homeButton = createButton("MAIN MENU");
  homeButton.size(140, 40);
  homeButton.position(width / 2 - 140 / 2, height / 1.75 + 40);

  //text & colour
  homeButton.style("background-color", "#58808d");
  homeButton.style("color", "#ffffff");
  homeButton.style("font-weight", "bold");

  //Border & corner
  homeButton.style("border", "none");
  homeButton.style("border-radius", "16px");

  //Detect mouse position under the restart button
  homeButton.mouseOut(ButtonNormal);
  homeButton.mouseOver(ButtonSelect);

  //button functionality
  homeButton.mousePressed(home);
  homeButton.hide();

  //MUSIC!!
  bgMusic.play();
  bgMusic.loop();
}

//Shared execute colour change when mouse is over the button
function ButtonNormal() {
  this.style("background-color", "#58808d");
}
function ButtonSelect() {
  this.style("background-color", "#273d45");
}

//------DRAW FUNCTION!---------------------------------------
function draw() {
  //DEBUG CONSOLE
  //console.log(bird.pos.y, birdColor,frameCount);

  let bgWidth = (2.7) * height;

  background(18, 22, 28);

  image(bg, bgScrollX, 0, bgWidth, height);
  image(bg, bgScrollX + bgWidth, 0, bgWidth, height);

  bgScrollX -= scrollSpeed;

  if (bgScrollX <= -bgWidth) {
    bgScrollX += bgWidth;
  }

  fill(17, 17, 132, 50);
  rect(0, 0, width, height);

  if (gameState === "playing") {
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 100));
      //pipe(number)= how far pipes are from each other = difficulty
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        gameState = "gameover";
        baseFrame = frameCount;
        lose.play(); //equalize counter
      }

      // When the bird passes a pipe, increment the score

      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        // increment score here
        pipes[i].passed = true;
        score++;
        pt.play();
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    //score system
    textAlign(CENTER);
    textFont(fontB);
    fill(255);
    textSize(120);
    text(score, width / 2, height / 3);
  }

  //----------GAMES STATES ------
  if (gameState === "gameover") {
    //Background, shifted a bit to the left
    image(bg, -10, 0, width * 3, height);
    fill(255, 255, 255, 127);
    rect(0, 0, width, height);

    fill(0);
    text("Your Score:", width / 2, height / 5);
    text(score, width / 2, height / 3);
    textSize(32);
    //  textFont(fontA);

    //SCORE LINES
    if (score == 0) {
      text("You can do better!", width / 2, height / 2.2);
    }
    if (score == 1) {
      text("Just keep swimming!", width / 2, height / 2.2);
    }
    if (score == 2) {
      text("Getting the hang of it!", width / 2, height / 2.2);
    }
    if (score >= 3 && score <= 4) {
      text("On a roll, sushi!", width / 2, height / 2.2);
    }
    if (score >= 5 && score <= 7) {
      text("Fintastic!", width / 2, height / 2.2);
    }
    if (score >= 8 && score <= 10) {
      text("Shell yeah!", width / 2, height / 2.2);
    }
    if (score >= 11 && score <= 15) {
      text("Holy Mackerel!", width / 2, height / 2.2);
    }
    if (score >= 16 && score <= 19) {
      text("The fish approves!", width / 2, height / 2.2);
    }
    if (score >= 20 && score <= 25) {
      text("Oh, you show off!", width / 2, height / 2.2);
    }
    if (score >= 26) {
      text("Stop. You're scaring the fish!", width / 2, height / 2.2);
    }

    restartButton.show();
    homeButton.show();

    //Death Flash!
    let frameCounter = frameCount - baseFrame; //calls out the triggered baseFrame

    //frameCounter is how long it flashes, frameCount % is the speed of flashing
    if (frameCounter < 30 && frameCount % 15 === 0) {
      background(255);
    } else {
    }
  }

  if (gameState === "home") {
    //Background, shifted a bit to the left
    image(bg, -10, 0, width * 3, height);

    fill(17, 17, 132, 50);
    rect(0, 0, width, height);

    restartButton.show();

    fill(255);
    textSize(150);
    textAlign(CENTER);
    textFont(fontA);
    text("Floppy", width / 2, height / 2.95);
    textSize(250);
    text("Fish", width / 2, height / 1.85);
    textFont(fontB, 20);
    text("Press Spacebar to swim!", width / 2, height / 1.55);

    restartButton.show();
    restartButton.position(width / 2 - 140 / 2, height / 1.4);
  }
}
// What should the player see when the game ends?
// How do they restart?

/* ----------------- Input ----------------- */
function keyPressed() {
  if (key == " ") {
    bird.flap();
  }
  // Make the bird flap on space or UP_ARROW — call bird.flap()
}

//-------Game States-----------------
function resetGame() {
  score = 0;
  spawnCounter = 0;
  gameState = "playing";
  bird = new Bird(120, height / 2);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  restartButton.hide();
  homeButton.hide();
  play.play();
}

function home() {
  gameState = "home";
  homeButton.hide();
  restartButton.hide();
  back.play();
  return;
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.flapStrength = -8.0;
  }

  applyForce(fy) {
    this.acc.y += fy;
    rotateFish = rotateFish + 0.8;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
    rotateFish = -10;
    bloop.play();
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      gameState = "gameover";
      baseFrame = frameCount;
      lose.play();
    } //resets frame counter, plays the lose sound
  }

  show() {
    //fill(232, 27, 16);
    //drawing the circle, height length radius
    //circle(this.pos.x, this.pos.y, this.r * 2);
    //fill(40);
    //circle(this.pos.x + 6, this.pos.y - 4, 4);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(rotateFish);
    imageMode(CENTER);
    image(fish, 0, 0, 40, 40);
    pop();
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    const margin = 80;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(120, 200, 160, 0);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
    imageMode(CORNERS);
    //corners with an S is a new function, it works with 1X 1Y, 2X 2Y
    //this.top-400 basically fixes the height at 400 px
    image(stal, this.x, this.top - 450, this.x + 62, this.top);
    imageMode(CORNER);
    image(coral, this.x, this.bottom, this.w, 600);
    //last value is image length, keep consistent!
  }

  offscreen() {
    return this.x + this.w < 0;
  }
  ground(bird) {}
  //output true or false
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}
