import sqlite3
from sqlite3 import Error
import random

class DB:
    def create_connection():
        conn = sqlite3.connect('hangman.db')
        c = conn.cursor()
        return conn, c

    create_table_words_sql = """CREATE TABLE IF NOT EXISTS words (
                                id INTEGER PRIMARY KEY,
                                word TEXT UNIQUE,
                                timesCorrect INTEGER DEFAULT 0,
                                timesIncorrect INTEGER DEFAULT 0,
                                winRatio INTEGER GENERATED ALWAYS AS (timesCorrect/timesIncorrect) 
                            );"""

    add_words_sql = "INSERT INTO words (word) VALUES (?)"
    wordcount_sql = "SELECT COUNT(*) FROM words"
    get_word_by_id_sql = "SELECT * FROM words WHERE id = ?"

    @staticmethod
    def get_random_word():
        try:
            conn, c = DB.create_connection()
            c.execute(DB.wordcount_sql)
            total_wordcount = c.fetchone()[0]
            random_word_id = random.randint(1, total_wordcount)
            c.execute(DB.get_word_by_id_sql, (random_word_id, ))
            return c.fetchone()
        except Error as e:
            print(e)
        finally:
            conn.close()

    @staticmethod
    def create_table(sql):
        try:
            conn, c = DB.create_connection()
            c.execute(sql)
            conn.commit()
        except Error as e:
            print(e)
        finally:
            conn.close()

    @staticmethod
    def add_words(sql):
        try:
            conn, c = DB.create_connection()
            with open("words_list.txt") as file:
                for line in file:
                    c.execute(sql, (line.rstrip(), ))
            conn.commit()
        except Error as e:
            print(e)
        finally:
            conn.close()


    

