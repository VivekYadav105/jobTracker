from flask import current_app,g,abort
from flask_pymongo import PyMongo

def connect():
    print(g['_database'])
    db_url = g['_database'] or None
    if db_url is None:
        abort(500,'failed to connect to database')
    db = PyMongo(current_app).db
    g._database = db
    