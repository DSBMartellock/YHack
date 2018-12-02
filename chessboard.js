/******************************************************************************
Define variables
******************************************************************************/
let canvas;
let minDim = Math.min(window.innerWidth, window.innerHeight) * .97;
const squares = [];
let possible_moves = [];
let img;
let instructionsImg;
let undoTwice = true;
const lines = [];
relative_moves = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, -1],
  [2, 1],
  [-2, 1],
  [-2, -1]
];
const knight = {
  square_index: [0, 0]
};

let showInstructions = true;
const highlightColor = '#BCA5DB';
const visitedColor = '#261B59';

const lineColor = '#AC6BD9';
const otherColor = "#91A6DB";
const basicColor = "#ffffff";

const undoLines = [];

/******************************************************************************
 ******************************************************************************/

/******************************************************************************
General functions | init
******************************************************************************/
function generateSquare() {
  return {
    // x1, y1, x2, y2
    position: [0, 0, 0, 0],
    visited: false,
    color: basicColor,
    previousColor: basicColor
  };
}

function getPossibleMoves() {
  let moves = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < 8; i++) {
    x = knight.square_index[0] + relative_moves[i][0];
    y = knight.square_index[1] + relative_moves[i][1];

    // Prevent x, y values from being off-board
    if (x > 7 || x < 0 || y > 7 || y < 0) {
      continue;
    }

    // Gather possible moves in "moves" array
    if (!squares[x][y].visited) {
      moves.push([x, y])
    }
  }

  return moves;
}
/******************************************************************************
 ******************************************************************************/

/******************************************************************************
  p5.js lifecycle methods
******************************************************************************/
function preload() {
  instructionsImg = loadImage("images/instructions.png");
  img = loadImage("images/purpleknight.png");

}

function setup() {
  canvas = createCanvas(minDim + minDim / 10, minDim + 1);
  canvas.position(minDim / 2 + 0.1 * minDim, 0.01 * minDim);
  let img1 = document.getElementById("reset");
  img1.addEventListener('click', reload);

  // let img2 = document.getElementById("undo");
  // img2.addEventListener('click', undo);

  // Set up the board
  for (let i = 0; i < 8; i++) {
    let tempArray = [];
    for (let j = 0; j < 8; j++) {
      tempArray.push(generateSquare());
      if ((i + j) % 2 == 1) {
        tempArray[tempArray.length - 1].color = otherColor;
        tempArray[tempArray.length - 1].previousColor = otherColor;
      }
    }
    squares.push(tempArray);
  }

  undoLines.push(squares[0][0]);
  squares[0][0].visited = true;
  squares[0][0].color = visitedColor;
  possible_moves = getPossibleMoves();

}

function drawLines() {
  strokeWeight(5);
  stroke(lineColor);
  for (let i = 0; i < lines.length; i++) {
    line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
  }
}

function draw() {
      background(220);
      drawBoard();
      highlightPossibleMoves();
      drawKnight();
      drawLines();

      noStroke();
      fill('#ffffff');
      rect(minDim, 0, minDim * 11 / 10, minDim);

      //
      //
      // textSize(8);
      // stroke(255);
      // text('Home', 700, 125);
      //
      // stroke(1);
      // fill('#AC6BD9');
      // rect(700, 150, 55, 55, 20, 15, 10, 5);
      // rect(700, 300, 55, 55, 20, 15, 10, 5);
      // rect(700, 450, 55, 55, 20, 15, 10, 5);

      if(possible_moves.length === 0) {
          noStroke();
          drawBoard();
          fill('white');
          rect(0, 0, minDim * 11/10 - 2, minDim);
          drawLines();
          saveCanvas("images/canvas", "png");
          noLoop();
      }
}

function reload() {
    location.reload(true);
}

function mousePressed() {
    if (showInstructions) {
        showInstructions = false;
    }

    let mouseMembership = getMouseMembership();
    if (mouseMembership.isPossibleMember)
        undoTwice = true;
        moveKnight(mouseMembership.position);

}

/******************************************************************************
 ******************************************************************************/

/******************************************************************************
  General functions II | Evaluated often
******************************************************************************/

function drawBoard() {
  strokeWeight(1);
  stroke(0);
  const m = (1 / 8) * minDim;
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 8; row++) {
      fill(squares[row][col].color);
      rect(row * m, col * m, (row + 1) * m, (col + 1) * m);
      squares[row][col].position = [row * m, col * m,
        (row + 1) * m, (col + 1) * m
      ];
    }
  }
  line(minDim, 0, minDim, minDim);
  line(0, minDim, minDim, minDim);
}

function highlight(move_index) {
  const x1 = squares[move_index[0]][move_index[1]].position[0];
  const y1 = squares[move_index[0]][move_index[1]].position[1];
  const x2 = squares[move_index[0]][move_index[1]].position[2];
  const y2 = squares[move_index[0]][move_index[1]].position[3];

  // _printSquare(move_index[0], move_index[1]);
  fill(highlightColor);
  rect(x1, y1, x2 - x1, y2 - y1);
}

function highlightPossibleMoves() {
  for (let i = 0; i < possible_moves.length; i++) {
    // console.log("moves = " + possible_moves[i][0]);
    // console.log("moves = " + possible_moves[i][1]);
    // // console.log(possible_moves[1]);
    highlight(possible_moves[i]);
  }
}


function getMouseMembership() {
  // Returns what square mouse is in, and if its a valid move
  // for (position: valid_positions) {
  //
  // }
  let xy = [];

  for (let i = 0; i < possible_moves.length; i++) {
    xy[0] = possible_moves[i][0];
    xy[1] = possible_moves[i][1];
    if (checkMembership(xy)) {
      return {
        "isPossibleMember": true,
        "position": possible_moves[i]
      }
    }
  }
  return {
    "isPossibleMember": false,
    "position": undefined
  };
}

function drawMovementLine(square_index) {
  let x1;
  let y1;
  let x2;
  let y2;
  let p;
  let q;

  p = square_index[0];
  q = square_index[1];
  x1 = squares[p][q].position[0];
  y1 = squares[p][q].position[1];
  x2 = squares[p][q].position[2];
  y2 = squares[p][q].position[3];

  const x_new = (x1 + x2) / 2;
  const y_new = (y1 + y2) / 2;

  p = knight.square_index[0];
  q = knight.square_index[1];
  x1 = squares[p][q].position[0];
  y1 = squares[p][q].position[1];
  x2 = squares[p][q].position[2];
  y2 = squares[p][q].position[3];

  const x_old = (x1 + x2) / 2;
  const y_old = (y1 + y2) / 2;
  lines.push([x_old, y_old, x_new, y_new]);
  undoLines.push(square_index);
}

function undo() {
    // Get previous index
    if (undoTwice) {
        if (undoLines.length === 0) {
            return;
        }
        undoTwice = false;
    }

    undoLines.pop();
    if (undoLines.length === 0) {
       return;
    }

    let lastIndex = undoLines.pop();

    console.log(lastIndex);

    // Pop from lines so new lines dont color
    lines.pop();

    // Restore latest square's colo
    squares[knight.square_index[0]][knight.square_index[1]].visited = false;
    squares[knight.square_index[0]][knight.square_index[1]].color =
          squares[knight.square_index[0]][knight.square_index[1]].previousColor;

    knight.square_index = lastIndex;
    possible_moves = getPossibleMoves();
}

function drawKnight() {
  const x = knight.square_index[0];
  const y = knight.square_index[1];
  const origin = squares[x][y].position;
  const size = minDim / 8;
  image(img, origin[0], origin[1], size, size);
}

function moveKnight(square_index) {
  squares[square_index[0]][square_index[1]].visited = true;
  squares[square_index[0]][square_index[1]].color = visitedColor;

  drawMovementLine(square_index);
  knight.square_index = square_index;
  possible_moves = getPossibleMoves();

  redraw();
}

function checkMembership(position_index) {
  const position = squares[position_index[0]][position_index[1]].position;
  const x = mouseX;
  const y = mouseY;

  return x >= position[0] && x < position[2] &&
    y >= position[1] && y < position[3]

}


function printSquares() {
  for (let row = 0; row < 8; row++) {
    squares[move_index[0]][move_index[1]].color = '#222222';

    for (let col = 0; col < 8; col++) {
      _printSquare(row, col);
    }
  }
}

function _printSquare(row, col) {
  console.log("Row, col: " + row + ", " + col);
  console.log("\tx1 = " + squares[row][col].position[0]);
  console.log("\ty1 = " + squares[row][col].position[1]);
  console.log("\tx2 = " + squares[row][col].position[2]);
  console.log("\ty2 = " + squares[row][col].position[3]);
  console.log("visited: " + squares[row][col].visited);
}
/******************************************************************************
 ******************************************************************************/