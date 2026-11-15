const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;

/** Create an <img> or a muted looping <video> depending on the file type. */
export function createMedia(src, { alt = '', className = '' } = {}) {
  let element;
  if (VIDEO_EXTENSIONS.test(src)) {
    element = document.createElement('video');
    element.muted = true;
    element.loop = true;
    element.autoplay = true;
    element.playsInline = true;
    element.preload = 'metadata';
    element.setAttribute('aria-label', alt);
  } else {
    element = document.createElement('img');
    element.alt = alt;
    element.loading = 'lazy';
    element.decoding = 'async';
  }
  element.src = src;
  if (className) element.className = className;
  return element;
}
