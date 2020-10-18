from flask import Flask, render_template

app = Flask(__name__)


@app.route('/temp')
def hello_world():
    return 'Hello World!'

@app.route('/')
def mainPage():
    return render_template('SONA_clean.html')

if __name__ == '__main__':
    app.run()
