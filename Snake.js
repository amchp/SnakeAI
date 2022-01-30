class Snake{
   constructor(x, y, blockSize){
     this.body = [];
     this.body.push({"x": Math.trunc(x/blockSize),
                     "y": Math.trunc(y/blockSize)});
     this.body.push({"x": Math.trunc(x/blockSize), 
                     "y": Math.trunc(y/blockSize) + 1});
     this.direction = "up";
     this.squareSize = blockSize;
   }
  
  collision(){
    let nextPosition = this.moveHead();
    if(nextPosition.x == grid.pellet[0] &&
       nextPosition.y == grid.pellet[1]){
      this.addBodyPart();
      grid.createPellet();
    }
    let x = nextPosition.x * this.squareSize;
    let y = nextPosition.y * this.squareSize;
    if(x < -this.squareSize || x > width || 
       y < -this.squareSize || y > height){
      this.reset();
    }
    let body = this.body;
    for(let i = 1; i < body.length; i++){
      if(nextPosition.x  === body[i].x &&
         nextPosition.y  === body[i].y){
        this.reset();
      }
    }
  }
  
  move(){
    for(let i = this.body.length - 1; i > 0; i--){
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    this.body[0] = this.moveHead();
  }
  
  moveHead(){
    let futurePostion = {x : this.body[0].x, y: 
                         this.body[0].y};
    if(this.direction == "up"){
      futurePostion.y -= 1;
    }else if(this.direction == "down"){
      futurePostion.y += 1;
    }else if(this.direction == "left"){
      futurePostion.x -= 1;
    }else if(this.direction == "right"){
      futurePostion.x += 1;
    }
    return futurePostion;
  }
  
  direction(nDirection){
    direction = nDirection;
  }
  
  steering(node){
    //No truncation interesting
    let head = this.body[0];
    let x = node.x/this.squareSize;
    let y = node.y/this.squareSize;
    //Up
    if(head.y > y){
      this.direction = "up";
    }else if(head.x > x){
      this.direction = "left";
    }else if(head.y < y){
      this.direction = "down";
    }else if(head.x < x){
      this.direction = "right";
    }
  }
  
  addBodyPart(){
    let x;
    let y;
    //Going up
    if(this.body[this.body.length - 1].y < 
       this.body[this.body.length - 2].y){
      x = this.body[this.body.length - 1].x;
      y = this.body[this.body.length - 1].y + 1;
    }
    //Going down
    if(this.body[this.body.length - 1].y > 
       this.body[this.body.length - 2].y){
      x = this.body[this.body.length - 1].x;
      y = this.body[this.body.length - 1].y - 1;
    }
    //Going left
    if(this.body[this.body.length - 1].x < 
       this.body[this.body.length - 2].x){
      x = this.body[this.body.length - 1].x + 1;
      y = this.body[this.body.length - 1].y;  
    }
    //Going right
    if(this.body[this.body.length - 1].x > 
       this.body[this.body.length - 2].x){
      x = this.body[this.body.length - 1].x - 1;
      y = this.body[this.body.length - 1].y;
    }
    this.body.push({"x" : x, "y": y});
  }
  
  reset(){
    this.body = [];
    this.body.push({"x": width/(2*this.squareSize),
                    "y": height/(2*this.squareSize)});
    this.body.push({"x": width/(2*this.squareSize),
                    "y": (height/(2*this.squareSize))+1});
    this.direction = "up";
  }
  
  display(){
    fill(255);
    for(let i = 0; i < this.body.length; i++){
      rect(this.body[i].x*this.squareSize, 
           this.body[i].y*this.squareSize,
          this.squareSize, this.squareSize);
    }
  }
}