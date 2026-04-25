from flask import Flask, request

app = Flask(__name__)

@app.get("/")
def home():
    return "Python server is running!"

@app.post("/submit")
def submit():
    data = request.json
    print("Received:", data)
    return {"status": "ok"}