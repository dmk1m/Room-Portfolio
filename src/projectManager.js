import { createMedia } from "./Utils/media.js";

export default class ProjectManager {
  constructor() {
    this.projects = [
      {
        title: "My Room Portfolio",
        description:
          "My bedroom, rebuilt in Blender and rendered live in your browser. You're scrolling through it right now.",
        imageUrl: "/pictures/room/room.png",
        link: "https://github.com/dmk1m/Room-Portfolio",
        icons: [
          {
            name: "Blender",
            path: "/svg/blender.svg",
          },
          {
            name: "Three.js",
            path: "/svg/three.svg",
          },
          {
            name: "JavaScript",
            path: "/svg/javascript.svg",
          },
          {
            name: "GSAP",
            path: "/svg/gsap.svg",
          },
          {
            name: "Ubuntu",
            path: "/svg/ubuntu.svg",
          },
          {
            name: "Docker",
            path: "/svg/docker.svg",
          },
          {
            name: "Nginx",
            path: "/svg/nginx.svg",
          },
          {
            name: "Cloudflare",
            path: "/svg/cloudflare.svg",
          },
        ],
        badges: [
          {
            name: "Blender",
            primary: "#f57c00",
            secondary: "#FFA726",
          },
          {
            name: "Three.js",
            primary: "#558B2F",
            secondary: "#C5E1A5",
          },
          {
            name: "JavaScript",
            primary: "#C1B765",
            secondary: "#FFF59D",
          },
        ],
        slides: [
          "/pictures/room/room.png",
          "/pictures/room/irl.webp",
          "/pictures/room/blender.webp",
        ],
        summary:
          "An interactive portfolio set inside a 3D model of my bedroom. I modeled the room in Blender and built the site around it, so the camera and furniture move as you scroll.",
        highlights: [
          "Modeled every object in Blender and compressed the scene to under 900 KB with Draco and WebP textures",
          "Scroll-driven camera and object animations with GSAP ScrollTrigger and Lenis smooth scrolling",
          "The laptop on the bed plays a recording of my Live Messenger app as a video texture",
          "Loading screen with real progress, a WebGL fallback and reduced-motion support",
          "Deployed with Docker and Nginx behind Cloudflare; inspired by the work of Boko33",
        ]
      },
      {
        title: "Live Messenger",
        description:
          "A real-time chat app with instant delivery, read receipts and Google or GitHub sign-in.",
        imageUrl: "/pictures/messenger/animation.mp4",
        link: "https://github.com/dmk1m/live-messenger-nextjs",
        icons: [
          {
            name: "Next.js",
            path: "/svg/next.svg",
          },
          {
            name: "TypeScript",
            path: "/svg/typescript.svg",
          },
          {
            name: "MongoDB",
            path: "/svg/mongo.svg",
          },
          {
            name: "Tailwind",
            path: "/svg/tailwind.svg",
          },
          {
            name: "Oauth",
            path: "/svg/oauth.svg",
          },
          {
            name: "React Query",
            path: "/svg/query.svg",
          },
          {
            name: "Prisma",
            path: "/svg/prisma.svg",
          },
          {
            name: "Pusher",
            path: "/svg/pusher.svg",
          },
          {
            name: "Git",
            path: "/svg/git.svg",
          },
          {
            name: "Ubuntu",
            path: "/svg/ubuntu.svg",
          },
          {
            name: "Docker",
            path: "/svg/docker.svg",
          },
          {
            name: "Nginx",
            path: "/svg/nginx.svg",
          },
          {
            name: "Cloudflare",
            path: "/svg/cloudflare.svg",
          },
        ],
        badges: [
          {
            name: "Next.js",
            primary: "#C62828",
            secondary: "#EF9A9A",
          },
          {
            name: "TypeScript",
            primary: "#0277BD",
            secondary: "#90CAF9",
          },
          {
            name: "MongoDB",
            primary: "#558B2F",
            secondary: "#AED581",
          },
        ],
        slides: [
          "/pictures/messenger/animation.mp4",
          "/pictures/messenger/home_view.png",
          "/pictures/messenger/login_demo.png",
        ],
        summary:
          "A full-stack messaging app built with Next.js, where messages show up instantly for everyone in the chat. It was also my first project with a document database.",
        highlights: [
          "Real-time messages and “seen by” read receipts powered by Pusher",
          "Sign-in with JWT authentication or Google and GitHub OAuth",
          "MongoDB data layer accessed through Prisma",
          "Server- and client-side rendering with Next.js",
          "Chat management and light/dark mode, styled with Tailwind CSS",
          "Containerized and deployed with Docker",
        ]
      },
      {
        title: "Password Manager",
        description:
          "Encryptor 2.0: a desktop app and Chrome extension for your passwords, backed by an encrypted API with 2FA.",
        imageUrl: "/pictures/password_manager/animation.mp4",
        link: "https://github.com/dmk1m/passwordmanager",
        icons: [
          {
            name: "CSharp",
            path: "/svg/csharp.svg",
          },
          {
            name: "Python",
            path: "/svg/python.svg",
          },
          {
            name: "Flask",
            path: "/svg/flask.svg",
          },
          {
            name: "MySQL",
            path: "/svg/mysql.svg",
          },
          {
            name: "2FA",
            path: "/svg/2fa.svg",
          },
          {
            name: "Encryption",
            path: "/svg/encryption.svg",
          },
          {
            name: "JavaScript",
            path: "/svg/javascript.svg",
          },
          {
            name: "Git",
            path: "/svg/git.svg",
          },
          {
            name: "Ubuntu",
            path: "/svg/ubuntu.svg",
          },
          {
            name: "Docker",
            path: "/svg/docker.svg",
          },
          {
            name: "Nginx",
            path: "/svg/nginx.svg",
          },
          {
            name: "Cloudflare",
            path: "/svg/cloudflare.svg",
          },
        ],
        badges: [
          {
            name: "Python",
            primary: "#558B2F",
            secondary: "#C5E1A5",
          },
          {
            name: "C#",
            primary: "#0277BD",
            secondary: "#90CAF9",
          },
          {
            name: "MySQL",
            primary: "#424242",
            secondary: "#E0E0E0",
          },
          {
            name: "Avalonia",
            primary: "#6A1B9A",
            secondary: "#E1BEE7",
          },
        ],
        slides: [
          "/pictures/password_manager/animation.mp4",
          "/pictures/password_manager/animation2.mp4",
          "/pictures/password_manager/home_view.png",
        ],
        summary:
          "Encryptor 2.0 stores, generates and fills in strong passwords. A native desktop app and a Chrome extension share one secure backend.",
        highlights: [
          "Desktop app built with C# and Avalonia, plus a Chrome extension for filling in logins",
          "Flask API that handles authentication, data processing and encryption",
          "All user data AES-encrypted; passwords hashed with bcrypt and scrypt before reaching MySQL",
          "TOTP two-factor login and Redis caching for frequent requests",
          "Runs in Docker on an Ubuntu server behind Nginx, with Cloudflare DNS and TLS",
        ]
      },
      {
        title: "Blackjack Game",
        description:
          "Blackjack in the terminal, with real playing cards redrawn as ASCII art.",
        imageUrl: "/pictures/blackjack/home_view.mp4",
        link: "https://github.com/dmk1m/blackjack-console-game",
        icons: [
          {
            name: "Java",
            path: "/svg/java.svg",
          },
          {
            name: "JUnit",
            path: "/svg/junit.svg",
          },
          {
            name: "Maven",
            path: "/svg/maven.svg",
          },
          {
            name: "Git",
            path: "/svg/git.svg",
          },
          {
            name: "Ubuntu",
            path: "/svg/ubuntu.svg",
          },
          {
            name: "Docker",
            path: "/svg/docker.svg",
          },
          {
            name: "Nginx",
            path: "/svg/nginx.svg",
          },
          {
            name: "Cloudflare",
            path: "/svg/cloudflare.svg",
          },
        ],
        badges: [
          {
            name: "Java",
            primary: "#FF8F00",
            secondary: "#FFB74D",
          },
          {
            name: "JUnit",
            primary: "#424242",
            secondary: "#E0E0E0",
          },
          {
            name: "Maven",
            primary: "#C1B765",
            secondary: "#FFF59D",
          },
        ],
        slides: [
          "/pictures/blackjack/home_view.mp4",
          "/pictures/blackjack/bets_stage.png",
          "/pictures/blackjack/playing_stage.png",
        ],
        summary:
          "A Java console game that makes blackjack feel close to a graphical app without ever leaving the terminal.",
        highlights: [
          "Converts card images to ASCII art and overlaps them like a real hand",
          "Side-by-side panels for the player's info and the game table",
          "Object-oriented design following SOLID principles",
          "Every controller covered by JUnit tests; built with Maven",
        ]
      },
      {
        title: "SpaceEra",
        description:
          "A concept site for booking trips to other planets, with 3D planets I modeled in Blender.",
        imageUrl: "/pictures/spaceera/home.mp4",
        link: "https://github.com/dmk1m/space-era",
        icons: [
          {
            name: "Blender",
            path: "/svg/blender.svg",
          },
          {
            name: "HTML",
            path: "/svg/html.svg",
          },
          {
            name: "CSS",
            path: "/svg/css.svg",
          },
          {
            name: "JavaScript",
            path: "/svg/javascript.svg",
          },
          {
            name: "Git",
            path: "/svg/git.svg",
          },
          {
            name: "Ubuntu",
            path: "/svg/ubuntu.svg",
          },
          {
            name: "Docker",
            path: "/svg/docker.svg",
          },
          {
            name: "Nginx",
            path: "/svg/nginx.svg",
          },
          {
            name: "Cloudflare",
            path: "/svg/cloudflare.svg",
          },
        ],
        badges: [
          {
            name: "Blender",
            primary: "#f57c00",
            secondary: "#ffa726",
          },
          {
            name: "JavaScript",
            primary: "#C1B765",
            secondary: "#FFF59D",
          },
          {
            name: "HTML/CSS",
            primary: "#0277BD",
            secondary: "#90CAF9",
          },
        ],
        slides: [
          "/pictures/spaceera/home.mp4",
          "/pictures/spaceera/blender.webp",
          "/pictures/spaceera/moon.webp",
        ],
        summary:
          "A front-end concept for booking intergalactic trips, built as my final project for a web development course.",
        highlights: [
          "Rotating 3D planets, each one modeled in Blender",
          "Ticket price calculator for every destination",
          "Login page and light/dark mode",
          "Built with plain HTML, CSS and JavaScript",
        ]
      },
    ];
    this.createProjects();
  }

  createProjects() {
    const container = document.querySelector(".project-holder");
    this.projects.forEach((project, index) => {
      const projectElement = document.createElement("article");
      projectElement.classList.add("project");

      const badgesHTML = project.badges
        .map(
          (badge) =>
            `<span class="badge" style="background-color: ${badge.secondary}; border-color: ${badge.primary};">${badge.name}</span>`
        )
        .join("");

      projectElement.innerHTML = `
      <div class="project-overview" role="button" tabindex="0" aria-label="Open ${project.title} details">
        <span class="project-overlay" aria-hidden="true">View details</span>
      </div>
      <div class="project-details">
        <div class="project-header">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <h3 class="project-title">${project.title}</h3>
        </div>
        <div class="badges-container">${badgesHTML}</div>
        <p class="project-description">${project.description}</p>
        <div class="buttons-container">
          <a href="${project.link}" class="project-link">View details</a>
          <a class="project-source" href="${project.link}" target="_blank" rel="noopener noreferrer" aria-label="${project.title} source code on GitHub">
            <svg viewBox="0 0 496 512" aria-hidden="true"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            <span>Source</span>
          </a>
        </div>
      </div>
    `;
      projectElement
        .querySelector(".project-overview")
        .prepend(
          createMedia(project.imageUrl, {
            alt: `${project.title} preview`,
            className: "project-image",
          })
        );
      container.appendChild(projectElement);
    });
  }
}
