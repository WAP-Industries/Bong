class Sprite{
    constructor(Color, X, Y, Width, Height){
        this.Color = Color
        this.Position = Coord(X, Y)
        ;[this.Width, this.Height] = [Width, Height];
    }

    Update(){
        // polymorphism
        // basically means even though Sprite.Render and BallSprite.Render are 2 different instance methods
        // the same syntax (this.Render()) will call the different methods accordingly
        // for now since ur using js u dont hv to worry about this 
        /// but if u progress to languages like c++ ur gonna need to hv a fundamental understanding of this
        Context.fillStyle = this.Color
        this.Render()

        // this checks if the sprite is an instance of the subclass BallSprite
        if (this instanceof BallSprite){
            // get the ball velocity
            const Velocity = Coord(
                Math.cos(this.Angle)*this.Speed,
                Math.sin(this.Angle)*this.Speed
            )
            this.Position.X+=Velocity.X
            this.Position.Y+=Velocity.Y
        }
    }

    Render(){
        // drawing a rectangle
        Context.fillRect(...Object.values(this.Position), this.Width, this.Height)
    }
}

class BallSprite extends Sprite{
    constructor(Color, X, Y, Radius, Speed){
        // invoke the Sprite base constructor 
        super(Color, X, Y, 0,0)
        
        this.Radius = Radius
        this.Speed = Speed
        this.Angle = 0
    }

    Render(){
        // drawing a circle
        Context.beginPath()
        Context.arc(
            ...Object.values(this.Position),
            this.Radius, 
            0, Math.PI*2
        )
        Context.fill()
    }
}