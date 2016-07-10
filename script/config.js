
const magnitude = 100;
const detail = 9;
const cubeLength = Math.pow(2, detail) + 1;
const heightBound = Math.sqrt(cubeLength);
const roughness = (1 / 4); // 0-1
const smoothSize = 2;
const smoothIterations = 1;

function proportionalRandomness(size, height) {
  return (Math.random() - 0.5) * (size / (1 / roughness)) * (height / heightBound);
}

window.magnitude = magnitude;
window.detail = detail;
window.roughness = roughness;
window.smoothSize = smoothSize;
window.smoothIterations = smoothIterations;
window.proportionalRandomness = proportionalRandomness;
