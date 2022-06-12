//Detect collisions
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        //Detect if collider has already crossed the enemy
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        //Detect for collisions on the y axis
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
//Boolean variable for the Game Over part
let isGameOVer = false
//Function to determine the Winner
function determineWinner({PLAYER, ENEMY, timerID}) {
    clearTimeout(timerID)
    document.querySelector("#displayText").style.display = 'flex'
    if (PLAYER.health === ENEMY.health) {
        document.querySelector("#displayText").innerHTML = 'TIE'
    } else if (PLAYER.health > ENEMY.health) {
        document.querySelector("#displayText").innerHTML = 'PLAYER 1 Wins'
    } else if (PLAYER.health < ENEMY.health) {
        document.querySelector("#displayText").innerHTML = 'PLAYER 2 Wins'
    }
    isGameOVer = true
}
//Timer variable
let timer = 60
let timerID
//Actual Timer function
function decreaseTimer() {
    //Decrease time
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--;
        document.querySelector("#timer").innerHTML = timer
    }
    //End game based on time
    if (timer === 0) {
        determineWinner({PLAYER, ENEMY})
    }
}