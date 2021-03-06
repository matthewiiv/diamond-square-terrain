
/* global magnitude, detail, roughness, proportionalRandomness, smoothHeightMap MersenneTwister, seedHeightMap */

const monkeys = WebMonkeys();

function sum(a, b) {
  return a + b;
}

function average(arr) {
  return arr.reduce(sum) / arr.length;
}

function randomiseCornerWeights(array) {
  const weights = array.reduce((arr) => {
    return arr.concat(1 - (Math.random() * 0.01));
  }, []);
  const weightedArray = [];
  for (let i = 0; i < weights.length; i++) {
    weightedArray.push(weights[i] * array[i]);
  }
  return weightedArray;
}

function getHeightFromDiamond(pos, arr, x, y, size, max, half, position) {
  const heightArray = [];
  if (position !== 'tm' || y !== 0) {
    heightArray.push(arr[pos - (half * max)]);
  }
  if (position !== 'lm' || x !== 0) {
    heightArray.push(arr[pos - half]);
    if (position !== 'rm' || x !== max - 1 - size) {
    }
    heightArray.push(arr[pos + half]);
  }
  if (position !== 'bm' || y !== max - 1 - size) {
    heightArray.push(arr[pos + (half * max)]);
  }
  const weightedCorners = randomiseCornerWeights(heightArray);
  const change = proportionalRandomness(pos, size, average(weightedCorners));
  const height = average(weightedCorners) + change;
  return height;
}

function diamond(arr, size) {
  const array = arr;
  const half = size / 2;
  const max = Math.sqrt(array.length);
  for (let y = 0; y < max - 1; y += size) {
    for (let x = 0; x < max - 1; x += size) {
      const heights = [];
      heights.push(array[x + (y * max)]);
      heights.push(array[x + size + (y * max)]);
      heights.push(array[x + ((y + size) * max)]);
      heights.push(array[x + size + ((y + size) * max)]);
      const weightedCorners = randomiseCornerWeights(heights);
      const change = proportionalRandomness(x + half + ((y + half) * (max)), size, average(weightedCorners));
      const height = average(weightedCorners) + change;

      array[x + half + ((y + half) * (max))] = height;
    }
  }
  return array;
}

function createTerrain(n) {
  const length = Math.pow(2, n) + 1;
  const heightMap = new Float32Array(length * length);
  return heightMap;
}

function setInitialConditions(arr) {
  const array = arr;
  const arrSize = array.length;
  const max = Math.sqrt(arrSize);
  array[0] = max / 5; // Top left
  array[arrSize - 1] = (max / 5); // Bottom right
  array[max - 1] = - (max / 10); // Top right
  array[arrSize - max] = - (max / 20); // Bottom left
  return array;
}

function square(arr, size) {
  const array = arr;
  const half = size / 2;
  const max = Math.sqrt(array.length);
  for (let y = 0; y < max - 1; y += size) {
    for (let x = 0; x < max - 1; x += size) {
      const pos1 = x + half + (y * max);
      const h1 = getHeightFromDiamond(pos1, array, x, y, size, max, half, 'tm');
      array[pos1] = h1; // Top middle
      const pos2 = x + ((y + half) * (max));
      const h2 = getHeightFromDiamond(pos2, array, x, y, size, max, half, 'lm');
      array[pos2] = h2; // Left middle
      const pos3 = x + size + ((y + half) * (max));
      const h3 = getHeightFromDiamond(pos3, array, x, y, size, max, half, 'rm');
      array[pos3] = h3; // Right middle
      const pos4 = x + half + ((y + size) * (max));
      const h4 = getHeightFromDiamond(pos4, array, x, y, size, max, half, 'bm');
      array[pos4] = h4; // Bottom middle
    }
  }
  return array;
}

// function createWater(water) {
//   return water.forEach(() => 1);
// }

function divide(array, size) {
  if (size === 1) {
    return array;
  }
  const diamondArray = diamond(array, size);
  const squareArray = square(diamondArray, size);
  return divide(squareArray, size / 2);
}

const terrain = createTerrain(detail);
const water = createTerrain(detail);
const waterHeightMap = water;
const initialTerrainHeightMap = setInitialConditions(terrain);
const terrainHeightMap = divide(initialTerrainHeightMap, Math.pow(2, detail));
const smoothedTerrainHeightMap = smoothHeightMap(terrainHeightMap, 0);

window.average = average;
window.terrainHeightMap = terrainHeightMap;
window.smoothedTerrainHeightMap = smoothedTerrainHeightMap;
window.waterHeightMap = waterHeightMap;
