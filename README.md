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
