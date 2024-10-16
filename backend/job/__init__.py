from flask import Blueprint,abort,jsonify,request,g
from flask import Blueprint,abort,jsonify,request,g
from bson.objectid import ObjectId
from job.schema import JobSchema


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

