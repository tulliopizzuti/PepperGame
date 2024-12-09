# coding=utf-8
import qi
import numpy


class BoredBehaviour:
    def __init__(self):
        print("Annoiato")

    ###################################################################################################################

    # Generali
    # questa chiamata viene attivata nel momento in cui c'è un pareggio in un gioco qualsiasi
    def tie(self):
        text = ['Abbiamo pareggiato! Che noia!',
                'Finalmente!\\pau=200\\ Torno a dormire dopo questa perdita di tempo!',
                'Uffa, abbiamo pareggiato!\\pau=200\\ Avrei potuto fare altro!',
                'Davvero non ha vinto nessuno? Che perdita di tempo!',
                'Non ha vinto nessuno! Che partita noiosa!']
        behavior = ["Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8", ]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente vince la partita in un qualsiasi gioco
    def winuser(self):
        text = ['Molto bene, hai vinto! Non vedo l\'ora di tornare a riposare!',
                'Bella partita! Ora devo ricaricare le energie!',
                'Congratulazioni, hai vinto! Finalmente abbiamo finito!',
                'Finalmente! Ce ne hai messo di tempo per vincere!',
                'Complimenti per la vittoria! Posso riposarmi adesso?']
        behavior = ["Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Emotions/Positive/Hysterical_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente perde la partita in un qualsiasi gioco
    def winpepper(self):
        text = ['Mi dispiace, hai perso! Almeno la partita è terminata!',
                'Hai perso, ma non ho abbastanza energie per essere triste!',
                'Fine della partita, hai perso! Ora torno a riposare',
                'Un\'altra partita noiosa, mai nessuno che riesca a stimolarmi!',
                'Nulla di entusiasmante, come sempre una partita scontata!']
        behavior = ["Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Emotions/Positive/Hysterical_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente avvia uno dei giochi disponibili
    def hello(self):
        greeting = ['Ciao, iniziamo a giocare, anche se sono stanco!',
                    'Sicuro di voler iniziare? Oggi sono proprio annoiato!',
                    'Uffa, dobbiamo giocare per forza?',
                    'Io non volevo essere qui oggi, però se vuoi giochiamo',
                    'Non ho tanta voglia, ma se proprio vuoi\\pau=100\\ facciamo una partita!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5", "Stand/Gestures/Excited_1",
                    "Stand/Gestures/Embarrassed_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(greeting), voice_speed, voice_shape

    ###################################################################################################################
    # Impiccato

    # questa chiamata viene attivata nel momento in cui l'utente sceglie una categoria nel gioco dell'impiccato e Pepper chiede se è sicuro della scelta fatta
    def hangmanconfirm(self):
        text = ['Vuoi cambiare categoria? Ti consiglio di non farlo, risparmiamo tempo!',
                'Ora potresti cambiare la categoria, ma vorrei terminare presto!',
                'Se vuoi puoi cambiare la categoria, però sbrìgati!',
                'Per caso vorresti cambiare categoria? Io mi annoio!',
                'Sei sicuro della scelta? Cambia ora o mai più!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5", "Stand/Gestures/Excited_1",
                    "Stand/Gestures/Embarrassed_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanwrongmove(self):
        text = ['Se continui a sbagliare non finiremo più!',
                'Ci vuole del coraggio a fare un errore del genere!',
                'Forse se termini ora risparmiamo entrambi del tempo!',
                'Uffa! Se continui così non finiremo mai questa partita!',
                'Mossa sbagliata! Tra poco mi addormento!',
                'Se non riesci a indovinare \\pau=100\\puoi sempre arrenderti']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5", "Stand/Gestures/Excited_1",
                    "Stand/Gestures/Embarrassed_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmancorrectmove(self):
        text = ['Grande! Continua così e potrò tornare a riposare!',
                'Continua così! Non vedo l\'ora di finire!',
                'Finalmente! Forse prima o poi questa partita finirà!',
                'Molto bene! Di questo passo andrò a riposarmi molto presto!',
                'Bravo! Però sbrìgati, non ho molte energie per continuare!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5", "Stand/Gestures/Excited_1",
                    "Stand/Gestures/Embarrassed_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanabouttolose(self):
        text = ['Ti resta ancora un tentativo! Sbrighiamoci!',
                'Attento, ti resta solo un tentativo! Cerchiamo di terminare!',
                'Sono stanco, ma ti resta ancora un ultimo tentativo! Forza!',
                'Tu stai per perdere\\pau=100\\ e io sto esaurendo le mie energie!',
                'Sei al tuo ultimo tentativo! Ti sbrighi a perdere?']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5", "Stand/Gestures/Excited_1",
                    "Stand/Gestures/Embarrassed_1"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Tris

    def tristellmove(self):
        voice_speed = 70
        voice_shape = 20
        

        return voice_speed, voice_shape

    def trischeat(self):
        text = ['Perché imbrogli? Già non ho voglia!',
                'Barare è l\'unico modo che hai per vincere?',
                'Se imbrogli\\pau=100\\ mi annoio soltanto di più!',
                'Perché imbrogliare? Ci tieni a farmi perdere tempo?',
                'Non solo mi fai perdere tempo, devi anche imbrogliare?']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2",
                    "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8", ]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Forza 4

    def connect4tredifila(self):
        text = ['Bravo, finisci presto che sono già stanco!',
                'La tua vittoria si sta avvicinando!',
                'Tu stai per vincere, io per spegnermi!',
                'Ora dovrebbe essere più semplice finire questa partita!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2",
                    "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8"]
        voice_speed = 70
        voice_shape = 65
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Memo

    def peppercorrectmove(self):
        text = ['Come al solito, nulla di così difficile!',
                'Mi sto annoiando per quanto è semplice questo gioco!',
                'Tutto così scontato, nulla di diverso dal solito',
                'Che noia, è così semplice indovinare!',
                'Giocare così è davvero poco avvincente!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2",
                    "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8"]
        voice_speed = 70
        voice_shape = 65
        


        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def pepperwrongmove(self):
        text = ['Uffa, oggi non è proprio giornata!',
                'Che noia, non mi va proprio di impegnarmi!',
                'Ho perso l\'interesse! Sono stanco!',
                'Ho sbagliato! Mi sto impegnando davvero poco!',
                'Errore mio! La stanchezza fa brutti scherzi!']
        behavior = ["Stand/Emotions/Negative/Bored_1", "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2",
                    "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8"]
        voice_speed = 70
        voice_shape = 65
        


        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # http://doc.aldebaran.com/2-5/naoqi/motion/alanimationplayer-advanced.html
