""" Flask app file to run my website! """

import sys
import random
from flask import Flask, render_template, request, redirect, make_response
from util import send_email
import requests

app = Flask(__name__)
EMAIL = 'mcookhome@gmail.com'
print(sys.version)

@app.route("/", methods=['GET', 'POST'])
def me():
    """ Route to define my home page, handling get and post requests """

    circles = ["About", "Career", "Education", "Skills", "Interests", "Contact"]
    images = random.sample(range(1, 40), 4)
    tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    if request.method == 'POST':
        name = request.json["name"]
        form_email = request.json["email"]
        message = request.json["message"]
        subject = name + " (" + form_email + ") has sent you a message!"
        sent = send_email.send_message(EMAIL, EMAIL, subject, message)

    return render_template("me.html", circles=circles, images=images, tab=tab)

@app.route("/billboard-to-spotify", methods=['GET', 'POST'])
def bts():
    """ Route to define my billboard-to-spotify page, handling get and post requests """
    
    if 'access_token' not in request.cookies:
        auth_url = requests.get("http://mcook.me:8080/v1/authorization")
        return redirect(auth_url.text)
    elif request.method == 'POST':
        payload = {}
        payload["date"] = request.json["date"]
        payload["chart"] = request.json["chart"]
        payload["access_token"] = request.cookies.get('access_token')
        print >>sys.stderr, str(payload)
        playlist_url = requests.post("http://mcook.me:8080/v1/bts", data=payload)
        print >>sys.stderr, str(playlist_url)
        return(playlist_url.text)
    else:
        return render_template("bts.html")
        
    
@app.route("/billboard-to-spotify/callback", methods=['GET', 'POST'])
def btscallback():
    """ Route to define my billboard-to-spotify page, handling get and post requests """
    auth_token = request.args['code']
    access_token = requests.post("http://mcook.me:8080/v1/gain-access", data={"auth_token":auth_token})
    response = make_response(redirect('/billboard-to-spotify'))
    print >>sys.stderr, str(access_token.text)
    response.set_cookie('access_token', access_token.text, max_age=60*60)
    return response
    
    
if __name__ == "__main__":
    app.run(debug=True)
