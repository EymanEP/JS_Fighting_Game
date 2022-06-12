//Sprite object
class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
    }
    //Function to draw the sprite with the constructor properties
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    //Function to update the sprite
    update() {
        //Draw variable and Y velocity for the gravity
        this.draw()
    }
}
//Fighter sprite
class Fighter {
    constructor({position, velocity, color = 'blue', offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }
    //Function to draw the sprite with the constructor properties
    draw(){
        //Sprite object is drawn here
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //AttackBox is drawn here
        if (this.isAttacking) {
            c.fillStyle = 'yellow'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y,
                this.attackBox.width, this.attackBox.height);
        }
    }
    //Function to update the sprite
    update() {
        //Attack box to follow the player position
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        //Draw variable and Y velocity for the gravity
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //Bottom border to not fall through the ground
        if(this.position.y + this.height + this.velocity.y >= CANVAS.height - 95) {
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }

    }
    //Attack function
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}