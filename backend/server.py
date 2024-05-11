from flask import Flask, request, jsonify
from gptSearch import wait_for_run_completion
from imgSearch import getNameFromURL


app = Flask(__name__)

@app.route('/SearchIMG', methods=['POST'])
def SearchIMG():
    url = request.json["imgURL"]
    message = getNameFromURL(url)
    result = wait_for_run_completion(msg=message)
    return jsonify(result)

@app.route('/Search', methods=['POST'])
def Search():
    message = request.json["prompt"]
    result = wait_for_run_completion(msg=message)
    return jsonify(result)

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')