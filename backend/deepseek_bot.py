import os
from openai import OpenAI
import base64
import mimetypes
from pathlib import Path

def initialize_bot(audience, role, model=None):
    """Initialize DeepSeek bot with audience, role and model"""
    DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
    
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=DEEPSEEK_API_KEY
    )
    
    system_content = ""
    if audience and role:
        system_content = f"respond as if you're a {role} explaining things to a {audience}."
    elif audience:
        system_content = f"respond as if you're explaining things to a {audience}."
    elif role:
        system_content = f"respond as if you're a {role}."
    else:
        system_content = "You are a helpful assistant."
    
    system_msg = {
        "role": "system",
        "content": system_content
    }
    
    if not model:
        model = "deepseek/deepseek-chat-v3-0324:free"
    
    return {
        "client": client,
        "history": [system_msg],
        "model": model
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to DeepSeek and get the response"""
    if file_path:
        try:
            file_content = None
            with open(file_path, 'r', encoding='utf-8') as file:
                file_content = file.read()
            
            if file_prompt:
                full_question = f"{file_prompt}\n\nFile content:\n{file_content}"
            else:
                full_question = f"{question}\n\nFile content:\n{file_content}"
        except Exception as e:
            return f"Error processing file: {str(e)}"
    else:
        full_question = question
    
    question_msg = {
        "role": "user",
        "content": full_question
    }
    
    bot["history"].append(question_msg)
    
    try:
        response = bot["client"].chat.completions.create(
            model=bot["model"],
            messages=bot["history"]
        )
        
        answer_msg = response.choices[0].message
        bot["history"].append(answer_msg)
        
        return answer_msg.content
    except Exception as e:
        return f"Error: {str(e)}"

def get_available_models():
    """Return available models for DeepSeek"""
    return {
        "1": "deepseek/deepseek-chat-v3-0324:free",
        "2": "deepseek/deepseek-r1:free",
        "3": "deepseek/deepseek-r1-zero:free"
    }