import os
from flask import Flask, request, jsonify, render_template
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import db
import firebase_admin

app = Flask(__name__)

cred = credentials.Certificate('key.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://diaryexchanger.firebaseio.com/'
})

ref = db.reference('')

@app.route('/temp')
def hello_world():
    return 'Hello World!'

@app.route('/', methods = ['POST','GET'])
def mainPage():
    return render_template('Test.html')

@app.route('/adder', methods = ['POST'])
def adder():
    input = request.form.get('nm')
    print(input)
    ref.push({
        'author': input,
        'title': 'Announcing COBOL, a New Programming Language'
    })
    return '111'

if __name__ == '__main__':
    app.run()
