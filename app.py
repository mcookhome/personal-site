""" Flask app file to run my website! """

import sys
import random
from flask import Flask, render_template, request, redirect, make_response
from util import credentials, send_email
from urllib import quote
import requests

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def me():
    """ Route to define my home page, handling get and post requests """

    circles = ["About", "Career", "Education", "Skills", "Interests", "Contact"]
    images = random.sample(xrange(1, 40), 4)
    email = credentials.login['email']
    password = credentials.login['password']
    tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    if request.method == 'POST':
        name = request.json["name"]
        form_email = request.json["email"]
        message = request.json["message"]
        send_email.send(email, email, name + " (" + form_email + ") has sent you a message!",
                        message, password)

    return render_template("me.html", circles=circles, images=images, tab=tab)

@app.route("/billboard-to-spotify", methods=['GET', 'POST'])
def bts():
    """ Route to define my billboard-to-spotify page, handling get and post requests """
    
    if 'auth_token' not in request.cookies:
        auth_url = requests.get("http://mcook.me:8080/v1/authorization")
        return redirect(auth_url.text)
    elif request.method == 'POST':
        payload = {}
        payload["date"] = request.json["date"]
        payload["chart"] = request.json["chart"]
        payload["auth_token"] = request.cookies.get('auth_token')
        print >>sys.stderr, str(payload)
        requests.post("http://mcook.me:8080/v1/bts", data=payload)
    else:
        return render_template("bts.html")
        
    
@app.route("/billboard-to-spotify/callback", methods=['GET', 'POST'])
def btscallback():
    """ Route to define my billboard-to-spotify page, handling get and post requests """
    auth_token = request.args['code']
    response = make_response(redirect('/billboard-to-spotify'))
    response.set_cookie('auth_token', auth_token, max_age=60*60)
    return response
    
    
if __name__ == "__main__":
    app.run(debug=True)
