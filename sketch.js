function removeFromArray(arr, elt){
    for (var i = arr.length - 1; i >= 0; i--) {
        if(arr[i] == elt){
            arr.splice(i, 1);
        }
    }
}

var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var w, h;
var start;
var end;

function Spot(i, j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0; 
    this.neighbors = 0;
    this.show = function(color){
        fill(color);
        noStroke(0);
        rect(this.i * w ,this.j * h , w - 1 , h - 1);
    }

    this.addNeighbors = function(grid){
        //ifs are for checking the edges 
        if(i<cols - 1){
        this.neighbors.push(grid[this.i + 1][this.j])
        }
        if(i > 0){
        this.neighbors.push(grid[this.i - 1][this.j])
        }
        if(j < rows - 1){
        this.neighbors.push(grid[this.i][this.j + 1])
        }
        if(j>0){
        this.neighbors.push(grid[this.i][this.j - 1])
        }
        
    }
}

function setup(){
    createCanvas(300,300);
    console.log('A*');
    //Creating 2D Array
    w = width / cols;
    h = height / rows;
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Spot(i,j);
           
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].addNeighbors(grid);       
        }
    }


    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);
    console.log(grid);
}

function draw(){
    if(openSet.length > 0 ){
        var LI = 0; // contains Lowest Index to the goal or next Node
        for (var i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[LI].f){
                LI = i;
            }
        }
        var current = openSet[LI];
        //if LI was the end
        if(current === end){
            console.log('done');
        }
        
        //As javaScript doesn't have a function to remove somthing from an array we're gonna make an optimal function to do that stuff
        removeFromArray(openSet,current);
        closedSet.push(current);
    
        } else {

    }

    background(0);
    for(var i = 0; i< cols; i++){
        for(var j = 0;j < rows; j++){
            grid[i][j].show(color(255));
        }
    }
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }

    for (var i = 0; i < openSet.length ; i++) {
       openSet[i].show(color(0, 255, 0))
    }
}