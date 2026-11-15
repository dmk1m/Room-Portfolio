import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from '../Experience/experience.js';
import { prefersReducedMotion } from '../Utils/motion.js';

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
    if (!prefersReducedMotion()) this.onMouseMove();
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
    // Screens: show the poster (or a dark "off" screen) until the video is ready
    this.screens = {
      screen: this.createScreenMaterial('screen', { side: THREE.DoubleSide }),
      messenger: this.createScreenMaterial('messenger'),
    };
    this.roomChildren.monitor.children[1].material = this.screens.screen;
    this.roomChildren.laptop.children[3].material = this.screens.messenger;

    this.resources.on('videoReady', (name, texture) => this.showVideo(name, texture));
    for (const name of Object.keys(this.screens)) {
      if (this.resources.video[name]?.readyState >= 2) {
        this.showVideo(name, this.resources.videoTexture[name]);
      }
    }

    // Outdoors area
    this.roomChildren.outside.position.x = 0.003488;
    this.roomChildren.outside.position.z = 0.66505;

    // Loading cube
    this.roomChildren.cube.position.set(0, 0, 0);
    this.roomChildren.cube.rotation.y = Math.PI / 4;

    this.scene.add(this.actualRoom);
  }

  createScreenMaterial(name, options = {}) {
    const poster = this.resources.posters[name];
    return new THREE.MeshBasicMaterial({
      map: poster ?? null,
      color: poster ? 0xffffff : 0x111111,
      ...options,
    });
  }

  showVideo(name, texture) {
    const material = this.screens?.[name];
    if (!material || material.map === texture) return;
    material.map = texture;
    material.color.set(0xffffff);
    material.needsUpdate = true;
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
