let started = false;

function setup() {

  createCanvas(700, 400);
  noLoop();
}

function draw() {
  if (started) {
    background(256);
  }
}

function start() {
  started = true;
  loop();
}