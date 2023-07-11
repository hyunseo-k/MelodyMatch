import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

    

class User(models.Model):
    username = models.CharField(max_length=100, unique=True) # 사용자 이름 = email
    password = models.CharField(max_length=128) # 사용자 패스워드
    avatar = models.IntegerField()
    gender = models.CharField(max_length=128)
    fav_genre = models.IntegerField()
    friends = models.ManyToManyField('self', blank=True)
    


class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    # 추가 필드들...

    def __str__(self):
        return self.title

class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='avatars/')  # 사용자 아바타 이미지를 저장할 필드를 추가하고, `pip install Pillow` 명령으로 필요한 패키지를 설치해야 합니다.
    favoriteSongs = models.TextField()

    def __str__(self):
        return self.name

