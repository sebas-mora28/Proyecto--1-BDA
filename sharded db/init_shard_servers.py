from pymongo import MongoClient

c = MongoClient('localhost', 110, directConnection = True)
config = {'_id': 'clubesApp', 'members': [
    {'_id': 0, 'host': 'localhost:110'},
    {'_id': 1, 'host': 'localhost:111'},
    {'_id': 2, 'host': 'localhost:112'}]}
c.admin.command("replSetInitiate", config)