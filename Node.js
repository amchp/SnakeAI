class Node{
  constructor(value ,index, n_x, n_y){
    this.value = value;
    this.index = index;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = null;
    this.edges = [];
    this.searched = false;
    this.x = n_x;
    this.y = n_y;
    this.wall = false;
    this.allEdges = []
  }
  
  value(value){
    this.value = value;
  }
  
  addEdge(other){
    this.edges.push(other);
    this.allEdges.push(other);
  }
  
  removeNeighbor(other){
    
    for(let i = 0; i < this.edges.length; i++){
      if(other === this.edges[i]){
        this.edges.splice(i, 1);
      }
    }
  }
  
  makeWall(){
    this.wall = true;
    this.edges.forEach((edge) => {
      edge.removeNeighbor(this);
    });
  }
  
  reset(){
    this.searched = false;
    this.parent = null;
    this.correct = false;
    if(this.wall){
      this.allEdges.forEach((edge) => {
      edge.addEdge(this);
    });
    }
    this.wall = false;
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