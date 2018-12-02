/******************************************************************************
Define variables
******************************************************************************/
let canvas;
let minDim = Math.min(window.innerWidth, window.innerHeight) * .97;
const squares = [];
let possible_moves = [];
let img;
relative_moves = [[1, 2], [1,-2], [-1, 2], [-1, -2],
                  [2, -1], [2, 1], [-2, 1], [-2, -1]];

const knight = {
  square_index: [0, 0]
};
/******************************************************************************
******************************************************************************/

/******************************************************************************
General functions | init
******************************************************************************/
function generateSquare() {
  return {
    // x1, y1, x2, y2
    position: [0, 0, 0, 0],
    visited: false
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
        if (x > 8 || x < 0 || y > 7 || y < 0) {
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

function setup() {
    img = loadImage("images/purpleknight.png");
    canvas = createCanvas(minDim, minDim);
    canvas.position(minDim/2 + 0.1 * minDim, 0.01 * minDim);

    // Set up the board
    for (let i = 0; i < 8; i++) {
        let tempArray = [];
        for (let j = 0; j < 8; j++) {
            tempArray.push(generateSquare());
        }
        squares.push(tempArray);
    }
    possible_moves = getPossibleMoves();

}

function draw() {
    background(220);
    drawBoard();
    noLoop();
    drawKnight();
}

function mousePressed() {
   if (checkMembership(knight.square_index)) {
     console.log("YES");
      highlightPossibleMoves();
   } else {
      let mouseMembership = getMouseMembership();
      if (mouseMembership.isPossibleMember)
          moveKnight(mouseMembership.position);
   }
}

/******************************************************************************
******************************************************************************/

/******************************************************************************
  General functions II | Evaluated often
******************************************************************************/

function drawBoard() {
  stroke(50);
  noFill();
  const m = (1/8) * minDim;
  for (let col = 0; col < 8; col++) {
      for(let row = 0; row < 8; row ++) {
          rect(row * m, col * m, (row+1) * m, (col+1) * m);
          squares[row][col].position = [row * m, col * m,
                                        (row+1) * m, (col+1) * m];
      }
  }
  // printSquares();

}


function highlight(move_index) {
    const x1 = squares[move_index[0]][move_index[1]].position[0];
    const y1 = squares[move_index[0]][move_index[1]].position[1];
    const x2 = squares[move_index[0]][move_index[1]].position[2];
    const y2 = squares[move_index[0]][move_index[1]].position[3];

    _printSquare(move_index[0], move_index[1]);
    fill(256, 72, 31);
    rect(x1, y1, x2-x1, y2-y1);

}

function highlightPossibleMoves() {
  for (let i = 0; i < possible_moves.length; i++) {
    console.log("moves = " + possible_moves[i][0]);
    console.log("moves = " + possible_moves[i][1]);
    // console.log(possible_moves[1]);
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
      if(checkMembership(xy)){
          return {"isPossibleMember": true, "position": possible_moves[i]}
      }
  }
  return {"isPossibleMember": false, "position": undefined};
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

    const x_new = (x1 + x2)/2;
    const y_new = (y1 + y2)/2;

    p = knight.square_index[0];
    q = knight.square_index[1];
    x1 = squares[p][q].position[0];
    y1 = squares[p][q].position[1];
    x2 = squares[p][q].position[2];
    y2 = squares[p][q].position[3];

    const x_old = (x1 + x2)/2;
    const y_old = (y1 + y2)/2;

    line(x_new, y_new, x_old, y_old);
}

function drawKnight() {
    const x = knight.square_index[0];
    const y = knight.square_index[1];
    image(img, x, y, )
}

function moveKnight(square_index) {
    squares[square_index[0]][square_index[1]].visited = true;
    drawMovementLine(square_index);
    knight.position = square_index;
    drawKnight();
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
