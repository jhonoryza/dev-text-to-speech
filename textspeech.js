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
  noCanvas();
  var head = createElement('h1', 'hello world')
  head.class('title');
  
  var inputUser = createElement('div');
  inputUser.class('box');
  
  greeting = createElement('t', 'input text');
  greeting.style('margin', '0px 47px 0px 5px');
  greeting.class('textBox');
  input = createInput();
  input.class('inputBox');
  button = createButton('play');
  button.class('tombol');
  button.mousePressed(greet);
  downloadFile = createA('#', 'save as mp3');
  downloadFile.class('link');
  var nl = createElement('br');
  var textKorNum = createElement('t', 'jumlah koridor'); 
  textKorNum.style('margin', '0px 10px 0px 5px');
  textKorNum.class('textBox');
  selectKorNum = createInput();
  selectKorNum.class('inputBox');
  selectKorNum.changed(checkInput);
  buttonKorNum = createButton('create');
  buttonKorNum.class('tombol');
  buttonKorNum.mousePressed(createList);

  inputUser.child(greeting);
  inputUser.child(input);
  inputUser.child(button);
  inputUser.child(downloadFile);
  inputUser.child(nl);
  inputUser.child(textKorNum);
  inputUser.child(selectKorNum);
  inputUser.child(buttonKorNum);
  
}
function checkInput(){
  var data = selectKorNum.value();
  if(isNaN(data)){
    //not number
    alert("fill in number");
  }
  else{
    //its number
    //alert("correct");
  }
}
function draw() {
  background(255);
}
var me = [];
var textTitle = [];
var inputHal = [];
var buttonHal = [];
function createList(){
  var numKor = selectKorNum.value();

  for(var i=1; i<=me.length; i++){
    if(me[i] != null)
      me[i].remove();
  }
  
  for(var i=1; i<=numKor; i++){
    me[i] = createElement('div');
    me[i].class('box');
    
    textTitle[i] = createElement('p', 'koridor ' +i);
    textTitle[i].class('title');
    
    inputHal[i] = createElement('input');
    inputHal[i].class('inputBox');
    buttonHal[i] = createElement('button', 'create');
    buttonHal[i].class('tombol');
    
    me[i].child(textTitle[i]);
    me[i].child(inputHal[i]);
    me[i].child(buttonHal[i]);
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
