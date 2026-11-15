import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from '../Experience/experience.js';

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.roomChildren = {};
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setRoomChildren();
    this.setModel();
    this.onMouseMove();
  }

  setRoomChildren() {
    this.actualRoom.children.forEach((child) => {
      // Apply shadows to the mesh
      child.castShadow = true;
      child.receiveShadow = true;
      // Apply shadows to the groups
      if (child instanceof THREE.Group) {
        child.children.forEach((child) => {
          child.castShadow = true;
          child.receiveShadow = true;
        });
      }
      // Scale every object to 0
      child.scale.set(0, 0, 0);
      this.roomChildren[child.name.toLowerCase()] = child;
    });
  }

  // Rotate room on mouse move
  onMouseMove() {
    window.addEventListener('mousemove', (event) => {
      this.rotation =
        ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  setModel() {
    // Monitor
    this.roomChildren.monitor.children[1].material =
      new THREE.MeshBasicMaterial({
        map: this.resources.items.screen,
        side: THREE.DoubleSide,
      });

    // Laptop
    this.roomChildren.laptop.children[3].material = new THREE.MeshBasicMaterial(
      {
        map: this.resources.items.messenger,
      }
    );

    // Outdoors area
    this.roomChildren.outside.position.x = 0.003488;
    this.roomChildren.outside.position.z = 0.66505;

    // Loading cube
    this.roomChildren.cube.position.set(0, 0, 0);
    this.roomChildren.cube.rotation.y = Math.PI / 4;

    this.scene.add(this.actualRoom);
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
