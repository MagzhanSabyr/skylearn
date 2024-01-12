from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) 

@app.route("/")
def index():
    with open("data.json", "r") as f:
        return json.load(f)


if __name__ == "__main__":
    app.run(debug = True)





