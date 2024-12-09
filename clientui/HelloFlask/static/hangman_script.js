//Define Elements in Categories by Dificulty/Length (Not Including Spaces, Vowels, or Repeated Letters)
var animals = ["Orso", "Tigre", "Cavallo", "Gatto", "Porcospino","Pecora","Ornitorinco","Mucca", "Scoiattolo", "Armadillo", 
			   "Barracuda", "Granchio", "Canguro", "Cervo", "Maiale", "Coccodrillo", "Delfino", "Elefante", "Oca", "Formica",
			   "Pantera", "Pinguino", "Tacchino", "Rana", "Serpente", "Volpe", "Squalo", "Salamandra", "Polpo", "Anatra"];
var countries = ["Cina", "Canada", "Italia", "Spagna", "Inghilterra","Argentina","Portorico","Afghanistan","Belgio","Cambogia",
				 "Filippine", "Danimarca", "Giappone", "India", "Croazia", "Serbia", "Grecia", "Francia", "Germania", "Islanda",
				 "Liechtenstein", "Norvegia", "Portogallo", "Panama", "Egitto", "Yemen", "Bangladesh", "Albania", "Ucraina", "Svezia"];
var footballPlayers = ["Maradona", "Messi", "Ronaldo", "Buffon", "Lewandowski", "Haaland","Bastoni", "Salah", "Neymar", "Benzema",
					   "Modric", "Neuer", "Lukaku", "Kane", "Immobile", "Totti", "Ibrahimovic", "Dybala", "Martinez", "Donnarumma",
					   "Giroud", "Vlahovic", "Kvaratskhelia", "Osimhen", "Insigne", "Cavani", "Lavezzi", "Higuain", "Hamsik", "Leao"];
var sports = ["Golf", "Boxe", "Calcio", "Basket", "Curling", "Pallavolo", "Tennis", "Padel", "Baseball", "Football",
			  "Scherma", "Karate", "Badminton", "Pallamano", "Pattinaggio", "Sci", "Snowboard", "Triathlon", "Ciclismo", "Karting",
			  "Bowling", "Futsal", "Canottaggio", "Cricket", "Hockey", "Judo", "Lacrosse", "Motocross", "Pugilato", "Rafting"];
var capitals = ["Roma", "Atene", "Baku", "Amsterdam", "Ankara", "Berna", "Bruxelles", "Bucarest", "Canberra", "Dublino",
			   "Madrid", "Manila", "Monaco", "Berlino", "Kiev", "Oslo", "Ottawa", "Parigi", "Praga", "Riga",
			   "Tokyo", "Tunisi", "Vienna", "Washington", "Zagabria", "Stoccolma", "Tallinn", "Taipei", "Seul", "Sarajevo"]
var oggetti=["Bottiglia", "Computer", "Telefono", "Monitor", "Pallone", "Accendino", "Caricabatterie", "Pennarello", "Matita", "Cuffie",
			 "Lavagna", "Occhiali", "Piatto", "Maglietta", "Telecamera", "Libro","Lampadina","Chitarra","Ukulele","Batteria",
			 "Pianoforte","Automobile","Videogioco","Televisione","Proiettore","Scatola","Estintore","Joystick","Libreria","Armadietto"]

var stressLevel=0
var errori=0
var freezeClic=false;
var firstGame=true;

//Concatenate Arrays into Categorys Array
var categories = [animals, countries, footballPlayers, sports, capitals, oggetti];

//Declare the rest of the variables
var char;
var charIndex;
var canvas;
var context;
var hangOrder;
var show;
var triesLeft;
var word;
var random;
var id;
var category;
var newWord;
var gameEnded;
var URL_SERVER_PEPPER ="http://192.168.2.1:5000"

//Define functions to "filter" through the word
function regexEscape(char) {
	return char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').toLowerCase();
}


document.addEventListener("click", e => {
    console.log("Bloccato" + freezeClic);
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);


function replace(c, a) {
	var regex = new RegExp("[^ " + a + "]", 'ig');
	return c.replace(regex, "_");
}

$(".category").click(function() {

	confirm_category();
	//Reset variables
	show = "aeiou";
	triesLeft = 5;
	gameEnded = false;

	if(firstGame){
		var url_string = window.location.href;
  	    var url = new URL(url_string);
  	    stressLevel = parseInt(url.searchParams.get("behaviour"));
  	    errori=0;
  	    firstGame=false;
	}
    errori=0;

	//Reset Keyboard
	$("#keyboard").html('<div><span id="a" class="vowel">a</span><span id="b">b</span><span id="c">c</span><span id="d">d</span><span id="e" class="vowel">e</span><span id="f">f</span><span id="g">g</span><span id="h">h</span><span id="i" class="vowel">i</span><span id="j">j</span><span id="k">k</span><span id="l">l</span><span id="m">m</span></div><div><span id="n">n</span><span id="o" class="vowel">o</span><span id="p">p</span><span id="q">q</span><span id="r">r</span><span id="s">s</span><span id="t">t</span><span id="u" class="vowel">u</span><span id="v">v</span><span id="w">w</span><span id="x">x</span><span id="y">y</span><span id="z">z</span></div>');

	//Get random category
	id = $(this).attr("id");
	console.log(id);
	random = Math.floor(Math.random() * 30);
	console.log(random);
	word = categories[id][random];
	category = $(this).html();

	//Get HTML ready for user to start playing
	$("#infoSign").fadeIn();
	$("#initialInfo").fadeOut('fast');
	$("#game").fadeIn();
	$("#triesLeft").html("Tentativi rimasti: " + (triesLeft));
	//$("#difficulty").html("Word Dificulty: " + (random + 1) + "/5");
	$("title").html(category + " - Hangman");
	$("#category").html("<strong>Categoria:</strong> " + category);
	$("#word").html(replace(word, show));
	makeHangman(0);

	//Remove description box
	$(".static").removeClass("static");
	$("body").off('keypress').on('keypress', function(event) {
		if (!gameEnded) {
			var keyCode = (event.which) ? event.which : event.keyCode;
			if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) {
				$("#status").html('<div class="alert alert-warning" style="font-size: 2em;"><center><strong>Attenzione: Non ci sono numeri, caratteri speciali o di punteggiatura.</strong></center></div>');
			} else {
				playHangman(regexEscape(String.fromCharCode(event.which)));
			}
		}

	});

	$("#keyboard span").click(function() {
		if (!gameEnded) {
			playHangman($(this).html());
		}
	});
});

function correct_Move(){

	freezeClic=true;


console.log("L'utente ha eseguito una mossa corretta");
	//Pepper dice qualcosa

   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/hangmancorrectmove",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "Mossa corretta",
	        behaviour: "",
	        stress: "",
	     },
	     success: function (response, request) {
	        obj = JSON.parse(response.responseText);
	        alert(obj.Visit.VisitId);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
	    dataType: "json"
   	});

	setTimeout(()=> {
  		freezeClic=false
		}, 4500);

}

function wrong_Move(){
console.log("L'utente ha eseguito una mossa sbagliata");
	//Pepper dice qualcosa


	freezeClic=true;

	  if(stressLevel<5){
				stressLevel=stressLevel+1;
			}


   var behaviour=0;
    if(stressLevel>=2){
      behaviour=2;
    }else if(stressLevel==1){
      behaviour=1;
    }else{
      behaviour=0;
    }

    console.log("Behaviour---: " + behaviour);
	
   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/hangmanwrongmove",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "Mossa sbagliata",
	        behaviour: behaviour,
	        stress: stressLevel
	     },
	     success: function (response, request) {
	        obj = JSON.parse(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
	    dataType: "json"
   	});

	setTimeout(()=> {
   	freezeClic=false;
  }, 4500);
}

function first_wrong_move(){

	freezeClic = true;

console.log("L'utente ha eseguito una prima mossa sbagliata");
	//Pepper dice qualcosa
	
   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/hangmanwrongfirstmove",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "Mossa sbagliata"
	     },
	     success: function (response, request) {
	        obj = JSON.parse(response.responseText);
	    },
	    error: function (request, error) {
	        console.log(arguments);
	    },
	    dataType: "json"
   	});

   	setTimeout(()=> {
   	freezeClic=false;
  }, 4500);
}


function confirm_category(){
console.log("L'utente deve confermare");
	//Pepper dice qualcosa
	
   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/hangmanconfirm",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "Conferma categoria"
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

function about_to_lose(){
console.log("L'utente sta per perdere");
	//Pepper dice qualcosa
	
   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/hangmanabouttolose",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "L'utente sta per perdere"
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

function player_Win(){
	console.log("L'utente ha vinto");
	//Pepper dice qualcosa
	
   $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/winuser",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "L'utente ha vinto"
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

function player_loss(){
	console.log("L'utente ha perso");
	
    $.ajax({
    	type: "GET",
	     url: URL_SERVER_PEPPER+"/winpepper",
	     crossDomain: true,
	     xhrFields: { withCredentials: true },
	     data: {
	        type: "Pepper ha vinto"
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


function playHangman(char) {
	console.log("Blocco clic");
	flag=false;
	$("#status").html("");
	$("#" + char).css("background-color", "#23527c").css("color", "#EEE");
	newWord = replace(word, show + char);

	if (newWord === word) {
		//$("#status").html('<div class="alert alert-success"><strong>Hai vinto!</strong><span class="pull-right">Seleziona una categoria per giocare di nuovo</span></div>');
		$("#status").html('<div class="alert alert-success center" style="font-size: 2em;"><strong> Hai vinto! </strong>Seleziona una categoria per giocare di nuovo</div>');
		$("#keyboard span").css("background-color", "green");
		gameEnded = true;
		player_Win();
	} else if (newWord == $("#word").html()) {
		if (show.indexOf(char) > -1) {
			if (char === "a" || char === "e" || char === "i" || char === "o" || char === "u") {
				$("#status").html('<div class="alert alert-warning center" style="font-size: 2em;"><strong>Attenzione: Selezionare solo le consonanti </strong></span>');
			} else {
				$("#status").html('<div class="alert alert-warning center" style="font-size: 2em;"><strong>Attenzione: Lettera usata in precedenza</strong></span>');
			}
		} else {
			--triesLeft;
			makeHangman(triesLeft);
			if(triesLeft===1){
				about_to_lose();
				flag=true;
			}
			if (triesLeft === 0) {
				$("#status").html('<div class="alert alert-danger center" style="font-size: 2em;"><strong>Game Over!</strong></div>');
				$("#triesLeft").html("");
				newWord = newWord.split('');
				for (var i = 0; i <= newWord.length - 1; ++i) {
					if (newWord[i] === "_") {
						newWord[i] = '<span class="red">' + word[i] + '</span>';
					}
				}
				gameEnded = true;
				player_loss();
				makeHangman(5);
				$("#keyboard span").css("background-color", "red");
			} else {
				$("#status").html('<div class="alert alert-danger center" style="font-size: 2em;" ><strong>Ritenta</strong></div>');
				errori=errori+1;
				if(!flag){
					if(errori==1){
						first_wrong_move();
					}else{
						wrong_Move();
					}
				}
				makeHangman(Math.abs(5 - triesLeft));
				flag=false;
			}
		}
	} else {
		$("#status").html('<div class="alert alert-success center" style="font-size: 2em;"><strong>Grande!</strong></div>');
		correct_Move();
	}
	show = show + char;
	$("#word").html(newWord);
	$("#triesLeft").html("Tentativi rimasti: " + triesLeft);
	console.log("Sblocco");
}

//Define Functions to create hangman
function drawBottomGallow() {
	context.beginPath();
	context.moveTo(250, 300);
	context.lineTo(0, 300);
	context.lineTo(70, 300);
	context.stroke();
};

function drawTopGallow() {
	context.beginPath();
	context.lineTo(70, 300);
	context.lineTo(70, 10);
	context.lineTo(200, 10);
	context.lineTo(200, 50);
	context.stroke();
};

function drawHead() {
	context.beginPath();
	context.arc(200, 80, 30, 0, Math.PI * 2, true);
	context.closePath();
	context.lineWidth = 4;
	context.stroke();
};

function drawBody() {
	context.beginPath();
	context.moveTo(200, 110);
	context.lineTo(200, 225);
	context.stroke();
};

function drawHands() {
	context.beginPath();
	context.moveTo(200, 125);
	context.lineTo(150, 175);
	context.stroke();

	context.beginPath();
	context.moveTo(200, 125);
	context.lineTo(250, 175);
	context.stroke();
};

function drawFeet() {
	context.beginPath();
	context.moveTo(200, 225);
	context.lineTo(150, 275);
	context.stroke();

	context.beginPath();
	context.moveTo(200, 225);
	context.lineTo(250, 275);
	context.stroke();
};

function makeHangman(a) {
	hangOrder = [drawBottomGallow, drawTopGallow, drawHead, drawBody, drawHands, drawFeet];
	canvas = $('#hangman')[0];
	context = canvas.getContext("2d");
	canvas.width = canvas.width;
	context.strokeStyle = '#ffffff';
	context.lineWidth = 8;

	for (var i = 0; i <= a; ++i) {
		hangOrder[i]();
	}
};
