import sys
sys.stdout.reconfigure(encoding="utf-8")
from starlette.testclient import TestClient
from app import app

client = TestClient(app)

print("--- Test 1: Greet ---")
r = client.get("/api/greet?lang=kn")
assert r.status_code == 200, f"Status: {r.status_code}"
print("Greeting (KN):", r.json()["title"])

print("--- Test 2: Admissions ---")
r = client.get("/api/admissions")
assert r.status_code == 200
print("College:", r.json()["college"])
print("Depts count:", len(r.json()["departments"]))

print("--- Test 3: Student Resources ---")
r = client.get("/api/student/resources?dept=CSE&sem=5")
assert r.status_code == 200
print("CSE 5th Sem resources:", len(r.json()))

print("--- Test 4: Teacher Locate ---")
r = client.get("/api/teacher/locate?name=Patil")
assert r.status_code == 200
data = r.json()[0]
print("Teacher:", data["name"], "| In class:", data["in_class"], "| Loc:", data["likely_location"])

print("--- Test 5: Staff Login & Student Records ---")
r = client.post("/api/staff/login", json={"username": "staff_cse", "password": "pda1958"})
assert r.status_code == 200
print("Staff login success:", r.json()["user"]["full_name"])

r = client.get("/api/staff/students?dept=CSE")
assert r.status_code == 200
print("CSE Students count:", len(r.json()))

r = client.get("/api/staff/student-records?usn=3PD22CS001")
assert r.status_code == 200
print("Student record subjects count:", len(r.json()["records"]))

print("--- Test 6: Chatbot NLP ---")
r = client.post("/api/chat", json={"message": "Where is Dr. S. R. Patil right now?", "lang": "en"})
assert r.status_code == 200
print("Bot reply to teacher locate:")
print(r.json()["reply"])

r = client.post("/api/chat", json={"message": "Show admission fees", "lang": "en"})
assert r.status_code == 200
print("Bot reply to admission fees:")
print(r.json()["reply"][:180] + "...")

print("--- Test 7: Scholarships ---")
r = client.get("/api/scholarships")
assert r.status_code == 200
print("Scholarships loaded:", len(r.json()))

print("--- ALL TESTS PASSED! ---")
