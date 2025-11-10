let data;
let minLatit, minLongi, maxLatit, maxLongi, minEle, maxEle;
let margine=20
let selezionipunto = null;

function preload() {
  data = loadTable("assets/vulcano.csv","csv", "header");
  logob = loadImage ("volcanobi.png")
  logop = loadImage ("piccvol.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // min e max latitudine
  let allLatit = data.getColumn("Latitude");
 minLatit = min (allLatit);
 maxLatit = max (allLatit);

 let allLongi = data.getColumn ("Longitude");
 minLongi = min (allLongi);
 maxLongi = max (allLongi);

 let allEle = data.getColumn("Elevation (m)");
  minEle = min(allEle);
  maxEle = max(allEle);

}

function draw() {
  background(255);
  tint (255,100);
  imageMode(CENTER);
  image(logob, width / 2, height / 2, width, height);
  noTint ();
  imageMode(LEFT);
  image(logop, 110, windowHeight - 80, 180, 110);
  puntimappa();
  barracolorilegenda();

  fill(255,230);
  strokeWeight(1);
  stroke(0);
  rectMode(CENTER);
  rect(110, 50, 180, 60, 9);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
 
  text("click a volcano to see name, \ntype and other information", 30, 50);

  fill(255,230);
  strokeWeight(1);
  stroke(0);
  rectMode(CENTER);
  rect(110, 110, 180, 30, 9);
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
 
  text("    this is a volcano on the map", 30, 110);
  noStroke();
      fill(0,); 
      ellipse(32, 110, 4*3,0.5);
      ellipse(32, 110, 4/3,10);
      ellipse(32, 110, 4,4/2);

  if (selezionipunto) {
    let c = selezionipunto;

    // Primo box: nome e coordinate
    fill(255, 255);
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(110, 50, 180, 60, 9);

    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(c.name, 30, 40);
    text("Type: " + c.type , 30, 60);

    fill(255, 255);//valore variabile elev
    stroke(0);
    strokeWeight(0.6);
    rectMode(CENTER);
    rect(110, 205, 50, 17, 10);
    noStroke();
    fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text( nf(c.ele, 0, 0), 110,205);

    // box: dati generali
    fill(255, 255);
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(110, windowHeight - 80, 180,120, 9); 
    fill(0);
    noStroke();
    textAlign(LEFT,CENTER);
    textSize(10);
    textLeading(15);
    let box1Text = "Volcano Number: " + c.VolcanoNumber +
                       "\nLatitude: " + nf(c.latit, 1, 2) +
                   "\nLongitude: " + nf(c.longi, 1, 2) +
                   "\nCountry: " + c.Country +
                   "\nLocation: " + c.Location +
                   "\nStatus: " + c.status +
                   "\nLast known eruption:" + c.eruz
    text(box1Text, 30, windowHeight - 80); 
 
    
  }

  if (selezionipunto) {
  fill(255,0);
  stroke(0);
  strokeWeight(1);
  rectMode(CENTER);
  rect(selezionipunto.x, selezionipunto.y , 10, 10, 4);
  strokeWeight(0.6);
  rect(selezionipunto.x, selezionipunto.y , 20, 15, 5);
  strokeWeight(0.4);
  rect(selezionipunto.x, selezionipunto.y , 35, 25, 6);
  strokeWeight(0.2);
  rect(selezionipunto.x, selezionipunto.y , 65, 45, 9);
}
}


function barracolorilegenda() {
  noStroke();
  let c1 = color(1, 0, 255);
  let c2 = color(255, 0, 255);
  let x = 20;
  let y = 165;
  let w = 180;
  let h = 20;

  // gradiente
  for (let i = 0; i < w; i++) {
    let inter = map(i, 0, w, 0, 1);
    let c = lerpColor(c1, c2, inter);
    fill(c);
    rect(x + i, y, 1, h);
  }

  // Linea verticale se un vulcano è selezionato
  if (selezionipunto) {
    let inter = map(selezionipunto.ele, minEle, maxEle, 0, 1);
    let xpos = map(inter, 0, 1, x, x + w);
    stroke(0);
    strokeWeight(2);
    line(xpos, y + 25, xpos, y+h-30 );
  }
noStroke();
fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Elevation (m)", 75,y-20);
  
  // Testo min e max elevazione
  strokeWeight(0.8);
  stroke(c1);
  line(x, y , x, y + h + 25);
  stroke(c2);
  line(x + w -1, y , x + w-1, y + h +25);
  noStroke();
  fill(c1);
  textAlign(LEFT, TOP);
  textSize(10);
  text(nf(minEle, 0, 0), x+2, y + h + 15);
  textAlign(RIGHT, TOP);
  fill(c2)
  text(nf(maxEle, 0, 0), x + w-3, y + h + 15);
}


function puntimappa() {
  noStroke();
  let c1 = color(1, 0, 255);   
  let c2 = color(255, 0, 255);
  let raggio = 4;

  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    // leggo i dati della singola riga e li converto in numeri
    let longi = data.getString(rowNumber, "Longitude");
    let latit = data.getString(rowNumber, "Latitude");
    let ele = parseFloat(data.getString(rowNumber, "Elevation (m)"));
    let name = data.getString(rowNumber, "Volcano Name");

    // converto coordinate geografiche in coordinate pixel
    let x = map(longi, minLongi, maxLongi, margine + 220, width - margine);
    let y = map(latit, minLatit, maxLatit, height - margine, margine);

    // calcolo colore sfumato per elevazione
    let inter = map(ele, minEle, maxEle, 0, 1);
    inter = constrain(inter, 0, 1); 
    let colele = lerpColor(c1, c2, inter);

    // calcola la distanza dal mouse
    let d = dist(x, y, mouseX, mouseY);

    if (d < raggio) { // hover
      fill(255, 0, 0);
      ellipse(x, y, raggio*12,2);
      ellipse(x, y, raggio/2,30);
      fill(255,0,0);
      textSize(10);
      textAlign(LEFT, CENTER);
      text(name, 30, windowHeight - 170);
fill(255, 0);
    stroke(255,0,0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(110, windowHeight - 170, 180, 30, 9);
    } else {
      noStroke();
      fill(colele); 
      ellipse(x, y, raggio*3,0.5);
      ellipse(x, y, raggio/3,10);
      ellipse(x, y, raggio,raggio/2);
    }
  }
}


function mouseClicked() {
  let trovato = false;
  
  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    // Leggo i dati della riga
    let longi = parseFloat(data.getString(rowNumber, "Longitude"));
    let latit = parseFloat(data.getString(rowNumber, "Latitude"));
    let ele = parseFloat(data.getString(rowNumber, "Elevation (m)"));
    let name = data.getString(rowNumber, "Volcano Name");
    let VolcanoNumber = data.getString(rowNumber, "Volcano Number");
    let Country = data.getString(rowNumber, "Country");
    let Location = data.getString(rowNumber, "Location");
    let type = data.getString (rowNumber, "Type");
  let status = data.getString (rowNumber, "Status");
  let eruz = data.getString (rowNumber, "Last Known Eruption")

    // Converto coordinate geografiche in coordinate pixel
    let x = map(longi, minLongi, maxLongi, margine + 220, width - margine);
    let y = map(latit, minLatit, maxLatit, height - margine, margine);

    // Calcolo la distanza dal mouse
    let d = dist(x, y, mouseX, mouseY);

    if (d <7) { // clic vicino al punto
      selezionipunto = {
        x, y, longi, latit, name, ele, VolcanoNumber, Country, Location, type,status, eruz
      };
      trovato = true;
      break;
    }
  }

  if (!trovato) selezionipunto = null; // clic fuori, deseleziona
}
