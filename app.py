import csv
import datetime
import json
import os
import re
import sqlite3
import time
import urllib.request
from typing import Dict, List, Optional

from fastapi import FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import data.first_year_data as fy_data
import data.seed_data as seed
from ml_engine import ml_engine

DB_FILE = "campus.db"
CSV_FILE = os.path.join("data", "timetable.csv")
DEFAULT_AI_URL = os.environ.get("AI_URL", "")

app = FastAPI(
    title="PDA College of Engineering - Campus Assistant API",
    description="ML-Powered Line-by-Line Campus Chatbot Backend for HKE Society's Poojya Doddappa Appa College of Engineering, Kalaburagi",
    version="3.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


SENIOR_FACULTY_SLOTS = [   {   'cabin': 'AIML Dept, Zen AI Block, HOD Cabin',
        'dept': 'AIML',
        'designation': 'Professor & HOD (AIML)',
        'email': 'hodaiml@pdaengg.com',
        'name': 'Dr. Basavaraj S. Mathapati',
        'phone': '08472-224360 (Ext. 207)',
        'slots': [   ('Mon', '09:00', '10:00', '5th Sem AIML-A', 'LH-15', 'Data Science & Applications (DSA)'),
                     ('Mon', '11:15', '12:15', '5th Sem AIML-B', 'LH-16', 'Human Computer Interface (HCI)'),
                     ('Tue', '09:00', '10:00', '5th Sem AIML-A', 'LH-15', 'Data Science & Applications (DSA)'),
                     ('Wed', '09:00', '10:00', '5th Sem AIML-A', 'LH-15', 'Data Science & Applications (DSA)'),
                     ('Thu', '09:00', '10:00', '5th Sem AIML-B', 'LH-16', 'Human Computer Interface (HCI)'),
                     ('Fri', '09:00', '10:00', '5th Sem AIML-B', 'LH-16', 'Human Computer Interface (HCI)'),
                     ('Sat', '10:00', '11:00', '5th Sem AIML-A', 'LH-15', 'Data Science & Applications (DSA)')]},
    {   'cabin': 'AIML Dept, Senior Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Associate Professor (AIML)',
        'email': 'nandinip@pdaengg.com',
        'name': 'Dr. Nandini P',
        'phone': '08472-224360',
        'slots': [   ('Tue', '14:00', '15:00', '5th Sem AIML-B', 'LH-16', 'Principles of Machine Learning (PML)'),
                     ('Wed', '12:15', '13:15', '5th Sem AIML-B', 'LH-16', 'Principles of Machine Learning (PML)'),
                     ('Thu', '15:00', '16:00', '5th Sem AIML-B', 'LH-16', 'Principles of Machine Learning (PML)'),
                     ('Fri', '10:00', '11:00', '5th Sem AIML-B', 'LH-16', 'Principles of Machine Learning (PML)'),
                     ('Sat', '09:00', '10:00', '3rd Sem AIML-A', 'LH-09', 'Community Project (CP)'),
                     ('Sat', '10:00', '11:00', '3rd Sem AIML-A', 'LH-09', 'Community Project (CP)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'rajashekharb@pdaengg.com',
        'name': 'Prof. Rajashekhar B',
        'phone': '08472-224360',
        'slots': [   ('Mon', '09:00', '11:00', '3rd Sem AIML-A', 'AIML Lab', 'OOP Lab B1'),
                     ('Mon', '12:15', '13:15', '3rd Sem AIML-A', 'LH-09', 'OOP with Java'),
                     ('Tue', '12:15', '13:15', '3rd Sem AIML-A', 'LH-09', 'OOP with Java'),
                     ('Thu', '09:00', '10:00', '3rd Sem AIML-A', 'LH-09', 'OOP with Java'),
                     ('Thu', '14:00', '16:00', '3rd Sem AIML-A', 'AIML Lab', 'OOP Lab B2')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'priyankad@pdaengg.com',
        'name': 'Prof. Priyanka Devani',
        'phone': '08472-224360',
        'slots': [   ('Mon', '14:00', '16:00', '5th Sem AIML-A', 'AIML Lab', 'AIML Lab B1'),
                     ('Tue', '14:00', '16:00', '5th Sem AIML-A', 'AIML Lab', 'AIML Lab B2')]},
    {   'cabin': 'AIML Dept, Cabin (3rd Sem Sec-B Class Coordinator)',
        'dept': 'AIML',
        'designation': 'Assistant Professor & 3rd Sem Sec-B Coordinator (AIML)',
        'email': 'sowmyag@pdaengg.com',
        'name': 'Prof. Sowmya Gaitond',
        'phone': '08472-224360',
        'slots': [   ('Mon', '14:00', '15:00', '3rd Sem AIML-B', 'LH-09', 'Operating Systems (OS)'),
                     ('Tue', '12:15', '13:15', '3rd Sem AIML-B', 'LH-15', 'Operating Systems (OS)'),
                     ('Thu', '14:00', '16:00', '3rd Sem AIML-B', 'AIML Lab', 'AEC (DVP) Lab'),
                     ('Fri', '14:00', '15:00', '3rd Sem AIML-B', 'LH-16', 'Operating Systems (OS)')]},
    {   'cabin': 'AIML Dept, Cabin (5th Sem Sec-A Class Coordinator)',
        'dept': 'AIML',
        'designation': 'Assistant Professor & 5th Sem Sec-A Coordinator (AIML)',
        'email': 'mallinaths@pdaengg.com',
        'name': 'Prof. Mallinath Swamy',
        'phone': '08472-224360',
        'slots': [   ('Mon', '12:15', '13:15', '5th Sem AIML-A', 'LH-15', 'Principles of Machine Learning (PML)'),
                     ('Thu', '14:00', '15:00', '5th Sem AIML-A', 'LH-15', 'Principles of Machine Learning (PML)'),
                     ('Fri', '10:00', '11:00', '5th Sem AIML-A', 'LH-15', 'Principles of Machine Learning (PML)'),
                     ('Sat', '09:00', '10:00', '5th Sem AIML-A', 'LH-15', 'Principles of Machine Learning (PML)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'kaverik@pdaengg.com',
        'name': 'Dr. Kaveri Kori',
        'phone': '08472-224360',
        'slots': [   ('Wed', '11:15', '13:15', '3rd Sem AIML-A', 'AIML Lab', 'AEC (DVP) Lab'),
                     ('Wed', '14:00', '15:00', '5th Sem AIML-A', 'LH-15', 'Research Methodology & IPR (RMIPR)'),
                     ('Fri', '14:00', '15:00', '5th Sem AIML-A', 'LH-15', 'Research Methodology & IPR (RMIPR)'),
                     ('Sat', '11:15', '12:15', '5th Sem AIML-A', 'LH-15', 'Research Methodology & IPR (RMIPR)')]},
    {   'cabin': 'AIML Dept, Cabin (3rd Sem Sec-A Class Coordinator)',
        'dept': 'AIML',
        'designation': 'Assistant Professor & 3rd Sem Sec-A Coordinator (AIML)',
        'email': 'ashwinih@pdaengg.com',
        'name': 'Prof. Ashwini Hatti',
        'phone': '08472-224360',
        'slots': [   ('Mon', '10:00', '11:00', '3rd Sem AIML-B', 'LH-09', 'Data Structures & Applications (DSC)'),
                     ('Tue', '09:00', '10:00', '3rd Sem AIML-B', 'LH-09', 'Data Structures & Applications (DSC)'),
                     ('Wed', '09:00', '10:00', '1st Sem AIML-G', 'FB LH07', 'Programming in C'),
                     ('Thu', '11:15', '12:15', '3rd Sem AIML-B', 'LH-15', 'Data Structures & Applications (DSC)'),
                     ('Fri', '10:00', '11:00', '1st Sem AIML-G', 'FB LH07', 'Programming in C'),
                     ('Sat', '10:00', '11:00', '1st Sem AIML-G', 'FB LH07', 'Programming in C')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'sonalim@pdaengg.com',
        'name': 'Prof. Sonali M',
        'phone': '08472-224360',
        'slots': [   ('Mon', '09:00', '10:00', '3rd Sem AIML-B', 'LH-09', 'Digital System Design (DSDO)'),
                     ('Mon', '10:00', '11:00', '5th Sem AIML-B', 'AIML Lab', 'Mini-Project B1'),
                     ('Tue', '09:00', '11:00', '5th Sem AIML-B', 'AIML Lab', 'Mini-Project B2'),
                     ('Wed', '09:00', '11:00', '3rd Sem AIML-B', 'AIML Lab', 'DSDO Lab B1'),
                     ('Thu', '12:15', '13:15', '3rd Sem AIML-B', 'LH-15', 'Digital System Design (DSDO)'),
                     ('Fri', '11:15', '13:15', '3rd Sem AIML-B', 'AIML Lab', 'DSDO Lab B2'),
                     ('Fri', '15:00', '16:00', '3rd Sem AIML-B', 'LH-16', 'Digital System Design (DSDO)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'nehaa@pdaengg.com',
        'name': 'Prof. Neha A',
        'phone': '08472-224360',
        'slots': [   ('Mon', '09:00', '11:00', '3rd Sem AIML-A', 'AIML Lab', 'DSC Lab B2'),
                     ('Mon', '11:15', '12:15', '3rd Sem AIML-A', 'LH-09', 'Data Structures & Applications (DSC)'),
                     ('Tue', '09:00', '11:00', '3rd Sem AIML-A', 'AIML Lab', 'DSC Lab B1'),
                     ('Wed', '12:15', '13:15', '5th Sem AIML-A', 'LH-15', 'Human Computer Interface (HCI)'),
                     ('Wed', '14:00', '15:00', '3rd Sem AIML-A', 'LH-09', 'Data Structures & Applications (DSC)'),
                     ('Thu', '12:15', '13:15', '3rd Sem AIML-A', 'LH-09', 'Data Structures & Applications (DSC)'),
                     ('Thu', '15:00', '16:00', '5th Sem AIML-A', 'LH-15', 'Human Computer Interface (HCI)'),
                     ('Fri', '09:00', '10:00', '5th Sem AIML-A', 'LH-15', 'Human Computer Interface (HCI)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'savithap@pdaengg.com',
        'name': 'Prof. Savitha P',
        'phone': '08472-224360',
        'slots': [   ('Mon', '11:15', '13:15', '3rd Sem AIML-B', 'AIML Lab', 'DSC Lab B1'),
                     ('Tue', '14:00', '15:00', '3rd Sem AIML-A', 'LH-09', 'Operating Systems (OS)'),
                     ('Wed', '09:00', '11:00', '3rd Sem AIML-B', 'AIML Lab', 'DSC Lab B2'),
                     ('Thu', '10:00', '11:00', '3rd Sem AIML-A', 'LH-09', 'Operating Systems (OS)'),
                     ('Thu', '14:00', '16:00', '3rd Sem AIML-A', 'AIML Lab', 'OOP Lab B2'),
                     ('Fri', '10:00', '11:00', '3rd Sem AIML-A', 'LH-09', 'Operating Systems (OS)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'laxmij@pdaengg.com',
        'name': 'Prof. Laxmi J',
        'phone': '08472-224360',
        'slots': [   ('Mon', '15:00', '16:00', '5th Sem AIML-B', 'LH-16', 'Research Methodology & IPR (RMIPR)'),
                     ('Tue', '09:00', '11:00', '3rd Sem AIML-A', 'AIML Lab', 'DSDO Lab B2'),
                     ('Tue', '11:15', '13:15', '5th Sem AIML-A', 'AIML Lab', 'Mini-Project B2'),
                     ('Tue', '15:00', '16:00', '3rd Sem AIML-A', 'LH-09', 'Digital System Design (DSDO)'),
                     ('Wed', '10:00', '11:00', '3rd Sem AIML-A', 'LH-09', 'Digital System Design (DSDO)'),
                     ('Thu', '11:15', '13:15', '5th Sem AIML-A', 'AIML Lab', 'Mini-Project B1'),
                     ('Thu', '14:00', '16:00', '3rd Sem AIML-A', 'AIML Lab', 'DSDO Lab B1'),
                     ('Fri', '09:00', '10:00', '3rd Sem AIML-A', 'LH-09', 'Digital System Design (DSDO)'),
                     ('Fri', '11:15', '12:15', '5th Sem AIML-B', 'LH-16', 'Research Methodology & IPR (RMIPR)'),
                     ('Sat', '10:00', '11:00', '5th Sem AIML-B', 'LH-16', 'Research Methodology & IPR (RMIPR)')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'santoship@pdaengg.com',
        'name': 'Prof. Santoshi P',
        'phone': '08472-224360',
        'slots': [   ('Mon', '10:00', '11:00', '5th Sem AIML-A', 'LH-15', 'Database Management Systems (DBMS)'),
                     ('Mon', '14:00', '16:00', '5th Sem AIML-A', 'DBMS Lab', 'DBMS Lab B2'),
                     ('Tue', '10:00', '11:00', '5th Sem AIML-A', 'LH-15', 'Database Management Systems (DBMS)'),
                     ('Tue', '14:00', '16:00', '5th Sem AIML-A', 'DBMS Lab', 'DBMS Lab B1'),
                     ('Wed', '10:00', '11:00', '5th Sem AIML-A', 'LH-15', 'Database Management Systems (DBMS)')]},
    {   'cabin': 'AIML Dept, Cabin (5th Sem Sec-B Class Coordinator)',
        'dept': 'AIML',
        'designation': 'Associate Professor & 5th Sem Sec-B Coordinator (AIML)',
        'email': 'sharanammah@pdaengg.com',
        'name': 'Dr. Sharanamma H',
        'phone': '08472-224360',
        'slots': [   ('Mon', '12:15', '13:15', '5th Sem AIML-B', 'LH-16', 'Database Management Systems (DBMS)'),
                     ('Tue', '10:00', '11:00', '3rd Sem AIML-B', 'LH-09', 'OOP with Java'),
                     ('Tue', '14:00', '16:00', '3rd Sem AIML-B', 'LH-15', 'Community Project (CP)'),
                     ('Wed', '14:00', '15:00', '5th Sem AIML-B', 'LH-16', 'Database Management Systems (DBMS)'),
                     ('Thu', '09:00', '10:00', '3rd Sem AIML-B', 'LH-15', 'OOP with Java'),
                     ('Fri', '11:15', '13:15', '3rd Sem AIML-B', 'AIML Lab', 'OOP Lab B1'),
                     ('Fri', '12:15', '13:15', '5th Sem AIML-B', 'LH-16', 'Database Management Systems (DBMS)'),
                     ('Fri', '14:00', '16:00', '5th Sem AIML-B', 'DBMS Lab', 'DBMS Lab B1'),
                     ('Sat', '09:00', '10:00', '3rd Sem AIML-B', 'LH-09', 'OOP with Java'),
                     ('Sat', '11:15', '13:15', '5th Sem AIML-B', 'DBMS Lab', 'DBMS Lab B2')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'shreyag@pdaengg.com',
        'name': 'Prof. Shreya G',
        'phone': '08472-224360',
        'slots': [   ('Mon', '11:15', '13:15', '3rd Sem AIML-B', 'AIML Lab', 'OOP Lab B2'),
                     ('Mon', '14:00', '15:00', '5th Sem AIML-B', 'LH-16', 'Data Science & Applications (DSA)'),
                     ('Tue', '12:15', '13:15', '5th Sem AIML-B', 'LH-16', 'Data Science & Applications (DSA)'),
                     ('Wed', '11:15', '12:15', '5th Sem AIML-B', 'LH-16', 'Data Science & Applications (DSA)'),
                     ('Thu', '14:00', '15:00', '5th Sem AIML-B', 'LH-16', 'Data Science & Applications (DSA)'),
                     ('Fri', '14:00', '16:00', '5th Sem AIML-B', 'AIML Lab', 'AIML Lab B2'),
                     ('Sat', '11:15', '13:15', '5th Sem AIML-B', 'AIML Lab', 'AIML Lab B1')]},
    {   'cabin': 'AIML Dept, Faculty Cabin',
        'dept': 'AIML',
        'designation': 'Assistant Professor (AIML)',
        'email': 'cbiradar@pdaengg.com',
        'name': 'Prof. Chandrakant Biradar',
        'phone': '08472-224360',
        'slots': [   ('Mon', '10:00', '11:00', '1st Sem AIML-H', 'FB LH08', 'Programming in C'),
                     ('Tue', '12:15', '13:15', '1st Sem AIML-H', 'FB LH08', 'Programming in C'),
                     ('Wed', '09:00', '10:00', '1st Sem AIML-H', 'FB LH08', 'Programming in C')]}]


def init_db():
    conn = get_db()
    conn.executescript(
        """
        DROP TABLE IF EXISTS teachers;
        DROP TABLE IF EXISTS slots;
        DROP TABLE IF EXISTS departments;
        DROP TABLE IF EXISTS scholarships;
        DROP TABLE IF EXISTS first_year_timetable;
        DROP TABLE IF EXISTS first_year_esc_courses;
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS student_records;

        CREATE TABLE IF NOT EXISTS teachers(
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            dept TEXT,
            cabin TEXT,
            phone TEXT,
            email TEXT,
            designation TEXT
        );

        CREATE TABLE IF NOT EXISTS slots(
            id INTEGER PRIMARY KEY,
            teacher_id INTEGER,
            day TEXT,
            start_time TEXT,
            end_time TEXT,
            class_name TEXT,
            room TEXT,
            subject TEXT
        );

        CREATE TABLE IF NOT EXISTS departments(
            code TEXT PRIMARY KEY,
            name TEXT,
            intake INTEGER,
            fee_govt INTEGER,
            cutoff_kcet INTEGER,
            open_seats INTEGER,
            hod TEXT,
            phone TEXT,
            email TEXT,
            description TEXT
        );

        CREATE TABLE IF NOT EXISTS scholarships(
            id INTEGER PRIMARY KEY,
            title TEXT,
            category TEXT,
            eligibility TEXT,
            benefit TEXT,
            portal_link TEXT,
            deadline TEXT,
            documents_required TEXT
        );

        CREATE TABLE IF NOT EXISTS staff_users(
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT,
            full_name TEXT,
            dept TEXT,
            role TEXT
        );

        CREATE TABLE IF NOT EXISTS students(
            usn TEXT PRIMARY KEY,
            name TEXT,
            dept TEXT,
            sem INTEGER,
            section TEXT,
            attendance REAL,
            cie1 INTEGER,
            cie2 INTEGER,
            cie3 INTEGER,
            assignment INTEGER,
            lab INTEGER
        );

        CREATE TABLE IF NOT EXISTS student_records(
            id INTEGER PRIMARY KEY,
            usn TEXT,
            subject_code TEXT,
            subject_name TEXT,
            attendance REAL,
            cie1 INTEGER,
            cie2 INTEGER,
            cie3 INTEGER,
            assignment INTEGER,
            lab INTEGER
        );

        CREATE TABLE IF NOT EXISTS first_year_timetable(
            id INTEGER PRIMARY KEY,
            year INTEGER DEFAULT 1,
            semester INTEGER DEFAULT 1,
            section TEXT,
            dept TEXT,
            stream TEXT,
            room TEXT,
            subject_code TEXT,
            subject_title TEXT,
            faculty TEXT,
            faculty_dept TEXT,
            day TEXT,
            period INTEGER,
            slot_label TEXT
        );

        CREATE TABLE IF NOT EXISTS first_year_esc_courses(
            id INTEGER PRIMARY KEY,
            year INTEGER DEFAULT 1,
            semester INTEGER DEFAULT 1,
            course_code TEXT,
            course_title TEXT,
            batch TEXT,
            faculty TEXT,
            room TEXT
        );

        CREATE TABLE IF NOT EXISTS notices(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT DEFAULT 'Notice',
            link TEXT DEFAULT 'https://www.pdacek.ac.in/announcement.php',
            details TEXT DEFAULT ''
        );

        CREATE TABLE IF NOT EXISTS study_materials(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dept TEXT NOT NULL,
            scheme TEXT NOT NULL,
            resource_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT DEFAULT '',
            link TEXT DEFAULT ''
        );
        """
    )

    # 1. Seed Senior Faculty & HODs + CSV Teachers & Slots
    for sf in SENIOR_FACULTY_SLOTS:
        conn.execute(
            """
            INSERT OR IGNORE INTO teachers(name, dept, cabin, phone, email, designation)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (sf["name"], sf["dept"], sf["cabin"], sf["phone"], sf["email"], sf["designation"]),
        )
        tid = conn.execute("SELECT id FROM teachers WHERE name=?", (sf["name"],)).fetchone()[0]
        for day, st, et, cls_name, rm, subj in sf["slots"]:
            conn.execute(
                """
                INSERT INTO slots(teacher_id, day, start_time, end_time, class_name, room, subject)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (tid, day, st, et, cls_name, rm, subj),
            )

    # Also ensure every department HOD is in teachers table
    for d in seed.DEPARTMENTS:
        conn.execute(
            """
            INSERT OR IGNORE INTO teachers(name, dept, cabin, phone, email, designation)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                d["hod"],
                d["code"],
                d.get("cabin", f"{d['code']} Dept HOD Cabin"),
                d["phone"],
                d["email"],
                f"Professor & HOD ({d['code']})",
            ),
        )

    if os.path.exists(CSV_FILE):
        with open(CSV_FILE, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for r in reader:
                conn.execute(
                    """
                    INSERT OR IGNORE INTO teachers(name, dept, cabin, phone, email, designation)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (
                        r.get("teacher"),
                        r.get("dept"),
                        r.get("cabin"),
                        r.get("phone", "08472-224360"),
                        r.get("email", "principal@pdaengg.com"),
                        r.get("designation", "Faculty Member"),
                    ),
                )
                tid = conn.execute(
                    "SELECT id FROM teachers WHERE name=?", (r.get("teacher"),)
                ).fetchone()[0]

                conn.execute(
                    """
                    INSERT INTO slots(teacher_id, day, start_time, end_time, class_name, room, subject)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        tid,
                        r.get("day"),
                        r.get("start"),
                        r.get("end"),
                        r.get("class"),
                        r.get("room"),
                        r.get("subject", "Theory/Lab"),
                    ),
                )

    # 2. Departments
    for d in seed.DEPARTMENTS:
        conn.execute(
            """
            INSERT OR REPLACE INTO departments(code, name, intake, fee_govt, cutoff_kcet, open_seats, hod, phone, email, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                d["code"],
                d["name"],
                d["intake"],
                d["fee_govt"],
                d["cutoff_kcet"],
                d["open_seats"],
                d["hod"],
                d["phone"],
                d["email"],
                d["description"],
            ),
        )

    # 3. Scholarships
    for s in seed.SCHOLARSHIPS:
        conn.execute(
            """
            INSERT INTO scholarships(title, category, eligibility, benefit, portal_link, deadline, documents_required)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                s["title"],
                s["category"],
                s["eligibility"],
                s["benefit"],
                s["portal_link"],
                s["deadline"],
                s["documents_required"],
            ),
        )

    # 4. 1st Year Timetable (Sem 1, Sections A–R)
    for section, info in fy_data.FIRST_YEAR_TIMETABLE.items():
        subj_lookup = {sub["code"]: sub for sub in info.get("faculties", [])}
        for day, periods in info.get("schedule", {}).items():
            for period_num, slot_label in enumerate(periods, start=1):
                matched_code = ""
                matched_title = slot_label
                matched_faculty = ""
                matched_faculty_dept = ""

                for code, meta in subj_lookup.items():
                    if code in slot_label or meta["title"][:10].lower() in slot_label.lower():
                        matched_code = code
                        matched_title = meta["title"]
                        matched_faculty = meta["faculty"]
                        matched_faculty_dept = meta["dept"]
                        break

                conn.execute(
                    """
                    INSERT INTO first_year_timetable(
                        year, semester, section, dept, stream, room,
                        subject_code, subject_title, faculty, faculty_dept,
                        day, period, slot_label
                    ) VALUES (1, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        section,
                        info.get("dept", ""),
                        info.get("stream", ""),
                        info.get("room", ""),
                        matched_code,
                        matched_title,
                        matched_faculty,
                        matched_faculty_dept,
                        day,
                        period_num,
                        slot_label,
                    ),
                )

    # 5. 1st Year ESC Courses
    for course in fy_data.ESC_COURSES:
        for batch_info in course.get("batches", []):
            conn.execute(
                """
                INSERT INTO first_year_esc_courses(
                    year, semester, course_code, course_title, batch, faculty, room
                ) VALUES (1, 1, ?, ?, ?, ?, ?)
                """,
                (
                    course["code"],
                    course["title"],
                    batch_info["batch"],
                    batch_info["faculty"],
                    batch_info["room"],
                ),
            )

    # 6. Staff users & Official Notices
    default_staff = [
        ("staff_cse", "pda1958", "Dr. S. R. Patil", "CSE", "Professor & HOD"),
        ("staff_ise", "pda1958", "Dr. Ramesh Kulkarni", "ISE", "Professor & HOD"),
        ("basavaraj.mathapati", "pda1958", "Dr. Basavaraj S. Mathapati", "AIML", "Professor & HOD"),
        ("ramesh.kulkarni", "pda1958", "Dr. Ramesh Kulkarni", "ISE", "Professor & HOD"),
        ("mahesh.biradar", "pda1958", "Dr. Mahesh Biradar", "ECE", "Professor & HOD"),
        ("admin", "pdaadmin2026", "Principal Office", "Administration", "Administrator"),
    ]
    for u, p, fn, dp, rl in default_staff:
        conn.execute(
            "INSERT OR IGNORE INTO staff_users(username, password, full_name, dept, role) VALUES (?,?,?,?,?)",
            (u, p, fn, dp, rl),
        )

    existing_notices = conn.execute("SELECT COUNT(*) FROM notices").fetchone()[0]
    if existing_notices == 0:
        for n in seed.RECENT_NOTICES:
            conn.execute(
                "INSERT INTO notices(title, date, category, link, details) VALUES (?,?,?,?,?)",
                (n["title"], n["date"], n["category"], n["link"], n["details"]),
            )

    conn.commit()
    conn.close()


init_db()


class ChatRequest(BaseModel):
    message: str
    lang: str = "en"
    ai_url: Optional[str] = None


class NoticeCreateRequest(BaseModel):
    title: str
    category: str = "Staff Notice"
    details: str = ""
    link: str = "https://www.pdacek.ac.in/announcement.php"


class StudyMaterialCreateRequest(BaseModel):
    dept: str
    scheme: str
    resource_type: str
    title: str
    content: str = ""
    link: str = ""


class StaffLoginRequest(BaseModel):
    username: str
    password: str


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "PDA Campus Assistant API", "version": "3.0.0"}


@app.get("/api/greet")
def greet(lang: str = "en"):
    greetings = {
        "en": {
            "title": "Hello! Welcome to PDA College of Engineering CampusBot",
            "subtitle": "Autonomous Institution Estd. 1958 | Affiliated to VTU Belagavi",
        },
        "kn": {
            "title": "ನಮಸ್ಕಾರ! ಪಿ.ಡಿ.ಎ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿನ ಕ್ಯಾಂಪಸ್‌ಬಾಟ್‌ಗೆ ಸ್ವಾಗತ",
            "subtitle": "ಸ್ವಾಯತ್ತ ಸಂಸ್ಥೆ (ಸ್ಥಾಪನೆ 1958) | ಕಲಬುರಗಿ",
        },
        "hi": {
            "title": "नमस्ते! पी.डी.ए. कॉलेज ऑफ इंजीनियरिंग कैंपस बॉट में आपका स्वागत है",
            "subtitle": "स्वायत्त संस्थान (स्थापना 1958) | कलबुर्गी",
        },
    }
    return greetings.get(lang, greetings["en"])


@app.get("/api/admissions")
def get_admissions():
    return {
        "college": "H.K.E. Society's Poojya Doddappa Appa College of Engineering, Kalaburagi",
        "kcet_code": "E017 / E018",
        "comedk_code": "E095",
        "eligibility": "10+2 / 2nd PUC with minimum 45% in PCM (40% for SC/ST/OBC of Karnataka)",
        "helpline": "08472-224360",
        "departments": seed.DEPARTMENTS,
        "procedure_lines": seed.KNOWLEDGE_DOCS[0]["lines"],
        "documents_lines": seed.KNOWLEDGE_DOCS[1]["lines"],
    }


@app.get("/api/departments")
def get_departments():
    return seed.DEPARTMENTS


@app.get("/api/student/resources")
def get_student_resources(dept: str = "CSE", sem: int = 5):
    d_key = "1" if sem in (1, 2) else dept.upper()
    kb = seed.CURRICULUM_KB.get(d_key, seed.CURRICULUM_KB.get("CSE"))
    return [
        {"type": "Syllabus & Core Subjects", "items": kb.get("core_subjects", kb.get("subjects", []))},
        {"type": "Laboratory Manuals & Experiments", "items": kb.get("labs", [])},
        {"type": "Previous Year Question (PYQ) Highlights", "items": kb.get("pyq_highlights", [])},
    ]


@app.get("/api/teachers")
def get_teachers():
    conn = get_db()
    rows = conn.execute("SELECT * FROM teachers ORDER BY dept, name").fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/teacher/locate")
def locate_teacher(name: str, day: Optional[str] = None, time: Optional[str] = None):
    now = datetime.datetime.now()
    day = day or now.strftime("%a")
    time = time or now.strftime("%H:%M")

    conn = get_db()
    found = conn.execute(
        "SELECT * FROM teachers WHERE lower(name) LIKE ?", (f"%{name.lower()}%",)
    ).fetchall()

    if not found:
        conn.close()
        raise HTTPException(status_code=404, detail="Faculty member not found")

    results = []
    for t in found:
        cur = conn.execute(
            "SELECT * FROM slots WHERE teacher_id=? AND lower(day)=lower(?) AND start_time<=? AND end_time>?",
            (t["id"], day, time, time),
        ).fetchone()
        nxt = conn.execute(
            "SELECT * FROM slots WHERE teacher_id=? AND lower(day)=lower(?) AND start_time>? "
            "ORDER BY start_time LIMIT 1",
            (t["id"], day, time),
        ).fetchone()
        all_slots = conn.execute(
            "SELECT * FROM slots WHERE teacher_id=? ORDER BY day, start_time",
            (t["id"],),
        ).fetchall()
        results.append(
            {
                "id": t["id"],
                "name": t["name"],
                "dept": t["dept"],
                "designation": t["designation"],
                "cabin": t["cabin"],
                "phone": t["phone"],
                "email": t["email"],
                "day": day,
                "queried_time": time,
                "in_class": cur is not None,
                "current_slot": dict(cur) if cur else None,
                "likely_location": f"Classroom {cur['room']} ({cur['subject']} - {cur['class_name']})" if cur else f"Cabin: {t['cabin']}",
                "next_class": dict(nxt) if nxt else None,
                "weekly_slots": [dict(s) for s in all_slots],
            }
        )
    conn.close()
    return results


@app.post("/api/staff/login")
def staff_login(req: StaffLoginRequest):
    conn = get_db()
    row = conn.execute(
        "SELECT id, username, full_name, dept, role FROM staff_users WHERE username=? AND password=?",
        (req.username.strip(), req.password.strip()),
    ).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"status": "ok", "user": dict(row)}


@app.get("/api/staff/students")
def get_staff_students(dept: Optional[str] = None):
    conn = get_db()
    if dept:
        rows = conn.execute("SELECT * FROM students WHERE upper(dept)=upper(?)", (dept,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM students").fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/staff/student-records")
def get_student_records(usn: str):
    conn = get_db()
    stu = conn.execute("SELECT * FROM students WHERE upper(usn)=upper(?)", (usn,)).fetchone()
    recs = conn.execute("SELECT * FROM student_records WHERE upper(usn)=upper(?)", (usn,)).fetchall()
    conn.close()
    if not stu:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"student": dict(stu), "records": [dict(r) for r in recs]}


@app.get("/api/notices")
def get_notices():
    conn = get_db()
    rows = conn.execute("SELECT * FROM notices ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows] if rows else seed.RECENT_NOTICES


@app.post("/api/notices")
def post_notice(req: NoticeCreateRequest):
    if not req.title.strip():
        raise HTTPException(status_code=400, detail="Notice title cannot be empty")
    now_str = datetime.datetime.now().strftime("%d-%m-%Y")
    conn = get_db()
    cur = conn.execute(
        "INSERT INTO notices(title, date, category, link, details) VALUES (?,?,?,?,?)",
        (req.title.strip(), now_str, req.category.strip(), req.link.strip(), req.details.strip()),
    )
    nid = cur.lastrowid
    conn.commit()
    conn.close()
    return {
        "status": "ok",
        "notice": {
            "id": nid,
            "title": req.title.strip(),
            "date": now_str,
            "category": req.category.strip(),
            "link": req.link.strip(),
            "details": req.details.strip(),
        },
    }


@app.get("/api/study-materials")
def get_study_materials(
    dept: Optional[str] = Query(None),
    scheme: Optional[str] = Query(None),
    resource_type: Optional[str] = Query(None),
):
    conn = get_db()
    query = "SELECT * FROM study_materials WHERE 1=1"
    params: list = []
    if dept:
        query += " AND lower(dept) = lower(?)"
        params.append(dept)
    if scheme:
        query += " AND lower(scheme) = lower(?)"
        params.append(scheme)
    if resource_type:
        query += " AND lower(resource_type) = lower(?)"
        params.append(resource_type)
    query += " ORDER BY id DESC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.post("/api/study-materials")
def add_study_material(req: StudyMaterialCreateRequest):
    conn = get_db()
    cur = conn.execute(
        "INSERT INTO study_materials(dept, scheme, resource_type, title, content, link) VALUES (?,?,?,?,?,?)",
        (
            req.dept.strip(),
            req.scheme.strip(),
            req.resource_type.strip(),
            req.title.strip(),
            req.content.strip(),
            req.link.strip(),
        ),
    )
    mid = cur.lastrowid
    conn.commit()
    conn.close()
    return {"status": "ok", "id": mid}


@app.get("/api/class-dashboard")
def get_class_dashboard():
    return seed.STAFF_CLASSES_DASHBOARD


@app.get("/api/scholarships")
def get_scholarships():
    conn = get_db()
    rows = conn.execute("SELECT * FROM scholarships").fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/first-year/sections")
def get_first_year_sections():
    result = []
    for sec, info in fy_data.FIRST_YEAR_TIMETABLE.items():
        result.append({
            "section": sec,
            "stream": info["stream"],
            "dept": info["dept"],
            "room": info["room"],
        })
    return result


@app.get("/api/first-year/section/{section}")
def get_first_year_section(section: str):
    key = section.upper()
    if key not in fy_data.FIRST_YEAR_TIMETABLE:
        raise HTTPException(status_code=404, detail=f"Section '{section}' not found")
    return fy_data.FIRST_YEAR_TIMETABLE[key]


@app.get("/api/first-year/esc")
def get_esc_courses():
    return fy_data.ESC_COURSES


@app.get("/api/1st-year/timetable")
def get_first_year_timetable(
    section: Optional[str] = Query(None),
    dept: Optional[str] = Query(None),
    day: Optional[str] = Query(None),
):
    conn = get_db()
    query = "SELECT * FROM first_year_timetable WHERE 1=1"
    params: list = []

    if section:
        query += " AND upper(section) = upper(?)"
        params.append(section)
    if dept:
        query += " AND lower(dept) LIKE lower(?)"
        params.append(f"%{dept}%")
    if day:
        query += " AND lower(day) = lower(?)"
        params.append(day)

    query += " ORDER BY section, day, period"
    rows = conn.execute(query, params).fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No timetable records found for the given filters.")
    return [dict(r) for r in rows]


@app.get("/api/1st-year/subjects")
def get_first_year_subjects(
    section: Optional[str] = Query(None),
    dept: Optional[str] = Query(None),
):
    conn = get_db()
    query = """
        SELECT DISTINCT section, dept, stream, room,
               subject_code, subject_title, faculty, faculty_dept
        FROM first_year_timetable
        WHERE subject_code != ''
    """
    params: list = []

    if section:
        query += " AND upper(section) = upper(?)"
        params.append(section)
    if dept:
        query += " AND lower(dept) LIKE lower(?)"
        params.append(f"%{dept}%")

    query += " ORDER BY section, subject_code"
    rows = conn.execute(query, params).fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No subject records found for the given filters.")
    return [dict(r) for r in rows]


@app.get("/api/1st-year/esc-courses")
def get_first_year_esc_courses():
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM first_year_esc_courses ORDER BY course_code, batch"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]



# -------------------------------------------------------------
# AIML 2025 Scheme Endpoints (Job B)
# -------------------------------------------------------------
AIML_2025_DIR = os.path.join(os.path.dirname(__file__), "data", "aiml_2025")

@app.get("/api/aiml-2025/subjects")
def get_aiml_2025_subjects(cycle: Optional[str] = Query(None)):
    p_path = os.path.join(AIML_2025_DIR, "subjects_p_cycle.json")
    c_path = os.path.join(AIML_2025_DIR, "subjects_c_cycle.json")
    p_subs = json.load(open(p_path, encoding="utf-8")) if os.path.exists(p_path) else []
    c_subs = json.load(open(c_path, encoding="utf-8")) if os.path.exists(c_path) else []
    if cycle and cycle.upper() == "P":
        return {"cycle": "P", "subjects": p_subs}
    elif cycle and cycle.upper() == "C":
        return {"cycle": "C", "subjects": c_subs}
    return {"p_cycle": p_subs, "c_cycle": c_subs}

@app.get("/api/aiml-2025/syllabus/{code}")
def get_aiml_2025_syllabus(code: str):
    code_clean = code.strip().upper()
    file_path = os.path.join(AIML_2025_DIR, "syllabus", f"{code_clean}.json")
    if not os.path.exists(file_path):
        if code_clean == "CSPH102":
            file_path = os.path.join(AIML_2025_DIR, "syllabus", "CSPHY102.json")
        elif code_clean == "KKIDT158":
            file_path = os.path.join(AIML_2025_DIR, "syllabus", "KKIDTL158.json")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    raise HTTPException(status_code=404, detail=f"Syllabus for code {code} not found")

@app.get("/api/aiml-2025/timetable")
def get_aiml_2025_timetable(section: Optional[str] = Query(None)):
    tt_path = os.path.join(AIML_2025_DIR, "timetable_p_cycle.json")
    if not os.path.exists(tt_path):
        raise HTTPException(status_code=404, detail="Timetable not found")
    with open(tt_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if section:
        sec_upper = section.strip().upper()
        if sec_upper in data.get("sections", {}):
            return {
                "section": sec_upper,
                "academic_year": data.get("academic_year"),
                "w_e_f": data.get("w_e_f"),
                "period_timings": data.get("period_timings"),
                "details": data["sections"][sec_upper]
            }
        raise HTTPException(status_code=404, detail=f"Section {section} not found")
    return data

@app.get("/api/aiml-2025/teacher-index")
def get_aiml_2025_teacher_index():
    path = os.path.join(AIML_2025_DIR, "teacher_index.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

@app.get("/api/aiml-2025/esc-batches")
def get_aiml_2025_esc_batches():
    path = os.path.join(AIML_2025_DIR, "esc_batches.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

@app.get("/api/aiml-2025/resources/development")
def get_aiml_2025_development_problems():
    path = os.path.join(AIML_2025_DIR, "resources", "CSCED103_development.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


@app.post("/api/rag")
@app.post("/api/chat")
def chat_bot(req: ChatRequest):
    t0 = time.time()
    target_ai_url = (req.ai_url or DEFAULT_AI_URL).strip()
    if target_ai_url:
        try:
            payload = json.dumps({"message": req.message, "lang": req.lang}).encode("utf-8")
            http_req = urllib.request.Request(
                target_ai_url,
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(http_req, timeout=8) as resp:
                body = json.loads(resp.read().decode("utf-8"))
                if isinstance(body, dict) and ("reply" in body or "lines" in body):
                    body["rag_pipeline"] = "External LLM + RAG Grounding"
                    body["latency_ms"] = round((time.time() - t0) * 1000, 2)
                    return body
        except Exception:
            pass

    conn = get_db()
    try:
        result = ml_engine.answer_query(req.message, conn, req.lang)
        elapsed_ms = round((time.time() - t0) * 1000, 2)
        result["rag_pipeline"] = "Hybrid BM25 + Subword 3-Gram TF-IDF + Entity Resolver"
        result["rag_grounding"] = "Verified PDA College Knowledge Store (pdacek.ac.in)"
        result["latency_ms"] = elapsed_ms
        return result
    finally:
        conn.close()


if not os.path.exists("static"):
    os.makedirs("static")

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
def serve_home():
    if os.path.exists("static/index.html"):
        with open("static/index.html", encoding="utf-8") as f:
            return f.read()
    if os.path.exists("static/embed_example.html"):
        with open("static/embed_example.html", encoding="utf-8") as f:
            return f.read()
    return "<h1>PDA Campus Assistant is running!</h1>"


@app.get("/assistant", response_class=HTMLResponse)
def serve_assistant():
    html_path = os.path.join("data", "PDA Campus Assistant (3).html")
    if os.path.exists(html_path):
        with open(html_path, encoding="utf-8") as f:
            return f.read()
    return serve_home()


@app.get("/embed", response_class=HTMLResponse)
def serve_embed():
    if os.path.exists("static/embed_example.html"):
        with open("static/embed_example.html", encoding="utf-8") as f:
            return f.read()
    return "<h1>PDA Campus Assistant</h1>"