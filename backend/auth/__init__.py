from flask import Blueprint,jsonify,Response

authRouter = Blueprint('authRouter',__name__)

@authRouter.post('/login',methods=['POST'])
def login():
    return jsonify({"message":"This is my message"})

@authRouter.route('/signup',methods=['POST'])
def signup():
    return jsonify(message='this is signup route')

@authRouter.post('/forgot')
def forgot_password():
    message = "this is the route to create token for user and send main"
    return jsonify(message)

def reset_password():
    message = "verifes token and resets password"
    return jsonify(message)

authRouter.add_url_rule('/reset','reset_password',reset_password)

@authRouter.route('/verifyToken/<token>')
def verify_token(token):
    print(token)
    return Response("this is route to verify token")