let characters = [];
let portraits = [];
let selectedCharacter = null;
let buttons = [];
let bg;    // background image
let poster;

function preload() {
  characters = loadJSON("https://api.api-onepiece.com/v2/characters/en");

  // Background map + bounty poster
  bg = loadImage("onePiece-pirateMapPoster-pic.jpg");
  poster = loadImage("WANTEDposter.png");

  // Portrait images (now 12, last two are Zeus + Cavendish)
  portraits = [
    loadImage("Luffy headshot.jpg"),              // 0
    loadImage("Roronoa Zoro headshot.jpg"),       // 1
    loadImage("Nami headshot.png"),               // 2
    loadImage("Usopp Headshot.png"),              // 3
    loadImage("Sanji headshot.png"),              // 4
    loadImage("Tonny Tony Chopper headshot.png"), // 5
    loadImage("Nico Robin Headshot.jpg"),         // 6
    loadImage("Franky Headshot.jpg"),             // 7
    loadImage("Brook Headshot.png"),              // 8
    loadImage("Jinbe Headshot.png"),              // 9
    loadImage("Zeus Headshot.png"),               // 10  ⬅ NEW
    loadImage("Cavendish Headshot.png"),          // 11  ⬅ NEW
  ];
}

function setup() {
  createCanvas(1000, 700);
  textAlign(CENTER, CENTER);
  textSize(16);

  // Custom positions (3 columns × 4 rows on the left)
  const positions = [
    { x:  60, y: 120 }, // 1  Luffy
    { x: 210, y: 120 }, // 2  Zoro
    { x: 360, y: 120 }, // 3  Nami

    { x:  60, y: 250 }, // 4  Usopp
    { x: 210, y: 250 }, // 5  Sanji
    { x: 360, y: 250 }, // 6  Chopper

    { x:  60, y: 380 }, // 7  Robin
    { x: 210, y: 380 }, // 8  Franky
    { x: 360, y: 380 }, // 9  Brook

    { x:  60, y: 510 }, // 10 Jinbe
    { x: 210, y: 510 }, // 11 Zeus       ⬅ NEW
    { x: 360, y: 510 }, // 12 Cavendish  ⬅ NEW
  ];

  // Create buttons from positions
  for (let i = 0; i < positions.length; i++) {
    const { x, y } = positions[i];
    buttons.push({ x, y, w: 100, h: 100, index: i });
  }
}

function draw() {
  background(0);
  image(bg, 0, 0, width, height);
  image(poster, 475, 70, 520, 520);

  // Title
  fill(0);
  noStroke();
  textSize(32);
  text("Select Your Crew Member", 260, 60);

  // Portrait buttons
  for (let btn of buttons) {
    const img = portraits[btn.index];
    if (!img) continue;

    // Hover detection
    const hovering =
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h;

    // Hover zoom effect
    const scale = hovering ? 1.1 : 1.0;
    const newW = btn.w * scale;
    const newH = btn.h * scale;
    const offsetX = (newW - btn.w) / 2;
    const offsetY = (newH - btn.h) / 2;

    // Highlight if selected
    if (selectedCharacter === btn.index) {
      stroke(255, 255, 0);
      strokeWeight(5);
    } else {
      noStroke();
      strokeWeight(5);
    }

    // Portrait
    image(img, btn.x - offsetX, btn.y - offsetY, newW, newH);
    noFill();
    stroke(255);
    rect(btn.x - offsetX, btn.y - offsetY, newW, newH, 10);
  }

  // Selected character info (with fallbacks for empty fields)
    if (selectedCharacter !== null) {
    const c = characters[selectedCharacter];
    const img = portraits[selectedCharacter];
    if (c && img) {
      const age    = c.age && c.age.trim() !== "" ? c.age : "—";
      const bounty = c.bounty && c.bounty.trim() !== "" ? c.bounty : "—";

      // Draw character image on poster (centered above text)
      image(img, 655, 200, 150, 150);

      fill(0);
      noStroke();
      textSize(30);
      text(`${c.name}`, 730, 420);
      textSize(16);
      text(`Size: ${c.size}`,  730, 450);
      text(`Age: ${age}`,      730, 470);
      text(`Job: ${c.job}`,    730, 490);
      textSize(18);
      text(`Bounty: ${bounty}`, 730, 510);
    }
  }
}

function mousePressed() {
  for (let btn of buttons) {
    if (
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      selectedCharacter = btn.index;
      break;
    }
  }
}
