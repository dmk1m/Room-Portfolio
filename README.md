# Room Portfolio

## Project Overview

My portfolio is a 3D model of my bedroom, built in Blender and rendered live in the browser with Three.js. GSAP and ScrollTrigger drive the intro and the scroll-linked camera moves, Lenis handles smooth scrolling, and the laptop in the room plays a recording of one of my projects as a video texture. Inspired by the work of Boko33.

## Demo

![App Screenshot](./docs/welcome.png)

[Go to Web Demo (Cloudflare Server)](https://dmitriykim.ca)

[Go to Web Demo (Render Server)](https://room-portfolio-0tlu.onrender.com)


## Features

- [x] 3D model of my room in Blender
- [x] Assets imported into Three.js
- [x] Scene, lighting and orthographic camera setup
- [x] About me, my work and contact sections
- [x] Smooth scrolling
- [x] Intro animation and loader
- [x] Custom progress bar
- [x] Dialog boxes for each project
- [x] Mobile styling

## Used Libraries and Frameworks

[**Three.js**](https://threejs.org/): a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL.

[**Blender**](https://www.blender.org/): a free and open-source 3D computer graphics tool set used to model the room.

[**GSAP**](https://gsap.com/): a JavaScript animation library used for the intro and scroll-driven animations (with ScrollTrigger).

[**Lenis**](https://lenis.darkroom.engineering/): a lightweight smooth-scrolling library.

## Running Locally

```bash
npm install
npm run dev
```

Build for production with `npm run build` and preview the build with `npm run preview`.

## Screenshots

### Welcome View

![App Screenshot](./docs/welcome.png)

### About Me View

![App Screenshot](./docs/about.png)

### My Work

![App Screenshot](./docs/work.png)

### Contact

![App Screenshot](./docs/contact.png)