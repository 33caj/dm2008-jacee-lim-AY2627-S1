var y = 0
  var speed = 20

function setup() {
  createCanvas(400, 400);
 
  
}

function draw() {
  background(220);
  ellipse(30,y,40,40)
  //go up when hits the bottom
  if (y > height){
speed = -3
  }
  //go down when hits the top
  if (y < 0){
speed = +3
  }
 y = y + speed


}