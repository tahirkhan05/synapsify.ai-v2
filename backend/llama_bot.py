import os
from groq import Groq

def initialize_bot(audience, role, model=None):
    """Initialize Llama bot with audience, role and model"""
    API_KEY = os.getenv('LLAMA_API_KEY')
    
    client = Groq(api_key=API_KEY)
    
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
        model = "meta-llama/llama-4-maverick-17b-128e-instruct"
    
    return {
        "client": client,
        "history": [system_msg],
        "model": model
    }

def ask(bot, question, file_path=None, file_prompt=None):
    """Send a question to Llama and get the response"""
    if file_path:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                file_content = file.read()
            
            if file_prompt:
                full_question = f"{file_prompt}\n\nFile content:\n{file_content}"
            else:
                full_question = f"{question}\n\nFile content:\n{file_content}"
        except UnicodeDecodeError:
            return "Error: This model only supports text files."
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
            messages=bot["history"],
            model=bot["model"]
        )
        
        answer_msg = response.choices[0].message
        bot["history"].append(answer_msg)
        
        return answer_msg.content
    except Exception as e:
        return f"Error: {str(e)}"

def get_available_models():
    """Return available models for Llama"""
    return {
        "1": "meta-llama/llama-4-maverick-17b-128e-instruct",
        "2": "meta-llama/llama-4-scout-17b-16e-instruct",
        "3": "llama-3.3-70b-versatile"
    }