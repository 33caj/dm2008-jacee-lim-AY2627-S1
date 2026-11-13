7// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(5,100,80);
  // FRONT back paw
  fill("#a586ad");
   rect(200,155,20,20)

   // BACK back paw
  fill("#a586ad");
   rect(132,155,20,20)
 
  // body
  fill("#f0e9e6")
rect(135,94,100,70)
  noStroke()
  fill("#f0e9e6")
  // left ear
  rect(94,57,40,40)
// head and right ear
  rect(94,79,75,50)
  
  fill("#140c08");
  // nose
  ellipse(100,122,20,20)
  // left eye
  ellipse(92,98,15,15)
  // right eye
  ellipse(120,102,15,15)
  fill("#d1b4d9");
  // tail
  rect(235,149,80,15)
// nose
  fill("#d1b4d9");
  rect(140,85,20,20)

  
  fill("#e1c0eb");
  rect(140,160,20,20)
 // FRONT front paw

   // BACK front paw
    fill("#e1c0eb");
  rect(210,160,20,20)
  

  


  
  
  helperGrid(); // do not edit or remove this line
}
