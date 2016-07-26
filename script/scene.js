/* global THREE calculatePositions, calculateNormals,
calculateColors, extractHeightValues,
injectSmoothedHeights heightMap, smoothedTerrainHeightMap
waterHeightMap */

function float32Concat(first, second) {
  const firstLength = first.length;
  const result = new Float32Array(firstLength + second.length);

  result.set(first);
  result.set(second, firstLength);

  return result;
}

function setupGeometry() {
  const positions = calculatePositions(smoothedTerrainHeightMap);
  const normals = calculateNormals(positions);
  const colors = calculateColors(positions, 'terrain');

  const waterPositions = calculatePositions(waterHeightMap);
  const waterNormals = calculateNormals(waterPositions);
  const waterColors = calculateColors(waterPositions, 'water');

  const fullPositions = float32Concat(positions, waterPositions);
  const fullNormals = float32Concat(normals, waterNormals);
  const fullColors = float32Concat(colors, waterColors);

  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(fullPositions), 3));
  geometry.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(fullNormals), 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(Float32Array.from(fullColors), 3));
  geometry.computeBoundingSphere();
  return geometry;
}

function setupScene() {
  const scene = new THREE.Scene();
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x000000,
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
  const hemiLight = new THREE.HemisphereLight(0x00000f, 0x00000f, 0.6);
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);
  const mesh = new THREE.Mesh(geometry, material);

  const cubeMesh = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
  cubeMesh.position.y = 300;

  scene.add(cubeMesh);
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
  camera.rotation.order = 'YXZ';
  return camera;
}

window.scene = setupScene();
window.renderer = setupRenderer();
window.camera = setupCamera();
