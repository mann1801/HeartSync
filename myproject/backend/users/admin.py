from django.contrib import admin
from .models import User, Swipe, Match, Conversation, Review

admin.site.register(User)
admin.site.register(Swipe)
admin.site.register(Match)
admin.site.register(Conversation)
admin.site.register(Review)
