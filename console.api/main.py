

from distutils.log import FATAL
import email
from flask import Flask, jsonify, request
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
from db import mysql
from flask_bcrypt import Bcrypt
@app.route('/users', methods=['GET'])
def hello_world():
    print('hello!!! he he he ')
    data = ['Apple', 'Orange', 'Grape']
    resp = jsonify(data)
    return resp


@app.route('/login', methods=['POST'])
def login():
        try:
            json_data = request.json
            userEmail = json_data['email']
            userPassword = json_data['password']
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM user_table WHERE email=%s", userEmail)
            row = cursor.fetchone()
            print('+++++++++++++++++>the input Email is ', row[3])
            # if row and check_password_hash(row[3], userPassword):
            print('User Password is -----> ', userPassword)
            print('table Password is -----> ', row[3])
            if (row and row[3] == userPassword):
            # if row and check_password_hash(row[3], userPassword):
                status = True
                print ('success !!!!!!!!!!!!!!!!!!!!')
            else:
                status = False
                print('Wrong password!!!!!!!!!!!!!!!!!!')
            print('status is ------>', status)
            return jsonify({'result': status})
            # print('==============> this is testing')
            # print('++++> ', row)
            # return jsonify(row)
                # if user and check_password_hash(user[3], password):
                # 	# session['logged_in'] = True
                # 	status = True
                # else:
                # 	status = False
                # return jsonify({'result': status})
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            conn.close()


@app.route('/test')
def test():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        userEmail = 'arkar@gmail.com'
        cursor.execute("SELECT * FROM user_table WHERE email=%s", userEmail)	
        row = cursor.fetchall()
        print('==============> this is testing')
        print('++++> ', row)
        return jsonify(row)
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


        
       


if __name__ == '__main__':
    app.run(debug=True)