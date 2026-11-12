# Starter Templates

This folder contains two ready-to-use project templates for your own sketches.  
Pick the one that matches what you're building, duplicate it, rename it, and start coding.

> **⚠️ Do not code directly inside these template folders.**
>
> Always **duplicate** the template and rename the copy before making any changes. This keeps the originals clean for future use.

---

## 📁 Templates Overview

| Folder        | Use When                                                              |
| ------------- | --------------------------------------------------------------------- |
| `p5-only/`    | You're building a browser-based sketch with no physical hardware      |
| `p5-arduino/` | You're connecting an Arduino to your sketch via Serial (p5.webserial) |

---

## 🎨 `p5-only/`

A clean starting point for any browser-based p5.js sketch.

### Folder Structure

```
p5-only/
├── index.html          ← Open this with Live Server to run your sketch
├── sketch.js           ← Your main p5.js code goes here
├── js/
│   ├── p5.min.js       ← p5.js library (do not edit)
│   ├── p5.sound.min.js ← p5.sound library (do not edit)
│   └── helper.js       ← Helper utilities (do not edit)
├── css/
│   ├── style.css       ← Customise page background colour and canvas shadow here
│   └── normalize.css   ← Browser reset styles (do not edit)
├── assets/
│   └── dog.jpg         ← Example asset — replace with your own
└── documentation/
    └── project-still-01.jpg ← For documenting your project (screenshots, stills)
```

### Getting Started

1. **Duplicate** the `p5-only/` folder and **rename** it to your project name.
2. Open the folder in **VS Code**.
3. Launch **Live Server** on `index.html` to preview your sketch in the browser.
4. Write your code in `sketch.js`.

### What's Included

| File / Folder        | Purpose                               | Notes                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sketch.js`**      | Your main p5.js code                  | Pre-set with `setup()`, `draw()`, and a 400×400 canvas. Change to `createCanvas(windowWidth, windowHeight)` for fullscreen.                                                                                           |
| **`helper.js`**      | Auto-resize and cursor-hide utilities | Auto-resizes fullscreen canvases on window resize. Hides the cursor after 5 seconds of inactivity. **Do not edit.**                                                                                                   |
| **`style.css`**      | Page and canvas styling               | Background color and canvas drop shadow are set as CSS variables at the top of the file — edit these to customise your page. This only affects the presentation when your canvas is set to specific pixel dimensions. |
| **`normalize.css`**  | Browser reset styles                  | Ensures consistent rendering across browsers. **Do not edit.**                                                                                                                                                        |
| **`assets/`**        | Your media files                      | Place images, sounds, or other media here. The included `dog.jpg` is a placeholder — delete or replace it.                                                                                                            |
| **`documentation/`** | Project documentation                 | Store screenshots or stills of your finished project here. The included `project-still-01.jpg` is a placeholder.                                                                                                      |

---

## 🔌 `p5-arduino/`

Everything in `p5-only/`, plus the setup needed to receive Serial data from an Arduino via USB.

> **⚠️ This template uses p5.webserial, which only works in Google Chrome.**
>
> Make sure you're using Chrome when running Arduino-connected sketches. Other browsers are not supported.

### Folder Structure

```
p5-arduino/
├── index.html          ← Open this with Live Server to run your sketch
├── sketch.js           ← Your main p5.js code goes here
├── js/
│   ├── p5.min.js       ← p5.js library (do not edit)
│   ├── p5.sound.min.js ← p5.sound library (do not edit)
│   ├── p5.webserial.js ← Serial communication library (do not edit)
│   └── helper.js       ← Helper utilities including Connect button (do not edit)
├── css/
│   ├── style.css       ← Customise page background colour and canvas shadow here
│   └── normalize.css   ← Browser reset styles (do not edit)
├── assets/
│   └── dog.jpg         ← Example asset — replace with your own
├── documentation/
│   └── project-still-01.jpg ← For documenting your project (screenshots, stills)
└── arduino/
    └── sketch/
        └── sketch.ino  ← Arduino sketch — upload this to your board
```

### Getting Started

1. **Duplicate** the `p5-arduino/` folder and **rename** it to your project name.
2. Open the folder in **VS Code**.
3. Open `arduino/sketch/sketch.ino` in the **Arduino IDE** and upload it to your board.
4. Launch **Live Server** on `index.html`.
5. Click the **Connect Arduino** button that appears in the browser to open the Serial port.
6. Write your p5.js code in `sketch.js`, using the incoming `serialData` variable.

### What's Different from `p5-only/`

| File / Folder                   | Purpose                                                | Notes                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*_`p5.webserial.js`_           | Serial communication between browser and Arduino       | Linked in `index.html`. **Chrome only.** Do not edit.                                                                                                   |
| **`sketch.js`**                 | Your main p5.js code, pre-configured for Serial        | See notes below.                                                                                                                                        |
| **`helper.js`**                 | All `p5-only/` utilities, plus Connect button handling | Injects a Connect Arduino button, updates its label on connection state changes, and fades it out after 5 seconds of mouse inactivity. **Do not edit.** |
| **`arduino/sketch/sketch.ino`** | Arduino sketch to upload to your board                 | See notes below.                                                                                                                                        |

#### `sketch.js` — things not to touch

- `port` and `createSerial()` are set up in `setup()` — **do not remove or rename `port`**.
- In `draw()`, incoming data is read with `port.readUntil("\n")` and stored in `serialData`.
- Use `float(serialData)` to convert the incoming string to a number before using it in calculations.
- `connectBtnClicked()` at the bottom handles opening and closing the port — **do not remove it**.

#### `sketch.ino` — getting started with real sensor data

- By default, the sketch sends a random number (0–1023) over Serial as a placeholder.
- Replace `random(1024)` with a real sensor read when you're ready.
- Make sure the baud rate in `.ino` matches `port.open()` in `sketch.js` — both are set to `9600` by default.

---

## 🧩 Libraries Reference

| Library           | Included In        | Purpose                                         |
| ----------------- | ------------------ | ----------------------------------------------- |
| `p5.min.js`       | Both templates     | Core p5.js library                              |
| `p5.sound.min.js` | Both templates     | Audio playback and analysis                     |
| `p5.webserial.js` | `p5-arduino/` only | Serial communication with Arduino (Chrome only) |

All libraries are bundled locally — no internet connection required.

---

© jo+kapi | Nanyang Technological University, Singapore  
For teaching and learning purposes only.
