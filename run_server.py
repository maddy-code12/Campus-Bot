import os

import uvicorn

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
APP_ENV = os.getenv("APP_ENV", "development")
RELOAD = APP_ENV != "production"

if __name__ == "__main__":
    print("=" * 72)
    print("PDA COLLEGE OF ENGINEERING - CAMPUS ASSISTANT")
    print("Production Mode:", APP_ENV)
    print(f"Server starting at: http://{HOST}:{PORT}")
    print(f"Homepage: http://{HOST}:{PORT}/")
    print(f"API Docs: http://{HOST}:{PORT}/docs")
    print("=" * 72)
    uvicorn.run("app:app", host=HOST, port=PORT, reload=RELOAD)
