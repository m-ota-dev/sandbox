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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)