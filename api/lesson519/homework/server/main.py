from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json

main = Flask(__name__)
CORS(main)


@main.route('/', methods=['POST', 'GET'])
def index():
    return jsonify({'message': 'failure', 'error': 'User not found.'}), 404


@main.route('/<name>', methods=["POST", "GET"])
def get_user(name):

    if not name:
        return 'Please provide a valid name!', 400

    with open('data.json', 'r') as file:
        data = json.load(file)

    users = []

    for el in data:
        if name == '':
            users.clear()
        if name.lower() in el.get('name'):
            users.append(el)

    if not users:
        return jsonify({'message': 'failure', 'error': 'User not found.'}), 404

    return jsonify({"message": "success", "users": users})


if __name__ == '__main__':
    main.run(host='0.0.0.0', port=81)
