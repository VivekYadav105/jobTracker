from flask import Flask,Response,g
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from job import jobRouter
from auth import authRouter
from utils import init_login_manager,init_mail
import os

load_dotenv()

app = Flask(__name__)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET"] = os.getenv("JWT_SECRET")
app.config["SALT_LENGTH"] = os.getenv("SALT_LENGTH")

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")     
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mongo = PyMongo(app)
CORS(app)

init_login_manager(app)
init_login_manager(app)
init_mail(app)


@app.get('/')
def hello_world():
    print("Hello world")
    return Response("Hello world")

@app.before_request
def set_db():
    g.db = mongo.db 
    g.jwt_secret = app.config.get('JWT_SECRET')
    g.salt_length = int(app.config.get('SALT_LENGTH'))

app.register_blueprint(jobRouter)
app.register_blueprint(authRouter)

if __name__ == "__main__":
    port = os.getenv('PORT') or 5000
    # connect()  app_Context error -- # some error work around later
    app.run(port=5000,debug=True,host='0.0.0.0')