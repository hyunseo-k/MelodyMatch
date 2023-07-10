from django.urls import path
from . import views

app_name = "polls"
urlpatterns = [
    path('test/', views.test, name='test' ),
    path('login/', views.login_view, name='login_view' ),
    path('signup/', views.signup, name='signup'),
    path('profile/', views.profile, name='profile'),
    path('additional-info/', views.additional_info, name='additional_info'),
    #path('playlists/', PlaylistListCreateView.as_view(), name='playlist-list-create'),
    # 사용자 프로필 API 엔드포인트
    path('profile/', views.UserProfileAPIView.as_view(), name='user-profile'),
    # 친구 목록 API 엔드포인트
    path('friend-list/', views.FriendListAPIView.as_view(), name='friend-list'),
]
