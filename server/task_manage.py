import os
import sys
from flask_restful import reqparse, abort, Api, Resource
from flask import make_response
import json

CASE_RUN    = 1
CASE_STOP   = 0
CASE_RESUME = 2

SUCCESS = 0
FAILED = -1

class TaskManage(Resource):
    """docstring for TaskManage"""
    def __init__(self):
        pass

    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('action', type=int, help='Rate to charge for this resource')
            parser.add_argument('project_id', type=int, help='Rate to charge for this resource')
            parser.add_argument('case_id', type=int, help='Rate to charge for this resource')
            args = parser.parse_args()
            print args
            if args.get('action') == CASE_RUN:
                return self.run_case(args.get('project_id'), args.get('case_id'))
            return 111, 200
        except Exception, e:
            print str(e)

    def run_case(self, project_id, case_id):
        try:
            #step 1.check environment
            #step 2.immport model by project_id
            runner = __import__("projects.project_1.run_project", fromlist=['run_project'])
            # runner = __import__("projects."+"project_1."+ "run")
            if runner.run_project(self, project_id, case_id) == SUCCESS:
                return self.json_success({'result':SUCCESS, 'process':0, 'status':''})
        except Exception, e:
            print str(e)

    def json_success(self, msg):
        resp = make_response(json.dumps(msg), 200)
        print type(resp.headers)
        resp.headers.extend({"Access-Control-Allow-Origin":"*"})
        print resp.headers

        return resp
