from flask import Flask, request, jsonify, abort
from flask_pymongo import PyMongo, ObjectId
import os 

PORT = os.getenv("PORT")
PORT_MONGO  = os.getenv("PORT_MONGO")

# PORT = 5000
# PORT_MONGO = 110


app= Flask(__name__)
app.config['MONGO_URI']= 'mongodb://localhost:{PORT_MONGO}/proyecto'.format(PORT_MONGO=PORT_MONGO)

mongo= PyMongo(app)

db_users=mongo.db.users
db_clubs=mongo.db.clubs

#           ______________________________________
#_________/ USER QUERIES 

#___________GET_________________
"""
Gets every user on the database.
:return: A list of JSON objects with the users information.
"""
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
It takes a JSON object from the request, and inserts it into the database
:return: The user that was created.

Body example:
    {
    "user":"santamix",
    "password":"santa",
    "names":"josue gabriel",
    "lastnames":"santamaria ramirez",
    "section":"12-1",
    "isAdmin":"true"
    }
"""
@app.route('/users/createUser', methods=['POST'])

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
It takes a user and password from a POST request, and then it searches the database for a user with
the same user and password. If it finds one, it returns a JSON with the user's information. If it
doesn't find one, it returns a 404 error.
:return: A JSON object with the user's information.

Body example:
    {
    "user":"santamix",
    "password":"santa"
    }
"""
@app.route('/users/userLogin', methods=['POST'])
def user_login():

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
It takes a admin's user and password from a POST request, and then it searches the database for a user with
the same user and password. If it finds one, it returns a JSON with the user's information. If it
doesn't find one, it returns a 404 error.
:return: A JSON object with the user's information.

Body example:
    {
    "user":"santamix",
    "password":"santa"
    }
"""
@app.route('/users/adminLogin', methods=['POST'])
def admin_login():

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

"""
It takes the user_id from the request, finds the user in the database, and deletes it
:return: The return value of the function is a json object.
"""
@app.route('/users/deleteUser', methods=['DELETE'])
def delete_user():

    user_id=request.json['id']
    db_users.delete_one({'_id': ObjectId(user_id)})

    return jsonify({'msg':
                    'User deleted'})


#           _______________________________________
#_________/ CLUB QUERIES

#___________GET_________________
"""
It takes all the documents in the collection 'clubs' and returns them as a JSON object.
:return:JSON objects with the clubs information.
"""
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
It returns a list of clubs that the user with the id 'id' is following.

:param id: the id of the user (must be a hex string)
:return: A list of clubs that the user is following.
"""
@app.route('/clubs/myClubs/<id>', methods=['GET'])
def get_my_clubs(id):
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
It creates a new club in the database, and adds the user who created it to the list of followers.
:return: The response is a JSON object if the creation is succesful, error 500 otherwise.

Body example:
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
@app.route('/clubs/createClub', methods=['POST'])
def create_club():
    name = request.json['name']
    category = request.json['category']
    id_user = request.json['idUser']

    existing_clubs = get_clubs()

    for club in existing_clubs:
        if name and category in club.values():
            club_id=club["_id"]
            db_clubs.update_one({'_id':ObjectId(club_id)},{'$push':{'followers':{'idU':id_user}}})
            return jsonify({'msg': 'club already exists'})

    new_club=db_clubs.insert_one(
                    {'name':name,
                    'category':category,
                    'followers':[{'idU': id_user}]})

    if new_club :
        response = {'message':'exito'}

    else:
        abort(500)

    return response


#___________PUT_________________
"""
It takes the id of a club and the id of a user and adds the user to the club's followers list.
:return: The return value is a JSON object with a single key-value pair. The key is msg and the
value is Club updated.
"""
@app.route('/clubs/subscribe', methods=['PUT'])
def susbcribe_club():
    
    club_id=request.json['id']
    user_id=request.json['idU']
    
    db_clubs.update_one({'_id':ObjectId(club_id)},{'$push':{'followers':{'idU':user_id}}})
    return jsonify({'msg': 'Club updated'})

"""
It takes a club_id and a user_id and removes the user_id from the followers array of the club_id.
:return: The return value is a JSON object with a single key-value pair. The key is msg and the
value is Club updated.
"""
@app.route('/clubs/unsubscribe', methods=['PUT'])
def unsubscribe_club():
    
    club_id=request.json['id']
    user_id=request.json['idU']
    
    db_clubs.update_one({'_id':ObjectId(club_id)},{'$pull':{'followers':{'idU':user_id}}})
    return jsonify({'msg': 'Club updated'})


#___________DELETE_________________

"""
It deletes a club from the database
:return: The return value is a JSON object with a message.

Body example:
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
#_____/SPECIAL QUERIES

#1.____________________________________________
# Cantidad total de clubes distintos
# sugeridos por los estudiantes, según la 
# categoría. Por ejemplo: 30 clubes de arte,
# 10 de deportes, etc.

@app.route('/clubs/countByCategory', methods=['GET'])
def get_club_count_by_category():

    categories = ["Deportes","Artes","Idiomas","Matematicas","Ciencias","Manualidades"]
    category_count = []

    #Count for existing categories
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

@app.route('/users/top3subs', methods=['GET'])
def top_3_subs():
    
    users=[]

    #Get non-admin users
    for club in db_users.find({'isAdmin': False}):
        users.append({
            '_id':str(ObjectId(club['_id'])),          
            'names':club['names'],
            'lastnames':club['lastnames'],
        })

    #Add amount of subscriptions
    for user in users:
        user_clubs=db_clubs.find({'followers':{'$elemMatch':{'idU':user['_id']}}})
        count_appeared=0
        for club in user_clubs:
            count_appeared+=1
        user['count']=count_appeared

    #Sort users
    users=sorted(users, key=lambda x: x['count'], reverse=True)

    if len(users) > 3:
        users = users[:3]
     
    return jsonify(users)

#3.____________________________________________
#  Top 5 de clubes sugeridos. Se debe mostrar una
#  lista de los cinco clubes más solicitados,
#  incluyendo el nombre del club, la categoría
#  y la cantidad de veces que fue sugerido.

@app.route('/clubs/top5', methods=['GET'])
def get_top_5_clubs():

    clubs_follower_count=[]

    #Get follower count for each club
    for doc in db_clubs.aggregate([
        {"$project":{"count":{"$size":"$followers"}}}
        ]):

        clubs_follower_count.append({
            '_id':str(ObjectId(doc['_id'])),
            'followers':doc['count']         
        })
    
    #Sort the count
    clubs_follower_count=sorted(clubs_follower_count, key=lambda x: x['followers'], reverse=True)

    top_5=[]
    i=0

    #Get top 5 clubs by id
    for follower_count in clubs_follower_count:
        club=db_clubs.find_one({'_id':ObjectId(follower_count['_id'])})
        if club and i<5:  
            i+=1        
            top_5.append({
                    '_id':str(ObjectId(club['_id'])),
                    'name':club['name'],
                    'category':club['category'],
                    'followers':follower_count['followers']
                })
    
    return jsonify(top_5)


#4.____________________________________________
#Bottom 3 de clubes sugeridos. Se debe mostrar una
#lista de los tres clubes menos solicitados,
#incluyendo el nombre del club, la categoría y 
#la cantidad de veces que fue sugerido.

@app.route('/clubs/bottom3', methods=['GET'])
def get_bottom_3_clubs():

    clubs_follower_count=[]

    #Get follower count for each club
    for doc in db_clubs.aggregate([
        {"$project":{"count":
        {"$size":"$followers"}
        }}]):

        clubs_follower_count.append({
            '_id':str(ObjectId(doc['_id'])),
            'followers':doc['count'] #Hacer un conteo en el fe          
        })
    
    #Sort the count
    clubs_follower_count=sorted(clubs_follower_count, key=lambda x: x['followers'])

    bottom_3=[]
    i=0

    #Get bottom 3 clubs by id
    for follower_count in clubs_follower_count:  
        club=db_clubs.find_one({'_id':ObjectId(follower_count['_id'])})
        if club and i<3: 
            i+=1        
            bottom_3.append(
                {'_id':str(ObjectId(club['_id'])),
                    'name':club['name'],
                    'category':club['category'],
                    'followers':follower_count['followers']                    
                })  

    return jsonify(bottom_3)

#______________________________________________________

if __name__ == '__main__':
    app.run(host='localhost',port=PORT,debug=True)

