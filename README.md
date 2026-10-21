# Campus Bot

Campus Bot is an AI-powered campus assistant for PDA College of Engineering, Kalaburagi. It provides admissions, timetable, department, scholarship, and faculty lookup features through a FastAPI backend and embeddable chatbot UI.

## Features
- Smart campus chatbot with multilingual support
- Admissions and fee information
- Faculty and department lookup
- Timetable and academic resources
- Scholarship and notice browsing
- Embeddable web widget for college portals
- FastAPI + SQLite backend for quick deployment

## Tech Stack
- Python 3.10+
- FastAPI
- SQLite
- Uvicorn / Gunicorn
- HTML, CSS, JavaScript widget

## Project Structure
```text
Campus-Bot/
├── app.py
├── ml_engine.py
├── run_server.py
├── requirements.txt
├── .env.example
├── Dockerfile
├── README.md
├── index.html
├── widget.js
├── embed_example.html
├── static/
├── data/
├── rules/
└── test_api.py
```

## Local Development

### 1) Create a virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2) Install dependencies
```bash
pip install -r requirements.txt
```

### 3) Configure environment variables
Copy the sample file and adjust values if needed:
```bash
cp .env.example .env
```

### 4) Run the application
```bash
python run_server.py
```

or directly:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

## Access the app
- App homepage: http://127.0.0.1:8000/
- API docs: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/api/health

## Production Deployment
```bash
gunicorn app:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Environment Variables
Create a `.env` file using `.env.example`.

Example:
```env
APP_ENV=development
HOST=0.0.0.0
PORT=8000
DB_FILE=campus.db
ALLOWED_ORIGINS=*
AI_URL=
```

## Notes
- The app is designed for university campus operations and educational support.
- For production, it is recommended to replace hardcoded demo credentials and restrict CORS origins.
- This project is a strong foundation for a modern campus assistant but still needs security hardening before public production use.

## License
This project is for educational and institutional use.
