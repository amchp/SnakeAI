let grid;
let blockSize = 10;
let count = false;
let gameOver = false;
function setup() {
  let snake;
  let fr = 180;
  createCanvas(400, 400);
  frameRate(fr);
  snake = new Snake(width / 2, height / 2,
    blockSize);
  grid = new Grid(snake, blockSize);
  grid.createPellet();
}

function draw() {
  //Pelllet found move snake
  if(gameOver){
    drawGameOver(); 
    return;
  }
  else if(grid.pelletFound)pelletFound();
  else if(!grid.pelletFound)searchForPellet();
  grid.display();
}

function keyPressed(){
  if(gameOver){
    gameOver = false;
    grid.snake.reset()
    grid.reset()
    grid.createPellet()
  }
}