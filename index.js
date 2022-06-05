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
//Sprite object
class Sprite {
    constructor({position, velocity, color = 'blue'}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: this.position ,
            width: 100,
            height: 50
        }
        this.color = color
    }
    //Function to draw the sprite with the constructor properties
    draw(){
        //Sprite object is drawn here
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)
        //AttackBox is drawn here
        c.fillStyle = 'yellow'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
    //Function to update the sprite
    update() {
        //Draw variable and Y velocity for the gravity
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Bottom border to not fall through the ground
        if(this.position.y + this.height + this.velocity.y >= CANVAS.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }
    }
}
//Use the sprite object for the player
const PLAYER = new Sprite({
    //Starting position
    position: {
        x: 0,
        y: 0
    },
    //The x and y velocity of the player
    velocity: {
        x: 0,
        y: 10
    }
})
//Using the sprite object for the enemy
const ENEMY = new Sprite({
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
//Function for the "update" loop mechanic
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,CANVAS.width, CANVAS.height)
    PLAYER.update()
    ENEMY.update()
    //Default player velocity is 0
    PLAYER.velocity.x = 0
    //Default velocity of 0
    ENEMY.velocity.x = 0
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

    //Detect for collision
    if (PLAYER.attackBox.position.x + PLAYER.attackBox.width >= ENEMY.position.x) {
        console.log('colliding')
    }
}

animate();
//Event listener for the controls
window.addEventListener('keydown', (event) => {
    console.log(event.key)
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
            PLAYER.velocity.y = -20
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
            ENEMY.velocity.y = -20
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