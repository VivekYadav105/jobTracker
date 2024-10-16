from flask import Blueprint,jsonify,Response,request,g,abort
from flask_mail import Message
from werkzeug.security import generate_password_hash,check_password_hash
import os,datetime
import jsonwebtoken as jwt
from utils import login_manager,mail
from middleware.auth import jwt_required
from bson.objectid import ObjectId

authRouter = Blueprint('authRouter',__name__,url_prefix='/auth')

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
    return jsonify({"message":"User logged in successfully"})

@authRouter.route('/signup',methods=['POST'])
def signup():
    try:
        data = request.get_json()
        user_collection = g.db.users
        user = user_collection.find_one({"email":data['email']})
        if(user):
            if user.get('verified', False):
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
            result = user_collection.insert_one({'email':data['email'],"password":hash_password,'verified':False,'gender':'M',"token":""})
            token = create_token({'_id':str(result.inserted_id)})
            user_collection.update_one({"_id":ObjectId(result.inserted_id)},{"$set":{"token":token}})

        return jsonify(message='A verification mail is sent to your email')
    except Exception as e:
        print(e.__str__())
        abort(e)

@authRouter.get('/verify')
@jwt_required(request)
def verify_user():
    try:
        print("from print:",g.jwt_secret)
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

    except jwt.ExpiredSignatureError as e:
        abort(401, "Token has expired.")
        print(e)
    except jwt.InvalidTokenError:
        abort(401, "Invalid token.")
        print(e)
    except jwt.InvalidAlgorithmError:
        abort(400, "Invalid algorithm specified.")
        print(e)

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
def verify_token(token):
    print(token)
    return Response("this is route to verify token")
    # may_be needed for verify token