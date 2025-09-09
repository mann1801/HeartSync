#!/usr/bin/env python3
"""
Check what's actually in the database
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from users.models import Conversation, User
from django.utils import timezone
from datetime import datetime

def check_conversation_status():
    """Check the actual database state"""
    print("🔍 Checking Database State")
    print("=" * 40)
    
    # Get the specific conversation
    try:
        conversation = Conversation.objects.get(user1="het27", user2="new27")
    except Conversation.DoesNotExist:
        print("❌ Conversation not found")
        return
    
    print(f"📅 User1 (het27) last read: {conversation.user1_last_read}")
    print(f"📅 User2 (new27) last read: {conversation.user2_last_read}")
    print(f"💬 Total messages: {len(conversation.messages or [])}")
    
    # Check each message
    print(f"\n📨 Messages:")
    for i, message in enumerate(conversation.messages or []):
        sender = message.get('sender')
        timestamp = message.get('timestamp')
        content = message.get('content', '')[:50]
        read_status = message.get('read', False)
        
        print(f"  {i+1}. From {sender}: '{content}' at {timestamp} (read: {read_status})")
    
    # Manually calculate unread count for het27
    print(f"\n🔢 Manual calculation for het27:")
    last_read = conversation.user1_last_read
    print(f"   Last read time: {last_read}")
    
    if last_read:
        print(f"   Last read type: {type(last_read)}")
        print(f"   Last read timezone: {last_read.tzinfo}")
    
    unread_count = 0
    for message in conversation.messages or []:
        if message['sender'] == 'new27':  # Messages from new27
            print(f"   Checking message: '{message['content'][:30]}' at {message['timestamp']}")
            
            if last_read:
                try:
                    # Parse message timestamp
                    message_time = datetime.fromisoformat(message['timestamp'].replace('Z', '+00:00'))
                    print(f"     Message time: {message_time} (type: {type(message_time)})")
                    print(f"     Message timezone: {message_time.tzinfo}")
                    
                    # Ensure both timestamps are timezone-aware and in UTC
                    if timezone.is_naive(message_time):
                        message_time = timezone.make_aware(message_time)
                        print(f"     Made message_time aware: {message_time}")
                    
                    if timezone.is_naive(last_read):
                        last_read = timezone.make_aware(last_read)
                        print(f"     Made last_read aware: {last_read}")
                    
                    # Convert both to UTC for comparison
                    from datetime import timezone as dt_timezone
                    message_time_utc = message_time.astimezone(dt_timezone.utc)
                    last_read_utc = last_read.astimezone(dt_timezone.utc)
                    
                    print(f"     Message UTC: {message_time_utc}")
                    print(f"     Last read UTC: {last_read_utc}")
                    print(f"     Message > Last read? {message_time_utc > last_read_utc}")
                    
                    if message_time_utc > last_read_utc:
                        unread_count += 1
                        print(f"     ✉️ UNREAD")
                    else:
                        print(f"     ✅ READ")
                        
                except Exception as e:
                    print(f"     ❌ Error: {e}")
                    unread_count += 1
            else:
                unread_count += 1
                print(f"     ✉️ UNREAD (no last_read)")
    
    print(f"\n📊 Final unread count: {unread_count}")

if __name__ == "__main__":
    check_conversation_status()