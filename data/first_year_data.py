"""
H.K.E Society's P. D. A College of Engineering, Kalaburagi
B.E. 1st Semester Official Timetable Data (With effect from: 07.09.2026)
Sections A through R + Engineering Science Course - I (ESC-I)
"""

FIRST_YEAR_TIMETABLE = {
    "A": {
        "stream": "CSE (ACS01-ACS64)",
        "dept": "Computer Science & Engineering",
        "room": "FB LH01",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. A G Hiremath", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Triveni", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Sarita M", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Dr. Radha B K", "dept": "CSE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Vijalaxmi T", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Dr. Radha B K", "dept": "CSE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Shrassa", "dept": "Respective Dept"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["PHY Lab A1 / POC Lab A2", "PHY Lab A1 / POC Lab A2", "Maths (CSMAT101)", "Soft Skills (KKSSC106)", "ESC - 1", "Prog in C (CSPOC105)", "LIBRARY"],
            "Tue": ["PHY Lab A2 / POC Lab A1", "PHY Lab A2 / POC Lab A1", "CAED (CSCED103)", "CAED (CSCED103)", "ESC - 1", "COE (Centre of Excellence)", "COE"],
            "Wed": ["Maths LAB: A", "Maths LAB: A", "Physics (CSPHY102)", "Prog in C (CSPOC105)", "ESC - 1", "–", "–"],
            "Thu": ["Physics (CSPHY102)", "Maths (CSMAT101)", "CAED Lab (CSCED103)", "CAED Lab (CSCED103)", "LIBRARY", "–", "–"],
            "Fri": ["Prog in C (CSPOC105)", "Physics (CSPHY102)", "IDT - FBLH01", "IDT - FBLH01", "LIBRARY", "–", "–"],
            "Sat": ["Maths (CSMAT101)", "Kannada (KK KSK/KBK109)", "COE (Centre of Excellence)", "COE (Centre of Excellence)", "–", "–", "–"],
        }
    },
    "B": {
        "stream": "CSE (BCS01-BCS64)",
        "dept": "Computer Science & Engineering",
        "room": "FB LH02",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. Gopichand T P", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Bhoodevi", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Dr. Prashant H", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Prof. Revati Soma", "dept": "CSE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Prof. Revati Soma", "dept": "CSE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Mahananda H", "dept": "CSE"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["Maths (CSMAT101)", "Physics (CSPHY102)", "IDT - FBLH03", "IDT - FBLH03", "ESC - 1", "COE", "COE"],
            "Tue": ["Prog in C (CSPOC105)", "Maths (CSMAT101)", "COE", "COE", "ESC - 1", "LIBRARY", "–"],
            "Wed": ["PHY Lab B1 / POC Lab B2", "PHY Lab B1 / POC Lab B2", "CAED (CSCED103)", "CAED (CSCED103)", "ESC - 1", "–", "–"],
            "Thu": ["PHY Lab B2 / POC Lab B1", "PHY Lab B2 / POC Lab B1", "Maths (CSMAT101)", "Kannada (KK KSK/KBK109)", "Prog in C (CSPOC105)", "–", "–"],
            "Fri": ["Maths LAB: B", "Maths LAB: B", "Physics (CSPHY102)", "Prog in C (CSPOC105)", "LIBRARY", "–", "–"],
            "Sat": ["CAED Lab (CSCED103)", "CAED Lab (CSCED103)", "Physics (CSPHY102)", "Soft Skills (KKSSC106)", "–", "–", "–"],
        }
    },
    "C": {
        "stream": "CSE (CCS01-CCS64)",
        "dept": "Computer Science & Engineering",
        "room": "FB LH02 / LH01",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. Veena M", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Bhoodevi", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Yohan R", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Dr. Jayashree A", "dept": "CSE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Savitri S", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Dr. Jayashree A", "dept": "CSE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Shivani", "dept": "CSE"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["Maths LAB: C", "Maths LAB: C", "Physics (CSPHY102)", "Prog in C (CSPOC105)", "ESC - 1", "Maths (CSMAT101)", "–"],
            "Tue": ["Physics - FBLH01", "Maths - FBLH01", "Prog in C - FBLH02", "Soft Skills - LBLH02", "ESC - 1", "–", "–"],
            "Wed": ["CAED Lab (CSCED103)", "CAED Lab (CSCED103)", "LIBRARY", "LIBRARY", "ESC - 1", "IDT - FBLH02", "IDT - FBLH02"],
            "Thu": ["Maths - FBLH02", "Kannada - FBLH02", "Prog in C - FBLH01", "Physics - FBLH01", "LIBRARY", "COE", "COE"],
            "Fri": ["PHY Lab C1 / POC Lab C2", "PHY Lab C1 / POC Lab C2", "COE", "COE", "LIBRARY", "–", "–"],
            "Sat": ["PHY Lab C2 / POC Lab C1", "PHY Lab C2 / POC Lab C1", "CAED (CSCED103)", "CAED (CSCED103)", "–", "–", "–"],
        }
    },
    "D": {
        "stream": "CSE (DCS01-DCS64)",
        "dept": "Computer Science & Engineering",
        "room": "FBLH03",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. S B Malipatil", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Dr. Satish Lathure", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Dr. V G Biradar", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Prof. Pooja B", "dept": "CSE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Vijaylaxmi T", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Prof. Pooja B", "dept": "CSE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Priyanka N", "dept": "CSE"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["Maths (CSMAT101)", "Kannada (KK KSK/KBK109)", "PHY Lab D1 / POC Lab D2", "PHY Lab D1 / POC Lab D2", "ESC - 1", "–", "–"],
            "Tue": ["COE", "COE", "PHY Lab D2 / POC Lab D1", "PHY Lab D2 / POC Lab D1", "ESC - 1", "LIBRARY", "–"],
            "Wed": ["Prog in C (CSPOC105)", "Physics (CSPHY102)", "Maths LAB: D", "Maths LAB: D", "ESC - 1", "–", "–"],
            "Thu": ["Maths (CSMAT101)", "Prog in C (CSPOC105)", "COE", "COE", "LIBRARY", "IDT - FBLH03", "IDT - FBLH03"],
            "Fri": ["Physics (CSPHY102)", "Maths (CSMAT101)", "CAED Lab (CSCED103)", "CAED Lab (CSCED103)", "Prog in C (CSPOC105)", "–", "–"],
            "Sat": ["Physics (CSPHY102)", "Soft Skills (KKSSC106)", "CAED (CSCED103)", "CAED (CSCED103)", "–", "–", "–"],
        }
    },
    "E": {
        "stream": "CSD (ECG01-ECG42) & CSE (ECS01-09)",
        "dept": "CS & Design, CSE",
        "room": "FBLH06",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. M S Patil", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Triveni", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Eshwar U", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Prof. Mahananda H", "dept": "CSE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Anand D Patil", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Prof. Mahananda H", "dept": "CSE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Revati Soma", "dept": "CSE"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["Maths (CSMAT101)", "Soft Skills (KKSSC106)", "CAED LAB (CSCED103)", "CAED LAB (CSCED103)", "ESC - 1", "–", "–"],
            "Tue": ["Prog in C (CSPOC105)", "Maths (CSMAT101)", "Physics (CSPHY102)", "Kannada (KK KSK/KBK109)", "ESC - 1", "COE", "COE"],
            "Wed": ["Prog in C (CSPOC105)", "Physics (CSPHY102)", "PHY Lab E1 / POC Lab E2", "PHY Lab E1 / POC Lab E2", "ESC - 1", "–", "–"],
            "Thu": ["COE", "COE", "PHY Lab E2 / POC Lab E1", "PHY Lab E2 / POC Lab E1", "LIBRARY", "–", "–"],
            "Fri": ["Physics (CSPHY102)", "Maths (CSMAT101)", "Maths LAB: E", "Maths LAB: E", "LIBRARY", "IDT - FBLH06", "IDT - FBLH06"],
            "Sat": ["CAED (CSCED103)", "CAED (CSCED103)", "Prog in C (CSPOC105)", "LIBRARY", "–", "–", "–"],
        }
    },
    "F": {
        "stream": "ISE (FIS01-FIS50)",
        "dept": "Information Science & Engineering",
        "room": "FB LH01 / LH03 / LH02 / LH06",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Prof. Rajeshwari B", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Manjunath Malipatil", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Sarita M", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Dr. Priyadarshini P", "dept": "ISE"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Anand D Patil", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Dr. Priyadarshini P", "dept": "ISE"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Neha", "dept": "ISE"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["CAED (CSCED103)", "CAED (CSCED103)", "Maths LAB: F", "Maths LAB: F", "ESC - 1", "IDT - FBLH07", "IDT - FBLH07"],
            "Tue": ["Physics (CSPHY102)", "Kannada (KK KSK/KBK109)", "Prog in C (CSPOC105)", "LIBRARY", "ESC - 1", "–", "–"],
            "Wed": ["Soft Skills (KKSSC106)", "Prog in C (CSPOC105)", "CAED LAB (CSCED103)", "CAED LAB (CSCED103)", "ESC - 1", "–", "–"],
            "Thu": ["Maths (CSMAT101)", "Prog in C (CSPOC105)", "COE", "COE", "LIBRARY", "–", "–"],
            "Fri": ["Maths (CSMAT101)", "Physics (CSPHY102)", "PHY Lab F1 / POC Lab F2", "PHY Lab F1 / POC Lab F2", "LIBRARY", "COE", "COE"],
            "Sat": ["Physics (CSPHY102)", "Maths (CSMAT101)", "PHY Lab F2 / POC Lab F1", "PHY Lab F2 / POC Lab F1", "–", "–", "–"],
        }
    },
    "G": {
        "stream": "AI&ML (GAI01-GAI60)",
        "dept": "Artificial Intelligence & Machine Learning",
        "room": "FB LH07",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. Umadevi R Devani", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Dr. Satish Lathure", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Dr. Prashant H", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Prof. Ashwini H", "dept": "AIML"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Prof. Ashwini H", "dept": "AIML"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Sonali", "dept": "AIML"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["LIBRARY", "LIBRARY", "CAED (CSCED103)", "CAED (CSCED103)", "ESC - 1", "PHY Lab G1 / POC Lab G2", "PHY Lab G1 / POC Lab G2"],
            "Tue": ["COE", "COE", "IDT", "IDT", "ESC - 1", "PHY Lab G2 / POC Lab G1", "PHY Lab G2 / POC Lab G1"],
            "Wed": ["Prog in C (CSPOC105)", "Maths (CSMAT101)", "Physics (CSPHY102)", "Kannada (KK KSK/KBK109)", "ESC - 1", "Maths LAB: G", "Maths LAB: G"],
            "Thu": ["CAED LAB (CSCED103)", "CAED LAB (CSCED103)", "Physics (CSPHY102)", "Maths (CSMAT101)", "LIBRARY", "–", "–"],
            "Fri": ["Soft Skills (KKSSC106)", "Prog in C (CSPOC105)", "COE", "COE", "LIBRARY", "–", "–"],
            "Sat": ["Maths (CSMAT101)", "Prog in C (CSPOC105)", "Physics (CSPHY102)", "LIBRARY", "–", "–", "–"],
        }
    },
    "H": {
        "stream": "AI&ML (HAI01-HAI49)",
        "dept": "Artificial Intelligence & Machine Learning",
        "room": "FB LH08",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. Suvarna H", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Siddaling B", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Shivakumar Patil", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Prof. Chandrakant Biradar", "dept": "AIML"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Savitri S", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Prof. Priyanka", "dept": "AIML"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Sonali", "dept": "AIML"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["Physics (CSPHY102)", "Prog in C (CSPOC105)", "Soft Skills (KKSSC106)", "LIBRARY", "ESC - 1", "Maths LAB: H", "Maths LAB: H"],
            "Tue": ["CAED (CSCED103)", "CAED (CSCED103)", "Maths (CSMAT101)", "Prog in C (CSPOC105)", "ESC - 1", "IDT - FBLH08", "IDT - FBLH08"],
            "Wed": ["Prog in C (CSPOC105)", "Maths (CSMAT101)", "COE", "COE", "ESC - 1", "–", "–"],
            "Thu": ["Physics (CSPHY102)", "Maths (CSMAT101)", "LIBRARY", "LIBRARY", "PHY Lab H1 / POC Lab H2", "PHY Lab H1 / POC Lab H2", "–"],
            "Fri": ["Kannada (KK KSK/KBK109)", "Physics (CSPHY102)", "LIBRARY", "LIBRARY", "–", "PHY Lab H2 / POC Lab H1", "PHY Lab H2 / POC Lab H1"],
            "Sat": ["COE", "COE", "CAED LAB (CSCED103)", "CAED LAB (CSCED103)", "–", "–", "–"],
        }
    },
    "I": {
        "stream": "AI&DS (IAD01-IAD45), CSE",
        "dept": "AI & Data Science, CSE",
        "room": "FB LH06 & 07 / FB LH08",
        "faculties": [
            {"code": "CSMAT101", "title": "Calculus and Linear Algebra", "faculty": "Dr. S A Adky", "dept": "Maths"},
            {"code": "CSPHY102", "title": "Quantum Physics & Applications", "faculty": "Prof. Manjunath Malipatil", "dept": "Physics"},
            {"code": "CSCED103", "title": "Computer Aided Engg. Drawing", "faculty": "Prof. Sanket Kalashetty", "dept": "Mechanical"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - I", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "CSPOC105", "title": "Programming in C", "faculty": "Dr. Shridevi Soma", "dept": "AIDS"},
            {"code": "KKSSC106", "title": "Soft Skills", "faculty": "Prof. Savitri S", "dept": "Humanities"},
            {"code": "CSPOCL107", "title": "Programming in C Lab", "faculty": "Dr. Shridevi Soma", "dept": "AIDS"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Nagalaxmi", "dept": "AIDS"},
            {"code": "KK KSK/KBK109", "title": "Samskritika / Balake Kannada", "faculty": "Dr. Sujatha Patil", "dept": "Humanities"},
        ],
        "schedule": {
            "Mon": ["CAED - FBLH07", "CAED - FBLH07", "Maths - FBLH06", "Kannada - FBLH06", "ESC - 1", "–", "–"],
            "Tue": ["CAED Lab (CSCED103)", "CAED Lab (CSCED103)", "Physics (CSPHY102)", "Prog in C (CSPOC105)", "ESC - 1", "–", "–"],
            "Wed": ["COE", "COE", "Maths (CSMAT101)", "LIBRARY", "ESC - 1", "PHY Lab I1 / POC Lab I2", "PHY Lab I1 / POC Lab I2"],
            "Thu": ["Maths - FBLH07", "Soft Skills - FBLH07", "Physics - FBLH08", "Prog in C - FBLH08", "–", "PHY Lab I2 / POC Lab I1", "PHY Lab I2 / POC Lab I1"],
            "Fri": ["COE", "COE", "LIBRARY", "LIBRARY", "–", "Maths LAB: I", "Maths LAB: I"],
            "Sat": ["Prog in C (CSPOC105)", "Physics (CSPHY102)", "IDT - FBLH08", "IDT - FBLH08", "–", "–", "–"],
        }
    },
    "J": {
        "stream": "E&CE (JEC01-JEC68)",
        "dept": "Electronics & Communication Engg.",
        "room": "MB LH54",
        "faculties": [
            {"code": "EEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Dr. Veena M", "dept": "Maths"},
            {"code": "EECHE102", "title": "Applied Chemistry for Futuristic Devices", "faculty": "Prof. Geetanjali Devani", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Priyanka D", "dept": "ECE"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Neha", "dept": "ECE"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Dr. Geeta Hanji", "dept": "ECE"},
        ],
        "schedule": {
            "Mon": ["Chemistry (EECHE102)", "Intro to C (KKICP105A)", "Int to AIA (KKAIA103)", "Maths (EEMAT101)", "ESC - 1", "COE", "COE"],
            "Tue": ["CHE Lab J1 / ICP Lab J2", "CHE Lab J1 / ICP Lab J2", "Int to AIA (KKAIA103)", "Intro to C (KKICP105A)", "ESC - 1", "–", "–"],
            "Wed": ["CHE Lab J2 / ICP Lab J1", "CHE Lab J2 / ICP Lab J1", "IDT - FBLH03", "IDT - FBLH03", "ESC - 1", "–", "–"],
            "Thu": ["Comm Skill (KKENG106)", "Chemistry (EECHE102)", "Maths (EEMAT101)", "IC&PE (KKICO107)", "Library", "Maths LAB: J", "Maths LAB: J"],
            "Fri": ["Maths (EEMAT101)", "Int to AIA (KKAIA103)", "Intro to C (KKICP105A)", "Chemistry (EECHE102)", "Library", "–", "–"],
            "Sat": ["COE", "COE", "LIBRARY", "LIBRARY", "–", "–", "–"],
        }
    },
    "K": {
        "stream": "E&CE (KEC01-KEC68)",
        "dept": "Electronics & Communication Engg.",
        "room": "MB LH55",
        "faculties": [
            {"code": "EEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Dr. Umadevi R Devani", "dept": "Maths"},
            {"code": "EECHE102", "title": "Applied Chemistry for Futuristic Devices", "faculty": "Prof. Jyoti Laxmi", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Shushmita", "dept": "ECE"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Dr. Vishwanath B", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Pooja B", "dept": "ECE"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Dr. Shambuling Patil", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Anand D Patil", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. C D Bogale", "dept": "ECE"},
        ],
        "schedule": {
            "Mon": ["Chemistry (EECHE102)", "Intro to C (KKICP105A)", "Maths (EEMAT101)", "Int to AIA (KKAIA103)", "ESC - 1", "–", "–"],
            "Tue": ["Maths LAB: K", "Maths LAB: K", "Intro to C (KKICP105A)", "Comm Skill (KKENG106)", "ESC - 1", "–", "–"],
            "Wed": ["IDT - FBLH01", "IDT - FBLH01", "Maths (EEMAT101)", "IC&PE (KKICO107)", "ESC - 1", "COE", "COE"],
            "Thu": ["Maths (EEMAT101)", "Chemistry (EECHE102)", "Int to AIA (KKAIA103)", "Intro to C (KKICP105A)", "LIBRARY", "–", "–"],
            "Fri": ["CHE Lab K1 / ICP Lab K2", "CHE Lab K1 / ICP Lab K2", "COE", "COE", "LIBRARY", "–", "–"],
            "Sat": ["CHE Lab K2 / ICP Lab K1", "CHE Lab K2 / ICP Lab K1", "Chemistry (EECHE102)", "Int to AIA (KKAIA103)", "–", "–", "–"],
        }
    },
    "L": {
        "stream": "E&CE, EIE, EEE (LEC, LEI, LEE)",
        "dept": "ECE / EIE / EEE",
        "room": "MB IP01 / MB LH55 / MB LH54",
        "faculties": [
            {"code": "EEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Dr. Suvarna H", "dept": "Maths"},
            {"code": "EECHE102", "title": "Applied Chemistry for Futuristic Devices", "faculty": "Dr. R S Malipatil", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Megha Upase", "dept": "ECE"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Sushmita", "dept": "ECE"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Vijayalaxmi T", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Savitri", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Renuka Hatti", "dept": "ECE"},
        ],
        "schedule": {
            "Mon": ["COE", "COE", "Chemistry (EECHE102)", "Int to AIA (KKAIA103)", "ESC - 1", "LIBRARY", "–"],
            "Tue": ["Maths (EEMAT101)", "Int to AIA (KKAIA103)", "CHE Lab L1 / ICP Lab L2", "CHE Lab L1 / ICP Lab L2", "ESC - 1", "–", "–"],
            "Wed": ["Intro to C (KKICP105A)", "Chemistry (EECHE102)", "CHE Lab L2 / ICP Lab L1", "CHE Lab L2 / ICP Lab L1", "ESC - 1", "–", "–"],
            "Thu": ["Maths LAB: L", "Maths LAB: L", "IDT - FBLH03", "IDT - FBLH03", "Int to AIA (KKAIA103)", "–", "–"],
            "Fri": ["COE", "COE", "Intro to C (KKICP105A)", "Maths (EEMAT101)", "Chemistry (EECHE102)", "–", "–"],
            "Sat": ["IC&PE (KKICO107)", "Intro to C (KKICP105A)", "Maths (EEMAT101)", "Comm Skill (KKENG106)", "–", "–", "–"],
        }
    },
    "M": {
        "stream": "EEE (MEE01-MEE68)",
        "dept": "Electrical & Electronics Engg.",
        "room": "MB Bosch Centre",
        "faculties": [
            {"code": "EEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Dr. M S Patil", "dept": "Maths"},
            {"code": "EECHE102", "title": "Applied Chemistry for Futuristic Devices", "faculty": "Dr. Anand P Patil", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Akshay Aspalli", "dept": "EEE"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Poorvika H", "dept": "EEE"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Vijayalaxmi T", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Savitri", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Priya Patil", "dept": "EEE"},
        ],
        "schedule": {
            "Mon": ["Int to AIA (KKAIA103)", "Chemistry (EECHE102)", "Maths (EEMAT101)", "Intro to C (KKICP105A)", "ESC - 1", "–", "–"],
            "Tue": ["Int to AIA (KKAIA103)", "Comm Skill (KKENG106)", "Chemistry (EECHE102)", "Maths (EEMAT101)", "ESC - 1", "–", "–"],
            "Wed": ["Intro to C (KKICP105A)", "Maths (EEMAT101)", "COE", "COE", "ESC - 1", "–", "–"],
            "Thu": ["Intro to C (KKICP105A)", "Int to AIA (KKAIA103)", "Maths LAB: M", "Maths LAB: M", "LIBRARY", "COE", "COE"],
            "Fri": ["Chemistry (EECHE102)", "IC&PE (KKICO107)", "CHE Lab M1 / ICP Lab M2", "CHE Lab M1 / ICP Lab M2", "LIBRARY", "–", "–"],
            "Sat": ["IDT LAB - MBLH55", "IDT LAB - MBLH55", "CHE Lab M2 / ICP Lab M1", "CHE Lab M2 / ICP Lab M1", "–", "–", "–"],
        }
    },
    "N": {
        "stream": "Civil Engg. (NCV01-52)",
        "dept": "Civil Engineering",
        "room": "MB IP01",
        "faculties": [
            {"code": "CVMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Prof. Rajeshwari B", "dept": "Maths"},
            {"code": "CVCHE102", "title": "Applied Chemistry for Sustainable Built Environment", "faculty": "Prof. Geetanjali Devani", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Deepti Patil", "dept": "Civil"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Mahananda H", "dept": "Civil"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Vinit Patil", "dept": "Civil"},
        ],
        "schedule": {
            "Mon": ["CHE Lab N1 / ICP Lab N2", "CHE Lab N1 / ICP Lab N2", "COE", "COE", "ESC - 1", "–", "–"],
            "Tue": ["IDT LAB - MBLH54", "IDT LAB - MBLH54", "Intro to C (KKICP105A)", "Maths (CVMAT101)", "ESC - 1", "Maths LAB: N", "Maths LAB: N"],
            "Wed": ["Int to AIA (KKAIA103)", "Chemistry (CVCHE102)", "Maths (CVMAT101)", "Comm Skill (KKENG106)", "ESC - 1", "COE", "COE"],
            "Thu": ["CHE Lab N2 / ICP Lab N1", "CHE Lab N2 / ICP Lab N1", "Intro to C (KKICP105A)", "Int to AIA (KKAIA103)", "LIBRARY", "–", "–"],
            "Fri": ["Chemistry (CVCHE102)", "Int to AIA (KKAIA103)", "LIBRARY", "LIBRARY", "LIBRARY", "–", "–"],
            "Sat": ["Intro to C (KKICP105A)", "IC&PE (KKICO107)", "Maths (CVMAT101)", "Chemistry (CVCHE102)", "–", "–", "–"],
        }
    },
    "O": {
        "stream": "Civil Engg. (OCV01-OCV52)",
        "dept": "Civil Engineering",
        "room": "MB IP01 / MB LH54 / MB LH55",
        "faculties": [
            {"code": "CVMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Dr. S A Adky", "dept": "Maths"},
            {"code": "CVCHE102", "title": "Applied Chemistry for Sustainable Built Environment", "faculty": "Prof. Jyoti Laxmi", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Sharnkumar Huli", "dept": "Civil"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Priyanka", "dept": "Civil"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Savitri S", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Anand D Patil", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Hanmanth Rao", "dept": "Civil"},
        ],
        "schedule": {
            "Mon": ["Maths (CVMAT101)", "Int to AIA (KKAIA103)", "CHE Lab O1 / ICP Lab O2", "CHE Lab O1 / ICP Lab O2", "ESC - 1", "–", "–"],
            "Tue": ["Chemistry (CVCHE102)", "Maths (CVMAT101)", "Maths LAB: F", "Maths LAB: F", "ESC - 1", "COE", "COE"],
            "Wed": ["Intro to C (KKICP105A)", "Chemistry (CVCHE102)", "COE", "COE", "ESC - 1", "LIBRARY", "–"],
            "Thu": ["IDT LAB - MB IP01", "IDT LAB - MB IP01", "CHE Lab O2 / ICP Lab O1", "CHE Lab O2 / ICP Lab O1", "LIBRARY", "–", "–"],
            "Fri": ["Intro to C (KKICP105A)", "Chemistry (CVCHE102)", "Maths (CVMAT101)", "Int to AIA (KKAIA103)", "LIBRARY", "–", "–"],
            "Sat": ["IC&PE (KKICO107)", "Int to AIA (KKAIA103)", "Comm Skill (KKENG106)", "Intro to C (KKICP105A)", "–", "–", "–"],
        }
    },
    "P": {
        "stream": "Civil and CCT (PCV01-PCV20, PCC01-PCC27)",
        "dept": "Civil & Ceramic Cement Tech",
        "room": "MB IP11",
        "faculties": [
            {"code": "CVMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Prof. Laxmi Patil", "dept": "Maths"},
            {"code": "CVCHE102", "title": "Applied Chemistry for Sustainable Built Environment", "faculty": "Dr. Anand P Patil", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Sonali", "dept": "Civil"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Rekha Patil", "dept": "Civil"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Vijayalaxmi T", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Vijayalaxmi T", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Deesha Patil", "dept": "Civil"},
        ],
        "schedule": {
            "Mon": ["Maths (CVMAT101)", "Intro to C (KKICP105A)", "COE", "COE", "ESC - 1", "CHE Lab P1 / ICP Lab P2", "CHE Lab P1 / ICP Lab P2"],
            "Tue": ["Intro to C (KKICP105A)", "Chemistry (CVCHE102)", "Maths (CVMAT101)", "Int to AIA (KKAIA103)", "ESC - 1", "CHE Lab P2 / ICP Lab P1", "CHE Lab P2 / ICP Lab P1"],
            "Wed": ["Chemistry (CVCHE102)", "Comm Skill (KKENG106)", "Int to AIA (KKAIA103)", "IC&PE (KKICO107)", "ESC - 1", "LIBRARY", "–"],
            "Thu": ["COE", "COE", "Chemistry (CVCHE102)", "Int to AIA (KKAIA103)", "Library", "–", "–"],
            "Fri": ["Library", "Library", "Maths (CVMAT101)", "Intro to C (KKICP105A)", "IDT LAB (1:15 to 3:15)", "IDT LAB", "–"],
            "Sat": ["Maths LAB: P", "Maths LAB: P", "LIBRARY", "LIBRARY", "–", "–", "–"],
        }
    },
    "Q": {
        "stream": "Mechanical Engg. (QME01-QME50)",
        "dept": "Mechanical Engineering",
        "room": "FB LH04",
        "faculties": [
            {"code": "MEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Prof. Ravi S", "dept": "Maths"},
            {"code": "MECHE102", "title": "Applied Chemistry for Metal Protection & Sustainable Energy", "faculty": "Dr. Vijay Hiremath", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Sonali", "dept": "Mech"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Dr. Sharanabasappa Gandge", "dept": "Mech"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Anand D Patil", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Chandra Reddy", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Shubham C", "dept": "Mech"},
        ],
        "schedule": {
            "Mon": ["IDT - FBLH04", "IDT - FBLH04", "Chemistry (MECHE102)", "Int to AIA (KKAIA103)", "ESC - 1", "COE", "COE"],
            "Tue": ["LIBRARY", "LIBRARY", "Intro to C (KKICP105A)", "Maths (MEMAT101)", "ESC - 1", "–", "–"],
            "Wed": ["Intro to C (KKICP105A)", "IC&PE (KKICO107)", "Chemistry (MECHE102)", "Int to AIA (KKAIA103)", "ESC - 1", "–", "–"],
            "Thu": ["Chemistry (MECHE102)", "Comm Skill (KKENG106)", "Maths (MEMAT101)", "CHE Lab Q1 / ICP Lab Q2", "CHE Lab Q1 / ICP Lab Q2", "–", "–"],
            "Fri": ["Int to AIA (KKAIA103)", "Intro to C (KKICP105A)", "Maths (MEMAT101)", "CHE Lab Q2 / ICP Lab Q1", "CHE Lab Q2 / ICP Lab Q1", "–", "–"],
            "Sat": ["COE", "COE", "Maths LAB: Q", "Maths LAB: Q", "–", "–", "–"],
        }
    },
    "R": {
        "stream": "Mechanical Engg. and I & PE (RME01-41, RIP01-06)",
        "dept": "Mechanical & Industrial Production",
        "room": "FB LH04 / FB LH08 / MB IP11 / FB LH06",
        "faculties": [
            {"code": "MEMAT101", "title": "Differential Calculus and Linear Algebra", "faculty": "Prof. Sangeeta P", "dept": "Maths"},
            {"code": "MECHE102", "title": "Applied Chemistry for Metal Protection & Sustainable Energy", "faculty": "Dr. R S Malipatil", "dept": "Chemistry"},
            {"code": "KKAIA103", "title": "Introduction to AI & Applications", "faculty": "Prof. Priyanka D", "dept": "Mech"},
            {"code": "KKXXX104X", "title": "Engineering Science Courses - 1", "faculty": "Respective Engg. Dept", "dept": "Respective Dept"},
            {"code": "KKICP105A", "title": "Introduction to C", "faculty": "Prof. Revati Soma", "dept": "Mech"},
            {"code": "KKENG106", "title": "Communication Skills", "faculty": "Prof. Vijayalaxmi T", "dept": "Humanities"},
            {"code": "KKICO107", "title": "Indian Constitution & Professional Ethics", "faculty": "Prof. Savitri S", "dept": "Humanities"},
            {"code": "KKIDT158", "title": "Innovation and Design Thinking Lab", "faculty": "Prof. Shubham C", "dept": "Mech"},
        ],
        "schedule": {
            "Mon": ["Maths (MEMAT101)", "IC&PE (KKICO107)", "LIBRARY", "LIBRARY", "ESC - 1", "COE", "COE"],
            "Tue": ["Chemistry (MECHE102)", "Intro to C (KKICP105A)", "LIBRARY", "LIBRARY", "ESC - 1", "–", "–"],
            "Wed": ["COE", "COE", "Maths (MEMAT101)", "Intro to C (KKICP105A)", "ESC - 1", "CHE Lab R1 / ICP Lab R2", "CHE Lab R1 / ICP Lab R2"],
            "Thu": ["Maths - MB IP11", "Comm Skill - MB IP11", "Chemistry - FBLH06", "Int to AIA - FBLH06", "CHE Lab R2 / ICP Lab R1", "CHE Lab R2 / ICP Lab R1", "–"],
            "Fri": ["IDT LAB - MB IP11", "IDT LAB - MB IP11", "LIBRARY", "Int to AIA (KKAIA103)", "Maths LAB: R", "Maths LAB: R", "–"],
            "Sat": ["Intro to C (KKICP105A)", "Chemistry (MECHE102)", "Int to AIA (KKAIA103)", "LIBRARY", "–", "–", "–"],
        }
    }
}

ESC_COURSES = [
    {
        "code": "KKBSM104A",
        "title": "Building Sciences & Mechanics",
        "batches": [
            {"batch": "B1", "faculty": "Dr. Shruti G", "room": "FBLH01"},
            {"batch": "B2", "faculty": "Prof. Rajashree C", "room": "FBLH02"},
            {"batch": "B3", "faculty": "Dr. Sharanbasav P", "room": "FBLH03"},
            {"batch": "B4", "faculty": "Prof. Rahul Patil", "room": "FBLH04"},
        ]
    },
    {
        "code": "KKIEE104B",
        "title": "Introduction to Electrical Engineering",
        "batches": [
            {"batch": "B1", "faculty": "Prof. Akash Patil", "room": "FBLH06"},
            {"batch": "B2", "faculty": "Prof. Gopinath Harsha", "room": "FBLH07"},
            {"batch": "B3", "faculty": "Prof. Mahadevi S N", "room": "FBLH08"},
            {"batch": "B4", "faculty": "Prof. Megha Upase", "room": "EEE Dept."},
        ]
    },
    {
        "code": "KKIEC104C",
        "title": "Introduction to Electronics & Communication Engineering",
        "batches": [
            {"batch": "B1", "faculty": "Prof. Seema Deshmukh", "room": "LH15"},
            {"batch": "B2", "faculty": "Prof. Veena Saraf", "room": "LH16"},
            {"batch": "B3", "faculty": "Prof. C D Bogale", "room": "LH17"},
            {"batch": "B4", "faculty": "Dr. Juhi Nishant Ansari", "room": "LH18"},
        ]
    },
    {
        "code": "KKIME104D",
        "title": "Introduction to Mechanical Engineering",
        "batches": [
            {"batch": "B1", "faculty": "Dr. C. H Biradar", "room": "MBLH54"},
            {"batch": "B2", "faculty": "Prof. Shivakumar Patil", "room": "MBLH55"},
            {"batch": "B3", "faculty": "Prof. Mallikarjun Bijapur", "room": "MBIP11"},
            {"batch": "B4", "faculty": "Prof. Sarita M", "room": "MBIP01"},
        ]
    },
    {
        "code": "KKEIT104E",
        "title": "Essential of Information Technology",
        "batches": [
            {"batch": "B1", "faculty": "Prof. Neha", "room": "CSE Dept."},
            {"batch": "B2", "faculty": "Prof. Spoorti", "room": "CSE Dept."},
            {"batch": "B3", "faculty": "Prof. Shivani", "room": "CSE Dept."},
            {"batch": "B4", "faculty": "Prof. Siddaram S", "room": "CSE Dept."},
        ]
    }
]
