from flask_login import LoginManager
from flask import g

login_manager = LoginManager()

def init_login_manager(app):
    login_manager.init_app(app)

