from pymongo import MongoClient

c = MongoClient('localhost', 113, directConnection = True)
shards = 'clubesApp/localhost:110,localhost:111,localhost:112'
c.admin.command("addShard", shards)