# Seed Based Terrain Generation
###Terrain generation algorithm using diamond-square fractal and map seed.

##How to use

WASD moves the camera position and click & drag rotates

##Why?
Experiment with three.js and fractal algorithms

##How?
Base algorithm is the diamond-square fractal based off Paul Boxley's excellent description [here](http://www.paulboxley.com/blog/2011/03/terrain-generation-mark-one)
Seed is used to feed a merseinne-twister PRNG (pseudo random number generator).
A height map is generated and then rendered using three.js.


