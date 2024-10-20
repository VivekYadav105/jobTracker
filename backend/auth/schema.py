from typing import Union
from bson import ObjectId
from flask_login import UserMixin
from pydantic import BaseModel
from flask import g

class UserSchema(UserMixin):
    _id: Union[ObjectId, str]
    email: str
    password: str

    def __init__(self,**kwargs):
        print(kwargs)
        self._id = kwargs.get('_id')
        self.email = kwargs.get('email')
        self.password = kwargs.get('password')


    def get_id(self):
        return str(self._id)
    
    @staticmethod
    def get(user_id):
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        user_data = g.db.users.find_one({"_id": user_id})
        return UserSchema(**user_data) if user_data else None