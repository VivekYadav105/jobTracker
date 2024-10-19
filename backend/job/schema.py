from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime
from typing import Optional
from typing import List, Union
from bson.datetime_ms import DatetimeMS

class JobSchema(BaseModel):
    role: str
    logo: str
    company: str
    experience: str
    skills: List[str]
    platform: str
    date: Union[str,DatetimeMS,datetime]
    status: str
    link:str
    _id:ObjectId
    userId:Optional[ObjectId] = None

    # @field_validator('_id')
    # def validate_objectid(cls, v):
    #     if isinstance(v, ObjectId):
    #         return str(v)  # Convert ObjectId to string
    #     return v  

    class Config:
        arbitrary_types_allowed = True    
                