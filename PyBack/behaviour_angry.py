# coding=utf-8
import qi
import numpy


class AngryBehaviour:
    def __init__(self):
        print("Arrabbiato")

    ###################################################################################################################
    # Generali

    # questa chiamata viene attivata nel momento in cui c'è un pareggio in un gioco qualsiasi
    def tie(self):
        text = ['Pareggio! La prossima volta non sarai così fortunato!',
                'Mannaggia! Però ho giocato meglio io!',
                'Ci sono andato leggero con te stavolta!',
                'Anche se abbiamo pareggiato, resto più bravo io!',
                'Non è giusto! Dovevo vincere io!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Please_1",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente vince la partita in un qualsiasi gioco
    def winuser(self):
        text = ['Uffa! Alla fine sei riuscito a vincere!',
                'Secondo me hai imbrogliato! Nessuno può battermi!',
                'Questa volta hai vinto! La prossima non sarai così fortunato!',
                'Mannaggia, hai vinto! La prossima volta non ti faccio giocare!',
                'Pensi di essere più bravo?\\pau=200\\ Rigiochiamo, ti dimostro il contrario!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Desperate_3",
                    "Stand/Gestures/Desperate_4"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente perde la partita in un qualsiasi gioco
    def winpepper(self):
        text = ['Sapevo che non avresti vinto!',
                'Mi dispiace, ma questo gioco non è per tutti!',
                'Come immaginavo! Non sei molto intelligente!',
                'Bisogna essere intelligenti per giocare a questo gioco!',
                'Hai tentato e hai fallito! Cosa ti aspettavi?']
        behavior = ["Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Emotions/Positive/Hysterical_1"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui l'utente avvia uno dei giochi disponibili
    def hello(self):
        text = ['Ti avviso, sono proprio arrabbiato oggi!',
                'Iniziamo, anche se hai poche speranze di vincere!',
                'Sei proprio sicuro di voler giocare con me?',
                'Non penso ti convenga giocare con me oggi!',
                'Sei abbastanza coraggioso per giocare?']
        behavior = ["Stand/Emotions/Positive/Hysterical_1", "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8", "Stand/Gestures/No_9"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Impiccato

    def hangmanconfirm(self):
        text = ['Sei sicuro di questa scelta? Secondo me non riesci a indovinare!',
                'Sei consapevole che devi avere qualche conoscenza per rispondere?',
                'Secondo me non sei pronto per questa categoria! \\pau=200\\ Ricorda che puoi cambiarla!',
                'Sei proprio sicuro di voler fare una figuraccia davanti a tutti?',
                'Stammi a sentire, cambia categoria adesso che sei ancora in tempo!',
                'Hai ancora la possibilità di cambiare categoria. Io la sfrutterei!']
        behavior = ["Stand/Gestures/No_1", "Stand/Gestures/No_2", "Stand/Gestures/Please_1", "Stand/Gestures/Explain_1",
                    "Stand/Gestures/Explain_10",
                    "Stand/Gestures/Explain_11", "Stand/Gestures/Explain_2", "Stand/Gestures/Explain_3",
                    "Stand/Gestures/Explain_4", "Stand/Gestures/Explain_5",
                    "Stand/Gestures/Explain_6", "Stand/Gestures/Explain_7", "Stand/Gestures/Explain_8",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8", "Stand/Gestures/No_9"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanwrongmove(self):
        text = ['Forse non hai capito. Il tuo scopo dovrebbe essere quello di vincere!',
                'Complimenti! Hai fatto un altro errore!',
                'Benissimo! Un altro che non ha capito come si gioca!',
                'Forse questo gioco non fa per te!',
                'Com\'è possibile che tu abbia sbagliato ancora?',
                'Penso che non ce la farai mai a vincere!',
                'Secondo me puoi impegnarti di più!',
                'Spero che non siano tutti come te oggi!',
                'Prima ho visto una gallina\\pau=50\\ che risolveva lo stesso problema!']
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
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmancorrectmove(self):
        text = ['Mannaggia, hai indovinato! Non me lo aspettavo!',
                'Addirittura! Non pensavo potessi fare mosse corrette!',
                'Complimenti!\\pau=150\\ Quando ti applichi\\pau=60\\ non sei così male!',
                'Perfetto!\\pau=200\\ Forse oggi qualcuno riesce a vincere!',
                'Alla fine ce l\'hai fatta a capire lo scopo del gioco!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Please_1",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def hangmanabouttolose(self):
        text = ['Hai un ultimo tentativo! Speriamo che perdi!',
                'La sconfitta per te si avvicina! Finalmente!',
                'Ultima possibilità per dimostrare che non sei un perdente!',
                'Tic Tac, Tic Tac! La sconfitta si sta avvicinando!',
                'Hai un\'ultima chance per dimostrare di essere più intelligente di così']
        behavior = ["Stand/Gestures/Excited_1", 'Stand/Gestures/Enthusiastic_4', 'Stand/Gestures/Enthusiastic_5',
                    'Stand/Emotions/Positive/Hysterical_1', "Stand/Emotions/Positive/Happy_4"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Tris

    def tristellmove(self):
        voice_speed = 100
        voice_shape = 20
        

        return voice_speed, voice_shape

    def trischeat(self):
        text = ['Ehi!\\pau=200\\ Vuoi smetterla di imbrogliare?',
                'Credi che io sia stupido?\\pau=200\\ Me ne accorgo se imbrogli!',
                'Non azzardarti a imbrogliare, altrimenti con te non gioco più!',
                'Non sai vincere lealmente?',
                'Se non la smetti di imbrogliare, smetto di giocare con te!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Please_1",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    # questa chiamata viene attivata nel momento in cui pepper ha raggiunto lo stress massimo e termina il gioco
    def stopgame(self):
        text = ['Basta! Adesso mi sono arrabbiato troppo!',
                'Non ce la faccio più a giocare con te! Basta!',
                'Chiudiamo qui la partita! Mi hai davvero stancato!',
                'Ora mi hai stancato! Non mi va più di giocare!']
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
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Forza 4

    def connect4tredifila(self):
        text = ['Non è detta l\'ultima parola! Posso ancora ribaltare tutto!',
                'Non ci provare! Tanto lo sai che vinco io!',
                'Tranquillo, non vincerai tanto facilmente!',
                'La tua vittoria non è tra le opzioni disponibili oggi!',
                'Ne manca ancora uno! Non cantare vittoria!']
        behavior = ["Stand/Gestures/Desperate_1", "Stand/Gestures/Desperate_2", "Stand/Gestures/Please_1",
                    "Stand/Gestures/No_3", "Stand/Gestures/No_8",
                    "Stand/Gestures/No_9", "Stand/Gestures/Enthusiastic_4", "Stand/Gestures/Enthusiastic_5",
                    "Stand/Gestures/No_1", "Stand/Gestures/No_2",
                    "Stand/Gestures/Desperate_3", "Stand/Gestures/Desperate_4", "Stand/Gestures/Desperate_5"]
        voice_speed = 100
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    ###################################################################################################################
    # Memo

    def peppercorrectmove(self):
        text = ['Ecco! Ti insegno come giocare se vuoi!',
                'Visto? Devo ancora farti capire chi comanda?',
                'Dai, non piangere! Sono solo più forte!',
                'Beccati questa! Guarda come sono bravo!',
                'Ecco qua! Sono troppo forte!']
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
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def pepperwrongmove(self):
        text = ['Non ci credo! Riesco a essere peggio di te!',
                'A volte capita anche ai migliori di sbagliare!',
                'Uffa! Ho avuto una piccola svista! Non ricapiterà!',
                'Non penserai di poter vincere, vero?',
                'Sei così scarso che mi stai contagiando!']
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
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

    def getsolution(self):
        text = ['Basta, mi sono stancato! Ti faccio vedere io come si fa!',
                'Se non ce la fai tu, allora vuol dire che devo pensarci io!',
                'Basta! Ti faccio vedere io come si risolve!',
                'Mi hai fatto perdere anche troppo tempo! Guarda e impara!',
                'Ho capito! Devo fare tutto da solo!']
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
        voice_shape = 20
        

        return numpy.random.choice(behavior), numpy.random.choice(text), voice_speed, voice_shape

# http://doc.aldebaran.com/2-5/naoqi/motion/alanimationplayer-advanced.html
