const pacMen = []; // This array holds all the pacmen

// Returns a random point with values scaled by `scale`
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  const game = document.getElementById('game');

  // random velocity and starting position
  const velocity = setToRandom(10);  // {x: ?, y: ?}
  const position = setToRandom(200); // {x: ?, y: ?}

  // create the image
  const newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // set initial position (must include 'px')
  newimg.style.left = position.x + 'px';
  newimg.style.top  = position.y + 'px';

  // add to DOM
  game.appendChild(newimg);

  // return the pacman object
  return { position, velocity, newimg };
}

function update() {
  const game = document.getElementById('game');
  const maxX = game.clientWidth;
  const maxY = game.clientHeight;

  // loop over pacmen array and move each one
  pacMen.forEach((item) => {
    checkCollisions(item, maxX, maxY);

    // move position
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // sync DOM (include 'px')
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top  = item.position.y + 'px';
  });

  setTimeout(update, 20);
}

function checkCollisions(item, maxX, maxY) {
  // bounds are the game box minus the image size
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
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
