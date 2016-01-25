/* globals jquery lodash someOtherLibrary */
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
var downloadFile;
var selectKorNum, selectHalNum;
var buttonKorNum, buttonHalNum;

function setup() {
  //createCanvas(710, 400);
  // foo = new p5.Speech(); // speech synthesis object
  // foo.setVoice('Bahasa Indonesia');
  //foo.setVoice('native');

  //fill(150);
  //stroke(0);
  noCanvas();
  
  greeting = createElement('h2', 'text to speech');
  greeting.position(20, 5);
  greeting.class('lemon');
  input = createInput();
  input.position(20, 65);
  button = createButton('play');
  button.position(200, 65);
  button.mousePressed(greet);
  downloadFile = createA('#', 'save as mp3');
  downloadFile.position(270, 65);
  downloadFile.class('link');

  var textKorNum = createElement('span', 'jumlah koridor'); 
  textKorNum.class('lemon');
  textKorNum.position(20, 120);
  selectKorNum = createInput();
  selectKorNum.position(130, 120);
  var textKorHal = createSpan('jumlah halte'); 
  textKorHal.class('lemon');
  textKorHal.position(20, 150);
  selectHalNum = createInput();
  selectHalNum.position(130, 150);
  buttonKorNum = createButton('create');
  buttonKorNum.position(290, 150);
  buttonKorNum.mousePressed(createList);
}

function draw() {
  background(255);
}
var me = [];
function createList(){
  var numKor = selectKorNum.value();
  var numHal = selectHalNum.value();
  selectKorNum.value('');
  selectHalNum.value('');
  
  
  for(var i=1; i<=me.length; i++){
    if(me[i] != null)
      me[i].remove();
  }
  for(var i=1; i<=numKor; i++){
    me[i] = createElement('Div', 'koridor ' +i);
    me[i].class('lemon');
    me[i].position(20, 180+(i*30));
  }
  
  for(var i=1; i<=numHal; i++){
    me[i] = createInput();
    me[i].position(20, 'auto');
  }
}

function greet() {
  responsiveVoice.speak(input.value(), "Indonesian Female", {
    onend: greetFinished
  });
}

function greetFinished() {
  console.log("voice generated");
  var name = input.value();
  input.value('');
  name = name.replace(/\s/g, "%20");
  input.value = '';
  console.log(name);
  url = "https://responsivevoice.org/responsivevoice/getvoice.php?t=" + name + "&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  console.log(url);
  downloadFile.attribute("href", url);
  downloadFile.attribute("html", "save as mp3");
}
