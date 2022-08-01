from flask import Flask
from flask_cors import CORS
import os
app = Flask(__name__)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
# cors = CORS(app, resources={r"/foo": {s"origins": "http://localhost:4200"}})
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

