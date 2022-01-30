class Grid{
  constructor(snake, blockSize){
    this.snake = snake
    this.rows = width/blockSize;
    this.cols = height/blockSize;
    this.arr = [this.rows];
    this.openSet = [];
    this.closedSet = [];
    this.parentArr = [];
    for(let i = 0; i < this.cols; i++){
      this.arr[i] = [this.cols];
    }
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.arr[i][j] = new Node(0 ,i*this.rows+j, 
                                  i*blockSize, j*blockSize);
      }
    }
    for(let i = 0; i < this.rows; i++){
     for(let j = 0; j < this.cols; j++){
       let max = this.arr.length
       //Top
       if(i - 1 > -1){
          this.connectEdges(this.arr[i][j], 
                            this.arr[i-1][j]);
        }
       //Left
       if(j - 1 > -1){
         this.connectEdges(this.arr[i][j], 
                            this.arr[i][j-1]);
       }
       //Right
       if(j + 1 < max){
         this.connectEdges(this.arr[i][j], 
                            this.arr[i][j+1]);
       }
       //Bottom
       if(i + 1 < max){
          this.connectEdges(this.arr[i][j], 
                            this.arr[i+1][j]);
        }
     }
    }
    this.passSnake();
  }
  
  passSnake(){
    for(let i = 0; i < this.snake.body.length; i++){
      if(this.snake.body[i].x < this.rows &&  
         this.snake.body[i].x > -1 &&
         this.snake.body[i].y < this.cols &&  
         this.snake.body[i].y > -1){
        this.arr[this.snake.body[i].x][this.snake.body[i].y].value=-1;
      }
    }
  }
  
  background(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(this.arr[i][j].value !== 1){
          this.arr[i][j].value = 0;
        }
      }
    }
  }
  
  connectEdges(one, other){
    one.addEdge(other)
  }
  
  createWalls(walls){
    walls.forEach((node) =>{
      this.arr[node.x][node.y].makeWall();
    });
  }
  
  createPellet(){
    this.reset();
    this.openSet = [];
    this.closedSet = [];
    this.parentArr = [];
    let nextPos = this.snake.moveHead();
    this.createWalls(this.snake.body);
    this.openSet.push(this.arr[nextPos.x][nextPos.y]);
    this.arr[nextPos.x][nextPos.y].g = 1
    this.pelletFound = false;
    let arr = [];
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(this.arr[i][j].value === 0){
            arr.push([i,j]);
          }
      }
    }

    let ran = arr[Math.trunc(random(arr.length))];
    this.arr[ran[0]][ran[1]].value = 1;
    this.pellet = [ran[0], ran[1], ran[0]*this.cols+ran[1]];
  }
  
  reset(){
    for(let i = 0; i < this.rows; i++){
     for(let j = 0; j < this.cols; j++){
      this.arr[i][j].reset();
     }
    }
  }
  
  display(){
    fill(255, 0, 0);
    rect(this.pellet[0]*blockSize, this.pellet[1]*blockSize, 
          blockSize, blockSize);

    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.arr[i][j].display();
      }
    }
  }
}