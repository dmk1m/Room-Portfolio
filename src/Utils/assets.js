// Video textures can take an optional `poster` image (first frame of the
// video) that's shown on the screen until the video itself has loaded.
export default [
  {
    name: 'room',
    type: 'glbModel',
    path: '/models/room_group.glb',
  },
  {
    name: 'screen',
    type: 'videoTexture',
    path: '/textures/rampage.min.mp4',
    poster: '/textures/rampage.jpg',
  },
  {
    name: 'messenger',
    type: 'videoTexture',
    path: '/textures/messenger.min.mp4',
    poster: '/textures/messenger.jpg',
  },
];
