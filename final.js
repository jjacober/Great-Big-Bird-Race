var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Globals
var birdWidth = 90;
var places = []
var run = null;
var chosenBird = null;
//Sound Effects
var buttonSound = new Audio("button.m4a")
var winSound = new Audio("win.wav")
var failSound = new Audio("fail.mp3")
var birds = {
    flamingo: {},
    seagull: {},
    stork: {},
    eagle: {},
    parrot: {}
}
var clouds = []


function changeColor(color) {
  if (color=='black') {
    return 'white';
  };
  if (color=='white') {
    return 'black';
  };
}

function drawClouds() { 
  for (var i=0; i<3; i++) {
    cloud = clouds[i]
    console.log(cloud)
    cloud.drawing.onload = function() {
      context.drawImage(cloud.drawing,cloud.x,cloud.height,cloud.width,cloud.width);
    }
    context.drawImage(cloud.drawing,cloud.x,cloud.height,cloud.width,cloud.width);
  }
}

function setupCanvas() {
  var i=0;
  for (var key in birds) {
    var bird = birds[key];
    bird.x = 0;
    bird.y = i*canvas.height/5;
    bird.rank = 0;
    bird.speed = Math.random()*3;
    i++;
  }
  birds.flamingo.color = 'deeppink';
  birds.flamingo.name = 'Floyd';
  birds.eagle.color = 'goldenrod';
  birds.eagle.name = 'Ellen';
  birds.seagull.color = 'lightyellow';
  birds.seagull.name = 'Sandy';
  birds.stork.color = 'coral';
  birds.stork.name = 'Stanley';
  birds.parrot.color = 'limegreen';
  birds.parrot.name = 'Peter';
  for (var i=0; i<3; i++) {
    clouds[i] = {}
    clouds[i].drawing = new Image();
    cloud = clouds[i]
    cloud.drawing.src = "cloud.png";
    cloud.x = Math.random()*1000;
    cloud.width = 75+Math.random()*50;
    cloud.height = Math.random()*(canvas.height-cloud.width)-cloud.width/2;
    cloud.speed = 6 + Math.random() * 2;
  }
  places = [5,4,3,2,1]
  drawBirds();
  drawClouds();
  drawFinishLine();
};

function drawFinishLine() {
  //Draw finish line
  var noRows = 30;
  var noCol = 3;
  var rowHeight = canvas.height/noRows;
  var color = 'white';
  for (i = 0; i < noRows; i++) {
    context.fillStyle = color;
    context.fillRect(1000-birdWidth-rowHeight, i*rowHeight, rowHeight, rowHeight);
    context.fillRect(1000-birdWidth-3*rowHeight, i*rowHeight, rowHeight, rowHeight);
    color = changeColor(color);
    context.fillStyle = color;
    context.fillRect(1000-birdWidth-2*rowHeight, i*rowHeight, rowHeight, rowHeight);
  }
};

function drawBirds() {
  for (var key in birds) {
    var bird = birds[key]
    bird.drawing = new Image();
    bird.drawing.src = key+".png";
    bird.drawing.onload = function() {
      context.drawImage(bird.drawing,bird.x,bird.y,birdWidth,birdWidth);
    }
    context.drawImage(bird.drawing,bird.x,bird.y,birdWidth,birdWidth);
  }
};

function start() {
    //Clear canvas for new frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Move clouds
    for (key in clouds) {
      cloud = clouds[key];
      cloud.x -= cloud.speed;
      if (cloud.x < -200) {
        cloud.x = 1200;
        cloud.speed = 6 + Math.random() * 2;
        cloud.height = Math.random()*canvas.height;
      }
    }
    for (key in birds) {
      var bird = birds[key];
      //Before birds cross finish line
      if (bird.x < canvas.width-birdWidth) {
        bird.x += bird.speed+Math.random()*6;
      }
      //After birds cross finish line
      if (bird.x > canvas.width-birdWidth) {
        finish(key)
      };
    }
    drawClouds();
    drawFinishLine();
    drawBirds();
    run = requestAnimationFrame(start);
};

function finish(key) { 
  var winner = birds[key];
  if (winner.rank==0) {
    winner.rank = places.pop();
  }
  if (places.length==0) {
    displayResult();
  }
  context.font = "30px PT Serif";
  context.fillStyle = "black";
  context.fillText(winner.rank,825,winner.y+canvas.height/10);
}

function displayResult() {
  if (chosenBird == null) {
    context.font = "50px PT Serif";
    for (var key in birds) {
      if (birds[key].rank == 1) {
        context.fillStyle = birds[key].color;
        context.fillText(birds[key].name+" won!!! 🏆",200,canvas.height/2);
        winSound.play();
      }
    }
  }
  else {
    context.font = "50px PT Serif";
    bird = birds[chosenBird]
    context.fillStyle = bird.color;
    var numberEnding = "th... 💔 ";
    var rank = bird.rank;
    if (rank == 1) {
      numberEnding = "st!!! 🏆"
      winSound.play();
    }
    else if (rank == 2) {
      numberEnding = "nd!! 🥈"
    }
    else if (rank == 3) {
      numberEnding = "rd! 🥉"
    }
    else {
      failSound.play();
    }
    context.fillText(birds[chosenBird].name+" placed "+birds[chosenBird].rank+numberEnding,200,canvas.height/2);
  }
}

//Handle Buttons
function go(){
  start();
  buttonSound.play();
}

function restart(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  setupCanvas();
  cancelAnimationFrame(run)
  buttonSound.play();
  flamingoOff();
  seagullOff();
  storkOff();
  eagleOff();
  parrotOff();
  chosenBird = null;
}

function flamingoOn() {
  $("#flamingo").css("background-color","pink")
  $("#flamingopic").css("-webkit-filter","drop-shadow(0px 0px 10px deeppink)")
  $("#flamingo").attr("onclick","flamingoOff()")
  chosenBird = "flamingo";
  buttonSound.play();
  seagullOff();
  storkOff();
  eagleOff();
  parrotOff();
};
function flamingoOff() {
  $("#flamingo").css("background-color","powderblue")
  $("#flamingopic").css("-webkit-filter","")
  $("#flamingo").attr("onclick","flamingoOn()")
  buttonSound.play();
}

function seagullOn() {
  $("#seagull").css("background-color","lightyellow")
  $("#seagullpic").css("-webkit-filter","drop-shadow(0px 0px 10px yellow)")
  $("#seagull").attr("onclick","seagullOff()")
  chosenBird = "seagull";
  buttonSound.play();
  flamingoOff();
  storkOff();
  eagleOff();
  parrotOff();
};

function seagullOff() {
  $("#seagull").css("background-color","powderblue")
  $("#seagullpic").css("-webkit-filter","")
  $("#seagull").attr("onclick","seagullOn()")
  buttonSound.play();
}

function storkOn() {
  $("#stork").css("background-color","coral")
  $("#storkpic").css("-webkit-filter","drop-shadow(0px 0px 10px coral)")
  $("#stork").attr("onclick","storkOff()")
  chosenBird = "stork";
  buttonSound.play();
  flamingoOff();
  seagullOff();
  eagleOff();
  parrotOff();
};

function storkOff() {
  $("#stork").css("background-color","powderblue")
  $("#storkpic").css("-webkit-filter","")
  $("#stork").attr("onclick","storkOn()")
  buttonSound.play();
}

function eagleOn() {
  $("#eagle").css("background-color","gold")
  $("#eaglepic").css("-webkit-filter","drop-shadow(0px 0px 10px gold)")
  $("#eagle").attr("onclick","eagleOff()")
  chosenBird = "eagle";
  buttonSound.play();
  flamingoOff();
  seagullOff();
  storkOff();
  parrotOff();
};

function eagleOff() {
  $("#eagle").css("background-color","powderblue")
  $("#eaglepic").css("-webkit-filter","")
  $("#eagle").attr("onclick","eagleOn()")
  buttonSound.play();
}

function parrotOn() {
  $("#parrot").css("background-color","limegreen")
  $("#parrotpic").css("-webkit-filter","drop-shadow(0px 0px 10px limegreen)")
  $("#parrot").attr("onclick","parrotOff()")
  buttonSound.play();
  chosenBird = "parrot";
  flamingoOff();
  seagullOff();
  storkOff();
  eagleOff();
};

function parrotOff() {
  buttonSound
  $("#parrot").css("background-color","powderblue")
  $("#parrotpic").css("-webkit-filter","")
  $("#parrot").attr("onclick","parrotOn()")
  buttonSound.play();
};

setupCanvas();
