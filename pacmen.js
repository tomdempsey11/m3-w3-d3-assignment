const pacMen = []; // This array holds all the pacmen

// Returns a random point with values scaled by `scale`
function setToRandom(scale) {
  return { x: Math.random() * scale, y: Math.random() * scale };
}

// (Optional) Preload images for smoother swaps
const SPRITES = {
  right: ['./images/PacMan1.png', './images/PacMan2.png'], // open, closed
  left:  ['./images/PacMan3.png', './images/PacMan4.png'], // open, closed
};
Object.values(SPRITES).flat().forEach(src => { const i = new Image(); i.src = src; });

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  const game = document.getElementById('game');

  const velocity = setToRandom(10);   // movement per tick
  const position = setToRandom(200);  // starting position

  const newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.width = 100;

  // initial direction & frame
  const direction = velocity.x >= 0 ? 'right' : 'left';
  const frame = 0;         // 0=open, 1=closed
  const frameTick = 0;     // counter for when to swap frames
  const frameEvery = 8;    // swap mouth every N ticks (tweak to taste)

  // set initial img & position
  newimg.src = SPRITES[direction][frame];
  newimg.style.left = position.x + 'px';
  newimg.style.top  = position.y + 'px';

  game.appendChild(newimg);

  // return the pacman object (include animation state)
  return { position, velocity, newimg, direction, frame, frameTick, frameEvery };
}

function update() {
  const game = document.getElementById('game');
  const maxX = game.clientWidth;
  const maxY = game.clientHeight;

  pacMen.forEach((item) => {
    checkCollisions(item, maxX, maxY);

    // Move
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Update direction based on horizontal velocity
    const newDirection = item.velocity.x >= 0 ? 'right' : 'left';
    if (newDirection !== item.direction) item.direction = newDirection;

    // Animate mouth every N ticks
    item.frameTick = (item.frameTick + 1) % item.frameEvery;
    if (item.frameTick === 0) {
      item.frame = item.frame ^ 1; // toggle 0<->1
      item.newimg.src = SPRITES[item.direction][item.frame];
    }

    // Sync DOM
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top  = item.position.y + 'px';
  });

  setTimeout(update, 20);
}

function checkCollisions(item, maxX, maxY) {
  const rightBound = maxX - item.newimg.width;
  const bottomBound = maxY - item.newimg.height;

  // left/right walls
  if (item.position.x <= 0 && item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
  } else if (item.position.x >= rightBound && item.velocity.x > 0) {
    item.velocity.x = -item.velocity.x;
  }

  // top/bottom walls
  if (item.position.y <= 0 && item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  } else if (item.position.y >= bottomBound && item.velocity.y > 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
