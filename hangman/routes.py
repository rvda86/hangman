from hangman import app
from flask import render_template, jsonify
from hangman.db import DB

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/word")
def get_random_word():
    word_data = DB.get_random_word()
    return jsonify({"id": word_data[0], "word": word_data[1]})