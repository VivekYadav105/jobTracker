from typing import Union,Optional
from bson import ObjectId
from flask_login import UserMixin
from pydantic import BaseModel
from flask import g

class UserSchema(UserMixin):
    _id: Union[ObjectId, str]
    email: str
    password: str
    socials: dict
    fname:str
    lname:str
    location: Optional[str]
    college: Optional[str]

    def __init__(self,**kwargs):
        self._id = kwargs.get('_id')
        self.email = kwargs.get('email')
        self.password = kwargs.get('password')
        self.socials = kwargs.get('socials')
        self.fname = kwargs.get('fname')
        self.lname = kwargs.get('lname')
        self.location = kwargs.get('location')
        self.college = kwargs.get('college')

    def get_id(self):
        return str(self._id)
    
    def get_parsed_details(self):
        user_details = dict()
        if(type(self._id) == ObjectId):
            for i in self.__dict__:
                user_details[i] = getattr(self,i)
            user_details['_id'] = str(self._id)
        return user_details
                
    @staticmethod
    def get(user_id):
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        user_data = g.db.users.find_one({"_id": user_id})
        return UserSchema(**user_data) if user_data else None