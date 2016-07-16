
/* global MersenneTwister */

const magnitude = 100;
const detail = 9;
const cubeLength = Math.pow(2, detail) + 1;
const heightBound = Math.sqrt(cubeLength);
const roughness = (1 / 4); // 0-1
const smoothSize = 2;
const smoothIterations = 1;
const seed = 123456;

function createSeedHeightMap(n, seedNo) {
  const length = Math.pow(2, n) + 1;
  const prng = new MersenneTwister(seedNo);
  const heightMap = [];
  for (let i = 0; i < length * length; i++) {
    heightMap.push(prng.random());
  }
  return heightMap;
}

const seedHeightMap = createSeedHeightMap(detail, seed);

function proportionalRandomness(pos, size, height) {
  return (seedHeightMap[pos] - 0.5) * (size / (1 / roughness)) * (height / heightBound);
}

window.magnitude = magnitude;
window.detail = detail;
window.roughness = roughness;
window.smoothSize = smoothSize;
window.smoothIterations = smoothIterations;
window.proportionalRandomness = proportionalRandomness;
window.seed = seed;
window.seedHeightMap = seedHeightMap;
