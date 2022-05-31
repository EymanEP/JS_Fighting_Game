//Variables from index.html
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//canvas height and width
canvas.width = 1024
canvas.height = 576
//Fill the canvas and set its width and height
c.fillRect(0,0, canvas.width, canvas.height)
//Gravity
const gravity = 0.2
//Sprite object
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    //Function to draw the sprite with the constructor properties
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    //Function to update the sprite
    update() {
        //Draw variable and Y velocity for the gravity
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Bottom border to not fall through the ground
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}
//Use the sprite object for the player
const player = new Sprite({
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
const enemy = new Sprite({
    //Starting position
    position: {
        x: 300,
        y: 0
    },
    //Velocity of the enemy
    velocity: {
        x: 0,
        y: 0
    }
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
//Track the las key pressed
let lastKey
//Function for the "update" loop mechanic
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()
    //Default player velocity is 0
    player.velocity.x = 0
    //Player movement
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
    //Default velocity of 0
    enemy.velocity.x = 0
    //Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    }
}

animate();
//Event listener for the controls
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
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