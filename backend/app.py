from flask import Flask,Response,g,jsonify
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
from flask_debugtoolbar import DebugToolbarExtension
from flask_pymongo import PyMongo
from job import jobRouter
from auth import authRouter
from utils import init_login_manager,init_mail
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = 'super secret key'

app.config["MONGO_URI"] = os.getenv("MONGO_URI")

app.config["JWT_SECRET"] = os.getenv("JWT_SECRET")

app.config["SALT_LENGTH"] = os.getenv("SALT_LENGTH")

# app.config['SESSION_TYPE'] = 'redis'
# app.config['SESSION_PERMANENT'] = False
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_REDIS'] = redis.from_url('redis://127.0.0.1:6379')

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")     
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mongo = PyMongo(app)
CORS(app,supports_credentials=True)
toolbar = DebugToolbarExtension(app)



init_login_manager(app)
init_login_manager(app)
init_mail(app)

@app.get('/')
def hello_world():
    print("Hello world")
    return Response("<body>Hello world</body>")

@app.before_request
def set_db():
    g.db = mongo.db 
    g.jwt_secret = str(app.config.get('JWT_SECRET'))
    g.salt_length = int(app.config.get('SALT_LENGTH'))

app.register_blueprint(jobRouter)
app.register_blueprint(authRouter)

app.post('/*')
def catch_all():
    return jsonify(error='Invalid route'),404

@app.errorhandler(Exception)
def handle_error(e):
    print(e)
    status = getattr(e, 'code', 500)
    message = getattr(e, 'description', 'Internal Server Error')
    if(status==500):
        message = "Internal Server Error"
    return jsonify(error=message), status


if __name__ == "__main__":
    port = os.getenv('PORT') or 5000
    # connect()  app_Context error -- # some error work around later
    app.run(port=5000,debug=True,host='0.0.0.0')