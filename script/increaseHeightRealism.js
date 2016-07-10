
/* global average, smoothSize, smoothIterations */

function smoothHeightMap(heightMap, iteration) {
  if (iteration >= smoothIterations) {
    return heightMap;
  }
  const nextIteration = iteration + 1;
  const smoothMatrixOffset = Math.floor(smoothSize / 2);
  const outputHeightMap = heightMap;
  const max = Math.sqrt(heightMap.length);
  for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
      const smoothingMatrix = [];
      for (let y1 = -(smoothMatrixOffset); y1 <= smoothMatrixOffset; y1++) {
        for (let x1 = -(smoothMatrixOffset); x1 <= smoothMatrixOffset; x1++) {
          if (heightMap[x + x1 + ((y + y1) * max)]
              && x + x1 < max - 1
              && x + x1 >= 0
              && y + y1 < max - 1
              && y + y1 >= 0) {
            smoothingMatrix.push(heightMap[x + x1 + ((y + y1) * max)]);
          }
        }
      }
      outputHeightMap[x + (y * max)] = average(smoothingMatrix);
    }
  }
  return smoothHeightMap(outputHeightMap, nextIteration);
}

window.smoothHeightMap = smoothHeightMap;
