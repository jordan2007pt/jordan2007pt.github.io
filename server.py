from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

CONTENT_FILE = 'content.txt'
IMAGE_FOLDER = 'images'

@app.route('/content', methods=['GET', 'POST'])
def content():
    if request.method == 'GET':
        if os.path.exists(CONTENT_FILE):
            with open(CONTENT_FILE, 'r', encoding='utf-8') as file:
                return file.read()
        return ''
    elif request.method == 'POST':
        content = request.json.get('content', '')
        with open(CONTENT_FILE, 'w', encoding='utf-8') as file:
            file.write(content)
        return '', 200

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    if file:
        filepath = os.path.join(IMAGE_FOLDER, file.filename)
        file.save(filepath)
        return '', 200
    return '', 400

@app.route('/images/<filename>')
def images(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == '__main__':
    os.makedirs(IMAGE_FOLDER, exist_ok=True)
    app.run(debug=True)
