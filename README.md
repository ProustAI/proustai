# ProustAI

> ProustAI is an _AI-powered_ **writing assistant** that helps you write your next novel. Writing a novel used to be painful, but with ProustAI, it's never been easier.

## Development setup

### Requirements

- [Docker](https://www.docker.com)
- [Node.js & NPM](https://nodejs.org)
- [OpenAI API Key](https://platform.openai.com) to run GPT or [Ollama](https://ollama.com) to run LLMs locally

### Installation

```bash
# Clone the repository
git clone https://github.com/alexisbouchez/proustai.git

# Change directory
cd proustai

# Set up environment variables
# (fill in the .env file with your OpenAI API key if you want to use GPT)
cp .env.example .env

# Install dependencies
npm install

# Start the development server
npm run dev
```
