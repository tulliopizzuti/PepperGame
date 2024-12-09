let symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
    cards=[],
    opened = [],
    gameTable = new Map(), //Memoria di pepper sulle carte scoperte nella griglia di gioco
    completegameTable = new Map(), //Mappa completa da usare se pepper vuole chiudere la partita da solo
    possibleMoves=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 
    possibleMovesSet=new Set(possibleMoves),//Possibili mosse che Pepper può scegliere
    playerPoints=0,//Numero di coppie trovate dal giocatore
    pepperPoints=0, //Numero di coppie trovate da Pepper
    endTurnPlayer=false, //Flag che stabilisce quando il turno dell'utente è terminato
    match = 0,
    moves = 0,
    clicks = 0,
    freezeClic = false,
    $deck = jQuery('.deck'),
    $scorePanel = $('#score-panel'),
    $turnPanel = $('#turn'),
    $playerScore = $('.playerScore'),
    $pepperScore =$('.pepperScore'),
    $restart = $('.restart'),
    stressLevel=0;
    timeoutPepper=3500;
    firstTime=true;
    timer=$('.timer');

function player_Win(){
    console.log("L'utente ha vinto");
    //Pepper dice qualcosa

   $.ajax({
        type: "GET",
         url: URL_SERVER_PEPPER+"/winuser",
         crossDomain: true,
         xhrFields: { withCredentials: true },
         success: function (response, request) {
          //console.log(response.responseText);
      },
      error: function (request, error) {
          //console.log(arguments);
      },
        dataType: "json"
    });
}

function player_loss(){
    console.log("L'utente ha perso");

    $.ajax({
        type: "GET",
         url: URL_SERVER_PEPPER+"/winpepper",
         crossDomain: true,
         xhrFields: { withCredentials: true },
         success: function (response, request) {
          //console.log(response.responseText);
      },
      error: function (request, error) {
          //console.log(arguments);
      },
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
         success: function (response, request) {
          //console.log(response.responseText);
      },
      error: function (request, error) {
          //console.log(arguments);
      },
        dataType: "json"
    });
}


function correct_Move(){


  freezeClic=true;


console.log("L'utente ha eseguito una mossa corretta");

    console.log("Stress prima dell'aggiornamento " + stressLevel);

  //Pepper dice qualcosa
    if(stressLevel <= 4.5){
      stressLevel=stressLevel+0.5;
    }

    console.log("Stress dopo l'aggiornamento"  + stressLevel);

    var behaviour=0;
    if(stressLevel>=2){
      behaviour=2;
    }else if(stressLevel>=1 && stressLevel<2){
      behaviour=1;
    }else{
      behaviour=0;
    }

    if(stressLevel>=0 && stressLevel<1){
     timeoutPepper=3500;
    }else if(stressLevel>=1 && stressLevel<=2){
      timeoutPepper=5500;
    }else{
      timeoutPepper=4500;
    }

    var stressLevelToSend=0;
    if(stressLevel>=0 && stressLevel<1){
      stressLevelToSend=0;
    }else if(stressLevel>=1 && stressLevel<2){
      stressLevelToSend=1;
    }else if(stressLevel>=2 && stressLevel<3){
      stressLevelToSend=2;
    }else if(stressLevel>=3 && stressLevel<4){
      stressLevelToSend=3;
    }else if(stressLevel>=4 && stressLevel<5){
      stressLevelToSend=4;
    }else if(stressLevel>4.5){
      stressLevelToSend=5;
    }

    console.log("Behaviour--"  + behaviour);
    console.log("Stress da inviare " + stressLevelToSend);


    if(stressLevel>4.5){
      stressLevelToSend=5
      console.log("Ragequit");
      timeoutPepper=1000;
      $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/getsolution",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Pepper risolvi",
          stress: stressLevelToSend
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          console.log(arguments);
      },
      dataType: "json"
    });
      PepperMoves(completegameTable, true);
    }else{
        $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/memocorrectmove",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Mossa corretta",
          behaviour: behaviour,
          stress: stressLevelToSend
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          console.log(arguments);
      },
      dataType: "json"
    });  

    }

    //2 secondi di pausa tra due mosse consecutive dell'utente
    setTimeout(()=> {
          freezeClic=false;
    }, 2000);
}

function wrong_Move(){
console.log("L'utente ha eseguito una mossa sbagliata");
  //Pepper dice qualcosa
    if(stressLevel>=0.25){
      stressLevel=stressLevel-0.25;
    }

     console.log("Stress--"  + stressLevel);

    var behaviour=0;
    if(stressLevel>=2){
      behaviour=2;
    }else if(stressLevel>=1 && stressLevel<2){
      behaviour=1;
    }else{
      behaviour=0;
    }

    if(stressLevel>=0 && stressLevel<1){
     timeoutPepper=3500;
    }else if(stressLevel>=1 && stressLevel<=2){
      timeoutPepper=5500;
    }else{
      timeoutPepper=4500;
    }

    var stressLevelToSend=0;
    if(stressLevel>=0 && stressLevel<1){
      stressLevelToSend=0;
    }else if(stressLevel>=1 && stressLevel<2){
      stressLevelToSend=1;
    }else if(stressLevel>=2 && stressLevel<3){
      stressLevelToSend=2;
    }else if(stressLevel>=3 && stressLevel<4){
      stressLevelToSend=3;
    }else if(stressLevel>=4 && stressLevel<5){
      stressLevelToSend=4;
    }else if(stressLevel>4.75){
      stressLevelToSend=5;
    }


     console.log("Behaviour--"  + behaviour);
     console.log("Stress da inviare " + stressLevelToSend);

    //console.log("Behaviour: " + behaviour);

   $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/hangmanwrongmove",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Mossa sbagliata",
          behaviour: behaviour,
          stress: stressLevelToSend
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          //console.log(arguments);
      },
      dataType: "json"
    });
    console.log("Stress: " + stressLevel);
}

function pepper_correct_Move(){
console.log("Pepper ha eseguito una mossa corretta");
  //Pepper dice qualcosa
   $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/peppercorrectmove",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Pepper Mossa corretta"
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          //console.log(arguments);
      },
      dataType: "json"
    });
}

function pepper_wrong_Move(){
console.log("Pepper ha eseguito una mossa sbagliata");
  //Pepper dice qualcosa
  


    if(stressLevel<=4.5){
      stressLevel=stressLevel+0.5;
    }

    console.log("Stress--"  + stressLevel);


    var behaviour=0;
    if(stressLevel>=2){
      behaviour=2;
    }else if(stressLevel>=1 && stressLevel<2){
      behaviour=1;
    }else{
      behaviour=0;
    }

    if(stressLevel>=0 && stressLevel<1){
     timeoutPepper=3500;
    }else if(stressLevel>=1 && stressLevel<=2){
      timeoutPepper=5500;
    }else{
      timeoutPepper=4500;
    }

    var stressLevelToSend=0;
    if(stressLevel>=0 && stressLevel<1){
      stressLevelToSend=0;
    }else if(stressLevel>=1 && stressLevel<2){
      stressLevelToSend=1;
    }else if(stressLevel>=2 && stressLevel<3){
      stressLevelToSend=2;
    }else if(stressLevel>=3 && stressLevel<4){
      stressLevelToSend=3;
    }else if(stressLevel>=4 && stressLevel<5){
      stressLevelToSend=4;
    }else if(stressLevel>4.75){
      stressLevelToSend=5;
    }


    console.log("Behaviour: " + behaviour);
    console.log("Stress da inviare " + stressLevelToSend);


   $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/pepperwrongmove",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Pepper Mossa sbagliata",
          behaviour: behaviour,
          stress: stressLevelToSend
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          console.log(arguments);
      },
      dataType: "json"
    });
    console.log("Stress: " + stressLevel);

    if(stressLevel>4.5){
      console.log("Ragequit");

      $.ajax({
      type: "GET",
       url: URL_SERVER_PEPPER+"/getsolution",
       crossDomain: true,
       xhrFields: { withCredentials: true },
       data: {
          type: "Pepper risolvi"
       },
       success: function (response, request) {
          obj = JSON.parse(response.responseText);
      },
      error: function (request, error) {
          console.log(arguments);
      },
      dataType: "json"
    });
      PepperMoves(completegameTable, true);
    }
}

let gameTimer = () => {
  let startTime = new Date().getTime();

  // Update the timer every second
  timer = setInterval(() => {

    let now = new Date().getTime();

    // Find the time elapsed between now and start
    let elapsed = now - startTime;

    // Calculate minutes and seconds
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    // Add starting 0 if seconds < 10
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let currentTime = minutes + ':' + seconds;

    // Update clock on game screen and modal
    $(".clock").text(currentTime);
  }, 750);
};

// Initialize Memory Game
let init = ()=> {

  cards = shuffle(symbols);
  console.log(cards)
  $deck.empty();
  match = 0;
  moves = 0;

  if(firstTime){
      var url_string = window.location.href;
      var url = new URL(url_string);
      stressLevel=parseInt(url.searchParams.get("behaviour"));
      firstTime=false;
  }

    if(stressLevel>=0 && stressLevel<1){
     timeoutPepper=3500;
    }else if(stressLevel>=1 && stressLevel<=2){
      timeoutPepper=5500;
    }else{
      timeoutPepper=4500;
    }

  completegameTable=new Map();
  gameTable=new Map();

  $playerScore.text('0');
  $pepperScore.text('0');
  playerPoints=0,//Numero di coppie trovate dal giocatore
  pepperPoints=0, //Numero di coppie trovate da Pepper
  //ID assegnato ad ogni carta
  id=1
  for (let i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card" id="'+id+'"><i class="fa fa-' + cards[i] + '"></i></li>'))

    console.log("init: " + cards[i]);
    console.log("init: " + id);

    if(completegameTable.has(cards[i])){
        let positions=new Set();
        positions=completegameTable.get(cards[i]);
        //console.log("Nella mappa: " + positions);
        positions.add(id);
        completegameTable.set(cards[i],positions);
    }else{
        let positions=new Set();
        positions.add(id);        
        completegameTable.set(cards[i],positions);
        //console.log("Aggiunto alla mappa");
    }
    id++;
  }

  //console.log(completegameTable);
  document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);
  addClkListener(cards);
  $(".clock").text("0:00");
  
};


let shuffle = (array)=> {

  let index = array.length, temp, randomIndex;
  while (0 !== index) {
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;
    temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

// End The Memory Game
// Open Popup for showing required details 
// On configuaration, show default view
let endGame = () => {
  if(match>=8){
    match=0;
    if(pepperPoints<playerPoints){
      player_Win();
      message='Congratulazioni! Hai vinto!';
    } else if(pepperPoints>playerPoints){
      player_loss();
      message="Ha vinto Pepper!";
    } else{
      tie_game();
      message="La partita è finita in pareggio!";
    }

  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: message,
    type: 'success',
    confirmButtonColor: '#02ccba',
    confirmButtonText: 'Gioca di nuovo!',
    showCancelButton: true,
    cancelButtonColor: '#f95c3c',
    cancelButtonText: 'Esci',
  }).then((isConfirm)=> {
    if (isConfirm) {
      clicks = 0;
      playerPoints=0;
      pepperPoints=0;
      gameTable=new Map();
      completegameTable=new Map();
      possibleMoves=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; 
      possibleMovesSet=new Set(possibleMoves);
      endTurnPlayer=false;
      clearInterval(timer);
      init();
    }else{
       window.location = "/index";
    }
  })
}
}

let addClkListener = ()=> {
  // Card click listner for flipping card
  $deck.find('.card:not(".match, .open")').bind('click' , function() {
    clicks++ ;
    clicks == 1 ? gameTimer() :'';
    // Check for call to be heppend before all dom update
    if($('.show').length > 1) { return true; };
    let $this = $(this), card = $this.context.innerHTML;

    // Check if the player has clicked the same card
    if($this.hasClass('open')){ return true;};
    $this.addClass('open show');

    //Aggiunta della carta scoperta dall'utente alla memoria di Pepper
    let clicked=$this.attr('id');
    if(gameTable.has(cards[parseInt(clicked-1)])){
        let positions=new Set();
        positions=gameTable.get(cards[parseInt(clicked-1)]);
        //console.log("Nella mappa: " + positions);
        positions.add($this.attr('id'));
        gameTable.set(cards[parseInt(clicked-1)],positions);
    }else{
        let positions=new Set();
        positions.add($this.attr('id'));        
        gameTable.set(cards[parseInt(clicked-1)],positions);
        //console.log("Aggiunto alla mappa");
    }

    opened.push(card);
    // Check with opened card
    // Add view changes in cards
    // Remove css animation classes
    if (opened.length > 1) {
      endTurnPlayer=true;
      if (card === opened[0]) {

        //La mossa dell'utente è corretta. Rimozione di questa mossa delle possibili alternative di Pepper
        movesToDelete=gameTable.get(cards[parseInt(clicked-1)]);
        //console.log("Mosse da cancellare");
        //console.log(movesToDelete);

        pos1=movesToDelete.values().next().value;
        possibleMovesSet.delete(parseInt(pos1));
        movesToDelete.delete(pos1);

        pos2=movesToDelete.values().next().value;
        possibleMovesSet.delete(parseInt(pos2));
        movesToDelete.delete(pos2);


        $deck.find('.open').addClass('match animated infinite rubberBand');
        setTimeout(()=> {
          $deck.find('.match').removeClass('open show animated infinite rubberBand');
        }, 800);

        match++;
        playerPoints++;
        gameTable.delete(cards[parseInt(clicked-1)]);
        completegameTable.delete(cards[parseInt(clicked-1)]);
        correct_Move();
        if(match == 8){
          gameTable=new Map();
          completegameTable=new Map();
        }
        //Il giocatore umano ha individuato una coppia e quindi tocca ancora a lui nel prossimo turno 
        endTurnPlayer=false;
        //Rimozione dalla memoria di pepper delle posizioni delle carte trovate
        
      } else {
        //mossa sbagliata
        wrong_Move();
        $deck.find('.open').addClass('notmatch animated infinite wobble');
        setTimeout(()=> {
          $deck.find('.open').removeClass('animated infinite wobble');
        }, 800 / 1.5);
        setTimeout(()=> {
          $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
        }, 800);
      }
      opened = [];
      moves++;
      $playerScore.html(playerPoints);
      //console.log(gameTable);
    }


    if(endTurnPlayer){
      freezeClic=true;
      $turnPanel.text('Tocca a Pepper');
       $turnPanel.css('color', 'red');
      //Pausa dopo la fine del turno dell'utente
      //pause(2000);
    }

    if (match == 8) {
        console.log("Endgame");
        freezeClic=false;
        endGame();
    } 

    setTimeout(()=> {

      //Se il turno dell'utente è finito tocca a Pepper
     if(endTurnPlayer && match<8){
        freezeClic=true;
       //Funzione che implementa tutte le mosse nel turno di Pepper
        gameTable=PepperMoves(gameTable, false);
        endTurnPlayer=false;

        //console.log("Fine turno di Pepper");
      }   

      // End Memory Game if all cards matched
          if (match === 8) {
            freezeClic=false;
            setTimeout(()=> {
                endGame();
              }, 500);
            } 

         }, timeoutPepper);

    });
};

// Bind the restart click event
// Restart the Memory Game
// Open Popup for showing required details 
// On configuaration, show default view
$restart.bind('click', ()=> {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Sei sicuro?',
    text: "I tuoi progressi andranno persi!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Si, ricomincia!'
  }).then((isConfirm)=> {
    if (isConfirm) {
      clicks = 0;
      clearInterval(timer);
      init();
    }
  })
});

// Initialize the Memory Game
init();


function pause(milliseconds) {
  var dt = new Date();
  while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function PepperMoves(_gameTable, _correct_move){

        if(_correct_move){
          timeoutPepper=3000;
        }      
        
        console.log("(PepperMoves) Adesso tocca a Pepper... match attuali", + match);
        console.log(_gameTable);

        //Flag che indica se Pepper ha effettuato una mossa corretta
        matching=false;
        for (let [key, value] of _gameTable) {   
          //Se in memoria è presente una coppia di posizioni per una carta dello stesso tipo allora c'è una mossa sicura          
          if(value.size>1){
            //pepper azzecca la mossa
            //console.log("Ho trovato una mossa sicura per la carta: " + key);

            //Rimozione della mossa corretta dalle alternative di pepper
            pos3=value.values().next().value;
            possibleMovesSet.delete(parseInt(pos3));
            value.delete(pos3);

            pos4=value.values().next().value;
            possibleMovesSet.delete(parseInt(pos4));
            value.delete(pos4);

            //Avvio animazioni per la mossa corretta
            startAnimation(pos3,pos4,_correct_move);
            timeoutPepper=3000;
            match++;
            moves++;
            pepperPoints++;
            _correct_move=true;
            $pepperScore.html(pepperPoints);
            //console.log("Punteggio Pepper: " + pepperPoints);
            _gameTable.delete(key);
            completegameTable.delete(key);
            matching=true;
            break;
          } //end if
        } //end for

        //Se non c'è una mossa certa Pepper deve scegliere casualmente
        if(!matching && match<8){
          //console.log("Non ho una mossa sicura... Possibili mosse:");
          //console.log(possibleMovesSet);
          setTimeout(()=> {
            _gameTable=PepperBlindMoves(_gameTable, _correct_move);
          }, timeoutPepper);
        }

        //Se Pepper ha eseguito una mossa corretta tocca ancora a lui
        if(matching && match<8){
          timeoutPepper=3000;
          //console.log("Ho eseguito una mossa corretta. Tocca ancora a me");
          setTimeout(()=> {
               _gameTable=PepperMoves(_gameTable, _correct_move);
          }, timeoutPepper);
          matching=false;
        }

        if (match === 8) {
          freezeClic=false;
          setTimeout(()=> {
           endGame();
          }, 500);
        } 

        return _gameTable;
}

//Animazione per le mosse corrette di Pepper
function startAnimation(i,j,_correct_move){
  //console.log("(startAnimation)--Mossa");
  firstClick=$(document.getElementById(""+i));

  secondClick=$(document.getElementById(""+j));

  //firstClick.addClass('match animated infinite rubberBand');
  //secondClick.addClass('match animated infinite rubberBand');
  firstClick.addClass('card match');  
  secondClick.addClass('card match');
  if(!_correct_move){
    console.log("Chiamata a pepper");
    pepper_correct_Move();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Funzione che implementa le mosse di Pepper quando non ha una mossa sicura
function PepperBlindMoves(_gameTable, _correct_move){
  //console.log(_gameTable);
  matching=false;
  //console.log("Pepper fa la sua mossa a caso... match attuali: " + match);
  //console.log(_gameTable);

  //Genera due numeri diversi a caso nel range [0, grandezza dell'insieme delle possibili mosse-1]
  click1=getRandomInt(possibleMovesSet.size);
  click2=getRandomInt(possibleMovesSet.size);
  while(click2==click1){
      click2=getRandomInt(possibleMovesSet.size);
  }

  //Recupero l'array delle possibili mosse dall'insieme 
  possibleMoveArray=Array.from(possibleMovesSet.values());

  //Recupero gli ID delle carte da cliccare per la mossa scelta
  clicked1=possibleMoveArray[click1];
  clicked2=possibleMoveArray[click2];

  //console.log("Scelgo " + clicked1 + " e " + clicked2);

  if(cards[clicked1-1]==cards[clicked2-1]){
    matching=true;
    possibleMovesSet.delete(clicked1);
    possibleMovesSet.delete(clicked2);
    //console.log("La mossa random funziona");
    _gameTable.delete(cards[clicked1]);
    completegameTable.delete(cards[clicked1]);
    startAnimation(clicked1, clicked2, _correct_move);
    match++;
    //mossa corretta di pepper (livello stress)
    moves++;
    pepperPoints++;
    $pepperScore.html(pepperPoints);
  }else{
    //console.log("Mossa sbagliata");
    //Avvio animazione per la mossa errata
    startErrorAnimation(clicked1, clicked2);
  }

  //Se Pepper ha indovinato e la partita non è terminata tocca ancora a lui
  if(matching && match<8){
    timeoutPepper=1500;
    setTimeout(()=> {
              _gameTable=PepperBlindMoves(_gameTable, _correct_move);
          }, timeoutPepper);
    matching=false;
  }

  if (match === 8) {
      freezeClic=false;
      setTimeout(()=> {
        endGame();
      }, 500);
    }
  //mossa errata di pepper (livello stress)
  return _gameTable;
}


function startErrorAnimation(i,j){
  //console.log("(startAnimation)--Mossa");
  firstClick=$(document.getElementById(""+i));

  secondClick=$(document.getElementById(""+j));
  //console.log(secondClick);

  firstClick.addClass('show');
  secondClick.addClass('show');
  firstClick.addClass('notmatch animated infinite wobble');
  secondClick.addClass('notmatch animated infinite wobble');
  setTimeout(()=> {
      firstClick.removeClass('open show notmatch animated infinite wobble');
      secondClick.removeClass('open show notmatch animated infinite wobble');
      pepper_wrong_Move();
      freezeClic=false;
    if(stressLevel>=0 && stressLevel<1){
     timeoutPepper=4500;
    }else if(stressLevel>=1 && stressLevel<=2){
      timeoutPepper=6500;
    }else{
      timeoutPepper=5500;
    }  
      $turnPanel.text("Tocca all'utente");
      $turnPanel.css('color', 'blue');
  }, 800);
}
    
