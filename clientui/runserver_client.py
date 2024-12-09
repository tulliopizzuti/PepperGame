from HelloFlask import app
import CONFIG as CONFIG


import socket

if __name__ == '__main__':
    app.run(socket.gethostbyname(socket.gethostname()), CONFIG.PORT_CLIENT)