from django.shortcuts import render

from rest_framework import status, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user

from .models import CustomUser, List, Task, Subtasks, Invitation, Notification, user_task_list




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'login/',
        'register/',
    ]

    return Response(routes)

@api_view(['POST'])
def get_user_token(request):
   serializer = MyTokenObtainPairSerializer(data=request.data)
   serializer.is_valid(raise_exception=True)
   return Response(serializer.validated_data)

   
# restrict type of request on this view
@api_view(['POST',])     
def register_view(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data = request.data)
        data = {}
        if serializer.is_valid():       # access to validated_data field in serializer/save()
            user = serializer.save()        # call overided save method 
            data['response'] = "Succesfully registered new user"
            data['email'] = user.email
            data['username'] = user.username
        else:
            data = serializer.errors
        return Response(data)


@api_view(['POST'])  
def login_view(request):
    serializer = LoginSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def list_view(request):
    if request.method == 'POST':
        serializer = ListSerializer(data=request.data)
        # serializer.data.list_owner = request.user
        if serializer.is_valid(raise_exception=True):
            serializer.save(request)
            return Response({request.user.username : serializer.data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        # user = get_user(request)
        all_lists = List.objects.filter(list_owner=request.user)
        data = {}
        for lis in all_lists:
            item = {}
            item['name'] = lis.list_title
            item['description'] = lis.list_desc
            data[lis.list_id] = item
        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['GET', 'PUT', 'DELETE'])
def lists_id_view(request, lst_id):
    if request.method == 'GET':
        list_item = user_task_list.objects.filter(u_id=request.user.id, l_id=lst_id, role='Owner')
        print(list_item)

        if list_item:
            data = {}
            ls_item = List.objects.filter(list_id=lst_id).first()
            item = {}
            item['name'] = ls_item.list_title
            item['description'] = ls_item.list_desc

            # task ki setails
            task_list = Task.objects.filter(task_related_list_id=lst_id)
            task = {}
            for tsk in task_list:
                task_item = {}
                task_item['task_title'] = tsk.task_title
                task_item['task_desc'] = tsk.task_desc
                if request.user in [ls_item.list_owner, tsk.task_collaborators]:
                    task_item['editable'] = 'True'
                else:
                    task_item['editable'] = 'False'
            
                task[tsk.task_id] = task_item
            item['tasks'] = task
            data[ls_item.list_id] = item               
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"message" : "You can not access this."})
            
    if request.method == 'PUT':       # list update
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(request, lst_id)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        list_item = user_task_list.objects.filter(l_id=id)
        list_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def tasks_view(request, lst_id):
    if request.method == 'GET':
        all_tasks = Task.objects.filter(task_related_list_id=lst_id)
        data = {}
        for tsk in all_tasks:
            item = {}
            item['name'] = tsk.task_title
            item['description'] = tsk.task_desc
            item['deadline'] = tsk.task_deadline
            item['priority'] = tsk.task_priority
            item['status'] = tsk.task_status
            data[tsk.task_id] = item

        return Response(data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        # serializer.data.list_owner = request.user
        if serializer.is_valid(raise_exception=True):
            serializer.save(request, lst_id)
            return Response({request.user.username : serializer.data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET', 'PUT', 'DELETE'])
def task_id_view(request, lst_id, tsk_id):
    if request.method == 'GET':
        task_item = user_task_list.objects.filter(u_id=request.user.id, l_id=lst_id, t_id=tsk_id)
        
        if task_item:
            data = {}
            tsk_item = Task.objects.filter(task_id=tsk_id).first()
            item = {}
            item['task_name'] = tsk_item.task_title
            item['task_description'] = tsk_item.task_desc
            item['deadline'] = tsk_item.task_deadline
            item['priority'] = tsk_item.task_priority
            item['status'] = tsk_item.task_status

            # task ki setails
            subtask_list = Subtasks.objects.filter(subtask_related_task_id=tsk_item.task_id)
            subtasks = {}
            for subtask in subtask_list:
                subtask_item = {}
                subtask_item['subtask_title'] = subtask.subtask_title
                subtask_item['subtask_desc'] = subtask.subtask_desc
                subtask_item['subtask_deadline'] = subtask.subtask_deadline
                subtask_item['subtask_priority'] = subtask.subtask_priority
                subtask_item['subtask_status'] = subtask.subtask_status
                if request.user in [tsk_item.task_collaborators, subtask.subtask_collaborators]:
                    subtask_item['editable'] = 'True'
                else:
                    subtask_item['editable'] = 'False'
            
                subtasks[subtask.subtask_id] = subtask_item
            item['subtasks'] = subtasks
            data[tsk_id] = item               
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"message" : "You can not access this."})
        
    if request.method == 'PUT':       # list update
        task_item = user_task_list.objects.filter(l_id=lst_id, t_id=tsk_id)
        serializer = TaskSerializer(task_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        task_item = user_task_list.objects.filter(l_id=lst_id, t_id=tsk_id)
        task_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)