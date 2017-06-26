from rest_framework import serializers
from videos.models import Video

class VideoSerializer(serializers.ModelSerializer):
	class Meta:
		models = Video
		fields = ['name', 'slug', 'embed', 'featured']