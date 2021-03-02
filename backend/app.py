from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
import pymysql
from werkzeug.utils import secure_filename
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

parser = reqparse.RequestParser()
parser.add_argument("email")
parser.add_argument("password")
parser.add_argument("name")


class Account(Resource):

    def get(self):

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        sql = f'''
        SELECT name, email
        FROM user
        '''

            # sql = f'''
            #     SELECT u.name, u.email
            #     p.introduction, p.image 
            #     FROM user AS u
            #     INNER JOIN profile AS p
            #     ON u.id=p.user;
            # '''

        cursor.execute(sql)
        result = cursor.fetchall()
        db.close()

        return jsonify(status = "success", result = result) 


    def post(self):
        args = parser.parse_args()

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        # 이름이 없으면 로그인
        if args['name'] == None:

            sql = "SELECT id, password FROM user WHERE email=%s;"

            cursor.execute(sql, (args['email'], ))
            res = cursor.fetchone()
            db.close()

            # 유저가 존재하지 않을 경우
            if res == None:
                return jsonify(status="success", result="존재하지 않는 유저입니다.")
            else:
                # 유저가 있다면 비밀번호 체크
                if bcrypt.checkpw(args['password'].encode('utf-8'), res[1].encode('utf-8')):
                    
                    access_token = create_access_token(identity=res[0])

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
            db.close()

            return jsonify(status = "success", result = result) 

api.add_resource(Account, '/account')

parser.add_argument("degree")
parser.add_argument("schoolName")
parser.add_argument("major")

parser.add_argument("description")

parser.add_argument("startDate")
parser.add_argument("endDate")
parser.add_argument("acquisitionDate")
parser.add_argument("issuer")


class Post(Resource):

    @jwt_required()
    def get(self, category, user_id=None):
        args = parser.parse_args()

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        # user_id가 없으면 나의 정보 요청으로 인식
        if user_id == None:
            current_user_id = get_jwt_identity()
            sql=f'SELECT * FROM {category} WHERE user="{current_user_id}";'
            cursor.execute(sql)
            
            result = cursor.fetchall()
            
        else: # 다른 유저 정보 요청
            pass
        
        db.close()

        return jsonify(status = "success", result = result)


    @jwt_required()
    def post(self, category):
        args = parser.parse_args()
        current_user_id = get_jwt_identity()

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        # 각 카테고리 별로 기능 구현
        if category == 'education':
            sql = '''
            INSERT INTO education (degree, schoolName, major, user)
            VALUES (%s, %s, %s, %s);
            '''
            cursor.execute(sql, (args['degree'], args['schoolName'], args['major'], current_user_id, ))
        elif category == 'award':
            sql = '''
            INSERT INTO award (name, description, user)
            VALUES (%s, %s, %s);
            '''
            cursor.execute(sql, (args['name'], args['description'], current_user_id, ))
        elif category == 'project':
            sql = '''
            INSERT INTO project (name, description, startDate, endDate, user)
            VALUES (%s, %s, %s, %s, %s);
            '''
            startDate = args['startDate'].split('T')[0]
            endDate = args['endDate'].split('T')[0]

            cursor.execute(sql, (args['name'], args['description'], startDate, endDate, current_user_id, ))
        elif category == 'license':
            sql = '''
            INSERT INTO license (name, issuer, acquisitionDate,  user)
            VALUES (%s, %s, %s, %s);
            '''
            acquisitionDate = args['acquisitionDate'].split('T')[0]
            cursor.execute(sql, (args['name'], args['issuer'], acquisitionDate, current_user_id, ))
        
        db.commit()

        sql = f'SELECT * FROM {category} WHERE user={current_user_id};'
        cursor.execute(sql)
        res = cursor.fetchall()
        db.close()
        return jsonify(status = 'success', msg = '저장 성공', res=res)

    @jwt_required()
    def delete(self, category, post_id):

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        current_user_id = get_jwt_identity()

        cursor.execute(f'DELETE FROM {category} WHERE id={post_id}')
        db.commit()

        cursor.execute(f'SELECT * FROM {category} WHERE user={current_user_id};')
        res = cursor.fetchall()
        db.close()

        return jsonify(status = 'success', msg="삭제 완료", res=res)



    @jwt_required()
    def put(self, category, post_id):
        args = parser.parse_args()
        current_user_id = get_jwt_identity()

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        if category == 'education':
            sql = f'''
                UPDATE {category} 
                SET schoolName="{args['schoolName']}", 
                major="{args['major']}",
                degree="{args['degree']}"
                WHERE id={post_id}
            '''
        elif category == 'award':
            sql = f'''
                UPDATE {category} 
                SET name="{args['name']}", 
                description="{args['description']}"
                WHERE id={post_id}
            '''
        elif category == 'project':
            startDate = args['startDate'].split('T')[0]
            endDate = args['endDate'].split('T')[0]
            sql = f'''
                UPDATE {category} 
                SET name="{args['name']}", 
                description="{args['description']}",
                startDate="{startDate}",
                endDate="{endDate}"
                WHERE id={post_id}
            '''
        elif category == 'license':
            acquisitionDate = args['acquisitionDate'].split('T')[0]
            sql = f'''
                UPDATE {category} 
                SET name="{args['name']}", 
                issuer="{args['issuer']}",
                acquisitionDate="{acquisitionDate}"
                WHERE id={post_id}
            '''

        cursor.execute(sql)
        db.commit()

        cursor.execute(f'SELECT * FROM {category} WHERE user="{current_user_id}";')
        res = cursor.fetchall()
        db.close()

        return jsonify(status = 'success', msg="수정 완료", res=res)
        
        
# api 라우팅 등록
api.add_resource(Post, '/post/<category>', '/post/<category>/<post_id>', '/user/<user_id>/post/<category>')


if __name__ == '__main__':
    app.run(debug=True)