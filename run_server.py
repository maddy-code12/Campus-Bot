import os

import uvicorn

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
RELOAD = os.getenv("APP_ENV", "development") != "production"

if __name__ == "__main__":
    print("=" * 68)
    print("PDA COLLEGE OF ENGINEERING - CAMPUS ASSISTANT")
    print("Autonomous Institution Estd. 1958 | Kalaburagi, Karnataka")
    print(f"Server starting at: http://{HOST}:{PORT}")
    print(f"Homepage: http://{HOST}:{PORT}/")
    print(f"API Docs: http://{HOST}:{PORT}/docs")
    print("=" * 68)
    uvicorn.run("app:app", host=HOST, port=PORT, reload=RELOAD)
