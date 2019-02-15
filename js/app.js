// --------------------------- ENEMY CLASS --------------------------- //
class Enemy {
    constructor(x, y, speed) {

        this.x = -50;//-100
        this.y = y;
        this.width = 70;
        this.height = 83
        this.speed = Math.floor(Math.random() * 101);
        // console.log(this.speed);
        this.sprite = 'images/enemy-bug.png';
    }
    
    update(dt) {

        // Speed Handler--> Gives enemies a random speeds (so they can move).
        this.x += this.speed * dt;       
        if(this.x > 505) {
            this.x = -90;
            this.speed = Math.floor(Math.random() * 101);
            this.speed < 30 ? this.speed === 30 : this.speed;
        }
    }
    
    checkCollisions(character) {
        // Calculates and handles collisions.
        if(character.x < this.x + this.width &&
            character.x + character.width > this.x &&
            character.y < this.y + this.height &&
            character.y + character.height > this.y ) {
           character.x = 202;
           character.y = 404;
           decreaseScore();
           
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}






// --------------------------- PLAYER CLASS --------------------------- //

class Player {
    constructor(x, y, sprite) {
       
        this.x = 202;
        this.y = 404;
       
        // Assigned a width and a height for the player to have a "colision range".
        this.width = 80;
        this.height = 63

        this.sprite = 'images/char-boy.png';
    }

    changePlayerSprite(count) {
        //  Changes the player sprite
        this.sprite = sprites[count];
    }


    reset() {   
        // Reset character to the original position (called either in winnig or losing)
        this.x = 202;
        this.y = 404
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Player's moving handler
    handleInput(key) {        
        switch(key) {
            case 'left':
            this.x = this.x > 0 ? this.x - 101 : this.x;        
            break
            case 'right':
            this.x = this.x >= 404 ? this.x : this.x + 101;
            break
            case 'up':
            if(this.y > 83){
                this.y -= 83;
            } else {
                this.reset()
                increaseScore();
            }
            break
            case 'down':
            this.y = this.y === 404? this.y : this.y + 83;
            break
        }        
    }
}



// --------------------------------------------------------------------//



// -----Now instantiate your objects.---------//


// Place all enemy objects in an array called allEnemies
const allEnemies = [];



// Aligned enemies and instantiated them.
const rows = [((83 * 1) - 20) , ((83 * 2) - 20), ((83 * 3) - 20)]
for(let i = 0; i < 3; i++) {
    let enemy = new Enemy(null, rows[i]);
    allEnemies.push(enemy);
}




// ----Instantiate Player ------//
// Place the player object in a variable called player
const player = new Player();
let counter = 0;
const checkCount = () => {
    if(player.x === 0 && player.y === 404) {                
        counter === 4? counter = 0 : counter++;
        player.changePlayerSprite(counter);
    }
}




// ------- Update score-----------//
const scoreBoard = document.querySelector('#score');
// Initial score
let score = 0;
// Updates the score
const increaseScore = () => {
    score++;
    return scoreBoard.innerHTML = score;
}

const decreaseScore = () => {
    score > 0 ? score -- : score = 0;
    return scoreBoard.innerHTML = score;
}


// ------- Other Sprites we can use --------//
const sprites = [    
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
]



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
    checkCount();
});
