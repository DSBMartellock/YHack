var img;
var button1x = 625;
var button1y = 350;
var button2x = 625;
var button2y = 440;
var button3x = 625;
var button3y = 530;
var button4x = 625
var button4y = 620;
var textlocation1x = 650;
var textlocation1y = 388;
var textlocation2x = 650;
var textlocation2y = 480;
var textlocation3x = 656;
var textlocation3y = 567;
var textlocation4x = 656;
var textlocation4y = 656;

function preload() {
  img = loadImage('https://c1.staticflickr.com/5/4876/46137730661_55c6803527_b.jpg');
}

function setup() {
  createCanvas(window.innerWidth * .99, window.innerHeight * .974);
  background(0);
}

function draw() {
  image(img, 230, 0);

  // button 1: Play
  fill(194, 110, 232);
  rect(628, 354, 250, 55, 20, 15, 10, 5);

  fill(255);
  rect(button1x, button1y, 250, 55, 20, 15, 10, 5);

  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 350) && (mouseY < 409)) {
    button1x = 629;
    button1y = 354;
    textlocation1x = 652;
    textlocation1y = 390;
  } else {
    button1x = 625;
    button1y = 350;
    textlocation1x = 650;
    textlocation1y = 388;
  }

  textSize(20);
  fill(0);
  text('Play game & make art!', textlocation1x, textlocation1y);

  // button 2: what is
  fill(194, 110, 232);
  rect(628, 444, 250, 55, 20, 15, 10, 5);

  fill(255);
  rect(button2x, button2y, 250, 55, 20, 15, 10, 5);
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 440) && (mouseY < 495)) {
    button2x = 628;
    button2y = 444;
    textlocation2x = 652;
    textlocation2y = 480;

  } else {
    button2x = 625;
    button2y = 440;
    textlocation2x = 650;
    textlocation2y = 478;
  }

  fill(0);
  textSize(20);
  text('What is a knight\'s tour?', textlocation2x, textlocation2y);

  // button 3: See solutions
  fill(194, 110, 232);
  rect(628, 534, 250, 55, 20, 15, 10, 5);

  fill(255);
  rect(button3x, button3y, 250, 55, 20, 15, 10, 5);
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 530) && (mouseY < 585)) {
    button3x = 629;
    button3y = 534;
    textlocation3x = 659;
    textlocation3y = 570;
  } else {
    button3x = 625;
    button3y = 530;
    textlocation3x = 656;
    textlocation3y = 567;

  }

  fill(0);
  textSize(20);
  text('See sample solutions', textlocation3x, textlocation3y);

  // button 4:
  fill(194, 110, 232);
  rect(628, 628, 250, 55, 20, 15, 10, 5);

  fill(255);
  rect(button4x, button4y, 250, 55, 20, 15, 10, 5);
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 620) && (mouseY < 675)) {
    button4x = 629;
    button4y = 628;
    textlocation4x = 659;
    textlocation4y = 659;

  } else {
    button4x = 625;
    button4y = 623;
    textlocation4x = 656;
    textlocation4y = 656;
  }

  fill(0);
  textSize(20);
  text('Community creations', textlocation4x, textlocation4y);
}


function mousePressed() {
  if ((mouseX > 629) && (mouseX < 875) && (mouseY > 354) && (mouseY < 409)) {
    (window.location = 'secondpage.html');
  }
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 440) && (mouseY < 495)) {
    (window.location = 'whatis.html');
  }
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 530) && (mouseY < 585)) {
    (window.location = 'seesamples.html');
  }
  if ((mouseX > 625) && (mouseX < 875) && (mouseY > 620) && (mouseY < 675)) {
    (window.location = 'communitycreations.html');
  }

}