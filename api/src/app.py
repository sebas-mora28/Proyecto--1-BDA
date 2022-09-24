
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId


app= Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost:110/clubesDB'

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
    #datos
    user=request.json['user'] 
    password=request.json['password'] 
    names=request.json['names'] 
    lastnames=request.json['lastnames']  
    section=request.json['section']  
    isAdmin=request.json['isAdmin'] 
           
    #usuario, password,nombres, apellidos, seccion, esAdmin
    id=dbu.insert_one({'user':user,
                    'password':password,
                    'names':names,
                    'lastnames':lastnames,
                    'section':section,
                    'isAdmin':isAdmin
                    })
    
    return {'message':'usuario creado con exito'}

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
    return jsonify({'msg': 'User deleted'})

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
    #datos
    name = request.json['name']
    category = request.json['category']
    followers = [request.json['followers']]
    
    #nombre,categoria,seguidores(id de usuarios)
    id=dbc.insert_one(
                    {'name':name,
                    'category':category,
                    'followers':followers})

    return {'message':'exito'}




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
#ready
"""
    {
    "id":"632f8dbbc09c9bb365a1e955"
    }
"""
@app.route('/clubs/deleteClub', methods=['DELETE'])
def deleteClub():
    id=request.json['id']
    dbc.find_one_and_delete({'_id': ObjectId(id)})
    return jsonify({'msg': 'Club deleted'})

##Working--------------------------------------------------------------------------------------------------------

@app.route('/clubs/updateFollowers', methods=['PUT'])
def updateFollowers():
    id=request.json['id']
    idUser=request.json['idUser']
    nameU=request.json['nameU']
    dbc.update_one({'_id': ObjectId(id)},
    {'$set':{
        'followers': {'idUser':idUser, 'nameU':nameU}    
    }})
    return jsonify({'msg': 'User updated'})



##comprobar club, si devuelve algo se debe hacer el metodo en el fe para que lo descarte y tire error
@app.route('/clubs/getClubsTop', methods=['GET'])
def getClubsTop():
    clubs=[]
    for doc in dbc.find():
        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'category':doc['category'],
            'followers':doc['followers'] #Hacer un conteo en el fe          
        })
    return jsonify(clubs)

   
#Mostrar el nombre completo y la cantidad de
#  clubes sugeridos para lostres estudiantes
#  que más sugerencias hayan realizado.

###conteo de todos los id de los clubes que mas se repitan
####Tomaríamos el id de la lista de followers de los clubes
@app.route('/users/top3', methods=['GET'])
def getUsersTop():

    user=dbu.find_one({'_id':ObjectId(id)})
    return jsonify({
        '_id':str(ObjectId(user['_id'])),
        'names': user['names'],     
        'lastnames':user['lastnames']  
        })


######Una consulta de los mejores y luego un match.

#Top 5 de clubes sugeridos. Se debe mostrar una
#  lista de los cinco clubes más solicitados,
#  incluyendo el nombre del club, la categoría
#  y la cantidad de veces que fue sugerido.
@app.route('/clubs/<id>', methods=['GET'])
def getClubsTop5():
    clubs=[]
    for doc in dbc.find():
        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'category':doc['category'],
            'followers':doc['followers'] #Hacer un conteo en el fe          
        })
    return jsonify(clubs)

#Bottom 3 de clubes sugeridos. Se debe mostrar una
#lista de los cinco clubes menos solicitados,
#incluyendo el nombre del club, la categoría y 
#la cantidad de veces que fue sugerido.



if __name__ == '__main__':
    app.run(debug=True)

