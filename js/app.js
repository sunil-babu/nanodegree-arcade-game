let winCount = 0;
let failCount= 0;
let winCountElement = document.querySelector(".winCount");
winCountElement.textContent = winCount;
let failCountElement = document.querySelector(".failCount");
failCountElement.textContent = failCount;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    this.x += this.speed * dt;

    //reset position when moving out canvas
    if (this.x > 550) {
       this.x = -100;
       this.speed = 100 + Math.floor(Math.random()*600);
   }

   // reset player position when collide with enemy-bug
   if (player.x > (this.x - 50) && player.x < (this.x + 50) && player.y > (this.y - 50) && player.y < (this.y + 50)) {
     player.x = 200;
     player.y = 380;
     failCountElement.textContent = failCount++;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player classs
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
}

// Now instantiate your objects.
Player.prototype.update = function (){
  //Dont allow player to move out of the area
  if (this.x < 0) {
      this.x = 0;
  }
  if (this.x > 400) {
      this.x = 400;
  }
  if (this.y > 380) {
      this.y = 380;
  }


  // Reset position,when the player wins
  if (this.y < 0) {
      this.x = 200;
      this.y = 380;
      winCountElement.innerHTML = winCount++;
  }
};

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
       case 'left':
           this.x -= 100;
           break;
       case 'up':
           this.y -= 80;
           break;
       case 'right':
           this.x += 100;
           break;
       case 'down':
           this.y += 80;
           break;
   }
};

// Place all enemy objects in an array called allEnemies
var allEnemies=[];
// Place the player object in a variable called player
var player = new Player(200, 380);
// Position "y" where the enemies will are created
var position = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

position.forEach(function(y) {
    let calculateSpeed = Math.floor(Math.random() * 700)
    enemy = new Enemy(0, y, calculateSpeed);
    allEnemies.push(enemy);
});




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
