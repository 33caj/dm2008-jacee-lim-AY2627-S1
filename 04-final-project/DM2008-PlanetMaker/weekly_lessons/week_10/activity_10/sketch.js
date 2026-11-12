// DM2008 — Activity 10
// Control Center (45 min)
//
// A generative sketch with a working control panel — extend it and make it your own.
// By the end, your UI should change at least two visual variables in real time,
// use at least two types of input, and feel intentional in layout and design.
//
// What's already here: a color button, a size slider, and a shape dropdown.
// Ideas to extend: add a speed slider, a background color picker, an opacity control.
//
// Stretch: style your controls with .style() or CSS to match the feel of your sketch.

let colorBtn, sizeSlider, shapeSelect;
let shapeColor;

function setup() {
  createCanvas(640, 400);
  noStroke();

  shapeColor = color(random(255), random(255), random(255));

  // Button: randomizes the shape color when clicked
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);

  // Slider: controls shape size (range 20–220, starting at 100)
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);

  // Dropdown: switches between shape types
  createP("Shape").position(0, 100).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 130);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");
}

function draw() {
  background(240);

  push();
  translate(width * 0.65, height * 0.5);

  let s = sizeSlider.value();
  fill(shapeColor);

  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    ellipse(0, 0, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rect(0, 0, s, s);
  } else if (choice === "triangle") {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }

  pop();
}

// Called when the color button is pressed
function randomShapeColor() {
  shapeColor = color(random(255), random(255), random(255));
}
