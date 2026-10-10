# Mini Project — Floppy Fish

---

### The Project
This project was made by Jacee and Isaac. We wanted to conceptualize flappy bird as a fish, as it gave us opportunity to play with the physics and artwork while still retaining the core mechanic of the game.

The original flappy bird had the pipe image reversed, but we wanted to explore in more depth on how image worked, so we chose stalagmites for the ceiling and corals at the bottom. All of the assets were made by Jacee.

We added in a start and home screen and an equivalent of a award/ point ranking system, instead of a medal, the player gets a fish pun as encouragement depending on the points scored.


---

### Output

![screenshot](readme-assets/screenshot-07.png)
![screenshot](readme-assets/screenshot-08.png)

<!-- Drop a screenshot or GIF of your finished project.
     Save it to a readme-assets/ folder inside this project folder.
     Got more than one good screenshot? Add them. -->

[Watch Online](https://youtube.com/shorts/IpTbBJ9JNMU?si=5DQzasM57MEJP4me)

<!-- Replace the link above with a URL to a screen recording or video of your project.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

### ✍️ Reflection

It was my first time coding a game which was intimidating, but having a teammate made it less daunting. At the start, we finalized the base game mechanics together in class, and it helped to talk through each line of code to have a better idea of what they did.

One helpful resource was p5.js's reference page. It assisted me in adding our first button (restart) with createButton(). I remember thinking that all we had to do was create the button in the setup function, but learned that we needed .show() to display the button in the gameover state and .hide() to remove it in the playing state. There were often more steps to take than I initially expected.

After that, we split up to work on the visuals and sound.

Regarding the visuals, we wanted to emulate retro games and pixel art. I like underwater themes, so I volunteered to work on the art. One challenge was knowing how to place individual pixels to convey shape and lighting. Isaac also introduced a technique called 'dithering' which helped create midtones for the water and made gradients which made it look more watery.

[BG progress pic 1](readme-assets/bg-01.jpg)
[BG progress pic 2](readme-assets/bg-02.png)
[BG progress pic 3](readme-assets/bg-03.png)
[final](readme-assets/final.png)

I mainly helped to integrate the visual assets into the game. 

Some challenges faced included understanding the scrolling background and how to make it loop. We learned to put two copies of the image side by side, and when the first moves fully off screen it jumps back by one image width, which makes the loop seamless.
The stalactite image was also flickering and stretching. We resolved this by having the image slightly larger than the hitbox.

This miniproject taught me that games are built on many small, connected steps, and that a feature is rarely finished when it first appears. It was really encouraging looking back at our progress. If I did it again, I would plan the visuals and the code structure together earlier, and I’d include a hard mode, with this hellish version of the bg I accidentally created while playing around with blend modes.

[hell version](readme-assets/hell.jpg)


<!-- 200–300 words on your process. Write freely — this isn't an essay.
     Some prompts to get you started:
     — What did you set out to make, and how did the result compare?
     — What inputs does your sketch respond to, and how did you approach that?
     — What was your biggest challenge, and how did you work through it?
     — What would you push further if you had more time? -->

### 🔗 References
[screenshot](readme-assets/reference-01.jpg)
[screenshot](readme-assets/reference-02.png)

     

  


     