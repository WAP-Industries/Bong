function GameLoop(){
    // this sets an infinite loop
    window.requestAnimationFrame(GameLoop)

    // clear the entire canvas for redrawing
    Context.clearRect(0,0, Canvas.width, Canvas.height)
    
    // forEach loops through the array and calls the method passed in
    // so this just calls the Update() property of all the game sprites
    Game.Sprites.forEach(i=>i.Update())
    
    // 'in' returns the index while looping through the array
    // so this just updates the score counter
    for (const i in Game.GUI) Game.GUI[i].innerHTML = Game.Score[i]
    
    // dont update any sprite positions if the Game.isPlaying flag is false
    if (!Game.isPlaying) return

    // otherwise, check if any win conditions are met
    else{
        const Conditions = [Ball.Position.X+Ball.Radius<=0, Ball.Position.X-Ball.Radius>=Canvas.width]
        for (let i=0;i<Conditions.length;i++){
            if (Conditions[i]){

                // !i converts i to the opposite of itself, so if i is 0, i becomes 'true'
                // then + (unary operator) converts i to an integer
                Game.Score[+!i]++

                // setting the last winner for the next ball serve
                Game.LastWin = [P2, P1][i]

                // setting the Game.isPlaying flag to false (so the next GameLoop call doesnt update any sprite positions) 
                Game.isPlaying = false

                // skip to the next iteration of the gameloop and continue the game after 2000 milliseconds (2 seconds)
                return setTimeout(Init, 2000)
            }
        }
    }

    for (let i of Array([Ball.Position.X-Ball.Radius<=P1.Position.X+P1.Width, P1], [Ball.Position.X+Ball.Radius>=P2.Position.X, P2])){
        // check if the ball collides with any paddle
        if (i[0] && 
            Ball.Position.Y>=i[1].Position.Y && 
            Ball.Position.Y<=i[1].Position.Y+i[1].Height
        ){
            // so according to https://en.wikipedia.org/wiki/Pong
            // if the ball collides at exactly the middle of the paddle, the ball is returned in a straight line
            // and anywhere above or below, the ball is returned at a smaller angle
            // this is like a scuffed implementation :P

            // get the y coordinate of the middle of the paddle
            const Middle = i[1].Position.Y+i[1].Height/2

            // if the ball collides with the middle of the paddle, the angle becomes a straight line
            if (Ball.Position.Y==Middle) Ball.Angle+=Math.PI

            // otherwise, return it at 45 degrees
            // the first ternary operator checks if the ball collided at the top, and if it did, reflect the angle
            // the second ternary operator checks which paddle the ball collided with
            // if it collided with the second one, then add 180 degrees (in radians) to the ball's angle
            else Ball.Angle = (Ball.Position.Y>Middle ? -1:1)*(i[1]==P2 ? 5/4:-1/4)*Math.PI
        }
    }

    // reflect the angle of the ball if it collides with the top or bottom of the screen
    if (
        Ball.Position.X>0 &&
        Ball.Position.X<Canvas.width &&
        (Ball.Position.Y<=Ball.Speed || Ball.Position.Y>=Canvas.height-Ball.Speed)
    ) Ball.Angle*=-1

    for (let i of Array([['W', 'S'], P1],[['I', 'K'], P2])){
        // if the respective up key is pressed and the paddle is within the screen boundary
        if (Keys[i[0][0]] && i[1].Position.Y>Settings.PaddleSpeed)
            i[1].Position.Y-=Settings.PaddleSpeed
        
        // if the respective down key is pressed and the paddle is within the screen boundary
        if (Keys[i[0][1]] && i[1].Position.Y+i[1].Height<Canvas.height-Settings.PaddleSpeed)
            i[1].Position.Y+=Settings.PaddleSpeed
    }
}