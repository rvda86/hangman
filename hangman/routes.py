from hangman import app
from flask import render_template, jsonify
from hangman.db import DB
from dotenv import load_dotenv
import os

load_dotenv()
API_LINK = os.getenv("API_LINK")

@app.route("/")
def index():
    return render_template('index.html', api_link=API_LINK)

@app.route("/word")
def get_random_word():
    word_data = DB.get_random_word()
    return jsonify({"id": word_data[0], "word": word_data[1]})