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

        // Speed Handler
        this.x += this.speed * dt;       
        if(this.x > 505) {
            this.x = -90;
            this.speed = Math.floor(Math.random() * 101);
            this.speed < 30 ? this.speed === 30 : this.speed;
        }
        // Calculate colision
        if(player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y ) {
           player.x = 202;
           player.y = 404;
           score--;
           score >=0 ? updateScore() : score = 0; 
           
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
        // Altura e largura do player para termos uma 'área de colisão' e assim
        // calcularmos a possível colisão com um inigmo
        this.width = 80;
        this.height = 63
        this.sprite = 'images/char-boy.png';
    }

    changePlayerSprite() {
        //  Changes the player sprite
        if(player.x === 0) {
            if(counter === 4) {
                counter = 0;
                player.sprite = sprites[counter];
            } else {
                counter++;
                player.sprite = sprites[counter];
            }
        }
    }


    reset() {
        // Reset para posição inicial do player em caso de vitória ou de choque com inimigo
        this.x = 202;
        this.y = 404
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handler da movimentação do player
    handleInput(key) {        
        switch(key) {
            case 'left':
            this.x = this.x > 0 ? this.x - 101 : this.x;
            player.changePlayerSprite()
            break
            case 'right':
            this.x = this.x >= 404 ? this.x : this.x + 101;
            break
            case 'up':
            if(this.y > 83){
                this.y -= 83;
            } else {
                player.reset()
                score++;
                updateScore();
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



// Here we subtract 20 to align enemies sprites 
const rows = [((83 * 1) - 20) , ((83 * 2) - 20), ((83 * 3) - 20)]
for(let i = 0; i < 3; i++) {
    let enemy = new Enemy(null, rows[i]);
    allEnemies.push(enemy);
}




// ----Instantiate Player ------//
// Place the player object in a variable called player
const player = new Player();




// ------- Update score-----------//
const scoreBoard = document.querySelector('#score');
// placar inicial
let score = 0;
// função que atualiza o placar
const updateScore = () => {
    return scoreBoard.innerHTML = score;
}


// ------- Other Sprites we can use --------//
let counter = 0;
const sprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'    
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
});
