from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
# cors = CORS(app, resources={r"/foo": {s"origins": "http://localhost:4200"}})
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

