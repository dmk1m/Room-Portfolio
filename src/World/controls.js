import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Experience from '../Experience/experience.js';
import { prefersReducedMotion } from '../Utils/motion.js';
import { DESKTOP_QUERY, MOBILE_QUERY } from '../Utils/size.js';

GSAP.registerPlugin(ScrollTrigger);

// With reduced motion, scroll-linked animations follow the scrollbar exactly
// instead of easing behind it.
const SCRUB = prefersReducedMotion() ? true : 0.6;

/** A scrubbed timeline that plays while `trigger` scrolls through the viewport. */
function scrubTimeline(trigger, { start = 'top top', end = 'bottom bottom' } = {}) {
  return GSAP.timeline({
    scrollTrigger: { trigger, start, end, scrub: SCRUB, invalidateOnRefresh: true },
  });
}

function scaleTo(value) {
  return { x: value, y: value, z: value };
}

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.floor = this.experience.world.floor;

    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;

    document.querySelector('.page').style.overflow = 'visible';
    if (!prefersReducedMotion()) this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setSmoothScroll() {
    // Lenis only smooths wheel scrolling; touch devices keep native scrolling.
    this.lenis = new Lenis({ lerp: 0.1 });
    this.lenis.on('scroll', ScrollTrigger.update);
    GSAP.ticker.add((time) => this.lenis.raf(time * 1000));
    GSAP.ticker.lagSmoothing(0);
  }

  setScrollTrigger() {
    const mm = GSAP.matchMedia();
    const cameraPosition = this.camera.orthographicCamera.position;
    const floorPosition = this.floor.plane.position;

    mm.add(DESKTOP_QUERY, () => {
      this.room.scale.set(1, 1, 1);
      floorPosition.y = -0.25;

      scrubTimeline('.first-move').to(this.room.position, {
        x: () => this.sizes.width * -0.0014,
      });

      scrubTimeline('.second-move')
        .to(this.room.position, { x: 0.9, z: () => this.sizes.height * 0.0035 }, 'sync')
        .to(this.room.scale, scaleTo(3), 'sync')
        .to(floorPosition, { y: -0.8 }, 'sync');

      scrubTimeline('.third-move').to(cameraPosition, { y: -2.5, x: 6 });
    });

    mm.add(MOBILE_QUERY, () => {
      this.room.scale.set(0.6, 0.6, 0.6);
      this.room.position.set(0, 0, 0);

      scrubTimeline('.first-move').to(this.room.scale, scaleTo(0.6));

      scrubTimeline('.second-move')
        .to(this.room.scale, scaleTo(2.5), 'sync')
        .to(this.room.position, { x: -1.8, y: 0.5 }, 'sync')
        .to(floorPosition, { y: -1.2 }, 'sync');

      scrubTimeline('.third-move', { end: 'bottom top' }).to(cameraPosition, { y: -1.8 });
    });

    mm.add('all', () => {
      this.setSectionAnimations();

      // Coloured circles grow under the room for each section
      scrubTimeline('.first-move').to(this.floor.circleFirst.scale, scaleTo(3));

      scrubTimeline('.second-move')
        .to(this.floor.circleSecond.scale, scaleTo(3), 'circle')
        .to(this.room.position, { y: 0.3 }, 'circle');

      scrubTimeline('.third-move')
        .to(this.floor.circleThird.scale, scaleTo(3), 'circle')
        .to(this.room.position, { y: 0.3 }, 'circle');

      // Outdoor area slides out and its props pop in
      const c = this.roomChildren;
      const outdoors = scrubTimeline('.third-move', { start: 'center center' });
      outdoors.to(c.outside.position, { x: 0.8, z: 1.5, duration: 1 });
      for (const child of [
        c.mailbox,
        c.lamp,
        c.outsidecarpet,
        c.outsidecarpet1,
        c.outsidecarpet2,
        c.outsidecarpet3,
      ]) {
        outdoors.to(child.scale, { ...scaleTo(1), ease: 'back.out(2)', duration: 0.5 });
      }
    });
  }

  setSectionAnimations() {
    document.querySelectorAll('.section').forEach((section) => {
      const progressWrapper = section.querySelector('.progress-wrapper');
      const progressBar = section.querySelector('.progress-bar');
      const side = section.classList.contains('right') ? 'Left' : 'Right';

      // Round the section's inner corners as it enters and leaves
      GSAP.to(section, {
        [`borderTop${side}Radius`]: 10,
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: SCRUB },
      });
      GSAP.to(section, {
        [`borderBottom${side}Radius`]: 700,
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: SCRUB,
        },
      });

      GSAP.from(progressBar, {
        scaleY: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          pin: progressWrapper,
          pinSpacing: false,
        },
      });
    });
  }
}
