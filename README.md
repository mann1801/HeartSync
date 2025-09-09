# HeartSync

## Project Overview

HeartSync is a full-stack application powered by a Python/Django backend, a Vite/React frontend, and local LLM inference using [Ollama](https://ollama.com/).

---

## Prerequisites

- Python 3.10+ (for backend)
- Node.js 18+ and npm (for frontend)
- [Ollama](https://ollama.com/download) installed (for running local LLMs)

---

## Backend Setup

1. **Install dependencies:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

2. **Run migrations:**
    ```bash
    python manage.py migrate
    ```

3. **Start the backend server:**
    ```bash
    python manage.py runserver
    ```

---

## Frontend Setup

1. **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2. **Start the frontend development server:**
    ```bash
    npm run dev
    ```

---

## Ollama & Model Setup

1. **Start the Ollama server:**
    ```bash
    ollama serve
    ```

2. **Download a supported model (recommended: llama3.2:1b for small size):**
    ```bash
    ollama pull llama3.2:1b
    ```
    > You can also use other models like `phi3:mini` or `gemma:2b` depending on your hardware and requirements.

3. **Configure your backend to use the model name you downloaded (e.g., `llama3.2:1b`).**

---

## Usage

- Visit the frontend (usually at [http://localhost:5173](http://localhost:5173)) after starting both backend and frontend servers.
- Ensure Ollama is running and the required model is downloaded. after running command "ollama serve" check in (http://127.0.0.1:11434).
- The backend will communicate with Ollama for LLM-powered features.

---

## Notes

- If you want to use a different model, check [Ollama’s model library](https://ollama.com/library) and update your backend configuration accordingly.
- For best performance, use a model that fits your system’s RAM/VRAM.

---

## Troubleshooting

- **Permission denied for Vite:**  
  Run `chmod +x node_modules/.bin/vite` in the frontend directory.
- **Model not found:**  
  Make sure you have pulled the correct model with `ollama pull <model-name>`.
- **Large request errors:**  
  Increase `DATA_UPLOAD_MAX_MEMORY_SIZE` in your Django settings if needed.

---

## License

[MIT](LICENSE)
