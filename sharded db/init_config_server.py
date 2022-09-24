from pymongo import MongoClient

c = MongoClient('localhost', 109, directConnection = True)
config = {'_id': 'clubesConfig','configsvr': True, 'members': [
    {'_id': 0, 'host': 'localhost:109'}]}
c.admin.command("replSetInitiate", config)