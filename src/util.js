// return an object with an x and y to represent a coordinate in a 2d space
const Coord = (X, Y)=> { return {X:X, Y:Y} }

// rng lol
const RandInt = (min, max)=> ~~(Math.random()*(max-min+1))+min