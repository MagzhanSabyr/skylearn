from flask import Flask , request , jsonify
import random
from functions import jsonify_response, get_profiles_from_file, set_profiles_to_file 

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/profiles')
def get_profiles():
    result = get_profiles_from_file()
    return jsonify_response(result)

@app.route('/profile/<int:id>')
def get_profile_by_id(id):
    profiles = get_profiles_from_file()
    for profile in profiles:
        if profile.get("id") == id:
            return jsonify_response(profile)
    return jsonify_response(None, message=f"There is no profile with ID: {id}")

@app.route('/profile/create', methods = ["POST"])
def create_profile():
    profiles = get_profiles_from_file()
    login = request.form["login"]
    for profile in profiles:
        if profile.get("login") == login:
            return jsonify_response(None, message= "Login existed, creation has failed.")
    
    name = request.form["name"]

    created_profile = {
        "id": random.randrange(1, 100_000),
        "name": name,
        "login": login
    }
    profiles.append(created_profile)
    
    set_profiles_to_file(profiles)
    return jsonify_response( created_profile)
    

@app.route('/profile/delete/<int:id>', methods = ["GET", "POST"])
def delete_profile(id):
    pass

@app.route('/profile/update/<int:id>', methods = ["POST"])
def update_profile(id):
    profiles = get_profiles_from_file()
    for profile in profiles:
        if profile.get("id") == id:
            for key in request.form:
                profile[key] = request.form[key]
            return jsonify_response(profile)
    return jsonify_response(None, message=f"Can't find profile with ID: {id}")

@app.route("/update/<int:id>", methods=["GET", "POST"])
def update(id):
  if request.method == "GET":
    profiles = f.get_profiles_from_file()
    for profile in profiles:
      if profile['id'] == id:
        return render_template('update.html', profile=profile)
    return redirect(url_for('error'))
  else:
    profiles = f.get_profiles_from_file()
    for profile in profiles:
      if profile['id'] == id:
        profile['login'] = request.form['login']
        profile['account'] = request.form['account']
        break
    f.set_profiles_to_file(profiles)
    return redirect(url_for('details', id=id))


if __name__ == '__main__':
    app.run(debug=True)
