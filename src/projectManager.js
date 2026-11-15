
export default class ProjectManager {
  constructor() {
    this.projects = [
      {
        title: "My Room Portfolio",
        description: "A portfolio website was created by 3D modeling my room. ",
        imageUrl: "/pictures/room/room.png",
        link: "https://gitlab.com/DmitriyKim01/room-portfolio",
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
          "/pictures/room/irl.jpg",
          "/pictures/room/blender.png",
        ],
        detailedDescription: `This portfolio website is inspired by the work of Boko33. I started by 3D modeling my room in Blender, focusing on capturing its details. The assets were then imported into the Three.js library, and I used HTML, CSS, and JavaScript to build the website. I added animations using GSAP to make the experience more dynamic and interactive. This project highlights my skills in combining design and coding to create an engaging portfolio.`
      },
      {
        title: "Live Messenger",
        description:
          "Messenger Next.js is a full-stack web application that enables real-time messaging, user friendly interface, and responsive design.",
        imageUrl: "/pictures/messenger/animation.gif",
        link: "https://gitlab.com/DmitriyKim01/live-messenger-nextjs",
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
          "/pictures/messenger/animation.gif",
          "/pictures/messenger/home_view.png",
          "/pictures/messenger/login_demo.png",
        ],
        detailedDescription: `Live Messenger Next.js is a full-stack web application designed for real-time messaging with a user-friendly interface and responsive design. Built using Next.js, it leverages server-side and client-side rendering for optimized performance. The project integrates secure authentication with JWT tokens and social login options via Google and GitHub, while real-time messaging is powered by Pusher. MongoDB, along with Prisma, serves as the database solution, marking my first experience with document-based databases. The application features light/dark mode, chat management, and a “seen by” functionality, with animations enhanced by Tailwind CSS. Deployed using Docker, this project demonstrates my growing skills in modern web development.`
      },
      {
        title: "Password Manager",
        description:
          "Encryptor 2.0 is a comprehensive password management solution designed to securely store and manage your credentials",
        imageUrl: "/pictures/password_manager/animation.gif",
        link: "https://gitlab.com/DmitriyKim01/passwordmanager",
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
          "/pictures/password_manager/animation.gif",
          "/pictures/password_manager/animation2.gif",
          "/pictures/password_manager/home_view.png",
        ],
        detailedDescription: `Encryptor 2.0 is a password manager application that stores, manages, and auto-generates strong passwords securely with ease. The project includes a native GUI desktop application developed using Avalonia for ensuring a smooth user interface experience and a Chrome extension for ease of browser integration. The backend is a Flask server offering secure API endpoints for authentication, processing data, and encryption. Sensitive data is encrypted using algorithms like bcrypt, scrypt, and AES before being stored in a MySQL database, ensuring robust security. The web application is deployed on an Ubuntu server, with Docker, Docker-Compose, and Nginx being utilized for efficient deployment and traffic management. With features like caching (using Redis) for performance optimization, two-factor authentication, and SSL/TLS for secure communication added on top, Encryptor 2.0 offers a robust and user-friendly password management application`
      },
      {
        title: "Blackjack Game",
        description:
          "The Blackjack Console Game is an intuitive Java-based console game that delivers a seamless, GUI-like experience",
        imageUrl: "/pictures/blackjack/home_view.gif",
        link: "https://gitlab.com/DmitriyKim01/blackjack-console-game",
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
          "/pictures/blackjack/home_view.gif",
          "/pictures/blackjack/bets_stage.png",
          "/pictures/blackjack/playing_stage.png",
        ],
        detailedDescription: `The Blackjack Console Game is a Java application that puts blackjack in the console with almost GUI-like features. The game shows the player's hand dynamically, superimposing cards in a visual representation that mimics live play. The game employs side-by-side panel presentation for user information and game action, so it is very polished and easy to use. With better image-to-ASCII rendering, the game presents visually pleasing elements natively on the console. By utilizing object-oriented programming and SOLID principles, the code is efficient, componentized, and easy to work with. All controllers are also tested extensively with JUnit for reliability and functionality.`
      },
      {
        title: "SpaceEra",
        description:
          "Space Era is a front-end concept website that simulates the experience of booking intergalactic trips.",
        imageUrl: "/pictures/spaceera/home.gif",
        link: "https://gitlab.com/DmitriyKim01/space-era",
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
          "/pictures/spaceera/home.gif",
          "/pictures/spaceera/blender.png",
          "/pictures/spaceera/moon.png",
        ],
        detailedDescription: `Space Era is a front-end idea website meant to mimic the feeling of intergalactic travel reservations. The project has rotating 3D planet models, each of which was modeled by me in Blender, bringing an personalized feel to the user experience. It has smooth animations, light/dark mode, a login page, and a ticket price calculator, all in a clear UI with color contrast. Developed as a final project for a Web Development course, this project showcases a combination of 3D design and web development skill, with solid design and a tidy HTML and CSS template.`
      },
    ];
    this.createProjects();
  }

  createProjects() {
    const container = document.querySelector(".project-holder");
    this.projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");


      const badgesHTML = project.badges.map(badge => `
        <span class="badge" style="background-color: ${badge.secondary}; border-color: ${badge.primary};">
          ${badge.name}
        </span>
      `).join('');

      projectElement.innerHTML = `
      <div class="project-overview">
        <img src="${project.imageUrl}" alt="project" class="project-image" />
      </div>
      <div class="project-details">
        <h3 class="project-title title-header-blue">${project.title}</h3>
                <div class="badges-container">
          ${badgesHTML}
        </div>
        <p class="project-description">${project.description}</p>
        <div class="buttons-container">
          <a href="${project.link}" class="project-link"><span>View Project</span></a>
          <a class="Btn" href="${project.link}" target="_blank">
            <span class="svgContainer">
              <svg fill="white" viewBox="0 0 496 512" height="1.6em"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            </span>
            <span class="BG"></span>
            </a>
        </div>
        
      </div>
    `;
      container.appendChild(projectElement);
    });
  }
}
