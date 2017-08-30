from flask import Flask, render_template, request
import random
from util import credentials, send_email

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def me():
    circles = ["About", "Career", "Education", "Interests", "Resume", "Contact"]
    images = random.sample(xrange(1, 40), 4)
    print images
    email = credentials.login['email']
    password = credentials.login['password']
    tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    if request.method == 'POST':
        name = request.json["name"]
        form_email = request.json["email"]
        message = request.json["message"]
        send_email.send(email, email, name + " (" + form_email + ") has sent you a message!", message, password)
    
    return render_template("me.html", circles=circles, images=images, tab=tab)

"""
@app.route("/status", methods=['GET', 'POST'])
def status():
    regions = ["all", "prod-app-ny", "prod-app-sj", "prod-app-ff", "prod-app-tk", "prod-app-sh"]
    components = ["all", "webapp", "msvcs"]
    msvcs = None
    webapp = None
    num_msvcs_up = None
    num_msvcs_down = None
    num_webapp_up = None
    num_webapp_down = None
    region = None 
    queue = None

    if request.method == 'POST':
        region = request.form["region"]
        component = request.form["component"]
        queue = 'queue' in request.form
        if region == "all":
            region = ",".join(regions[1:])
        params = ["python", "../status", "-V", "-H", "../production.hosts", region, component]
        if queue:
            params.append('-q')

        output = subprocess.Popen(params,
                                 stdout=subprocess.PIPE).communicate()[0]
        data = output.split("\n")[:-1]
        msvcs = [output_parser.get_msvc_data(entry) for entry in data if "MSVC" in entry]
        webapp = [output_parser.get_webapp_data(entry) for entry in data if "Internal" in entry]
        num_msvcs_up = len([msvc for msvc in msvcs if msvc["status"] == "UP"])
        num_msvcs_down = len(msvcs) - num_msvcs_up
        num_webapp_up = len([app for app in webapp if app["status"] == "NORMAL"])
        num_webapp_down = len(webapp) - num_webapp_up

    else:
        pass
    return render_template("status.html", active_page="status",
                           regions=regions, components=components, msvcs=msvcs,
                           webapp=webapp, num_msvcs_up=num_msvcs_up, num_msvcs_down=num_msvcs_down,
                           num_webapp_up=num_webapp_up, num_webapp_down=num_webapp_down,
                           region=region, queue=queue)
"""

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)


