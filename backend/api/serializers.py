from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(# In Python, `**validated_data` is used to unpack a dictionary
        # and pass its key-value pairs as keyword arguments to a
        # function. In the context of the `create` method in the
        # `UserSerializer` class, `**validated_data` is unpacking the
        # validated data dictionary received as input and passing its
        # contents as keyword arguments to the `create_user` method of
        # the `User` model. This allows the `create_user` method to
        # receive the individual fields (such as username and
        # password) as separate arguments for creating a new user
        # instance.
        **validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
    
    def get_author(self, obj):
        return obj.author.username
