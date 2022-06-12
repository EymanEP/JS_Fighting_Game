//Variables from index.html
const CANVAS = document.querySelector('canvas')
const c = CANVAS.getContext('2d')
//canvas height and width
CANVAS.width = 1024
CANVAS.height = 576
//Fill the canvas and set its width and height
c.fillRect(0,0, CANVAS.width, CANVAS.height)
//Gravity
const GRAVITY = 0.7
//Background
const BACKGROUND = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})
//Use the Fighter object for the player
const PLAYER = new Fighter ({
    //Starting position
    position: {
        x: 0,
        y: 0
    },
    //The x and y velocity of the player
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    }
})
//Using the Fighter object for the enemy
const ENEMY = new Fighter ({
    //Starting position
    position: {
        x: 300,
        y: 0
    },
    //Velocity of the enemy
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'red'
})

//List for the pressed property on the following keys
const keys = {
    //Player Keys
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    w: {
        pressed: false
    },
    //Enemy Keys
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
//Timer function
decreaseTimer()

//Function for the "update" loop mechanic
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,CANVAS.width, CANVAS.height)
    BACKGROUND.update()
    //Update fighters
    PLAYER.update()
    ENEMY.update()
    //Default player velocity is 0
    PLAYER.velocity.x = 0
    //Default velocity of 0
    ENEMY.velocity.x = 0
    if (!isGameOVer) {
        //Player movement
        if (keys.a.pressed && PLAYER.lastKey === 'a') {
            PLAYER.velocity.x = -5
        } else if (keys.d.pressed && PLAYER.lastKey === 'd') {
            PLAYER.velocity.x = 5
        }
        //Enemy movement
        if (keys.ArrowLeft.pressed && ENEMY.lastKey === 'ArrowLeft') {
            ENEMY.velocity.x = -5
        } else if (keys.ArrowRight.pressed && ENEMY.lastKey === 'ArrowRight') {
            ENEMY.velocity.x = 5
        }
    } else if (isGameOVer) {
        if (keys.a.pressed && PLAYER.lastKey === 'a') {
            PLAYER.velocity.x = 0
        } else if (keys.d.pressed && PLAYER.lastKey === 'd') {
            PLAYER.velocity.x = 0
        }
        //Enemy movement
        if (keys.ArrowLeft.pressed && ENEMY.lastKey === 'ArrowLeft') {
            ENEMY.velocity.x = 0
        } else if (keys.ArrowRight.pressed && ENEMY.lastKey === 'ArrowRight') {
            ENEMY.velocity.x = 0
        }
    }

    //Detect for collision
    //PLAYER attack Collisions
    if (rectangularCollision({
            rectangle1: PLAYER,
            rectangle2: ENEMY
    })
        && PLAYER.isAttacking) {
        PLAYER.isAttacking = false
        ENEMY.health -= 10
        document.querySelector('#enemyHealth').style.width = ENEMY.health + '%'
    }
    //ENEMY attack Collisions
    if (rectangularCollision({
            rectangle1: ENEMY,
            rectangle2: PLAYER
        })
        && ENEMY.isAttacking) {
        ENEMY.isAttacking = false
        PLAYER.health -= 10
        document.querySelector('#playerHealth').style.width = PLAYER.health + '%'
    }

    //End game based on health
    if (ENEMY.health <= 0 || PLAYER.health <= 0) {
        determineWinner({PLAYER, ENEMY, timerID})
    }
}

animate();
//Event listener for the controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            PLAYER.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            PLAYER.lastKey = 'a'
            break
        case 'w':
            if (!isGameOVer) {
                PLAYER.velocity.y = -20
            }
            break
        case ' ':
            if (!isGameOVer) {
                PLAYER.attack()
            }
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            ENEMY.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            ENEMY.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (!isGameOVer) {
                ENEMY.velocity.y = -20;
            }
            break
        case 'ArrowDown':
            if (!isGameOVer) {
                ENEMY.attack()
            }
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }
    //Enemy Player
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})