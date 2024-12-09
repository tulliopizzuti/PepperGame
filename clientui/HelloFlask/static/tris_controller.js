var URL_SERVER_PEPPER = "http://192.168.2.1:5000"
var stressLevel=0
var freezeClic=false;
firstTime=true;

  document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

"use strict";
$(function () {
    //listener per pulsante GIOCA
    $(".game_settings__button").click(function () {
        preparaGioco();
    });
    //listener per input text
    $(".game_settings__input").keyup(function (event) {
        var key = event.keyCode;
        switch (key) {
            case 13:
                //invio
                preparaGioco();
                break;
            case 8:
                //cancella - ammesso
                break;
            case 48:
                $(".game_settings__input").val(0);
                break;
            case 49:
                $(".game_settings__input").val(1);
                break;
            case 50:
                $(".game_settings__input").val(2);
                break;
            default:
                //tutto il resto non ammeso
                $(".game_settings__input").val("");
        }
    });
});

// funzione che prepare il gioco, resettando la scacchiera e creando i giocatori
function preparaGioco() {
    reset();
    if(firstTime){

        var url_string = window.location.href;
        var url = new URL(url_string);
        stressLevel = parseInt(url.searchParams.get("behaviour"));
        firstTime=false;

    }

    /*var giocatori = $(".game_settings__input").val();
    if (giocatori !== "0" && giocatori !== "1" && giocatori !== "2") {
        return;
    }
    giocatori = parseInt(giocatori);
    switch (giocatori) {
        case 1:
            var giocatoreUno = creaGiocatore("persona", 1);
            var giocatoreDue = creaGiocatore("pc", 2);
            break;
        case 2:
            giocatoreUno = creaGiocatore("persona", 1);
            giocatoreDue = creaGiocatore("persona", 2);
            break;
        default:
            giocatoreUno = creaGiocatore("pc", 1);
            giocatoreDue = creaGiocatore("pc", 2);
    }*/
    var giocatoreUno = creaGiocatore("persona", 1);
    var giocatoreDue = creaGiocatore("persona", 2);
    // il giocatore che inizia è deciso randomicamente
    if (getIntRandomNumber(1, 100) % 2 === 0) {
        gioca(giocatoreDue, giocatoreUno);
    } else {
        gioca(giocatoreUno, giocatoreDue);
    }
}

// funzione di utilità
function creaGiocatore(tipo, indice) {
    if (indice === 1) {
        return {tipo: tipo, indiceGiocatore: indice, audio: $("#beep")[0], timeout: 260, countdown: 16};
    }
    return {tipo: tipo, indiceGiocatore: indice, audio: $("#boop")[0], timeout: 260, countdown: 16};
}

//se il giocatore è umano, si collegano listener sulle caselle libere altrimenti si avvia l'algoritmo di ricerca
function gioca(giocatoreCheMuove, avversario) {
    if(giocatoreCheMuove.indiceGiocatore==2){
        $(".game_status__content").text("in attesa della mossa di Pepper");
        $(".game_status__content").css('color', 'red');
    }else{
        $(".game_status__content").text("in attesa del giocatore");
        $(".game_status__content").css('color', 'white');
    }
    if (giocatoreCheMuove.tipo === "persona" && giocatoreCheMuove.indiceGiocatore==1) {
        //collega listener
        collegaListener(giocatoreCheMuove, avversario);
    } else {
        freezeClic=true;
        setTimeout(function () {
            var statoAttuale=ottieniStatoScacchiera();
            //console.log("Stato prima di mossa", statoAttuale);
            console.log("StressLevel " + stressLevel);
            setInvincible(stressLevel);
            var mossaPc = calcola(ottieniStatoScacchiera(), giocatoreCheMuove.indiceGiocatore, giocatoreCheMuove.indiceGiocatore, 0, stressLevel).mossa;
            var indiceCasellaMossaPc = elaboraMossaPc(mossaPc);
            console.log("Indice: " + (indiceCasellaMossaPc+1));
            collegaPepperListener(giocatoreCheMuove, avversario, mossaPc, statoAttuale, indiceCasellaMossaPc);

            //effettuaMossa(giocatoreCheMuove, indiceCasellaMossaPc, avversario);

        }, giocatoreCheMuove.timeout);
    }
}

// assegno una data posizione libera a un giocatore
function assegnaPosizione(giocatoreCheMuove, indiceCasella) {
    if (giocatoreCheMuove.indiceGiocatore === 1) {
        var clonedElement = $(".template .game__cell__cross").clone();
    } else {
        clonedElement = $(".template .game__cell__circle").clone();
    }
    $(".game__cell").eq(indiceCasella).html(clonedElement);
}

// l'algoritmo di ricerca ritorna la mogliore combinazione possibile, estrapolo da essa la casella in cui muovere
function elaboraMossaPc(mossa) {
    var scacchieraAttuale = ottieniStatoScacchiera();
    var indiceMossaPc = -1;
    var cont = 0;
    while (indiceMossaPc === -1 && cont < scacchieraAttuale.length) {
        if (mossa[cont] !== scacchieraAttuale[cont]) {
            indiceMossaPc = cont;
        }
        cont++
    }
    return indiceMossaPc;
}

function end_game(winnerIn){
    //console.log("In: " + winnerIn);

    if(winnerIn==2){
        player_loss();
    }else{
       player_Win();
    }
    //Pepper dice qualcosa
}

function player_Win(){
    console.log("L'utente ha vinto");
    //Pepper dice qualcosa

   $.ajax({
        type: "GET",
         url: URL_SERVER_PEPPER+"/winuser",
         crossDomain: true,
         xhrFields: { withCredentials: true },
         success: function (response, request) {
	        console.log(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
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
	        console.log(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
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
	        console.log(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
        dataType: "json"
    });
}


function tell_move(index){
    console.log("Detta mossa");
    frase="Metti per me un cerchio in posizione "+ index +".";
    //Pepper dice qualcosa

    $.ajax({
        type: "GET",
        url: URL_SERVER_PEPPER+"/tristellmove",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        data: {
            type: frase
        },
        success: function (response, request) {
	        console.log(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
        dataType: "json"
    });


     setTimeout(function () {
            freezeClic=false;
        }, 1300);
}

function cheater(){
console.log("Cheater");
    //Pepper dice qualcosa
    console.log("--- " + stressLevel);
    stressLevel=stressLevel+1;


   var behaviour=0;
    if(stressLevel>=2){
      behaviour=2;
    }else if(stressLevel==1){
      behaviour=1;
    }else{
      behaviour=0;
    }

    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('behaviour', behaviour);
    
    console.log("Behaviour: " + behaviour);

    $.ajax({
        type: "GET",
         url: URL_SERVER_PEPPER+"/trischeat",
         crossDomain: true,
         xhrFields: { withCredentials: true },
         data: {
            type: "Cheater",
            behaviour: behaviour,
            stress: stressLevel
        },
         success: function (response, request) {
	        console.log(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
        dataType: "json"
    });

    if(stressLevel>4){
    freezeClic=true;
    setTimeout(function(){
        //reset();
        $.ajax({
        type: "GET",
         url: URL_SERVER_PEPPER+"/stopgame",
         crossDomain: true,
         xhrFields: { withCredentials: true },
         data: {
            type: "Pepper ferma il gioco"
        },
         success: function (response, request) {
            console.log(response.responseText);
        },
        error: function (request, error) {
            console.log(arguments);
        },
        dataType: "json"
        });
     console.log("Ragequit");
     //var clonedElement = $(".game__cell__cross").clone();
     $( ".game" ).hide();
     $( ".game_settings__button" ).hide();
     freezeClic=false;
    }, 3500);
    }
}

//posiziona simbolo giocatore sulla scacchiera, riproduce suono, aggiorna stato gioco
function effettuaMossaPepper(giocatoreCheMuove, indiceCasella, avversario, mossa, indice) {
    document.getElementById(''+(indiceCasella+1)).classList.remove("placeholder");
    assegnaPosizione(giocatoreCheMuove, indiceCasella);
    giocatoreCheMuove.audio.play();
    setTimeout(function () {
        var statoGioco = calcolaValoreScacchiera(ottieniStatoScacchiera(), giocatoreCheMuove.indiceGiocatore, avversario.indiceGiocatore);
        console.log("pepperClick: " + ottieniStatoScacchiera());

        //Cheater
        if(!arraysEqual(mossa, ottieniStatoScacchiera())){
            document.getElementById(''+(indiceCasella+1)).classList.add("placeholder");
            console.log("Hai imbrogliato!");
            cheater();
            //chiamata ajax
            //var elementID="#"+ (indice+1);
            console.log(indiceCasella);
            console.log(document.getElementById(''+(indiceCasella+1)));
            document.getElementById(''+(indiceCasella+1)).innerHTML = "";

            document.getElementById(''+(indice+1)).classList.remove("placeholder");

            assegnaPosizione(giocatoreCheMuove, indice);

        }
        var statoGioco = calcolaValoreScacchiera(ottieniStatoScacchiera(), giocatoreCheMuove.indiceGiocatore, avversario.indiceGiocatore);
        switch (statoGioco) {
            case 10:
                var vincitore='';
                if(giocatoreCheMuove.indiceGiocatore==1){
                    vincitore="l' Utente";
                }else{
                    vincitore="Pepper";
                }
                $(".game_status__content").text("vince " + vincitore);
                end_game(giocatoreCheMuove.indiceGiocatore);
                break;
            case -10:
                $(".game_status__content").text("vince giocatore " + avversario.indiceGiocatore + " (" + avversario.tipo + ")");
                //end_game(avversario.tipo);
                break;
            case 0:
                $(".game_status__content").text("stallo");
                tie_game();
                 //easter egg
                //easterEgg(giocatoreCheMuove, avversario);
                break;
            default:
                //continua a giocare
                gioca(avversario, giocatoreCheMuove);
         }
    }, giocatoreCheMuove.timeout);
}

//posiziona simbolo giocatore sulla scacchiera, riproduce suono, aggiorna stato gioco
function effettuaMossa(giocatoreCheMuove, indiceCasella, avversario) {
    document.getElementById(''+(indiceCasella+1)).classList.remove("placeholder");
    assegnaPosizione(giocatoreCheMuove, indiceCasella);
    giocatoreCheMuove.audio.play();
    setTimeout(function () {
        var statoGioco = calcolaValoreScacchiera(ottieniStatoScacchiera(), giocatoreCheMuove.indiceGiocatore, avversario.indiceGiocatore);
        switch (statoGioco) {
            case 10:
                $(".game_status__content").text("vince giocatore " + giocatoreCheMuove.indiceGiocatore + " (" + giocatoreCheMuove.tipo + ")");
                end_game(giocatoreCheMuove.tipo);
                break;
            case -10:
                $(".game_status__content").text("vince giocatore " + avversario.indiceGiocatore + " (" + avversario.tipo + ")");
                //end_game(avversario.tipo);
                break;
            case 0:
                $(".game_status__content").text("stallo");
                tie_game();
                //easter egg
                //easterEgg(giocatoreCheMuove, avversario);
                break;
            default:
                //continua a giocare
                gioca(avversario, giocatoreCheMuove);
        }
    }, giocatoreCheMuove.timeout);
}

// collega listener su caselle vuote e dopo che la mossa del giocatore umano viene effettuata rimuovi il listener
function collegaListener(giocatoreCheMuove, avversario) {
    $(".game__cell:empty").click(function () {
        $(".game__cell").off();
        effettuaMossa(giocatoreCheMuove, $(this).index(), avversario);
    });
}

function collegaPepperListener(giocatoreCheMuove, avversario, mossa, stato, indice) {
    console.log("listener. Stato inziale: " + stato);
    console.log("Stato in cui ci si dovrebbe trovare dopo la mossa: " + mossa);
    tell_move(indice+1);
    $(".game__cell:empty").click(function () {
        $(".game__cell").off();
        effettuaMossaPepper(giocatoreCheMuove, $(this).index(), avversario, mossa, indice);
    });
}

//ritorna una array dallo stato corrente della scacchiera con 0 casella libera e 1/2 i giocatori
function ottieniStatoScacchiera() {
    var scacchiera = [];
    for (var cont = 0; cont < 9; cont++) {
        if ($(".game__cell").eq(cont).is(":empty")) {
            scacchiera.push("0");
        } else {
            if ($(".game__cell").eq(cont).has(".game__cell__circle").length) {
                scacchiera.push("2");
            } else {
                scacchiera.push("1");
            }
        }
    }
    //console.log(scacchiera);
    return scacchiera;
}

//resetta il gioco rimuovendo pedine e cancellando i listener
function reset() {
    $(".game__cell").off();
    $(".game__cell").empty();
    document.getElementById(''+(1)).classList.add("placeholder");
    document.getElementById(''+(2)).classList.add("placeholder");
    document.getElementById(''+(3)).classList.add("placeholder");
    document.getElementById(''+(4)).classList.add("placeholder");
    document.getElementById(''+(5)).classList.add("placeholder");
    document.getElementById(''+(6)).classList.add("placeholder");
    document.getElementById(''+(7)).classList.add("placeholder");
    document.getElementById(''+(8)).classList.add("placeholder");
    document.getElementById(''+(9)).classList.add("placeholder");
}

//funzione random
function getIntRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max + 1 - min) + min);
}

// easter egg
function easterEgg(giocatoreCheMuove, avversario) {
    if (giocatoreCheMuove.tipo === "pc" && avversario.tipo === "pc") {
        if (giocatoreCheMuove.countdown > 0) {
            reset();
            //modifico proprietà giocatore per velocizzare il gioco
            giocatoreCheMuove.countdown--;
            avversario.countdown--;
            giocatoreCheMuove.timeout -= 20;
            avversario.timeout -= 20;
            gioca(giocatoreCheMuove, avversario);
        } else {
            //fine del countdown
            mostraFineEasterEgg();
        }
    }
}

function mostraFineEasterEgg() {
    $(".easteregg").show();
    var frasi = ["Salve professor Falken.", "Strano gioco.", "l'unica mossa vincente è non giocare.", "che ne dice di una bella partita a scacchi?"];
    var contenitori = [$(".easteregg__first_line"), $(".easteregg__second_line"), $(".easteregg__third_line"), $(".easteregg__fourth_line")];
    setTimeout(function () {
        mostraFrase(frasi, contenitori, 0, 0);
    }, 2500);
}

function mostraFrase(frasi, contenitori, indiceLettera, indiceFrase) {
    if (indiceFrase === frasi.length) {
        //le frasi da stampare a schermo sono terminate
        setTimeout(function () {
            $(".easteregg__love").show();
        }, 500);
        return;
    }
    if (indiceLettera > frasi[indiceFrase].length) {
        //la frase corrente è terminata, incremento indice frase
        setTimeout(function () {
            mostraFrase(frasi, contenitori, 0, indiceFrase + 1);
        }, 1600);
    } else {
        // stampo lettera frase corrente
        setTimeout(function () {
            contenitori[indiceFrase].text(frasi[indiceFrase].substring(0, indiceLettera));
            mostraFrase(frasi, contenitori, indiceLettera + 1, indiceFrase);
        }, 50);
    }
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
