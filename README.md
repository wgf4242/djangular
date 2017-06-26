# Init

in backend/src folder run
    
    python manage.py runserver

in client run
    
    ng build --prod --output-path your_path --watch --output-hashing none 


## 4 - Getting Started.mp4

    md djangular && cd djangular
    md client && cd client
    git clone https://github.com/codingforentrepreneurs/Try-Angular-v4.git .
    npm install

Open a new terminal

    cd djangular
    md backend && cd backend
    virtualenv -p python3
    Scripts\activate.bat
    pip install django==1.11
    pip install djangorestframework
    mkdir src && cd src
    (backend) djangular\backend\src>django-admin startproject tryangular .
    backend\src>cd ..
    backend>md static-root
    cd src
    md static

## 5 - A Django URL Catch-all.mp4

    # settings.py TEMPLATES
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
    STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static-root')
    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, 'static')
    ]

create templates folder under src

    src> md templates

    # ang_home.html
    <h1>Helo World!</h1>

    # url.py
    from django.views.generic.base import TemplateView
    urlpatterns = [
        url(r'^admin/?', admin.site.urls),
        # url(r'^api/', admin.site.urls),
        url(r'^.*', TemplateView.as_view(template_name="ang_home.html"), name='home')
    ]

## 6 - ng build to django static.mp4

    ng build --prod
    ng build --prod --output-path "d:\wgf\My Documents\GitHub\djangular\backend\src\static\ang"
    ng build --prod --output-path "d:\wgf\My Documents\GitHub\djangular\backend\src\static\ang" --watch --output-hashing none 

上面这条命令执行后，一但修改 client下的相关文件（除json等静态文件），会自动部署到指定文件夹

## 7 - Django render Angular.mp4

修改 ang_home.html 为 index.html中的内容，并用 {%static ''%} 相关文件来加载。

修改 assets/json/videos.json 相关路径即可使项目正常显示。

home.components.ts中有硬编码的路径，会有问题，修改一下路径即可。

## 8 - Videos Django App.mp4

    pwd | pbcopy 
    echo %cd% | clip

    ./deploy.sh

    cd backend
    source bin/activate


    (backend) >python manage.py startapp videos

    # videos.models.py
    class Video(models.Model):
        name = models.CharField(max_length=220)
        slug = models.SlugField(unique=True, blank=True)
        embed = models.CharField(max_length=120, null=True, blank=True)
        featured = models.BooleanField(default=False)
        timestamp = models.DateTimeField(auto_now_add=True)

        def __str__(self): # __unicode__ 
            return self.name

    # videos.admin.py
    from .models import Video
    admin.site.register(Video)

    (backend) >python manage.py makemigrations
    (backend) >python manage.py migrate

## 9 - Auto Generate Slugs.mp4

https://www.codingforentrepreneurs.com/blog/a-unique-slug-generator-for-django/

    # utils.py
    # https://www.codingforentrepreneurs.com/blog/a-unique-slug-generator-for-django/
    import random
    import string
    from django.utils.text import slugify

    def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))


    '''
    random_string_generator is located here:
    http://joincfe.com/blog/random-string-generator-in-python/
    '''

    def unique_slug_generator(instance, new_slug=None):
        """
        This is for a Django project and it assumes your instance 
        has a model with a slug field and a title character (char) field.
        """
        if new_slug is not None:
            slug = new_slug
        else:
            slug = slugify(instance.title)

        Klass = instance.__class__
        qs_exists = Klass.objects.filter(slug=slug).exists()
        if qs_exists:
            new_slug = "{slug}-{randstr}".format(
                        slug=slug,
                        randstr=random_string_generator(size=4)
                    )
            return unique_slug_generator(instance, new_slug=new_slug)
        return slug

    # models.py

    from django.db import models
    from django.db.models.signals import pre_save
    from .utils import unique_slug_generator
    # Create your models here.
    class Video(models.Model):
        # id         = models.IntegerField() auto_increment
        name            = models.CharField(max_length=220)
        slug            = models.SlugField(unique=True, blank=True)
        embed           = models.CharField(max_length=120, help_text='Youtube embed code', null=True, blank=True)
        featured        = models.BooleanField(default=False)
        timestamp       = models.DateTimeField(auto_now_add=True)

        def __str__(self): # __unicode__ 
            return self.name

        @property   # 解决找不到 title的问题。
        def title(self):
            return self.name

    def video_pre_save_receiver(sender, instance, *args, **kwargs):
        if not instance.slug:
            instance.slug = unique_slug_generator(instance)

    pre_save.connect(video_pre_save_receiver, sender=Video)

## 10 - Video API List.mp4