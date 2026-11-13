// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;
let c;

function setup() {
  createCanvas(800, 800)

}

function draw() {
    background(76, random,0,20);
  
  x = random(width);
  y = random(height);
  w = random(1, 3000);
  
  // background(240,40);
  
  stroke(255);
  strokeWeight(random(0.5, 2));
 noFill();
  ellipse(x, y, w, w);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}