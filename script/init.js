/* global THREE, camera, renderer, scene */

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
  const container = document.getElementById('container');
  container.appendChild(renderer.domElement);
}

function render() {
  renderer.render(scene, camera);
}

window.render = render;
window.init = init;
window.onWindowResize = onWindowResize;
