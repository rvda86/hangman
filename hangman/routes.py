from hangman import app
from flask import render_template, jsonify
from hangman.db import DB
# from hangman.create_db import create_db

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/word")
def word():
    word_data = DB.random_word()
    word = word_data[1]
    return jsonify({"word": word})

