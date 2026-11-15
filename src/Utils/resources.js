import EventEmitter from 'events';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Loads the scene's assets.
 *
 * Only "blocking" assets (the 3D model) hold back the loading screen. Video
 * textures are created right away so materials can use them, but their files
 * only start downloading once the model is in, so they never compete with it
 * for bandwidth. Until a video has its first frame, the screen shows its
 * optional `poster` image (or stays dark, like a monitor that's off).
 */
export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.assets = assets;
    this.items = {};
    this.video = {};
    this.videoTexture = {};
    this.posters = {};

    this.blockingAssets = this.assets.filter((asset) => asset.type === 'glbModel');
    this.deferredAssets = this.assets.filter((asset) => asset.type === 'videoTexture');
    this.loaded = 0;
    // Per-asset load progress (0–1) for blocking assets, drives the loading screen
    this.progress = Object.fromEntries(this.blockingAssets.map((asset) => [asset.name, 0]));

    this.setLoaders();
    this.deferredAssets.forEach((asset) => this.createVideoTexture(asset));
    this.blockingAssets.forEach((asset) => this.loadModel(asset));
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath('/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  loadModel(asset) {
    this.loaders.gltfLoader.load(
      asset.path,
      (file) => this.blockingAssetLoaded(asset, file),
      (event) => {
        if (event.lengthComputable) {
          // Leave a little room for parsing/decoding after the download
          this.setProgress(asset, (event.loaded / event.total) * 0.95);
        }
      },
      (error) => {
        console.error(`Failed to load model "${asset.path}"`, error);
        this.emit('error', { asset, error });
      }
    );
  }

  createVideoTexture(asset) {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.preload = 'auto';

    const texture = new THREE.VideoTexture(video);
    this.configureScreenTexture(texture);

    this.video[asset.name] = video;
    this.videoTexture[asset.name] = texture;
    this.items[asset.name] = texture;

    if (asset.poster) {
      const poster = this.loaders.textureLoader.load(asset.poster);
      this.configureScreenTexture(poster);
      this.posters[asset.name] = poster;
    }
  }

  configureScreenTexture(texture) {
    texture.flipY = true;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  startVideo(asset) {
    const video = this.video[asset.name];
    video.addEventListener(
      'loadeddata',
      () => this.emit('videoReady', asset.name, this.videoTexture[asset.name]),
      { once: true }
    );
    video.addEventListener(
      'error',
      () => console.warn(`Failed to load video "${asset.path}"`),
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

  setProgress(asset, value) {
    // Never move backwards (e.g. a late progress event after load)
    this.progress[asset.name] = Math.max(this.progress[asset.name], value);
    const values = Object.values(this.progress);
    this.emit('progress', values.reduce((sum, v) => sum + v, 0) / values.length);
  }

  blockingAssetLoaded(asset, file) {
    if (asset.name in this.items) return;
    this.items[asset.name] = file;
    this.setProgress(asset, 1);
    this.loaded++;
    if (this.loaded === this.blockingAssets.length) {
      this.emit('ready');
      // The model is in: now let the videos download in the background
      this.deferredAssets.forEach((asset) => this.startVideo(asset));
    }
  }
}
