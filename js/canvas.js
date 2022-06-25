// import { MapControls } from "./module/OrbitControls.js";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();
// dat.GUI.toggleHide();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  20000
);
camera.position.set(50, 50, 50);
scene.add(camera);

// Controls
const controls = new MapControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.495;
controls.autoRotate = true;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 40.0;
controls.maxDistance = 200.0;
controls.update();

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
ambientLight.castShadow = true;

// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
moonLight.castShadow = true;

// gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
// gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
// gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
// gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * House
 */
// Temporary Object
const object1 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 20, 20),
  new THREE.MeshStandardMaterial({
    roughness: 0.7,
  })
);
object1.castShadow = true;
object1.position.x = 20;
object1.position.y = 10;
scene.add(object1);

const object2 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 20, 20),
  new THREE.MeshStandardMaterial({
    roughness: 0.7,
  })
);
object2.castShadow = true;
object2.position.x = -20;
object2.position.y = 10;
scene.add(object2);

// Floor
const floorTexture = new THREE.TextureLoader().load(
  "../data/grasslight-big.jpg"
);
floorTexture.anisotropy = 32;
floorTexture.repeat.set(100, 100);
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.wrapS = THREE.RepeatWrapping;
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10000, 10000),
  new THREE.MeshStandardMaterial({
    map: floorTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
