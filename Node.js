class Node{
  constructor(value ,index, n_x, n_y){
    this.value = value;
    this.index = index;
    this.f = Infinity;
    this.g = Infinity;
    this.h = Infinity;
    this.parent = null;
    this.edges = [];
    this.searched = false;
    this.x = n_x;
    this.y = n_y;
    this.wall = false;
  }
  
  addEdge(other){
    this.edges.push(other);
  }
  
  makeWall(){
    this.wall = true;
  }
  
  reset(){
    if(this.value === 1)this.value = 0
    this.searched = false;
    this.parent = null;
    this.correct = false;
    this.wall = false;
  }

  updateValues(endPoint, possibleG, predecesor){
    this.h = this.heuristic(endPoint);
    this.g = possibleG;
    this.f = this.h + this.g;
    this.parent = predecesor;
  }

  heuristic(endPoint){
    let distX = Math.abs(endPoint.x - this.x);
    let distY = Math.abs(endPoint.y - this.y);
    let h = distX + distY;
    return h;
  }
  
  display(){
    if(this.value === -1) fill(255);
    else if (this.value === 1) fill(255, 0, 0);
    else if(this.searched && !this.correct) fill(0, 0, 255);
    else if(this.correct) fill(0, 255, 0);
    else fill(0);
    rect(this.x, this.y, blockSize, blockSize);
  }
  
}