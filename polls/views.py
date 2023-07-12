from django.contrib.auth.decorators import *
# from django.contrib.auth.models import User
from django.shortcuts import *
from django.http import *
from .forms import *
from .models import *
from django.http import JsonResponse, HttpResponse
import json
import time
from django.contrib.auth.hashers import make_password, check_password
import os
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate

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


@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        id = request.GET.get('email')
        pw = request.GET.get('password')

        user = User.objects.get(username=id)

        print(user.password)
        print(pw)

        if user is not None and check_password(pw, user.password):
            request.session['user_id'] = user.id
            request.session['username'] = user.username
            return JsonResponse({"status": 200, "message": "로그인에 성공하였습니다."})
        else:
            return JsonResponse({"status": 501, "message": "로그인에 실패하였습니다."})


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

# email 중복검사 : 1.1번
def user_idcheck(request):
    if request.method == "GET":
        id = request.GET.get('email')
        print(id)
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


@csrf_exempt
@api_view(['GET', 'POST'])
def register_view(request):
    if request.method == "POST":
        body = json.loads(request.body)
        id = body.get('email')
        pw = body.get('password')
        avatar = body.get('avatar')
        gender = body.get('gender')

        try:
            user = User.objects.get(username=id)
            response_data = {'status': 501}
            return JsonResponse(response_data)
        except User.DoesNotExist:
            user = User(username=id, password=pw, avatar=avatar, gender=gender)
            user.save()
            response_data = {'status': 200}
            return JsonResponse(response_data)

    return JsonResponse({}, status=501)

@api_view(['GET'])
def login_view(request):
    email = request.GET.get('email')
    password = request.GET.get('password')

    try:
        user = User.objects.get(username=email)

        if user and password == user.password:
            # 로그인 성공
            request.user = user
            avatar = user.avatar
            gender = user.gender
            age = user.age

            response_data = {
                "email": email,
                "avatar": avatar,
                "gender": gender,
                "age": age,
            }
            return JsonResponse(response_data)
        else:
            # 로그인 실패
            response_data = {
                "email": '',
                "avatar": 0,
                "gender": '기본',
                "age": 0,
            }
            return JsonResponse(response_data)
    except User.DoesNotExist:
        return JsonResponse({}, status=501)

@api_view(['GET'])
def recommended_friends_list(request):
    email = request.GET.get('email')
    password = request.GET.get('password')

    # 여기서 email과 password를 사용하여 인증을 수행하고
    # 해당 사용자의 추천 친구 목록을 가져올 수 있습니다.
    user = User.objects.get(username=email)
    friends = [friend.username for friend in user.friends.all()]
    recommended_friends = [u.username for u in User.objects.exclude(username__in=friends).exclude(username=email).filter(avatar=user.av)]
    return Response(recommended_friends)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_playlist_view(request):
    user = request.user
    playlists = Playlist.objects.filter(user=user)
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@login_required
def profile(request):
    user_profile = User.objects.get(user=request.user)
    context = {'user_profile': user_profile}
    return render(request, 'profile.html', context)

class UserProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile


class FriendListAPIView(View):
    def get(self, request):
        user_email = 't1@gmail.com'
        try:
            user = User.objects.get(username=user_email)
            friend_list = Friend.objects.filter(user=user).values('id', 'user', 'avatar', 'favoriteSongs')
            return JsonResponse(list(friend_list), safe=False)
        except User.DoesNotExist:
            return JsonResponse({}, status=404)




class PlaylistListCreateView(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserPlaylistAPIView(generics.ListAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Playlist.objects.filter(user=user)
