/* global THREE, addXYZValues, calculateNormal, heightMap, detail */

function colRand(RGB) {
  return RGB + ((Math.random() - 0.5) * 0.1);
}

function addColors(vector, label) {
  if (label === 'terrain') {
    if (vector.y > (detail * 4) + ((Math.random() - 0.5) * 10)) {
      return new THREE.Vector3(colRand(0.8), colRand(0.8), colRand(0.8));
    } else if (vector.y > detail + ((Math.random() - 0.5) * 1)) {
      return new THREE.Vector3(colRand(0.4), colRand(0.4), colRand(0.4));
    } else if (vector.y > 3 + ((Math.random() - 0.5) * 1)) {
      return new THREE.Vector3(colRand(0.54), colRand(0.27), colRand(0.074));
    }
    return new THREE.Vector3(colRand(0.1), colRand(0.8), colRand(0.1));
  }
  if (label === 'water') {
    return new THREE.Vector3(28 / 255, 107 / 255, 160 / 255);
  }
  return new THREE.Vector3(0, 0, 0);
}


function calculatePositions(heightMap) {
  const positions = [];
  const offset = Math.sqrt(heightMap.length) / 2;
  const max = Math.sqrt(heightMap.length);
  for (let y = 0; y < max - 1; y++) {
    for (let x = 0; x < max - 1; x++) {
      const v1 = new THREE.Vector3(x - offset, heightMap[x + (y * max)], y - offset);
      const v2 = new THREE.Vector3((x + 1) - offset, heightMap[x + 1 + (y * max)], y - offset);
      const v3 = new THREE.Vector3(x - offset, heightMap[x + ((y + 1) * max)], (y + 1) - offset);
      const v4 = new THREE.Vector3((x + 1) - offset, heightMap[x + 1 + ((y + 1) * max)], (y + 1) - offset);

      addXYZValues(positions, v1);
      addXYZValues(positions, v2);
      addXYZValues(positions, v3);
      addXYZValues(positions, v2);
      addXYZValues(positions, v3);
      addXYZValues(positions, v4);
    }
  }
  return positions;
}

function calculateNormals(positions) {
  const normals = [];
  for (let i = 0; i < positions.length; i += 18) {
    const v1 = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
    const v2 = new THREE.Vector3(positions[i + 3], positions[i + 4], positions[i + 5]);
    const v3 = new THREE.Vector3(positions[i + 6], positions[i + 7], positions[i + 8]);
    const v4 = new THREE.Vector3(positions[i + 15], positions[i + 16], positions[i + 17]);

    const triangle1Normal = calculateNormal(v1, v2, v3);
    const triangle2Normal = calculateNormal(v2, v3, v4);

    addXYZValues(normals, triangle1Normal);
    addXYZValues(normals, triangle1Normal);
    addXYZValues(normals, triangle1Normal);
    addXYZValues(normals, triangle2Normal);
    addXYZValues(normals, triangle2Normal);
    addXYZValues(normals, triangle2Normal);
  }
  return normals;
}

function calculateColors(positions, label) {
  const colors = [];
  for (let i = 0; i < positions.length; i += 18) {
    const v1 = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
    const v2 = new THREE.Vector3(positions[i + 3], positions[i + 4], positions[i + 5]);
    const v3 = new THREE.Vector3(positions[i + 6], positions[i + 7], positions[i + 8]);
    const v4 = new THREE.Vector3(positions[i + 9], positions[i + 10], positions[i + 11]);
    addXYZValues(colors, addColors(v1, label));
    addXYZValues(colors, addColors(v2, label));
    addXYZValues(colors, addColors(v3, label));
    addXYZValues(colors, addColors(v2, label));
    addXYZValues(colors, addColors(v3, label));
    addXYZValues(colors, addColors(v4, label));
  }
  return colors;
}

window.calculatePositions = calculatePositions;
window.calculateNormals = calculateNormals;
window.calculateColors = calculateColors;
