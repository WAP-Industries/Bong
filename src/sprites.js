// ball sprite
const Ball = new BallSprite(
    "white",
    10,10,
    10,
    Settings.BallSpeed
)

const DefArgs = ["white",0,0,20,100]

// paddle sprites
// ... is essentially the javascript version of the python unpack (*) operator
const P1 = new Sprite(...DefArgs)
const P2 = new Sprite(...DefArgs)