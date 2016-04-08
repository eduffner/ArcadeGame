var level = 3;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var x, y, sprite;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505){
        this.x = -101;
    }
    this.x += dt * 101;
    if( player.x+25 < this.x + 101 &&
        player.x + 101-25 > this.x &&
        player.y < this.y + 83 -20 &&
        83-10 + player.y > this.y)  {

        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var x, y, sprite;
    this.x = 2 * 101;
    this.y = 5 * 83 -10;

    this.sprite = 'images/char-boy.png';
};

// Update the player's position
Player.prototype.update = function() {
    if (this.y <=0){
        this.reset();
    }

};

Player.prototype.reset = function(){
    this.x = 2 * 101;
    this.y = 5 * 83 -10;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle keyboard input to move player
Player.prototype.handleInput = function(input){
    if (input == 'left'){
        if(this.x <= 0){
            this.x = 404;
        }
        else {
            this.x -= 101;
        }
    }
    else if (input == 'right'){
        if(this.x >= 404){
            this.x =0;
        }
        else {
            this.x += 101;
        }
    }
    else if (input == 'up'){
        if (this.y <= 0){
            return
        }
        this.y -= 83;

    }
    else if (input == 'down'){
        if(this.y >= 400){
            return;
        }
        this.y += 83;

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
numEnemies = level;

for(var i=0; i<numEnemies; i++){
    var enemy = new Enemy();
    randx = randomIntFromInterval(0,4);
    randy = randomIntFromInterval(1,3);
    enemy.x = randx * 101;
    enemy.y = randy * 83 - 20;
    allEnemies.push(enemy);
}

var player = new Player();

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
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
