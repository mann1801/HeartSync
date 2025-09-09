#!/usr/bin/env python3
"""
Setup script to help configure Ollama for the chat suggestions system
"""

import subprocess
import time
import requests
import sys

def check_ollama_installed():
    """Check if Ollama is installed"""
    try:
        result = subprocess.run(['ollama', '--version'], capture_output=True, text=True, timeout=5)
        return result.returncode == 0
    except:
        return False

def check_ollama_running():
    """Check if Ollama server is running"""
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        return response.status_code == 200
    except:
        return False

def get_installed_models():
    """Get list of installed models"""
    try:
        result = subprocess.run(['ollama', 'list'], capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            lines = result.stdout.strip().split('\n')[1:]  # Skip header
            models = [line.split()[0] for line in lines if line.strip()]
            return models
        return []
    except:
        return []

def install_model(model_name):
    """Install a model"""
    print(f"📥 Installing {model_name}... This may take a few minutes.")
    try:
        process = subprocess.Popen(['ollama', 'pull', model_name], 
                                 stdout=subprocess.PIPE, 
                                 stderr=subprocess.STDOUT, 
                                 text=True,
                                 encoding='utf-8',
                                 errors='ignore')
        
        for line in process.stdout:
            print(f"   {line.strip()}")
        
        process.wait()
        return process.returncode == 0
    except Exception as e:
        print(f"❌ Error installing model: {e}")
        return False

def main():
    print("🚀 Ollama Setup for Chat Suggestions")
    print("=" * 40)
    
    # Check if Ollama is installed
    if not check_ollama_installed():
        print("❌ Ollama is not installed!")
        print("📋 Please install Ollama first:")
        print("   Windows: Download from https://ollama.ai/download")
        print("   macOS: brew install ollama")
        print("   Linux: curl -fsSL https://ollama.ai/install.sh | sh")
        return
    
    print("✅ Ollama is installed")
    
    # Check if Ollama is running
    if not check_ollama_running():
        print("⚠️  Ollama server is not running")
        print("📋 Starting Ollama server...")
        print("   Run this command in another terminal: ollama serve")
        print("   Or on Windows, Ollama should start automatically")
        
        # Wait a bit and check again
        print("   Waiting 5 seconds...")
        time.sleep(5)
        
        if not check_ollama_running():
            print("❌ Ollama server still not running")
            print("   Please start it manually: ollama serve")
            return
    
    print("✅ Ollama server is running")
    
    # Check installed models
    models = get_installed_models()
    if models:
        print(f"✅ Found {len(models)} installed model(s):")
        for model in models:
            print(f"   - {model}")
    else:
        print("⚠️  No models installed")
        
        # Recommend and install a model
        print("\n📋 Recommended models for chat suggestions:")
        print("   1. llama3.2:1b    - Small, fast (1.3GB)")
        print("   2. llama3.2       - Better quality (4.3GB)")
        print("   3. phi3:mini      - Microsoft model (2.3GB)")
        
        choice = input("\nWhich model would you like to install? (1/2/3 or model name): ").strip()
        
        model_map = {
            '1': 'llama3.2:1b',
            '2': 'llama3.2',
            '3': 'phi3:mini'
        }
        
        model_to_install = model_map.get(choice, choice)
        
        if model_to_install:
            if install_model(model_to_install):
                print(f"✅ Successfully installed {model_to_install}")
            else:
                print(f"❌ Failed to install {model_to_install}")
                return
    
    # Test the system
    print("\n🧪 Testing the chat suggestions system...")
    try:
        from test_ollama import test_ollama_connection
        test_ollama_connection()
    except Exception as e:
        print(f"❌ Error testing system: {e}")
    
    print("\n🎉 Setup complete! Your chat suggestions should now use Ollama.")

if __name__ == "__main__":
    main()