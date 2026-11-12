let img, img2, sound;

// An async setup() lets us await file loading — draw() won't start until setup() finishes
async function setup() {
  createCanvas(400, 400);

  // Load your own files here
  img = await loadImage("assets/chat.png");
  img2 = await loadImage("assets/notification.png");
  sound = await loadSound("assets/notified.mp3");

  imageMode(CENTER); // draw image from its center
}

function draw() {
  background(220);

  // Display image in the center
  image(img, width / 2, height / 2, 250, 250);

  if (mouseIsPressed) {
    image(img2, width / 4 * 3 , height / 4 , 75, 75);
  }
}

// Play sound when mouse is pressed
function mousePressed() {
  sound.play();
}
