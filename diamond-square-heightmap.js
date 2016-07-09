
const magnitude = 100;
const detail = 2;
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
      array[x + half + ((y + half) * (max))] = 1;
      console.log(x, y)
    }
  }
  return array;
}

function square(arr, size) {
  const array = arr;
  const half = size / 2;
  const max = Math.sqrt(array.length);
  for (let y = 0; y < max - 1; y += size) {
    for (let x = 0; x < max - 1; x += size) {
      array[x + half + (y * max)] = 1; // Top middle
      // console.log(x + half + (y * max))
      array[x + ((y + half) * (max))] = 1; // Left middle
      // console.log(x + ((y + half) * max))
      array[x + size + ((y + half) * (max))] = 1; // Right middle
      // console.log(x + max + ((y + half) * max))
      array[x + half + ((y + size) * (max))] = 1; // Bottom middle
      // console.log(x + half + ((y + (size - 1)) * max))
      // array[] = 1
      // array[(x) + (half * y * max)] = 1;
    }
  }
  return array;
}

let terrain = createTerrain(detail);
let initialHeightMap = setInitialConditions(terrain);
// console.log(initialHeightMap)
let diamond1 = diamond(initialHeightMap, 4)
console.log(diamond1)
let square1 = square(diamond1, 4)
console.log(square1)
let diamond2 = diamond(square1, 2)
console.log(diamond2)
let square2 = square(diamond2, 2)
console.log(square2)
