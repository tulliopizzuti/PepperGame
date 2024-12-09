var myBoard,
    myArrow,
    shift,
    turn, // 0:you 1:computer
    end,
    winner,
    myComputer;

URL_SERVER_PEPPER = 'http://192.168.2.1:5000';

function setup(){
  //createCanvas(1050,700);
  var cnv = createCanvas(900,700);
  cnv.parent('sketch-holder');
  shift = 200;
  myBoard = new board();
  myBoard.init();
  myArrow = new arrow();
  myComputer = new computer();
  turn = 0; // initially, it's your turn
  end = false;
  //bg = loadImage('static/boardBackground.jpg');

}

function player_Win(){
   console.log("L'utente ha vinto");
   //Pepper dice qualcosa
   $.ajax({
     type: "GET",
     url: URL_SERVER_PEPPER+"/winuser",
     crossDomain: true,
     xhrFields: { withCredentials: true },
     data: { type: "L'utente ha vinto" },
     success: function (response, request) {
        obj = JSON.parse(response.responseText);
        alert(obj.Visit.VisitId);
    },
    /*error: function (request, error) {
        console.log(arguments);
        alert(" Can't do because: " + error);
    },*/
    dataType: "json"
   });
}
function player_loss(){
  console.log("L'utente ha perso");
  //Pepper dice qualcosa
   $.ajax({
     type: "GET",
     url: URL_SERVER_PEPPER+"/winpepper",
     crossDomain: true,
     xhrFields: { withCredentials: true },
     data: { type: "Pepper ha vinto"},
     success: function (response, request) {
        obj = JSON.parse(response.responseText);
        alert(obj.Visit.VisitId);
    },
    /*error: function (request, error) {
        console.log(arguments);
        alert(" Can't do because: " + error);
    },*/
    dataType: "json"
   });
}
function tie_game(){
    console.log("Pareggio");
    //Pepper dice qualcosa
    $.ajax({
     type: "GET",
     url: URL_SERVER_PEPPER+"/tie",
     crossDomain: true,
     xhrFields: { withCredentials: true },
     data: { type: "Pareggio" },
     success: function (response, request) {
        obj = JSON.parse(response.responseText);
        alert(obj.Visit.VisitId);
    },/*
    error: function (request, error) {
        console.log(arguments);
        alert(" Can't do because: " + error);
    },*/
    dataType: "json"
   });
}

function draw(){
	background(173, 226, 226);
  //background(194, 148, 103);
  myBoard.draw();
  myArrow.draw();
  myArrow.update();

  if(myBoard.full()){
    end = true;
    winner = '-';
  }

  if(end){
    background(0,0,0,200);
    textSize(64);
    noStroke();
    if(winner == 'X'){
      fill(255,215,0); //blu  10 10 255
      var msg = "Hai vinto!\n";
      player_Win();
    }
    else if(winner == 'O'){
      fill(255, 10, 10);
      var msg = "Ho vinto!\n";
      player_loss();
    }
    else if(winner == '-'){
      fill(255);
      var msg = "Pareggio!\n";
      tie_game();
    }
    text(msg,width/2-100,height/2);
    noLoop();
  }

  if(turn == 1){

    var state = myComputer.play();
    if(state != '-' && state != false){
      end = true;
      winner = state;
    }
    turn = 1 - turn;
  }
}


function mousePressed(){
  if(turn == 1) return;
  var begin = shift + myBoard.stick.width;
  var newCol = floor(map(mouseX , begin, width - 80, 0, 7));
  if(myBoard.checkColFull(newCol)) return;
  var state = myBoard.addInCol(newCol, turn);
  if(state != '-'){
    end = true;
    winner = state;
    console.log(state);
  }
  turn = 1 - turn;
}



