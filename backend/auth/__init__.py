from flask import Blueprint,jsonify,Response,request,g,abort,session
from flask_mail import Message
from flask_login import logout_user,login_user,current_user
from werkzeug.security import generate_password_hash,check_password_hash
import os,datetime
import jsonwebtoken as jwt
from auth.schema import UserSchema
from utils import login_manager,mail
from middleware.auth import jwt_required
from bson.objectid import ObjectId

authRouter = Blueprint('authRouter',__name__,url_prefix='/auth')

@login_manager.user_loader
def load_user(id):
    user = g.db.users.find_one({"_id": id})
    if user:
        return UserSchema(**user)
    return None


def send_verification_email(token,email):
    msg = Message(subject='User Verification', sender="noredply-jobBoard.gmail.com", recipients=[email])
    msg.html = f"<b>Hey User</b>, Please  <a href='http://localhost:3000/verify/{token}'>Click here</a> <br/> or <br/> use this link for verification <a href='http://localhost:3000/verify/{token}'>http://localhost:3000/verify/{token}</a>"
    mail.send(msg)

def send_forgot_email(token,email):
    msg = Message(subject='Password Reset', sender="noredply-jobBoard.gmail.com", recipients=[email])
    msg.html = f"<b>Hey User</b>, Please  <a href='http://localhost:3000/reset/{token}'>Click here</a> <br/> or <br/> use this link for verification <a href='http://localhost:3000/reset/{token}'>http://localhost:3000/reset/{token}</a>"
    mail.send(msg)

def create_token(payload,**options):
    token = jwt.encode(payload,key=g.jwt_secret,algorithm='HS256',**options)
    return token

def decode_token(token):
    return jwt.decode(token,key=g.jwt_secret,algorithms=['HS256'])

@login_manager.user_loader
def load_user(user_id):
    return UserSchema.get(user_id)

@authRouter.route('/check-session', methods=['GET'])
def check_session():
    if current_user.is_authenticated:
        return jsonify({'session_active': True, 'user': current_user.get_parsed_details()}), 200
    else:
        return jsonify({'session_active': False}), 401

@authRouter.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user_collection = g.db.users
    user = user_collection.find_one({"email":data['email']})
    if not user:
        abort(404,"User not found")
    if not check_password_hash(user.get('password'),data['password']):
        abort(400,'Password Incorrect')
    if not user.get('verified'):
        token = jwt.encode({'_id':str(user.get('_id'))},key=g.jwt_secret)
        send_verification_email(token,user.get('email'))
        return jsonify({"message":"please verify your account"})
    user['_id'] = str(user['_id'])
    print(current_user.get_id())
    if(current_user.is_authenticated):
        return jsonify({"message":"User already logged in"})
    login_user(UserSchema(**user),remember=True,duration=datetime.timedelta(hours=4))
    response = jsonify(message='User logged in successfully')
    response.set_cookie('session', UserSchema(**user).get_id(), httponly=True, secure=True, samesite=None) 
    return response

@authRouter.route('/signup',methods=['POST'])
def signup():
        data = request.get_json()
        user_collection = g.db.users
        user = user_collection.find_one({"email":data['email']})
        if(user):
            if user['verified']:
                abort(400,"User already Exists")
            else:
                print("from print:",g.jwt_secret)
                payload = {
                    'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=10),
                    '_id':str(user.get('_id'))    
                }
                token = create_token(payload)
                send_verification_email(token,data['email'])
                user_collection.update_one({"_id":ObjectId(user['_id'])},{"$set":{"token":token}})
                return jsonify(message='Please click on the link sent to your email',token=token)
        else:
            hash_password = generate_password_hash(data['password'],salt_length=g.salt_length)
            result = user_collection.insert_one({'fname':f'{data["fname"]}',"lname":data["lname"] ,'email':data['email'],"password":hash_password,'verified':False,'gender':'M',"token":"","socials":dict(),"education":None,"location":None})
            token = create_token({'_id':str(result.inserted_id)})
            user_collection.update_one({"_id":ObjectId(result.inserted_id)},{"$set":{"token":token}})
            send_verification_email(token,data['email'])
        return jsonify(message='A verification mail is sent to your email')
   

@authRouter.get('/verify')
@jwt_required(request)
def verify_user():
        print(request.token)
        jwt_payload = jwt.decode(request.token,key=g.jwt_secret,algorithms=['HS256'])
        print(jwt_payload)
        user_collection = g.db.users
        filter = None
        try:
            filter = {"_id":ObjectId(jwt_payload['_id'])}
        except Exception as e:
            abort(400,'Invalid token')

        user = user_collection.find_one(filter)

        if not user:
            abort(404,"user doesn't exist")
        print(user)
        if user.get('token') != request.token:
            abort(400,"Invalid token")

        user_collection.update_one(filter,{"$set":{
            "token":"",
            "verified":True
        }})
        return jsonify(message='User verified successfully')



@authRouter.post('/forgot')
def forgot_password():
    data = request.get_json()
    user_collection = g.db.users
    user = user_collection.find_one({"email":data['email']})
    token = create_token({'_id':str(user.get('_id'))})
    if not user:
        abort(404,"user not found")
    user_collection.update_one({"email":data['email']},{'$set':{"token":token}})
    send_forgot_email(token,user['email'])
    return jsonify({"message":"Password reset link is sent to your mail"})

@jwt_required(request)
def reset_password():
    try:
        data = request.get_json()
        user_collection = g.db.users
        jwt_payload = decode_token(request.token)
        filter = None
        try:
            filter = {"_id":ObjectId(jwt_payload['_id'])}
        except Exception as e:
            print(e)
            abort(400,"Invalid UserId")

        user = user_collection.find_one(filter)
        if not user:
            abort(404,'User not Found')
        
        print(user.get('token'))
        print(request.token)

        if user.get('token') != request.token:
            abort(400,"Invalid token")

        print(data)
        hash_password = generate_password_hash(data['password'],salt_length=g.salt_length)
        user_collection.update_one(filter,{'$set':{"password":hash_password,"token":''}})
        return jsonify({"message":"password reset successfully"})
    except Exception as e:
        print(e)
        abort(400,'Invalid token')

authRouter.add_url_rule('/reset','reset_password',reset_password,methods=['POST'])


@authRouter.route('/verifyToken/<token>')
@jwt_required(request)
def verify_token(token):
    print(token)
    return Response("this is route to verify token")
    # may_be needed for verify token

@authRouter.route('/logout')
def logOut():
    logout_user()
    response = jsonify({"message":"user logged out successfully"})
    response.delete_cookie('session', httponly=True, secure=True, samesite=None) 
    return response