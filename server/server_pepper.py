# coding=utf-8


from flask import Flask
import signal
from functools import update_wrapper
from flask import Flask, make_response, request, current_app, request
from flask_cors import CORS, cross_origin
import CONFIG

import qi
import socket

# Flask constructor takes the name of
# current module (__name__) as argument.
from PyBack.behaviour_angry import AngryBehaviour
from PyBack.behaviour_bored import BoredBehaviour
from PyBack.behaviour_happy import HappyBehaviour

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

behaviour = 0
CURRENT_IP=socket.gethostbyname(socket.gethostname())

# 0 = happy
# 1 = bored
# 2 = angry

class TestApp:
    def __init__(self, app, ip_address, port):
        self.session = qi.Session()
        self.session.connect("tcp://{0}:{1}".format(ip_address, port))
        app.start()

        self.animation_service = self.session.service("ALAnimationPlayer")
        self.tabletService = self.session.service("ALTabletService")
        self.tts_service = self.session.service("ALAnimatedSpeech")
        self.dialog_service = self.session.service("ALDialog")
        self.audio_device = self.session.service("ALAudioDevice")
        self.led_service = self.session.service("ALLeds")
        self.ba = self.session.service("ALBasicAwareness")
        self.tts_service = self.session.service("ALAnimatedSpeech")
        self.posture_service = self.session.service("ALRobotPosture")

        self.ba.setStimulusDetectionEnabled("People", False)
        self.ba.setEnabled(False)
        print(self.ba.isEnabled())
        print(self.ba.isRunning())

        self.voice_speed = 100
        self.voice_shape = 100

        # self.ba.setEnabled(False)  # Disabling the Basic Awareness

    def setPosture(self, posture):
        self.posture_service.goToPosture(posture, 3.0)

    def setVoice(self, speed, shape):
        self.voice_speed = speed
        self.voice_shape = shape

    def show_on_tablet(self, url):
        self.tabletService.showWebview(url)

    def test_say(self, sentence):
        self.tts_service.say(
            (sentence)
        )

    def quit(self):
        return self.tabletService.hideWebview()



    def animation_from_path(self, path):
        print(self.tabletService.version())
        self.animation_service.run(
            "animations/" + path, _async=True)

    def say(self, text, bodylanguage="contextual"):
        """Animated say text"""
        configuration = {"bodyLanguageMode": bodylanguage}
        self.tts_service.say(
            "\\RSPD={0}\\ \\VCT={1} \\{2}".format(self.voice_speed, self.voice_shape, text), configuration
        )

    def set_italian_language(self):
        self.dialog_service.setLanguage("Italian")
        print("Italian language was set up")




try:
    # Initialize qi framework.
    connection_url = "tcp://" + CONFIG.PEPPER_IP + ":" + CONFIG.PEPPER_PORT
    application = qi.Application(["CamDetection", "--qi-url=" + connection_url])
    print("Inizializzato")
except RuntimeError:
    print("Can't connect to Naoqi at ip \"" + CONFIG.PEPPER_IP  + "\" on port "
          + CONFIG.PEPPER_PORT + ".\n"
                             "Please check your script arguments. Run with -h option for help.")

pepper_angry = AngryBehaviour()
pepper_happy = HappyBehaviour()
pepper_bored = BoredBehaviour()
run_app = TestApp(application, CONFIG.PEPPER_IP, CONFIG.PEPPER_PORT)
run_app.set_italian_language()


#run_app.show_on_tablet("http://192.168.4.48:5000")

@app.route('/')
def hello_world():
    return 'Hello World'


@app.route('/survey', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def survey():
    print("Modificando comportamento")
    global behaviour
    behaviour = int(request.args.get('type'))
    setStress(behaviour)
    print("Comportamento modificando in: ", behaviour)
    return str(behaviour)


@app.route('/hello', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hello():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hello()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hello()
    else:
        path, text, speed, shape = pepper_angry.hello()

    # print(request.args.get('value'))
    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/winuser', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def winuser():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.winuser()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.winuser()
    else:
        path, text, speed, shape = pepper_angry.winuser()

    print("prova")
    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/winpepper', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def winpepper():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.winpepper()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.winpepper()
    else:
        path, text, speed, shape = pepper_angry.winpepper()

    print("prova")
    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/hangmancorrectmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hangmancorrectmove():

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmancorrectmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmancorrectmove()
    else:
        path, text, speed, shape = pepper_angry.hangmancorrectmove()

    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)




@app.route('/memocorrectmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def memocorrectmove():

    global behaviour
    print("Entrooo")
    behaviour = int(request.args.get('behaviour'))
    stress = int(request.args.get('stress'))
    setStress(stress)

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmancorrectmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmancorrectmove()
    else:
        path, text, speed, shape = pepper_angry.hangmancorrectmove()

    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/hangmanwrongmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hangmanwrongmove():
    global behaviour
    behaviour = int(request.args.get('behaviour'))
    stress = int(request.args.get('stress'))
    setStress(stress)

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmanwrongmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmanwrongmove()
    else:
        path, text, speed, shape = pepper_angry.hangmanwrongmove()

    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/memorywrongmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def memorywrongmove():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmanwrongmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmanwrongmove()
    else:
        path, text, speed, shape = pepper_angry.hangmanwrongmove()

    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/hangmanconfirm', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hangmanconfirm():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmanconfirm()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmanconfirm()
    else:
        path, text, speed, shape = pepper_angry.hangmanconfirm()

    run_app.set_italian_language()
    run_app.setVoice(speed, shape)
    
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/hangmanabouttolose', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hangmanabouttolose():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmanabouttolose()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmanabouttolose()
    else:
        path, text, speed, shape = pepper_angry.hangmanabouttolose()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/tristellmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def tristellmove():
    try:
        sentence = str(request.args.get('type'))
    except:
        return
    if behaviour == 0:
        speed, shape = pepper_happy.tristellmove()
    elif behaviour == 1:
        speed, shape = pepper_bored.tristellmove()
    else:
        speed, shape = pepper_angry.tristellmove()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.say(sentence)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/trischeat', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def trischeat():
    global behaviour
    behaviour = int(request.args.get('behaviour'))
    stress = int(request.args.get('stress'))
    setStress(stress)

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.trischeat()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.trischeat()
    else:
        path, text, speed, shape = pepper_angry.trischeat()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/tie', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def tie():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.tie()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.tie()
    else:
        path, text, speed, shape = pepper_angry.tie()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/connect4tredifila', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def connect4tredifila():
    global behaviour
    behaviour = int(request.args.get('behaviour'))

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.connect4tredifila()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.connect4tredifila()
    else:
        path, text, speed, shape = pepper_angry.connect4tredifila()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/peppercorrectmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def peppercorrectmove():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.peppercorrectmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.peppercorrectmove()
    else:
        path, text, speed, shape = pepper_angry.peppercorrectmove()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/pepperwrongmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def pepperwrongmove():
    global behaviour
    behaviour = int(request.args.get('behaviour'))
    stress = int(request.args.get('stress'))
    setStress(stress)

    if behaviour == 0:
        path, text, speed, shape = pepper_happy.pepperwrongmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.pepperwrongmove()
    else:
        path, text, speed, shape = pepper_angry.pepperwrongmove()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/getsolution', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def getsolution():
    stress = int(request.args.get('stress'))
    setStress(stress)

    if behaviour == 2:
        path, text, speed, shape = pepper_angry.getsolution()
    else:
        print('Pepper non è arrabbiato')

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/stopgame', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def stopgame():
    if behaviour == 2:
        path, text, speed, shape = pepper_angry.stopgame()
    else:
        print('Pepper non è arrabbiato')

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)


@app.route('/hangmanwrongfirstmove', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def hangmanwrongfirstmove():
    if behaviour == 0:
        path, text, speed, shape = pepper_happy.hangmanwrongmove()
    elif behaviour == 1:
        path, text, speed, shape = pepper_bored.hangmanwrongmove()
    else:
        path, text, speed, shape = pepper_angry.hangmanwrongmove()

    run_app.set_italian_language()
    
    run_app.setVoice(speed, shape)
    run_app.animation_from_path(path)
    run_app.say(text)

    run_app.setPosture("Stand")

    return str(behaviour)

@app.route('/reset', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def reset():

    baseUrl = 'http://{0}:{1}/static/neutral.jpg'.format(CURRENT_IP,CONFIG.PORT_CLIENT)
    print(baseUrl)
    run_app.tabletService.showImage(baseUrl)
    return str(behaviour)



@app.route('/quit', methods=['GET'])
@cross_origin(origin=CURRENT_IP, headers=['Content- Type', 'Authorization'])
def quit():
    
    return str(run_app.quit())






def setStress(stress):
    print("Stress", stress)
    baseUrl = 'http://{0}:{1}/static/Stress_'.format(CURRENT_IP,CONFIG.PORT_CLIENT)
    extension = '.jpg'
    finalUrl = baseUrl + str(stress)+extension
    print(finalUrl)
    run_app.tabletService.showImage(finalUrl)


# main driver function
if __name__ == '__main__':
    # signal.signal(signal.SIGINT, (lambda signum, frame: run_app.quit()))
    # signal.signal(signal.SIGTERM, (lambda signum, frame: run_app.quit()))

    app.run(host=CURRENT_IP, port=CONFIG.PORT_SERVER)
