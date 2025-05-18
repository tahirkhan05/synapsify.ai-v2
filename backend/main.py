import os
from dotenv import load_dotenv
import importlib
from file_handler import FileHandler
from summarizer import Summarizer
import datetime

load_dotenv()

AVAILABLE_BOTS = {
    "1": {"name": "ChatGPT", "module": "chatgpt_bot"},
    "2": {"name": "DeepSeek", "module": "deepseek_bot"},
    "3": {"name": "Gemini", "module": "gemini_bot"},
    "4": {"name": "Llama", "module": "llama_bot"},
    "5": {"name": "Mistral", "module": "mistral_bot"},
    "6": {"name": "Qwen", "module": "qwen_bot"}
}

def clear_screen():
    """Clear the terminal screen based on the OS"""
    os.system('cls' if os.name == 'nt' else 'clear')

def select_bots():
    """Allow user to select up to 4 bots to compare"""
    selected_bots = {}
    
    print("Available bots:")
    for key, bot in AVAILABLE_BOTS.items():
        print(f"{key}. {bot['name']}")
    
    print("\nSelect up to 4 bots (enter numbers separated by spaces, e.g. '1 3 5'):")
    selections = input("> ").strip().split()
    
    if not selections:
        print("No bots selected. Exiting...")
        exit()
    
    if len(selections) > 4:
        print("You selected more than 4 bots. Only the first 4 will be used.")
        selections = selections[:4]
    
    for selection in selections:
        if selection in AVAILABLE_BOTS:
            bot_info = AVAILABLE_BOTS[selection]
            selected_bots[bot_info["name"]] = {"module": bot_info["module"]}
        else:
            print(f"Invalid selection: {selection}. Skipping.")
    
    if not selected_bots:
        print("No valid bots selected. Exiting...")
        exit()
    
    return selected_bots

def select_model(bot_name, module_name):
    """Allow user to select a model for the bot"""
    try:
        bot_module = importlib.import_module(module_name)
        available_models = bot_module.get_available_models()
        
        print(f"\nAvailable models for {bot_name}:")
        for key, model in available_models.items():
            # Display supported file types for this model
            supported_files = FileHandler.get_supported_file_types(module_name, model)
            file_support_str = ", ".join(supported_files) if supported_files else "None"
            print(f"{key}. {model} - Supported file types: {file_support_str}")
        
        print(f"Select a model for {bot_name} (press Enter for default):")
        selection = input("> ").strip()
        
        if selection in available_models:
            return available_models[selection]
        else:
            print("Using default model.")
            return None
            
    except (ImportError, AttributeError) as e:
        print(f"Error loading models for {bot_name}: {str(e)}")
        return None

def configure_bots(selected_bots):
    """Configure audience, role, and model for each selected bot"""
    for bot_name, config in selected_bots.items():
        print(f"\nConfigure {bot_name}:")
        audience = input(f"{bot_name} Audience (leave empty for default): ")
        role = input(f"{bot_name} Role (leave empty for default): ")
        
        model = select_model(bot_name, config["module"])
        
        selected_bots[bot_name]["audience"] = audience
        selected_bots[bot_name]["role"] = role
        selected_bots[bot_name]["model"] = model
    
    return selected_bots

def initialize_bots(selected_bots):
    """Initialize each bot module and create chat instances"""
    initialized_bots = {}
    
    for bot_name, config in selected_bots.items():
        try:
            bot_module = importlib.import_module(config["module"])
            
            bot_instance = bot_module.initialize_bot(
                config["audience"], 
                config["role"],
                config["model"]
            )
            
            initialized_bots[bot_name] = {
                "instance": bot_instance,
                "ask_function": bot_module.ask,
                "module_name": config["module"]
            }
            
            print(f"Successfully initialized {bot_name}")
            
        except Exception as e:
            print(f"Error initializing {bot_name}: {str(e)}")
    
    return initialized_bots

def upload_file():
    """Open file dialog for user to select a file using tkinter"""
    file_path = FileHandler.select_file()
    
    if file_path:
        file_name = os.path.basename(file_path)
        print(f"File selected: {file_name}")
        print("Enter a specific prompt for this file (or press Enter to use the regular question):")
        file_prompt = input("> ").strip()
        return file_path, file_prompt if file_prompt else None
    else:
        print("No file selected.")
        return None, None

def save_conversation(conversation_log):
    """Save the conversation log to a text file"""
    if not conversation_log:
        print("No conversation to save.")
        return False
        
    # Create timestamp for filename
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"conversation_{timestamp}.txt"
    
    try:
        # Save to current directory
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(conversation_log)
        print(f"\nConversation saved to: {os.path.abspath(filename)}")
        return True
    except Exception as e:
        print(f"\nError saving conversation: {str(e)}")
        return False

def chat_interface(bots):
    """Run the chat interface for comparing bot responses"""
    bot_names = list(bots.keys())
    
    if not bot_names:
        print("No bots were successfully initialized. Exiting...")
        exit()
        
    print(f"\nChat with {', '.join(bot_names)}. Type 'exit' to quit.")
    print("You can upload files by typing '/upload' as your question.")
    print("You can get a summary of all responses by typing '/summarize' after seeing all responses.")
    print("To save the conversation, type '/download'.")
    
    current_responses = {}  # Store the latest responses from each bot
    conversation_log = ""   # Store the entire conversation
    
    while True:
        question = input("\nYou: ")
        
        if question.strip().lower() in ['exit', 'quit']:
            if conversation_log:
                print("\nDo you want to save the conversation before exiting? (y/n)")
                save_choice = input("> ").strip().lower()
                if save_choice == 'y':
                    save_conversation(conversation_log)
            print("Exiting chat. Goodbye!")
            break
            
        if question.strip().lower() == '/download':
            save_conversation(conversation_log)
            continue
            
        if question.strip().lower() == '/summarize':
            if not current_responses:
                print("\nNo responses to summarize. Please ask a question first.")
                continue
                
            try:
                print("\nGenerating summary...")
                summary = Summarizer.summarize_outputs(current_responses, bot_names)
                print("\n" + "=" * 50)
                print(summary)
                print("=" * 50)
                
                # Add summary to conversation log
                conversation_log += "\n\n" + "=" * 50 + "\nSUMMARY:\n" + summary + "\n" + "=" * 50
            except Exception as e:
                print(f"\nError generating summary: {str(e)}")
                print("Make sure you have set the HUGGINGFACE_API_KEY in your .env file.")
            continue
        
        file_path = None
        file_prompt = None
        
        if question.strip().lower() == '/upload':
            file_path, file_prompt = upload_file()
            if file_path:
                print("Enter your question:")
                question = input("> ").strip()
            else:
                continue  # Skip if no file was selected
        
        # Add question to conversation log
        conversation_log += f"\nYou: {question}\n"
        if file_path:
            conversation_log += f"[File uploaded: {os.path.basename(file_path)}]\n"
        
        # Clear previous responses when asking a new question
        current_responses = {}
        
        for bot_name, bot_data in bots.items():
            try:
                if file_path:
                    module_name = bot_data["module_name"]
                    model = bot_data["instance"]["model"]
                    
                    is_compatible, error_msg = FileHandler.is_file_compatible(module_name, model, file_path)
                    
                    if not is_compatible:
                        print(f"\n{bot_name}: {error_msg}")
                        conversation_log += f"\n{bot_name}: {error_msg}\n"
                        print("-" * 50)
                        continue
                
                answer = bot_data["ask_function"](
                    bot_data["instance"], 
                    question,
                    file_path=file_path,
                    file_prompt=file_prompt
                )
                
                # Store the response
                current_responses[bot_name] = answer
                
                # Add to conversation log
                conversation_log += f"\n{bot_name}: {answer}\n"
                conversation_log += "-" * 50 + "\n"
                
                print(f"\n{bot_name}: {answer}\n")
                print("-" * 50)
            except Exception as e:
                error_message = f"\n{bot_name} error: {str(e)}\n"
                conversation_log += error_message
                conversation_log += "-" * 50 + "\n"
                print(error_message)
                print("-" * 50)
        
        # After getting all responses
        if current_responses:
            print("Type '/summarize' to get a summary comparing the responses")
            print("Type '/download' to save the conversation")

def main():
    clear_screen()
    print("Welcome to Multi-Bot Chat Comparison Tool")
    print("=" * 50)
    
    # Check if Hugging Face API key is set
    if not os.getenv('HUGGINGFACE_API_KEY'):
        print("Warning: HUGGINGFACE_API_KEY not found in environment variables.")
        print("Summary feature will not work without this key.")
        print("Please add it to your .env file: HUGGINGFACE_API_KEY=your_key_here")
        print("-" * 50)
    
    selected_bots = select_bots()
    
    configured_bots = configure_bots(selected_bots)
    
    initialized_bots = initialize_bots(configured_bots)
    
    clear_screen()
    chat_interface(initialized_bots)

if __name__ == "__main__":
    main()