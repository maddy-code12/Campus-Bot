"""
Machine Learning & NLP Search Engine for PDA College of Engineering CampusBot.
Combines:
1. Subword Character N-Gram TF-IDF Vectorization & Cosine Similarity (handles typos like 'machine larning')
2. Okapi BM25 Probabilistic Information Retrieval
3. Fuzzy Token Sequence Matching & Domain Synonym Expansion
4. Structured Entity Resolution (Departments, Faculty Live Locator, 1st Year Sections A-R, Syllabus/PYQ/Notes, Scholarships, Notices)
All answers are returned strictly line-by-line with accurate college data (never 'go check the website').
"""

import collections
import datetime
import difflib
import math
import re
import sqlite3
from typing import Any, Dict, List, Optional, Tuple

import data.first_year_data as fy_data
import data.seed_data as seed

SYNONYM_MAP = {
    "cs": "cse computer science",
    "comp": "cse computer science",
    "cse": "cse computer science engineering",
    "aiml": "aiml artificial intelligence machine learning",
    "ai": "aiml artificial intelligence",
    "ml": "aiml machine learning",
    "aids": "ai data science",
    "ds": "data science",
    "ise": "ise information science",
    "it": "ise information technology",
    "csd": "cs design computer science design",
    "ece": "ece electronics communication",
    "ec": "ece electronics communication",
    "eee": "eee electrical electronics",
    "electrical": "eee electrical electronics",
    "mech": "mechanical engineering",
    "me": "mechanical engineering",
    "civil": "civil engineering",
    "cv": "civil engineering",
    "eie": "electronics instrumentation",
    "auto": "automobile engineering",
    "ipe": "industrial production",
    "cct": "ceramic cement technology",
    "cement": "ceramic cement technology",
    "fees": "fee structure tuition cost",
    "cost": "fee structure tuition",
    "price": "fee structure tuition",
    "cutoff": "cutoff rank kcet comedk",
    "rank": "cutoff rank kcet comedk",
    "seats": "intake seats matrix open",
    "intake": "intake seats matrix",
    "package": "placement salary package lpa recruiters",
    "salary": "placement salary package lpa",
    "job": "placement recruiters companies career",
    "company": "placement recruiters companies",
    "companies": "placement recruiters companies",
    "hostle": "hostel accommodation mess room",
    "mess": "hostel mess food accommodation",
    "pg": "hostel vidyasiri accommodation",
    "scolarship": "scholarship ssp nsp vidyasiri jindal",
    "scholrship": "scholarship ssp nsp vidyasiri jindal",
    "ssp": "scholarship ssp state portal post matric",
    "nsp": "scholarship nsp national portal pragati",
    "silabus": "syllabus curriculum subjects courses",
    "timtable": "timetable schedule classes period",
    "ia": "cie internal assessment marks",
    "cie": "cie internal assessment marks exam",
    "see": "see semester end exam passing marks",
    "pass": "passing marks criteria exam",
    "locate": "where is teacher faculty cabin class",
    "find": "where is teacher faculty cabin class",
    "hod": "head of department hod",
    # Kannada & Hindi query terms -> canonical English search tokens
    "ಪ್ರವೇಶ": "admission apply procedure fee cutoff",
    "ಶುಲ್ಕ": "fee structure tuition cost kcet comedk management",
    "ವಿದ್ಯಾರ್ಥಿವೇತನ": "scholarship ssp nsp pragati vidyasiri",
    "ವೇಳಾಪಟ್ಟಿ": "timetable schedule classes section",
    "ಪಠ್ಯಕ್ರಮ": "syllabus curriculum subjects notes",
    "ಶಿಕ್ಷಕರು": "where is teacher faculty cabin locate",
    "ಸೂಚನೆ": "notice notices circular announcement exam",
    "प्रवेश": "admission apply procedure fee cutoff",
    "फीस": "fee structure tuition cost kcet comedk management",
    "शुल्क": "fee structure tuition cost kcet comedk management",
    "छात्रवृत्ति": "scholarship ssp nsp pragati vidyasiri",
    "टाइमटेबल": "timetable schedule classes section",
    "समय": "timetable schedule classes section",
    "पाठ्यक्रम": "syllabus curriculum subjects notes",
    "शिक्षक": "where is teacher faculty cabin locate",
    "सूचना": "notice notices circular announcement exam",
}

STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "in", "on", "at", "to", "for", "of", "with", "by", "about", "abt",
    "please", "pls", "plz", "tell", "me", "give", "show", "get", "what",
    "whats", "how", "can", "i", "you", "my", "our", "pda", "college",
    "engineering", "kalaburagi", "gulbarga", "and", "or", "n", "ki", "ka",
}


def normalize_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s&+]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text


def tokenize(text: str) -> List[str]:
    norm = normalize_text(text)
    tokens = [t for t in norm.split() if t and t not in STOPWORDS]
    expanded = list(tokens)
    for t in tokens:
        if t in SYNONYM_MAP:
            expanded.extend(SYNONYM_MAP[t].split())
    return expanded


def char_ngrams(text: str, n: int = 3) -> List[str]:
    clean = re.sub(r"\s+", " ", normalize_text(text))
    padded = f" {clean} "
    if len(padded) < n:
        return [padded]
    return [padded[i : i + n] for i in range(len(padded) - n + 1)]


class HybridMLSearchEngine:
    """
    Hybrid BM25 + Character N-Gram TF-IDF Cosine Similarity Search Engine.
    """

    def __init__(self):
        self.docs: List[Dict[str, Any]] = []
        self.doc_tokens: List[List[str]] = []
        self.doc_ngrams: List[collections.Counter] = []
        self.idf_word: Dict[str, float] = {}
        self.idf_ngram: Dict[str, float] = {}
        self.avgdl: float = 1.0
        self._build_corpus()

    def _build_corpus(self):
        self.docs = []

        # 1. Add general knowledge documents from seed.KNOWLEDGE_DOCS
        for kd in seed.KNOWLEDGE_DOCS:
            full_text = f"{kd['title']} {' '.join(kd['keywords'])} {' '.join(kd['lines'])}"
            self.docs.append({
                "id": kd["id"],
                "type": "knowledge",
                "title": kd["title"],
                "lines": kd["lines"],
                "search_text": full_text,
                "keywords": kd["keywords"],
            })

        # 2. Add each department as a searchable document
        for d in seed.DEPARTMENTS:
            lines = self.format_dept_lines(d)
            full_text = (
                f"{d['name']} {d['code']} {' '.join(d.get('aliases', []))} "
                f"hod {d['hod']} fee {d['fee_govt']} cutoff {d['cutoff_kcet']} "
                f"intake {d['intake']} seats placement {d.get('avg_package', '')} "
                f"{d.get('top_recruiters', '')} {d.get('labs', '')} {d['description']}"
            )
            self.docs.append({
                "id": f"dept_{d['code']}",
                "type": "department",
                "title": f"🏛️ {d['name']} ({d['code']}) — Line-by-Line Profile",
                "lines": lines,
                "search_text": full_text,
                "keywords": d.get("aliases", []) + [d["code"].lower(), d["name"].lower()],
                "meta": d,
            })

        # 3. Add each scholarship as a searchable document
        for idx, s in enumerate(seed.SCHOLARSHIPS):
            lines = [
                f"• **Scheme Name:** {s['title']}",
                f"• **Category:** {s['category']}",
                f"• **Eligibility Criteria:** {s['eligibility']}",
                f"• **Financial Benefit / Amount:** {s['benefit']}",
                f"• **Application Deadline:** {s['deadline']}",
                f"• **Required Documents:**\n  {s['documents_required'].replace(chr(10), chr(10) + '  ')}",
                f"• **Application Portal:** `{s['portal_link']}`",
            ]
            full_text = f"scholarship {s['title']} {s['category']} {s['eligibility']} {s['benefit']} {s['documents_required']}"
            self.docs.append({
                "id": f"sch_{idx}",
                "type": "scholarship",
                "title": f"💰 {s['title']} — Line-by-Line Details",
                "lines": lines,
                "search_text": full_text,
                "keywords": ["scholarship", s["title"].lower()],
            })

        # 4. Add notices & events
        notice_lines = [
            f"• **[{n['date']}] {n['title']} ({n['category']}):** {n['details']}"
            for n in seed.RECENT_NOTICES
        ]
        self.docs.append({
            "id": "recent_notices",
            "type": "notices",
            "title": "📢 Official Campus Notices, Circulars & Upcoming Events",
            "lines": notice_lines,
            "search_text": "notice notices circular announcement hackathon event summer exam backlog commencement " + " ".join(notice_lines),
            "keywords": ["notice", "notices", "announcement", "circular", "event", "hackathon", "ai yuga", "news"],
        })

        # Compute BM25 & N-gram TF-IDF statistics
        N = len(self.docs)
        df_word: Dict[str, int] = collections.defaultdict(int)
        df_ngram: Dict[str, int] = collections.defaultdict(int)
        total_len = 0

        for doc in self.docs:
            tokens = tokenize(doc["search_text"])
            self.doc_tokens.append(tokens)
            total_len += len(tokens)
            for w in set(tokens):
                df_word[w] += 1

            ngrams = collections.Counter(char_ngrams(doc["search_text"], 3))
            self.doc_ngrams.append(ngrams)
            for ng in ngrams:
                df_ngram[ng] += 1

        self.avgdl = total_len / max(N, 1)
        for w, df in df_word.items():
            self.idf_word[w] = math.log(1.0 + (N - df + 0.5) / (df + 0.5))
        for ng, df in df_ngram.items():
            self.idf_ngram[ng] = math.log(1.0 + N / (1.0 + df))

    @staticmethod
    def format_dept_lines(d: Dict[str, Any]) -> List[str]:
        unaided = d.get("fee_kcet_unaided", 130956)
        return [
            f"• **Department Name:** {d['name']} (`{d['code']}`)",
            f"• **Head of Department (HOD):** {d['hod']} ({d.get('cabin', 'Department HOD Cabin')})",
            f"• **Approved Seat Intake (pdacek.ac.in):** `{d['intake']} Seats` per year (Open Seats: `{d['open_seats']} Seats`)",
            f"• **KCET Govt. Quota Fee:** Aided: `₹{d['fee_govt']:,}/yr` | Un-Aided: `₹{unaided:,}/yr` (Includes VTU Fee `₹10,610`)",
            f"• **COMEDK Merit Quota Fee:** `₹{d.get('fee_comedk', 216610):,} / year`",
            f"• **Management Quota Fee:** `₹{d.get('fee_mgmt', 140000):,} / year` (2 Installments Allowed via DD to Principal, PDACEK)",
            f"• **KCET Cutoff Rank:** Rank `{d['cutoff_kcet']:,}` | **COMEDK Cutoff:** Rank `{d.get('cutoff_comedk', d['cutoff_kcet'] + 8000):,}`",
            f"• **Placement Package:** {d.get('avg_package', '₹4.8 LPA Average')}",
            f"• **Top Recruiters:** {d.get('top_recruiters', 'TCS, Infosys, Wipro, Cognizant, Bosch, L&T')}",
            f"• **Department Labs & Facilities:** {d.get('labs', d['description'])}",
            f"• **Key Highlights:** {d['description']}",
            f"• **Direct Contact:** `{d['phone']}` | Email: `{d['email']}` | **UG Admissions (Dr. M. S. Aspalli):** `+91 9449618898`",
        ]

    def score_documents(self, query: str) -> List[Tuple[float, Dict[str, Any]]]:
        q_tokens = tokenize(query)
        q_ngrams = collections.Counter(char_ngrams(query, 3))
        q_norm = normalize_text(query)

        k1 = 1.5
        b = 0.75
        scored = []

        for idx, doc in enumerate(self.docs):
            d_tokens = self.doc_tokens[idx]
            d_counts = collections.Counter(d_tokens)
            dl = len(d_tokens)

            # 1. BM25 Word Score
            bm25 = 0.0
            for qt in q_tokens:
                if qt in d_counts:
                    tf = d_counts[qt]
                    idf = self.idf_word.get(qt, 0.5)
                    bm25 += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * dl / self.avgdl))
                else:
                    # Check fuzzy token match for typos (e.g. 'larning' -> 'learning')
                    best_ratio = 0.0
                    matched_w = None
                    if len(qt) >= 4:
                        for dw in d_counts:
                            if abs(len(dw) - len(qt)) <= 2 and dw[0] == qt[0]:
                                r = difflib.SequenceMatcher(None, qt, dw).ratio()
                                if r > best_ratio:
                                    best_ratio = r
                                    matched_w = dw
                    if best_ratio >= 0.78 and matched_w:
                        tf = d_counts[matched_w]
                        idf = self.idf_word.get(matched_w, 0.5)
                        bm25 += 0.8 * best_ratio * idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * dl / self.avgdl))

            # 2. Subword Character 3-Gram TF-IDF Cosine Similarity
            d_ng = self.doc_ngrams[idx]
            dot = 0.0
            q_norm_sq = 0.0
            d_norm_sq = 0.0
            for ng, q_tf in q_ngrams.items():
                w_idf = self.idf_ngram.get(ng, 0.1)
                q_val = q_tf * w_idf
                q_norm_sq += q_val * q_val
                if ng in d_ng:
                    dot += q_val * (d_ng[ng] * w_idf)
            for ng, d_tf in d_ng.items():
                w_idf = self.idf_ngram.get(ng, 0.1)
                d_val = d_tf * w_idf
                d_norm_sq += d_val * d_val
            cosine = dot / (math.sqrt(q_norm_sq) * math.sqrt(d_norm_sq) + 1e-9)

            # 3. Keyword Phrase Boost
            kw_boost = 0.0
            for kw in doc.get("keywords", []):
                if kw in q_norm:
                    kw_boost += 3.5

            total_score = bm25 + (cosine * 12.0) + kw_boost
            scored.append((total_score, doc))

        scored.sort(key=lambda x: x[0], reverse=True)
        return scored

    def match_departments(self, query: str) -> List[Dict[str, Any]]:
        q_norm = normalize_text(query)
        q_words = set(q_norm.split())
        matched = []

        for d in seed.DEPARTMENTS:
            score = 0.0
            code_low = d["code"].lower()
            name_low = normalize_text(d["name"])
            if code_low in q_words or name_low in q_norm:
                score += 10.0
            for alias in d.get("aliases", []):
                alias_norm = normalize_text(alias)
                if alias_norm in q_words:
                    score += 8.0
                elif len(alias_norm) > 3 and alias_norm in q_norm:
                    score += 7.0
                else:
                    # Fuzzy check for typos like "machine larning", "artifical intelligence", "computr science"
                    if len(alias_norm) >= 5:
                        for w in q_words:
                            if len(w) >= 4 and difflib.SequenceMatcher(None, w, alias_norm).ratio() >= 0.80:
                                score += 5.0
                        if " " in alias_norm:
                            # Check n-gram overlap against multi-word alias
                            alias_words = alias_norm.split()
                            fuzzy_hits = sum(
                                1 for aw in alias_words
                                if any(difflib.SequenceMatcher(None, aw, qw).ratio() >= 0.78 for qw in q_words)
                            )
                            if fuzzy_hits == len(alias_words):
                                score += 9.0
            if score > 0:
                matched.append((score, d))

        matched.sort(key=lambda x: x[0], reverse=True)
        return [m[1] for m in matched]

    def answer_query(self, query: str, conn: sqlite3.Connection, lang: str = "en") -> Dict[str, Any]:
        raw_res = self._answer_query_raw(query, conn, lang)
        return self.localize_response(raw_res, lang)

    def _answer_query_raw(self, query: str, conn: sqlite3.Connection, lang: str = "en") -> Dict[str, Any]:
        q_raw = query.strip()
        q_norm = normalize_text(q_raw)
        q_tokens = set(tokenize(q_raw))

        # ------------------------------------------------------------------
        # 1. TEACHER / FACULTY LIVE LOCATOR & SCHEDULE SEARCH
        # ------------------------------------------------------------------
        teacher_triggers = {
            "where", "locate", "cabin", "prof", "professor", "dr", "teacher",
            "faculty", "sir", "madam", "mam", "hod", "ಎಲ್ಲಿದ್ದಾರೆ", "कहाँ",
        }
        # Clean candidate name
        cleaned_name = re.sub(
            r"\b(where|is|are|find|locate|search|right|now|cabin|of|the|prof|professor|dr|teacher|faculty|schedule|timetable|for|class|room|in|at|tell|me|about)\b",
            " ",
            q_norm,
        )
        cleaned_name = re.sub(r"\s+", " ", cleaned_name).strip()

        all_teachers = conn.execute("SELECT * FROM teachers").fetchall()
        matched_teachers = []
        for t in all_teachers:
            t_name_low = normalize_text(t["name"])
            t_name_no_title = re.sub(r"^(dr|prof)\s+", "", t_name_low).strip()
            t_parts = [p for p in t_name_no_title.split() if len(p) > 2]

            # Exact or substring match
            if cleaned_name and len(cleaned_name) >= 3 and (cleaned_name in t_name_low or t_name_no_title in q_norm):
                matched_teachers.append((10.0, t))
                continue

            # Part match or fuzzy match
            part_hits = 0
            for part in t_parts:
                if part in q_norm.split():
                    part_hits += 1
                else:
                    for qw in q_norm.split():
                        if len(qw) >= 4 and difflib.SequenceMatcher(None, part, qw).ratio() >= 0.82:
                            part_hits += 0.8
                            break
            if part_hits >= 1 and (part_hits >= len(t_parts) or (teacher_triggers & set(q_norm.split()))):
                matched_teachers.append((part_hits * 4.0, t))

        # Only trigger direct teacher locator if user isn't asking a general department/syllabus question,
        # OR if a specific teacher name was clearly matched.
        is_dept_general = any(w in q_norm for w in ["fee", "cutoff", "intake", "seat", "syllabus", "notes", "pyq", "scholarship", "placement", "hostel"])
        if matched_teachers and (not is_dept_general or any(w in q_norm for w in ["where", "locate", "cabin", "schedule", "dr", "prof"])):
            matched_teachers.sort(key=lambda x: x[0], reverse=True)
            top_score = matched_teachers[0][0]
            top_teachers = [t for s, t in matched_teachers if s >= top_score - 1.0][:3]

            now = datetime.datetime.now()
            cur_day = now.strftime("%a")
            cur_time = now.strftime("%H:%M")

            lines = [f"### 👨‍🏫 Live Faculty Locator & Schedule (`{cur_day}, {cur_time}`)"]
            audio_parts = []

            for t in top_teachers:
                cur = conn.execute(
                    "SELECT * FROM slots WHERE teacher_id=? AND lower(day)=lower(?) AND start_time<=? AND end_time>?",
                    (t["id"], cur_day, cur_time, cur_time),
                ).fetchone()
                nxt = conn.execute(
                    "SELECT * FROM slots WHERE teacher_id=? AND lower(day)=lower(?) AND start_time>? ORDER BY start_time LIMIT 1",
                    (t["id"], cur_day, cur_time),
                ).fetchone()
                all_slots = conn.execute(
                    "SELECT * FROM slots WHERE teacher_id=? ORDER BY CASE day WHEN 'Mon' THEN 1 WHEN 'Tue' THEN 2 WHEN 'Wed' THEN 3 WHEN 'Thu' THEN 4 WHEN 'Fri' THEN 5 WHEN 'Sat' THEN 6 ELSE 7 END, start_time",
                    (t["id"],),
                ).fetchall()

                status = "🔴 IN CLASS RIGHT NOW" if cur else "🟢 AVAILABLE IN CABIN"
                loc = (
                    f"Room `{cur['room']}` — Teaching **{cur['subject']}** to `{cur['class_name']}` ({cur['start_time']}–{cur['end_time']})"
                    if cur
                    else f"`{t['cabin']}`"
                )
                nxt_str = (
                    f"`{nxt['start_time']}–{nxt['end_time']}` in Room `{nxt['room']}` (**{nxt['subject']}** · `{nxt['class_name']}`)"
                    if nxt
                    else "No more classes scheduled today"
                )

                lines.extend([
                    f"**{t['name']}** — *{t['designation']} ({t['dept']} Dept)*",
                    f"• **Live Status:** **{status}**",
                    f"• **Current Location:** {loc}",
                    f"• **Faculty Cabin:** `{t['cabin']}`",
                    f"• **Next Scheduled Class Today:** {nxt_str}",
                    f"• **Contact:** `{t['phone']}` | Email: `{t['email']}`",
                ])
                if all_slots:
                    slot_summary = " | ".join(
                        f"**{s['day']}** {s['start_time']}: {s['subject']} ({s['class_name']}, {s['room']})"
                        for s in all_slots[:6]
                    )
                    lines.append(f"• **Weekly Classes:** {slot_summary}")
                lines.append("")
                audio_parts.append(f"{t['name']} from {t['dept']} department is currently {status.lower()} at {loc}.")

            return {
                "reply": "\n".join(lines).strip(),
                "lines": [l for l in lines if l.strip()],
                "audio_text": " ".join(audio_parts),
                "category": "faculty_locator",
                "confidence": 0.98,
            }

        # ------------------------------------------------------------------
        # 1B. STUDENT USN LOOKUP (E.G., "3PD22CS001", "MY ATTENDANCE FOR 3PD22AI005")
        # ------------------------------------------------------------------
        usn_match = re.search(r"\b(3pd\d{2}[a-z]{2}\d{3})\b", q_norm)
        if usn_match:
            usn = usn_match.group(1).upper()
            st_row, rec_rows = None, []
            try:
                conn = sqlite3.connect(DB_PATH)
                conn.row_factory = sqlite3.Row
                st_row = conn.execute("SELECT * FROM students WHERE UPPER(usn) = ?", (usn,)).fetchone()
                rec_rows = conn.execute("SELECT * FROM student_records WHERE UPPER(usn) = ?", (usn,)).fetchall()
                conn.close()
            except Exception:
                pass
            if st_row:
                lines = [
                    f"### 🎓 Verified Student Academic Dossier — `{usn}`",
                    f"• **Student Name & USN:** **{st_row['name']}** (`{st_row['usn']}`)",
                    f"• **Department & Semester:** {st_row['branch']} — Semester {st_row['semester']} ({st_row['scheme']})",
                    f"• **Overall Attendance & CIE:** Attendance: `{st_row['attendance_pct']}%` | Average CIE: `{st_row['cie_score']}/50`",
                    f"• **Fee Balance Status:** Pending Fee Due: `₹{st_row['fee_due']:,}` | Hostel Status: `{st_row['hostel_status']}`",
                ]
                if rec_rows:
                    lines.append("• **Subject-Wise CIE Marks & Attendance Breakdown:**")
                    for r in rec_rows:
                        lines.append(
                            f"  - `{r['subject_code']}` **{r['subject_name']}:** CIE1 `{r['cie1']}`, CIE2 `{r['cie2']}`, CIE3 `{r['cie3']}` | Total CIE: **`{r['total_cie']}/50`** | Attendance: **`{r['attendance_pct']}%`** ({r['eligibility_status']})"
                        )
                return {
                    "reply": "\n".join(lines),
                    "lines": lines,
                    "audio_text": f"Academic record for {st_row['name']}, USN {usn}. Overall attendance is {st_row['attendance_pct']} percent and CIE score is {st_row['cie_score']} out of 50.",
                    "category": "student_record",
                    "confidence": 0.99,
                }

        # ------------------------------------------------------------------
        # 2A. AIML 3RD & 5TH SEMESTER (SECTION A & B) OFFICIAL TIMETABLES
        # ------------------------------------------------------------------
        sem_match_tt = re.search(
            r"\b(?:sem|semester)\s*([1-8]|iii|v)\b|\b([1-8]|iii|v)(?:st|nd|rd|th)?\s*(?:sem|semester)\b",
            q_norm,
        )
        raw_sem_tt = (sem_match_tt.group(1) or sem_match_tt.group(2)) if sem_match_tt else None
        if raw_sem_tt == "iii":
            raw_sem_tt = "3"
        elif raw_sem_tt == "v":
            raw_sem_tt = "5"

        aiml_code_match = re.search(
            r"\b(csmat301|aids0302|aioop303|aioss304|aidsc305|aidscl306|aidvpl307a|aiprj358|kknss309|kkped309|kkyog309|22ai51|22ai52|22ai53|22ail54|22ai55a|22aimp56|22rmi57|22es58|22ns59|22pes59|22yo59)\b",
            q_norm,
        )
        if aiml_code_match and not raw_sem_tt:
            c_code = aiml_code_match.group(1).upper()
            raw_sem_tt = "3" if ("30" in c_code or "358" in c_code) else "5"

        is_aiml_query = (
            any(d["code"] == "AIML" for d in self.match_departments(q_raw))
            or bool(aiml_code_match)
            or any(w in q_norm for w in ["dsdo", "rmipr", "pml", "lh-09", "lh-15", "lh-16", "ashwini h", "sowmya g", "mallinath s", "sharanamma h"])
        )
        is_tt_or_coord = any(
            w in q_norm
            for w in ["timetable", "time table", "time-table", "schedule", "section", "sec", "coordinator", "class coordinator", "lh-09", "lh-15", "lh-16"]
        ) or bool(aiml_code_match)

        if is_aiml_query and (raw_sem_tt in ("3", "5") or is_tt_or_coord):
            aiml_tts = getattr(seed, "DEPT_TIMETABLES", {}).get("AIML", {})
            target_sems = [raw_sem_tt] if raw_sem_tt in ("3", "5") else ["3", "5"]
            sec_m = re.search(r"\b(?:section|sec)\s*([ab])\b|\b([ab])\s*[-–]?\s*section\b", q_norm)
            req_sec = (sec_m.group(1) or sec_m.group(2)).upper() if sec_m else None

            if raw_sem_tt in ("3", "5") and (is_tt_or_coord or req_sec):
                target_secs = [req_sec] if req_sec in ("A", "B") else ["A", "B"]
                lines = []
                for sm in target_sems:
                    for sc in target_secs:
                        tt_obj = aiml_tts.get(sm, {}).get(sc)
                        if not tt_obj:
                            continue
                        lines.extend([
                            f"### 🗓️ AIML — {tt_obj['title']} (`W.E.F: {tt_obj['wef']}`)",
                            f"• **Department:** {tt_obj['dept']} (`AIML`) | **Semester:** `{sm}` | **Section:** `{sc}-Section`",
                            f"• **Class Coordinator:** **{tt_obj['coordinator']}** | **Primary Lecture Hall:** `{tt_obj['room']}`",
                            "• **Period Timings:** P1: `9:00–10:00` | P2: `10:00–11:00` | P3: `11:15–12:15` | P4: `12:15–1:15` | Lunch: `1:15–2:15` | P5: `2:15–3:15` | P6: `3:15–4:15` | P7: `4:15–5:15`",
                            "• **Course Code, Title, Hours & Assigned Faculty:**",
                        ])
                        for c in tt_obj["courses"]:
                            lines.append(
                                f"  - `{c['code']}` **{c['title']}** ({c['l']}L + {c['t']}T/Lab) — **{c['faculty']}** ({c['dept']})"
                            )
                        lines.append("• **Weekly Period-by-Period Schedule (Mon–Sat):**")
                        for day, p_list in tt_obj["schedule"].items():
                            active_p = [f"P{i+1}: {p}" for i, p in enumerate(p_list) if p != "–"]
                            lines.append(f"  - **{day}:** {' | '.join(active_p)}")
                        lines.append("")
                if lines:
                    return {
                        "reply": "\n".join(lines).strip(),
                        "lines": [l for l in lines if l.strip()],
                        "audio_text": f"Here is the official AIML Semester {raw_sem_tt} timetable, course list, faculty allocation, and class coordinator.",
                        "category": "aiml_timetable",
                        "confidence": 0.99,
                    }

        # ------------------------------------------------------------------
        # 2B. 1ST YEAR SECTION TIMETABLE (SECTIONS A–R) & ESC-I COURSES
        # ------------------------------------------------------------------
        sec_match = re.search(r"\b(?:section|sec|div|division)\s*([a-r])\b", q_norm)
        is_esc_query = bool(re.search(r"\b(esc|esc-1|esc 1|engineering science course)\b", q_norm))
        is_fy_tt_query = bool(re.search(r"\b(1st year|first year|1st sem|first sem)\b.*\b(timetable|schedule|time table|section|class)\b", q_norm))

        if is_esc_query:
            lines = [
                "### 🔬 B.E. 1st Semester — Engineering Science Courses-I (ESC-I) Batch Allocation",
            ]
            for c in fy_data.ESC_COURSES:
                batch_str = " | ".join(f"**{b['batch']}**: {b['faculty']} (`{b['room']}`)" for b in c["batches"])
                lines.append(f"• **{c['code']} — {c['title']}:**\n  {batch_str}")
            return {
                "reply": "\n".join(lines),
                "lines": lines,
                "audio_text": "Here is the line by line batch allocation and room numbers for all 5 Engineering Science Courses for First Year B.E.",
                "category": "first_year_esc",
                "confidence": 0.97,
            }

        if sec_match or is_fy_tt_query:
            sec_key = sec_match.group(1).upper() if sec_match else None
            if not sec_key:
                matched_depts = self.match_departments(q_raw)
                if matched_depts:
                    d_code = matched_depts[0]["code"].upper()
                    for k, v in fy_data.FIRST_YEAR_TIMETABLE.items():
                        if d_code in v["stream"].upper() or d_code in v["dept"].upper():
                            sec_key = k
                            break
            if sec_key and sec_key in fy_data.FIRST_YEAR_TIMETABLE:
                info = fy_data.FIRST_YEAR_TIMETABLE[sec_key]
                lines = [
                    f"### 🗓️ B.E. 1st Year (Sem 1) — Section `{sec_key}` Official Timetable & Faculty",
                    f"• **Section & Stream:** Section `{sec_key}` — {info['stream']}",
                    f"• **Department:** {info['dept']}",
                    f"• **Allocated Classroom:** `{info['room']}`",
                    "• **Subject & Faculty Allocation:**",
                ]
                for f in info["faculties"]:
                    lines.append(f"  - `{f['code']}` **{f['title']}** — *{f['faculty']}* ({f['dept']})")
                lines.append("• **Weekly Period-by-Period Schedule (P1: 9:00, P2: 10:00, P3: 11:15, P4: 12:15, P5: 2:00, P6: 3:00, P7: 4:00):**")
                for day, periods in info["schedule"].items():
                    active = [f"P{i+1}: {p}" for i, p in enumerate(periods) if p != "–"]
                    lines.append(f"  - **{day}:** {' | '.join(active)}")
                return {
                    "reply": "\n".join(lines),
                    "lines": lines,
                    "audio_text": f"Here is the complete line by line timetable and faculty list for First Year Section {sec_key} ({info['dept']}) in room {info['room']}.",
                    "category": "first_year_timetable",
                    "confidence": 0.98,
                }

        # ------------------------------------------------------------------
        # 3. SYLLABUS, NOTES, PYQ, LAB MANUALS & CURRICULUM QUERIES
        # ------------------------------------------------------------------
        sem_match = re.search(r"\b(?:sem|semester)\s*([1-8])\b|\b([1-8])(?:st|nd|rd|th)\s*(?:sem|semester)\b", q_norm)
        req_sem = (sem_match.group(1) or sem_match.group(2)) if sem_match else None

        is_curriculum = any(
            w in q_norm
            for w in ["syllabus", "silabus", "curriculum", "subject", "subjects", "notes", "note", "pyq", "question paper", "previous year", "lab manual", "experiments", "units", "credits"]
        ) or bool(req_sem and self.match_departments(q_raw))

        if is_curriculum:
            matched_depts = self.match_departments(q_raw)
            is_first_year = req_sem in ("1", "2") or any(w in q_norm for w in ["1st year", "first year", "sem 1", "sem 2", "1st sem", "2nd sem", "physics cycle", "chemistry cycle", "caed"])
            lines = []
            if is_first_year or not matched_depts:
                kb1 = seed.CURRICULUM_KB["1"]
                lines.append(f"### 📚 B.E. 1st Year Curriculum, Syllabus, Labs & PYQs ({kb1['scheme']})")
                lines.append("• **Line-by-Line Subjects & Unit Topics:**")
                lines.extend([f"  {s}" for s in kb1["subjects"]])
                lines.append("• **Laboratory Experiments:**")
                lines.extend([f"  {l}" for l in kb1["labs"]])
                lines.append("• **Frequently Asked PYQ Exam Questions:**")
                lines.extend([f"  {p}" for p in kb1["pyq_highlights"]])

            if matched_depts and req_sem not in ("1", "2"):
                for d in matched_depts[:2]:
                    d_code = d["code"]
                    kb_dept = seed.CURRICULUM_KB.get(
                        d_code,
                        seed.CURRICULUM_KB.get("AIML" if "AI" in d_code else "CSE"),
                    )
                    sem_title = f" — Semester {req_sem}" if req_sem else ""
                    lines.append(f"### 📘 {d['name']} (`{d_code}`){sem_title} — Autonomous Syllabus, Labs & PYQ Guide")
                    filtered_subs = kb_dept["core_subjects"]
                    if req_sem:
                        sem_filtered = [s for s in kb_dept["core_subjects"] if f"Sem {req_sem}" in s]
                        if sem_filtered:
                            filtered_subs = sem_filtered
                    lines.append("• **Semester-Wise Core Subjects (Line-by-Line):**")
                    lines.extend([f"  {s}" for s in filtered_subs])
                    lines.append("• **Key Laboratory Manuals & Experiments:**")
                    lines.extend([f"  {l}" for l in kb_dept["labs"]])
                    lines.append("• **High-Weightage SEE / CIE Previous Year Questions (PYQs):**")
                    lines.extend([f"  {p}" for p in kb_dept["pyq_highlights"]])

            return {
                "reply": "\n".join(lines),
                "lines": lines,
                "audio_text": "Here is the complete line by line syllabus, core subjects, laboratory experiments, and previous year exam questions.",
                "category": "curriculum_syllabus",
                "confidence": 0.97,
            }

        # ------------------------------------------------------------------
        # 4. DEPARTMENT-SPECIFIC ENQUIRIES (E.G., "MACHINE LEARNING", "CSE FEES", "ECE CUTOFF")
        # ------------------------------------------------------------------
        matched_depts = self.match_departments(q_raw)
        if matched_depts:
            lines = []
            audio_parts = []
            for d in matched_depts[:2]:
                lines.append(f"### 🏛️ {d['name']} (`{d['code']}`) — Verified Official Profile (`pdacek.ac.in`)")
                lines.extend(self.format_dept_lines(d))

                kb_dept = seed.CURRICULUM_KB.get(d["code"])
                if kb_dept:
                    lines.append("• **Core Curriculum Subjects:**")
                    for cs in kb_dept["core_subjects"][:3]:
                        lines.append(f"  {cs}")
                lines.append("")
                audio_parts.append(
                    f"{d['name']} has an official intake of {d['intake']} seats, KCET Aided fee of {d['fee_govt']} rupees per year, KCET cutoff rank {d['cutoff_kcet']}, headed by {d['hod']}."
                )

            return {
                "reply": "\n".join(lines).strip(),
                "lines": [l for l in lines if l.strip()],
                "audio_text": " ".join(audio_parts),
                "category": "department_enquiry",
                "confidence": 0.98,
            }

        # ------------------------------------------------------------------
        # 5. SCHOLARSHIP ENQUIRIES (SSP, NSP, PRAGATI, VIDYASIRI, JINDAL)
        # ------------------------------------------------------------------
        if any(w in q_norm for w in ["scholarship", "scolarship", "scholrship", "ssp", "nsp", "pragati", "saksham", "swanath", "vidyasiri", "jindal", "reimbursement", "concession", "ವಿದ್ಯಾರ್ಥಿವೇತನ", "छात्रवृत्ति"]):
            lines = [
                "### 💰 Scholarships & Financial Aid — Official Line-by-Line Breakdown (`pdacek.ac.in`)",
            ]
            for s in seed.SCHOLARSHIPS:
                if "ssp" in q_norm and "ssp" not in s["title"].lower():
                    continue
                if "nsp" in q_norm and "nsp" not in s["title"].lower() and "pragati" not in s["title"].lower() and "saksham" not in s["title"].lower():
                    continue
                if "vidyasiri" in q_norm and "vidyasiri" not in s["title"].lower():
                    continue
                if "jindal" in q_norm and "jindal" not in s["title"].lower():
                    continue

                lines.extend([
                    f"**{s['title']}** (*{s['category']}*)",
                    f"• **Eligibility:** {s['eligibility']}",
                    f"• **Benefit Amount:** {s['benefit']}",
                    f"• **Deadline:** {s['deadline']}",
                    f"• **Required Documents:** {s['documents_required'].replace(chr(10), ' | ')}",
                    f"• **Official Portal:** `{s['portal_link']}`",
                    "",
                ])
            return {
                "reply": "\n".join(lines).strip(),
                "lines": [l for l in lines if l.strip()],
                "audio_text": "Here are the complete line by line eligibility criteria, benefit amounts, and required documents for PDA College scholarships including SSP, NSP AICTE Pragati, Saksham, Swanath, Vidyasiri, and Sitaram Jindal scholarships.",
                "category": "scholarship_enquiry",
                "confidence": 0.97,
            }

        # ------------------------------------------------------------------
        # 6. HYBRID ML SEARCH (BM25 + N-GRAM TF-IDF COSINE) ACROSS ALL DOCS
        # ------------------------------------------------------------------
        scored_docs = self.score_documents(q_raw)
        top_score, top_doc = scored_docs[0]

        if top_score > 1.2:
            lines = [f"### {top_doc['title']}"]
            lines.extend(top_doc["lines"])

            if len(scored_docs) > 1 and scored_docs[1][0] >= top_score * 0.65 and scored_docs[1][0] > 3.0:
                sec_doc = scored_docs[1][1]
                lines.append("")
                lines.append(f"### {sec_doc['title']}")
                lines.extend(sec_doc["lines"][:6])

            return {
                "reply": "\n".join(lines),
                "lines": lines,
                "audio_text": f"Here are the accurate line by line details for { re.sub(r'[^a-zA-Z0-9 &]', '', top_doc['title']) }.",
                "category": top_doc["type"],
                "confidence": round(min(0.99, 0.72 + top_score / 40.0), 2),
            }

        # ------------------------------------------------------------------
        # 7. GREETING OVERVIEW OR HONEST "NOT SURE" OFFICE FALLBACK
        # ------------------------------------------------------------------
        is_greeting = any(
            w in q_norm.split()
            for w in ["hi", "hello", "hey", "namaste", "namaskara", "overview", "summary", "help", "ನಮಸ್ಕಾರ", "नमस्ते"]
        )
        if is_greeting:
            lines = [
                "### 🎓 PDA College of Engineering, Kalaburagi — Official Summary (`pdacek.ac.in`)",
                "• **Governance:** Principal: **Dr. S. B. Patil** | President (HKES): **Dr. Shashil G. Namoshi** (Hon'ble MLC) | Campus: 71 Acres, Aiwan-E-Shahi, Kalaburagi – 585102.",
                "• **13 B.E. Branches & Official Intakes:** CSE (`240`), Civil (`180`), ECE (`180`), Mechanical (`120`), EEE (`120`), AIML (`120`), AI&DS (`120`), ISE (`60`), CS & Design (`60`), IPE (`60`), EIE (`30`), Automobile (`30`), Ceramic & Cement (`30`).",
                "• **Official Fee Structure:** KCET Aided (`E017`): **`₹67,866/yr`** | KCET Un-Aided (`E018`): **`₹1,30,956/yr`** | COMEDK (`E095`): **`₹2,16,610/yr`** (Circuit/IT) & **`₹1,10,610/yr`** (Core) | Mgmt Quota: **`₹1.40L – ₹2.50L/yr`**.",
                "• **Admission Coordinators:** **Dr. M. S. Aspalli** (`+91 9449618898`), **Mr. Sangamesh** (`+91 9986111396`), **Mrs. Monika Shah** (`+91 9035221078`).",
                "• **College Office:** `08472-224360` | Email: `principal@pdaengg.com` | Website: `https://www.pdacek.ac.in`.",
            ]
            return {
                "reply": "\n".join(lines),
                "lines": lines,
                "audio_text": "Welcome to PDA College of Engineering Campus Assistant. Please select a menu option or ask about admissions, timetables, faculty, or scholarships.",
                "category": "general_overview",
                "confidence": 0.95,
            }

        not_sure_lines = {
            "en": [
                "### ℹ️ Not Sure — Official College Office Contact",
                "• I am **not sure** about that specific detail yet, as it is not in the currently verified college dataset.",
                "• **Main Office Phone:** `08472-224360`",
                "• **UG Admission Help Desk:** Dr. M. S. Aspalli (`+91 9449618898`) | Mr. Sangamesh (`+91 9986111396`)",
                "• **PG / Ph.D. Help Desk:** Mrs. Monika Shah (`+91 9035221078`)",
                "• **Official Email & Website:** `principal@pdaengg.com` · [pdacek.ac.in](https://www.pdacek.ac.in)",
            ],
            "kn": [
                "### ℹ️ ಖಚಿತ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ — ಅಧಿಕೃತ ಕಾಲೇಜು ಕಚೇರಿ ಸಂಪರ್ಕ",
                "• ಈ ನಿರ್ದಿಷ್ಟ ಮಾಹಿತಿಯು ಪ್ರಸ್ತುತ ಪರಿಶೀಲಿಸಿದ ಡೇಟಾದಲ್ಲಿ ಇಲ್ಲದಿರುವುದರಿಂದ ನನಗೆ **ಖಚಿತವಿಲ್ಲ**.",
                "• **ಮುಖ್ಯ ಕಚೇರಿ ದೂರವಾಣಿ:** `08472-224360`",
                "• **ಯುಜಿ ಪ್ರವೇಶ ಸಹಾಯವಾಣಿ:** ಡಾ. ಎಂ. ಎಸ್. ಅಸ್ಪಲ್ಲಿ (`+91 9449618898`) | ಶ್ರೀ ಸಂಗಮೇಶ್ (`+91 9986111396`)",
                "• **ಪಿಜಿ / ಪಿಎಚ್.ಡಿ ಸಹಾಯವಾಣಿ:** ಶ್ರೀಮತಿ ಮೋನಿಕಾ ಶಾ (`+91 9035221078`)",
                "• **ಅಧಿಕೃತ ಇಮೇಲ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್:** `principal@pdaengg.com` · [pdacek.ac.in](https://www.pdacek.ac.in)",
            ],
            "hi": [
                "### ℹ️ निश्चित जानकारी उपलब्ध नहीं — आधिकारिक कॉलेज कार्यालय संपर्क",
                "• मुझे इस विशिष्ट जानकारी के बारे में **पक्का पता नहीं है**, क्योंकि यह वर्तमान सत्यापित डेटा में उपलब्ध नहीं है।",
                "• **मुख्य कार्यालय फ़ोन:** `08472-224360`",
                "• **यूजी प्रवेश हेल्प डेस्क:** डॉ. एम. एस. असीपल्ली (`+91 9449618898`) | श्री संगमेश (`+91 9986111396`)",
                "• **पीजी / पीएच.डी. हेल्प डेस्क:** श्रीमती मोनिका शाह (`+91 9035221078`)",
                "• **आधिकारिक ईमेल और वेबसाइट:** `principal@pdaengg.com` · [pdacek.ac.in](https://www.pdacek.ac.in)",
            ],
        }
        ns_audio = {
            "en": "I am not sure about that specific question. Please contact the PDA College office at 08472 224360 or visit pdacek.ac.in.",
            "kn": "ಆ ಪ್ರಶ್ನೆಯ ಬಗ್ಗೆ ನನಗೆ ಖಚಿತವಿಲ್ಲ. ದಯವಿಟ್ಟು ಪಿಡಿಎ ಕಾಲೇಜು ಕಚೇರಿ 08472 224360 ಗೆ ಕರೆ ಮಾಡಿ.",
            "hi": "मुझे इस प्रश्न के बारे में पक्का पता नहीं है। कृपया पीडीए कॉलेज कार्यालय 08472 224360 पर संपर्क करें।",
        }
        chosen = not_sure_lines.get(lang, not_sure_lines["en"])
        return {
            "reply": "\n".join(chosen),
            "lines": chosen,
            "audio_text": ns_audio.get(lang, ns_audio["en"]),
            "category": "not_sure_fallback",
            "confidence": 0.40,
        }

    @staticmethod
    def localize_response(res: Dict[str, Any], lang: str) -> Dict[str, Any]:
        if lang not in ("kn", "hi") or res.get("category") == "not_sure_fallback":
            return res

        phrase_map_kn = {
            "Live Faculty Locator & Schedule": "ಶಿಕ್ಷಕರ ಪ್ರಸ್ತುತ ಸ್ಥಳ ಮತ್ತು ವೇಳಾಪಟ್ಟಿ",
            "IN CLASS RIGHT NOW": "ಈಗ ತರಗತಿಯಲ್ಲಿದ್ದಾರೆ",
            "AVAILABLE IN CABIN": "ಕ್ಯಾಬಿನ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದ್ದಾರೆ",
            "Live Status:": "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ:",
            "Current Location:": "ಪ್ರಸ್ತುತ ಸ್ಥಳ:",
            "Faculty Cabin:": "ಶಿಕ್ಷಕರ ಕ್ಯಾಬಿನ್:",
            "Next Scheduled Class Today:": "ಇಂದಿನ ಮುಂದಿನ ತರಗತಿ:",
            "Weekly Classes:": "ವಾರದ ತರಗತಿಗಳು:",
            "Contact:": "ಸಂಪರ್ಕ:",
            "Department Name:": "ವಿಭಾಗದ ಹೆಸರು:",
            "Department:": "ವಿಭಾಗ:",
            "Head of Department (HOD):": "ವಿಭಾಗದ ಮುಖ್ಯಸ್ಥರು (HOD):",
            "Approved Seat Intake (pdacek.ac.in):": "ಅನುಮೋದಿತ ಸೀಟುಗಳು (pdacek.ac.in):",
            "KCET Govt. Quota Fee:": "ಕೆಸಿಇಟಿ ಸರ್ಕಾರಿ ಕೋಟಾ ಶುಲ್ಕ:",
            "COMEDK Merit Quota Fee:": "ಕಾಮೆಡ್-ಕೆ ಶುಲ್ಕ:",
            "Management Quota Fee:": "ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಕೋಟಾ ಶುಲ್ಕ:",
            "KCET Cutoff Rank:": "ಕೆಸಿಇಟಿ ಕಟ್-ಆಫ್ ರ‍್ಯಾಂಕ್:",
            "Placement Package:": "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಪ್ಯಾಕೇಜ್:",
            "Top Recruiters:": "ಪ್ರಮುಖ ಕಂಪನಿಗಳು:",
            "Department Labs & Facilities:": "ಪ್ರಯೋಗಾಲಯಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳು:",
            "Key Highlights:": "ಪ್ರಮುಖ ವಿಶೇಷತೆಗಳು:",
            "Direct Contact:": "ನೇರ ಸಂಪರ್ಕ:",
            "Scholarships & Financial Aid": "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಆರ್ಥಿಕ ಸಹಾಯ",
            "Eligibility:": "ಅರ್ಹತೆ:",
            "Benefit Amount:": "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮೊತ್ತ:",
            "Deadline:": "ಕೊನೆಯ ದಿನಾಂಕ:",
            "Required Documents:": "ಬೇಕಾಗುವ ದಾಖಲೆಗಳು:",
            "Official Portal:": "ಅಧಿಕೃತ ಪೋರ್ಟಲ್:",
            "Class Coordinator:": "ತರಗತಿ ಸಂಯೋಜಕರು:",
            "Allocated Classroom:": "ತರಗತಿ ಕೊಠಡಿ:",
            "Primary Lecture Hall:": "ಮುಖ್ಯ ಉಪನ್ಯಾಸ ಕೊಠಡಿ:",
        }

        phrase_map_hi = {
            "Live Faculty Locator & Schedule": "शिक्षक लाइव लोकेटर और समय सारणी",
            "IN CLASS RIGHT NOW": "अभी कक्षा में हैं",
            "AVAILABLE IN CABIN": "केबिन में उपलब्ध हैं",
            "Live Status:": "वर्तमान स्थिति:",
            "Current Location:": "वर्तमान स्थान:",
            "Faculty Cabin:": "शिक्षक केबिन:",
            "Next Scheduled Class Today:": "आज की अगली कक्षा:",
            "Weekly Classes:": "साप्ताहिक कक्षाएँ:",
            "Contact:": "संपर्क:",
            "Department Name:": "विभाग का नाम:",
            "Department:": "विभाग:",
            "Head of Department (HOD):": "विभागाध्यक्ष (HOD):",
            "Approved Seat Intake (pdacek.ac.in):": "स्वीकृत सीटें (pdacek.ac.in):",
            "KCET Govt. Quota Fee:": "केसीईटी सरकारी कोटा शुल्क:",
            "COMEDK Merit Quota Fee:": "कॉमेडके मेरिट कोटा शुल्क:",
            "Management Quota Fee:": "मैनेजमेंट कोटा शुल्क:",
            "KCET Cutoff Rank:": "केसीईटी कट-ऑफ रैंक:",
            "Placement Package:": "प्लेसमेंट पैकेज:",
            "Top Recruiters:": "प्रमुख कंपनियाँ:",
            "Department Labs & Facilities:": "प्रयोगशालाएँ और सुविधाएँ:",
            "Key Highlights:": "मुख्य विशेषताएँ:",
            "Direct Contact:": "सीधा संपर्क:",
            "Scholarships & Financial Aid": "छात्रवृत्ति और वित्तीय सहायता",
            "Eligibility:": "पात्रता:",
            "Benefit Amount:": "लाभ राशि:",
            "Deadline:": "अंतिम तिथि:",
            "Required Documents:": "आवश्यक दस्तावेज़:",
            "Official Portal:": "आधिकारिक पोर्टल:",
            "Class Coordinator:": "कक्षा समन्वयक:",
            "Allocated Classroom:": "आवंटित कक्षा:",
            "Primary Lecture Hall:": "मुख्य व्याख्यान कक्ष:",
        }

        mapping = phrase_map_kn if lang == "kn" else phrase_map_hi
        new_lines = []
        for line in res.get("lines", []):
            t_line = line
            for eng_k, loc_v in mapping.items():
                if eng_k in t_line:
                    t_line = t_line.replace(eng_k, loc_v)
            new_lines.append(t_line)

        res["lines"] = new_lines
        res["reply"] = "\n".join(new_lines)
        return res


# Singleton instance
ml_engine = HybridMLSearchEngine()

