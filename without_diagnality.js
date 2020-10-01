function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var w, h;
var start;
var end;
var path = [];
// var no_solution = false;
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3) {
    this.wall = true;
  }
  this.show = function (color) {
    fill(color);
    if (this.wall) {
      // ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
      fill(0);
    }
    noStroke(0);
    rect(this.i * w, this.j * h, w - 1, h - 1);
  };

  this.addNeighbors = function (grid) {
    //ifs are for checking the edges
    if (i < cols - 1) {
      this.neighbors.push(grid[this.i + 1][this.j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[this.i - 1][this.j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[this.i][this.j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[this.i][this.j - 1]);
    }
    // Start to add diagnality
    // if (i > 0 && j > 0) {
    //   this.neighbors.push(grid[this.i - 1][this.j - 1]);
    // }
    // if (i < cols - 1 && j > 0) {
    //   this.neighbors.push(grid[this.i + 1][this.j - 1]);
    // }
    // if (i > 0 && j < rows - 1) {
    //   this.neighbors.push(grid[this.i - 1][this.j + 1]);
    // }
    // if (i < cols - 1 && j < rows - 1) {
    //   this.neighbors.push(grid[this.i + 1][this.j + 1]);
    // }
  };
}

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(400, 400);

  console.log("A*");
  //Creating 2D Array
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.push(start);
  console.log(grid);
}

function draw() {
  if (openSet.length > 0) {
    var LI = 0; // contains Lowest Index to the goal or next Node
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[LI].f) {
        LI = i;
      }
    }
    var current = openSet[LI];
    //if LI was the end
    if (current === end) {
      noLoop();
      console.log("done");
    }

    //As javaScript doesn't have a function to remove somthing from an array we're gonna make an optimal function to do that stuff
    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    console.log("No Way To End Point");
    // no_solution = true;
    noLoop();
    return;
  }

  background(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(153, 50, 204));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(255, 255, 0));
  }
}
