# views.py
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import Users, UserQueries
import jwt
from myproject.settings import JWT_SECRET
import json
import openai
from django.conf import settings

class UserAuthentication:
    auth = False
    user_id = None
    jwtToken = None


class get_user(APIView):
    def post(self, request):
        status = verify_jwt_token(UserAuthentication.jwtToken)
        if status:
            user = Users.objects.filter(id=UserAuthentication.user_id).values().all()
            return Response({'user': user}, status=200)
        return Response({'error': 'Session timed out'}, status=400)
        
class login(APIView):
    def post(self, request):
        password = request.data.get('password')
        email_id = request.data.get('email')
        if UserAuthentication.auth:
            status = verify_jwt_token(UserAuthentication.jwtToken)
            if status:
                return Response({'message': 'User already logged in.'}, status=200)
            else:
                return Response({'message': 'Session timed out'}, status=200)
        if not email_id or not email_id.strip():
            return Response({'error': 'email id cant be empty.'}, status=400)
        elif not password or not password.strip():
            return Response({'error': 'password cant be empty.'}, status=400)

        if Users.objects.filter(email=email_id).exists():
            user = Users.objects.get(email=email_id)
            if user.check_password(password):
                payload = {
                'id': user.id,
                'username': user.firstName,
                'exp': datetime.datetime.now() + datetime.timedelta(seconds=3600),
                }
                UserAuthentication.jwtToken = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
                UserAuthentication.auth = True
                UserAuthentication.user_id = user.id
                user_model = {
                    "id": user.id,
                    "name": user.firstName,
                    "email": user.email,
                }
                return Response({'message': 'User logged in.', 'user': json.dumps(user_model), 'token' : UserAuthentication.jwtToken}, status=200)      
            else:
                return Response({'error':'Incorrect Password'}, status=400)
        else:
            return Response({'error':'user does not exist'}, status=400)


class register(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        firstName = request.data.get('firstName')
        lastName = request.data.get('lastName')
        password = request.data.get('password')
        email_id = request.data.get('email')
        if Users.objects.filter(email=email_id).exists():
            return Response({'error': 'User already exists'}, status=400)
        elif not firstName or not firstName.strip():
            return Response({'error': 'First name cant be empty.'}, status=400)
        elif not lastName or not lastName.strip():
            return Response({'error': 'Last Name cant be empty.'}, status=400)
        elif not email_id or not email_id.strip():
            return Response({'error': 'email id cant be empty.'}, status=400)
        elif not password or not password.strip():
            return Response({'error': 'password cant be empty.'}, status=400)
        user = Users.objects.create_user(firstName=firstName, lastName=lastName, email=email_id, password=password)
        payload = {
            'id': user.id,
            'username': user.firstName,
            'exp': datetime.datetime.now() + datetime.timedelta(seconds=3600),
        }
        UserAuthentication.jwtToken = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
        UserAuthentication.auth = True
        UserAuthentication.user_id = user.id
        user_model = {
                    "id": user.id,
                    "name": user.firstName,
                    "email": user.email,
                }
        return Response({'message': 'User created successfully','user': json.dumps(user_model), 'token' : UserAuthentication.jwtToken}, status=200)
    
class logout(APIView):
    def post(self, request):
        UserAuthentication.jwtToken = None
        UserAuthentication.auth = False
        UserAuthentication.user_id = None
        return Response({'message': 'User Logged Out Successfully.'}, status=200)
    
openai.api_key = settings.OPENAI_API_KEY
class generate_sql(APIView):
    def post(self, request):
        prompt = request.data.get('textContent')
        try:
            # response = openai.chat.completions.create(
            # model="gpt-3.5-turbo",  # Specify the model, e.g., gpt-3.5-turbo
            # messages=[
            #     {"role": "system", "content": "You are an assistant that generates SQL queries."},
            #     {"role": "user", "content": f"Convert this to a SQL query: {prompt}"}
            # ],
            # max_tokens=200,
            # temperature=0.5,
            # )
            output = {
                "textContent" : prompt, 
                "sqlContent" : 'SELECT MAX(salary) as second_highest_salary FROM employees;'
            }
            return Response({'message':output}, status=200)
            # return Response({'message':response['choices'][0]['text'].strip()}, status=400)
        except Exception as e:
            return Response({'error':'Couldnt generate sql query'}, status=400)
        except openai.error.OpenAIError as e:
            return Response({'error':'Couldnt generate sql query'}, status=400)
        except Exception as e:
            return Response({'error':'Couldnt generate sql query'}, status=400)
    

class add_query(APIView):
    def post(self, request):
        if UserAuthentication.auth:
            try:
                sqlContent = request.data.get('sqlContent')
                textContent = request.data.get('textContent')
                print(sqlContent, textContent)
                user_id = UserAuthentication.user_id
                user = Users.objects.get(id=user_id)
                UserQueries.objects.create(user=user, sqlContent=sqlContent, textContent=textContent)  # Save to DB
                return Response({'message': 'Query added successfully to personal records!'}, status=200)
            except Exception as e:
                print(e)
                return Response({'error':'server error'}, status=400)
        else:
            return Response({'error':'session timed out'}, status=400)

def verify_jwt_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        logout()
        return False
    except jwt.InvalidTokenError:
        logout()
        return False
    return True