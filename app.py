from flask import *

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["JSON_SORT_KEYS"] = False

# Pages


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.debug = True
    app.run(port=5050)
