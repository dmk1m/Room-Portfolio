import gsap from "gsap";

export default class ProjectDialog {
  constructor(projects) {
    this.dialog = document.querySelector(".project-dialog");
    this.closeButton = this.dialog.querySelector(".close-button");
    this.projectLinks = document.querySelectorAll(".project-link");
    this.projectPreviews = document.querySelectorAll(".project-overview");
    this.projectCarousel = document.querySelector(".project-carousel");
    this.projectInfo = document.querySelector(".project-info");

    this.projects = projects;

    this.projectLinks.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.openDialog(index);
      });
    });

    this.projectPreviews.forEach((preview, index) => {
      preview.addEventListener("click", () => {
        this.openDialog(index);
      });
    });

    this.closeButton.addEventListener("click", () => {
      this.closeDialog();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        console.log("escape key pressed");
        this.closeDialog();
      }
    });
  }

  openDialog(index) {
    const project = this.projects[index];
    const slides = document.querySelectorAll(".details-image");
    const title = document.querySelector(".project-details-title");
    const description = document.querySelector(".project-details-description");
    description.textContent = project.detailedDescription;

    const link = document.createElement("a");
    link.href = project.link; 
    link.target = "_blank"; 
    link.textContent = " See more details...";
    link.style.color = '#4f3466'; 

    // Append the link to the description
    description.appendChild(document.createElement("br"));
    description.appendChild(link);

    const iconsContainer = document.querySelector(".icons-holder");
    project.icons.forEach((icon) => {
      const iconDiv = document.createElement("div");
      iconDiv.classList.add("actual-icon");
      iconDiv.innerHTML = `
          <img src="${icon.path}" alt="${icon.name}" />
          <p>${icon.name}</p>
        `;
      iconsContainer.appendChild(iconDiv);
    });
    title.textContent = project.title;

    slides.forEach((slide, index) => {
      slide.src = project.slides[index];
    });

    this.dialog.style.display = "flex";
    gsap.set(this.projectCarousel, { y: 600, opacity: 0 });
    gsap.set(this.projectInfo, { y: -600, opacity: 0 });

    gsap.to(this.projectCarousel, {
      y: 0,
      duration: 0.55,
      opacity: 1,
      ease: "sine",
    });
    gsap.to(this.projectInfo, {
      y: 0,
      duration: 0.55,
      opacity: 1,
      ease: "sine",
    });
  }

  closeDialog() {
    const iconsContainer = document.querySelector(".icons-holder");
    iconsContainer.innerHTML = "";
    gsap.to(this.projectCarousel, {
      y: -600,
      duration: 0.35,
      opacity: 0,
      ease: "power2.inOut",
    });
    gsap.to(this.projectInfo, {
      y: 600,
      duration: 0.35,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        this.dialog.style.display = "none";
      },
    });
  }
}
