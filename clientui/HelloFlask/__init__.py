from flask import Flask
import CONFIG
import socket
app = Flask(__name__)

from datetime import datetime
from flask import render_template, request

SERVER_IP=socket.gethostbyname(socket.gethostname())
SERVER_PORT=CONFIG.PORT_SERVER
SERVER_URL= "http://{0}:{1}".format(SERVER_IP, SERVER_PORT)

@app.route('/')
@app.route('/home')
def home():
    now = datetime.now()
    formatted_now = now.strftime("%A, %d %B, %Y at %X")

    return render_template(
        "index.html",
        title = "Hello Flask",
        message = "Hello, Flask!",
        content = " on " + formatted_now, server_url=SERVER_URL)

@app.route('/games')
def get_menu():
    return render_template(
        "game_selection.html",
        title="Menu", server_url=SERVER_URL)

@app.route('/memo')
def get_memo():
    return render_template(
        "memo.html",
        title="memo", server_url=SERVER_URL)

@app.route('/connect4')
def get_connect4():
    return render_template(
        "connect4.html",
        title="connect4", server_url=SERVER_URL)

@app.route('/index')
def get_index():
    return render_template(
        "index.html",
        title="index", server_url=SERVER_URL)

@app.route('/tris')
def get_tris():
    return render_template(
        "tris.html",
        title="tris", server_url=SERVER_URL)

@app.route('/hangman')
def get_hangman():
    return render_template(
        "hangman.html",
        title="hangman", server_url=SERVER_URL)