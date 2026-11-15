/**
 * Split an element's text into one <span class="animatedis"> per character
 * so GSAP can animate the letters individually.
 *
 * Screen readers would read those spans letter by letter, so the letters are
 * hidden from assistive tech and the full text is kept in a visually hidden
 * span instead.
 */
export default function convertToSpan(element) {
  const text = element.textContent.trim().replace(/\s+/g, ' ');
  element.style.overflow = 'hidden';

  const label = document.createElement('span');
  label.className = 'sr-only';
  label.textContent = text;

  const letters = document.createElement('span');
  letters.setAttribute('aria-hidden', 'true');
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    if (char !== ' ') span.className = 'animatedis';
    letters.append(span);
  }

  element.replaceChildren(label, letters);
  return element;
}
