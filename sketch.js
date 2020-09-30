var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

function Spot(){
    this.f = 0;
    this.g = 0;
    this.h = 0;
}

function setup(){
    createCanvas(400,400);
    console.log('A*');
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Spot();
        }
    }
    console.log(grid);
}

function draw(){
    background(0);
}