# DM2008 — Programming for Interaction

This repository contains all materials, templates, and examples for **DM2008: Programming for Interaction**.  
It serves as the single reference point for in-class activities, demos, and code templates throughout the semester.

> **⚠️ This is the Materials Repo. This is _not_ your submission repo template.**
>
> This repo is **read-only** course content maintained by your instructors. You will **not** submit work here.  
> For submitting and tracking your own work, use your personal **Student Mono-Repo** (set up in Week 7).

---

## 📁 Repository Structure

### `weekly_lessons/`

Weekly folders containing class demos, examples and activities.

Each week corresponds to a topic covered in class:
| Folder | Focus |
|---------|--------|
| `week_01` | Introduction to Creative Coding and p5.js |
| `week_02` | Conditionals and Loops |
| `week_03` | Arrays and Functions |
| `week_04` | Object-Oriented Programming (Part 1) |
| `week_05` | Object-Oriented Programming (Part 2) |
| `week_06` | Media Loading |
| `week_07` | Local Tooling (Student Repo Template) |
| `week_08` | Arduino Basics |
| `week_09` | Sensor to Screen (Sensor Jam Template) |
| `week_10` | Interface Design |

Within each week, you'll find folders for specific **activities**, **readings**, or **mini-projects** used during class. For some weeks, you may find fully implemented **demos** for you to experiment with, explore, and learn from.

---

### `starter_templates/`

Clean, ready-to-use project templates for your own sketches.

- **p5-only/** → simple browser-based sketches
- **p5-arduino/** → template that includes serial communication setup between Arduino and p5.js

The folder includes a [`README.md`](https://github.com/jo-kapi/DM2008-Materials/tree/main/starter_templates) explaining how to use and modify the templates.

---

### `weekly_lessons/libraries/`

Local copies of required p5.js libraries for offline use:

- `p5.min.js`
- `p5.sound.min.js`
- `p5.webserial.js`

These are included and individually linked within the starter templates that require them.

---

### `LICENSE`

Contains licensing information for instructional use.  
All original teaching materials © jo+kapi | Nanyang Technological University, Singapore.

## 🧭 How to Use

You can access the course materials in three ways:

### Option 1 — Using GitHub Desktop (recommended for beginners)

1. Open **GitHub Desktop**.
2. Click **File → Clone Repository → URL**.
3. Paste this link:

`https://github.com/jo-kapi/DM2008-Materials.git`

4. Choose where to save the folder on your computer (e.g., `Documents/DM2008/`).
5. Click **Clone**.
6. Once cloned, open the folder in **VS Code** and use **Live Server** to preview sketches in the browser.

> 🪄 From Week 7 onward, you'll also set up your own **Student Mono-Repo** — a separate personal repo where you commit and submit your work. That is a **different repo** from _this_ one.

---

### Option 2 — Using Command Line (for those comfortable with Terminal)

```bash
git clone https://github.com/jo-kapi/DM2008-Materials.git
```

Then open the cloned folder in **VS Code**:

```bash
cd DM2008-Materials
code .
```

Launch **Live Server** to preview sketches in your browser.

---

### Option 3 — Downloading as a ZIP (no Git required)

1. Go to [github.com/jo-kapi/DM2008-Materials](https://github.com/jo-kapi/DM2008-Materials).
2. Click the green **Code** button near the top right.
3. Select **Download ZIP**.
4. Unzip the downloaded file and open the folder in **VS Code**.

> ⚠️ Note: Downloading as a ZIP gives you a snapshot of the repo. You won't be able to pull future updates automatically — use Options 1 or 2 if you want to stay in sync.

---

## 🧩 Tooling Overview

- **Editor:** VS Code + Live Server
- **Version Control:** GitHub Desktop
- **Libraries:** p5.js, p5.sound, p5.webserial
- **Physical Computing:** Arduino Uno (Weeks 8–9)
- **AI Assistants:** ChatGPT, Claude, or GitHub Copilot (introduced mid-semester)

## 📚 References

- _Getting Started with p5.js_ — McCarthy, Reas, Fry (O'Reilly, 2015)
- _The Nature of Code_ — Daniel Shiffman (No Starch Press, 2024)
- _Code as a Creative Medium_ — Levin & Brain (MIT Press, 2021)

## 🧑‍🏫 About This Course

**DM2008: Programming for Interaction** introduces coding as a creative practice for interaction & game designers.
You'll learn to think computationally, experiment fearlessly, and build interactive experiences that connect screen, sound, and sensor.

The course emphasizes:

- Playful experimentation
- Confidence through process and iteration
- Embracing debugging and "productive confusion" as part of learning

The accompanying slides to this course can be [viewed here](https://slides.com/kapilan-naidu/dm2008-ay-2627/fullscreen).

---

© jo+kapi | Nanyang Technological University, Singapore

For teaching and learning purposes only.
