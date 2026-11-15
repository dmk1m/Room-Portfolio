import gsap from 'gsap';
import Experience from './Experience/experience.js';
import { createMedia, releaseMedia } from './Utils/media.js';

export default class ProjectDialog {
  constructor(projects) {
    this.projects = projects;
    this.isOpen = false;
    this.current = 0;

    this.dialog = document.querySelector('.project-dialog');
    this.panel = this.dialog.querySelector('.project-dialog-panel');
    this.closeButton = this.dialog.querySelector('.close-button');
    this.slidesList = this.dialog.querySelector('.slides');
    this.dotsContainer = this.dialog.querySelector('.carousel-dots');
    this.prevButton = this.dialog.querySelector('.carousel-prev');
    this.nextButton = this.dialog.querySelector('.carousel-next');
    this.index = this.dialog.querySelector('.project-details-index');
    this.title = this.dialog.querySelector('.project-details-title');
    this.badges = this.dialog.querySelector('.project-details-badges');
    this.description = this.dialog.querySelector('.project-details-description');
    this.highlights = this.dialog.querySelector('.project-details-highlights');
    this.iconsContainer = this.dialog.querySelector('.icons-holder');
    this.sourceLink = this.dialog.querySelector('.project-details-source');

    document.querySelectorAll('.project-link').forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.openDialog(index, link);
      });
    });

    document.querySelectorAll('.project-overview').forEach((preview, index) => {
      preview.addEventListener('click', () => this.openDialog(index, preview));
      preview.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.openDialog(index, preview);
        }
      });
    });

    this.closeButton.addEventListener('click', () => this.closeDialog());
    this.prevButton.addEventListener('click', () => this.showSlide(this.current - 1));
    this.nextButton.addEventListener('click', () => this.showSlide(this.current + 1));

    // Click on the dimmed backdrop closes the dialog
    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) this.closeDialog();
    });

    document.addEventListener('keydown', (event) => {
      if (!this.isOpen) return;
      if (event.key === 'Escape') this.closeDialog();
      else if (event.key === 'ArrowLeft') this.showSlide(this.current - 1);
      else if (event.key === 'ArrowRight') this.showSlide(this.current + 1);
      else if (event.key === 'Tab') this.trapFocus(event);
    });
  }

  /** Stop the page behind the dialog from scrolling (with or without Lenis). */
  lockScroll(locked) {
    const lenis = Experience.instance?.controls?.lenis;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    } else {
      document.documentElement.style.overflow = locked ? 'hidden' : '';
    }
  }

  /** Keep Tab / Shift+Tab cycling through the dialog's controls while it's open. */
  trapFocus(event) {
    const focusable = [
      ...this.panel.querySelectorAll('button:not([hidden]), a[href], [tabindex]:not([tabindex="-1"])'),
    ].filter((el) => !el.closest('[hidden]') && el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const inside = this.panel.contains(document.activeElement);

    if (event.shiftKey && (document.activeElement === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  }

  renderSlides(project) {
    releaseMedia(this.slidesList);
    this.slidesList.replaceChildren();
    this.dotsContainer.replaceChildren();

    this.slides = project.slides.map((src, i) => {
      const item = document.createElement('li');
      item.className = 'slide';
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('aria-label', `${i + 1} of ${project.slides.length}`);
      item.append(
        createMedia(src, {
          alt: `${project.title} screenshot ${i + 1}`,
          className: 'details-image',
          lazy: false,
        })
      );
      this.slidesList.append(item);
      return item;
    });

    this.dots = project.slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show image ${i + 1}`);
      dot.addEventListener('click', () => this.showSlide(i));
      this.dotsContainer.append(dot);
      return dot;
    });

    const multiple = project.slides.length > 1;
    this.prevButton.hidden = !multiple;
    this.nextButton.hidden = !multiple;
    this.dotsContainer.hidden = !multiple;
    this.showSlide(0);
  }

  showSlide(index) {
    if (!this.slides?.length) return;
    const count = this.slides.length;
    this.current = (index + count) % count;

    this.slides.forEach((slide, i) => {
      const active = i === this.current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      // Only the visible slide's video plays
      const video = slide.querySelector('video');
      if (video) {
        if (active && this.isOpen) video.play().catch(() => {});
        else video.pause();
      }
    });
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.current);
      dot.setAttribute('aria-current', i === this.current ? 'true' : 'false');
    });
  }

  renderInfo(project, index) {
    this.index.textContent = String(index + 1).padStart(2, '0');
    this.title.textContent = project.title;
    this.description.textContent = project.summary;
    this.highlights.replaceChildren(
      ...project.highlights.map((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        return item;
      })
    );

    this.badges.replaceChildren(
      ...project.badges.map((badge) => {
        const span = document.createElement('span');
        span.className = 'badge';
        span.style.backgroundColor = badge.secondary;
        span.style.borderColor = badge.primary;
        span.textContent = badge.name;
        return span;
      })
    );

    this.iconsContainer.replaceChildren(
      ...project.icons.map((icon) => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'actual-icon';
        const img = document.createElement('img');
        img.src = icon.path;
        img.alt = '';
        const label = document.createElement('p');
        label.textContent = icon.name;
        iconDiv.append(img, label);
        return iconDiv;
      })
    );

    this.sourceLink.href = project.link;
  }

  openDialog(index, opener) {
    const project = this.projects[index];
    if (!project) return;

    this.isOpen = true;
    this.opener = opener;
    this.renderSlides(project);
    this.renderInfo(project, index);
    this.dialog.querySelector('.project-info').scrollTop = 0;
    this.lockScroll(true);

    gsap.killTweensOf([this.dialog, this.panel]);
    this.dialog.style.display = 'flex';
    this.dialog.setAttribute('aria-hidden', 'false');
    gsap.fromTo(this.dialog, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' });
    gsap.fromTo(
      this.panel,
      { y: 40, scale: 0.97, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
    this.closeButton.focus({ preventScroll: true });
  }

  closeDialog() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.lockScroll(false);

    gsap.killTweensOf([this.dialog, this.panel]);
    gsap.to(this.panel, { y: 30, scale: 0.98, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(this.dialog, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.in',
      onComplete: () => {
        this.dialog.style.display = 'none';
        this.dialog.setAttribute('aria-hidden', 'true');
        // Stop any slide videos from playing in the background
        releaseMedia(this.slidesList);
        this.slidesList.replaceChildren();
        this.opener?.focus({ preventScroll: true });
      },
    });
  }
}
