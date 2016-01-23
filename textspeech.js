// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill
var input, button, greeting;
var buttonTest, buttonListVoices, buttonSave;
var foo;
var mic, recorder, soundFile;
var state = 0;
var buttonUrl;
var link;
var url;
var downloadMp3;
var inputName;
function setup() {
  createCanvas(710, 400);
  stroke(0); 
  fill(150);
  
  // foo = new p5.Speech(); // speech synthesis object
  // foo.setVoice('Bahasa Indonesia');
  //foo.setVoice('native');

  input = createInput();
  input.position(20, 65);

  button = createButton('play');
  button.position(200, 65);
  button.mousePressed(greet);

  buttonSave = createButton('save');
  buttonSave.position(250,65);
  buttonSave.mousePressed(goUrl);

  // buttonTest = createButton('p5.speech.js test api');
  // buttonTest.position(150,100);
  // buttonTest.mousePressed(go);

  // buttonListVoices = createButton('list voices');
  // buttonListVoices.position(150,130);
  // buttonListVoices.mousePressed(goo);

  // buttonUrl = createButton('url test');
  // buttonUrl.position(150,170);
  // buttonUrl.mousePressed(goUrl);

  greeting = createElement('h2', 'speak it?');
  greeting.position(20, 5);

  textAlign(CENTER)
  textSize(50);

  downloadMp3 = document.getElementById('where_to_insert');
  downloadMp3.style.position = "relative";
  // downloadMp3.innerHTML = "";
  // downloadMp3.href = "https://code.responsivevoice.org/getvoice.php?t=selamat%20datang&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  // downloadMp3.download = "play";
  }

function draw() {
  background(255);  
}

function go(){
  foo.speak('Selamat Datang di Kota Bandung'); // say something
}
function goo(){
  foo.listVoices();
}
function greet() {
  responsiveVoice.speak(input.value(), "Indonesian Female", {onend: greetFinished}); 
  var name = input.value();
  greeting.html('hello '+name+'!');
}
function greetFinished(){
  console.log("voice generated");
}
function goUrl(){
  var name = input.value();
  name = name.replace(/\s/g, "%20");
  console.log(name);
  // url = "https://code.responsivevoice.org/getvoice.php?t=" +name +"&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  url = "https://responsivevoice.org/responsivevoice/getvoice.php?t=" +name +"&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  console.log(url);
  httpGet(url, finished);
}
function changeUrl(){
  downloadMp3.href = url;
  downloadMp3.title = "download as mp3";
  downloadMp3.innerHTML = "or click here";
  downloadMp3.download = "myvoice.mp3";
  downloadMp3.click();

   // var testLink = createA('url','or click here');
   // testLink.prototype.replace("href", url);
}
function mee(){
  save(link, 'ke.mp3');
}
function finished(response) {
  console.log(response);
  changeUrl();
}