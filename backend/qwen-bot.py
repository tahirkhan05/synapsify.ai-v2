import os
from openai import OpenAI
import base64
import mimetypes
from pathlib import Path

def initialize_bot(audience, role, model=None):
    """Initialize Qwen bot with audience, role and model"""
    QWEN_API_KEY = os.getenv('QWEN_API_KEY')
    
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=QWEN_API_KEY
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
        model = "qwen/qwen3-235b-a22b:free"
    
    return {
        "client": client,
        "history": [system_msg],
        "model": model
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to Qwen and get the response"""
    if file_path:
        try:
            mime_type, _ = mimetypes.guess_type(file_path)
            model_supports_images = "qwen1.5-14b-chat" not in bot["model"]
            
            if mime_type and mime_type.startswith('image/') and model_supports_images:
                with open(file_path, "rb") as image_file:
                    base64_image = base64.b64encode(image_file.read()).decode('utf-8')
                
                question_msg = {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": file_prompt or question},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{base64_image}"
                            }
                        }
                    ]
                }
            else:
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        file_content = file.read()
                    
                    full_question = f"{file_prompt or question}\n\nFile content:\n{file_content}"
                    question_msg = {
                        "role": "user",
                        "content": full_question
                    }
                except UnicodeDecodeError:
                    if model_supports_images:
                        return "Error: Only text and image files are supported by this model."
                    else:
                        return "Error: Only text files are supported by this model."
        except Exception as e:
            return f"Error processing file: {str(e)}"
    else:
        question_msg = {
            "role": "user",
            "content": question
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
    """Return available models for Qwen"""
    return {
        "1": "qwen/qwen3-235b-a22b:free",
        "2": "qwen/qwen3-30b-a3b:free",
        "3": "qwen/qwen2.5-vl-72b-instruct:free",
        "4": "qwen/qwen-2.5-coder-32b-instruct:free"
    }