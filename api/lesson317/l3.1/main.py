from flask import Flask, render_template, redirect, request, url_for
import functions as f 
import random 

app = Flask(__name__) 

@app.route("/")
def index():
    profiles = f.get_profiles_from_file()
    
    for profile in profiles:
        print(profile.get("id"))

    return render_template("index.html" , profiles = profiles)

@app.route("/details/<int:id>")
def details(id):
    profiles = f.get_profiles_from_file()

    for profile in profiles:
        if(profile.get("id") == id):
            return render_template("details.html", profile = profile )
    return redirect(url_for("error"))


@app.route("/create", methods = ["GET", "POST"])
def create():
    if request.method == "GET":
        return render_template("create.html")

    new_user = {
        "id": random.randrange(2,200000),
        "login": request.form["login"],
        "account": request.form["account"]
    }

    profiles = f.get_profiles_from_file()   
    profiles.append(new_user)
    f.set_profiles_to_file(profiles)

    return redirect(url_for("index"))




@app.route("/error")
def error():
    return render_template("error.html")



if __name__ == '__main__':
    app.run(debug = True)
