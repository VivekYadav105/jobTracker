from flask import Blueprint,jsonify,Response,request,g,abort
from flask_mail import Message
from werkzeug.security import generate_password_hash,check_password_hash
import os,datetime
import jsonwebtoken as jwt
from utils import login_manager,mail
from bson.objectid import ObjectId

authRouter = Blueprint('authRouter',__name__,url_prefix='/auth')

def send_verification_email(token,email):
    msg = Message(subject='User Verification', sender="noredply-jobBoard.gmail.com", recipients=[email])
    msg.html = f"<b>Hey User</b>, Please  <a href='http://localhost:3000/verify/{token}'>Click here</a> <br/> or <br/> use this link for verification <a href='http://localhost:3000/verify/{token}'>http://localhost:3000/verify/{token}</a>"
    mail.send(msg)

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
        token = jwt.encode({'_id':str(user.get('_id'))})
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
                    'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30),
                    '_id':str(user.get('_id'))    
                }
                token = jwt.encode(payload,key=g.jwt_secret)
                send_verification_email(token,data['email'])
                return jsonify(message='Please click on the link sent to your email',token=token)
        else:
            hash_password = generate_password_hash(data['password'],salt_length=g.salt_length)
            result = user_collection.insert_one({'email':data['email'],"password":hash_password,'verified':False,'gender':'M',"token":""})
            token = jwt.encode({'_id':str(result.inserted_id)},key=g.jwt_secret)
            user_collection.update_one({"_id":ObjectId(result.inserted_id)},{"$set":{"token":token}})

        return jsonify(message='A verification mail is sent to your email')
    except Exception as e:
        print(e.__str__())
        abort(e)

@authRouter.get('/verify/<token>')
def verify_user(token):
    try:
        print("from print:",g.jwt_secret)
        jwt_payload = jwt.decode(token,key=g.jwt_secret)
        print(jwt_payload)
        user_collection = g.db.users
        filter = None
        try:
            filter = {"_id":ObjectId(jwt_payload._id)}
        except Exception as e:
            abort(400,'Invalid token')

        user = user_collection.find_one(filter)

        if not user:
            abort(404,"user doesn't exist")
        
        if user.get('token') != token:
            abort(400,"Invalid token")

        user_collection.update_one(filter,{"$set":{
            "token":"",
            "verified":True
        }})

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
    token = jwt.encode({'_id':user.get('_id')})
    user_collection.update_one({"email":data['email']},{'$set':{"token":token}})
    if not user:
        abort(404,"user not found")
    # send mail here
    return jsonify({"message":"Password reset link is sent to your mail"})

def reset_password():
    try:
        data = request.get_json()
        user_collection = g.db.users
        jwt_payload = jwt.decode(data['token'],key=g.jwt_secret)
        filter = None

        try:
            filter = {"_id":ObjectId(jwt_payload._id)}
        except Exception as e:
            print(e)
            abort(400,"Invalid UserId")

        user = user_collection.find_one(filter)
        if not user:
            abort(404,'User not Found')
        
        if user.get('token') != data['token']:
            abort(400,"Invalid token")

        hash_password = generate_password_hash(data['password'],salt_length=g.salt_length)
        user_collection.update_one(filter,{'$set':{"password":hash_password,"token":''}})
        return jsonify({"message":"password reset successfully"})
    
    except jwt.InvalidTokenError as e:
        print(e)
        abort(400,'Invalid token')

authRouter.add_url_rule('/reset','reset_password',reset_password)

@authRouter.route('/verifyToken/<token>')
def verify_token(token):
    print(token)
    return Response("this is route to verify token")
    # may_be needed for verify token