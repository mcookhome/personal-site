""" Flask app file to run my website! """

import random
from flask import Flask, render_template, request
from util import credentials, send_email

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

if __name__ == "__main__":
    app.run(debug=True)
