let colorBtn, sizeSlider, shapeSelect;
let shapeColor;
let controlPanel;

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  controlPanel = createDiv();
  controlPanel.size(400,40)
  controlPanel.position(10,0);
  controlPanel.style("padding","10px");
  controlPanel.style("background","#d4cff7");
  controlPanel.style("border-radius","8px");
  

  // starting color
  shapeColor = color(255,255,255);

  // Button: change color
  colorBtn = createButton("Change Colour");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);
  
  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
  }

  // Slider: controls size
  createP("Size").position(155, 0).style("margin", "4px 20px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(170, 15);

  // Dropdown: choose shape
  createP("Shape").position(332, -10).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(350, 17);
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

  // draw chosen shape
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
