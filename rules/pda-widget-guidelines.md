---
trigger: always_on
description: UI theme, formatting, and data-honesty rules for the PDA Campus Assistant widget and backend.
---

# PDA Campus Assistant Guidelines

1. **Preserve Widget Theme & Logo**: Always keep the purple-and-gold theme (`#4c1d95`, `#311068`, `#f59e0b`) and official PDA College logo (`/static/pda_logo.png`) in `static/widget.js`. Reference HTML files are for data/menu structure only.
2. **No Duplicate Department Codes**: When displaying department titles, ensure the short form appears only once (e.g., `Artificial Intelligence & Machine Learning (AIML)`, never `... (AIML) (AIML)`).
3. **Coming Soon for Unpopulated Departments**: Only 1st Year and AIML currently have complete timetable and faculty data. Display `Coming Soon` for other departments until the user provides their data step-by-step.
4. **Faculty Bar & Timetable Display**: Show each faculty member with their department name (`Name — Dept`) and live time status on their bar, and display their live location and weekly timetable directly below their name when selected or queried via text.
