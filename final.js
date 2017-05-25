
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Globals
var initX = 0;
var x1 = initX;
var x2 = initX;
var x3 = initX;
var x4 = initX;
var x5 = initX;
var speed1 = Math.random()*3
var speed2 = Math.random()*3
var speed3 = Math.random()*3
var speed4 = Math.random()*3
var speed5 = Math.random()*3
var cspeed1 = 6 + Math.random() * 5
var cspeed2 = 6 + Math.random() * 5
var cspeed3 = 6 + Math.random() * 5
var birdWidth = 90;
var places = [5,4,3,2,1]
var winners = {'Floyd':0,'Ellen':0,'Stanley':0,'Sandy':0,'Peter':0}
var run = null;
var chosenBird = null;
var birdColors = {'Floyd':'deeppink','Ellen':'goldenrod','Sandy':'lightyellow','Stanley':'coral','Peter':'limegreen'}
//Sound Effects
var buttonSound = new Audio("button.m4a")
var winSound = new Audio("win.wav")
var failSound = new Audio("fail.mp3")
var cx1 = Math.random()*1000;
var cx2 = Math.random()*1000;
var cx3 = Math.random()*1000;
var cloudWidth = 100+Math.random()*50
var cloudWidth2 = 75+Math.random()*50
var cloudHeight = Math.random()*canvas.height+10
var cloudHeight2 = canvas.height/2+Math.random()*canvas.height/3
var cloudHeight3 = canvas.height/2-Math.random()*canvas.height/3


function changeColor(color) {
  if (color=='black') {
    return 'white';
  };
  if (color=='white') {
    return 'black';
  };
}

function drawClouds() {
  var cloud = new Image();
  cloud.src = "cloud.png";
  cloud.onload = function() {
    context.drawImage(cloud,cx1,cloudHeight,cloudWidth,cloudWidth);
  }
  context.drawImage(cloud,cx1,cloudHeight,cloudWidth,cloudWidth);
  var cloud2 = new Image();
  cloud2.src = "cloud2.png";
  cloud2.onload = function() {
    context.drawImage(cloud2,cx2,cloudHeight2,cloudWidth2,cloudWidth2);
  }
  context.drawImage(cloud2,cx2,cloudHeight2,cloudWidth2,cloudWidth2);
  var cloud3 = new Image();
  cloud3.src = "cloud2.png";
  cloud3.onload = function() {
    context.drawImage(cloud3,cx3,cloudHeight3,cloudWidth2,cloudWidth2);
  }
  context.drawImage(cloud3,cx3,cloudHeight3,cloudWidth2,cloudWidth2);
}

function setupCanvas() {
  x1 = initX;
  x2 = initX;
  x3 = initX;
  x4 = initX;
  x5 = initX;
  speed1 = Math.random()*3
  speed2 = Math.random()*3
  speed3 = Math.random()*3
  speed4 = Math.random()*3
  speed5 = Math.random()*3
  places = [5,4,3,2,1]
  winners = {'Floyd':0,'Ellen':0,'Stanley':0,'Sandy':0,'Peter':0}
  drawFinishLine();
  drawBirds();
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

  drawing1 = new Image();
  drawing1.src = "flamingo.png";
  drawing1.onload = function() {
    context.drawImage(drawing1,initX,0,birdWidth,birdWidth);
  }
  context.drawImage(drawing1,x1,0,birdWidth,birdWidth);

  drawing2 = new Image();
  drawing2.src = "seagull.png";
  drawing2.onload = function() {
    context.drawImage(drawing2,initX,canvas.height/5,birdWidth,birdWidth);
  }
  context.drawImage(drawing2,x2,canvas.height/5,birdWidth,birdWidth);

  drawing3 = new Image();
  drawing3.src = "stork.png";
  drawing3.onload = function() {
    context.drawImage(drawing3,initX,2*canvas.height/5,birdWidth,birdWidth);
  }
  context.drawImage(drawing3,x3,2*canvas.height/5,birdWidth,birdWidth);

  drawing4 = new Image();
  drawing4.src = "eagle.png";
  drawing4.onload = function() {
    context.drawImage(drawing4,initX,3*canvas.height/5,birdWidth,birdWidth);
  }
  context.drawImage(drawing4,x4,3*canvas.height/5,birdWidth,birdWidth);

  drawing5 = new Image();
  drawing5.src = "parrot.png";
  drawing5.onload = function() {
    context.drawImage(drawing5,initX,4*canvas.height/5,birdWidth,birdWidth);
  }
  context.drawImage(drawing5,x5,4*canvas.height/5,birdWidth,birdWidth);
};

function start() {
    //Clear canvas for new frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawClouds();
    drawFinishLine();
    drawBirds();
    //Move clouds
    cx1 -= cspeed1;
    cx2 -= cspeed2;
    cx3 -= cspeed3;
    if (cx1 < -200) {
      cx1 = 1200;
      cspeed1 = 4 + Math.random() * 2
      cloudHeight = Math.random()*canvas.height;
    }
    if (cx2 < -200) {
      cx2 = 1200;
      cspeed2 = 4 + Math.random() * 2
      cloudHeight2 = canvas.height/2-Math.random()*canvas.height/3
    }
    if (cx3 < -200) {
      cx3 = 1200;
      cspeed3 = 4 + Math.random() * 2
      cloudHeight3 = canvas.height/2+Math.random()*canvas.height/3
    }
    //Before birds cross finish line
    if (x1 < canvas.width-birdWidth) {
      x1 += speed1+Math.random()*6;
    };
    if (x2 < canvas.width-birdWidth) {
      x2 += speed2+Math.random()*6;
    };
    if (x3 < canvas.width-birdWidth) {
      x3 += speed3+Math.random()*6;
    };
    if (x4 < canvas.width-birdWidth) {
      x4 += speed4+Math.random()*6;
    };
    if (x5 < canvas.width-birdWidth) {
      x5 += speed5+Math.random()*6;
    };
    //After birds cross finish line
    if (x1 > canvas.width-birdWidth) {
      finish('Floyd',0)
    };
    if (x2 > canvas.width-birdWidth) {
      finish('Sandy',canvas.height/5)
    };
    if (x3 > canvas.width-birdWidth) {
      finish('Stanley',2*canvas.height/5)
    };
    if (x4 > canvas.width-birdWidth) {
      finish('Ellen',3*canvas.height/5)
    };
    if (x5 > canvas.width-birdWidth) {
      finish('Peter',4*canvas.height/5)
    };
    run = requestAnimationFrame(start)
};




function finish(name,height) {
  if (winners[name]==0) {
    winners[name] = places.pop();
  }
  if (places.length==0) {
    displayResult(winners);
  }
  context.font = "30px PT Serif";
  context.fillStyle = "black";
  context.fillText(winners[name],825,height+canvas.height/10);
}

function displayResult(results) {
  if (chosenBird == null) {
    context.font = "50px PT Serif";
    var winningBird = getKeyByValue(winners,1);
    context.fillStyle = birdColors[winningBird];
    context.fillText(winningBird+" won!!! 🏆",200,canvas.height/2);
    winSound.play();
  }
  else {
    context.font = "50px PT Serif";
    context.fillStyle = birdColors[chosenBird];
    var numberEnding = "th... 💔 ";

    if (winners[chosenBird] == 1) {
      numberEnding = "st!!! 🏆"
      winSound.play();
    }
    else if (winners[chosenBird] == 2) {
      numberEnding = "nd!! 🥈"
    }
    else if (winners[chosenBird] == 3) {
      numberEnding = "rd! 🥉"
    }
    else {
      failSound.play();
    }
    context.fillText(chosenBird+" placed "+winners[chosenBird]+numberEnding,200,canvas.height/2);
  }
}
//Get key by value method for Javascript from
//http://stackoverflow.com/questions/9907419/javascript-object-get-key-by-value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//Handle Buttons
function go(){
  start();
  buttonSound.play();
}

function restart(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawClouds();
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
  chosenBird = "Floyd";
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
  chosenBird = "Sandy";
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
  chosenBird = "Stanley";
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
  chosenBird = "Ellen";
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
  chosenBird = "Peter";
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

drawClouds();
setupCanvas();
