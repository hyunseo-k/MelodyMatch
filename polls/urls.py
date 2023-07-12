from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test, name='test'),
    path('register/', views.register_view, name='register_view'),
    path('user/idcheck/', views.user_idcheck, name='user_idcheck'),
    path('user/', views.login_view, name='login_view'),
    path('profile/', views.profile, name='profile'),
    path('api/user-profile/', views.UserProfileAPIView.as_view(), name='user-profile-api'),
    path('friend-list/', views.FriendListAPIView.as_view(), name='friend-list'),
    path('api/user-playlist/', views.UserPlaylistAPIView.as_view(), name='user_playlist'),
    path('recommended-friends-list/', views.recommended_friends_list, name='recommended-friends-list'),
]
