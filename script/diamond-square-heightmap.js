
const magnitude = 100;
const detail = 9;
const roughness = 1 // 0-1

function createTerrain(n) {
  const length = Math.pow(2, n) + 1;
  const heightMap = new Float32Array(length * length);
  return heightMap;
}

function setInitialConditions(arr) {
  const array = arr;
  const max = array.length;
  const width = Math.sqrt(max);
  array[0] = 1;
  array[max - 1] = 1;
  array[width - 1] = 1;
  array[max - width] = 1;
  return array;
}

function diamond(arr, size) {
  const array = arr;
  const half = size / 2;
  const max = Math.sqrt(array.length);
  for (let y = 0; y < max - 1; y += size) {
    for (let x = 0; x < max - 1; x += size) {
      const h1 = array[x + (y * max)];
      const h2 = array[x + size + (y * max)];
      const h3 = array[x + ((y + size) * max)];
      const h4 = array[x + size + ((y + size) * max)];
      const height = ((h1 + h2 + h3 + h4) / 4) + ((Math.random() - 0.5) * (size / (max - 1)));
      array[x + half + ((y + half) * (max))] = height;
    }
  }
  return array;
}

function sum(a, b) {
  return a + b;
}

function average(arr) {
  return arr.reduce(sum) / arr.length;
}

function getHeightFromDiamond(pos, arr, x, y, size, max, half, position) {
  const heightArray = [];
  if (position !== 'tm' || y !== 0) {
    heightArray.push(arr[pos - (half * y)]);
  }
  if (position !== 'lm' || x !== 0) {
    heightArray.push(arr[pos - half]);
  }
  if (position !== 'rm' || x !== max - size) {
    heightArray.push(arr[pos + half]);
  }
  if (position !== 'bm' || y !== max - 1 - size) {
    heightArray.push(arr[pos + (half * y)]);
  }
  const height = average(heightArray) + ((Math.random() - 0.5) * (size / (max - 1)));
  return height;
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
  diamond(array, size);
  square(array, size);
  return divide(array, size / 2);
}

const terrain = createTerrain(detail);
const initialHeightMap = setInitialConditions(terrain);
const heightMap = divide(initialHeightMap, Math.pow(2, detail));


window.heightMap = heightMap;
