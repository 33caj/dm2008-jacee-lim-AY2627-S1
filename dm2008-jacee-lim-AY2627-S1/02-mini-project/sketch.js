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

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 120;
const PIPE_W = 60;

// Game states: "playing" or "gameover" — add more if you need them
let gameState = "playing";

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);

  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));

  //restart button
  restartButton = createButton("RESTART GAME");
  restartButton.position(width / 2.65, height / 2);
  restartButton.mousePressed(resetGame);
  restartButton.hide();
}

function draw() {
  background(18, 22, 28);
  console.log(bird.pos.y, birdColor);
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
      }

      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe

      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        //EXPLAIN!!
        // increment score here
        pipes[i].passed = true;
        score++;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    //score system
    textAlign(CENTER);
    textFont("Helvetica");
    fill(255);
    textSize(120);
    text(score, width / 2, height / 3);
  }

  if (gameState === "gameover") {
    fill(255);
    rect(0, 0, 1000, 1000);

    fill(0);
    textSize(24);
    text("Your Score:", width / 2, height / 6);
    textSize(120);
    text(score, width / 2, height / 3);
    textSize(80);
    text("RIP FISH", width / 2, height / 1.5);
    restartButton.show();
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

function resetGame() {
  score = 0;
  spawnCounter = 0;
  gameState = "playing";
  bird = new Bird(120, height / 2);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  restartButton.hide();
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
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
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
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }

  show() {
    fill(232, 27, 16);
    //drawing the circle, height length radius
    circle(this.pos.x, this.pos.y, this.r * 2);
    fill(40);
    circle(this.pos.x + 6, this.pos.y - 4, 4);
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
    fill(120, 200, 160);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  offscreen() {
    return this.x + this.w < 0;
  }

  //output true or false
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap); //EXPLAIN!!
  }
}
