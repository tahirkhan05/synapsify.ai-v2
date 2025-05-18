# Synapsify V2 (AI Aggregator)
 
Frontend requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Follow these steps to view frontend:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server for frontend.
npm run dev
```

### The frontend is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


## Follow these steps for working backend:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: create .env file in the root folder.
QWEN_API_KEY = apikey_here
MISTRAL_API_KEY = apikey_here
DEEPSEEK_API_KEY = apikey_here
GEMINI_API_KEY = apikey_here
LLAMA_API_KEY = apikey_here
OPENAI_API_KEY = apikey_here
SUMMARIZER_API_KEY = apikey_here

# Step 4: Run requiremnts.txt to install libraries.
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Step 5: Run backend.
python main.py
```

### The backend is built with:

- Python

## Future Implementations:

### LLM Brain Split Mode

“Split this task between multiple models intelligently.”
You define a goal: "Write an email + generate bullet points + translate to Spanish."
Synapsify automatically delegates each part to the best model:
GPT → email
Gemini → bullet points
Groq → Spanish translation
Why it wins: You’ve built task-level model routing = a mini-AutoGPT with multiple brains.

### LLM Response RPG Mode

“Let’s play model vs. model like a game.”
Set a scenario: “Solve the climate crisis.”
Models take turns proposing solutions and attacking each other’s plans.
You choose the winner, RPG style.
Score based on logic, ethics, creativity.
Why it wins: Entertainment + AI awareness = viral potential.

### Persona Mixer (Model Fusion Output)

“Give me a hybrid of GPT’s creativity + Gemini’s factuality.”
Blend parts of responses into one.
Slider: 🎭 Creativity ←→ 🎯 Accuracy
Dynamic composition with explanation: “Opening is from GPT, core is from Gemini.”
Why it wins: Custom-model creation on the fly.
