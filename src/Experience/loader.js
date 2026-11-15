import EventEmitter from 'events';
import Experience from './experience.js';
import { showFallback } from '../Utils/fallback.js';

// Don't let a slow/blocked font CDN hold the site hostage
const FONT_TIMEOUT_MS = 3000;
// Keep the bar at 100% briefly so the finish is visible
const FINISH_DELAY_MS = 300;
// Matches the .loader opacity transition in style.css
const FADE_MS = 600;

/**
 * Full-screen loading screen. Shows combined progress for the 3D model
 * and web fonts (videos load afterwards), then fades out and emits `hidden` once
 * the world is ready so the intro animation can start.
 */
export default class Loader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.element = document.querySelector('.loader');
    this.track = this.element.querySelector('.loader-track');
    this.bar = this.element.querySelector('.loader-bar');
    this.percent = this.element.querySelector('.loader-percent');

    this.assetProgress = 0;
    this.fontsReady = false;
    this.worldReady = false;
    this.failed = false;

    this.resources.on('progress', (progress) => {
      this.assetProgress = progress;
      this.render();
    });
    this.resources.on('error', () => this.showError());

    const fontTimeout = new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS));
    Promise.race([document.fonts?.ready, fontTimeout]).then(() => {
      this.fontsReady = true;
      this.render();
      this.tryHide();
    });

    this.world.on('world_ready', () => {
      this.worldReady = true;
      this.tryHide();
    });
  }

  get progress() {
    return this.assetProgress * 0.9 + (this.fontsReady ? 0.1 : 0);
  }

  render(value = this.progress) {
    if (this.failed) return;
    const percent = Math.round(value * 100);
    this.bar.style.transform = `scaleX(${value})`;
    this.percent.textContent = `${percent}%`;
    this.track.setAttribute('aria-valuenow', String(percent));
  }

  tryHide() {
    if (!this.fontsReady || !this.worldReady || this.failed || this.hiding) return;
    this.hiding = true;
    this.render(1);

    setTimeout(() => {
      this.element.classList.add('is-hidden');
      this.element.setAttribute('aria-busy', 'false');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        this.element.remove();
        document.documentElement.classList.remove('is-loading');
        this.emit('hidden');
      }, reduceMotion ? 0 : FADE_MS);
    }, FINISH_DELAY_MS);
  }

  showError() {
    this.failed = true;
    showFallback(
      "Sorry, the 3D room couldn't be loaded. Check your connection and refresh, or find me here:"
    );
  }
}
