import * as THREE from 'three';
import Experience from '../Experience/experience.js';

const CIRCLES = [
  { name: 'circleFirst', color: 0x8ea58c, y: -0.24, x: 0 },
  { name: 'circleSecond', color: 0x395886, y: -0.23, x: -2 },
  { name: 'circleThird', color: 0xa580a6, y: -0.22, x: -2 },
];

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    const geometry = new THREE.PlaneGeometry(30, 30, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xead8c0,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.25;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(8, 64);

    for (const { name, color, x, y } of CIRCLES) {
      const circle = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color })
      );
      circle.position.set(x, y, 0);
      circle.rotation.x = -Math.PI / 2;
      // Circles start hidden and grow in as the user scrolls
      circle.scale.set(0, 0, 0);
      circle.receiveShadow = true;
      this.scene.add(circle);
      this[name] = circle;
    }
  }
}
