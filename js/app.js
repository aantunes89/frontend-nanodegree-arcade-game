// Enemies our player must avoid
let score = 0


class Enemy {
    constructor(x, y, speed) {
        
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = -50;//-100
        this.y = y;
        this.speed = Math.floor(Math.random() * 101);
        // console.log(this.speed);
        this.sprite = 'images/enemy-bug.png';
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks    
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if(this.x > 505) {
            this.x = -90;
            this.speed = Math.floor(Math.random() * 101 + 30);            
        }
    }
    
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y, sprite) {
        this.x = 202;
        this.y = (83*5) - 20;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
    

        

        switch(key) {
            case 'left':
            this.x = this.x > 0 ? this.x - 101 : this.x;
            break
            case 'right':
            this.x = this.x >= 404 ? this.x : this.x + 101;
            break
            case 'up':
            // this.y = this.y > 83 ? this.y - 83 : this.y = 415;
            if(this.y > 63){
                this.y -= 63;
            } else {
                this.y = (83*5) - 20;
                score++;
            }
            break
            case 'down':
            this.y = this.y === (83*5) - 20? this.y : this.y + 63;
            console.log(this.y);
            checkCollisions();
            break
        }
        
    }
}


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies

const allEnemies = [];
const rows = [((83 * 1) - 20) , ((83 * 2) - 20), ((83 * 3) - 20)]
for(let i = 0; i < 3; i++) {
    let enemy = new Enemy(null, rows[i]);
    allEnemies.push(enemy);
}

console.log(allEnemies.x);


// Place the player object in a variable called player

const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
