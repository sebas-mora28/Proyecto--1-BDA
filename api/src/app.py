from flask import Flask, request, jsonify, abort
from flask_pymongo import PyMongo, ObjectId
import os 

# PORT = os.getenv("PORT")
# PORT_MONGO  = os.getenv("PORT_MONGO")

PORT = 5000
PORT_MONGO = 110


app= Flask(__name__)
app.config['MONGO_URI']= 'mongodb://localhost:{PORT_MONGO}/proyecto'.format(PORT_MONGO=PORT_MONGO)

mongo= PyMongo(app)


db_users=mongo.db.users
db_clubs=mongo.db.clubs

#           ______________________________________
#_________/ User querries

#___________GET_________________

@app.route('/users', methods=['GET'])
def get_users():

    users=[]

    for doc in db_users.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'user': doc['user'],
            'names':doc['names'],
            'password':doc['password'],
            'lastnames':doc['lastnames'],
            'section':doc['section'],
            'isAdmin':doc['isAdmin']
        })
    
    return users

"""
It takes a user id, finds the user in the database, and returns the user's information.
:return: A JSON object with the user's information.

Body example:
    {
    "id":"632f4b12b91fa067007722a6"
    }
"""
@app.route('/users/getUser/', methods=['GET'])
def get_user():

    user_id=request.json['id']
    doc=db_users.find_one({'_id':ObjectId(user_id)})

    return jsonify({
                    '_id':str(ObjectId(doc['_id'])),
                    'names': doc['names'],
                    'user':doc['user'],
                    'password':doc['password'],
                    'lastnames':doc['lastnames'],
                    'section':doc['section'],
                    'isAdmin':doc['isAdmin'],
                    })

#___________POST_________________

"""
    {
    "user":"santamix",
    "password":"santa",
    "names":"josue gabriel",
    "lastnames":"santamaria ramirez",
    "section":"12-1",
    "isAdmin":"true"
    }
"""
@app.route('/users/CreateUser', methods=['POST'])
def create_user():

    user=request.json['user'] 
    password=request.json['password'] 
    names=request.json['names'] 
    lastnames=request.json['lastnames']  
    section=request.json['section']  
    is_admin=request.json['isAdmin'] 


    new_user=db_users.insert_one({
        'user':user,
        'password':password,
        'names':names,
        'lastnames':lastnames,
        'section':section,
        'isAdmin':is_admin
        })

    user = db_users.find_one({"_id": ObjectId(new_user.inserted_id)})
    
    return jsonify({
                    '_id':str(ObjectId(user['_id'])),
                    'names': user['names'],
                    'lastnames':user['lastnames'],
                    'section':user['section'],
                    'isAdmin':user['isAdmin'],
                    })

"""
    {
    "user":"santamix",
    "password":"santa"
    }
"""
@app.route('/users/userLogin', methods=['POST'])
def get_user_login():

    user=request.json['user']
    password=request.json['password']
    my_query={"user":user}
    
    docs=db_users.find(my_query)
    
    for doc in docs:

        if doc['password']==password and doc['isAdmin']==False:

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

            abort(404)

    return response

"""
    {
    "user":"santamix",
    "password":"santa"
    }
"""
@app.route('/users/adminLogin', methods=['POST'])
def get_admin_login():

    user=request.json['user']
    password=request.json['password']
    my_query={"user":user}
    
    docs=db_users.find(my_query)
    
    for doc in docs:

        if doc['password']==password and doc['isAdmin']==True:

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

            abort(404)

    return response


#___________DELETE_________________

@app.route('/users/deleteUser', methods=['DELETE'])
def delete_user():

    user_id=request.json['id']
    db_users.delete_one({'_id': ObjectId(user_id)})

    return jsonify({'msg':
                    'User deleted'})


#           _______________________________________
#_________/ Club querries

#___________GET_________________

@app.route('/clubs', methods=['GET'])
def get_clubs():

    clubs=[]

    for doc in db_clubs.find():
        clubs.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'category':doc['category'],
            'followers':doc['followers']    
        })

    return jsonify(clubs)

"""
    {
    "id":"632f4b12b91fa067007722a6"
    }
"""
@app.route('/clubs/myClubs/<id>', methods=['GET'])
def my_clubs(id):
    clubs=[]
    
    responses=db_clubs.find({'followers':{'$elemMatch':{'idU':id}}})
    print(responses)
    for doc in responses:
        clubs.append({
                '_id':str(ObjectId(doc['_id'])),
                'name':doc['name'],
                'category':doc['category'],
                'followers':doc['followers']})

    return jsonify(clubs)

#___________POST_________________

"""
    {
    "name":"Dibujo",
    "category":"Arte",
    "followers":[
                {"idU":"1234", "nameU":"josue"},
                {"idU":"12345", "nameU":"julio"},
                {"idU":"123124", "nameU":"mario"}
                ]
    }  
"""

@app.route('/clubs/CreateClub', methods=['POST'])
def create_club():
    name = request.json['name']
    category = request.json['category']
    id_user = request.json['idUser']

    new_club=db_clubs.insert_one(
                    {'name':name,
                    'category':category,
                    'followers':[{'idU': id_user}]})

    if new_club :
        response = {'message':'exito'}

    else:
        response = {'message':'error'}

    return response


#___________PUT_________________

#Metodo para desuscribirse de un club
@app.route('/clubs/updateDesuscrip', methods=['PUT'])
def update_desuscrip():
    
    club_id=request.json['id']
    user_id=request.json['idU']
    
    db_clubs.update_one({'_id':ObjectId(club_id)},{'$pull':{'followers':{'idU':user_id}}})
    return jsonify({'msg': 'User updated'})

#Metodo para suscribirse a un club  
@app.route('/clubs/updateSuscrip', methods=['PUT'])
def update_suscrip():
    
    club_id=request.json['id']
    user_id=request.json['idU']
    
    db_clubs.update_one({'_id':ObjectId(club_id)},{'$push':{'followers':{'idU':user_id}}})
    return jsonify({'msg': 'User updated'})

#___________DELETE_________________

"""
    {
    "id":"632f8dbbc09c9bb365a1e955"
    }
"""
@app.route('/clubs/deleteClub', methods=['DELETE'])
def delete_club():

    club_id=request.json['id']

    db_clubs.find_one_and_delete({'_id': ObjectId(club_id)})
    
    return jsonify({'msg':'Club deleted'})

#      ________________________________________
#_____/Special queries

#1.____________________________________________
# Cantidad total de clubes distintos
# sugeridos por los estudiantes, según la 
# categoría. Por ejemplo: 30 clubes de arte,
# 10 de deportes, etc.

@app.route('/clubs/countByCategory', methods=['GET'])
def get_club_count_by_category():

    categories = ["Deportes","Artes","Idiomas","Matematicas","Ciencias","Manualidades"]

    category_count = []

    #Count existing categories
    for doc in db_clubs.aggregate([
        {"$group" : 
            { "_id" : "$category",
            "count" : {"$sum" : 1}}
        }]):

        category_count.append({
            'category':doc['_id'],
            'count':doc['count']
        })

    present_categories = []

    #Evaluate missing categories
    for category in categories:
        for count in category_count:
            if category in count.values():
                present_categories.append(category)

    #Add missing categories
    if present_categories != []:
        for category in categories:
            if category not in present_categories:
                category_count.append({
                'category':category,
                'count':0
            })
    
    return jsonify(category_count)


#2.____________________________________________
#Mostrar el nombre completo y la cantidad de
#clubes sugeridos para los tres estudiantes
#que más sugerencias hayan realizado.

@app.route('/clubs/usersTopSubs', methods=['GET'])
def user_top_subs():
    
    users=[]
    for doc in db_users.find({'isAdmin': False}):
        users.append({
            '_id':str(ObjectId(doc['_id'])),          
            'names':doc['names'],
            'lastnames':doc['lastnames'],
        })

    apps=[]
    for user in users:
        responses=db_clubs.find({'followers':{'$elemMatch':{'idU':user['_id']}}})
        count_appeared=0
        for doc in responses:
            count_appeared+=1
            apps.append({
                '_id':str(ObjectId(doc['_id'])),
                'name':doc['name'],
                'category':doc['category'],
                'followers':doc['followers']})
        
        user['count']=count_appeared
    orden=sorted(users, key=lambda x: x['count'], reverse=True)
    i=0
    top=[]
    for doc5 in orden:
        if doc5 and i<3:
            i+=1
            print(i)        
            top.append({
                '_id':str(ObjectId(doc5['_id'])),          
                'names':doc5['names'],
                'lastnames':doc5['lastnames'],
                'count':doc5['count']
                    
                })

    return jsonify(top)

#3.____________________________________________
#  Top 5 de clubes sugeridos. Se debe mostrar una
#  lista de los cinco clubes más solicitados,
#  incluyendo el nombre del club, la categoría
#  y la cantidad de veces que fue sugerido.

@app.route('/clubs/getClubsTop5', methods=['GET'])
def get_top_5_clubs():

    clubs=[]

    for doc in db_clubs.aggregate([
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

        doc3=db_clubs.find_one({'_id':ObjectId(doc2['_id'])})
        
        if doc3 and i<5:  

            i+=1        
            top.append({
                    '_id':str(ObjectId(doc3['_id'])),
                    'name':doc3['name'],
                    'category':doc3['category'],
                    'followers':doc2['followers']
                    
                })
    
    return jsonify(top)


#4.____________________________________________
#Bottom 3 de clubes sugeridos. Se debe mostrar una
#lista de los tres clubes menos solicitados,
#incluyendo el nombre del club, la categoría y 
#la cantidad de veces que fue sugerido.
@app.route('/clubs/getClubsBtt3', methods=['GET'])
def get_bottom_3_clubs():

    clubs=[]
    for doc in db_clubs.aggregate([
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

        doc3=db_clubs.find_one(
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

#______________________________________________________

if __name__ == '__main__':
    app.run(host='localhost',port=PORT,debug=True)

