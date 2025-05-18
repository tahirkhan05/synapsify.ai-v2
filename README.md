# Synapsify V2 (AI Aggregator)
 
The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9ed929e3-24ec-4316-8c6a-844c9a0f7c2f) and click on Share -> Publish.

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

# Step 4: Run backend.
python main.py
```

## The backend is built with:

- Python
