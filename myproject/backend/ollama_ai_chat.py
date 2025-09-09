"""
Ollama AI Chat Suggestions System
Connects to local Ollama server for intelligent chat suggestions
"""

import requests
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from fallback_ai_chat import get_fallback_ai_suggestions

class OllamaAIChatSuggestions:
    """
    AI-powered chat suggestions using local Ollama server
    """
    
    def __init__(self, ollama_url: str = "http://localhost:11434", model: str = None):
        self.ollama_url = ollama_url
        self.model = model or self.get_available_model()
        self.is_available = self.check_ollama_availability()
    
    def get_available_model(self) -> str:
        """Get the first available model from Ollama, or return a default"""
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=5)
            if response.status_code == 200:
                data = response.json()
                models = data.get('models', [])
                if models:
                    # Return the first available model
                    model_name = models[0]['name']
                    print(f"🔍 Found model: {model_name}")
                    return model_name
            # Default models to try in order of preference
            print("🔍 No models found, using default: llama3.2:1b")
            return "llama3.2:1b"
        except requests.exceptions.RequestException as e:
            print(f"🔍 Error getting models: {e}, using default: llama3.2:1b")
            return "llama3.2:1b"
    
    def check_ollama_availability(self) -> bool:
        """Check if Ollama server is running and accessible"""
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=5)
            return response.status_code == 200
        except requests.exceptions.RequestException:
            return False
    
    def generate_ollama_suggestions(self, sender_id: str, receiver_name: str, 
                                  receiver_interests: List[str], conversation_history: List[Dict],
                                  current_time: datetime) -> Optional[List[str]]:
        """Generate suggestions using Ollama"""
        try:
            # Build context for the AI
            context = self.build_conversation_context(
                sender_id, receiver_name, receiver_interests, 
                conversation_history, current_time
            )
            # Add sender_id to context for proper message attribution
            context['sender_id'] = sender_id
            
            # Create prompt for Ollama
            prompt = self.create_suggestion_prompt(context)
            
            # Make request to Ollama with optimized settings
            response = requests.post(
                f"{self.ollama_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.8,
                        "top_p": 0.9,
                        "num_predict": 200,  # Allow more tokens
                        "repeat_penalty": 1.1
                    }
                },
                timeout=30  # Longer timeout for better reliability
            )
            
            if response.status_code == 200:
                result = response.json()
                raw_response = result.get('response', '')
                suggestions = self.parse_ollama_response(raw_response)
                return suggestions if suggestions else None
            else:
                print(f"❌ Ollama API error: {response.status_code}")
                print(f"❌ Response: {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Ollama connection error: {str(e)}")
            return None
        except Exception as e:
            print(f"❌ Ollama generation error: {str(e)}")
            return None
    
    def build_conversation_context(self, sender_id: str, receiver_name: str, 
                                 receiver_interests: List[str], conversation_history: List[Dict],
                                 current_time: datetime) -> Dict[str, Any]:
        """Build context information for the AI"""
        
        # Analyze conversation history
        message_count = len(conversation_history)
        last_messages = conversation_history[-5:] if conversation_history else []
        
        # Determine time context
        hour = current_time.hour
        if 5 <= hour < 12:
            time_context = "morning"
        elif 12 <= hour < 17:
            time_context = "afternoon"
        elif 17 <= hour < 22:
            time_context = "evening"
        else:
            time_context = "night"
        
        # Determine conversation stage
        if message_count == 0:
            conversation_stage = "first_contact"
        elif message_count <= 5:
            conversation_stage = "initial"
        elif message_count <= 15:
            conversation_stage = "getting_to_know"
        else:
            conversation_stage = "established"
        
        # Check if it's first contact today
        today = current_time.date()
        is_first_contact_today = True
        if conversation_history:
            for msg in reversed(conversation_history):
                try:
                    msg_date = datetime.fromisoformat(msg['timestamp'].replace('Z', '+00:00')).date()
                    if msg_date == today:
                        is_first_contact_today = False
                        break
                except:
                    continue
        
        return {
            'receiver_name': receiver_name,
            'receiver_interests': receiver_interests,
            'message_count': message_count,
            'last_messages': last_messages,
            'time_context': time_context,
            'conversation_stage': conversation_stage,
            'is_first_contact_today': is_first_contact_today,
            'current_time': current_time
        }
    
    def create_suggestion_prompt(self, context: Dict[str, Any]) -> str:
        """Create an effective prompt for Ollama that prioritizes conversation context"""
        
        receiver_name = context['receiver_name']
        receiver_interests = context.get('receiver_interests', [])
        last_messages = context.get('last_messages', [])
        time_context = context['time_context']
        conversation_stage = context['conversation_stage']
        
        # PRIORITY 1: If there are recent messages, respond to the conversation
        if last_messages:
            # Get the last few messages for context
            recent_conversation = ""
            for msg in last_messages[-3:]:  # Last 3 messages
                sender = "You" if msg.get('sender') == context.get('sender_id') else receiver_name
                content = msg.get('content', '')
                recent_conversation += f"{sender}: {content}\n"
            
            prompt = f"""You are helping someone write casual, friendly chat messages for a dating app conversation with {receiver_name}.

Recent conversation:
{recent_conversation}

Write 4 natural, casual response messages that continue this conversation. Make them friendly and engaging. Only provide the message text, no labels or speaker names.

Response 1:
Response 2:
Response 3:
Response 4:"""
        
        # PRIORITY 2: If no recent conversation, use interests and context
        else:
            interests_text = f" who likes {', '.join(receiver_interests[:2])}" if receiver_interests else ""
            
            if conversation_stage == "first_contact":
                prompt = f"""Write 4 friendly opening messages to start a conversation with {receiver_name}{interests_text}. Make them engaging for {time_context} time.

1.
2.
3.
4."""
            else:
                prompt = f"""Write 4 casual chat messages to send to {receiver_name}{interests_text}. Make them friendly and engaging for {time_context} time.

1.
2.
3.
4."""

        return prompt
    
    def is_refusal_response(self, response_text: str) -> bool:
        """Check if the response is a refusal or safety message"""
        if not response_text:
            return True
        
        refusal_indicators = [
            "i can't generate",
            "i cannot generate",
            "i'm not able to",
            "i cannot help",
            "i can't help",
            "i can't assist",
            "i cannot assist",
            "phishing",
            "personal information",
            "sensitive information",
            "dietary restrictions",
            "inappropriate",
            "not appropriate",
            "safety",
            "harmful",
            "against my guidelines",
            "i'm designed to",
            "i don't feel comfortable",
            "dating app conversations",
            "is there anything else i can help you with"
        ]
        
        response_lower = response_text.lower()
        return any(indicator in response_lower for indicator in refusal_indicators)
    
    def parse_ollama_response(self, response_text: str) -> List[str]:
        """Parse Ollama's response to extract suggestions and remove speaker labels"""
        if not response_text:
            return []
        
        # Check if this is a refusal response
        if self.is_refusal_response(response_text):
            print("⚠️ Ollama gave a refusal response, treating as empty")
            return []
        
        # Split by lines and clean up
        lines = [line.strip() for line in response_text.split('\n') if line.strip()]
        
        suggestions = []
        
        for line in lines:
            # Skip intro lines
            if line.lower().startswith(('here are', 'suggestions:', 'examples:', 'messages:', 'generate', 'based on')):
                continue
            
            # Remove common prefixes (numbers, bullets, etc.)
            cleaned_line = line.lstrip('1234567890.-• ')
            
            # Remove speaker labels like "You:", "New ID:", "Name:", etc.
            # Look for pattern: "Word:" or "Words:" at the beginning
            if ':' in cleaned_line:
                parts = cleaned_line.split(':', 1)
                if len(parts) == 2:
                    # Check if the first part looks like a speaker label (short and no spaces or just one word)
                    potential_label = parts[0].strip()
                    if len(potential_label.split()) <= 2 and len(potential_label) < 20:
                        # This looks like a speaker label, remove it
                        cleaned_line = parts[1].strip()
            
            # Remove quotes if they wrap the entire message
            if cleaned_line.startswith('"') and cleaned_line.endswith('"'):
                cleaned_line = cleaned_line[1:-1].strip()
            
            # Skip if too short or empty after cleaning
            if len(cleaned_line) < 10:
                continue
            
            # Add valid suggestions
            if cleaned_line and len(suggestions) < 4:
                suggestions.append(cleaned_line)
        
        # If we didn't find any suggestions with the strict parsing, try a more lenient approach
        if not suggestions:
            for line in lines:
                cleaned_line = line.lstrip('1234567890.-• ').strip()
                
                # Remove speaker labels more aggressively
                if ':' in cleaned_line:
                    parts = cleaned_line.split(':', 1)
                    if len(parts) == 2:
                        cleaned_line = parts[1].strip()
                
                # Remove quotes
                if cleaned_line.startswith('"') and cleaned_line.endswith('"'):
                    cleaned_line = cleaned_line[1:-1].strip()
                
                if len(cleaned_line) > 10 and not cleaned_line.lower().startswith(('here are', 'note:', 'remember:', 'based on')):
                    suggestions.append(cleaned_line)
                    if len(suggestions) >= 4:
                        break
        
        return suggestions[:4]  # Return max 4 suggestions
    
    def get_suggestions(self, sender_id: str, receiver_name: str, 
                       receiver_interests: List[str] = None, 
                       conversation_history: List[Dict] = None, 
                       current_time: datetime = None) -> tuple[List[str], str]:
        """
        Get chat suggestions, trying Ollama first, falling back to manual system
        Returns: (suggestions, ai_type)
        """
        if current_time is None:
            current_time = datetime.now()
        
        if receiver_interests is None:
            receiver_interests = []
        
        if conversation_history is None:
            conversation_history = []
        
        # Check if Ollama is available
        if not self.is_available:
            self.is_available = self.check_ollama_availability()
        
        # Try Ollama first
        if self.is_available:
            print(f"🤖 Attempting to get suggestions from Ollama ({self.model})...")
            ollama_suggestions = self.generate_ollama_suggestions(
                sender_id, receiver_name, receiver_interests, 
                conversation_history, current_time
            )
            
            if ollama_suggestions and len(ollama_suggestions) > 0:
                print(f"✅ Got {len(ollama_suggestions)} suggestions from Ollama")
                return ollama_suggestions, 'local_ollama'
            else:
                print("⚠️ Ollama returned empty suggestions, falling back...")
        else:
            print("⚠️ Ollama server not available, using fallback system...")
        
        # Fallback to manual system
        fallback_suggestions = get_fallback_ai_suggestions(
            sender_id, receiver_name, receiver_interests, 
            conversation_history, current_time
        )
        
        return fallback_suggestions, 'intelligent_fallback'

# Initialize Ollama AI system
ollama_ai = OllamaAIChatSuggestions()

def get_ai_chat_suggestions(sender_id: str, receiver_name: str, receiver_interests: List[str] = None, 
                           conversation_history: List[Dict] = None, current_time: datetime = None) -> tuple[List[str], str]:
    """
    Main function to get AI chat suggestions
    Returns: (suggestions, ai_type)
    """
    return ollama_ai.get_suggestions(
        sender_id, receiver_name, receiver_interests, 
        conversation_history, current_time
    )