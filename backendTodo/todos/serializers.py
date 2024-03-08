from rest_framework import serializers
from todos.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import exceptions
from django.utils import timezone

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class RegisterSerializer(serializers.ModelSerializer):
    
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email','username', 'password', 'confirm_password']
        extra_kwargs = {
            'password' : {'write_only': True}       # for security = dont want user to read when passed as request to server
        }

    def create(self, validate_data):
        user = CustomUser.objects.create_user(**validate_data)
        return user

    # overriding one method => pass1 == pass2
    def save(self):
        user = CustomUser(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )

        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError({'password' : 'Passwords must match'})
        user.set_password(password)
        user.save()     # actual save() method called => save to db
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(max_length=60, min_length=8, write_only=True)
    email = serializers.EmailField()
    tokens = serializers.SerializerMethodField('get_tokens')

    class Meta:
        model = CustomUser
        fields = ['email', 'password','tokens']
    
    def get_tokens(self, obj):
        user = CustomUser.objects.get(email=obj['email'])
        return {
            'refresh' : user.tokens()['refresh'],
            'access' : user.tokens()['access'],
        }

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        print(email, " ", password)
        user = authenticate(email=email, password=password)
        if not user:
            raise exceptions.AuthenticationFailed("Invalid credentials. recheck")
        if not user.is_active:
            raise exceptions.AuthenticationFailed("Account disabled")
        return {
            'email' : user.email,
            'tokens' : user.tokens,
        }
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']
    
class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['list_title', 'list_desc']

    def save(self, request, lst_id):
        list_title = self.validated_data['list_title']
        list_desc = self.validated_data['list_desc']
 
        try:
            if self.validated_data['list_create_at'] is not None:
                list = List(list_id=lst_id, list_title=list_title, list_desc=list_desc, list_owner=request.user, list_last_updated_at=timezone.now())
            else:
                list = List(list_id=lst_id, list_title=list_title, list_desc=list_desc, list_owner=request.user)
            list.save()
 
            try:
                u_q = user_task_list(u_id = request.user, l_id=list, t_id=None, role="Owner")
                u_q.save()
            except:
                list.delete()
                raise serializers.ValidationError({"error":"List can't be created."})
            return list
        except Exception as e:
            raise serializers.ValidationError({"error":"List can't be created","E":f"{e}"})

        

class TaskSerializer(serializers.ModelSerializer):
    # list_owner = UserSerializer(many=True)
    class Meta:
        model = Task
        fields = ['task_title', 'task_desc', 'task_deadline', 'task_priority', 'task_status']

    
    def save(self, request, lst_id):
        task_title = self.validated_data['task_title']
        task_desc = self.validated_data['task_desc']
        task_deadline = self.validated_data['task_deadline']
        task_priority = self.validated_data['task_priority']
        task_status = self.validated_data['task_status']
 
        try:
            list_instance = List.objects.get(list_id=lst_id)
            task = Task(task_title=task_title, task_desc=task_desc, task_deadline=task_deadline, task_priority=task_priority, task_status=task_status , task_collaborators=request.user, task_related_list_id=list_instance)
            task.save()
 
            try:
                u_q = user_task_list(u_id = request.user, l_id=list_instance, t_id=task, role="Collaborator")
                u_q.save()
            except:
                task.delete()
                raise serializers.ValidationError({"error":"Task can't be created."})
            return list
        except Exception as e:
            raise serializers.ValidationError({"error":"Task can't be created","E":f"{e}"})

    