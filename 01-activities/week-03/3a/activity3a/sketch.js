// DM2008 — Activity 3a [Guided]
// Array Sampler (20 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let size = ["30", "80", "200", "400"];
let size2 = ["10", "15", "27", "47"];

let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);
  for (let i = 0; i < size.length; i++) {
    ellipse(size[i], size[i], size[i]);
  }
  // Draw the ellipse using the current color in the array
  fill(255, 50, 40);
  ellipse(size[currentIndex], size[currentIndex], size[currentIndex], size[currentIndex]);

  fill("#80ff00");
  ellipse(size2[currentIndex], size2[currentIndex] - 70, size2[currentIndex] - 70);
}

// Advance to the next ellipse each time mouse is pressed
function keyPressed() {
  if (key == "a" || key == "A") {
 
    size2.push(random(10, 50));
  }
  currentIndex++; // shorthand for currentIndex += 1

  // Wrap back to the start when we reach the end
  if (currentIndex >= size.length) {
    currentIndex = 0;
  }
}
