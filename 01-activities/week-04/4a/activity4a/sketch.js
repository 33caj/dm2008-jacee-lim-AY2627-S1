// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.
// Your job is to complete the class, then add movement and a flavor randomizer.
//
// Suggested order:
// 1. Add the missing properties to the constructor (sz, x, y)
// 2. Fix show() so it uses this.flavor, this.x, this.y, this.sz
// 3. Implement move() and randomFlavor()
// 4. Wire them up in keyPressed() and mousePressed()
//
// Stretch: add a second cookie with different starting values.

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("mint", 80, width / 2, height / 2);
}

function draw() {
  background(0);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    // this. binds each value to this specific cookie object
    // Add the missing properties below
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    // Fix this method — it should use this.flavor, this.x, this.y, this.sz
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "vanilla":
        fill(255, 223, 150);
        break;
      case "mint":
        fill("#c5f7cd");
        break;
      case "strawberry":
        fill("#e99fb9");
        break;
    }
    ellipse(this.x, this.y, this.sz);
  }

  // Add a move() method — update this.x or this.y based on which key is pressed
  move(val) {
    this.x += val;
  }

  // Add a randomFlavor() method — set this.flavor to one of at least 3 options
  randomFlavor() {
    this.flavor = random(["vanilla", "chocolate", "mint", "strawberry"]);
  }
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
  if (key == "a") {
    cookie.move(-40);
  }
  if (key == "d") {
    cookie.move(40);
  }
}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
  cookie.randomFlavor();
}
