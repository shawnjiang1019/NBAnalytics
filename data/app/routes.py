from flask import Blueprint, jsonify
from balldontlie import BalldontlieAPI

api = BalldontlieAPI(api_key="8fe8baa6-52c1-4974-ac38-5e501b2e5368")




bp = Blueprint('routes', __name__)

@bp.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask Backend!"})



@bp.route('/api/data', methods=['GET'])
def get_data():
    sample_data = api.nba.players.get(19)
    
    # Assuming sample_data is a custom object, you might need to convert it to a dictionary
    # For example, if sample_data has a method or attribute to convert it to a dictionary:
    #data_dict = sample_data.to_dict()  # or similar method
    
    # If sample_data is already a dictionary or JSON-serializable, you can skip the above step
    # and directly use jsonify(sample_data)
    print(sample_data.json())
    return jsonify(sample_data.json())
