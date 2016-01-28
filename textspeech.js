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
var inputinputPitch, inputinputRate, inputinputVolume;
function setup() {
  var lineSpace = '210%';
  noCanvas();
  var head = createElement('h1', 'hello world')
  head.class('title');
  
  var textUser = createElement('div');
  textUser.class('box');
  textUser.style('width', '140px');
  textUser.style('height', '210px');
  textUser.style('float', 'left');
  
  var inputUser = createElement('div');
  inputUser.class('box');
  inputUser.style('width', '400px');
  inputUser.style('height', '210px');
  inputUser.style('float', 'left');
  
  greeting = createElement('t', 'input text');
  greeting.style('line-height', lineSpace);
  greeting.class('textBox');
  input = createInput();
  input.value('selamat datang');
  input.class('inputBox');
  input.changed(greet);
  button = createButton('play');
  button.class('tombol');
  button.mousePressed(greet);
  downloadFile = createA('#', 'save as mp3');
  downloadFile.class('link');
  var textinputPitch = createElement('t', 'pitch (0 - 2)');
  textinputPitch.class('textBox');
  textinputPitch.style('line-height', lineSpace);
  inputPitch = createInput();
  inputPitch.value('0.9');
  inputPitch.class('inputBox');
  var textinputRate = createElement('t', 'rate (0 - 1.5)');
  textinputRate.class('textBox');
  textinputRate.style('line-height', lineSpace);
  inputRate = createInput();
  inputRate.class('inputBox');
  inputRate.value('1');
  var textinputVolume = createElement('t', 'volume (0 - 1)');
  textinputVolume.class('textBox');
  textinputVolume.style('line-height', lineSpace);
  inputVolume = createInput();
  inputVolume.class('inputBox');
  inputVolume.value('1');
  var textKorNum = createElement('t', 'jumlah koridor'); 
  textKorNum.style('line-height', lineSpace);
  textKorNum.class('textBox');
  selectKorNum = createInput();
  selectKorNum.class('inputBox');
  selectKorNum.changed(createList);
  selectKorNum.value('1');
  buttonKorNum = createButton('create');
  buttonKorNum.class('tombol');
  buttonKorNum.mousePressed(createList);
  
  var space = textUser.child(createElement('br'));
  textUser.child(greeting);
  textUser.child(createElement('br'));
  textUser.child(textinputPitch);
  textUser.child(createElement('br'));
  textUser.child(textinputRate);
  textUser.child(createElement('br'));
  textUser.child(textinputVolume);
  textUser.child(createElement('br'));
  textUser.child(textKorNum);
  
  var space2 = inputUser.child(createElement('br'));
  inputUser.child(input);
  inputUser.child(button);
  inputUser.child(downloadFile);
  inputUser.child(createElement('br'));
  inputUser.child(inputPitch);
  inputUser.child(createElement('br'));
  inputUser.child(inputRate);
  inputUser.child(createElement('br'));
  inputUser.child(inputVolume);
  inputUser.child(createElement('br'));
  inputUser.child(selectKorNum);
  inputUser.child(buttonKorNum);
  
}

function draw() {
  background(255);
}

var me = [], textTitle = [], textDesc = [], inputHal = [], textDescP = [], inputHalP = [];
function createList(){
  var numKor = selectKorNum.value();
  if(isNaN(numKor)){
    //not number
    alert("fill in number");
  }
  else{
    //its number
    //alert("correct");
    //hapus div
    for(var i=1; i<=me.length; i++){
      if(me[i] != null)
        me[i].remove();
    }
    
    //create div
    for(var i=1; i<=numKor; i++){
      me[i] = createElement('div');
      me[i].class('box');
      me[i].style('clear', 'left');
      
      textTitle[i] = createElement('h2', 'koridor ' +i);
      textTitle[i].class('title');
      textDesc[i] = createElement('t', 'input halte (jalur berangkat) :');
      textDesc[i].style('margin','0px 0px 0px 10px');
      textDesc[i].class('textBox');
      
      inputHal[i] = createElement('textarea');
      inputHal[i].class('inputBoxHalte');
      inputHal[i].style('white-space', 'nowrap');
      textDescP[i] = createElement('t', 'input halte (jalur pulang) :');
      textDescP[i].style('margin','0px 0px 0px 10px');
      textDescP[i].class('textBox');
      inputHalP[i] = createElement('textarea');
      inputHalP[i].class('inputBoxHalte');
      
      me[i].child(textTitle[i]);
      me[i].child(textDesc[i]);
      me[i].child(createElement('br'));
      me[i].child(inputHal[i]);
      me[i].child(createElement('br'));
      me[i].child(textDescP[i]);
      me[i].child(createElement('br'));
      me[i].child(inputHalP[i]);
    }
    var submitButton = createButton('save to file');
    submitButton.class('tombol');
    submitButton.style('float', 'right');
    submitButton.mousePressed(saveTextAsFile);
  }
}

function greet() {
  var p = inputPitch.value(); var r = inputRate.value(); var v = inputVolume.value(); var i = input.value();
  //console.log(p +" " +r +" " +v);
  responsiveVoice.speak(i, "Indonesian Female", {pitch: p, rate: r, volume: v, onend: greetFinished});
  //responsiveVoice.speak(input.value(), "Indonesian Female", {pitch: p});
  //responsiveVoice.speak(input.value(), "Indonesian Female", {onend: greetFinished});
}

function greetFinished() {
  console.log("voice generated");
  var name = input.value();
  name = name.replace(/\s/g, "%20");
  //url = "https://responsivevoice.org/responsivevoice/getvoice.php?t=" + name + "&tl=id&sv=&vn=&pitch=" +inputPitch.value() +"&rate=" +inputRate.value() +"&vol=" +inputVolume.value();
  url = responsiveVoice.src;
  console.log(url);
  downloadFile.attribute("href", url);
  downloadFile.attribute("html", "save as mp3"); 
}

function saveTextAsFile()
{
  var numKor = selectKorNum.value();
  for(var i=1; i<=numKor; i++){
    var textFile = inputHal[i].value();
    if(textFile != null){
    	//var textToWrite = trim(textFile);
    var	textToWrite = textFile.replace(/\n/g,'');
    //textToWrite = textFile.replace(/\r/g,'');
    //textToWrite = textToWrite.split('n').join('\r\n');
    	console.log(textToWrite);
      save(textToWrite, 'koridor-'+i+'-go.txt');    
    }
  }
  for(var i=1; i<=numKor; i++){
    var textFile = inputHalP[i].value();
    if(textFile != null){
    	//var textToWrite = trim(textFile);
     var	textToWrite = textFile.replace(/\n/g,'');
  // var textToWrite = textFile.split('n').join('\r\n');
    	console.log(textToWrite);
      save(textToWrite, 'koridor-'+i+'-back.txt');
    }
  }

}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
