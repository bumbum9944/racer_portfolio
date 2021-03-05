import os
import datetime
from flask import Flask, jsonify, redirect, send_from_directory
from flask_restful import Resource, Api, reqparse
import pymysql
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity)
from config import Config

UPLOAD_FOLDER = './static'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


app = Flask(__name__)
api = Api(app)


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


#jwt 설정
app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
jwt = JWTManager(app)  

#cors 설정
cors = CORS(app)

parser = reqparse.RequestParser()
parser.add_argument("email")
parser.add_argument("password")
parser.add_argument("name")
parser.add_argument("target")


parser.add_argument("code")


class Google(Resource):
    def get(self):
        return redirect(f'https://accounts.google.com/o/oauth2/auth?client_id={Config.GOOGLE_CLIENT_ID}&redirect_url={Config.GOOGLE_REDIRECT_URL}')
        

    def post(self):
        args = parser.parse_args()
        print(args)
        code = args['code']
        url = 'https://www.googleapis.com/oauth2/token'
        data = {
            'code': code,
            'client_id': Config.GOOGLE_CLIENT_ID,
            'client_secret': Config.GOOGLE_CLIENT_SECRET,
            'redirect_uri': Config.GOOGLE_REDIRECT_URL
        }

        return redirect(url, data)



api.add_resource(Google, '/auth/google', '/auth/google/callback')

class Account(Resource):

    def get(self, user_id=None):
        args = parser.parse_args()

        search_target = args["target"]

        db = pymysql.connect(
            user = 'root',
            passwd = '',
            host = '127.0.0.1',
            port = 3306,
            db = 'elice_pjt1',
            charset = 'utf8'
        )

        cursor = db.cursor()

        if search_target == None or search_target == 'all':

            sql = f'''
                SELECT u.id, u.name, u.email, p.id, 
                p.introduction, p.image 
                FROM user AS u
                INNER JOIN profile AS p
                ON u.id=p.user;
            '''
            cursor.execute(sql)
            result = cursor.fetchall()
        else:
            if len(search_target) > 1:
                sql = f'''
                    SELECT u.id, u.name, u.email, p.id, 
                    p.introduction, p.image 
                    FROM user AS u
                    INNER JOIN profile AS p
                    ON u.id=p.user
                    WHERE
                    u.name LIKE '%{search_target}%';
                '''

                cursor.execute(sql)
                result = cursor.fetchall()
                if len(result) == 0:
                    result = 'nothing'
            else:
                result = 'lack'

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
                        'token': access_token,
                        'currentUser': res[0]
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

            sql = "SELECT id FROM user WHERE email=%s;"
            cursor.execute(sql, (args['email'], ))
            user_id = cursor.fetchone()[0]

            sql = f'''
                INSERT INTO profile(user)
                VALUES({user_id});
            '''
            cursor.execute(sql)
            db.commit()

            db.close()

            return jsonify(status = "success", result = "회원가입 성공") 

api.add_resource(Account, '/account', '/account/<user_id>')

parser.add_argument("degree")
parser.add_argument("schoolName")
parser.add_argument("major")

parser.add_argument("description")

parser.add_argument("startDate")
parser.add_argument("endDate")
parser.add_argument("acquisitionDate")
parser.add_argument("issuer")

parser.add_argument("introduction")
parser.add_argument("past_image")
parser.add_argument("profile_image_change_mode")
parser.add_argument("profile_image", type=FileStorage, location='files')

class Post(Resource):

    def get(self, category, user_id):
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

        if category == 'profile':
            sql = f'''
                SELECT u.name, u.email, p.id, 
                p.introduction, p.image 
                FROM user AS u
                INNER JOIN profile AS p
                ON u.id=p.user
                WHERE u.id={user_id};
            '''
        else:
            sql=f'SELECT * FROM {category} WHERE user="{user_id}";'
        cursor.execute(sql)
        
        result = cursor.fetchall()
            
        
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
        elif category == 'profile':
            # 이전 프로필 이미지 파일 삭제
            past_image = args['past_image']
            profile = args['profile_image']
            profile_image_change_mode = args['profile_image_change_mode']
            

            if profile_image_change_mode == 'keep':
                sql = f'''
                    UPDATE {category}
                    SET
                    introduction='{args['introduction']}'
                    WHERE id={post_id};
                '''
            else:
                if past_image != 'null':
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], past_image))
                
                if profile_image_change_mode == 'delete':
                    file_name='null'
                else:
                    if profile and allowed_file(profile.filename):
                        nowDate = datetime.datetime.now()
                        file_name = secure_filename(nowDate.strftime('%Y-%m-%d %H%M%S') + profile.filename)
                        profile.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))

                sql = f'''
                    UPDATE {category}
                    SET
                    introduction='{args['introduction']}',
                    image='{file_name}'
                    WHERE id={post_id};
                '''

        cursor.execute(sql)
        db.commit()
        if category == "profile":
            sql = f'''
                SELECT u.name, u.email, p.id, 
                p.introduction, p.image 
                FROM user AS u
                INNER JOIN profile AS p
                ON u.id=p.user
                WHERE u.id={current_user_id};
            '''
        else:
            sql = f'SELECT * FROM {category} WHERE user="{current_user_id}";'
        cursor.execute(sql)
        res = cursor.fetchall()
        db.close()

        return jsonify(status = 'success', msg="수정 완료", res=res)
        
        
# api 라우팅 등록
api.add_resource(Post, '/<category>/<user_id>/', '/<category>/post', '/<category>/post/<post_id>')

@app.route('/image/<file_name>')
def send_image(file_name):
    return send_from_directory(app.config['UPLOAD_FOLDER'], file_name)


if __name__ == '__main__':
    app.run(debug=True)