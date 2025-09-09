"""
Fallback AI Chat Suggestions System
Works without external models while Ollama setup is being resolved
"""

import random
import re
from datetime import datetime
from typing import List, Dict, Any

class FallbackAIChatSuggestions:
    """
    Intelligent fallback system that provides contextual suggestions
    without requiring external AI models
    """
    
    def __init__(self):
        # Context-aware response templates
        self.greeting_responses = {
            'hi': [
                "Hi there! How's your day going so far?",
                "Hey! Great to hear from you! What's been the highlight of your day?",
                "Hello! I was just thinking about you. How are you feeling today?",
                "Hi! What's something good that happened to you recently?"
            ],
            'hello': [
                "Hello! How are you doing today?",
                "Hey there! What's new with you?",
                "Hi! Hope you're having a wonderful day!",
                "Hello! What's been keeping you busy lately?"
            ],
            'good morning': [
                "Good morning! How did you sleep?",
                "Morning! What's the first thing that made you smile today?",
                "Good morning! Any exciting plans for today?",
                "Morning sunshine! How are you starting your day?"
            ],
            'good evening': [
                "Good evening! How was your day?",
                "Evening! What was the best part of your day?",
                "Good evening! How are you winding down?",
                "Evening! Tell me about your day!"
            ]
        }
        
        self.question_responses = [
            "That's such a thoughtful question! Let me think about that...",
            "Great question! Here's what I think...",
            "You always ask the most interesting questions!",
            "That's a really good point! I'd say...",
            "Interesting question! My perspective is...",
            "I love how you think! Here's my take..."
        ]
        
        self.excited_responses = [
            "Your excitement is contagious! Tell me more!",
            "That's amazing! What's got you so excited?",
            "I love your enthusiasm! What happened?",
            "Wow, that sounds incredible! Share the details!",
            "Your energy is infectious! What's the story?",
            "That's fantastic! I'm excited to hear more!"
        ]
        
        self.supportive_responses = [
            "That sounds challenging. How are you handling it?",
            "I'm here for you. What's been the hardest part?",
            "That must be tough. What usually helps you feel better?",
            "I can understand why that would be difficult. Want to talk about it?",
            "Sending you positive vibes. How can I support you?",
            "That's a lot to deal with. What's helping you get through it?"
        ]
        
        self.conversation_starters = {
            'initial': [
                "What's something about you that would surprise most people?",
                "If you could have dinner with anyone, who would it be?",
                "What's been the highlight of your week so far?",
                "What's something you're passionate about?",
                "If you could travel anywhere right now, where would you go?",
                "What's your idea of a perfect day?"
            ],
            'getting_to_know': [
                "What's something you've learned about yourself recently?",
                "What's your favorite way to spend a weekend?",
                "What's a goal you're working towards right now?",
                "What always puts you in a good mood?",
                "What's something you're grateful for today?",
                "What's your favorite memory from this year?"
            ],
            'building_connection': [
                "I really enjoy our conversations! What do you think makes us click?",
                "You have such an interesting perspective on things!",
                "What's something you've been thinking about lately?",
                "I love how we can talk about anything! What's on your mind?",
                "You always make me smile! What's your secret?",
                "What's something you're looking forward to?"
            ],
            'established': [
                "I love how comfortable we've become! What made you smile today?",
                "You mean so much to me! What's something you're grateful for?",
                "What's been the best part of your day?",
                "I love our daily conversations! How are you feeling?",
                "What's something exciting happening in your life?",
                "You always brighten my day! What's new with you?"
            ]
        }
        
        self.time_based_responses = {
            'morning': [
                "Good morning! How are you starting your day?",
                "Morning! What's your plan for today?",
                "Hope you slept well! What's first on your agenda?",
                "Good morning! Any exciting plans for today?"
            ],
            'afternoon': [
                "How's your day treating you so far?",
                "Hope your afternoon is going well!",
                "What's been the highlight of your day?",
                "How are things going today?"
            ],
            'evening': [
                "How was your day? I'd love to hear about it!",
                "Hope you had a great day! What was the best part?",
                "How are you winding down after your day?",
                "What made today special for you?"
            ],
            'night': [
                "Still up? What's on your mind tonight?",
                "Late night thoughts? I'm here to chat!",
                "Can't sleep? Want to talk about what's keeping you up?",
                "Hope you're having a peaceful evening!"
            ]
        }
    
    def analyze_message(self, message: str) -> Dict[str, Any]:
        """Analyze the message for context and sentiment"""
        message_lower = message.lower().strip()
        
        # Detect message type
        message_type = 'general'
        sentiment = 'neutral'
        
        # Greeting detection
        greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'sup', 'what\'s up']
        for greeting in greetings:
            if greeting in message_lower:
                message_type = 'greeting'
                break
        
        # Question detection
        if '?' in message:
            message_type = 'question'
        
        # Excitement detection
        excitement_indicators = ['!', 'amazing', 'awesome', 'great', 'excited', 'fantastic', 'incredible', 'omg', 'wow']
        if any(indicator in message_lower for indicator in excitement_indicators):
            sentiment = 'excited'
            message_type = 'excited'
        
        # Support needed detection
        support_indicators = ['sad', 'tired', 'stressed', 'difficult', 'hard', 'tough', 'worried', 'anxious']
        if any(indicator in message_lower for indicator in support_indicators):
            sentiment = 'needs_support'
            message_type = 'concern'
        
        return {
            'type': message_type,
            'sentiment': sentiment,
            'content': message_lower,
            'length': len(message.split())
        }
    
    def get_time_context(self, current_time: datetime) -> str:
        """Get time-based context"""
        hour = current_time.hour
        
        if 5 <= hour < 12:
            return 'morning'
        elif 12 <= hour < 17:
            return 'afternoon'
        elif 17 <= hour < 22:
            return 'evening'
        else:
            return 'night'
    
    def get_conversation_stage(self, message_count: int) -> str:
        """Determine conversation stage based on message count"""
        if message_count <= 5:
            return 'initial'
        elif message_count <= 15:
            return 'getting_to_know'
        elif message_count <= 30:
            return 'building_connection'
        else:
            return 'established'
    
    def generate_suggestions(self, sender_id: str, receiver_name: str, 
                           receiver_interests: List[str], conversation_history: List[Dict],
                           current_time: datetime = None) -> List[str]:
        """Generate intelligent suggestions based on context"""
        
        if current_time is None:
            current_time = datetime.now()
        
        suggestions = []
        
        # Analyze last message if exists
        if conversation_history:
            last_message = conversation_history[-1]['content']
            message_analysis = self.analyze_message(last_message)
            message_count = len(conversation_history)
        else:
            message_analysis = {'type': 'general', 'sentiment': 'neutral'}
            message_count = 0
        
        # Get context
        time_context = self.get_time_context(current_time)
        conversation_stage = self.get_conversation_stage(message_count)
        
        # Generate suggestions based on message type
        if message_analysis['type'] == 'greeting':
            # Handle specific greetings
            greeting_key = None
            for key in self.greeting_responses.keys():
                if key in message_analysis['content']:
                    greeting_key = key
                    break
            
            if greeting_key:
                suggestions.extend(random.sample(self.greeting_responses[greeting_key], min(3, len(self.greeting_responses[greeting_key]))))
            else:
                # Generic greeting responses
                suggestions.extend(random.sample(self.greeting_responses['hi'], 2))
        
        elif message_analysis['type'] == 'question':
            suggestions.extend(random.sample(self.question_responses, min(3, len(self.question_responses))))
        
        elif message_analysis['type'] == 'excited':
            suggestions.extend(random.sample(self.excited_responses, min(3, len(self.excited_responses))))
        
        elif message_analysis['type'] == 'concern':
            suggestions.extend(random.sample(self.supportive_responses, min(3, len(self.supportive_responses))))
        
        else:
            # General conversation based on stage
            if conversation_stage in self.conversation_starters:
                stage_suggestions = self.conversation_starters[conversation_stage]
                suggestions.extend(random.sample(stage_suggestions, min(2, len(stage_suggestions))))
        
        # Add time-based suggestions if it's first contact of the day
        if message_count == 0 or (message_count == 1 and message_analysis['type'] == 'greeting'):
            if time_context in self.time_based_responses:
                time_suggestions = self.time_based_responses[time_context]
                suggestions.extend(random.sample(time_suggestions, min(1, len(time_suggestions))))
        
        # Personalize with receiver name
        personalized_suggestions = []
        for suggestion in suggestions:
            if '{name}' in suggestion:
                personalized_suggestions.append(suggestion.replace('{name}', receiver_name))
            else:
                personalized_suggestions.append(suggestion)
        
        # Remove duplicates and return top suggestions
        unique_suggestions = list(dict.fromkeys(personalized_suggestions))
        return unique_suggestions[:4]  # Return top 4 suggestions

# Initialize fallback system
fallback_ai = FallbackAIChatSuggestions()

def get_fallback_ai_suggestions(sender_id: str, receiver_name: str, receiver_interests: List[str] = None, 
                               conversation_history: List[Dict] = None, current_time: datetime = None) -> List[str]:
    """
    Get intelligent fallback suggestions without external AI models
    """
    return fallback_ai.generate_suggestions(
        sender_id, receiver_name, receiver_interests or [], 
        conversation_history or [], current_time
    )