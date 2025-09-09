from django.db import models
from django.core.validators import MinLengthValidator
from django.core.validators import MinValueValidator, MaxValueValidator

class User(models.Model):
    name = models.CharField(max_length=100, default="")
    userid = models.CharField(max_length=50, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, validators=[MinLengthValidator(8)])
    gender = models.CharField(max_length=10, default='Male')
    interestedIn = models.CharField(max_length=50, blank=True, default="")
    lookingFor = models.CharField(max_length=100, blank=True, default="")
    distance = models.PositiveIntegerField(default=80)
    education = models.CharField(max_length=100, blank=True, default="")
    
    lifestyle = models.JSONField(default=list)     # Now stored as a list
    personality = models.JSONField(default=list)   # Now stored as a list
    interests = models.JSONField(default=list)
    images = models.JSONField(default=list)        # Store user images as base64 or URLs

    def __str__(self):
        return self.userid
    

class Swipe(models.Model):
    swiper = models.CharField(max_length=100)  # user who swiped
    target = models.CharField(max_length=100)  # user who got swiped on
    action = models.CharField(max_length=10)   # 'like' or 'nope'
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.swiper} → {self.target} ({self.action})"
    


class Match(models.Model):
    user1 = models.CharField(max_length=100)
    user2 = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    user1_seen = models.BooleanField(default=False)  # Has user1 seen this match?
    user2_seen = models.BooleanField(default=False)  # Has user2 seen this match?

    def __str__(self):
        return f"{self.user1} ❤️ {self.user2}"

    class Meta:
        unique_together = ('user1', 'user2')


class Conversation(models.Model):
    user1 = models.CharField(max_length=100)  # Always the smaller userid alphabetically
    user2 = models.CharField(max_length=100)  # Always the larger userid alphabetically
    messages = models.JSONField(default=list)  # Array of message objects
    last_message_time = models.DateTimeField(auto_now=True)
    user1_last_read = models.DateTimeField(null=True, blank=True)
    user2_last_read = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user1} ↔ {self.user2}"

    class Meta:
        unique_together = ('user1', 'user2')
        ordering = ['-last_message_time']


# --- New Model: Review ---
class Review(models.Model):
    userid = models.CharField(max_length=50)  # store by userid (no FK to keep it simple)
    name = models.CharField(max_length=100, blank=True, default="")  # optional display name
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.userid} ⭐{self.rating}"