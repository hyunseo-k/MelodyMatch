import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class User(models.Model):
    userid = models.CharField(max_length=100, unique=True) # 사용자 이름 = email
    userpw = models.CharField(max_length=128) # 사용자 패스워드
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    gender = models.CharField(max_length=1, choices=gender_choices)
    age = models.IntegerField()
    genre_choices = [
        ('POP', 'POP'),
        ('국내힙합', '국내힙합'),
        ('댄스', '댄스'),
        ('국내R&B', '국내R&B'),
        ('발라드', '발라드'),
        ('인디', '인디'),
        ('OST', 'OST'),
        ('국내일렉', '국내일렉'),
        ('국내록', '국내록'),
        ('해외힙합', '해외힙합'),
        ('해외일렉', '해외일렉'),
        ('해외R&B', '해외R&B'),
        ('재즈', '재즈'),
        ('J-POP', 'J-POP'),
        ('아이돌', '아이돌'),
        ('해외록', '해외록'),
        ('뮤지컬', '뮤지컬'),
        ('클래식', '클래식'),
        ('뉴에이지', '뉴에이지'),
        ('국내포크', '국내포크'),
        ('해외포크', '해외포크'),
        ('국악', '국악'),
        ('성인가요/트로트', '성인가요/트로트'),
        ('종교음악', '종교음악')
    ]
    favorite_genres = models.ManyToManyField('Genre', related_name='users')

from django.contrib.auth.models import User
from django.db import models

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

