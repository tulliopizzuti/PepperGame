# PepperGame

### Python 2.7 32bit

```
conda create -n PepperGame
conda activate PepperGame
conda config --env --set subdir win-32
conda install python=2.7
```

### NAOqi SDK 2.5.10

https://community-static.aldebaran.com/resources/2.5.10/Python%20SDK/pynaoqi-python2.7-2.5.7.1-win32-vs2013.zip

Create environment variable PYTHONPATH=path\to\python-sdk\lib


### Choregraphe 2.5.10

https://community-static.aldebaran.com/resources/2.5.10/Choregraphe/choregraphe-suite-2.5.10.7-win32-setup.exe

### clientui

```
conda install flask
```


### server

```
conda install flask-cors=3.0.8
```

### CONFIG.py

Set PEPPER_IP and the different ports...


