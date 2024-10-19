from typing import Union
from bson import ObjectId
from flask_login import UserMixin
from pydantic import BaseModel

class UserSchema(UserMixin):
    _id:Union[ObjectId,str]
    email:str
    password:str

    def __init__(self,**kwargs):
        self._id = kwargs['_id']
        self.email = kwargs['email']
        self.password = kwargs['password']


    def get_id(self):
        return str(self._id)