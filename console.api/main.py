

from traceback import print_tb
from flask import Flask, jsonify, request, session
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
from db import mysql
from flask_bcrypt import Bcrypt
import pymysql
from datetime import datetime
import dateutil.parser
from pytz import timezone
from flask_session import Session
import time

# @app.route('/users', methods=['GET'])
# def hello_world():
#     print('hello!!! he he he ')
#     data = ['Apple', 'Orange', 'Grape']
#     resp = jsonify(data)
#     return resp


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
            print('+++++++++++++++++>the password is ', row[3])
            # if row and check_password_hash(row[3], userPassword):
            print('User Password is -----> ', userPassword)
            print('table Password is -----> ', row[3])
            if (row and row[3] == userPassword):
            # if row and check_password_hash(row[3], userPassword):
                status = True
                role = row[5]
                userId = row[0]
                data = [status, role, userId]
                print ('success !!!!!!!!!!!!!!!!!!!!')
            else:
                status = False
                role = row[5]
                print('Wrong password!!!!!!!!!!!!!!!!!!')
            print('data is ------>', data)
            return jsonify( data)
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            conn.close()


@app.route('/users', methods=['GET'])
def users():
        if request.method == 'GET':
            try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                #cursor.execute("SELECT id, name, email, phone, dob, create_user_id, created_at, updated_at, address FROM user_table")
                cursor.execute("SELECT * FROM user_table")
                rows = cursor.fetchall()
                
                resp = jsonify(rows)
                resp.status_code = 200
                print(rows)
                return resp
            except Exception as e:
                print(e)
            finally:
                cursor.close() 
                conn.close()


@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_table WHERE id=%s", (id))
        conn.commit()
        resp = jsonify('User deleted successfully!')
        resp.status_code = 200
        print('Deleted the Row')
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/search', methods=['POST'])
def search():
    try:
        json_data = request.json
        # arr = json_data['arr']
        print('=====> search ')
        userEmail = json_data['email']
        userName = json_data['name']
        userDob = json_data['date']
        conn = mysql.connect()
        cursor = conn.cursor()
        if(userName and userEmail and userDob):
            #sql = "SELECT id, name, email, create_user_id, phone, dob, address, created_at, updated_at FROM user_table WHERE name LIKE %s and email LIKE %s;"
            sql = "SELECT * FROM user_table WHERE name LIKE %s or email LIKE %s or dob LIKE %s;"
            data = (userName + '%', userEmail + '%', userDob + '%')
        elif(userName and userEmail):
            sql = "SELECT * FROM user_table WHERE name LIKE %s or  email LIKE %s ;"
            data = (userName + '%', userEmail + '%')
        elif(userName):
            sql = "SELECT id, name, email, create_user_id, phone, dob,address, created_at, updated_at FROM user_table WHERE  name LIKE %s ;"
            # cursor.execute("SELECT * FROM user_table")
            data = (userName + '%')
        elif(userEmail):
            sql = "SELECT * FROM user_table WHERE  email LIKE %s ;"
            data = (userEmail + '%')
        elif(userDob):
            sql = "SELECT * FROM user_table WHERE  dob LIKE %s ;"
            data = (userDob + '%')
        cursor.execute(sql, data)
        rows = cursor.fetchall()
        print(rows)
        return jsonify(rows)
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/create', methods=['POST'])
def user_create():
    try:
        json = request.json
        _name = json['name']
        _email = json['email']
        _password = json['password']
        _phone = json['phone']
        _address = json['address']
        _select = json['type']
        print('=====> check point')
        _raw_dob = json['dob']
        arr_date = _raw_dob.split()
        print('====>', arr_date)
        str_dob = '{} {} {}'.format(arr_date[1], arr_date[2], arr_date[3])
        print('=====> is str_dob', str_dob)
        _dob = datetime.strptime(str_dob, "%b %d %Y")
        print('------>', _dob)
        now = datetime.now()
        current_time = now.strftime("%Y-%m-%d")
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_table")
        rows = cursor.fetchall()
        last_row = rows[len(rows)-1]
        _id = last_row[0] + 1
        
        if request.method == 'POST':
            _hashed_password = _password
            _profile = 'Just a profile'
            _create_user_id = '1'
            _updated_user_id = '1'
            _created_at = current_time
            _updated_at = current_time
            sql = "INSERT INTO user_table(id, name, email, password, type, phone, address, profile, create_user_id, updated_user_id, created_at, updated_at, dob) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            data = (_id, _name, _email, _hashed_password, _select, _phone, _address, _profile, _create_user_id, _updated_user_id, _created_at, _updated_at, _dob)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('User added successfully!')
            resp.status_code = 200
            return resp
        else:
            return False
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/user/<int:id>', methods=['get'])
def user(id):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            # cursor.execute("SELECT id, name, email, password, type, phone, address, dob, FROM user_table WHERE id=%s;", id)
            cursor.execute('SELECT id, name, email, type, phone, address, dob FROM user_table WHERE id=%s;', id)
            row = cursor.fetchone()
            resp = jsonify(row)
            resp.status_code = 200
            return resp
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            conn.close()

@app.route('/update/<int:id>', methods=['PUT'])
def update_user(id):
        try:
            json = request.json
            _id = json['id']
            _name = json['name']
            _email = json['email']
            # _password = json['password']
            _phone = json['phone']
            _address = json['address']
            _select = json['type']
            _raw_dob = json['dob']
            arr_date = _raw_dob.split()
            str_dob = '{} {} {}'.format(arr_date[1], arr_date[2], arr_date[3])
            _dob = datetime.strptime(str_dob, "%b %d %Y")
            now = datetime.now()
            current_time = now.strftime("%Y-%m-%d")	
            _updated_at = current_time
            # validate the received values
            if request.method == 'PUT':
                #do not save password as a plain text
                # _hashed_password = generate_password_hash(_password)
                # save edits
                sql = "UPDATE user_table SET name=%s, email=%s, phone=%s, address=%s, type=%s, updated_at=%s,  dob=%s WHERE id=%s"
                data = (_name, _email, _phone, _address, _select, _updated_at, _dob, _id )
                conn = mysql.connect()
                cursor = conn.cursor()
                cursor.execute(sql, data)
                conn.commit()
                resp = jsonify('User updated successfully!')
                resp.status_code = 200
                return resp
            else:
                return not_found()
        except Exception as e:
            print(e)
        finally:
            cursor.close() 
            conn.close()


@app.route('/posts', methods=['GET'])
def posts():
        if request.method == 'GET':
            try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                #cursor.execute("SELECT id, name, email, phone, dob, create_user_id, created_at, updated_at, address FROM user_table")
                cursor.execute("SELECT * FROM post_table")
                rows = cursor.fetchall()
                resp = jsonify(rows)
                resp.status_code = 200
                return resp
            except Exception as e:
                print(e)
            finally:
                cursor.close() 
                conn.close()



@app.route('/postDelete/<int:id>', methods=['DELETE'])
def delete_post(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM post_table WHERE id=%s", (id))
        conn.commit()
        resp = jsonify('User deleted successfully!')
        resp.status_code = 200
        print('Deleted the Row')
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/postCreate', methods=['POST'])
def post_create():
    try:
        json = request.json
        _title = json['title']
        _description = json['description']
        _create_user_id = json['ownerId']
        now = datetime.now()
        current_time = now.strftime("%Y-%m-%d")	
        
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM post_table")
        rows = cursor.fetchall()
        last_row = rows[len(rows)-1]
        _id = last_row[0] + 1
        if _id and _title and _description and _create_user_id and request.method == 'POST':
            
            _status = '1'
            _updated_user_id = json['ownerId']
            _created_at = current_time
            _updated_at = current_time
            sql = "INSERT INTO post_table(id, title, description, status, create_user_id, updated_user_id, created_at, updated_at) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
            data = (_id, _title, _description, _status, _create_user_id, _updated_user_id, _created_at, _updated_at)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Post added successfully!')
            resp.status_code = 200
            return resp
        else:
            return False
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/postUpdate', methods=['PUT'])
def update_post():
        try:
            json = request.json
            _id = json['id']
            _title = json['title']
            _description = json['description']
            _updated_user_id = json['ownerId']
            now = datetime.now()
            current_time = now.strftime("%Y-%m-%d")	
           
            if request.method == 'PUT':
                #do not save password as a plain text
                # _hashed_password = generate_password_hash(_password)
                # save edits
                _status = '1'
                _updated_at = current_time
                sql = "UPDATE post_table SET title=%s, description=%s, updated_user_id=%s, updated_at=%s WHERE id=%s"
                data = (_title, _description, _updated_user_id, _updated_at, _id)
                conn = mysql.connect()
                cursor = conn.cursor()
                cursor.execute(sql, data)
                conn.commit()
                resp = jsonify('Post updated successfully!')
                resp.status_code = 200
                return resp
            else:
                return not_found()
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


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp

        
       


if __name__ == '__main__':
    app.run(debug=True)