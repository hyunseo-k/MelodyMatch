from django.contrib.auth.decorators import *
# from django.contrib.auth.models import User
from django.shortcuts import *
from django.http import *
from .forms import *
from .models import *
from django.http import JsonResponse, HttpResponse
import json
import time
from django.contrib.auth.hashers import make_password
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import ListAPIView

from .serializers import *

#qs = User.objects.filter(id='sada', password='asgfdsf')

# @api_view(['POST'])
# def signup(request):
#     id = request.data.get('id')
#     pw = request.data.get('pw')

#     try:
#         user = User(username=id, password=make_password(pw))
#         user.save()
#         return Response('등록에 성공하였습니다')
#     except:
#         return Response('등록에 실패하였습니다')

# @api_view(['POST'])
# def login(request):
#     id = request.data.get('id')
#     pw = request.data.get('pw')
#     user = User.objects.filter(username=id).first()

#     if user and user.check_password(pw):
#         request.session['user_id'] = user.id
#         request.session['username'] = user.username
#         return Response('로그인에 성공하였습니다')
#     else:
#         return Response('로그인에 실패하였습니다')


@api_view(['GET', 'POST'])
def test(request):
    if request.method == 'GET':
        print(request.GET.get('userid'))
        id = int(request.GET.get('id'))
        user = User.objects.get(id=id)
        s = UserProfileSerializer(user.userprofile)
        return Response(s.data)
    if request.method == 'POST':
        print(request.data)
        id = request.data.get('id')
        pw = request.data.get('pw')

        try:
            user = User(username=id, password=make_password(pw))
            user.save()
            return Response('등록에 성공하였습니다')
        except:
            return Response('등록에 실패하였습니다')

def check_password(user, input_word): # 비밀번호 확인
    password = user.password

    if input_word == password:
        return True 
    else:
        return False

# email 중복검사 : 1.1번
def user_idcheck(request):
    if request.method == "GET":
        id = request.GET.get('email')
        try:
            user = User.objects.get(username=id)
            response_data = {
                "status": 501
            }
        except User.DoesNotExist:
            response_data = {
                "status": 200
            }
        return JsonResponse(response_data)

##로그인

@api_view(['GET'])
def login_view(request):

    print(os.getcwd())
    email = request.GET.get('email')
    password = request.GET.get('password')

    print(email, password)

    try:
        print("dd")
        qs = User.objects.filter(username=email)
        print(qs.count())
        for item in qs:
            print(item)

        user = User.objects.get(username=email)
        print(email, password)
        if user and check_password(user,password): # db와 비교 
            # 로그인 성공
            avatar = user.avatar
            gender = user.gender
            fav_genre = user.fav_genre
            # fav_playlist = []
            #fav_genre = []
            #friends = []
            
            response_data = {
                "email": email,
                "avatar": avatar,
                "gender": gender,
                "fav_genre": fav_genre
            }
        else: ##로그인 실패 (아이디는 있는데 pw 틀림)
            response_data = {
                "email": '',
                "avatar": 0,
                "gender": '기본',
                "fav_genre": 0
            }
        return JsonResponse(response_data)
    except:
        response_data={}
        return JsonResponse(response_data, status=501)

def register_view(request):
    if request.method =="POST":
        body = json.loads(request.body)
        id = body.get('email')
        pw = body.get('password')
        try:
            user = User.objects.get(username=id)
            response_data={
                'status':501
            }
            return JsonResponse(response_data)
        except User.DoesNotExist:
            response_data ={
                'status':200
            }
            user = User(username=id, password = pw)
            user.save()
            return JsonResponse(response_data)

@api_view(['GET'])
def recommended_friends_list(request):
    email = request.GET.get('email')
    password = request.GET.get('password')

    # 여기서 email과 password를 사용하여 인증을 수행하고
    # 해당 사용자의 추천 친구 목록을 가져올 수 있습니다.
    user = User.objects.get(username=email)
    friends = [friend.username for friend in user.friends.all()]
    recommended_friends = [u.username for u in User.objects.exclude(username__in=friends).exclude(username=email).filter(fav_genre=user.fav_genre)]
    return Response(recommended_friends)

# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.save()
            
#             # AdditionalInfoForm에서 age 필드를 가져와서 user_profile 생성
#             age = request.POST.get('age')
#             print(user)
#             user_profile = User.objects.create(user = user, age=age)
            
#             request.session['user_id'] = user_profile.id
#             return redirect('polls:additional_info')
#     else:
#         form = SignUpForm()
#     return render(request, 'signup.html', {'form': form})

@login_required
def additional_info(request):
    user_id = request.session.get('user_id')
    user = get_object_or_404(User, id=user_id)
    if user_id is None:
        return redirect('polls:signup')

    user = User.objects.get(id=user_id)
    if request.method == 'POST':
        form = AdditionalInfoForm(request.POST)
        if form.is_valid():
            user_profile = form.save(commit=False)
            user_profile.user = user
            user_profile.save()
            del request.session['user_id']
            return redirect('polls:profile')
    else:
        form = AdditionalInfoForm()
    return render(request, 'additional_info.html', {'form': form})

@login_required
def profile(request):
    user_profile = UserProfile.objects.get(user=request.user)
    context = {'user_profile': user_profile}
    return render(request, 'profile.html', context)

class UserProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile


class FriendListAPIView(generics.ListAPIView):
    queryset = Friend.objects.all()  # Modify this queryset based on your requirements
    serializer_class = FriendSerializer


class PlaylistListCreateView(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
