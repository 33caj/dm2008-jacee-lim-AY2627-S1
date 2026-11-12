// DM2008 — Activity 2a [Guided]
// Mode Switch (20 min)
//
// Keys 1, 2, 3 switch between modes — each one changes the background color.
// Try extending each mode to also change the fill, size, or speed of the ellipse.
// Keep it simple: one clear change per mode that's easy to see on screen.
//
// Stretch: add a 4th mode, or make the ellipse change shape between modes.

let x = 0; // ellipse x-position
let size = 50; // ellipse size
let bgColor; // background color, changed by key presses

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
}

function draw() {
  background(bgColor);

  // Draw the ellipse at its current position
  fill(0);
  ellipse(x, height / 2, size);

  // Move the ellipse
  x += 2;

  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
  }

  // --- Your if/else goes here ---
  // Try swapping this out for your own rule.
  if (mouseIsPressed) {
    fill(255, 0, 0); // red on click
  } else {
    fill(0);
  }
}

// Keys 1, 2, 3 change the background color — this is your mode switch
function keyPressed() {
  switch (key) {
    case "1":
      bgColor = color(200, 100, 100);
      break; // red
    case "2":
      bgColor = color(100, 200, 100);
      break; // green
    case "3":
      bgColor = color(100, 100, 200);
      break; // blue
    default:
      bgColor = color(220); // grey
  }
}
