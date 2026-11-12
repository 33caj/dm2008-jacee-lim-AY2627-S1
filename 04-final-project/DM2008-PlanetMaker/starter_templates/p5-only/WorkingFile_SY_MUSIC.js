
//----------PRE SETUP---------------------------
let stars = [];
let startButton;
let uiOpacity = 255;
let sliderSize;
let silderOpactity = 0;
let cloudSystem = [];
let cloudGroup = [];
let cloudGraphics;
let planetMask;
let ClusterCount = 5;      
let LastClusterCount = 5; 

const PLANET_SIZE = 380;

//initial state when game boots up
let gameState = "home";

//---PRE SETUP MUSIC THINGS------
let music, bassDrum, ambience;
let noteTimer = 0, drumTimer = 0;
let startMusic = false;
let bassDrumLoaded = false;
let ambienceLoaded = false;
let ambienceStarted = false;
let audioUnlocked = false;
let nextNoteTime = 0, nextDrumTime = 0;

let sizePitch = 0, sizeTempo = 1, tempTempo = 1;
let drumRate = 1, synthSteps = 0, synthVol = 0.1, synthWave = 'sine';

const notes = [60, 62, 64, 67, 69, 74]; //these are midi numbers, corresponding to a certain set of keys
const noteLength = 400; // how long (ms) the note rings
const gapMin = 200; // shortest pause between notes (ms)
const gapMax = 700; // longest pause between notes (ms)
const drumInterval = 800;

const DRUM_VOL = 0.5;          // keep sum of drum ambience and synth max under 1.0 otherwise ears die
const AMBIENCE_VOL = 0.3;
const SYNTH_MAX_VOL = 0.2;
const SYNTH_MIN_VOL = 0.03;    
const SIZE_PITCH_RANGE = 5;    // semitones: big planet = -5, small = +5
const ATMO_PITCH_RANGE = 3; 

//------MUSIC CONVERTERS----//
//oscillator cannot function without hertz, therefore I must include an equation that converts midi to hertz
function midiToHertz(midiNumber) {
  return 440 * Math.pow(2, (midiNumber - 69) / 12);
}

function semitonesToRate(semitones) {
  return Math.pow(2, semitones / 12);
}

function noteFromDegree(degree) {
  const len = notes.length;
  const octave = Math.floor(degree / len);
  const index = ((degree % len) + len) % len;
  return notes[index] + 12 * octave;
}

//-----------------SETUP-----------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  loadFont(
    "assets/Etna.ttf",
    (font) => { fontA = font; },
    
  );
  bassDrum = loadSound(
    "assets/Heartbeat Sound Once.mp3",
    () => {
      bassDrumLoaded = true;
      startAudioIfReady();
    },
  
  );
  ambience = loadSound(
    "assets/ambience.mp3",
    () => {
      ambienceLoaded = true;
      startAudioIfReady();
    },
    
  );

  
  //Control Panel
  
controlPanel = createDiv();
controlPanel.position(30, 50);
controlPanel.style("color", "white");
controlPanel.style("font-family", "Etna");
controlPanel.style("font-size", "12px");
controlPanel.style("padding", "12px");
controlPanel.style("background", "rgba(200,200, 200, 0.2)");
controlPanel.style("border", "0.5px solid white");
controlPanel.style("border-radius", "8px");
controlPanel.hide();
//Ctrl Panel > Title
  MTitle = createP("PLANET");
  MTitle.parent(controlPanel);
  MTitle.style("margin", "0");
  MTitle.style("font-size", "16px");

  // Ctrl Panel > SIZE/MAGNITUDE
  MSize = createP("MAGNITUDE");
MSize.parent (controlPanel);
MSize.style("margin", "0");
MSize.style('padding-left', '8px');
MSize.style('padding-top', '4px');
sliderSize = createSlider(height/16, height/1.35, random(height/1.35));
sliderSize.parent (controlPanel);
sliderSize.size(120);

  // Ctrl Panel > TEMPERATURE -255 - +255
MTemp = createP("TEMPERATURE");
MTemp.parent (controlPanel);
MTemp.style("margin", "0");
MTemp.style('padding-left', '8px');
MTemp.style('padding-top', '4px');
sliderTemp = createSlider(-255, 255, random(50,180));
sliderTemp.parent (controlPanel);  
sliderTemp.size(120);

  //Ctrl Panel > ACIDITY 0-255
MAcid = createP("ALKILI /ACIDITY");
MAcid.parent (controlPanel);
MAcid.style("margin", "0");
MAcid.style('padding-left', '8px');
MAcid.style('padding-top', '4px');
sliderAcid = createSlider(0, 255, random(100));
sliderAcid.parent (controlPanel);   
sliderAcid.size(120);
  
//Ctrl Panel > Atmosphere: 0 - 100
 MAtmo = createP("ATMOSPHERE");
MAtmo.parent (controlPanel);
MAtmo.style("margin", "0");
MAtmo.style('padding-left', '12px');
MAtmo.style('padding-top', '4px'); 
sliderAtmo = createSlider(0, 100, 20);
sliderAtmo.parent (controlPanel); 
sliderAtmo.size(120);

    //Ctrl Panel > Terrain - 0 to 50
MTerra = createP("TERRAIN");
MTerra.parent (controlPanel);
MTerra.style("margin", "0");
MTerra.style('padding-left', '12px');
MTerra.style('padding-top', '4px'); 
sliderTerra = createSlider(0, 50, 20);
sliderTerra.parent (controlPanel); 
sliderTerra.size(120);

  //Ctrl Panel > Clouds: 0-255
MCloud = createP("WEATHER");
MCloud.parent (controlPanel);
MCloud.style("margin", "0");
MCloud.style('padding-left', '12px');
MCloud.style('padding-top', '4px'); 
sliderCloud = createSlider(0, 255, 50);
sliderCloud.parent (controlPanel); 
sliderCloud.size(120);

    //Ctrl Panel 'SAVE'
MSave = createP("Press S to Save");
MSave.parent (controlPanel);
MSave.style("margin", "0");
MSave.style('padding-left', '18px');
MSave.style('padding-top', '10px'); 

//-----------------------MASK------------
  //creates the offscreen canvas the clouds are drawn on
  cloudGraphics = createGraphics(PLANET_SIZE, PLANET_SIZE);
  cloudGraphics.noStroke();

  //planet-sized mask
  let m = createGraphics(PLANET_SIZE, PLANET_SIZE);
  m.noStroke();
  m.fill(100);
  m.ellipse(PLANET_SIZE / 2, PLANET_SIZE / 2, PLANET_SIZE);
  planetMask = m.get();

//---------------------------SETUP: FOR LOOPS----------------------------------------------------
  //STAR LOOP
  for (let i = 0; i < 100; i++) {
    //value control for star
    let Xpos = random(width);
    let Ypos = random(height);
    let size = random(0.3, 3);
    let starCol = [random(200, 255), random(200, 255), random(200, 255)];
    stars.push(new Star(Xpos, Ypos, size, starCol));
  }

  buildClouds();

  //---------------------------SETUP: BUTTONS----------------------------------------------------

  //start button
  startButton = createButton("START");
  startButton.style("font-family", "Etna, sans-serif");
  startButton.position(width / 2 - 50, height / 2 + 100);
  startButton.size(100, 50);
  startButton.style("font-size", "20px");
  startButton.style("background-color", "#fcfcfc");
  startButton.style("color", "#191818");
  startButton.style("border", "none");
  startButton.style("border-radius", "100px");

  //button changes color when moused over
  startButton.mouseOver(ButtonSelect);
  startButton.mouseOut(ButtonNormal);

  //pressing the start button starts the game
  startButton.mousePressed(startGame);

  //---------------------------SETUP: MUSIC----------------------------------------------------
   music = new p5.Oscillator();
  music.setType('sine'); //this is adjustable later, maybe under dropdown
  music.amp(0);
  

}

//------DRAW FUNCTION!---------------------------------------
function draw() {

  let UniversalNumber = 0.005
  //Universe Cycle is a giant sine wave that does a day/night cycle
  let UniverseCycle = cos(frameCount * UniversalNumber);
  

  //Music Timers and Triggers
   if (startMusic) {
    updateSound();
    const dt = min(deltaTime, 100);   // stops a burst of notes after the tab was hidden
    noteTimer += dt * sizeTempo;
    drumTimer += dt * sizeTempo * tempTempo;

    if (noteTimer >= nextNoteTime)playMusic();
    if (drumTimer >= nextDrumTime)playDrums();
  }

  //Deep space
BGColA = color("#080425")
BGColB = color(10, 35, 80); 
let BGColSwap = map(UniverseCycle, -1, 1, 0, 1);
let currentColor = lerpColor(BGColA, BGColB, BGColSwap);

  background(currentColor);


//-- Slider TRANSLATION & CONTROL----------

//Slider Value Conversion
 PlanetSize = sliderSize.value();
 PlanetTemp = sliderTemp.value();
 PlanetAcid = sliderAcid.value();
 PlanetAtmo = sliderAtmo.value()/100; 
  //Planet Atmo range = 0 to 1
PlanetCloud = sliderCloud.value();
  PlanetTerra = sliderTerra.value()/1000;

let PlanetR = map( PlanetTemp, -255, 255, 0, 245);
let PlanetB = map( PlanetTemp, -255, 255, 245, 0);
let PlanetG = map (PlanetAcid, 0, 255, 0, 225);


  //
  ClusterCount = round(map(PlanetCloud, 0, 255, 0, 10));
  
if (ClusterCount !== LastClusterCount) {
  buildClouds();                   
  // rebuild only when the number changes
  LastClusterCount = ClusterCount;
}

  
  // ----------STAR SPAWNER!------------------
  for (let star of stars) {
    star.show();
    star.pulse();
  }

//---------Global Light System-----------
let SunCycle = - frameCount * UniversalNumber;
let SunSide = sin(SunCycle);
let SunDepth = cos(SunCycle);
let PlanetX = width/2;
let PlanetY = height / 1.8; 
  
  //Planet Rim
fill(PlanetR+150, PlanetG+150, PlanetB+150);  
circle(PlanetX, PlanetY, PlanetSize + SunDepth*-1);
  
  //planet
fill(PlanetR, PlanetG, PlanetB);
circle(PlanetX, PlanetY, PlanetSize);
  //refer to SliderSize for PlanetSize Cal.

  //Planet Light
  push();
    beginClip(); // Start defining the mask shape
 circle(PlanetX, PlanetY, PlanetSize); // The mask shape (a circle);
  endClip();   // End mask definition
  
noStroke();
  
let SunIntensity = map(SunDepth, -1, 1, 0.95, 0.85)
let Brightness = map(SunDepth, -1, 1, 1.1, 30)
  
 let PlanetLight = map(SunDepth, -1, 1, - PlanetSize, PlanetSize); 
fill(PlanetR * SunIntensity, PlanetG * SunIntensity, PlanetB * SunIntensity);
    circle(PlanetX, PlanetY, PlanetSize);

fill(PlanetR + Brightness, PlanetG + Brightness, PlanetB + Brightness);
    if (SunSide >= 0) {
      arc(PlanetX, PlanetY, PlanetSize, PlanetSize, -HALF_PI, HALF_PI);      // right half
    } else {
      arc(PlanetX, PlanetY, PlanetSize, PlanetSize, HALF_PI, PI + HALF_PI);  // left half
    }

   if (SunDepth > 0) {
      fill(PlanetR + Brightness, PlanetG + Brightness, PlanetB + Brightness);
    } else {
      fill(PlanetR * SunIntensity, PlanetG * SunIntensity, PlanetB * SunIntensity);
    }
    ellipse(PlanetX, PlanetY, abs(PlanetLight), PlanetSize);
  pop();
// The sun cycle section was created using Claude Sonnet5.5
  


WaveShrink= map(PlanetTerra, 0, 0.05, PlanetSize/8, -5);
  
  // ----------- PLANET SURFACE WAVE -----------
  push();
//Clipping Mask
  beginClip();
  circle(width / 2, height / 1.8, PlanetSize);
  endClip();

  //Stroke color
  stroke(PlanetR+10, PlanetG+10, PlanetB+10, 200);
  strokeWeight(PlanetSize/7 - WaveShrink);
  strokeCap(SQUARE);
  noFill();


  // WAVE SPAWN POINT (moves with the planet)
  let waveX = width / 2 - PlanetSize / 2;   // left edge of the planet
  let waveY = PlanetY;  // planet's vertical centre

  if (PlanetTerra > 0) { //only draws when the slider is more than 0
  //Custom Wave function
    beginShape();
  for (let i = -20; i < PlanetSize / 3.2 + 20; i++) {   // length now scales with planet
    let x = i * 3.2;
    let y = (waveY) + sin((x * PlanetTerra) + (frameCount * PlanetTerra)) *  PlanetSize/10 + PlanetTerra*100 ;
    vertex(waveX + x, y);
  }
  endShape();
  }
  pop();
 // console.log(PlanetTerra)
drawClouds(SunDepth);
  
 // -----------Draw Cloud Function-----
function drawClouds(SunDepth) {
  cloudGraphics.clear();

  //links to the rgba, show and drift
  for (let ci = 0; ci < cloudGroup.length; ci++) {
    cloudGroup[ci].r = PlanetR + PlanetCloud/1.5 ;
    cloudGroup[ci].g = PlanetG + PlanetCloud/1.5 ;
    cloudGroup[ci].b = PlanetB + PlanetCloud/1.5 ;
    cloudGroup[ci].a = PlanetCloud 
    cloudGroup[ci].show();
    cloudGroup[ci].cloudDrift();
  }
  let masked = cloudGraphics.get();
  masked.mask(planetMask);

  push();
  imageMode(CENTER);
  let CloudShade = map(SunDepth, -1, 1, 250, 255); // dim at night, bright in day
  tint(CloudShade);
  image(masked, width / 2, height / 1.8, PlanetSize, PlanetSize); // scaled to the slider
  pop();
}
  
  //atmosphere 1
  //map(value, start1, stop1, start2, stop2,)
  //value = sin(frameCount)


  let AMinSize = map(PlanetAtmo, 0, 1, PlanetSize, PlanetSize + PlanetSize/3);
let AMaxSize = map(PlanetAtmo, 0, 1, PlanetSize, PlanetSize + PlanetSize/2.5);

  let sizeA = map(sin(frameCount * 0.01), -1, 1, AMinSize,AMaxSize);

  fill(PlanetR+200, PlanetG+200, PlanetB+200, 50*PlanetAtmo);
  circle(PlanetX, PlanetY, sizeA);

  //atmosphere 2
  //atmosphere oscillation

  //Takes the minimum size of the atmosphere value of 0 to the planet size
let BMinSize = map(PlanetAtmo, 0, 1, PlanetSize, PlanetSize + PlanetSize/5);
let BMaxSize = map(PlanetAtmo, 0, 1, PlanetSize, PlanetSize + PlanetSize/4);
  let sizeB = map(sin(frameCount * 0.02), -1, 1, BMinSize, BMaxSize);

  fill(PlanetR+150, PlanetG+150, PlanetB+100, 70*PlanetAtmo);
  circle(PlanetX, PlanetY, sizeB );

  // ------------------GAME STATES--------------------------------------
  if (gameState === "home") {
    drawTitle();
    
  } else if (gameState === "playing") {
    
    controlPanel.show();
    controlPanel.style("opacity", silderOpactity);
    silderOpactity += 0.01;
  
    if (uiOpacity > 0) {
      uiOpacity = max(0, uiOpacity - 5); //fade out UI element
      drawTitle();
    
      startButton.style("opacity", uiOpacity / 255);

      if (uiOpacity === 0) {
        startButton.hide(); //hide button when opacity reaches 0
        

      }
    }
  }
}
//--------------------FUNCTIONS---------------------------------
function buildClouds() {
  cloudGroup = []; // wipe the old clouds first

  for (let csi = 0; csi < 3; csi++) {
    for (let ci = 0; ci < ClusterCount; ci++) {
      let cloudStagger = 8;
      let cloudDensity = 20;
      let cloudPos = random(50, 80) + csi * 100;
      let cloudWidth = random(60, 100);
      let cloudHeight = random(20, 40);
      let cloudCurve = 15;
      let cloudAlpha = 110;
      let cloudR = 255;
      let cloudG = 255;
      let cloudB = 255;
      let cloudMove = ci * cloudDensity + csi * cloudDensity * cloudStagger;

      cloudGroup.push(
        new Cloud(cloudMove, cloudPos, cloudWidth, cloudHeight, cloudCurve, cloudAlpha, cloudR, cloudG, cloudB)
      );
    }
  }
}
function drawTitle() {
  textFont("Etna, sans-serif");
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255, uiOpacity);
  text("PLANET", width / 2 - 150, height / 2 - 200);

  textFont("Etna, sans-serif");
  textAlign(CENTER, CENTER);
  textSize(150);
  fill(255, uiOpacity);
  text("MAKER", width / 2 + 85, height / 2 - 120);
}

function ButtonSelect() {
  startButton.style("background-color", "#191818");
  startButton.style("color", "#fcfcfc");
}

function ButtonNormal() {
  startButton.style("background-color", "#fcfcfc");
  startButton.style("color", "#191818");
}

function keyPressed() {
  // Press 's' or 'S' to save a screenshot named 'myCanvas.png'
  if (key === 's' || key === 'S') {
    saveCanvas('myPlanet', 'png');
  }
}

//-------MUSIC FUNCTIONS----------------

function updateSound() {
  const minS = height / 16, maxS = height / 1.35;   // same range as sliderSize

  //SIZE -> tempo and pitch of everything (big = slower and lower)
  sizeTempo = map(sliderSize.value(), minS, maxS, 1.6, 0.6);
  sizePitch = round(map(sliderSize.value(), minS, maxS, SIZE_PITCH_RANGE, -SIZE_PITCH_RANGE));

  //TEMPERATURE controls tempo of drums
  tempTempo = map(sliderTemp.value(), -255, 255, 0.5, 2);

  //  -> ambience pitch
  const atmoPitch = round(map(sliderAtmo.value(), 0, 100, -ATMO_PITCH_RANGE, ATMO_PITCH_RANGE));
  if (ambienceLoaded) {
    ambience.rate(semitonesToRate(sizePitch + atmoPitch));
  }

  //TERRAIN controls drum pitch
  drumRate = map(sliderTerra.value(), 0, 50, 0.7, 1.8) * semitonesToRate(sizePitch);

  //ACIDITY controls the synth in
  const acid = sliderAcid.value();
 if (acid < 64) {
  synthWave = 'sine';
} else if (acid < 128) {
  synthWave = 'triangle';
} else if (acid < 192) {
  synthWave = 'square';
} else {
  synthWave = 'sawtooth';
}

  //CLOUDS -> synth pitch (in scale steps) and volume (from cloud count)
  const clouds = round(map(sliderCloud.value(), 0, 255, 0, 10));
  synthSteps = round(map(sliderCloud.value(), 0, 255, 0, 6));
  synthVol = map(clouds, 0, 10, SYNTH_MIN_VOL, SYNTH_MAX_VOL);
  if (synthWave === 'sawtooth') synthVol *= 0.6;   // saw is much harsher
}

function playDrums() {
  if (bassDrumLoaded) {
    bassDrum.play(0, drumRate, DRUM_VOL);
  }
  nextDrumTime += drumInterval;
}

function playMusic() {
  const degree = floor(random(notes.length)) + synthSteps;
  const note = noteFromDegree(degree) + sizePitch;

  music.setType(synthWave);
  music.freq(midiToHertz(note));
  music.amp(synthVol, 0.15);
  setTimeout(() => music.amp(0, 0.6), noteLength / sizeTempo);

  nextNoteTime = noteTimer + noteLength + random(gapMin, gapMax);
}

async function startGame() {
  gameState = "playing";

  try {
    await userStartAudio();
    audioUnlocked = true;
    startAudioIfReady();
  } catch (error) {
    console.error("Could not start audio", error);
  }
}

function startAudioIfReady() {
  if (!audioUnlocked || gameState !== "playing") return;

  if (!startMusic) {
    music.start();

    startMusic = true;
    noteTimer = 0;
    drumTimer = 0;
    nextNoteTime = 0;
    nextDrumTime = 0;
  }

  if (ambienceLoaded && !ambienceStarted) {
    ambience.loop(0, 1, AMBIENCE_VOL);
    ambienceStarted = true;
    console.log("Ambience playing");
  }
}



//---------------------------CLASSES----------------------------------------------------
class Star {
  //star's constructor = feature list
  constructor(x, y, size, starCol) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.starCol = starCol;
    this.starPulse = random(0.01, 0.05); //blinking speed
  }

  //runs when Star.show is called
  show() {
    fill(this.starCol);
    ellipse(this.x, this.y, this.size);
  }

  //Star.pulse runs when Star.show is called
  pulse() {
    this.size += this.starPulse;

    //determine range of pluse
    if (this.size >= 3 || this.size <= 0.3) {
      this.starPulse *= -1;
    }
  }
}

//-------------CLASS: CLOUD--------------
class Cloud {
  constructor(x, y, wd, ht, radi,a,r,g,b) {
    this.x = x;
    this.y = y;
    this.wd = wd;
    this.ht = ht;
    this.radi = radi;
    this.a = a;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  // Visual display (What is a cloud)
  show() {
    cloudGraphics.fill(this.r,this.g,this.b, this.a);
    cloudGraphics.rect(this.x, this.y, this.wd, this.ht, this.radi);
  }

  cloudDrift() {
    this.x= this.x + map(PlanetCloud, 0, 255, 0.3, 10); 
    if (this.x > cloudGraphics.width) {
      this.x = -this.wd; //re-enter from left edge
    }
  }
}