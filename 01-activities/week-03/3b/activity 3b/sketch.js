// DM2008 — Activity 3b
// One Function Wonder (30 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.

let sz = 40;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  for (let j = 0; j < height / sz; j++) {
    for (let i = 0; i < width / sz; i++) {
      eye(i * sz + sz / 2, j * sz + sz / 2, sz);
    }
  }

  function eye(x, y, sz) {
    noStroke();
    fill(255);
    ellipse(x, y, sz);

    fill("#ff0000");
    ellipse(x, y, sz / 2);

    fill(0);
    ellipse(x, y, sz / 4);
  }
}
