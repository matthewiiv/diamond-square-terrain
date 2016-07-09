/* global THREE calculatePositions, calculateNormals,
calculateColors, smoothPositions , extractHeightValues,
injectSmoothedHeights heightMap */

function setupGeometry() {
  const positions = calculatePositions(heightMap);
  const normals = calculateNormals(positions);
  const colors = calculateColors(positions);

  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(positions), 3));
  geometry.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(Float32Array.from(colors), 3));
  geometry.computeBoundingSphere();
  return geometry;
}

function setupScene() {
  const scene = new THREE.Scene();
  const material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0xffffff,
    shininess: 1000,
    side: THREE.DoubleSide,
    vertexColors: THREE.VertexColors,
  });

  const geometry = setupGeometry();

  scene.fog = new THREE.Fog(0x050505, 2000, 3500);
  scene.add(new THREE.AmbientLight(0x444444));
  // lights
  const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
  light1.position.set(1, 1, 1);
  scene.add(light1);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return scene;
}

function setupRenderer() {
  const scene = setupScene();
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
  });
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  return renderer;
}

function setupCamera() {
  const camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
  camera.position.z = 600;
  camera.position.y = 400;
  camera.rotation.x = -Math.PI / 5;
  return camera;
}

window.scene = setupScene();
window.renderer = setupRenderer();
window.camera = setupCamera();
