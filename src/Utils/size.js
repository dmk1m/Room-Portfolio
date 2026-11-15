import EventEmitter from 'events';

// Single source of truth for the mobile/desktop breakpoint.
// Widths at or below MOBILE_MAX_WIDTH use the mobile layout.
export const MOBILE_MAX_WIDTH = 968;
export const MOBILE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;
export const DESKTOP_QUERY = `(min-width: ${MOBILE_MAX_WIDTH + 1}px)`;

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.frustum = 5;
    this.update();
    this.device = this.getDevice();

    window.addEventListener('resize', () => {
      this.update();
      this.emit('resize');

      const device = this.getDevice();
      if (device !== this.device) {
        this.device = device;
        this.emit('switchdevice', device);
      }
    });
  }

  update() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  getDevice() {
    return window.matchMedia(MOBILE_QUERY).matches ? 'mobile' : 'desktop';
  }
}
