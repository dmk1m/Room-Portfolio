import './style.css';
import Experience from './Experience/experience.js';
import ProjectDialog from './projectDialog.js';
import ProjectManager from './projectManager.js';

new Experience(document.querySelector('.experience-canvas'));
const projectManager = new ProjectManager();
new ProjectDialog(projectManager.projects);
