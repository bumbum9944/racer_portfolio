from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
import pymysql
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity)
from config import Config


app = Flask(__name__)
api = Api(app)

#jwt 설정
app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
jwt = JWTManager(app)  

#cors 설정
cors = CORS(app)

# db 연결
db = pymysql.connect(
    user = 'root',
    passwd = '',
    host = '127.0.0.1',
    port = 3306,
    db = 'elice_pjt1',
    charset = 'utf8'
)

cursor = db.cursor()

parser = reqparse.RequestParser()
parser.add_argument("email")
parser.add_argument("password")
parser.add_argument("name")

test_db = dict()

class Account(Resource):
    def post(self):
        args = parser.parse_args()

        # 이름이 없으면 로그인
        if args['name'] == None:

            sql = "SELECT email, password FROM user WHERE email=%s;"

            cursor.execute(sql, (args['email'], ))
            result = cursor.fetchone()


            # 유저가 존재하지 않을 경우
            if result == None:
                return jsonify(status="success", result="존재하지 않는 유저입니다.")
            else:
                # 유저가 있다면 비밀번호 체크
                if bcrypt.checkpw(args['password'].encode('utf-8'), result[1].encode('utf-8')):
                
                    access_token = create_access_token(identity=args['email'])

                    result = {
                        'msg': '로그인 성공',
                        'token': access_token
                    }
                    return jsonify(status="success", result=result)
                else:
                    return jsonify(status="success", result="비밀번호를 확인해주세요")
        else:
            sql = """
            INSERT INTO user (name, email, password) 
            VALUES (%s, %s, %s);
            """
            # 비밀번호 암호화
            password = args['password']
            encrypted_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

            cursor.execute(sql, (args['name'], args['email'], encrypted_password, ))
            db.commit()

            sql = "SELECT email FROM user WHERE email=%s;"
            cursor.execute(sql, (args['email'], ))
            result = cursor.fetchone()
            
            return jsonify(status = "success", result = result) 

# api 라우팅 등록
api.add_resource(Account, '/account')

if __name__ == '__main__':
    app.run(debug=True)