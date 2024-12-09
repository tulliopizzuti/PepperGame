# coding=utf-8
import qi
import numpy


class HappyBehaviour:
    def __init__(self):
        print("Felice")
        # self.session = qi.Session()
        # self.animation_service = self.session.service("ALAnimationPlayer")

    ###################################################################################################################
    # Generali
    # questa chiamata viene attivata nel momento in cui c'è un pareggio in un gioco qualsiasi
    def tie(self):
        text = ['Dai, mi sono divertito lo stesso! Giochiamo ancora insieme!',
                'Peccato, nessuno dei due ha vinto! Facciamo un\'altra partita',
                'Dai, è destino!\\pau=200\\ Dobbiamo fare un\'altra partita!',
                'Che partita avvincente! Ti va di farne un\' altra?',
                'Pareggio! Ti va di giocare ancora?']
        behavior = ["Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente vince la partita in un qualsiasi gioco
    def winuser(self):
        text = ['Complimenti! Hai vinto!',
                'Bravissimo! Non vedo l\'ora di giocare ancora con te!',
                'Che bravo, mi sono divertito! Giochiamo ancora!',
                'Vittoria! Sei stato fortissimo, complimenti!',
                'Che bella partita! Giochiamo ancora insieme!']
        behavior = ["Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Emotions/Positive/Hysterical_1"]

        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente perde la partita in un qualsiasi gioco
    def winpepper(self):
        text = ['Oh no, hai perso! Mi dispiace!',
                'Spero tu ti sia divertito!\\pau=100\\Ti va di giocare di nuovo?'
                'Dai, può capitare. Succede anche ai migliori!',
                'Hai perso, ma non è mica la fine del mondo!',
                'Anche se hai perso, è stata una bella partita!']
        behavior = ["Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Emotions/Positive/Hysterical_1"]

        voice_speed = 100
        voice_shape = 100
        
        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente avvia uno dei giochi disponibili
    def hello(self):
        greeting = ['Ciao, piacere di conoscerti!\\pau=150\\ Iniziamo a giocare?',
                    'Non vedo l\'ora di giocare con te!',
                    'Che vinca il migliore!',
                    'Dai! Giochiamo insieme!',
                    'É ora di divertirsi insieme']
        behavior = ["Stand/Emotions/Positive/Hysterical_1", "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8", "Stand/Gestures/No_9"]

        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(greeting), voice_speed, voice_shape

    ###################################################################################################################
    # Impiccato

    def hangmanconfirm(self):
        text = ['Bella questa categoria!',
                'Sono sicuro che riuscirai a vincere!',
                'Hai scelto una categoria molto interessante!',
                'Bella scelta! Buona fortuna!']
        behavior = ["Stand/Gestures/No_1", "Stand/Gestures/No_2", "Stand/Gestures/Please_1", "Stand/Gestures/Explain_1",
                    "Stand/Gestures/Explain_10",
                    "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8", "Stand/Gestures/No_9"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanwrongmove(self):
        text = ['Peccato! Sarai più fortunato!',
                'Non preoccuparti, la prossima volta andrà meglio!',
                'Non mollare! Ce la puoi fare!',
                'Fa niente! Può capitare anche ai migliori!',
                'Tranquillo, anche se hai sbagliato, credo in te!']
        behavior = ["Stand/Gestures/No_1", "Stand/Gestures/No_2", "Stand/Gestures/Please_1", "Stand/Gestures/Explain_1",
                    "Stand/Gestures/Explain_10",
                    "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Embarrassed_1", "Stand/Gestures/Desperate_1",
                    "Stand/Gestures/Desperate_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmancorrectmove(self):
        text = ['Complimenti! Hai indovinato!',
                'Sei bravissimo! Continua così!',
                'Ottimo! Non mollare!',
                'Bravo! Sapevo che avresti fatto la mossa giusta!',
                'Perfetto! Sotto con la prossima!',
                'Molto bene! Hai indovinato!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Please_1",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanabouttolose(self):
        text = ['Oh no! Hai quasi perso!',
                'Non mollare! Non è ancora finita!',
                'Non è detta l\'ultima parola!',
                'Non è ancora finita! Non ti arrendere!',
                'Dai, puoi sempre recuperare! Non ti abbattere!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4",
                    "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Tris

    def tristellmove(self):
        voice_speed = 100
        voice_shape = 100
        

        return voice_speed, voice_shape

    def trischeat(self):
        text = ['Ci stavamo divertendo! Perchè devi barare?',
                'Non è giusto! Gioca lealmente, altrimenti non mi diverto più!',
                'Perchè imbrogli? Pensi che io sia stupido?',
                'Non fare l\'imbroglione! Gioca onestamente!',
                'Se continui a imbrogliare non gioco più!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4",
                    "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Forza 4

    def connect4tredifila(self):
        text = ['Sei davvero bravo in questo gioco!',
                'Oh no, stai per battermi! Forse sei più bravo di me!',
                'Come hai fatto?\\pau=200\\ Complimenti, hai quasi vinto!',
                'Diamine, stai per vincere! Non pensavo tu fossi così bravo!',
                'Ne manca solo uno!\\pau=200\\ È davvero una bella partita!']
        behavior = ["Stand/Gestures/Explain_1",
                    "Stand/Gestures/Explain_10",
                    "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8", ]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape \
            ###################################################################################################################

    # Memo
    def peppercorrectmove(self):
        text = ['Ho una memoria d\'acciaio!',
                'Evviva! Spero di indovinare ancora!',
                'Che bello! Ho indovinato!',
                'Ce l\'ho fatta! Lo sapevo di essere bravo!',
                'Evviva! Sento la vittoria in tasca!']
        behavior = ["Stand/Gestures/Explain_1",
                    "Stand/Gestures/Explain_10",
                    "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def pepperwrongmove(self):
        text = ['Ho sbagliato! Non sono bravo quanto te!',
                'Dai, la prossima volta sarò più attento!',
                'Ho bisogno di riflettere di più prima di giocare!',
                'Uffa! Devo impegnarmi di più se voglio vincere!',
                'Oh no! Che ho combinato!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4",
                    "Stand/Gestures/Desperate_5", "Stand/Gestures/Desperate_2"]
        voice_speed = 100
        voice_shape = 100
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # http://doc.aldebaran.com/2-5/naoqi/motion/alanimationplayer-advanced.html
