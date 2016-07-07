
const size = 100;
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
  const max = Math.sqrt(array.length) - 1
  for (let y = half; y < max; y += size) {
    for (let x = half; x < max; x += size) {

    }
  }
  return array;
}

function square(arr, size) {

}

let terrain = createTerrain(detail);
let initialHeightMap = setInitialConditions(terrain);
//let diamond1 = diamond(initialHeightMap, Math.sqrt(initialHeightMap.length) - 1)

console.log(initialHeightMap)
