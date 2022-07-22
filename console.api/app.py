from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:4200"}})
app.config['CORS_HEADERS'] = 'Content-Type'

