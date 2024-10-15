from flask import Blueprint,abort,jsonify,request,g
from flask import Blueprint,abort,jsonify,request,g
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime
from typing import List, Union
from bson.datetime_ms import DatetimeMS
# from schema import JobSchema

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
    _id:Union[str,ObjectId]

    # @field_validator('_id')
    # def validate_objectid(cls, v):
    #     if isinstance(v, ObjectId):
    #         return str(v)  # Convert ObjectId to string
    #     return v  

    class Config:
        arbitrary_types_allowed = True              
                

jobRouter = Blueprint('jobRouter',__name__,url_prefix='/jobs')

@jobRouter.route('/getall',methods=['GET'])
def get_all_jobs():
    jobs = g.db.jobs.find({}).to_list()
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jobs

@jobRouter.route('/create',methods=['POST'])
def create_job():
    data = request.get_json()
    JobSchema.model_validate(data)
    g.db.jobs.insert_one(data)
    jobs = g.db.jobs.find({}).to_list()
    # replace with dynamic json serializer
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jsonify(jobs)

@jobRouter.route('/edit/<id>',methods=['POST'])
def edit_job(id):
    try:
        filter_query = {"_id": ObjectId(id)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    data = request.get_json()
    result = g.db.jobs.update_one(filter_query,{'$set':data})
    if result.matched_count == 0:
        return jsonify({"message": "Document not found"}), 404
    jobs = g.db.jobs.find({}).to_list()
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jsonify(jobs) 

@jobRouter.route('/delete/<jobId>',methods=['GET'])
def delete_job(jobId):
    try:
        filter_query = {"_id": ObjectId(jobId)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    result = g.db.delete_one(filter_query)
    if result.deleted_count == 0:
        return abort(404,"No job with jobid "+jobId +"is found")
    return jsonify({"message":"Job deleted successfully"})

@jobRouter.route('/get/<id>',methods=['GET'])
def get_job(id):
    try:
        filter_query = {"_id": ObjectId(id)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    job = g.db.jobs.find(filter_query)
    job['_id'] = str(job['_id'])
    return jsonify(job)
            
                

jobRouter = Blueprint('jobRouter',__name__,url_prefix='/jobs')

@jobRouter.route('/getall',methods=['GET'])
def get_all_jobs():
    jobs = g.db.jobs.find({}).to_list()
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jobs

@jobRouter.route('/create',methods=['POST'])
def create_job():
    data = request.get_json()
    JobSchema.model_validate(data)
    g.db.jobs.insert_one(data)
    jobs = g.db.jobs.find({}).to_list()
    # replace with dynamic json serializer
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jsonify(jobs)

@jobRouter.route('/edit/<id>',methods=['POST'])
def edit_job(id):
    try:
        filter_query = {"_id": ObjectId(id)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    data = request.get_json()
    result = g.db.jobs.update_one(filter_query,{'$set':data})
    if result.matched_count == 0:
        return jsonify({"message": "Document not found"}), 404
    jobs = g.db.jobs.find({}).to_list()
    for i in jobs:
        i['_id'] = str(i['_id'])
    return jsonify(jobs) 

@jobRouter.route('/delete/<jobId>',methods=['GET'])
def delete_job(jobId):
    try:
        filter_query = {"_id": ObjectId(jobId)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    result = g.db.jobs.delete_one(filter_query)
    if result.deleted_count == 0:
        return abort(404,"No job with jobid "+jobId +"is found")
    return jsonify({"message":"Job deleted successfully"})

@jobRouter.route('/get/<id>',methods=['GET'])
def get_job(id):
    try:
        filter_query = {"_id": ObjectId(id)}
    except Exception as e:
        print(e.__str__())
        abort(400,"Invalid Job Id")
    job = g.db.jobs.find(filter_query)
    job['_id'] = str(job['_id'])
    return jsonify(job)
