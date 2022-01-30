function searchForPellet(){
    if (grid.openSet.length == 0){
        gameOver = true
        return
    }
    let end = grid.pellet[2];
    //Find the best option
    let index = -1;
    let found = false;
    for (let i = 0; i < grid.openSet.length; i++) {
        if(grid.openSet[i].index === end){
            found = true;
            index = i;
            break;
        }
        if (!grid.openSet[i].searched && (index === -1 || grid.openSet[i].f < grid.openSet[index].f)){ 
            index = i;
        }
    }
    if(index == -1){
        gameOver = true;
        return;
    }
    //Found
    if (found) {
        grid.openSet[index].correct = true;
        grid.parentArr = [];
        grid.parentArr.push(grid.openSet[index]);
        let parent = grid.openSet[index].parent;
        grid.parentArr.push(parent);
        while (parent !== null) {
            parent.correct = true;
            parent = parent.parent
            grid.parentArr.push(parent);
        }
        grid.pelletFound = true;
        grid.parentArr.pop();
        if (count) grid.parentArr.pop();
        count = true;
        grid.parIndex = grid.parentArr.length - 1;
        return
    }
    let current = grid.openSet.splice(index, 1)[0];
    grid.closedSet.push(current);
    current.searched = true;
    for(let neighbor of current.edges){
        if (neighbor.wall || neighbor.searched)continue;
        let possibleG = current.g + 1;
        let predecesor = current
        neighbor.edges.forEach((inAnotherPath) => {
            if(inAnotherPath.index === neighbor.index && possibleG > inAnotherPath.g) {
                possibleG = inAnotherPath.g;
                predecesor = inAnotherPath
            }
        });
        let endPoint = grid.arr[grid.pellet[0]][grid.pellet[1]];
        neighbor.updateValues(endPoint, possibleG, predecesor)
        if(!neighbor.searched || !neighbor in grid.openSet)grid.openSet.push(neighbor)
    };
}

function pelletFound(){
    grid.background();
    grid.snake.steering(grid.parentArr[grid.parIndex]);
    grid.parIndex--;
    grid.passSnake();
    grid.snake.collision();
    grid.snake.move();
    grid.display();
}

function drawGameOver(){
    background("#000000")
    strokeWeight(1)
    fill('#FFFFFF');
    textSize(48);
    text("Game Over", 65, 200)
    textSize(24);
    text("Press any key to restart", 65, 225)
}

