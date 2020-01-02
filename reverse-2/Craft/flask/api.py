from flask import Flask
from flask_restplus import Resource, Api
from flask import request


app = Flask(__name__)

@app.route("/licence")
def licence_token() -> str:
    """
    check validity of request.args.user_licence value
    and return a token
    """
    user_licence = request.args.get("user_licence")
    if user_licence != "DidUReallyBelieveThatItWouldBeThatEz?!-_-_":
        return ""
    return "ThisIsAWrongToken,StopTryingToHaveACorrectLicenceAndPathTheBinary"

if __name__ == '__main__':
    app.run(port='4444', debug=True)
