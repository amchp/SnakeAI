let grid;
let blockSize = 10;
let count = false
function setup() {
  let snake;
  let fr = 180;
  createCanvas(400, 400);
  frameRate(fr);
  snake = new Snake(width / 2, height / 2,
    blockSize);
  grid = new Grid(snake, blockSize);
  grid.passSnake(snake);
  grid.createPellet();
}

function draw() {
  //Pelllet found move snake
  if (grid.pelletFound)pelletFound();
  if (!grid.pelletFound)searchForPellet();
  grid.display();
}