from bson import ObjectId
from collections.abc import Iterable

def json_parse(obj):
    isIterable = False
    
    try:
        obj = list(obj)
        isIterable = True        
    except TypeError as e:
        print(e)
        isIterable = False

    if(isIterable):
        for i in obj:
            if isinstance(i, ObjectId):   
                i = str(i)
        return obj
    else:
        if isinstance(i,ObjectId):
            return str(obj)