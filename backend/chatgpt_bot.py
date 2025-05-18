import os
from openai import OpenAI
import base64
import mimetypes
from pathlib import Path

def initialize_bot(audience, role, model=None):
    """Initialize ChatGPT bot with audience, role and model"""
    API_KEY = os.getenv('OPENAI_API_KEY')
    
    client = OpenAI(api_key=API_KEY)
    
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
        model = "gpt-4.1-nano-2025-04-14"
    
    return {
        "client": client,
        "history": [system_msg],
        "model": model
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to ChatGPT and get the response"""
    question_content = []
    
    question_text = file_prompt if file_prompt else question
    if file_path and not file_prompt:
        question_text = f"Here's a file. {question}"
    
    question_content.append({"type": "text", "text": question_text})
    
    if file_path:
        try:
            mime_type, _ = mimetypes.guess_type(file_path)
            file_extension = Path(file_path).suffix.lower().replace('.', '')
            
            if mime_type and mime_type.startswith('image/'):
                with open(file_path, "rb") as image_file:
                    base64_image = base64.b64encode(image_file.read()).decode('utf-8')
                
                question_content.append({
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:{mime_type};base64,{base64_image}"
                    }
                })
            else:
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        file_content = file.read()
                    
                    question_content[0]["text"] += f"\n\nFile content:\n{file_content}"
                    
                except UnicodeDecodeError:
                    return "Error: This file format is not supported directly. For binary files other than images, consider using OpenAI's File API or Assistants API instead."
                
        except Exception as e:
            return f"Error processing file: {str(e)}"
    
    question_msg = {
        "role": "user",
        "content": question_content
    }
    
    bot["history"].append(question_msg)
    
    try:
        response = bot["client"].chat.completions.create(
            messages=bot["history"],
            model=bot["model"]
        )
        
        answer_msg = response.choices[0].message
        bot["history"].append(answer_msg)
        
        return answer_msg.content
    except Exception as e:
        return f"Error: {str(e)}"

def get_available_models():
    """Return available models for ChatGPT"""
    return {
        "1": "gpt-4.1-nano-2025-04-14",
        "2": "gpt-4.1-mini-2025-04-14",
        "3": "gpt-4o-mini-2024-07-18"
    }