from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():

    names = ["Almas", "Madina", "Alisher"]
    return render_template('index.html', names = names)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
