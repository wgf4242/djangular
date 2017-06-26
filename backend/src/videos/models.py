from django.db import models
from django.db.models.signals import pre_save
from .utils import unique_slug_generator
# Create your models here.
class Video(models.Model):
	# id		 = models.IntegerField() auto_increment
	name			= models.CharField(max_length=220)
	slug			= models.SlugField(unique=True, blank=True)
	embed			= models.CharField(max_length=120, help_text='Youtube embed code', null=True, blank=True)
	featured 		= models.BooleanField(default=False)
	timestamp 		= models.DateTimeField(auto_now_add=True)

	def __str__(self): # __unicode__ 
		return self.name

	@property
	def title(self):
		return self.name

def video_pre_save_receiver(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = unique_slug_generator(instance)

pre_save.connect(video_pre_save_receiver, sender=Video)