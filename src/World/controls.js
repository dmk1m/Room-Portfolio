import GSAP from 'gsap';
import * as THREE from 'three';
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
    this.setScrollLayers();

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

  /**
   * Each scroll section moves the room through its own parent group, and the
   * groups' offsets add up. If two sections animated room.position directly,
   * a fast jump (Home key, scrollbar drag) updates both in the same frame and
   * whichever writes last wins, leaving the room in the wrong place.
   */
  setScrollLayers() {
    const scene = this.experience.scene;
    this.firstLayer = new THREE.Group();
    this.secondLayer = new THREE.Group();
    scene.remove(this.room);
    this.secondLayer.add(this.room);
    this.firstLayer.add(this.secondLayer);
    scene.add(this.firstLayer);
  }

  /**
   * One context for both layouts: whenever the window crosses the mobile
   * breakpoint, GSAP reverts every animation below and runs this again. Each
   * run starts by putting the scene back in its post-intro state, so the new
   * scroll animations never record a half-scrolled position as their start.
   */
  setScrollTrigger() {
    const mm = GSAP.matchMedia();
    mm.add({ isDesktop: DESKTOP_QUERY, isMobile: MOBILE_QUERY }, (context) => {
      const { isDesktop } = context.conditions;
      this.resetScene(isDesktop);
      this.setSectionAnimations();
      if (isDesktop) this.setDesktopAnimations();
      else this.setMobileAnimations();
      this.setSharedAnimations();
    });
  }

  /** Scene state right after the intro, before any scrolling. */
  resetScene(isDesktop) {
    const c = this.roomChildren;
    this.room.position.set(0, 0, 0);
    this.firstLayer.position.set(0, 0, 0);
    this.secondLayer.position.set(0, 0, 0);
    this.room.scale.setScalar(isDesktop ? 1 : 0.6);
    this.floor.plane.position.y = -0.25;
    this.camera.orthographicCamera.position.set(0, 2, 2);
    for (const circle of [this.floor.circleFirst, this.floor.circleSecond, this.floor.circleThird]) {
      circle.scale.setScalar(0);
    }
    c.outside.position.x = 0.003488;
    c.outside.position.z = 0.66505;
    for (const prop of this.outdoorProps()) prop.scale.setScalar(0);
  }

  outdoorProps() {
    const c = this.roomChildren;
    return [c.mailbox, c.lamp, c.outsidecarpet, c.outsidecarpet1, c.outsidecarpet2, c.outsidecarpet3];
  }

  setDesktopAnimations() {
    const camera = this.camera.orthographicCamera.position;

    const firstX = () => this.sizes.width * -0.0014;
    scrubTimeline('.first-move').to(this.firstLayer.position, { x: firstX });

    // Ends at x = 0.9 overall (first layer + second layer), as before
    scrubTimeline('.second-move')
      .to(
        this.secondLayer.position,
        { x: () => 0.9 - firstX(), y: 0.3, z: () => this.sizes.height * 0.0035 },
        'sync'
      )
      .to(this.room.scale, scaleTo(3), 'sync')
      .to(this.floor.plane.position, { y: -0.8 }, 'sync');

    scrubTimeline('.third-move').to(camera, { y: -2.5, x: 6 });
  }

  setMobileAnimations() {
    const camera = this.camera.orthographicCamera.position;

    scrubTimeline('.second-move')
      .to(this.room.scale, scaleTo(2.5), 'sync')
      .to(this.secondLayer.position, { x: -1.8, y: 0.3 }, 'sync')
      .to(this.floor.plane.position, { y: -1.2 }, 'sync');

    scrubTimeline('.third-move', { end: 'bottom top' }).to(camera, { y: -1.8 });
  }

  setSharedAnimations() {
    // Coloured circles grow under the room for each section
    scrubTimeline('.first-move').to(this.floor.circleFirst.scale, scaleTo(3));

    scrubTimeline('.second-move').to(this.floor.circleSecond.scale, scaleTo(3));
    scrubTimeline('.third-move').to(this.floor.circleThird.scale, scaleTo(3));

    // Outdoor area slides out and its props pop in
    const outdoors = scrubTimeline('.third-move', { start: 'center center' });
    outdoors.to(this.roomChildren.outside.position, { x: 0.8, z: 1.5, duration: 1 });
    for (const prop of this.outdoorProps()) {
      outdoors.to(prop.scale, { ...scaleTo(1), ease: 'back.out(2)', duration: 0.5 });
    }
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
