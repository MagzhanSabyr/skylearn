
from flask import Flask, request , render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return 'Главная страница - GET'
    return 'Главная страница - POST'

@app.route('/hello')
def hello():
    return 'Привет, мир!'

@app.route('/about/<name>')
def about(name):
    return f'About {name}!'

@app.route('/profile/<int:id>')
def profile(id):
    return f' Hello {id}!'

if __name__ == '__main__':
    app.run()