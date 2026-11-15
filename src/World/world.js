import EventEmitter from 'events';
import Experience from '../Experience/experience.js';
import Environment from './environment.js';
import Floor from './floor.js';
import Room from './room.js';

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.room = new Room();
      this.floor = new Floor();
      this.emit('world_ready');
    });
  }

  update() {
    this.room?.update();
  }
}
