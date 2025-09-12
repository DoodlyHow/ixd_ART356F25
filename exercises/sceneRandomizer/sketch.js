let skyImgs =[];
let fieldImgs = [];
let treeImgs = [];

let currentSky;
let currentField;
let currentTrees =[];

function preload(){
  // day or night
skyImgs[0] = (loadImage("night.jpg"));
skyImgs[1] = (loadImage("day.jpg"));
skyImgs[2] = (loadImage ("sunset.jpg"));
//field
fieldImgs[0] = (loadImage("Grass field.png"));
fieldImgs[1] = (loadImage("winter field.png"));
fieldImgs[2] = (loadImage("beach.png"));
// trees
treeImgs[0] = (loadImage("greenTree.png"));
treeImgs[1] = (loadImage("snowTree.png"));
treeImgs[2] = (loadImage("palm tree.png"));
}

function setup() {
  createCanvas(600, 500);
  imageMode(CENTER);

  randomizeSky();
  randomizeField();
  randomizeTrees();
}

function draw() {
  background(220);

///// draw sky ///
image(currentSky, width/2, height/2, width, height);
/////// draw field //////
image (currentField, width/2, height/2, width, height);
////// draw trees  /////
for (let i = 0; i < currentTrees.length; i++){
  let t = currentTrees[i];
  image(currentTreeImg, t.x, t.y, t.size, t.size * 1.5);
    }
}

 function randomizeSky(){
  currentSky = random(skyImgs);
 }

 function randomizeField(){
  currentField = random(fieldImgs);
 }

 function randomizeTrees(){
  currentTrees = [];
  currentTreeImg = random(treeImgs); // should pick one tree for all
  let numTrees = int(random(3, 7)); // should have 3- 6 trees

  for (let i = 0; i < numTrees; i++) {
    currentTrees.push({
      x: random (100, width - 100),
      y: random( height/2, height - 50),
      size: random(80, 150)
    });
  }
 }


 //////// Key Controls ////////
function keyPressed(){
  if (keyCode === UP_ARROW){
    randomizeSky();
  } else if (keyCode === DOWN_ARROW){
    randomizeField();
  } else if (keyCode === RIGHT_ARROW){
    randomizeTrees();
  }
}