# Campus Bot — P.D.A. College of Engineering 🎓

An intelligent, voice-enabled AI Campus Chatbot and Backend designed specifically for **Poojya Doddappa Appa (PDA) College of Engineering, Kalaburagi** (Autonomous Institution affiliated to VTU Belagavi, Estd. 1958).

---

## ✨ Features

### 1. 🏛️ Embeddable Floating Chatbot Widget
- **College Crest Button**: Floating bottom-right widget launcher featuring the official PDA College emblem with pulsing notification.
- **Multilingual Support**: First greets the user and offers 3 languages:
  - English
  - Kannada (ಕನ್ನಡ)
  - Hindi (हिंदी)
- **Voice Message Option (Speech-to-Text)**: Web Speech API microphone button allows students and staff to speak directly to the bot.
- **Voice Output (Text-to-Speech)**: Audio toggle (`🔊 / 🔈`) enables spoken replies in the selected language.
- **One-line Website Integration**: Embed on any page on `https://www.pdacek.ac.in` by adding:
  ```html
  <script src="http://127.0.0.1:8000/static/widget.js"></script>
  ```

---

### 2. 🎓 Admission Enquiry Section
- **Department Intake**: Seat numbers across 12+ streams (CSE: 180, ISE: 120, ECE: 120, AI&ML: 60, Civil: 120, Mech: 120, etc.).
- **Fee Structure**:
  - KCET Government Quota (~₹75,000 - ₹98,000/yr)
  - COMEDK Quota (~₹1,60,000 - ₹2,25,000/yr)
  - Management Quota details
- **Eligibility**: 10+2 / 2nd PUC 45% aggregate in PCM (40% for SC/ST/OBC Karnataka).
- **Direct Portal Links**: KEA Karnataka & PDA Admissions desk.

---

### 3. 📚 Student Academic Corner
Filter by Department (CSE, ISE, ECE, Civil, Mech, AIML) and Semester (1st to 8th) to access:
- **Autonomous Syllabus**: NEP scheme credit details and subject guides.
- **Timetables**: Class schedules and practical lab slots.
- **Notes**: Unit-wise lecture notes and PPTs.
- **PYQ (Previous Year Questions)**: Solved CIE and Semester End Examination (SEE) papers.
- **Lab Manuals**: Experiment code, circuits, and Viva Voce questions.

---

### 4. 👨‍🏫 Faculty & Staff Section
#### Public Directory & Live Teacher Locator:
- Faculty directory: Names, departments, designations, cabins, phone numbers, and official emails.
- **Live Teacher Locator**: Ask *"Where is Dr. S. R. Patil right now?"* or *"Locate Dr. Ramesh Kulkarni"*.
  - Compares the current day and time against active timetable slots.
  - Returns real-time status:
    - 🔴 `IN CLASS`: e.g. *Classroom 201 (Cloud Computing - CSE-7A)*
    - 🟢 `AVAILABLE IN CABIN`: e.g. *CS-Cabin 101*
  - Shows next upcoming class, room number, and time.

#### Private Staff Portal (Login Only):
- Protected login for teaching staff:
  - Demo: `staff_cse` / `pda1958` (Dr. S. R. Patil - HOD CSE)
  - Demo: `staff_ise` / `pda1958` (Dr. Ramesh Kulkarni - HOD ISE)
- View class student lists with attendance percentage (%) and Continuous Internal Evaluation (CIE) test marks (CIE-1, 2, 3, Assignment, Lab).
- Allows faculty to edit and save updated attendance and test scores directly to SQLite database.

---

### 5. 💰 Scholarship Section
- **SSP (State Scholarship Portal Karnataka)**: Post-matric fee reimbursement for SC/ST/OBC/Minorities with direct link: `https://ssp.postmatric.karnataka.gov.in/`
- **NSP (National Scholarship Portal)**: Central Sector Schemes & AICTE Pragati (₹50,000/yr for female engineering students).
- **Vidyasiri / Food & Accommodation**: ₹1,500/month for OBC students in private PGs.
- **Sitaram Jindal Foundation Scholarship**: Merit-cum-means financial aid.

---

### 6. 🌐 Official PDA College Portals & Links
Direct links to:
- Official Website: [https://www.pdacek.ac.in](https://www.pdacek.ac.in)
- KEA Admissions: [cetonline.karnataka.gov.in](https://cetonline.karnataka.gov.in/kea/)
- VTU Belagavi: [vtu.ac.in](https://vtu.ac.in)

---

## 🚀 How to Run

1. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

2. **Start the Server**:
   ```powershell
   python run_server.py
   ```
   *(or `uvicorn app:app --reload --port 8000`)*

3. **Open the Application**:
   - Open your browser to: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**
   - Click the PDA College Crest launcher in the bottom right corner to start chatting!
   - API Documentation (Swagger): **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**
