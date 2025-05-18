import os
from google import genai
from google.genai import types

class Summarizer:
    """Helper class to summarize and compare responses from different bots"""
    
    @staticmethod
    def summarize_outputs(responses, bot_names):
        """Use Gemini 1.5 Pro to summarize and compare outputs from different bots"""
        if not responses:
            return "No responses to summarize."
            
        api_key = os.environ.get("SUMMARIZER_API_KEY")
        if not api_key:
            return "Error: SUMMARIZER_API_KEY not found in environment variables."

        try:
            client = genai.Client(api_key=api_key)
            model = "gemini-1.5-flash-8b"
            
            # Prepare input for Gemini
            input_text = "Compare the following AI responses and identify: 1) Common points shared across all responses, and 2) Unique points made only by specific models.\n\n"
            
            for bot_name in bot_names:
                if bot_name in responses:
                    input_text += f"### {bot_name} response:\n{responses[bot_name]}\n\n"
            
            contents = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(text=input_text),
                    ],
                ),
            ]
            
            generate_content_config = types.GenerateContentConfig(
                response_mime_type="text/plain",
            )
            
            response = client.models.generate_content(
                model=model,
                contents=contents,
                config=generate_content_config,
            )
            
            return response.text
            
        except Exception as e:
            return f"Error generating summary: {str(e)}"