var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var w, h;
var start;
var end;

function Spot(i, j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0; 
    this.show = function(){
        fill(255);
        stroke(0);
        rect(this.x * w ,this.y * h , w , h );
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
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);
    console.log(grid);
}

function draw(){
    if(openSet.length > 0 ){

    } else {

    }

    background(0);
    for(var i = 0; i< cols; i++){
        for(var j = 0;j < rows; j++){
            grid[i][j].show();
        }
    }
}