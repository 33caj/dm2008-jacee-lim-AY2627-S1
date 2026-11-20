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


//Regarding the sound system, we used Claude to help restructure and rewire the original code built by Soon Yu

// ----PRESETUP: SOUND SYSTEM STEP: 1 ----------------------------------

//---PRESETUP: THE SOUNDS------
let buttonSFX; 
let sunSFX;                  
let ambience;               
let bassDrum;   //heartbeat sound            
let synth;               
let synth2;             
let winds;               

//------PRESETUP: True/False FLAGS-------------------------
let bassDrumLoaded = false;
let ambienceLoaded = false;
let ambienceStarted = false;
let sunStarted = false;
let audioUnlocked = false;   // browsers need a click before sound works
let startMusic = false;      // true once the synth + drums are running
let windsLoaded = false;
let windsStarted = false;
let buttonLoaded = false;

//---PRESETUP: TIMERS--------------------------
let stepTimer = 0;           // ONE clock drives both the drums and the synth
let nextStepTime = 0;
let stepCount = 0;           // which step of the beat we're on
let noteOffTimeout;          // so an old note-off can't cut a new note short
let pattern = [];            // the repeating melody: scale degrees, or null = rest

//---PRESETUP: VALUES THE SLIDERS CHANGE (updated every frame in updateSound)------
let sizePitch = 0;           // semitone shift for everything   (from MAGNITUDE)
let sizeTempo = 1;           // speed of everything             (from MAGNITUDE)
let tempTempo = 1;           // extra drum speed                (from TEMPERATURE)
let drumRate = 1;            // drum pitch                      (from TERRAIN + size)
let synthWave = 'sine';      // synth wave shape                (from ACIDITY)
let synthWave2 = 'sine';     // the wave being blended in
let synthMix = 0;            // 0 = only synthWave, 1 = only synthWave2
let synthSteps = 0;          // synth scale steps up            (from WEATHER)
let synthVol = 0.1;          // synth volume                    (from WEATHER + ACIDITY)

//---SETTINGS YOU CAN TWEAK------
const notes = [60, 62, 64, 67, 69]; //C major pentatonic (midi numbers), in order so octaves stack cleanly
const drumInterval = 800;       // ms per drum beat (before size/temperature speed changes)
const STEPS_PER_BEAT = 2;       // 2 = synth can land on the beat AND the off-beat
const SYNTH_EVERY = 2;          // synth plays every Nth step: 1 = fastest, 2 = half speed, 3 = a third, etc.
const PATTERN_LENGTH = 8;       // steps in the repeating phrase (8 steps = 4 beats)
const MUTATE_CHANCE = 0.25;     // chance per loop that ONE note in the phrase changes
const CHORD_DEGREES = [0, 2, 3]; // root, 3rd, 5th: the notes that sound "settled" on the beat
const NOTE_LENGTH = 0.8;        // fraction of a step that the note rings

//----------_VOLUME CONSTANTS----------------------
const SUN_VOL_MIN = 0.05;   
const SUN_VOL_MAX = 0.2;  
const DRUM_VOL = 0.3;          // keep sum of drum ambience and synth max under 1.0 otherwise ears die
const AMBIENCE_VOL = 0.3;
const SYNTH_MAX_VOL = 0.2;
const SYNTH_MIN_VOL = 0.03;    
const SIZE_PITCH_RANGE = 5;    // semitones: big planet = -5, small = +5
const ATMO_PITCH_RANGE = 3; 
const WINDS_PITCH_RANGE = 4;   // semitones: no clouds = -4, max clouds = +4 (on top of size)
const WINDS_VOL_MIN = 0.05;    // winds never go fully silent once started
const WINDS_VOL_MAX = 0.3;     // volume at max clouds
const BUTTON_VOL = 0.5;
const WAVE_GAIN = {            // per-wave volume: square is the harsh one in the middle of the acid slider
  sine: 1,
  triangle: 0.9,
  square: 0.4,
  sawtooth: 0.5
};
const ACID_DUCK_MIN = 0.35;    // synth volume multiplier at max acidity (1 = no reduction)

//-----------------SETUP-----------------
async function setup() {
  document.head.insertAdjacentHTML("beforeend", `
<style>
  input[type=range] {
    -webkit-appearance: none;
    background: transparent;
    filter: drop-shadow(0 0 6px rgb(108, 218, 243));
  }
  input[type=range]::-webkit-slider-runnable-track {
    height: 4px;
    background: linear-gradient(to right, #fff var(--val, 0%), rgba(255,255,255,0.15) var(--val, 0%));
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }
</style>`); //claude suggested this, it adds a glowing effect to the slider track, and makes the circle thumb invisible


  createCanvas(windowWidth, windowHeight);
  noStroke();
  loadFont(
    "assets/Etna.ttf",
    (font) => { fontA = font; },
    
  );


  //--------Control Panel------------------------------------------
  //Control Panel section was built manually

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
sliderAcid = createSlider(0, 255, random(100)); //Fixed to 100 as it will always look reddish (aesthetic)
sliderAcid.parent (controlPanel);   
sliderAcid.size(120);
  
//Ctrl Panel > Atmosphere: 0 - 100
 MAtmo = createP("ATMOSPHERE");
MAtmo.parent (controlPanel);
MAtmo.style("margin", "0");
MAtmo.style('padding-left', '12px');
MAtmo.style('padding-top', '4px'); 
sliderAtmo = createSlider(0, 100, random(100));
sliderAtmo.parent (controlPanel); 
sliderAtmo.size(120);

    //Ctrl Panel > Terrain - 0 to 50
MTerra = createP("TERRAIN");
MTerra.parent (controlPanel);
MTerra.style("margin", "0");
MTerra.style('padding-left', '12px');
MTerra.style('padding-top', '4px'); 
sliderTerra = createSlider(0, 50, 0); //start with 0 to add sense of discovery
sliderTerra.parent (controlPanel); 
sliderTerra.size(120);

  //Ctrl Panel > Clouds: 0-255
MCloud = createP("WEATHER");
MCloud.parent (controlPanel);
MCloud.style("margin", "0");
MCloud.style('padding-left', '12px');
MCloud.style('padding-top', '4px'); 
sliderCloud = createSlider(0, 255, 0); //start with 0 to add sense of discovery
sliderCloud.parent (controlPanel); 
sliderCloud.size(120);

    //Ctrl Panel 'SAVE'
MSave = createP("Press S to Save");
MSave.parent (controlPanel);
MSave.style("margin", "0");
MSave.style('padding-left', '18px');
MSave.style('padding-top', '10px'); 

  // click sound when the mouse presses down on any slider
  for (let s of [sliderSize, sliderTemp, sliderAcid, sliderAtmo, sliderTerra, sliderCloud]) {
    s.elt.addEventListener("pointerdown", playClick);
  }

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

  //---------------------------SETUP: SYNTH----------------------------------------------------
   synth = new p5.Oscillator();
   synth.setType('sine'); //this is adjustable later, maybe under dropdown
  synth.amp(0);
  synth2 = new p5.Oscillator();
synth2.setType('sine');
synth2.amp(0);

  loadAudio(); 

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
    stepTimer += dt * sizeTempo * tempTempo;

    if (stepTimer >= nextStepTime) playStep();
  }

  //Deep space Background
BGColA = color("#080425")
BGColB = color(10, 35, 80); 
let BGColSwap = map(UniverseCycle, -1, 1, 0, 1);
let currentColor = lerpColor(BGColA, BGColB, BGColSwap);

// sunSFX volume follows the background: A = soft, B = loud
if (sunSFX) {
  sunSFX.amp(lerp(SUN_VOL_MIN, SUN_VOL_MAX, BGColSwap));
}


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
    cloudGroup[ci].r = PlanetR + PlanetCloud/1.2 ;
    cloudGroup[ci].g = PlanetG + PlanetCloud/1.2 ;
    cloudGroup[ci].b = PlanetB + PlanetCloud/1.2 ;
    cloudGroup[ci].a = min(255, PlanetCloud + map(PlanetAcid, 0, 255, 0, 120));
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

  for (let s of [sliderSize, sliderTemp, sliderAcid, sliderAtmo, sliderTerra, sliderCloud]) {
  let pct = map(s.value(), Number(s.elt.min), Number(s.elt.max), 0, 100);
  s.elt.style.setProperty("--val", pct + "%");
  // claude suggested this, it tells the CSS to make the slider track fill up with the glowing color as you move the slider
  }

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
  startButton.style(
  "text-shadow", "0 0 5px #fff, 0 0 10px rgb(159, 241, 241), 0 0 25px #0ff");
}

function ButtonNormal() {
  startButton.style("background-color", "#fcfcfc");
  startButton.style("color", "#191818");
  startButton.style("text-shadow", "none");
}

function keyPressed() {
  // Press 's' or 'S' to save a screenshot named 'myCanvas.png'
  if (key === 's' || key === 'S') {
    saveCanvas('myPlanet', 'png');
  }
}

function playClick() {
  if (buttonLoaded) {
    buttonSFX.amp(BUTTON_VOL);
    buttonSFX.play();
  }
}

//=====================================================
//  SOUND PART 2: ALL THE SOUND FUNCTIONS
//  Read top to bottom: convert -> load -> start -> sliders -> play
//=====================================================

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

//-------STEP 1: LOAD THE FILES (called from setup)---------------
async function loadAudio() {
  // wraps loadSound so a missing/misspelled file logs a clear error
  // instead of silently stopping the whole chain
  const load = async (path) => {
    try {
      return await loadSound(path);
    } catch (e) {
      console.error("FAILED TO LOAD:", path, e);
      return null;
    }
  };

  // click sound first, so it's ready for the START button
  buttonSFX = await load("assets/Button.wav");
  buttonLoaded = !!buttonSFX;

  sunSFX = await load("assets/Sun.wav");

  bassDrum = await load("assets/HeartbeatSoundOnce.mp3");
  bassDrumLoaded = !!bassDrum;

  ambience = await load("assets/ambience.mp3");
  ambienceLoaded = !!ambience;

  winds = await load("assets/Winds.mp3");   // filename is case-sensitive on most hosts
  windsLoaded = !!winds;
  console.log("winds loaded:", windsLoaded);

  startAudioIfReady(); // in case START was pressed while files were still loading
}

//-------STEP 2: START BUTTON PRESSED---------------
async function startGame() {
  gameState = "playing";

  await userStartAudio();   // browsers block sound until a click
  audioUnlocked = true;
  playClick();
  startAudioIfReady();
}

//-------STEP 3: START THE SOUNDS (only once START is pressed AND files are loaded)---------------
function startAudioIfReady() {
  if (!audioUnlocked || gameState !== "playing") return;

  // synth + drums start their timers
  if (!startMusic) {
    synth.start();
    synth2.start();
    startMusic = true;
    stepTimer = 0;
    nextStepTime = 0;
    stepCount = 0;
    buildPattern();
  }

  // sun loops forever (its volume is set in draw)
  if (sunSFX && !sunStarted) {
    sunSFX.loop();
    sunSFX.play();
    sunStarted = true;
  }

  // ambience loops forever
  if (ambienceLoaded && !ambienceStarted) {
    ambience.amp(AMBIENCE_VOL);
    ambience.play();
    ambience.loop();
    ambienceStarted = true;
  }

    // winds loop forever (volume is set in updateSound from the clouds slider)
  if (windsLoaded && !windsStarted) {
    winds.amp(WINDS_VOL_MIN);
    winds.play();   // same pattern as ambience, which you know works
    winds.loop();
    windsStarted = true;
    console.log("winds started");
  }
}

//-------STEP 4: SLIDERS -> SOUND VALUES (runs every frame from draw)---------------
function updateSound() {
  const minS = height / 16, maxS = height / 1.35;   // same range as sliderSize

  //SIZE -> tempo and pitch of everything (big = slower and lower)
  sizeTempo = map(sliderSize.value(), minS, maxS, 1.3, 0.8);
  sizePitch = round(map(sliderSize.value(), minS, maxS, SIZE_PITCH_RANGE, -SIZE_PITCH_RANGE));

  //TEMPERATURE controls tempo of drums
  tempTempo = map(sliderTemp.value(), -255, 255, 0.75, 1.4);

  //ATMOSPHERE -> ambience pitch (on top of size)
  const atmoPitch = round(map(sliderAtmo.value(), 0, 100, -ATMO_PITCH_RANGE, ATMO_PITCH_RANGE));
  if (ambienceLoaded) {
    ambience.rate(semitonesToRate(sizePitch + snapToKey(atmoPitch)));
  }

  //TERRAIN controls drum pitch
  drumRate = map(sliderTerra.value(), 0, 50, 1, 3) * semitonesToRate(sizePitch);

 
 //ACIDITY blends between wave shapes: sine -> triangle -> square -> sawtooth
 const waves = ['sine', 'triangle', 'square', 'sawtooth'];
 const wavePos = map(sliderAcid.value(), 0, 255, 0, 3);
 const waveIndex = floor(wavePos);
 synthWave = waves[waveIndex];
 synthWave2 = waves[min(waveIndex + 1, 3)];
 synthMix = wavePos - waveIndex;   // how far we are toward the next wave


  //CLOUDS -> synth pitch (in scale steps) and volume (from cloud count)
  const clouds = round(map(sliderCloud.value(), 0, 255, 0, 10));
  synthSteps = round(map(sliderCloud.value(), 0, 255, 0, 4));

  //ACIDITY -> harsher waves are louder, so turn the synth down as acid rises
  const acidDuck = map(sliderAcid.value(), 0, 255, 1, ACID_DUCK_MIN);
  synthVol = map(clouds, 0, 10, SYNTH_MIN_VOL, SYNTH_MAX_VOL) * acidDuck;
  
  //CLOUDS -> winds volume (min at 0 clouds, max clouds = WINDS_VOL_MAX)
  if (windsLoaded && windsStarted) {
    winds.amp(map(sliderCloud.value(), 0, 255, WINDS_VOL_MIN, WINDS_VOL_MAX), 0.1);

    //SIZE + WEATHER -> winds pitch (big planet = lower, stormier = higher)
    const windPitch = round(map(sliderCloud.value(), 0, 255, -WINDS_PITCH_RANGE, WINDS_PITCH_RANGE));
    winds.rate(semitonesToRate(sizePitch + snapToKey(windPitch)));
  }


}

//-------STEP 5: PLAY (called from draw when the timers are up)---------------

//-------MELODY: a short repeating phrase instead of random notes---------------
//beats get "settled" chord notes, off-beats get any scale note or a rest
function randomSlot(i) {
  const strong = i % 2 === 0;   // every other note of the phrase is a "settled" one
  if (strong) return random() < 0.9 ? random(CHORD_DEGREES) : null;
 return random() < map(sliderTemp.value(), -255, 255, 0.2, 0.9) ? floor(random(notes.length)) : null;
}
// A,B,A,B,A,B,A,C melody structure

function buildPattern() {
 pattern = [0, null, 3, null, null, 1, null, null];
}
//keeps extra pitch shifts on notes of the scale so other sounds stay in key with the synth
const KEY_OFFSETS = [-12, -10, -8, -5, -3, 0, 2, 4, 7, 9, 12];
function snapToKey(semitones) {
  let best = 0;
  for (const o of KEY_OFFSETS) {
    if (abs(o - semitones) < abs(best - semitones)) best = o;
  }
  return best;
}

//one step of the shared beat: drums on the beat, synth locked to the same grid
function playStep() {
  const onBeat = stepCount % STEPS_PER_BEAT === 0;

  if (onBeat) playDrums();

  // once per loop, sometimes change one note so the phrase slowly evolves
  // the synth only moves forward on every SYNTH_EVERY-th step, so it's slower than the grid
  if (stepCount % SYNTH_EVERY === 0) {
    const slot = (stepCount / SYNTH_EVERY) % PATTERN_LENGTH;
    if (slot === 0 && stepCount > 0 && random() < map(sliderTemp.value(), -255, 255, 0.05, 1)) {
      const i = 1 + floor(random(PATTERN_LENGTH - 1));   // never touch the first note
      pattern[i] = randomSlot(i);
    }

    if (pattern[slot] !== null) playSynth(pattern[slot]);
  }

  stepCount++;
  nextStepTime += drumInterval / STEPS_PER_BEAT;
}

function playDrums() {
  if (bassDrumLoaded) {
    bassDrum.amp(map(sliderSize.value(), height / 16, height / 1.35, 0.2, 0.5));
    bassDrum.rate(drumRate);
    bassDrum.play();
  }
}


function playSynth(patternDegree) {
  const degree = patternDegree + synthSteps;
  const note = noteFromDegree(degree) + sizePitch;
  const hz = midiToHertz(note);

  // harsher waves get turned down (see WAVE_GAIN at the top)
  const gainA = WAVE_GAIN[synthWave] * (1 - synthMix);
  const gainB = WAVE_GAIN[synthWave2] * synthMix;

  synth.setType(synthWave);
  synth.freq(hz);
  synth.amp(synthVol * gainA, 0.15);

  synth2.setType(synthWave2);
  synth2.freq(hz);
  synth2.amp(synthVol * gainB, 0.15);

  // note length is a fraction of one step, so it follows the tempo
  const stepMs = (drumInterval / STEPS_PER_BEAT) * SYNTH_EVERY / (sizeTempo * tempTempo);
  clearTimeout(noteOffTimeout);
  noteOffTimeout = setTimeout(() => {
    synth.amp(0, 0.6);
    synth2.amp(0, 0.6);
  }, stepMs * NOTE_LENGTH);
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