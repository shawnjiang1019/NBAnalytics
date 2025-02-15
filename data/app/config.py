from flask import Blueprint, jsonify
from balldontlie import BalldontlieAPI

api = BalldontlieAPI(api_key="YOUR_API_KEY")




bp = Blueprint('routes', __name__)

@bp.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask Backend!"})

@bp.route('/api/data', methods=['GET'])
def get_data():
    sample_data = api.nba.players.get(19)
    return jsonify(sample_data)
