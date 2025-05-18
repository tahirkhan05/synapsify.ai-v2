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

## The frontend is built with:

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

## The backend is built with:

- Python
