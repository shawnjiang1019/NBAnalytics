from flask import Blueprint, jsonify

bp = Blueprint('routes', __name__)

@bp.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask Backend!"})

@bp.route('/api/data', methods=['GET'])
def get_data():
    sample_data = {"key": "value"}
    return jsonify(sample_data)
