import './style.css';
import Experience from './Experience/experience.js';
import ProjectDialog from './projectDialog.js';
import ProjectManager from './projectManager.js';

const experience = new Experience(document.querySelector('.experience-canvas'));
const projectManager = new ProjectManager();
const projectDialog = new ProjectDialog(projectManager.projects);

