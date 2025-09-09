from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
import json
from .models import User,Swipe,Match,Conversation,Review
from fallback_ai_chat import get_fallback_ai_suggestions
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Base fields
        name = data.get('name')
        userid = data.get('userid')
        email = data.get('email')
        password = data.get('password')
        gender = data.get('gender')

        # New list-based fields
        interestedIn = data.get('interestedIn', '')
        lookingFor = data.get('lookingFor', '')
        distance = data.get('distance', 80)
        education = data.get('education', '')
        lifestyle = data.get('lifestyle', [])      # ✅ Expecting list
        personality = data.get('personality', [])  # ✅ Expecting list
        interests = data.get('interests', [])
        images = data.get('images', [])            # ✅ Expecting list of image data

        # Validations...
        if not name or not userid or not email or not password or not gender:
            return JsonResponse({'error': 'Name, User ID, Email, Password, and Gender are required'}, status=400)
        if len(password) < 8:
            return JsonResponse({'error': 'Password must be at least 8 characters'}, status=400)
        if User.objects.filter(userid=userid).exists():
            return JsonResponse({'error': 'User ID already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        # Save user with full list-based data
        user = User.objects.create(
            name=name,
            userid=userid,
            email=email,
            password=password,
            gender=gender,
            interestedIn=interestedIn,
            lookingFor=lookingFor,
            distance=distance,
            education=education,
            lifestyle=lifestyle,
            personality=personality,
            interests=interests,
            images=images
        )

        print("✅ Registered user:", user.userid)
        return JsonResponse({'message': 'User registered successfully'}, status=201)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)

# views.py
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        identifier = data.get('userid')  # can be userid or email
        password = data.get('password')

        if not identifier or not password:
            return JsonResponse({'error': 'User ID/Email and password are required'}, status=400)

        # Check if identifier looks like an email
        if '@' in identifier:
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Email not found'}, status=404)
        else:
            try:
                user = User.objects.get(userid=identifier)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User ID not found'}, status=404)

        if user.password == password:
          
            return JsonResponse({
                'message': 'Login successful',
                'userid': user.userid  # ✅ Now sending userid
            }, status=200)
        else:
            return JsonResponse({'error': 'Incorrect password'}, status=401)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


@csrf_exempt
def get_matches(request):
    print("📨 METHOD:", request.method)
    print("📦 BODY:", request.body)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except Exception as e:
            print("❌ JSON error:", str(e))
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        userid = data.get('userid')

        # Get the current user
        try:
            current_user = User.objects.get(userid=userid)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Get users the current user has already swiped on
        already_swiped_userids = Swipe.objects.filter(swiper=userid).values_list('target', flat=True)
        
        # Get users the current user might like (excluding self and already swiped users)
        # Step 1: Filter candidates before matching
        if current_user.interestedIn.lower() == "male":
            candidates = User.objects.filter(gender__iexact="Male").exclude(userid=userid).exclude(userid__in=already_swiped_userids)
        elif current_user.interestedIn.lower() == "female":
            candidates = User.objects.filter(gender__iexact="Female").exclude(userid=userid).exclude(userid__in=already_swiped_userids)
        elif current_user.interestedIn.lower() == "beyond binary":
            candidates = User.objects.filter(gender__iexact="Beyond binary").exclude(userid=userid).exclude(userid__in=already_swiped_userids)
        elif current_user.interestedIn.lower() == "everyone":
            candidates = User.objects.exclude(userid=userid).exclude(userid__in=already_swiped_userids)
        else:
            candidates = User.objects.exclude(userid=userid).exclude(userid__in=already_swiped_userids)  # fallback
        # Function to calculate match score
        def match_score(other_user):
            score = 0

            # Match gender preference - check if current user is interested in other user's gender
            if current_user.interestedIn.lower() != other_user.gender.lower():
                return -1  # skip if gender doesn't match

            # Check if other user is interested in current user's gender
            if other_user.interestedIn.lower() != current_user.gender.lower():
                return -1  # skip if mutual interest doesn't match

            # Shared interests
            if isinstance(other_user.interests, list) and isinstance(current_user.interests, list):
                score += len(set(current_user.interests) & set(other_user.interests))

            # Shared lifestyle
            if isinstance(other_user.lifestyle, list) and isinstance(current_user.lifestyle, list):
                score += len(set(current_user.lifestyle) & set(other_user.lifestyle))

            # Shared personality
            if isinstance(other_user.personality, list) and isinstance(current_user.personality, list):
                score += len(set(current_user.personality) & set(other_user.personality))

            return score
        print("👤 Current user:",current_user.name,current_user.userid, current_user.interestedIn)
        # Sort candidates by match score (highest first)
        print("🎯 Candidates:")
        for u in candidates:
            print(f"{u.name} | {u.userid} | Looking For: {u.lookingFor} | Interests: {u.interests}")

        ranked = sorted(candidates, key=match_score, reverse=True)
        top_matches = ranked[:10]

        # Return limited profile info
        results = [
            {
                'userid': u.userid,
                'name': u.name,
                'interests': u.interests,
                'lifestyle': u.lifestyle,
                'personality': u.personality,
                'images': u.images,
                'profilePic': u.images[0]['data'] if u.images and len(u.images) > 0 else None
            }
            for u in top_matches if match_score(u) > 0
        ]
        for u in top_matches:
            print(f"🧠 Match Score with {u.name}: {match_score(u)}")
            print("✅ Shared interests:", set(current_user.interests) & set(u.interests))
            print("✅ Shared lifestyle:", set(current_user.lifestyle) & set(u.lifestyle))
            print("✅ Shared personality:", set(current_user.personality) & set(u.personality))

        return JsonResponse({'matches': results}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def contact_message(request):
    """Forward contact form details to admin email"""
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            name = data.get('name')
            email_from = data.get('email')
            message =data.get('message')
            if not all([name, email_from, message]):
                return JsonResponse({'error': 'Name, email and message are required'}, status=status.HTTP_400_BAD_REQUEST)

            admin_email = 'mannsoni181@gmail.com'
            subject = f'New Contact Message from {name}'
            html_message = f"""
            <html>
                <body>
                    <h3>New Contact Message</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email_from}</p>
                    <p><strong>Message:</strong><br/>{message}</p>
                </body>
            </html>
            """
            plain_message = (
                f"New Contact Message\n\nName: {name}\nEmail: {email_from}\n\nMessage:\n{message}"
            )

            email = EmailMultiAlternatives(
                subject,
                plain_message,
                settings.EMAIL_HOST_USER,
                [admin_email],
                reply_to=[email_from] if email_from else None,
            )
            email.attach_alternative(html_message, 'text/html')
            email.send(fail_silently=False)

            return JsonResponse({"success": True, "message": "Message sent to admin"}, status=200)
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def save_swipe(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        swiper = data.get('swiper')
        target = data.get('target')
        action = data.get('action')

        if not swiper or not target or action not in ['like', 'nope']:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        Swipe.objects.create(swiper=swiper, target=target, action=action)
        print(f"💾 {swiper} swiped {action} on {target}")
        
        # Check if this creates a match
        if action == 'like':
            already_liked = Swipe.objects.filter(swiper=target, target=swiper, action='like').exists()
            if already_liked:
                print(f"🎉 MATCH CREATED: {swiper} ↔ {target}")
        
        return JsonResponse({'message': 'Swipe saved'}, status=201)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def check_match(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user1 = data.get('user1')
        user2 = data.get('user2')

        print(f"🔍 Checking match: {user1} ↔ {user2}")

        # Check if user2 already liked user1
        already_liked = Swipe.objects.filter(swiper=user2, target=user1, action='like').exists()
        print(f"   {user2} already liked {user1}: {already_liked}")

        if already_liked:
            # Ensure consistent order to avoid duplicates
            u1, u2 = sorted([user1, user2])
            match_exists = Match.objects.filter(user1=u1, user2=u2).exists()
            print(f"   Match already exists: {match_exists}")

            if not match_exists:
                Match.objects.create(user1=u1, user2=u2)
                print(f"🎉 NEW MATCH CREATED: {u1} ↔ {u2}")

            return JsonResponse({'match': True})

        return JsonResponse({'match': False})

    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def get_user_matches(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        # Get all match rows where user is user1 or user2
        match_objs = Match.objects.filter(user1=userid) | Match.objects.filter(user2=userid)

        matched_users = []
        for match in match_objs:
            # Determine who is the other user
            other_userid = match.user2 if match.user1 == userid else match.user1
            try:
                other_user = User.objects.get(userid=other_userid)
                matched_users.append({
                    'userid': other_user.userid,
                    'name': other_user.name,
                    'email': other_user.email,
                    'gender': other_user.gender,
                    'interestedIn': other_user.interestedIn,
                    'lookingFor': other_user.lookingFor,
                    'distance': other_user.distance,
                    'education': other_user.education,
                    'interests': other_user.interests,
                    'lifestyle': other_user.lifestyle,
                    'personality': other_user.personality,
                    'images': other_user.images,
                    'profilePic': other_user.images[0]['data'] if other_user.images and len(other_user.images) > 0 else None
                })
            except User.DoesNotExist:
                continue  # skip if user is missing

        return JsonResponse({'matches': matched_users}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def get_unread_matches_count(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        # Count unread matches for this user
        unread_count = Match.objects.filter(
            Q(user1=userid, user1_seen=False) | 
            Q(user2=userid, user2_seen=False)
        ).count()

        return JsonResponse({'unread_count': unread_count}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def mark_matches_as_seen(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        # Mark all matches as seen for this user
        Match.objects.filter(user1=userid, user1_seen=False).update(user1_seen=True)
        Match.objects.filter(user2=userid, user2_seen=False).update(user2_seen=True)

        return JsonResponse({'message': 'Matches marked as seen'}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        sender = data.get('sender')
        receiver = data.get('receiver')
        content = data.get('content')

        if not sender or not receiver or not content:
            return JsonResponse({'error': 'Sender, receiver, and content are required'}, status=400)

        # Check if users are matched (can only message matched users)
        u1, u2 = sorted([sender, receiver])
        match_exists = Match.objects.filter(user1=u1, user2=u2).exists()
        
        if not match_exists:
            return JsonResponse({'error': 'You can only message matched users'}, status=403)

        # Get or create conversation
        conversation, created = Conversation.objects.get_or_create(
            user1=u1,
            user2=u2,
            defaults={'messages': []}
        )

        # Create new message object
        from datetime import datetime
        from django.utils import timezone
        new_message = {
            'id': len(conversation.messages) + 1,  # Simple ID for message
            'sender': sender,
            'receiver': receiver,
            'content': content,
            'timestamp': timezone.now().isoformat(),  # Use timezone-aware timestamp
            'delivered': True,  # Message is delivered when sent
            'read': False       # Not read initially
        }

        # Add message to conversation array
        conversation.messages.append(new_message)
        conversation.save()

        return JsonResponse({
            'message': 'Message sent successfully',
            'timestamp': new_message['timestamp']
        }, status=201)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def get_messages(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user1 = data.get('user1')
        user2 = data.get('user2')

        if not user1 or not user2:
            return JsonResponse({'error': 'Both user IDs are required'}, status=400)

        # Get conversation between these two users
        u1, u2 = sorted([user1, user2])
        try:
            conversation = Conversation.objects.get(user1=u1, user2=u2)
            messages = conversation.messages or []
            
            # Mark messages as read for the requesting user
            from django.utils import timezone
            current_time = timezone.now()
            
            # Update read status for messages sent by the other user
            updated_messages = []
            for message in messages:
                if message['sender'] != user1 and not message.get('read', False):
                    message['read'] = True  # Mark as read
                updated_messages.append(message)
            
            # Update conversation with read messages
            conversation.messages = updated_messages
            
            if user1 == u1:  # user1 is reading, update user1_last_read
                conversation.user1_last_read = current_time
            else:  # user2 is reading, update user2_last_read
                conversation.user2_last_read = current_time
            
            conversation.save()
            messages = updated_messages
            
        except Conversation.DoesNotExist:
            messages = []

        return JsonResponse({'messages': messages}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


# --- Reviews APIs ---
@csrf_exempt
def create_review(request):
    """Create a review for the currently logged-in user (identified by userid in request)."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except Exception:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        userid = data.get('userid')
        text = data.get('text', '').strip()
        rating = data.get('rating')

        if not userid:
            return JsonResponse({'error': 'Authentication required'}, status=401)
        if not text or not rating:
            return JsonResponse({'error': 'Text and rating are required'}, status=400)

        # Ensure user exists
        try:
            user = User.objects.get(userid=userid)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Save
        try:
            rating_int = int(rating)
        except Exception:
            return JsonResponse({'error': 'Rating must be an integer between 1 and 5'}, status=400)

        if rating_int < 1 or rating_int > 5:
            return JsonResponse({'error': 'Rating must be between 1 and 5'}, status=400)

        review = Review.objects.create(
            userid=user.userid,
            name=user.name,
            rating=rating_int,
            text=text
        )

        return JsonResponse({
            'message': 'Review created',
            'review': {
                'id': review.id,
                'userid': review.userid,
                'name': review.name,
                'rating': review.rating,
                'text': review.text,
                'created_at': review.created_at.isoformat(),
            }
        }, status=201)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def list_reviews(request):
    """List reviews with simple pagination: GET with ?page and ?page_size"""
    if request.method == 'GET':
        try:
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 10))
        except Exception:
            return JsonResponse({'error': 'Invalid pagination params'}, status=400)

        start = (page - 1) * page_size
        end = start + page_size

        qs = Review.objects.order_by('-created_at')
        total = qs.count()
        reviews = qs[start:end]

        data = [{
            'id': r.id,
            'userid': r.userid,
            'name': r.name,
            'rating': r.rating,
            'text': r.text,
            'created_at': r.created_at.isoformat(),
        } for r in reviews]

        return JsonResponse({
            'results': data,
            'page': page,
            'page_size': page_size,
            'total': total
        }, status=200)

    return JsonResponse({'error': 'Only GET allowed'}, status=405)



@csrf_exempt
def get_unread_message_count(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        # Get all conversations where this user is involved
        conversations = Conversation.objects.filter(Q(user1=userid) | Q(user2=userid))
        
        users_with_unread = set()  # Use set to count unique users
        
        for conversation in conversations:
            if not conversation.messages:
                continue
                
            # Check if this conversation has unread messages from the other user
            other_userid = conversation.user2 if conversation.user1 == userid else conversation.user1
            has_unread = False
            
            for message in conversation.messages:
                if message['sender'] != userid and not message.get('read', False):
                    has_unread = True
                    break
            
            if has_unread:
                users_with_unread.add(other_userid)

        return JsonResponse({'unread_count': len(users_with_unread)}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def get_unread_messages_for_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')
        other_userid = data.get('other_userid')

        if not userid or not other_userid:
            return JsonResponse({'error': 'Both userid and other_userid are required'}, status=400)

        # Get conversation between these two users
        u1, u2 = sorted([userid, other_userid])
        try:
            conversation = Conversation.objects.get(user1=u1, user2=u2)
            
            # Count unread messages from other_userid to userid
            unread_count = 0
            for message in conversation.messages:
                if message['sender'] == other_userid and not message.get('read', False):
                    unread_count += 1
                    
            return JsonResponse({'unread_count': unread_count}, status=200)
            
        except Conversation.DoesNotExist:
            return JsonResponse({'unread_count': 0}, status=200)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def get_message_users(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        try:
            # Get all conversations where this user is involved
            conversations = Conversation.objects.filter(Q(user1=userid) | Q(user2=userid))
            
            message_users = []
            
            for conversation in conversations:
                if not conversation.messages:
                    continue
                
                # Get the other user in the conversation
                other_userid = conversation.user2 if conversation.user1 == userid else conversation.user1
                
                try:
                    other_user = User.objects.get(userid=other_userid)
                except User.DoesNotExist:
                    continue
                
                # Count unread messages from the other user
                unread_count = 0
                for message in conversation.messages:
                    if message['sender'] == other_userid and not message.get('read', False):
                        unread_count += 1
                
                # Only include users who have sent unread messages
                if unread_count > 0:
                    message_users.append({
                        'userid': other_user.userid,
                        'name': other_user.name,
                        'profilePic': other_user.images[0]['data'] if other_user.images and len(other_user.images) > 0 else None,
                        'unread_count': unread_count,
                        'last_message': conversation.messages[-1]['content'] if conversation.messages else '',
                        'last_message_time': conversation.messages[-1]['timestamp'] if conversation.messages else ''
                    })
            
            # Sort by last message time (most recent first)
            message_users.sort(key=lambda x: x['last_message_time'], reverse=True)
            
            return JsonResponse({
                'success': True,
                'users': message_users,
                'total_users': len(message_users)
            }, status=200)

        except Exception as e:
            print(f"❌ Error in get_message_users: {str(e)}")
            return JsonResponse({'error': f'Error fetching message users: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)


@csrf_exempt
def get_local_ai_chat_suggestions_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender_id = data.get('sender_id')
            receiver_id = data.get('receiver_id')

            if not sender_id or not receiver_id:
                return JsonResponse({'error': 'Sender and receiver IDs are required'}, status=400)

            # Get receiver's profile information
            try:
                receiver = User.objects.get(userid=receiver_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Receiver not found'}, status=404)
            
            # Get conversation history
            u1, u2 = sorted([sender_id, receiver_id])
            try:
                conversation = Conversation.objects.get(user1=u1, user2=u2)
                conversation_history = conversation.messages or []
            except Conversation.DoesNotExist:
                conversation_history = []

            # Get AI suggestions (tries Ollama first, falls back to manual system)
            from datetime import datetime
            from ollama_ai_chat import get_ai_chat_suggestions
            current_time = datetime.now()
            
            suggestions, ai_type = get_ai_chat_suggestions(
                sender_id=sender_id,
                receiver_name=receiver.name,
                receiver_interests=receiver.interests,
                conversation_history=conversation_history,
                current_time=current_time
            )

            return JsonResponse({
                'suggestions': suggestions,
                'context_info': {
                    'message_count': len(conversation_history),
                    'time_of_day': current_time.hour,
                    'is_first_contact_today': len([m for m in conversation_history if datetime.fromisoformat(m['timestamp'].replace('Z', '+00:00')).date() == current_time.date()]) == 0,
                    'ai_type': ai_type
                }
            }, status=200)

        except Exception as e:
            print(f"❌ Error in get_local_ai_chat_suggestions_api: {str(e)}")
            return JsonResponse({'error': f'Error generating local AI suggestions: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def get_user_profile(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        try:
            user = User.objects.get(userid=userid)
            return JsonResponse({
                'user': {
                    'userid': user.userid,
                    'name': user.name,
                    'email': user.email,
                    'gender': user.gender,
                    'interestedIn': user.interestedIn,
                    'lookingFor': user.lookingFor,
                    'distance': user.distance,
                    'education': user.education,
                    'interests': user.interests,
                    'lifestyle': user.lifestyle,
                    'personality': user.personality,
                    'images': user.images,
                    'profilePic': user.images[0]['data'] if user.images and len(user.images) > 0 else None
                }
            }, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)

@csrf_exempt
def update_user_profile(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userid = data.get('userid')

        if not userid:
            return JsonResponse({'error': 'User ID required'}, status=400)

        try:
            user = User.objects.get(userid=userid)
            
            # Update fields if provided
            if 'name' in data:
                user.name = data['name']
            if 'email' in data:
                # Check if email is already taken by another user
                if User.objects.filter(email=data['email']).exclude(userid=userid).exists():
                    return JsonResponse({'error': 'Email already exists'}, status=400)
                user.email = data['email']
            if 'gender' in data:
                user.gender = data['gender']
            if 'interestedIn' in data:
                user.interestedIn = data['interestedIn']
            if 'lookingFor' in data:
                user.lookingFor = data['lookingFor']
            if 'distance' in data:
                user.distance = data['distance']
            if 'education' in data:
                user.education = data['education']
            if 'interests' in data:
                user.interests = data['interests']
            if 'lifestyle' in data:
                user.lifestyle = data['lifestyle']
            if 'personality' in data:
                user.personality = data['personality']
            if 'images' in data:
                user.images = data['images']

            user.save()
            return JsonResponse({'message': 'Profile updated successfully'}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)