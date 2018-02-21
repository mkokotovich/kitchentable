from django.contrib.auth.models import User, Group
from rest_framework import serializers
from kitchentable.chat.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'posts')
        read_only_fields = ('posts',)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('url', 'owner', 'post')


class UserSummarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username')


class LikeInfoSerializer(serializers.HyperlinkedModelSerializer):
    owner = UserSummarySerializer(many=False, read_only=True)
    class Meta:
        model = Like
        fields = ('url', 'owner')


class PostSerializer(serializers.HyperlinkedModelSerializer):
    likes = LikeInfoSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ('url', 'owner', 'content', 'likes')
