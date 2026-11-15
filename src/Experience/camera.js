import * as THREE from 'three';
import Experience from './experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;

    this.createOrthographicCamera();
  }

  createOrthographicCamera() {
    const { aspectRatio, frustum } = this.sizes;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-aspectRatio * frustum) / 2,
      (aspectRatio * frustum) / 2,
      frustum / 2,
      -frustum / 2,
      -10,
      10
    );
    this.orthographicCamera.position.y = 1.2;
    this.orthographicCamera.position.z = 2;
    this.orthographicCamera.rotation.x = -Math.PI / 6;
    this.scene.add(this.orthographicCamera);
  }

  resize() {
    const { aspectRatio, frustum } = this.sizes;
    this.orthographicCamera.left = (-aspectRatio * frustum) / 2;
    this.orthographicCamera.right = (aspectRatio * frustum) / 2;
    this.orthographicCamera.top = frustum / 2;
    this.orthographicCamera.bottom = -frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
}
