class Grid{
  constructor(snake, blockSize){
    this.rows = width/blockSize;
    this.cols = height/blockSize;
    this.arr = [this.rows];
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
    this.passSnake(snake);
  }
  
  passSnake(snake){
    for(let i = 0; i < snake.body.length; i++){
      if(snake.body[i].x < this.rows &&  
         snake.body[i].x > -1 &&
         snake.body[i].y < this.cols &&  
         snake.body[i].y > -1){
        this.arr[snake.body[i].x][snake.body[i].y].value=-1;
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
      grid.arr[node.x][node.y].makeWall();
    });
  }
  
  createPellet(){
    this.reset();
    openSet = [];
    closedSet = [];
    parentArr = [];
    let nextPos = snake.moveHead();
    this.createWalls(snake.body);
    openSet.push(grid.arr[nextPos.x][nextPos.y]);
    pelletFound = false;
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