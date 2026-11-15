const LINKS = [
  { label: 'GitHub', href: 'https://github.com/dmk1m' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dmitriy-kim-1999b3339/' },
  { label: 'Resume', href: '/pictures/personal/dmitriykim_cv.pdf' },
  { label: 'Email', href: 'mailto:contact@dmkim.com' },
];

/** Whether this browser can create a WebGL context for the 3D scene. */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Turn the loading screen into a fallback: an explanation plus direct links,
 * so visitors still reach the important content when the 3D room can't run.
 */
export function showFallback(message) {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  loader.querySelector('.loader-track')?.remove();
  loader.setAttribute('aria-busy', 'false');

  const text = loader.querySelector('.loader-percent') ?? document.createElement('p');
  text.className = 'loader-error';
  text.textContent = message;
  if (!text.isConnected) loader.append(text);

  if (!loader.querySelector('.loader-links')) {
    const links = document.createElement('nav');
    links.className = 'loader-links';
    links.setAttribute('aria-label', 'Contact links');
    for (const { label, href } of LINKS) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      if (href.startsWith('http') || href.endsWith('.pdf')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      links.append(a);
    }
    loader.append(links);
  }
}
