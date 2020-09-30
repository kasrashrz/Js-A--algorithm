var cols = 5;
var rows = 5;
var grid = new Array(cols);

function setup(){
    createCanvas(400,400);
    console.log('A*');
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols;ji++) {
            grid[i][j] = new Spot();
        }
    }
    console.log(grid);
}

function draw(){
    background(0);
}