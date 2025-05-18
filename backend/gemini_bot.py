import os
from google import genai
from google.genai import types
import base64
import mimetypes
from pathlib import Path

def initialize_bot(audience, role, model=None):
    """Initialize Gemini bot with audience, role and model"""
    API_KEY = os.getenv('GEMINI_API_KEY')
    
    client = genai.Client(api_key=API_KEY)
    
    if audience and role:
        system_instruction = f"respond as if you're a {role} explaining things to a {audience}."
    elif audience:
        system_instruction = f"respond as if you're explaining things to a {audience}."
    elif role:
        system_instruction = f"respond as if you're a {role}."
    else:
        system_instruction = "You are a helpful assistant."
    
    if not model:
        model = "gemini-2.0-flash"
    
    return {
        "client": client,
        "model": model,   
        "history": [],
        "system_instruction": system_instruction,
        "first_message": True  
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to Gemini and get the response"""
    
    try:
        if bot["first_message"]:
            if file_path:
                mime_type, _ = mimetypes.guess_type(file_path)
                if mime_type and mime_type.startswith('image/'):
                    with open(file_path, "rb") as image_file:
                        image_data = image_file.read()
                    
                    prompt_text = bot['system_instruction'] + "\n\n" + (file_prompt or question)
                    parts = [
                        {"text": prompt_text},
                        {"inline_data": {"mime_type": mime_type, "data": base64.b64encode(image_data).decode('utf-8')}}
                    ]
                    
                    response = bot["client"].models.generate_content(
                        model=bot["model"],
                        contents=[{"role": "user", "parts": parts}]
                    )
                else:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        file_content = file.read()
                    
                    prompt_text = f"{bot['system_instruction']}\n\n{file_prompt or question}\n\nFile content:\n{file_content}"
                    response = bot["client"].models.generate_content(
                        model=bot["model"],
                        contents=[{"role": "user", "parts": [{"text": prompt_text}]}]
                    )
            else:
                prompt = f"{bot['system_instruction']} Now respond to this question: {question}"
                response = bot["client"].models.generate_content(
                    model=bot["model"],
                    contents=[{"role": "user", "parts": [{"text": prompt}]}]
                )
            
            bot["first_message"] = False
        else:
            messages = []
            
            for entry in bot["history"]:
                messages.append(entry)
            
            if file_path:
                mime_type, _ = mimetypes.guess_type(file_path)
                if mime_type and mime_type.startswith('image/'):
                    with open(file_path, "rb") as image_file:
                        image_data = image_file.read()
                    
                    parts = [
                        {"text": file_prompt or question},
                        {"inline_data": {"mime_type": mime_type, "data": base64.b64encode(image_data).decode('utf-8')}}
                    ]
                    messages.append({"role": "user", "parts": parts})
                else:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        file_content = file.read()
                    
                    prompt_text = f"{file_prompt or question}\n\nFile content:\n{file_content}"
                    messages.append({"role": "user", "parts": [{"text": prompt_text}]})
            else:
                messages.append({"role": "user", "parts": [{"text": question}]})
            
            response = bot["client"].models.generate_content(
                model=bot["model"],
                contents=messages
            )
        
        answer = response.text
        
        if file_path:
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type and mime_type.startswith('image/'):
                with open(file_path, "rb") as image_file:
                    image_data = image_file.read()
                
                parts = [
                    {"text": file_prompt or question},
                    {"inline_data": {"mime_type": mime_type, "data": base64.b64encode(image_data).decode('utf-8')}}
                ]
                bot["history"].append({"role": "user", "parts": parts})
            else:
                bot["history"].append({"role": "user", "parts": [{"text": f"[File uploaded] {file_prompt or question}"}]})
        else:
            bot["history"].append({"role": "user", "parts": [{"text": question}]})
        
        bot["history"].append({"role": "model", "parts": [{"text": answer}]})
        
        return answer
        
    except Exception as e:
        return f"Error: {str(e)}"

def get_available_models():
    """Return available models for Gemini"""
    return {
        "1": "gemini-2.0-flash",
        "2": "gemini-1.5-flash",
        "3": "gemini-2.5-flash-preview-04-17"
    }