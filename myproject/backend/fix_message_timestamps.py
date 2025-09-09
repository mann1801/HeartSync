#!/usr/bin/env python3
"""
Fix existing message timestamps to be timezone-aware
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from users.models import Conversation
from django.utils import timezone
from datetime import datetime

def fix_message_timestamps():
    """Fix all existing message timestamps to be timezone-aware"""
    print("🔧 Fixing message timestamps...")
    
    conversations = Conversation.objects.all()
    total_fixed = 0
    
    for conversation in conversations:
        if not conversation.messages:
            continue
        
        print(f"\n📝 Fixing conversation: {conversation.user1} ↔ {conversation.user2}")
        
        updated_messages = []
        messages_fixed = 0
        
        for message in conversation.messages:
            timestamp_str = message.get('timestamp', '')
            
            try:
                # Parse the existing timestamp
                if 'T' in timestamp_str and '+' not in timestamp_str and 'Z' not in timestamp_str:
                    # This is a naive timestamp like "2025-08-14T17:27:48.675995"
                    naive_dt = datetime.fromisoformat(timestamp_str)
                    
                    # Convert to timezone-aware (assuming it was created in the server's timezone)
                    aware_dt = timezone.make_aware(naive_dt)
                    
                    # Update the message timestamp
                    message['timestamp'] = aware_dt.isoformat()
                    messages_fixed += 1
                    
                    print(f"   ✅ Fixed: {timestamp_str} → {message['timestamp']}")
                else:
                    print(f"   ⏭️  Skipped: {timestamp_str} (already timezone-aware)")
                
            except Exception as e:
                print(f"   ❌ Error fixing timestamp {timestamp_str}: {e}")
            
            updated_messages.append(message)
        
        if messages_fixed > 0:
            conversation.messages = updated_messages
            conversation.save()
            total_fixed += messages_fixed
            print(f"   💾 Saved {messages_fixed} fixed messages")
    
    print(f"\n🎉 Fixed {total_fixed} message timestamps across {len(conversations)} conversations")

if __name__ == "__main__":
    fix_message_timestamps()