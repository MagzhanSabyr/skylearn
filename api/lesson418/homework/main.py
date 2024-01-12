from flask import Flask, render_template, redirect, url_for, request, jsonify
import json
import random


app = Flask(__name__)

nav_menu = [
    {'name': 'Posts', 'url': '/'},
    {'name': 'Add post', 'url': 'add-post'},
]


@app.route('/')
def index():
    with open('data.json', 'r') as file:
        data = json.load(file)
    return render_template('index.html', title=nav_menu[0]['name'], nav_menu=nav_menu, data=data)


@app.route('/add-post')
def add_post():
    return render_template('add-post.html', title=nav_menu[1]['name'], nav_menu=nav_menu)


@app.route('/create', methods=['POST'])
def create_post():
    if request.method == 'POST':
        file = request.files.get('fileInput')
        title = request.form.get('postTitle', '')
        content = request.form.get('postText', '')

        flag = True
        if not file:
            file = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
            flag = False

        if flag:
            file.save('static/img/' + file.filename)
            post_info = {
                "id": random.randrange(1, 100_00),
                'postTitle': title,
                'fileInput': f"../static/img/{file.filename}",
                'postText': content
            }
        else:
            post_info = {
                "id": random.randrange(1, 100_00),
                'postTitle': title,
                'fileInput': file,
                'postText': content
            }

        existing_data = []
        with open('data.json', 'r') as file:
            existing_data = json.load(file)

        existing_data.append(post_info)

        with open('data.json', 'w') as file:
            json.dump(existing_data, file, indent=2)

        return redirect(url_for('index'), 301)

    return 'Invalid request method'


@app.route('/delete/<int:id>')
def delete_profile_by_id(id):
    with open('data.json', 'r') as file:
        posts = json.load(file)
    for post in posts:
        if post.get('id') == id:
            posts.remove(post)
            with open('data.json', 'w') as f:
                json.dump(posts, f, indent=2)
            return redirect('/')


@app.route('/update/<int:id>', methods=["POST", "GET"])
def update_profile_by_id(id):
    with open('data.json', 'r') as file:
        posts = json.load(file)
    current_post = None
    for post in posts:
        if post.get('id') == id:
            current_post = post
    if request.method == 'POST':
        file = request.files.get('fileInput')
        title = request.form.get('postTitle', '')
        content = request.form.get('postText', '')

        flag = True
        if not file:
            file = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
            flag = False

        if flag:
            img_name = file.filename
            file.save('static/img/' + img_name)
            current_post['postTitle'] = title
            current_post['fileInput'] = f"../static/img/{img_name}"
            current_post['postText'] = content
        else:
            current_post['postTitle'] = title
            current_post['fileInput'] = file
            current_post['postText'] = content

        with open('data.json', 'w') as file:
            json.dump(posts, file, indent=2)

        return redirect(url_for('index'), 301)
    else:
        return render_template('update-post.html', post=current_post, title="Edit", nav_menu=nav_menu)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81)
