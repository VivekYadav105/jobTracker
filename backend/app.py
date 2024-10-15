from flask import Flask,Response,request,abort,jsonify,g
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from job import jobRouter
# from db import connect
import os

load_dotenv()

app = Flask(__name__)


app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

CORS(app)


@app.get('/')
def hello_world():
    print("Hello world")
    return Response("Hello world")

@app.before_request
def set_db():
    g.db = mongo.db 

@app.post('/login')
def login():
    data = request.get_json()
    if(data['username']=='user' and data['password'] == 'password'):
        return Response("User logged in successfully")
    return abort(400,"Invalid credentials")

@app.post('/signup')
def signup():
    data = request.get_json()
    return jsonify({"message":"user created successfully"}),201

app.register_blueprint(jobRouter)

if __name__ == "__main__":
    port = os.getenv('PORT') or 5000
    # connect()  app_Context error -- # some error work around later
    app.run(port=5000,debug=True,host='0.0.0.0')