import os
import mimetypes
import tkinter as tk
from tkinter import filedialog
from pathlib import Path
import base64

class FileHandler:
    """Helper class to handle file operations and compatibility checks"""
    
    MODEL_FILE_COMPATIBILITY = {
        "chatgpt_bot": {
            "gpt-4.1-nano-2025-04-14": ["text", "image", "pdf", "csv", "json", "xlsx"],
            "gpt-4.1-mini-2025-04-14": ["text", "image", "pdf", "csv", "json", "xlsx"],
            "gpt-4o-mini-2024-07-18": ["text", "image", "pdf", "csv", "json", "xlsx"]
        },
        "deepseek_bot": {
            "deepseek/deepseek-chat-v3-0324:free": ["text", "csv", "json"],
            "deepseek/deepseek-r1:free": ["text", "csv", "json"],
            "deepseek/deepseek-r1-zero:free": ["text", "csv", "json"]
        },
        "gemini_bot": {
            "gemini-2.0-flash": ["text", "image", "pdf", "csv", "json"],
            "gemini-1.5-flash": ["text", "image", "pdf", "csv", "json"],
            "gemini-2.5-flash-preview-04-17": ["text", "image", "pdf", "csv", "json", "xlsx"]
        },
        "llama_bot": {
            "meta-llama/llama-4-maverick-17b-128e-instruct": ["text", "csv", "json"],
            "meta-llama/llama-4-scout-17b-16e-instruct": ["text", "csv", "json"],
            "llama-3.3-70b-versatile": ["text", "csv", "json"]
        },
        "mistral_bot": {
            "mistral-small-latest": ["text", "csv", "json"],
            "pixtral-12b-2409": ["text", "image", "csv", "json"],
            "open-mistral-nemo": ["text", "csv", "json"]
        },
        "qwen_bot": {
            "qwen/qwen3-235b-a22b:free": ["text", "image", "csv", "json"],
            "qwen/qwen3-30b-a3b:free": ["text", "image", "csv", "json"],
            "qwen/qwen2.5-vl-72b-instruct:free": ["text", "image", "csv", "json"],
            "qwen/qwen-2.5-coder-32b-instruct:free": ["text", "csv", "json", "code"]
        }
    }
    
    @staticmethod
    def select_file():
        """Open file dialog to select a file"""
        root = tk.Tk()
        root.withdraw()  
        root.attributes('-topmost', True) 
        file_path = filedialog.askopenfilename()
        root.destroy()
        
        if file_path:
            return file_path
        else:
            return None
    
    @staticmethod
    def encode_file(file_path):
        """Encode file to base64 and get mime type"""
        mime_type, _ = mimetypes.guess_type(file_path)
        
        if not mime_type:
            extension = os.path.splitext(file_path)[1][1:].lower()
            if extension in ['txt', 'md', 'py', 'js', 'html', 'css', 'java', 'c', 'cpp', 'go', 'rb', 'php', 'rust', 'swift']:
                mime_type = "text/plain"
            elif extension in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'tif']:
                mime_type = f"image/{extension}"
            elif extension == 'pdf':
                mime_type = "application/pdf"
            elif extension == 'json':
                mime_type = "application/json"
            elif extension == 'csv':
                mime_type = "text/csv"
            elif extension == 'xlsx':
                mime_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            elif extension == 'docx':
                mime_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            elif extension in ['xml', 'svg']:
                mime_type = f"application/{extension}+xml"
            elif extension == 'yaml' or extension == 'yml':
                mime_type = "application/x-yaml"
            else:
                mime_type = "application/octet-stream"
        
        with open(file_path, "rb") as file:
            encoded = base64.b64encode(file.read()).decode('utf-8')
        
        return {"mime_type": mime_type, "data": encoded}
    
    @staticmethod
    def is_file_compatible(bot_module, model, filepath):
        """Check if a file is compatible with the given bot and model"""
        if bot_module not in FileHandler.MODEL_FILE_COMPATIBILITY:
            return False, "Bot not found in compatibility list"
            
        if model not in FileHandler.MODEL_FILE_COMPATIBILITY[bot_module]:
            return False, f"Model {model} not found in compatibility list"
        
        mime_type, _ = mimetypes.guess_type(filepath)
        file_extension = Path(filepath).suffix.lower().replace('.', '')
        
        supported_types = FileHandler.MODEL_FILE_COMPATIBILITY[bot_module][model]
        
        if mime_type:
            if mime_type.startswith('text/') and "text" in supported_types:
                return True, None
            elif mime_type.startswith('image/') and "image" in supported_types:
                return True, None
            elif mime_type == 'application/pdf' and "pdf" in supported_types:
                return True, None
            elif mime_type in ['application/json', 'text/json'] and "json" in supported_types:
                return True, None
            elif mime_type in ['text/csv', 'application/csv'] and "csv" in supported_types:
                return True, None
            elif mime_type in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] and "xlsx" in supported_types:
                return True, None
            elif mime_type in ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] and "docx" in supported_types:
                return True, None
            elif (mime_type in ['application/xml', 'application/svg+xml', 'text/xml'] or 
                  mime_type.endswith('+xml')) and "xml" in supported_types:
                return True, None
        
        # Code files
        if file_extension in ['py', 'js', 'html', 'css', 'java', 'c', 'cpp', 'go', 'rb', 'php', 'rust', 'swift'] and "code" in supported_types:
            return True, None
        # General text files
        elif file_extension in ['txt', 'md', 'py', 'js', 'html', 'css', 'java', 'c', 'cpp', 'go', 'rb', 'php', 'rust', 'swift', 'yaml', 'yml'] and "text" in supported_types:
            return True, None
        # Image files
        elif file_extension in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'tif'] and "image" in supported_types:
            return True, None
        # Document files
        elif file_extension == 'pdf' and "pdf" in supported_types:
            return True, None
        elif file_extension == 'docx' and "docx" in supported_types:
            return True, None
        # Data files
        elif file_extension == 'json' and "json" in supported_types:
            return True, None
        elif file_extension == 'csv' and "csv" in supported_types:
            return True, None
        elif file_extension == 'xlsx' and "xlsx" in supported_types:
            return True, None
        elif file_extension in ['xml', 'svg'] and "xml" in supported_types:
            return True, None
        elif (file_extension == 'yaml' or file_extension == 'yml') and "yaml" in supported_types:
            return True, None
            
        return False, f"File type not supported by {bot_module} with model {model}"
    
    @staticmethod
    def read_file_content(filepath):
        """Read file content if it's a text file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                return file.read()
        except UnicodeDecodeError:
            return None  
        except Exception as e:
            return f"Error reading file: {str(e)}"
    
    @staticmethod
    def get_supported_file_types(bot_module, model):
        """Get a list of supported file types for a specific bot and model"""
        if bot_module not in FileHandler.MODEL_FILE_COMPATIBILITY:
            return []
            
        if model not in FileHandler.MODEL_FILE_COMPATIBILITY[bot_module]:
            return []
            
        supported_types = FileHandler.MODEL_FILE_COMPATIBILITY[bot_module][model]
        
        readable_types = []
        type_descriptions = {
            "text": "Text files (txt, md)",
            "image": "Images (jpg, png, etc.)",
            "pdf": "PDF documents",
            "csv": "CSV files",
            "json": "JSON files",
            "xlsx": "Excel files",
            "docx": "Word documents",
            "code": "Code files (py, js, etc.)",
            "xml": "XML files (xml, svg)",
            "yaml": "YAML files"
        }
        
        for type_code in supported_types:
            if type_code in type_descriptions:
                readable_types.append(type_descriptions[type_code])
            else:
                readable_types.append(type_code)
                
        return readable_types