import EventEmitter from 'events';
import GSAP from 'gsap';
import convertToSpan from '../Utils/convertDivsToSpans.js';
import { prefersReducedMotion } from '../Utils/motion.js';
import Experience from './experience.js';

/** Scale a room object from 0 up to full size. */
function popIn(timeline, object, { ease = 'back.out(2)', duration = 0.3, position } = {}) {
  return timeline.to(object.scale, { x: 1, y: 1, z: 1, ease, duration }, position);
}

/** Slide split-text characters (see convertToSpan) into view. */
function revealText(timeline, selector, { stagger = 0.05, position } = {}) {
  return timeline.to(
    `${selector} .animatedis`,
    { yPercent: -100, stagger, ease: 'back.out(1.5)' },
    position
  );
}

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on('switchdevice', (device) => {
      this.device = device;
    });

    this.world.on('world_ready', () => this.setAssets());
    // Start the intro only after the loading screen has faded out
    this.experience.loader.on('hidden', () => this.playIntro());
  }

  setAssets() {
    for (const selector of [
      '.intro-text',
      '.hero-main-title',
      '.hero-main-description',
      '.first-sub',
      '.second-sub',
    ]) {
      convertToSpan(document.querySelector(selector));
    }
    this.room = this.world.room.actualRoom;
    this.roomChildren = this.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      const c = this.roomChildren;
      this.timeline = GSAP.timeline();
      if (prefersReducedMotion()) this.timeline.timeScale(3);
      this.timeline
        .to(c.cube.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.7, ease: 'back.out(2.5)' })
        // Shift the cube aside to make room for the intro text
        .to(this.room.position, {
          ...(this.device === 'desktop' ? { x: -1 } : { z: -1 }),
          ease: 'power1.out',
          duration: 0.7,
        })
        .to('.intro-text .animatedis', {
          yPercent: -100,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          onComplete: resolve,
        })
        .to('.arrow-svg-wrapper', { opacity: 1 });
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      const c = this.roomChildren;
      const tl = (this.secondTimeline = GSAP.timeline());
      if (prefersReducedMotion()) tl.timeScale(3);

      // Hide intro text and morph the cube into the room
      tl.to('.intro-text .animatedis', { yPercent: 100, stagger: 0.05, ease: 'back.in(1.2)' })
        .to('.arrow-svg-wrapper', { opacity: 0 })
        .to(this.room.position, { x: 0, y: 0, z: 0, ease: 'power1.out' }, 'cube-animation')
        .to(c.cube.rotation, { y: 2 * Math.PI + Math.PI / 4, duration: 0.5 }, 'cube-animation')
        .to(c.cube.scale, { x: 10, y: 10, z: 10 }, 'cube-animation')
        .to(this.camera.orthographicCamera.position, { y: 2 }, 'cube-animation')
        .to(c.cube.position, { x: 0.000584, y: 1.26841, z: 0.484908 }, 'cube-animation')
        .to(c.cube.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, 'reveal');

      // Pop the furniture in, group by group
      popIn(tl, c.room, { ease: 'back.out(2.5)', duration: 0.5, position: 'reveal' });
      popIn(tl, c.bed, { ease: 'back.out(1.5)', position: 'primary' });
      popIn(tl, c.shelf, { position: 'primary' });
      popIn(tl, c.table, { ease: 'back.out(1.5)', position: 'primary' });
      popIn(tl, c.drawer, { position: 'medium' });
      popIn(tl, c.wall_shelf, { position: 'medium' });
      popIn(tl, c.shelf_items, { position: 'medium' });
      popIn(tl, c.laptop, { position: 'floor' });
      popIn(tl, c.paint, { position: 'paint' });
      popIn(tl, c.paint1, { position: 'paint' });
      popIn(tl, c.paint2, { position: 'paint' });
      popIn(tl, c.floor_items, { ease: 'back.out(1.5)', position: 'floor' });
      popIn(tl, c.mini_table, { position: 'items' });
      popIn(tl, c.mousepad);
      popIn(tl, c.peripherals, { position: 'items' });
      popIn(tl, c.monitor, { ease: 'back.out(1.5)' });
      popIn(tl, c.chair_top, { ease: 'back.out(1.5)', position: 'chair' });
      tl.to(
        c.chair_top.rotation,
        { y: 4 * Math.PI - Math.PI / 2, ease: 'power2.out', duration: 1 },
        'chair'
      );

      // Hero text
      revealText(tl, '.hero-main-title', { position: 'reveal' });
      revealText(tl, '.hero-main-description', { position: 'reveal' });
      revealText(tl, '.first-sub', { position: 'reveal' });
      revealText(tl, '.second-sub', { stagger: 0.07, position: 'reveal' });

      popIn(tl, c.outside, { ease: 'back.out(1.5)' });
      tl.to('.arrow-svg-wrapper', { opacity: 1, onComplete: resolve }).to(
        '.arrow-svg-wrapper',
        { opacity: 0, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
      );
    });
  }

  onTouch(event) {
    this.initialY = event.touches[0].clientY;
  }

  onTouchMove(event) {
    if (this.initialY == null) return;
    const difference = this.initialY - event.touches[0].clientY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  onScroll(event) {
    if (event.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onKeyDown(event) {
    if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(event.key)) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  addEventListeners() {
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    this.keyDown = this.onKeyDown.bind(this);
    window.addEventListener('wheel', this.scrollOnceEvent);
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.touchMove);
    window.addEventListener('keydown', this.keyDown);
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.scrollOnceEvent);
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.touchMove);
    window.removeEventListener('keydown', this.keyDown);
  }

  async playIntro() {
    this.scaleFlag = true;
    await this.firstIntro();
    this.moveFlag = true;
    this.addEventListeners();
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit('enableControls');
  }

  // Keep the room positioned/scaled for the current device while the
  // intro is waiting, so resizing the window doesn't break the layout.
  move() {
    if (this.device === 'desktop') {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    const s = this.device === 'desktop' ? 1 : 0.6;
    this.room.scale.set(s, s, s);
  }

  update() {
    if (this.moveFlag) this.move();
    if (this.scaleFlag) this.scale();
  }
}
