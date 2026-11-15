const VIDEO_EXTENSIONS = /\.(mp4|webm)$/i;

// Videos only download and play while (nearly) on screen
const onScreen = new Set();
const videoObserver =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          for (const { target: video, isIntersecting } of entries) {
            if (isIntersecting) {
              onScreen.add(video);
              if (!video.src) video.src = video.dataset.src;
              video.play().catch(() => {});
            } else {
              onScreen.delete(video);
              if (video.src) video.pause();
            }
          }
        },
        { rootMargin: '200px' }
      )
    : null;

// Browsers refuse to play while the tab is hidden; resume when it's back
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    onScreen.forEach((video) => video.play().catch(() => {}));
  }
});

/**
 * Create an <img> or a muted looping <video> depending on the file type.
 * By default videos load and play only while on screen; pass `lazy: false`
 * to load right away and control playback yourself.
 */
export function createMedia(src, { alt = '', className = '', lazy = true } = {}) {
  let element;
  if (VIDEO_EXTENSIONS.test(src)) {
    element = document.createElement('video');
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = 'none';
    element.setAttribute('aria-label', alt);
    if (!lazy) {
      element.preload = 'auto';
      element.src = src;
    } else if (videoObserver) {
      element.dataset.src = src;
      videoObserver.observe(element);
    } else {
      element.src = src;
      element.autoplay = true;
    }
  } else {
    element = document.createElement('img');
    element.alt = alt;
    element.loading = 'lazy';
    element.decoding = 'async';
    element.src = src;
  }
  if (className) element.className = className;
  return element;
}

/** Stop tracking videos inside `container` (call before removing them). */
export function releaseMedia(container) {
  container.querySelectorAll('video').forEach((video) => {
    videoObserver?.unobserve(video);
    onScreen.delete(video);
    video.pause();
  });
}
