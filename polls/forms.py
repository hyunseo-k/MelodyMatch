# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# # from .models import User

# class SignUpForm(UserCreationForm):
#     email = forms.EmailField()
#     name = forms.CharField(max_length=255)
#     gender = forms.ChoiceField(choices=User.gender)
#     age = forms.IntegerField(required=False)
#     favorite_genres = forms.MultipleChoiceField(choices=User.genre_choices, widget=forms.CheckboxSelectMultiple)

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2', 'name', 'gender', 'age', 'favorite_genres')

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.email = self.cleaned_data['email']

#         if commit:
#             user.save()

#             name = self.cleaned_data['name']
#             gender = self.cleaned_data['gender']
#             age = self.cleaned_data.get('age', 0)  # Set default value if age is not provided
#             favorite_genres = self.cleaned_data['favorite_genres']

#             user = User.objects.create_user(username=username, email=email, password=password1)
#             if user:
#                 user_profile = User.objects.create(
#                     user=user,
#                     name=name,
#                     gender=gender,
#                     age=age,
#                     favorite_genres=favorite_genres
#                 )

#         return user

# class AdditionalInfoForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ['name', 'gender', 'age', 'favorite_genres']
