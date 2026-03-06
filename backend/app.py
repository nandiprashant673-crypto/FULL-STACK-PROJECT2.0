import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# CORS allows your Netlify frontend to talk to this Render backend
CORS(app)

DB_PATH = 'database.db'

def init_db():
    """Creates the database and table if they don't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return jsonify({"message": "Backend is running successfully!"})

@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')

        if not name or not email:
            return jsonify({"error": "Name and Email are required"}), 400

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO students (name, email) VALUES (?, ?)', (name, email))
        conn.commit()
        conn.close()

        return jsonify({"message": "Student data saved successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/students', methods=['GET'])
def get_students():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM students')
    rows = cursor.fetchall()
    conn.close()
    
    students = [{"id": r[0], "name": r[1], "email": r[2]} for r in rows]
    return jsonify(students)

if __name__ == '__main__':
    init_db()
    # Use the PORT provided by Render or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

