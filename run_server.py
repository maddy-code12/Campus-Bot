import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("PDA COLLEGE OF ENGINEERING - CAMPUS ASSISTANT")
    print("Autonomous Institution Estd. 1958 | Kalaburagi, Karnataka")
    print("Server starting at: http://127.0.0.1:8000")
    print("Chatbot Widget & Portal: http://127.0.0.1:8000/")
    print("API Documentation: http://127.0.0.1:8000/docs")
    print("=" * 60)
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
