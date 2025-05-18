import os
from mistralai import Mistral
import base64
import mimetypes
from pathlib import Path

def initialize_bot(audience, role, model=None):
    """Initialize Mistral bot with audience, role and model"""
    API_KEY = os.getenv('MISTRAL_API_KEY')
    
    client = Mistral(api_key=API_KEY)
    
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
        model = "mistral-small-latest"
    
    return {
        "client": client,
        "history": [system_msg],
        "model": model
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to Mistral and get the response"""
    if file_path:
        try:
            mime_type, _ = mimetypes.guess_type(file_path)
            file_extension = Path(file_path).suffix.lower().replace('.', '')
            
            if bot["model"] == "mistral-large-latest" and mime_type and mime_type.startswith('image/'):
                with open(file_path, "rb") as image_file:
                    base64_image = base64.b64encode(image_file.read()).decode('utf-8')
                
                content = [{
                    "type": "text",
                    "text": file_prompt or question
                }, {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": mime_type,
                        "data": base64_image
                    }
                }]
                
                question_msg = {
                    "role": "user",
                    "content": content
                }
            elif mime_type == 'application/pdf' and (bot["model"] == "mistral-medium-latest" or bot["model"] == "mistral-large-latest"):
                with open(file_path, "rb") as pdf_file:
                    base64_pdf = base64.b64encode(pdf_file.read()).decode('utf-8')
                
                content = [{
                    "type": "text",
                    "text": file_prompt or question
                }, {
                    "type": "document",
                    "source": {
                        "type": "base64",
                        "media_type": "application/pdf",
                        "data": base64_pdf
                    }
                }]
                
                question_msg = {
                    "role": "user",
                    "content": content
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
                    return f"Error: This file type is not supported by {bot['model']}."
        except Exception as e:
            return f"Error processing file: {str(e)}"
    else:
        question_msg = {
            "role": "user",
            "content": question
        }
    
    bot["history"].append(question_msg)
    
    try:
        messages = [msg for msg in bot["history"] if "role" in msg and "content" in msg]
        
        response = bot["client"].chat.complete(
            model=bot["model"],
            messages=messages
        )
        
        answer_msg = {
            "role": "assistant",
            "content": response.choices[0].message.content
        }
        
        bot["history"].append(answer_msg)
        
        return answer_msg["content"]
    except Exception as e:
        return f"Error: {str(e)}"

def get_available_models():
    """Return available models for Mistral"""
    return {
        "1": "mistral-small-latest",
        "2": "pixtral-12b-2409",
        "3": "open-mistral-nemo"
    }