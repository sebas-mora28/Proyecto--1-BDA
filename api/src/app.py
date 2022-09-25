
from ast import Del
from operator import delitem
from urllib import response
from flask import Flask, request, jsonify, json
from flask_pymongo import PyMongo, ObjectId
import os 

PORT = os.getenv("PORT")
PORT_MONGO  = os.getenv("PORT_MONGO")

app= Flask(__name__)
app.config['MONGO_URI']= 'mongodb://localhost:{PORT_MONGO}/proyectDB'.format(PORT_MONGO=PORT_MONGO)

mongo= PyMongo(app)


dbu=mongo.db.users
dbc=mongo.db.clubs


##Ready
"""{
    "user":"santamix",
    "password":"santa",
    "names":"josue gabriel",
    "lastnames":"santamaria ramirez",
    "section":"12-1",
    "isAdmin":"true"
    }"""
@app.route('/users/CreateUser', methods=['POST'])
def createUser():

    user=request.json['user'] 
    password=request.json['password'] 
    names=request.json['names'] 
    lastnames=request.json['lastnames']  
    section=request.json['section']  
    isAdmin=request.json['isAdmin'] 

    id=dbu.insert_one({
        'user':user,
        'password':password,
        'names':names,
        'lastnames':lastnames,
        'section':section,
        'isAdmin':isAdmin
        })
    
    return {'message': 
            'usuario creado con exito'}

#Ready
"""{
    "id":"632f4b12b91fa067007722a6"
    }
"""
@app.route('/users/getUser/', methods=['GET'])
def getUser():

    id=request.json['id']
    doc=dbu.find_one({'_id':ObjectId(id)})

    return jsonify({
                    '_id':str(ObjectId(doc['_id'])),
                    'names': doc['names'],
                    'user':doc['user'],
                    'password':doc['password'],
                    'lastnames':doc['lastnames'],
                    'section':doc['section'],
                    'isAdmin':doc['isAdmin'],
                    })

##Ready
"""{
    "user":"santamix",
    "password":"santa"
    }"""

@app.route('/users/userLogin', methods=['GET'])
def getUserLogin():

    user=request.json['user']
    password=request.json['password']

    doc=dbu.find_one_or_404({'user':user})
    doc2=dbu.find_one_or_404({'password':password})

    if doc and doc2 :

        response=jsonify({
        '_id':str(ObjectId(doc['_id'])),
        'names': doc['names'],
        'user':doc['user'],
        'password':doc['password'],
        'lastnames':doc['lastnames'],
        'section':doc['section'],
        'isAdmin':doc['isAdmin'],
        })

    else:

        response={'message':'error'}

    return response

##Ready
"""{
    "id":"632f4b12b91fa067007722a6"
    }"""

@app.route('/users/deleteUser', methods=['DELETE'])
def deleteUsers():

    id=request.json['id']
    dbu.delete_one({'_id': ObjectId(id)})

    return jsonify({'msg':
                    'User deleted'})

##Ready
@app.route('/users', methods=['GET'])
def getUsers():

    users=[]

    for doc in dbu.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'user': doc['user'],
            'names':doc['names'],
            'password':doc['password'],
            'lastnames':doc['lastnames'],
            'section':doc['section'],
            'isAdmin':doc['isAdmin']
        })

    return jsonify(users)
    
##Ready
"""{
    "name":"Dibujo",
    "category":"Arte",
    "followers":[
                {"idU":"1234", "nameU":"josue"},
                {"idU":"12345", "nameU":"julio"},
                {"idU":"123124", "nameU":"mario"}
                ]
}"""

@app.route('/clubs/CreateClub', methods=['POST'])
def createClub():
    
    name = request.json['name']
    category = request.json['category']
    followers = request.json['followers']
    
    id=dbc.insert_one(
                    {'name':name,
                    'category':category,
                    'followers':followers})
    if id :
        response = {'message':'exito'}

    else:
        {'message':'error'}

    return response

#Ready
# Cantidad total de clubes distintos
# sugeridos por los estudiantes, según la 
#categoría. Por ejemplo: 30 clubes de arte,
#  10 de deportes, etc.

@app.route('/clubs', methods=['GET'])
def getClubs():

    clubs=[]

    for doc in dbc.find():
        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'category':doc['category'],
            'followers':doc['followers']
            
        })

    return jsonify(clubs)

############################
@app.route('/clubs2', methods=['GET'])
def getClubs2():
    name=request.json['name']
    clubs=[]

    doc=dbc.find_one_or_404({'name':name})
    if doc:
        response=jsonify({'followers':doc['followers']})
    #foll=json.loads(response)
        clubs.append({
            'followers':doc['followers']         
        })
        for doc2 in clubs:
            if doc2['idU']=='12':
                print(doc2)

    
    return response
#############################

#Ready
"""
    {
    "id":"632f8dbbc09c9bb365a1e955"
    }
"""
@app.route('/clubs/deleteClub', methods=['DELETE'])
def deleteClub():

    id=request.json['id']

    dbc.find_one_and_delete({'_id': ObjectId(id)})
    
    return jsonify({'msg': 
                    'Club deleted'})

##Working--------------------------------------------------------------------------------------------------------
#Metodo para desuscribirse de un club
@app.route('/clubs/updateDesuscrip', methods=['PUT'])
def updateDesuscrip():
    
    id=request.json['id']
    idUser=request.json['idU']
    
    
    dbc.update_one({'_id':ObjectId(id)},{'$pull':{'followers':{'idU':idUser}}})
    return jsonify({'msg': 'User updated'})

#Metodo para suscribirse a un club  
@app.route('/clubs/updateSuscrip', methods=['PUT'])
def updateSuscrip():
    
    id=request.json['id']
    idUser=request.json['idU']
    
    
    dbc.update_one({'_id':ObjectId(id)},{'$push':{'followers':{'idU':idUser}}})
    return jsonify({'msg': 'User updated'})
#db.clubs.find({followers:{$elemMatch:{idU:"6"}}})
@app.route('/clubs/usersTopSubs', methods=['GET'])
def userTopSubs():
    
    
    idUser=request.json['idU']
    
    apps=[]
    responses=dbc.find({'followers':{'$elemMatch':{'idU':idUser}}})
    for doc in responses:
        apps.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'category':doc['category'],
            'followers':doc['followers']})
            
    return jsonify(apps)
#Mostrar el nombre completo y la cantidad de
#  clubes sugeridos para lostres estudiantes
#  que más sugerencias hayan realizado.

@app.route('/users/top3', methods=['GET'])
def getUsersTop():

    user=dbu.find_one({'_id':ObjectId(id)})
    return jsonify({
        '_id':str(ObjectId(user['_id'])),
        'names': user['names'],     
        'lastnames':user['lastnames']  
        })

###Ready
#Top 5 de clubes sugeridos. Se debe mostrar una
#  lista de los cinco clubes más solicitados,
#  incluyendo el nombre del club, la categoría
#  y la cantidad de veces que fue sugerido.

@app.route('/clubs/getClubsTop5', methods=['GET'])
def getClubsTop5():

    clubs=[]

    for doc in dbc.aggregate([
        {"$project":{"count":
        {"$size":"$followers"}
        }}]):

        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'followers':doc['count']         
        })
        print(clubs)
    
    orden=sorted(clubs, key=lambda x: x['followers'], reverse=True)

    top=[]
    i=0

    for doc2 in orden:

        doc3=dbc.find_one({'_id':ObjectId(doc2['_id'])})
        
        if doc3 and i<5:  

            i+=1        
            top.append({
                    '_id':str(ObjectId(doc3['_id'])),
                    'name':doc3['name'],
                    'category':doc3['category'],
                    'followers':doc2['followers']
                    
                })
    
    return jsonify(top)

##Ready
#Bottom 3 de clubes sugeridos. Se debe mostrar una
#lista de los cinco clubes menos solicitados,
#incluyendo el nombre del club, la categoría y 
#la cantidad de veces que fue sugerido.
@app.route('/clubs/getClubsBtt3', methods=['GET'])
def getClubsBtt3():

    clubs=[]
    for doc in dbc.aggregate([
        {"$project":{"count":
        {"$size":"$followers"}
        }}]):

        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'followers':doc['count'] #Hacer un conteo en el fe          
        })
    
    orden=sorted(clubs, key=lambda x: x['followers'])

    btt3=[]
    i=0

    for doc2 in orden:  

        doc3=dbc.find_one(
            {'_id':ObjectId(doc2['_id'])}) 

        if doc3 and i<3: 

            i+=1        
            btt3.append(
                {'_id':str(ObjectId(doc3['_id'])),
                    'name':doc3['name'],
                    'category':doc3['category'],
                    'followers':doc2['followers']                    
                })  

    return jsonify(btt3)


if __name__ == '__main__':
    app.run(host='localhost',port=PORT,debug=True)

