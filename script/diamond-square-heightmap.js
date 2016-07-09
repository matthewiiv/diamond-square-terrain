
const magnitude = 100;
const detail = 8;
const roughness = 1 // 0-1


function sum(a, b) {
  return a + b;
}

function average(arr) {
  return arr.reduce(sum) / arr.length;
}
function proportionalRandomness(size, max) {
  return (Math.random() - 0.5) * (size / 3);
}

function getHeightFromDiamond(pos, arr, x, y, size, max, half, position) {
  const heightArray = [];
  if (position !== 'tm' || y !== 0) {
    heightArray.push(arr[pos - (half * max)]);
  }
  if (position !== 'lm' || x !== 0) {
    heightArray.push(arr[pos - half]);
  }
  if (position !== 'rm' || x !== max - 1 - size) {
    heightArray.push(arr[pos + half]);
  }
  if (position !== 'bm' || y !== max - 1 - size) {
    heightArray.push(arr[pos + (half * max)]);
  }
  const change = proportionalRandomness(size, max);
  const height = average(heightArray) + change;
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
      const change = proportionalRandomness(size, max);
      const height = average(heights) + change;

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
  const max = array.length;
  const width = Math.sqrt(max);
  array[0] = width / 5;
  array[max - 1] = (width / 5);
  array[width - 1] = - (width / 10);
  array[max - width] = - (width / 10);
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

function divide(array, size) {
  if (size === 1) {
    return array;
  }
  const diamondArray = diamond(array, size);
  const squareArray = square(diamondArray, size);
  return divide(squareArray, size / 2);
}

const terrain = createTerrain(detail);
const initialHeightMap = setInitialConditions(terrain);
const heightMap = divide(initialHeightMap, Math.pow(2, detail));


window.heightMap = heightMap;
