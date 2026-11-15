import EventEmitter from 'events';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Experience from '../Experience/experience';
import * as THREE from 'three';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath('/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }
  startLoading() {
    this.video = {};
    this.videoTexture = {};

    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(
          asset.path,
          (file) => {
            this.singleAssetLoaded(asset, file);
          },
          undefined,
          (error) => {
            console.error(`Failed to load model "${asset.path}"`, error);
            this.emit('error', { asset, error });
          }
        );
      } else if (asset.type === 'videoTexture') {
        const video = document.createElement('video');
        video.playsInline = true;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.preload = 'auto';

        const texture = new THREE.VideoTexture(video);
        texture.flipY = true;
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        this.video[asset.name] = video;
        this.videoTexture[asset.name] = texture;

        // Count the video as loaded once its first frame is available.
        // On error, still count it so a missing video never blocks the intro.
        const onLoaded = () => this.singleAssetLoaded(asset, texture);
        video.addEventListener('loadeddata', onLoaded, { once: true });
        video.addEventListener(
          'error',
          () => {
            console.warn(`Failed to load video "${asset.path}"`);
            video.removeEventListener('loadeddata', onLoaded);
            onLoaded();
          },
          { once: true }
        );

        video.src = asset.path;
        video.play().catch(() => {
          // Autoplay can be blocked (e.g. low-power mode); retry on first interaction.
          const retry = () => video.play().catch(() => {});
          window.addEventListener('pointerdown', retry, { once: true });
          window.addEventListener('touchstart', retry, { once: true });
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    if (this.loaded === this.queue) {
      this.emit('ready');
    }
  }
}
