import gsap from 'gsap';
import Experience from './Experience/experience.js';
import { createMedia } from './Utils/media.js';

export default class ProjectDialog {
  constructor(projects) {
    this.projects = projects;
    this.isOpen = false;

    this.dialog = document.querySelector('.project-dialog');
    this.closeButton = this.dialog.querySelector('.close-button');
    this.projectCarousel = this.dialog.querySelector('.project-carousel');
    this.projectInfo = this.dialog.querySelector('.project-info');
    this.slidesList = this.dialog.querySelector('.slides');
    this.title = this.dialog.querySelector('.project-details-title');
    this.description = this.dialog.querySelector('.project-details-description');
    this.iconsContainer = this.dialog.querySelector('.icons-holder');

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

    // Click on the dimmed backdrop closes the dialog
    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) this.closeDialog();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) this.closeDialog();
    });
  }

  renderSlides(project) {
    this.slidesList.replaceChildren();
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    project.slides.forEach((src, i) => {
      const id = `img-${i + 1}`;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'radio-buttons';
      input.id = id;
      input.checked = i === 0;

      const item = document.createElement('li');
      item.className = 'slide-container';
      const wrapper = document.createElement('div');
      wrapper.className = 'slide-image';
      wrapper.append(
        createMedia(src, {
          alt: `${project.title} screenshot ${i + 1}`,
          className: 'details-image',
        })
      );
      item.append(wrapper);

      const dot = document.createElement('label');
      dot.htmlFor = id;
      dot.id = `img-dot-${i + 1}`;
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show image ${i + 1}`);
      dots.append(dot);

      this.slidesList.append(input, item);
    });

    if (project.slides.length > 1) this.slidesList.append(dots);
  }

  renderInfo(project) {
    this.title.textContent = project.title;

    const link = document.createElement('a');
    link.href = project.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'See more details...';
    link.className = 'project-details-link';
    this.description.replaceChildren(
      project.detailedDescription,
      document.createElement('br'),
      link
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
  }

  openDialog(index, opener) {
    const project = this.projects[index];
    if (!project) return;

    this.renderSlides(project);
    this.renderInfo(project);

    this.isOpen = true;
    this.opener = opener;
    new Experience().controls?.lenis?.stop();

    gsap.killTweensOf([this.projectCarousel, this.projectInfo]);
    this.dialog.style.display = 'flex';
    this.dialog.setAttribute('aria-hidden', 'false');
    gsap.fromTo(
      this.projectCarousel,
      { y: 600, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'sine' }
    );
    gsap.fromTo(
      this.projectInfo,
      { y: -600, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'sine' }
    );
    this.closeButton.focus({ preventScroll: true });
  }

  closeDialog() {
    if (!this.isOpen) return;
    this.isOpen = false;
    new Experience().controls?.lenis?.start();

    gsap.killTweensOf([this.projectCarousel, this.projectInfo]);
    gsap.to(this.projectCarousel, {
      y: -600,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    });
    gsap.to(this.projectInfo, {
      y: 600,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        this.dialog.style.display = 'none';
        this.dialog.setAttribute('aria-hidden', 'true');
        // Stop any slide videos from playing in the background
        this.slidesList.replaceChildren();
        this.opener?.focus({ preventScroll: true });
      },
    });
  }
}
