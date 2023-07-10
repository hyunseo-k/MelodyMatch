from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('polls/', include('polls.urls')),  # polls 앱의 URLconf를 포함
    path('accounts/', include('allauth.urls')),
]
