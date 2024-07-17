let Container, Canvas, Context

window.onload = ()=>{
    // storing the html elements defined in index.html in variables
    Container = document.getElementById("Container")
    Canvas = document.getElementById("Canvas")

    // destructuring assignment to set canvas dimensions
    ;[Canvas.width, Canvas.height] = [window.innerWidth, window.innerHeight];
    
    // making sure the canvas bit width and style width match 
    // otherwise there can be some inaccuracies when rendering stuff
    Container.style.width = Canvas.style.width = Canvas.width+"px"
    Container.style.height = Canvas.style.height = Canvas.height+"px"
    
    // setting the canvas background to transparent 
    // since the score counter divs will be added before it
    Canvas.style.background = "none"

    // setting up the canvas context (used for rendering stuff)
    Context = Canvas.getContext('2d')

    SetScreen()
    Init()
    GameLoop()
}

function SetScreen(){
    // adding the main sprites (paddles and ball)
    Game.Sprites = [P1, P2, Ball]
    
    // adding the dividing line sprites
    // they will be added along the height of the canvas, 20 pixels away from each other
    let w = 15, h = 50, s = 20
    for (let i=0;i<~~(Canvas.height/h);i++){
        Game.Sprites.splice(0, 0,
            new Sprite(
                "white",
                (Canvas.width-w)/2, i*h+i*s,
                w, h
            )
        )
    }

    // adding the score counter html divs
    for (let i=0;i<2;i++){
        const Div = document.createElement("div")
        
        // styling the div
        Div.style = `position: absolute; margin: auto; top: 0; bottom:0; 
                    background: none; 
                    color: white; text-align: center;
                    user-select: none`
        ;[Div.style.width, Div.style.height] = [`${Canvas.width/2*0.8}px`, `${Canvas.height*0.8}px`];
        Div.style.left = `${(Canvas.width/2-parseInt(Div.style.width, 10))/2+i*Canvas.width/2}px`
        Div.style.fontSize = `${parseInt(Div.style.height, 10)*0.8}px`
        Div.innerHTML = Game.Score[i]
        Container.insertBefore(Div, Canvas)

        // adding the div to the Game.GUI property for easier score tracking/changing
        Game.GUI.push(Div)
    }
}

function Init(){
    // correctly positioning paddles
    // ~~ is just a faster Math.round :P
    P1.Position.Y = P2.Position.Y = ~~(Canvas.height-P1.Height)/2
    P2.Position.X = Canvas.width-P2.Width

    // ?? is a null coalesce operator
    // basically means if the left-hand value is null, return the right-hand value instead
    // so essentially this means if Game.LastWin is null (nobody has scored yet), pick a random paddle
    const Paddle = (Game.LastWin ?? [P1, P2][RandInt(0,1)])

    // position the ball at the chosen paddle
    Ball.Position = Coord(
        Paddle.Position.X+Paddle.Width/2,
        Canvas.height/2
    )

    // set the angle of the ball at a random angle
    // reflect the angle if the ball starts from the right paddle
    Ball.Angle = RandInt(-90, 90)*180/Math.PI*(Paddle==P2 ? -1:1)

    // set the Game.isPlaying flag, this will be used to check if the screen can be updated
    Game.isPlaying = true
}