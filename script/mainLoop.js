/* global Detector, init, render, onWindowResize, camera, THREE, THREEx */

if (!Detector.webgl) Detector.addGetWebGLMessage();

const keyboard = new THREEx.KeyboardState();
const clock = new THREE.Clock();

function update() {
  const delta = clock.getDelta();
  const move = delta * 200;
  const vectorZ = new THREE.Vector3(0, 0, -1);
  vectorZ.applyQuaternion(camera.quaternion);
  const vectorX = new THREE.Vector3(-1, 0, 0);
  vectorX.applyQuaternion(camera.quaternion);
  if (keyboard.pressed('W')) {
    camera.position.x += move * vectorZ.x;
    camera.position.y += move * vectorZ.y;
    camera.position.z += move * vectorZ.z;
  } else if (keyboard.pressed('S')) {
    camera.position.x -= move * vectorZ.x;
    camera.position.y -= move * vectorZ.y;
    camera.position.z -= move * vectorZ.z;
  } else if (keyboard.pressed('A')) {
    camera.position.x += move * vectorX.x;
    camera.position.y += move * vectorX.y;
    camera.position.z += move * vectorX.z;
  } else if (keyboard.pressed('D')) {
    camera.position.x -= move * vectorX.x;
    camera.position.y -= move * vectorX.y;
    camera.position.z -= move * vectorX.z;
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

init();
animate();

window.addEventListener('resize', onWindowResize, false);
