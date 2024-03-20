[![](/public/illustration.webp)]()

# ProustAI

> ProustAI is an _AI-powered_ **writing assistant** that helps you write your next novel. Writing a novel used to be painful, but with ProustAI, it's never been easier.

## Technologies

- [AdonisJS](https://adonisjs.com/) - A fully-featured Node.js framework
- [React](https://react.dev/) - The library for web and native user interfaces
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - A collection of TailwindCSS components
- [Inertia.js](https://inertiajs.com/) - A glue that connects AdonisJS and React
- [Docker](https://www.docker.com/) - A containerization platform
- [PostgreSQL](https://www.postgresql.org/) - A relational database management system

## Key Features

- Rich Text Editor
  - +LLMs-based "Complete", "Shorten", "Extend", "Rephrase", "Simplify" functionalities
- Characters Database
  - +Stable Diffusion-based visualizations
- Locations Database
  - +Stable Diffusion-based visualizations

## Incoming Features

- Story Board
- Plot Generator
- AI-based cover generator

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
# (and your REPLICATE_API_TOKEN if you want to use Stable Diffusion)
cp .env.example .env

# Install dependencies
npm install

# Start the development server
npm run dev
```
