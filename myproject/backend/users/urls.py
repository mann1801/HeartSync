from django.urls import path
from .views import signup
from .views import login
from .views import get_matches
from .views import save_swipe
from .views import check_match
from .views import get_user_matches
from .views import get_unread_matches_count
from .views import mark_matches_as_seen
from .views import send_message
from .views import get_messages
from .views import get_unread_message_count
from .views import get_unread_messages_for_user
from .views import get_message_users
from .views import contact_message
# from .views import get_unread_messages_count
from .views import get_local_ai_chat_suggestions_api
# from .views import get_unread_conversations
# from .views import mark_messages_as_read
from .views import create_review, list_reviews
from .views import get_user_profile, update_user_profile

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('get_matches/',get_matches),
    path('save_swipe/', save_swipe),
    path('check_match/', check_match),
    path('get_user_matches/', get_user_matches),
    path('get_unread_matches_count/', get_unread_matches_count),
    path('mark_matches_as_seen/', mark_matches_as_seen),
    path('send_message/', send_message),
    path('get_messages/', get_messages),
    path('get_unread_message_count/', get_unread_message_count),
    path('get_unread_messages_for_user/', get_unread_messages_for_user),
    path('get_message_users/', get_message_users),
    path('get_chat_suggestions/', get_local_ai_chat_suggestions_api),
    # Reviews
    path('reviews/create/', create_review),
    path('reviews/', list_reviews),
    # Contact
    path('contact_message/', contact_message),
    # Profile management
    path('get_user_profile/', get_user_profile),
    path('update_user_profile/', update_user_profile),
    # path('get_unread_conversations/', get_unread_conversations),
    # path('mark_messages_as_read/', mark_messages_as_read),
]