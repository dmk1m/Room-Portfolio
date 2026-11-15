import './style.css';
import Experience from './Experience/experience.js';
import ProjectDialog from './projectDialog.js';
import ProjectManager from './projectManager.js';
import { isWebGLAvailable, showFallback } from './Utils/fallback.js';

if (isWebGLAvailable()) {
  try {
    new Experience(document.querySelector('.experience-canvas'));
  } catch (error) {
    console.error('Failed to start the 3D scene', error);
    showFallback("Sorry, the 3D room couldn't start in this browser. You can still find me here:");
  }
} else {
  showFallback(
    "Your browser or device doesn't support WebGL, which this 3D portfolio needs. You can still find me here:"
  );
}

const projectManager = new ProjectManager();
new ProjectDialog(projectManager.projects);
