import os
from flask import Flask, request, jsonify, render_template
from firebase_admin import credentials, firestore, initialize_app
from firebase_admin import db
import firebase_admin

app = Flask(__name__)

cred = credentials.Certificate('key.json')
# Initialize the app with a service account, granting admin privileges

if not firebase_admin._apps:
    cred = credentials.Certificate('key.json')
    default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://diaryexchanger.firebaseio.com/'
})

ref = db.reference('')

@app.route('/SingleNotebook')
def hello_world():
    return render_template('SingleNotebook.html')

@app.route('/')
def mainpage():
    return render_template('mainPage.html')

@app.route('/addNew')
def addNew():
    return render_template('addNew.html')

@app.route('/Community')
def Community():
    return render_template('Community.html')

@app.route('/calender')
def calender():
    return render_template('calender.html')


#@app.route('/adder', methods = ['POST'])
#def adder():
#   input = request.form.get('nm')
#   print(input)
#   ref.push({
#       'author': input,
#       'title': 'Announcing COBOL, a New Programming Language'
#   })
#   return '111'

if __name__ == '__main__':
    app.run()
