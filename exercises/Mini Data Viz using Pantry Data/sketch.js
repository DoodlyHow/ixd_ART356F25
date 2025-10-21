let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRiDlnHl8w4CLtPHwhxzxiMF8hri_0ka9pl4IkYeck1819-gJ-miruyjapCYlzOeHj-0CtCIIIi2a7M/pub?gid=0&single=true&output=csv";

function preload() {
  data = loadTable(url, "csv", "header");
}

function setup() {
  createCanvas(500, 450); // made taller for labels
  textAlign(CENTER);
  textSize(12);
  noLoop();
  print(data.columns);
}

function draw() {
  background(0);
  fill(255);
  textSize(16);
  text("Carbs of Food Items", width / 2, 30);

  if (data) {
    let numRows = data.getRowCount();
    let carbs = data.getColumn("Carbs");      
    let names = data.getColumn("Food"); 

    let barWidth = width / (numRows + 1);
    let chartBottom = height - 100; 
    for (let i = 0; i < numRows; i++) {
      let x = barWidth * (i + 1);
      let h = float(carbs[i]) * 3; 
      let y = chartBottom - h;

      // bar
      fill(100, 200, 255);
      rectMode(CORNER);
      rect(x - barWidth / 4, y, barWidth / 2, h);

      // value above bar
      fill(255);
      textSize(11);
      text(carbs[i] + "g", x, y - 10);

      // name below bar 
      text(names[i], x, chartBottom + 30);
    }


    stroke(255);
    line(40, chartBottom, width - 40, chartBottom);
  } else {
    fill(255);
    text("Loading data...", width / 2, height / 2);
  }
}
