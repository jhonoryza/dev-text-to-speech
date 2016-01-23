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
var link
function setup() {
  createCanvas(710, 400);
  stroke(0); 
  fill(150);
  
  foo = new p5.Speech(); // speech synthesis object
  foo.setVoice('Bahasa Indonesia');
  //foo.setVoice('native');

  input = createInput();
  input.position(20, 65);

  button = createButton('play');
  button.position(200, 65);
  button.mousePressed(greet);

  buttonSave = createButton('save');
  buttonSave.position(250,65);
  buttonSave.mousePressed(goUrl);

  buttonTest = createButton('p5.speech.js test api');
  buttonTest.position(150,100);
  buttonTest.mousePressed(go);

  buttonListVoices = createButton('list voices');
  buttonListVoices.position(150,130);
  buttonListVoices.mousePressed(goo);

  buttonUrl = createButton('url test');
  buttonUrl.position(150,170);
  buttonUrl.mousePressed(goUrl);

  greeting = createElement('h2', 'speak it?');
  greeting.position(20, 5);

  textAlign(CENTER)
  textSize(50);

  // mic = new p5.AudioIn();
  // // prompts user to enable their browser mic
  // mic.connect();
  // mic.start();
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  var audiocontext = new window.AudioContext();
  recorder.setInput(this.default);
  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  // link = createA('http://p5js.org/', 'this is a link', "blank");
  // link = document.createElement('a');
  // link.textContent = 'Save to Mp3';
  //link.href = "https://code.responsivevoice.org/getvoice.php?t=selamat%20datang&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  document.getElementById('where_to_insert').innerHTML = "";
  document.getElementById('where_to_insert').href = "https://code.responsivevoice.org/getvoice.php?t=selamat%20datang&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  document.getElementById('where_to_insert').download = "play";
  }

function draw() {
  background(255);
  //rect(50,50,75,100);

  
}

function go(){
  foo.speak('Selamat Datang di Kota Bandung'); // say something
}
function goo(){
  foo.listVoices();
}
function saveRecord(){
  recorder.stop();
  save(soundFile, 'mySound.wav');

}
function startRecord(){
  recorder.record(soundFile);
}
function greet() {
  //responsiveVoice.speak(input.value(), "Indonesian Female", {onstart: startRecord, onend: saveRecord});
  responsiveVoice.speak(input.value(), "Indonesian Female"); 
  var name = input.value();
  greeting.html('hello '+name+'!');
}

// Download a file form a url.
// function saveFile(fileUrl, fileName) {
//     var hyperlink = document.createElement('a');
//     hyperlink.href = fileUrl;
//     hyperlink.target = '_blank';
//     hyperlink.download = fileName || fileUrl;

//     var mouseEvent = new MouseEvent('click', {
//         view: window,
//         bubbles: true,
//         cancelable: true
//     });

//     hyperlink.dispatchEvent(mouseEvent);
//     (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
// }
//var ganti = false;
var url
function goUrl(){
//  url = "https://code.responsivevoice.org/getvoice.php?t=selamat%20datang%20diKota%20Bandung&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  var name = input.value();
  name = name.replace(/\s/g, "%20");
  console.log(name);
  url = "https://code.responsivevoice.org/getvoice.php?t=" +name +"&tl=id&sv=&vn=&pitch=0.5&rate=0.5&vol=1";
  console.log(url);
  httpGet(url, finished);
}
function changeUrl(){
  //document.getElementById('where_to_insert').innerHTML = "stupid";
  document.getElementById('where_to_insert').href = url;
  document.getElementById('where_to_insert').click();
  // link.href = url;
  // // link.name = 'haha';
  // link.download = "voice-me.mp3";
  // //link.attribute("download", "voiceTest.mp3");
  // link.click();
  // link.mouseClicked(mee);
}
function mee(){
  save(link, 'ke.mp3');
}
function finished(response) {
  console.log(response);
  // var gg = response;
  // save(gg,"me.mp3");
  changeUrl();
}