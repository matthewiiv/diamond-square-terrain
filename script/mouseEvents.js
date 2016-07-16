
/* globals camera */

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;


function rotateScene(deltaX, deltaY) {
  camera.rotation.y += (deltaX / 100);
  camera.rotation.x += deltaY / 100;
}

function onMouseMove(evt) {
  if (!mouseDown) {
    return;
  }
  evt.preventDefault();
  const deltaX = evt.clientX - mouseX;
  const deltaY = evt.clientY - mouseY;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
  rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
  evt.preventDefault();
  mouseDown = true;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

function onMouseUp(evt) {
  evt.preventDefault();

  mouseDown = false;
}

function addMouseHandler(canvas) {
  canvas.addEventListener('mousemove', (e) => {
    onMouseMove(e);
  }, false);
  canvas.addEventListener('mousedown', (e) => {
    onMouseDown(e);
  }, false);
  canvas.addEventListener('mouseup', (e) => {
    onMouseUp(e);
  }, false);
}

window.addMouseHandler = addMouseHandler;
