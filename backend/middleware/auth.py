from flask import abort
from functools import wraps
import jwt

def jwt_required(request):
    def wrapper(func):
        @wraps(func)
        def wrapper_inner(*args,**kwargs):
            auth_header = request.headers.get('Authorization',False)
            if not auth_header or not auth_header.startswith('Bearer '):
                abort(401,'User is not authorized')
                return func(*args,**kwargs)
            try:
                request.token = auth_header.split(' ')[1]
            except jwt.ExpiredSignatureError:
                abort(403,'Token Expired please try later')
            except jwt.InvalidSignatureError:
                abort(401,"USER IS NOT AUTHORIZED")
            except jwt.InvalidAlgorithmError:
                abort(500,'Failed to authenticate user')
            except Exception as e:
                abort(500,'Something went wrong')
            return func(*args,**kwargs)
        return wrapper_inner
    return wrapper