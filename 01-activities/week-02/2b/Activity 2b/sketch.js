// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  for (let i = 0; i < width && height; i += 30) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      fill(255);
    } else if (i % 20 == 0) {
      fill(237, 196, 33);
    } else {
      fill(0);
    }

    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    rect(i + 3, height / 20, 40,1);
    rect(i + 40, height / 13, 40,5);
    rect(i + 1, height / 9, 40,10);
    rect(i + 30, height / 6, 40,20);
    rect(i + 1, height / 4, 40,30);
    rect(i + 1, height / 2.7, 40,30);
    rect(i + -10, height / 2.5, 40,60);
    rect(i + 1, 200, 40,30);
    rect(i + 1, height / 1.6, 40,30);
    rect(i + 30, height / 1.34, 40,20);
    rect(i + 1, height / 1.2, 40,10);
    rect(i + -40, height / 1.1, 40,5);
    rect(i + 3, height /1.05, 40,1);
  
    noStroke()
  }
}