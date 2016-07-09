/* global Detector, init, render, onWindowResize */

if (!Detector.webgl) Detector.addGetWebGLMessage();

function animate() {
  requestAnimationFrame(animate);
  render();
}

init();
animate();

window.addEventListener('resize', onWindowResize, false);
