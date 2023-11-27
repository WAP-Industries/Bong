// return an object with an x and y to represent a coordinate in a 2d space
const Coord = (X, Y)=> { return {X:X, Y:Y} }

// restrict an angle between 1 revolution
function ClampAngle(Angle){
    Angle = (Angle*180/Math.PI)%360
    if (Angle<0) Angle+=360
    return Angle*Math.PI/180
}

// rng lol
const RandInt = (min, max)=> ~~(Math.random()*(max-min+1))+min