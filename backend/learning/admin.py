from django.contrib import admin
from .models import User, Course, Module, Task, Answer, Progress

admin.site.register(User)
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(Task)
admin.site.register(Answer)
admin.site.register(Progress)