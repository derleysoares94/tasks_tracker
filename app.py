import json 
import re
from flask import Flask, jsonify, render_template, request, redirect, url_for

from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)