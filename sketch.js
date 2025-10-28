let data;
let minLatit, minLongi, maxLatit, maxLongi;
let margine=20

function preload() {
  data = loadTable("assets/sipri-report-explosions.csv","csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // min e max latitudine
  let allLatit = data.getColumn("latitude");
 minLatit = min (allLatit);
 maxLatit = max (allLatit);

 let allLongi = data.getColumn ("longitude");
 minLongi = min (allLongi);
 maxLongi = max (allLongi);

}

function draw() {
  background (10);

for(let rowNumber=0; rowNumber < data.getRowCount(); rowNumber++){
//leggo i dati della singola riga
let longi = data.getNum(rowNumber,"longitude");
let latit = data.getNum(rowNumber,"latitude");

//converto coordinate geografiche in coordinate pixel
let x = map(longi,minLongi,maxLongi,margine,width-margine);
let y = map (latit,minLatit,maxLatit,height-margine,margine);
let raggio = 10;
let name = data.getString(rowNumber,"region");

//calcola la distanza
let d = dist(x,y, mouseX,mouseY);
if (d<raggio){
fill ("red")
  }else {
fill ("yellow")
  }

ellipse(x,y,raggio*2);

if (d<raggio){
  fill("white")
text(name,x,y)
  }


}
}
