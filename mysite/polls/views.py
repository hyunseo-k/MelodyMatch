from django.contrib.auth.decorators import *
from django.contrib.auth.models import User
from django.shortcuts import *
from django.http import *
from .forms import *
from .models import *
from django.contrib.auth.hashers import make_password
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import ListAPIView

from .serializers import *

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

def check_pw(user, input_word): # 비밀번호 확인
    userpw = user.userpw

    if input_word == userpw:
        return True 
    else:
        return False
        
##로그인
def login_view(request):
    
    print(os.getcwd())
    userid = request.GET.get('userid')
    userpw = request.GET.get('userpw')
    print("ok")
                
    try:
        # print("****")
        print(userid, userpw)
        user = User.objects.get(userid=userid) # 있는 id인지 체크
        if user and check_pw(user,userpw): # db와 비교 
            # 로그인 성공
            ## DB에 있는 거 가져오기
            email = 'yeah'
            avatar = 0
            fm = 0
            fm_onoff = 0
            age = 0
            fav_playlist = ['']
            fav_artist = ['']
            fav_genre = ''
            friends = []
            recent_listen = ''
            
            # 
            
            response_data = {
                "userid" : userid, # 유저 아이디 
                "id" : id,
                "email": email,
                "avatar" : avatar,
                "fm" : fm,
                "fm_onoff" : fm_onoff,
                "age" : age,
                "fav_playlist" : fav_playlist,
                "fav_artist" : fav_artist,
                "fav_genre" : fav_genre,
                "friends" : friends,
                "recent_listen": recent_listen
            }
        else:
            response_data = {
                "userid" : '', # 유저 아이디 
                "id" : '', # 유저 식별번호?
                "email" : '',
                "avatar" : 0, # 0~15
                "fm" : 0, # 0(여자) / 1(남자)
                "fm_onoff" : 0, # 0(off) / 1(on)
                "age" : 0,
                "fav_playlist" :[''], # string list
                "fav_artist" : [''], # string list
                "fav_genre" : '', # string
                "friends" : [],
                "recent_listen": '' # string
            }
            
        return JsonResponse(response_data)
    except:
        response_data={}
        print("***")
        return JsonResponse(response_data, status=501)


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            
            # AdditionalInfoForm에서 age 필드를 가져와서 user_profile 생성
            age = request.POST.get('age')
            print(user)
            user_profile = UserProfile.objects.create(user = user, age=age)
            
            request.session['user_id'] = user_profile.id
            return redirect('polls:additional_info')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

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
