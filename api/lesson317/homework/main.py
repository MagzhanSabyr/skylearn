from flask import Flask, jsonify, request, render_template, redirect, url_for
import json
import random
import functions as f



app = Flask(__name__, static_folder='static')


@app.route('/')
def index():
  profiles = f.get_profiles_from_file()
  return render_template('index.html', profiles=profiles)


@app.route('/details/<int:id>')
def details(id):
  profiles = f.get_profiles_from_file()
  for profile in profiles:
    if profile['id'] == id:
      return render_template('details.html', profile=profile)
  return redirect(url_for('error'))


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
        profile['money'] = request.form['money']
        break
    f.set_profiles_to_file(profiles)
    return redirect(url_for('details', id=id))


@app.route("/delete/<int:id>", methods=["GET", "POST"])
def delete(id):
  if request.method == "GET":
    profiles = f.get_profiles_from_file()
    for profile in profiles:
      if profile['id'] == id:
        return render_template('delete.html', profile=profile)
    return redirect(url_for('error'))
  else:
    profiles = f.get_profiles_from_file()
    print(id)
    index = None
    for i in range(len(profiles)):
      if profiles[i].get('id') == id:
        index = i
        print(i)
        break
    if index == None:
      return redirect(url_for('error'))

    profiles.pop(index)
    f.set_profiles_to_file(profiles)
    return redirect(url_for('index'))


@app.route("/create", methods=["GET", "POST"])
def create():
  if request.method == "GET":
    return render_template('create.html')
  else:
    profiles = f.get_profiles_from_file()

    last_profile_id = profiles[-1]['id'] if profiles else 0

    new_profile = {
        "id": last_profile_id + 1,
        "login": request.form['login'],
        "money": request.form['money']
    }

    profiles.append(new_profile)
    f.set_profiles_to_file(profiles)
    return redirect(url_for('index'))


@app.route("/error")
def error():
  return render_template('error.html')


app.run(debug=True, host='0.0.0.0', port=81)
