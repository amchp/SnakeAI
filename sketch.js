let blockSize = 10;
let snake;
let fr = 180;
let start = true;
let pelletFound;
let grid;
let openSet;
let closedSet;
let parentArr;
let parIndex;
let count = false;

function setup() {
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
  if (start && pelletFound) {
    //snake.display();
    grid.background();
    snake.steering(parentArr[parIndex]);
    parIndex--;
    grid.passSnake(snake);
    snake.collision();
    snake.move();
    grid.display();
  }
  let end = grid.pellet[2];
  //Search for pellet 
  if (start && !pelletFound) {
    //Find the best option
    let index = 0;
    if (openSet.length > 0) {
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[index].f > openSet[i].f & 
            !openSet[i].searched){ 
            index = i;
          }
      }
      //Found
      if (openSet[index].index === end) {
        openSet[index].correct = true;
        parentArr = [];
        parentArr.push(openSet[index]);
        let parent = openSet[index].parent;
        parentArr.push(parent);
        while (parent !== null) {
          parent.correct = true;
          parent = parent.parent
          parentArr.push(parent);
        }
        pelletFound = true;
        parentArr.pop();
        if (count) parentArr.pop();
        count = true;
        parIndex = parentArr.length - 1;
        return
      }
      let current = openSet.splice(index, 1)[0];
      closedSet.push(current);
      current.searched = true;
      for(let neighbor of current.edges){
        if (neighbor.wall)continue;
        let newNode = true;
        closedSet.forEach((alreadyDone) => {
          if (alreadyDone.index === neighbor.index) newNode = false;
        });
        if (newNode) {
          let possibleG = current.g + 1;
          let passed = false;
          let predecesor = current
          openSet.forEach((inAnotherPath) => {
            if (inAnotherPath.index === neighbor.index) {
              if(inAnotherPath.searched){
                passed = true
              }
              if(possibleG < inAnotherPath.g) {
                possibleG = inAnotherPath.g;
                predecesor = inAnotherPath
              }
            }
          });
          let endPoint = grid.arr[grid.pellet[0]][grid.pellet[1]];
          let distX = Math.abs(endPoint.x - neighbor.x);
          let distY = Math.abs(endPoint.y - neighbor.y);
          let h = distX + distY;
          neighbor.h = h;
          neighbor.g = possibleG
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = predecesor;
          if(!passed)openSet.push(neighbor)
        }
      };
    }
    if (openSet.length == 0) {
      print("No solution");
    }
    grid.display();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    snake.direction = "up";
  }
  if (keyCode === DOWN_ARROW || keyCode === 83) {
    snake.direction = "down";
  }
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    snake.direction = "left";
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    snake.direction = "right";
  }
  if (keyCode === 32) {
    start = true;
  }

  function heuristic(other) {
    let endPoint = grid.arr[pellet[0]][pellet[1]];
    let distX = endPoint.x - other.x;
    let distY = endPoint.y - other.y;
    let h = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY,
      2));
    return h;
  }


}