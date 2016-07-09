/* global THREE */

function addXYZValues(array, vector) {
  array.push(vector.x);
  array.push(vector.y);
  array.push(vector.z);
}

function calculateNormal(vector1, vector2, vector3) {
  const normal1 = new THREE.Vector3();
  const normal2 = new THREE.Vector3();

  normal1.subVectors(vector3, vector2);
  normal2.subVectors(vector1, vector2);

  normal1.cross(normal2).normalize();
  return normal1;
}

window.addXYZValues = addXYZValues;
window.calculateNormal = calculateNormal;
