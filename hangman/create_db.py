from hangman.db import DB

def create_db():
    DB.create_table(DB.create_table_words_sql)
    DB.add_words(DB.add_words_sql)
