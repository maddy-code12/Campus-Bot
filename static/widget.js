(function () {
  if (window.PDACampusBotLoaded) return;
  window.PDACampusBotLoaded = true;

  let scriptOrigin = "";
  if (document.currentScript && document.currentScript.src) {
    try {
      const scriptUrl = new URL(document.currentScript.src);
      scriptOrigin = scriptUrl.origin;
    } catch (e) {}
  }
  const API_BASE = window.PDA_API_BASE || scriptOrigin || "http://127.0.0.1:8000";

  const D = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const P = [
    ["09:00", "10:00"],
    ["10:00", "11:00"],
    ["11:15", "12:15"],
    ["12:15", "13:15"],
    ["14:00", "15:00"],
    ["15:00", "16:00"],
    ["16:00", "17:00"],
  ];

  const DEPTS = [
    {
      name: "Computer Science & Engineering (CSE)",
      code: "CSE",
      aliases: ["cse", "computer science", "cs", "comp"],
      intake: 240,
      open: 33,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 250000,
      cut: 6500,
      comedk_cut: 14200,
      hod: "Dr. S. R. Patil",
      cabin: "CSE Block, 1st Floor, HOD Cabin 101",
      pkg: "₹5.8 LPA Avg (Highest: ₹18.5 LPA)",
      recruiters: "TCS Digital, Infosys, Wipro, Cognizant, Accenture, Capgemini, Amazon, Dell",
      labs: "Cloud Computing Lab, Cybersecurity Lab, DSA Lab, DBMS Lab, Full-Stack Web Lab, Center of Excellence (COE)",
    },
    {
      name: "Artificial Intelligence & ML (AIML)",
      code: "AIML",
      aliases: ["aiml", "ai & ml", "machine learning", "ml", "ai", "artificial intelligence"],
      intake: 120,
      open: 18,
      fee: 130956,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 250000,
      cut: 7800,
      comedk_cut: 16500,
      hod: "Dr. Basavaraj S. Mathapati",
      cabin: "AIML Dept, Zen AI Block, HOD Cabin",
      pkg: "₹6.2 LPA Avg (Highest: ₹18.5 LPA)",
      recruiters: "TCS Ninja & Digital, Infosys Specialist, Accenture AI, Cognizant, Wipro, Fractal Analytics",
      labs: "Zen AI Lab 1, Zen AI Lab 2 (NVIDIA GPU Cluster), Deep Learning & Vision Lab, NLP & Generative AI Lab",
    },
    {
      name: "Information Science & Engineering (ISE)",
      code: "ISE",
      aliases: ["ise", "information science", "is", "it"],
      intake: 60,
      open: 24,
      fee: 130956,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 200000,
      cut: 9000,
      comedk_cut: 18900,
      hod: "Dr. Ramesh Kulkarni",
      cabin: "ISE Block, 2nd Floor, HOD Cabin 201",
      pkg: "₹5.4 LPA Avg (Highest: ₹14.0 LPA)",
      recruiters: "Infosys, TCS, Wipro, LTIMindtree, Capgemini, Tech Mahindra, IBM",
      labs: "Distributed Systems Lab, Big Data & NoSQL Lab, Mobile App Dev Lab, DevOps & Testing Lab",
    },
    {
      name: "AI & Data Science (AI&DS)",
      code: "AI & Data Science",
      aliases: ["aids", "ai & ds", "data science", "ds", "ai & data science"],
      intake: 120,
      open: 16,
      fee: 130956,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 250000,
      cut: 8800,
      comedk_cut: 17800,
      hod: "Dr. Anand Ghuli",
      cabin: "AI & DS Block, Cabin 1",
      pkg: "₹5.6 LPA Avg (Highest: ₹15.0 LPA)",
      recruiters: "MuSigma, Tiger Analytics, TCS, Infosys, Accenture, Deloitte, Cognizant",
      labs: "Big Data Spark Lab, Predictive Modeling & Python/R Lab, BI & Tableau Lab, MLOps Lab",
    },
    {
      name: "Computer Science and Design (CSD)",
      code: "CS & Design",
      aliases: ["csd", "cs & design", "computer science and design", "design"],
      intake: 60,
      open: 19,
      fee: 130956,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 200000,
      cut: 9500,
      comedk_cut: 21000,
      hod: "Dr. Sanjeev Kumar",
      cabin: "CSD Block, Cabin 104",
      pkg: "₹5.2 LPA Avg (Highest: ₹12.5 LPA)",
      recruiters: "TCS Interactive, Infosys WongDoody, Wipro Design, Accenture Song, Zoho",
      labs: "UI/UX & HCI Studio, AR/VR & Game Dev Lab, Multimedia & Graphics Lab",
    },
    {
      name: "Electronics & Communication (ECE)",
      code: "ECE",
      aliases: ["ece", "electronics and communication", "ec"],
      intake: 180,
      open: 30,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 170000,
      cut: 30000,
      comedk_cut: 34000,
      hod: "Dr. Mahesh Biradar",
      cabin: "ECE Dept, Main Building, Cabin 1",
      pkg: "₹4.8 LPA Avg (Highest: ₹12.0 LPA)",
      recruiters: "Bosch, Texas Instruments, KPIT, Continental, TCS, Wipro VLSI, BEL",
      labs: "VLSI Cadence Design Center, Embedded IoT Lab, DSP Lab, Microwave & Antenna Lab",
    },
    {
      name: "Electrical & Electronics (EEE)",
      code: "EEE",
      aliases: ["eee", "electrical"],
      intake: 120,
      open: 22,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 216610,
      mgmt: 170000,
      cut: 36000,
      comedk_cut: 41000,
      hod: "Dr. B. K. Singh",
      cabin: "EEE Block, Ground Floor, HOD Cabin",
      pkg: "₹4.5 LPA Avg (Highest: ₹9.5 LPA)",
      recruiters: "ABB, Schneider Electric, Bosch Rexroth, L&T Electrical, Kirloskar, KPTCL/GESCOM",
      labs: "High Voltage Lab, Power Systems Simulation Lab, Power Electronics & EV Drives Lab, MB Bosch Centre",
    },
    {
      name: "Mechanical Engineering",
      code: "Mechanical",
      aliases: ["mech", "mechanical", "me"],
      intake: 120,
      open: 24,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 38000,
      comedk_cut: 45000,
      hod: "Dr. Shrishail Kakkeri",
      cabin: "Mechanical Block, Ground Floor, HOD Cabin",
      pkg: "₹4.4 LPA Avg (Highest: ₹9.0 LPA)",
      recruiters: "Mercedes-Benz, Bosch, Toyota Kirloskar, JSW Steel, L&T, UltraTech Cement, Tata Tech",
      labs: "CAD/CAM & ANSYS Lab, Modern CNC Machining Center, Thermal & IC Engines Lab, AICTE IDEA Lab",
    },
    {
      name: "Civil Engineering",
      code: "Civil",
      aliases: ["civil", "cv"],
      intake: 180,
      open: 21,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 42000,
      comedk_cut: 48000,
      hod: "Dr. Mallikarjun B.",
      cabin: "Civil Block, Main Building, HOD Cabin",
      pkg: "₹4.2 LPA Avg (Highest: ₹8.5 LPA)",
      recruiters: "L&T Construction, Shapoorji Pallonji, UltraTech Cement, ACC, Brigade Group, KPWD",
      labs: "Geotechnical Engg Lab, Concrete & Structural Testing Lab, Total Station GPS Surveying Lab, Environmental Lab",
    },
    {
      name: "Electronics & Instrumentation (EIE)",
      code: "Electronics & Instrumentation",
      aliases: ["eie", "instrumentation"],
      intake: 30,
      open: 15,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 45000,
      comedk_cut: 51000,
      hod: "Dr. V. S. Jamadar",
      cabin: "EIE Dept, Main Building, Cabin 108",
      pkg: "₹4.4 LPA Avg (Highest: ₹9.0 LPA)",
      recruiters: "Honeywell, Yokogawa, Emerson, Bosch, Siemens, ABB, L&T Automation",
      labs: "PLC & SCADA Automation Lab, Process Control Lab, Biomedical Instrumentation Lab, Sensors Lab",
    },
    {
      name: "Automobile Engineering",
      code: "Automobile",
      aliases: ["auto", "automobile"],
      intake: 30,
      open: 14,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 47000,
      comedk_cut: 53000,
      hod: "Dr. Suresh S.",
      cabin: "Automobile Block, HOD Cabin",
      pkg: "₹4.3 LPA Avg (Highest: ₹8.8 LPA)",
      recruiters: "Mahindra & Mahindra, Tata Motors, Ashok Leyland, Bosch Mobility, TVS Motor",
      labs: "Electric & Hybrid Vehicle (EV) Lab, Engine Testing & Diagnostics Lab, Chassis & Transmission Lab",
    },
    {
      name: "Industrial & Production (IPE)",
      code: "Industrial & Production",
      aliases: ["ipe", "industrial", "production"],
      intake: 60,
      open: 26,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 52000,
      comedk_cut: 56000,
      hod: "Dr. Ravindra Patil",
      cabin: "MB IP01 Block, HOD Cabin",
      pkg: "₹4.2 LPA Avg (Highest: ₹8.2 LPA)",
      recruiters: "Toyota, Bosch, JSW, Flipkart Supply Chain, L&T, Godrej",
      labs: "Operations Research & ERP Lab, Ergonomics Lab, Six Sigma Quality Lab, Advanced Manufacturing Lab",
    },
    {
      name: "Ceramic & Cement Technology (CCT)",
      code: "Ceramic & Cement",
      aliases: ["cct", "ceramic", "cement"],
      intake: 30,
      open: 15,
      fee: 67866,
      fee_unaided: 130956,
      comedk: 110610,
      mgmt: 140000,
      cut: 60000,
      comedk_cut: 62000,
      hod: "Dr. S. B. Patil",
      cabin: "CCT Block, MB IP11, HOD Cabin",
      pkg: "₹4.6 LPA Avg (Near 100% Core Cement Placement)",
      recruiters: "UltraTech Cement, Shree Cement, Dalmia Cement, ACC, Ambuja, Orient Cement, Saint-Gobain",
      labs: "Cement Kiln & Pyro-Processing Lab, Refractories & Glass Tech Lab, X-Ray Characterization Lab",
    },
  ];

  const SCH = ["2021 scheme", "2022 scheme", "2025 scheme"];
  const SEMS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // ─── 1st Year (B.E Sem 1, w.e.f. 07.09.2026) Section-wise Timetable Data ───
  const FY_DATA = {
    A: { stream:"CSE (ACS01-ACS64)", dept:"Computer Science & Engineering", room:"FB LH01",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. A G Hiremath",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Triveni",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Sarita M",fdept:"Mechanical"},
        {code:"KKXXX104X",title:"Engineering Science Courses - I",faculty:"Respective Dept.",fdept:"Respective Dept"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Dr. Radha B K",fdept:"CSE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Vijalaxmi T",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Shrassa",fdept:"Respective Dept"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["PHY Lab A1/POC Lab A2","PHY Lab A1/POC Lab A2","Maths","Soft Skills","ESC-1","Prog in C","Library"],
        Tue:["PHY Lab A2/POC Lab A1","PHY Lab A2/POC Lab A1","CAED","CAED","ESC-1","COE","COE"],
        Wed:["Maths Lab A","Maths Lab A","Physics","Prog in C","ESC-1","–","–"],
        Thu:["Physics","Maths","CAED Lab","CAED Lab","Library","–","–"],
        Fri:["Prog in C","Physics","IDT-FBLH01","IDT-FBLH01","Library","–","–"],
        Sat:["Maths","Kannada","COE","COE","–","–","–"]}},
    B: { stream:"CSE (BCS01-BCS64)", dept:"Computer Science & Engineering", room:"FB LH02",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. Gopichand T P",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Bhoodevi",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Dr. Prashant H",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Prof. Revati Soma",fdept:"CSE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Mahananda H",fdept:"CSE"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Maths","Physics","IDT-FBLH03","IDT-FBLH03","ESC-1","COE","COE"],
        Tue:["Prog in C","Maths","COE","COE","ESC-1","Library","–"],
        Wed:["PHY Lab B1/POC Lab B2","PHY Lab B1/POC Lab B2","CAED","CAED","ESC-1","–","–"],
        Thu:["PHY Lab B2/POC Lab B1","PHY Lab B2/POC Lab B1","Maths","Kannada","Prog in C","–","–"],
        Fri:["Maths Lab B","Maths Lab B","Physics","Prog in C","Library","–","–"],
        Sat:["CAED Lab","CAED Lab","Physics","Soft Skills","–","–","–"]}},
    C: { stream:"CSE (CCS01-CCS64)", dept:"Computer Science & Engineering", room:"FB LH02/LH01",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. Veena M",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Bhoodevi",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Yohan R",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Dr. Jayashree A",fdept:"CSE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Savitri S",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Shivani",fdept:"CSE"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Maths Lab C","Maths Lab C","Physics","Prog in C","ESC-1","Maths","–"],
        Tue:["Physics-FBLH01","Maths-FBLH01","Prog in C-FBLH02","Soft Skills-FBLH02","ESC-1","–","–"],
        Wed:["CAED Lab","CAED Lab","Library","Library","ESC-1","IDT-FBLH02","IDT-FBLH02"],
        Thu:["Maths-FBLH02","Kannada-FBLH02","Prog in C-FBLH01","Physics-FBLH01","Library","COE","COE"],
        Fri:["PHY Lab C1/POC Lab C2","PHY Lab C1/POC Lab C2","COE","COE","Library","–","–"],
        Sat:["PHY Lab C2/POC Lab C1","PHY Lab C2/POC Lab C1","CAED","CAED","–","–","–"]}},
    D: { stream:"CSE (DCS01-DCS64)", dept:"Computer Science & Engineering", room:"FBLH03",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. S B Malipatil",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Dr. Satish Lathure",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Dr. V G Biradar",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Prof. Pooja B",fdept:"CSE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Vijaylaxmi T",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Priyanka N",fdept:"CSE"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Maths","Kannada","PHY Lab D1/POC Lab D2","PHY Lab D1/POC Lab D2","ESC-1","–","–"],
        Tue:["COE","COE","PHY Lab D2/POC Lab D1","PHY Lab D2/POC Lab D1","ESC-1","Library","–"],
        Wed:["Prog in C","Physics","Maths Lab D","Maths Lab D","ESC-1","–","–"],
        Thu:["Maths","Prog in C","COE","COE","Library","IDT-FBLH03","IDT-FBLH03"],
        Fri:["Physics","Maths","CAED Lab","CAED Lab","Prog in C","–","–"],
        Sat:["Physics","Soft Skills","CAED","CAED","–","–","–"]}},
    E: { stream:"CSD (ECG01-ECG42) & CSE (ECS01-09)", dept:"CS & Design / CSE", room:"FBLH06",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. M S Patil",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Triveni",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Eshwar U",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Prof. Mahananda H",fdept:"CSE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Anand D Patil",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Revati Soma",fdept:"CSE"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Maths","Soft Skills","CAED Lab","CAED Lab","ESC-1","–","–"],
        Tue:["Prog in C","Maths","Physics","Kannada","ESC-1","COE","COE"],
        Wed:["Prog in C","Physics","PHY Lab E1/POC Lab E2","PHY Lab E1/POC Lab E2","ESC-1","–","–"],
        Thu:["COE","COE","PHY Lab E2/POC Lab E1","PHY Lab E2/POC Lab E1","Library","–","–"],
        Fri:["Physics","Maths","Maths Lab E","Maths Lab E","Library","IDT-FBLH06","IDT-FBLH06"],
        Sat:["CAED","CAED","Prog in C","Library","–","–","–"]}},
    F: { stream:"ISE (FIS01-FIS50)", dept:"Information Science & Engineering", room:"FB LH01/LH03/LH02/LH06",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Prof. Rajeshwari B",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Manjunath Malipatil",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Sarita M",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Dr. Priyadarshini P",fdept:"ISE"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Anand D Patil",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Neha",fdept:"ISE"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["CAED","CAED","Maths Lab F","Maths Lab F","ESC-1","IDT-FBLH07","IDT-FBLH07"],
        Tue:["Physics","Kannada","Prog in C","Library","ESC-1","–","–"],
        Wed:["Soft Skills","Prog in C","CAED Lab","CAED Lab","ESC-1","–","–"],
        Thu:["Maths","Prog in C","COE","COE","Library","–","–"],
        Fri:["Maths","Physics","PHY Lab F1/POC Lab F2","PHY Lab F1/POC Lab F2","Library","COE","COE"],
        Sat:["Physics","Maths","PHY Lab F2/POC Lab F1","PHY Lab F2/POC Lab F1","–","–","–"]}},
    G: { stream:"AI&ML (GAI01-GAI60)", dept:"Artificial Intelligence & Machine Learning", room:"FB LH07",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. Umadevi R Devani",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Dr. Satish Lathure",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Dr. Prashant H",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Prof. Ashwini H",fdept:"AIML"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Sonali",fdept:"AIML"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Library","Library","CAED","CAED","ESC-1","PHY Lab G1/POC Lab G2","PHY Lab G1/POC Lab G2"],
        Tue:["COE","COE","IDT","IDT","ESC-1","PHY Lab G2/POC Lab G1","PHY Lab G2/POC Lab G1"],
        Wed:["Prog in C","Maths","Physics","Kannada","ESC-1","Maths Lab G","Maths Lab G"],
        Thu:["CAED Lab","CAED Lab","Physics","Maths","Library","–","–"],
        Fri:["Soft Skills","Prog in C","COE","COE","Library","–","–"],
        Sat:["Maths","Prog in C","Physics","Library","–","–","–"]}},
    H: { stream:"AI&ML (HAI01-HAI49)", dept:"Artificial Intelligence & Machine Learning", room:"FB LH08",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. Suvarna H",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Siddaling B",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Shivakumar Patil",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Prof. Chandrakant Biradar",fdept:"AIML"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Savitri S",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Sonali",fdept:"AIML"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["Physics","Prog in C","Soft Skills","Library","ESC-1","Maths Lab H","Maths Lab H"],
        Tue:["CAED","CAED","Maths","Prog in C","ESC-1","IDT-FBLH08","IDT-FBLH08"],
        Wed:["Prog in C","Maths","COE","COE","ESC-1","–","–"],
        Thu:["Physics","Maths","Library","Library","PHY Lab H1/POC Lab H2","PHY Lab H1/POC Lab H2","–"],
        Fri:["Kannada","Physics","Library","Library","–","PHY Lab H2/POC Lab H1","PHY Lab H2/POC Lab H1"],
        Sat:["COE","COE","CAED Lab","CAED Lab","–","–","–"]}},
    I: { stream:"AI&DS (IAD01-IAD45), CSE", dept:"AI & Data Science / CSE", room:"FB LH06 & 07 / FB LH08",
      faculties:[
        {code:"CSMAT101",title:"Calculus and Linear Algebra",faculty:"Dr. S A Adky",fdept:"Maths"},
        {code:"CSPHY102",title:"Quantum Physics & Applications",faculty:"Prof. Manjunath Malipatil",fdept:"Physics"},
        {code:"CSCED103",title:"Computer Aided Engg. Drawing",faculty:"Prof. Sanket Kalashetty",fdept:"Mechanical"},
        {code:"CSPOC105",title:"Programming in C",faculty:"Dr. Shridevi Soma",fdept:"AIDS"},
        {code:"KKSSC106",title:"Soft Skills",faculty:"Prof. Savitri S",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Nagalaxmi",fdept:"AIDS"},
        {code:"KKSSK/KBK109",title:"Samskritika / Balake Kannada",faculty:"Dr. Sujatha Patil",fdept:"Humanities"},
      ],
      schedule:{Mon:["CAED-FBLH07","CAED-FBLH07","Maths-FBLH06","Kannada-FBLH06","ESC-1","–","–"],
        Tue:["CAED Lab","CAED Lab","Physics","Prog in C","ESC-1","–","–"],
        Wed:["COE","COE","Maths","Library","ESC-1","PHY Lab I1/POC Lab I2","PHY Lab I1/POC Lab I2"],
        Thu:["Maths-FBLH07","Soft Skills-FBLH07","Physics-FBLH08","Prog in C-FBLH08","–","PHY Lab I2/POC Lab I1","PHY Lab I2/POC Lab I1"],
        Fri:["COE","COE","Library","Library","–","Maths Lab I","Maths Lab I"],
        Sat:["Prog in C","Physics","IDT-FBLH08","IDT-FBLH08","–","–","–"]}},
    J: { stream:"E&CE (JEC01-JEC68)", dept:"Electronics & Communication Engg.", room:"MB LH54",
      faculties:[
        {code:"EEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Dr. Veena M",fdept:"Maths"},
        {code:"EECHE102",title:"Applied Chemistry for Futuristic Devices",faculty:"Prof. Geetanjali Devani",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Priyanka D",fdept:"ECE"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Neha",fdept:"ECE"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Dr. Geeta Hanji",fdept:"ECE"},
      ],
      schedule:{Mon:["Chemistry","Intro to C","Intro to AI","Maths","ESC-1","COE","COE"],
        Tue:["CHE Lab J1/ICP Lab J2","CHE Lab J1/ICP Lab J2","Intro to AI","Intro to C","ESC-1","–","–"],
        Wed:["CHE Lab J2/ICP Lab J1","CHE Lab J2/ICP Lab J1","IDT-FBLH03","IDT-FBLH03","ESC-1","–","–"],
        Thu:["Comm Skills","Chemistry","Maths","IC&PE","Library","Maths Lab J","Maths Lab J"],
        Fri:["Maths","Intro to AI","Intro to C","Chemistry","Library","–","–"],
        Sat:["COE","COE","Library","Library","–","–","–"]}},
    K: { stream:"E&CE (KEC01-KEC68)", dept:"Electronics & Communication Engg.", room:"MB LH55",
      faculties:[
        {code:"EEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Dr. Umadevi R Devani",fdept:"Maths"},
        {code:"EECHE102",title:"Applied Chemistry for Futuristic Devices",faculty:"Prof. Jyoti Laxmi",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Shushmita",fdept:"ECE"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Pooja B",fdept:"ECE"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Dr. Shambuling Patil",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Anand D Patil",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. C D Bogale",fdept:"ECE"},
      ],
      schedule:{Mon:["Chemistry","Intro to C","Maths","Intro to AI","ESC-1","–","–"],
        Tue:["Maths Lab K","Maths Lab K","Intro to C","Comm Skills","ESC-1","–","–"],
        Wed:["IDT-FBLH01","IDT-FBLH01","Maths","IC&PE","ESC-1","COE","COE"],
        Thu:["Maths","Chemistry","Intro to AI","Intro to C","Library","–","–"],
        Fri:["CHE Lab K1/ICP Lab K2","CHE Lab K1/ICP Lab K2","COE","COE","Library","–","–"],
        Sat:["CHE Lab K2/ICP Lab K1","CHE Lab K2/ICP Lab K1","Chemistry","Intro to AI","–","–","–"]}},
    L: { stream:"E&CE, EIE, EEE (LEC, LEI, LEE)", dept:"ECE / EIE / EEE", room:"MB IP01 / MB LH55 / MB LH54",
      faculties:[
        {code:"EEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Dr. Suvarna H",fdept:"Maths"},
        {code:"EECHE102",title:"Applied Chemistry for Futuristic Devices",faculty:"Dr. R S Malipatil",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Megha Upase",fdept:"ECE"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Sushmita",fdept:"ECE"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Vijayalaxmi T",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Savitri",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Renuka Hatti",fdept:"ECE"},
      ],
      schedule:{Mon:["COE","COE","Chemistry","Intro to AI","ESC-1","Library","–"],
        Tue:["Maths","Intro to AI","CHE Lab L1/ICP Lab L2","CHE Lab L1/ICP Lab L2","ESC-1","–","–"],
        Wed:["Intro to C","Chemistry","CHE Lab L2/ICP Lab L1","CHE Lab L2/ICP Lab L1","ESC-1","–","–"],
        Thu:["Maths Lab L","Maths Lab L","IDT-FBLH03","IDT-FBLH03","Intro to AI","–","–"],
        Fri:["COE","COE","Intro to C","Maths","Chemistry","–","–"],
        Sat:["IC&PE","Intro to C","Maths","Comm Skills","–","–","–"]}},
    M: { stream:"EEE (MEE01-MEE68)", dept:"Electrical & Electronics Engg.", room:"MB Bosch Centre",
      faculties:[
        {code:"EEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Dr. M S Patil",fdept:"Maths"},
        {code:"EECHE102",title:"Applied Chemistry for Futuristic Devices",faculty:"Dr. Anand P Patil",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Akshay Aspalli",fdept:"EEE"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Poorvika H",fdept:"EEE"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Vijayalaxmi T",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Savitri",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Priya Patil",fdept:"EEE"},
      ],
      schedule:{Mon:["Intro to AI","Chemistry","Maths","Intro to C","ESC-1","–","–"],
        Tue:["Intro to AI","Comm Skills","Chemistry","Maths","ESC-1","–","–"],
        Wed:["Intro to C","Maths","COE","COE","ESC-1","–","–"],
        Thu:["Intro to C","Intro to AI","Maths Lab M","Maths Lab M","Library","COE","COE"],
        Fri:["Chemistry","IC&PE","CHE Lab M1/ICP Lab M2","CHE Lab M1/ICP Lab M2","Library","–","–"],
        Sat:["IDT Lab-MBLH55","IDT Lab-MBLH55","CHE Lab M2/ICP Lab M1","CHE Lab M2/ICP Lab M1","–","–","–"]}},
    N: { stream:"Civil Engg. (NCV01-52)", dept:"Civil Engineering", room:"MB IP01",
      faculties:[
        {code:"CVMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Prof. Rajeshwari B",fdept:"Maths"},
        {code:"CVCHE102",title:"Applied Chemistry for Sustainable Built Env.",faculty:"Prof. Geetanjali Devani",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Deepti Patil",fdept:"Civil"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Mahananda H",fdept:"Civil"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Vinit Patil",fdept:"Civil"},
      ],
      schedule:{Mon:["CHE Lab N1/ICP Lab N2","CHE Lab N1/ICP Lab N2","COE","COE","ESC-1","–","–"],
        Tue:["IDT Lab-MBLH54","IDT Lab-MBLH54","Intro to C","Maths","ESC-1","Maths Lab N","Maths Lab N"],
        Wed:["Intro to AI","Chemistry","Maths","Comm Skills","ESC-1","COE","COE"],
        Thu:["CHE Lab N2/ICP Lab N1","CHE Lab N2/ICP Lab N1","Intro to C","Intro to AI","Library","–","–"],
        Fri:["Chemistry","Intro to AI","Library","Library","Library","–","–"],
        Sat:["Intro to C","IC&PE","Maths","Chemistry","–","–","–"]}},
    O: { stream:"Civil Engg. (OCV01-OCV52)", dept:"Civil Engineering", room:"MB IP01/MB LH54/MB LH55",
      faculties:[
        {code:"CVMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Dr. S A Adky",fdept:"Maths"},
        {code:"CVCHE102",title:"Applied Chemistry for Sustainable Built Env.",faculty:"Prof. Jyoti Laxmi",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Sharnkumar Huli",fdept:"Civil"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Priyanka",fdept:"Civil"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Savitri S",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Anand D Patil",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Hanmanth Rao",fdept:"Civil"},
      ],
      schedule:{Mon:["Maths","Intro to AI","CHE Lab O1/ICP Lab O2","CHE Lab O1/ICP Lab O2","ESC-1","–","–"],
        Tue:["Chemistry","Maths","Maths Lab F","Maths Lab F","ESC-1","COE","COE"],
        Wed:["Intro to C","Chemistry","COE","COE","ESC-1","Library","–"],
        Thu:["IDT Lab-MB IP01","IDT Lab-MB IP01","CHE Lab O2/ICP Lab O1","CHE Lab O2/ICP Lab O1","Library","–","–"],
        Fri:["Intro to C","Chemistry","Maths","Intro to AI","Library","–","–"],
        Sat:["IC&PE","Intro to AI","Comm Skills","Intro to C","–","–","–"]}},
    P: { stream:"Civil & CCT (PCV01-PCV20, PCC01-PCC27)", dept:"Civil & Ceramic Cement Technology", room:"MB IP11",
      faculties:[
        {code:"CVMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Prof. Laxmi Patil",fdept:"Maths"},
        {code:"CVCHE102",title:"Applied Chemistry for Sustainable Built Env.",faculty:"Dr. Anand P Patil",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Sonali",fdept:"Civil"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Rekha Patil",fdept:"Civil"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Vijayalaxmi T",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Vijayalaxmi T",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Deesha Patil",fdept:"Civil"},
      ],
      schedule:{Mon:["Maths","Intro to C","COE","COE","ESC-1","CHE Lab P1/ICP Lab P2","CHE Lab P1/ICP Lab P2"],
        Tue:["Intro to C","Chemistry","Maths","Intro to AI","ESC-1","CHE Lab P2/ICP Lab P1","CHE Lab P2/ICP Lab P1"],
        Wed:["Chemistry","Comm Skills","Intro to AI","IC&PE","ESC-1","Library","–"],
        Thu:["COE","COE","Chemistry","Intro to AI","Library","–","–"],
        Fri:["Library","Library","Maths","Intro to C","IDT Lab","IDT Lab","–"],
        Sat:["Maths Lab P","Maths Lab P","Library","Library","–","–","–"]}},
    Q: { stream:"Mechanical Engg. (QME01-QME50)", dept:"Mechanical Engineering", room:"FB LH04",
      faculties:[
        {code:"MEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Prof. Ravi S",fdept:"Maths"},
        {code:"MECHE102",title:"Applied Chemistry for Metal Protection & Sustainable Energy",faculty:"Dr. Vijay Hiremath",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Sonali",fdept:"Mech"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Dr. Sharanabasappa Gandge",fdept:"Mech"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Anand D Patil",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Chandra Reddy",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Shubham C",fdept:"Mech"},
      ],
      schedule:{Mon:["IDT-FBLH04","IDT-FBLH04","Chemistry","Intro to AI","ESC-1","COE","COE"],
        Tue:["Library","Library","Intro to C","Maths","ESC-1","–","–"],
        Wed:["Intro to C","IC&PE","Chemistry","Intro to AI","ESC-1","–","–"],
        Thu:["Chemistry","Comm Skills","Maths","CHE Lab Q1/ICP Lab Q2","CHE Lab Q1/ICP Lab Q2","–","–"],
        Fri:["Intro to AI","Intro to C","Maths","CHE Lab Q2/ICP Lab Q1","CHE Lab Q2/ICP Lab Q1","–","–"],
        Sat:["COE","COE","Maths Lab Q","Maths Lab Q","–","–","–"]}},
    R: { stream:"Mechanical & I&PE (RME01-41, RIP01-06)", dept:"Mechanical & Industrial Production", room:"FB LH04/FB LH08/MB IP11/FB LH06",
      faculties:[
        {code:"MEMAT101",title:"Differential Calculus & Linear Algebra",faculty:"Prof. Sangeeta P",fdept:"Maths"},
        {code:"MECHE102",title:"Applied Chemistry for Metal Protection & Sustainable Energy",faculty:"Dr. R S Malipatil",fdept:"Chemistry"},
        {code:"KKAIA103",title:"Introduction to AI & Applications",faculty:"Prof. Priyanka D",fdept:"Mech"},
        {code:"KKICP105A",title:"Introduction to C",faculty:"Prof. Revati Soma",fdept:"Mech"},
        {code:"KKENG106",title:"Communication Skills",faculty:"Prof. Vijayalaxmi T",fdept:"Humanities"},
        {code:"KKICO107",title:"Indian Constitution & Professional Ethics",faculty:"Prof. Savitri S",fdept:"Humanities"},
        {code:"KKIDT158",title:"Innovation & Design Thinking Lab",faculty:"Prof. Shubham C",fdept:"Mech"},
      ],
      schedule:{Mon:["Maths","IC&PE","Library","Library","ESC-1","COE","COE"],
        Tue:["Chemistry","Intro to C","Library","Library","ESC-1","–","–"],
        Wed:["COE","COE","Maths","Intro to C","ESC-1","CHE Lab R1/ICP Lab R2","CHE Lab R1/ICP Lab R2"],
        Thu:["Maths-MB IP11","Comm Skills-MB IP11","Chemistry-FBLH06","Intro to AI-FBLH06","CHE Lab R2/ICP Lab R1","CHE Lab R2/ICP Lab R1","–"],
        Fri:["IDT Lab-MB IP11","IDT Lab-MB IP11","Library","Intro to AI","Maths Lab R","Maths Lab R","–"],
        Sat:["Intro to C","Chemistry","Intro to AI","Library","–","–","–"]}},
  };

  const FY_ESC = [
    {code:"KKBSM104A",title:"Building Sciences & Mechanics",batches:[
      {batch:"B1",faculty:"Dr. Shruti G",room:"FBLH01"},{batch:"B2",faculty:"Prof. Rajashree C",room:"FBLH02"},
      {batch:"B3",faculty:"Dr. Sharanbasav P",room:"FBLH03"},{batch:"B4",faculty:"Prof. Rahul Patil",room:"FBLH04"}]},
    {code:"KKIEE104B",title:"Introduction to Electrical Engineering",batches:[
      {batch:"B1",faculty:"Prof. Akash Patil",room:"FBLH06"},{batch:"B2",faculty:"Prof. Gopinath Harsha",room:"FBLH07"},
      {batch:"B3",faculty:"Prof. Mahadevi S N",room:"FBLH08"},{batch:"B4",faculty:"Prof. Megha Upase",room:"EEE Dept."}]},
    {code:"KKIEC104C",title:"Introduction to Electronics & Communication",batches:[
      {batch:"B1",faculty:"Prof. Seema Deshmukh",room:"LH15"},{batch:"B2",faculty:"Prof. Veena Saraf",room:"LH16"},
      {batch:"B3",faculty:"Prof. C D Bogale",room:"LH17"},{batch:"B4",faculty:"Dr. Juhi Nishant Ansari",room:"LH18"}]},
    {code:"KKIME104D",title:"Introduction to Mechanical Engineering",batches:[
      {batch:"B1",faculty:"Dr. C H Biradar",room:"MBLH54"},{batch:"B2",faculty:"Prof. Shivakumar Patil",room:"MBLH55"},
      {batch:"B3",faculty:"Prof. Mallikarjun Bijapur",room:"MBIP11"},{batch:"B4",faculty:"Prof. Sarita M",room:"MBIP01"}]},
    {code:"KKEIT104E",title:"Essentials of Information Technology",batches:[
      {batch:"B1",faculty:"Prof. Neha",room:"CSE Dept."},{batch:"B2",faculty:"Prof. Spoorti",room:"CSE Dept."},
      {batch:"B3",faculty:"Prof. Shivani",room:"CSE Dept."},{batch:"B4",faculty:"Prof. Siddaram S",room:"CSE Dept."}]},
  ];

  // Official AIML Department Faculty Directory & Weekly Timetables (Available data)
  const T = [
    {
      n: "Dr. Basavaraj S. Mathapati",
      a: ["ಬಸವರಾಜ್", "बसवराज", "ಮಠಪತಿ", "मठपति", "mathapati", "mathpati", "basavaraj", "dr. basavaraj m"],
      d: "AIML",
      cab: "AIML Dept, Zen AI Block, HOD Cabin",
      s: {
        Mon: { 0: ["5th Sem AIML-A (DSA)", "LH-15"], 2: ["5th Sem AIML-B (HCI)", "LH-16"] },
        Tue: { 0: ["5th Sem AIML-A (DSA)", "LH-15"] },
        Wed: { 0: ["5th Sem AIML-A (DSA)", "LH-15"] },
        Thu: { 0: ["5th Sem AIML-B (HCI)", "LH-16"] },
        Fri: { 0: ["5th Sem AIML-B (HCI)", "LH-16"] },
        Sat: { 1: ["5th Sem AIML-A (DSA)", "LH-15"] },
      },
    },
    {
      n: "Dr. Nandini P",
      a: ["ನಂದಿನಿ", "नंदिनी", "nandini"],
      d: "AIML",
      cab: "AIML Dept, Senior Faculty Cabin",
      s: {
        Tue: { 4: ["5th Sem AIML-B (PML)", "LH-16"] },
        Wed: { 3: ["5th Sem AIML-B (PML)", "LH-16"] },
        Thu: { 5: ["5th Sem AIML-B (PML)", "LH-16"] },
        Fri: { 1: ["5th Sem AIML-B (PML)", "LH-16"] },
        Sat: { 0: ["3rd Sem AIML-A (CP)", "LH-09"], 1: ["3rd Sem AIML-A (CP)", "LH-09"] },
      },
    },
    {
      n: "Prof. Rajashekhar B",
      a: ["ರಾಜಶೇಖರ್", "राजशेखर", "rajashekhar", "rajshekhar", "rajshekhar p"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 0: ["3rd Sem AIML-A (OOP Lab B1)", "AIML Lab"], 1: ["3rd Sem AIML-A (OOP Lab B1)", "AIML Lab"], 3: ["3rd Sem AIML-A (OOP Java)", "LH-09"] },
        Tue: { 3: ["3rd Sem AIML-A (OOP Java)", "LH-09"] },
        Thu: { 0: ["3rd Sem AIML-A (OOP Java)", "LH-09"], 4: ["3rd Sem AIML-A (OOP Lab B2)", "AIML Lab"], 5: ["3rd Sem AIML-A (OOP Lab B2)", "AIML Lab"] },
      },
    },
    {
      n: "Prof. Priyanka Devani",
      a: ["ಪ್ರಿಯಾಂಕಾ", "प्रियंका", "priyanka", "devani", "priyanka d"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 4: ["5th Sem AIML-A (AIML Lab B1)", "AIML Lab"], 5: ["5th Sem AIML-A (AIML Lab B1)", "AIML Lab"] },
        Tue: { 4: ["5th Sem AIML-A (AIML Lab B2)", "AIML Lab"], 5: ["5th Sem AIML-A (AIML Lab B2)", "AIML Lab"] },
      },
    },
    {
      n: "Prof. Sowmya Gaitond",
      a: ["ಸೌಮ್ಯ", "सौम्या", "sowmya", "gaitond", "sowmya g"],
      d: "AIML",
      cab: "AIML Dept, Cabin (3rd Sem Sec-B Class Coordinator)",
      s: {
        Mon: { 4: ["3rd Sem AIML-B (OS)", "LH-09"] },
        Tue: { 3: ["3rd Sem AIML-B (OS)", "LH-15"] },
        Thu: { 4: ["3rd Sem AIML-B (AEC DVP)", "AIML Lab"], 5: ["3rd Sem AIML-B (AEC DVP)", "AIML Lab"] },
        Fri: { 4: ["3rd Sem AIML-B (OS)", "LH-16"] },
      },
    },
    {
      n: "Prof. Mallinath Swamy",
      a: ["ಮಲ್ಲಿನಾಥ್", "मल्लिनाथ", "mallinath", "swamy", "mallinath s"],
      d: "AIML",
      cab: "AIML Dept, Cabin (5th Sem Sec-A Class Coordinator)",
      s: {
        Mon: { 3: ["5th Sem AIML-A (PML)", "LH-15"] },
        Thu: { 4: ["5th Sem AIML-A (PML)", "LH-15"] },
        Fri: { 1: ["5th Sem AIML-A (PML)", "LH-15"] },
        Sat: { 0: ["5th Sem AIML-A (PML)", "LH-15"] },
      },
    },
    {
      n: "Dr. Kaveri Kori",
      a: ["ಕಾವೇರಿ", "कावेरी", "kaveri", "kori", "kaveri k"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Wed: { 2: ["3rd Sem AIML-A (AEC DVP)", "AIML Lab"], 3: ["3rd Sem AIML-A (AEC DVP)", "AIML Lab"], 4: ["5th Sem AIML-A (RMIPR)", "LH-15"] },
        Fri: { 4: ["5th Sem AIML-A (RMIPR)", "LH-15"] },
        Sat: { 2: ["5th Sem AIML-A (RMIPR)", "LH-15"] },
      },
    },
    {
      n: "Prof. Ashwini Hatti",
      a: ["ಅಶ್ವಿನಿ", "अश्विनी", "ashwini", "aswini", "hatti", "ashwini h"],
      d: "AIML",
      cab: "AIML Dept, Cabin (3rd Sem Sec-A Class Coordinator)",
      s: {
        Mon: { 1: ["3rd Sem AIML-B (DSC)", "LH-09"] },
        Tue: { 0: ["3rd Sem AIML-B (DSC)", "LH-09"] },
        Wed: { 0: ["1st Sem AIML-G (Prog in C)", "FB LH07"] },
        Thu: { 2: ["3rd Sem AIML-B (DSC)", "LH-15"] },
        Fri: { 1: ["1st Sem AIML-G (Prog in C)", "FB LH07"] },
        Sat: { 1: ["1st Sem AIML-G (Prog in C)", "FB LH07"] },
      },
    },
    {
      n: "Prof. Sonali M",
      a: ["ಸೋನಾಲಿ", "सोनाली", "sonali"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 0: ["3rd Sem AIML-B (DSDO)", "LH-09"], 1: ["5th Sem AIML-B (Mini-Proj B1)", "AIML Lab"] },
        Tue: { 0: ["5th Sem AIML-B (Mini-Proj B2)", "AIML Lab"], 1: ["5th Sem AIML-B (Mini-Proj B2)", "AIML Lab"] },
        Wed: { 0: ["3rd Sem AIML-B (DSDO Lab B1)", "AIML Lab"], 1: ["3rd Sem AIML-B (DSDO Lab B1)", "AIML Lab"] },
        Thu: { 3: ["3rd Sem AIML-B (DSDO)", "LH-15"] },
        Fri: { 2: ["3rd Sem AIML-B (DSDO Lab B2)", "AIML Lab"], 3: ["3rd Sem AIML-B (DSDO Lab B2)", "AIML Lab"], 5: ["3rd Sem AIML-B (DSDO)", "LH-16"] },
      },
    },
    {
      n: "Prof. Neha A",
      a: ["ನೇಹಾ", "नेहा", "neha"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 0: ["3rd Sem AIML-A (DSC Lab B2)", "AIML Lab"], 1: ["3rd Sem AIML-A (DSC Lab B2)", "AIML Lab"], 2: ["3rd Sem AIML-A (DSC)", "LH-09"] },
        Tue: { 0: ["3rd Sem AIML-A (DSC Lab B1)", "AIML Lab"], 1: ["3rd Sem AIML-A (DSC Lab B1)", "AIML Lab"] },
        Wed: { 3: ["5th Sem AIML-A (HCI)", "LH-15"], 4: ["3rd Sem AIML-A (DSC)", "LH-09"] },
        Thu: { 3: ["3rd Sem AIML-A (DSC)", "LH-09"], 5: ["5th Sem AIML-A (HCI)", "LH-15"] },
        Fri: { 0: ["5th Sem AIML-A (HCI)", "LH-15"] },
      },
    },
    {
      n: "Prof. Savitha P",
      a: ["ಸವಿತಾ", "सविता", "savitha", "savita"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 2: ["3rd Sem AIML-B (DSC Lab B1)", "AIML Lab"], 3: ["3rd Sem AIML-B (DSC Lab B1)", "AIML Lab"] },
        Tue: { 4: ["3rd Sem AIML-A (OS)", "LH-09"] },
        Wed: { 0: ["3rd Sem AIML-B (DSC Lab B2)", "AIML Lab"], 1: ["3rd Sem AIML-B (DSC Lab B2)", "AIML Lab"] },
        Thu: { 1: ["3rd Sem AIML-A (OS)", "LH-09"] },
        Fri: { 1: ["3rd Sem AIML-A (OS)", "LH-09"] },
      },
    },
    {
      n: "Prof. Laxmi J",
      a: ["ಲಕ್ಷ್ಮಿ", "लक्ष्मी", "laxmi", "lakshmi"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 5: ["5th Sem AIML-B (RMIPR)", "LH-16"] },
        Tue: { 0: ["3rd Sem AIML-A (DSDO Lab B2)", "AIML Lab"], 1: ["3rd Sem AIML-A (DSDO Lab B2)", "AIML Lab"], 2: ["5th Sem AIML-A (Mini-Proj B2)", "AIML Lab"], 3: ["5th Sem AIML-A (Mini-Proj B2)", "AIML Lab"], 5: ["3rd Sem AIML-A (DSDO)", "LH-09"] },
        Wed: { 1: ["3rd Sem AIML-A (DSDO)", "LH-09"] },
        Thu: { 2: ["5th Sem AIML-A (Mini-Proj B1)", "AIML Lab"], 3: ["5th Sem AIML-A (Mini-Proj B1)", "AIML Lab"], 4: ["3rd Sem AIML-A (DSDO Lab B1)", "AIML Lab"], 5: ["3rd Sem AIML-A (DSDO Lab B1)", "AIML Lab"] },
        Fri: { 0: ["3rd Sem AIML-A (DSDO)", "LH-09"], 2: ["5th Sem AIML-B (RMIPR)", "LH-16"] },
        Sat: { 1: ["5th Sem AIML-B (RMIPR)", "LH-16"] },
      },
    },
    {
      n: "Prof. Santoshi P",
      a: ["ಸಂತೋಷಿ", "संतोषी", "santoshi"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 1: ["5th Sem AIML-A (DBMS)", "LH-15"], 4: ["5th Sem AIML-A (DBMS Lab B2)", "DBMS Lab"], 5: ["5th Sem AIML-A (DBMS Lab B2)", "DBMS Lab"] },
        Tue: { 1: ["5th Sem AIML-A (DBMS)", "LH-15"], 4: ["5th Sem AIML-A (DBMS Lab B1)", "DBMS Lab"], 5: ["5th Sem AIML-A (DBMS Lab B1)", "DBMS Lab"] },
        Wed: { 1: ["5th Sem AIML-A (DBMS)", "LH-15"] },
      },
    },
    {
      n: "Dr. Sharanamma H",
      a: ["ಶರಣಮ್ಮ", "शरणम्मा", "sharanamma"],
      d: "AIML",
      cab: "AIML Dept, Cabin (5th Sem Sec-B Class Coordinator)",
      s: {
        Mon: { 3: ["5th Sem AIML-B (DBMS)", "LH-16"] },
        Tue: { 1: ["3rd Sem AIML-B (OOP Java)", "LH-09"], 4: ["3rd Sem AIML-B (CP)", "LH-15"], 5: ["3rd Sem AIML-B (CP)", "LH-15"] },
        Wed: { 4: ["5th Sem AIML-B (DBMS)", "LH-16"] },
        Thu: { 0: ["3rd Sem AIML-B (OOP Java)", "LH-15"] },
        Fri: { 2: ["3rd Sem AIML-B (OOP.LAB B1)", "AIML Lab"], 3: ["5th Sem AIML-B (DBMS)", "LH-16"], 4: ["5th Sem AIML-B (DBMS Lab)", "DBMS Lab"], 5: ["5th Sem AIML-B (DBMS Lab)", "DBMS Lab"] },
        Sat: { 0: ["3rd Sem AIML-B (OOP Java)", "LH-09"], 2: ["5th Sem AIML-B (DBMS Lab)", "DBMS Lab"], 3: ["5th Sem AIML-B (DBMS Lab)", "DBMS Lab"] },
      },
    },
    {
      n: "Prof. Shreya G",
      a: ["ಶ್ರೇಯಾ", "श्रेया", "shreya", "shreya g", "shreya p"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 2: ["3rd Sem AIML-B (OOP LAB B2)", "AIML Lab"], 3: ["3rd Sem AIML-B (OOP LAB B2)", "AIML Lab"], 4: ["5th Sem AIML-B (DSA)", "LH-16"] },
        Tue: { 3: ["5th Sem AIML-B (DSA)", "LH-16"] },
        Wed: { 2: ["5th Sem AIML-B (DSA)", "LH-16"] },
        Thu: { 4: ["5th Sem AIML-B (DSA)", "LH-16"] },
        Fri: { 4: ["5th Sem AIML-B (AIML Lab B2)", "AIML Lab"], 5: ["5th Sem AIML-B (AIML Lab B2)", "AIML Lab"] },
        Sat: { 2: ["5th Sem AIML-B (AIML Lab B1)", "AIML Lab"], 3: ["5th Sem AIML-B (AIML Lab B1)", "AIML Lab"] },
      },
    },
    {
      n: "Prof. Chandrakant Biradar",
      a: ["ಚಂದ್ರಕಾಂತ್", "चंद्रकांत", "chandrakant", "biradar"],
      d: "AIML",
      cab: "AIML Dept, Faculty Cabin",
      s: {
        Mon: { 1: ["1st Sem AIML-H (Prog in C)", "FB LH08"] },
        Tue: { 3: ["1st Sem AIML-H (Prog in C)", "FB LH08"] },
        Wed: { 0: ["1st Sem AIML-H (Prog in C)", "FB LH08"] },
      },
    },
  ];

  // Official AIML 3rd & 5th Semester Timetables (Time-Table 2026-27 ODD, W.E.F: 15-09-2026)
  const AIML_TT = {
    "3": {
      "A": {
        title: "B.E. III SEMESTER (A - SECTION)",
        wef: "15-09-2026",
        room: "LH-09",
        coordinator: "PROF. ASHWINI HATTI",
        courses: [
          { code: "CSMAT301", title: "ENGG MATH III", dept: "MATHS", l: 3, t: 2, faculty: "PROF. RAJESHWARI B" },
          { code: "AIDS0302", title: "DSDO", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "PROF. LAXMI J" },
          { code: "AIOOP303", title: "OOP with JAVA", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "PROF. RAJASHEKHAR B / PROF. SAVITHA P", labFaculty: "PROF. SAVITHA P" },
          { code: "AIOSS304", title: "OS", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. SAVITHA P" },
          { code: "AIDSC305", title: "DSC", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. NEHA A" },
          { code: "AIDSCL306", title: "DSC LAB", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. NEHA A" },
          { code: "AIDVPL307A", title: "AEC(DVP)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "DR. KAVERI KORI" },
          { code: "AIPRJ358", title: "CP(COMM PRJ)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "DR. NANDINI P" },
          { code: "KKNSS309", title: "NSS", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. LAXMI J" },
          { code: "KKPED309", title: "PHY", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. SONALI M" },
          { code: "KKYOG309", title: "YOGA", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. NEHA A" },
        ],
        schedule: {
          Mon: ["OOP LAB(B1)/DSC LAB(B2)", "OOP LAB(B1)/DSC LAB(B2)", "DSC (LH-09)", "OOP (LH-09)", "COE", "COE", "NSS/PHY/YOGA"],
          Tue: ["DSC.LAB(B1)/DSDO LAB(B2)", "DSC.LAB(B1)/DSDO LAB(B2)", "ENGG MATH (LH-09)", "OOP (LH-09)", "OS (LH-09)", "DSDO (LH-09)", "–"],
          Wed: ["ENGG MATH (LH-09)", "DSDO (LH-09)", "AEC", "AEC", "DSC (LH-09)", "–", "MATDIP"],
          Thu: ["OOP (LH-09)", "OS (LH-09)", "ENGGMATH (LH-09)", "DSC (LH-09)", "DSDO LAB(B1)/OOP LAB(B2)", "DSDO LAB(B1)/OOP LAB(B2)", "MATDIP"],
          Fri: ["DSDO (LH-09)", "OS (LH-09)", "COE", "COE", "ENGG MATH TUTORIAL (LH-09)", "ENGG MATH TUTORIAL (LH-09)", "–"],
          Sat: ["CP", "CP", "Co-Curricular Activities", "Co-Curricular Activities", "–", "–", "–"],
        },
      },
      "B": {
        title: "B.E. III SEMESTER (B - SECTION)",
        wef: "15-09-2026",
        room: "LH-09 / LH-15 / LH-16",
        coordinator: "PROF. SOWMYA GAITOND",
        courses: [
          { code: "CSMAT301", title: "ENGG MATH III", dept: "MATHS", l: 3, t: 2, faculty: "PROF. GOPICHAND P" },
          { code: "AIDS0302", title: "DSDO", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "PROF. SONALI M" },
          { code: "AIOOP303", title: "OOP with JAVA", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "DR. SHARANAMMA H" },
          { code: "AIOSS304", title: "OS", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. SOWMYA GAITOND" },
          { code: "AIDSC305", title: "DSC", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. ASHWINI HATTI" },
          { code: "AIDSCL306", title: "DSC LAB", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SAVITHA P" },
          { code: "AIDVPL307A", title: "AEC(DVP)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SOWMYA GAITOND" },
          { code: "AIPRJ358", title: "CP(COMM PRJ)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "DR. SHARANAMMA H" },
          { code: "KKNSS309", title: "NSS", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. LAXMI J" },
          { code: "KKPED309", title: "PHY", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. SONALI M" },
          { code: "KKYOG309", title: "YOGA", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 0, faculty: "PROF. NEHA A" },
        ],
        schedule: {
          Mon: ["DSDO (LH-09)", "DSC (LH-09)", "DSC LAB(B1)/OOP LAB(B2)", "DSC LAB(B1)/OOP LAB(B2)", "OS (LH-09)", "–", "NSS/PHY/YOGA"],
          Tue: ["DSC (LH-09)", "OOP (LH-09)", "ENGG MATH (LH-15)", "OS (LH-15)", "CP", "CP", "–"],
          Wed: ["DSDO.LAB(B1)/DSC LAB(B2)", "DSDO.LAB(B1)/DSC LAB(B2)", "COE", "COE", "ENGG MATH TUTORIAL (LH-17)", "ENGG MATH TUTORIAL (LH-17)", "MATDIP"],
          Thu: ["OOP (LH-15)", "ENGG MATH (LH-15)", "DSC (LH-15)", "DSDO (LH-15)", "AEC", "AEC", "MATDIP"],
          Fri: ["COE", "COE", "OOP.LAB(B1)/DSDO LAB(B2)", "OOP.LAB(B1)/DSDO LAB(B2)", "OS (LH-16)", "DSDO (LH-16)", "–"],
          Sat: ["OOP (LH-09)", "ENGG MATH (LH-09)", "Co-Curricular Activities", "Co-Curricular Activities", "–", "–", "–"],
        },
      },
    },
    "5": {
      "A": {
        title: "B.E. V SEMESTER (A - SECTION)",
        wef: "15-09-2026",
        room: "LH-15",
        coordinator: "PROF. MALLINATH SWAMY",
        courses: [
          { code: "22AI51", title: "DATA SCIENCE & ITS APPLICATIONS", dept: "RESPECTIVE ENGG DEPT", l: 4, t: 0, faculty: "DR. BASAVARAJ S. MATHAPATI" },
          { code: "22AI52", title: "DATABASE MANAGEMENT SYSTEM", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "PROF. SANTOSHI P" },
          { code: "22AI53", title: "PRINCIPLES OF MACHINE LEARNING", dept: "RESPECTIVE ENGG DEPT", l: 4, t: 2, faculty: "PROF. MALLINATH SWAMY" },
          { code: "22AIL54", title: "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING LAB", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. PRIYANKA DEVANI" },
          { code: "22AI55A", title: "HUMAN COMPUTER INTERFACE", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. NEHA A" },
          { code: "22AIMP56", title: "MINI-PROJECT", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. LAXMI J" },
          { code: "22RMI57", title: "RESEARCH METHODOLOGY AND IPR", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "DR. KAVERI KORI" },
          { code: "22ES58", title: "ENVIRONMENTAL STUDIES", dept: "RESPECTIVE ENGG DEPT", l: 2, t: 0, faculty: "DR. AFIYA A" },
          { code: "22NS59", title: "MANDATORY COURSE (NSS)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. LAXMI J" },
          { code: "22PES59", title: "MANDATORY COURSE (PHY)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SONALI M" },
          { code: "22YO59", title: "MANDATORY COURSE (YOGA)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. NEHA A" },
        ],
        schedule: {
          Mon: ["DSA (LH-15)", "DBMS (LH-15)", "ES (LH-15)", "PML (LH-15)", "AIML LAB(B1)/DBMS LAB(B2)", "AIML LAB(B1)/DBMS LAB(B2)", "–"],
          Tue: ["DSA (LH-15)", "DBMS (LH-15)", "MINI-PROJ(B2)", "MINI-PROJ(B2)", "AIML LAB(B2)/DBMS LAB(B1)", "AIML LAB(B2)/DBMS LAB(B1)", "–"],
          Wed: ["DSA (LH-15)", "DBMS (LH-15)", "ES (LH-15)", "HCI (LH-15)", "RMIPR (LH-15)", "–", "NSS/PHY/YOGA"],
          Thu: ["COE", "COE", "MINI-PROJ(B1)", "MINI-PROJ(B1)", "PML (LH-15)", "HCI (LH-15)", "–"],
          Fri: ["HCI (LH-15)", "PML (LH-15)", "COE", "COE", "RMIPR (LH-15)", "–", "–"],
          Sat: ["PML (LH-15)", "DSA (LH-15)", "RMIPR (LH-15)", "–", "–", "–", "–"],
        },
      },
      "B": {
        title: "B.E. V SEMESTER (B - SECTION)",
        wef: "15-09-2026",
        room: "LH-16",
        coordinator: "DR. SHARANAMMA H",
        courses: [
          { code: "22AI51", title: "DATA SCIENCE & ITS APPLICATIONS", dept: "RESPECTIVE ENGG DEPT", l: 4, t: 0, faculty: "PROF. SHREYA G" },
          { code: "22AI52", title: "DATABASE MANAGEMENT SYSTEM", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 2, faculty: "DR. SHARANAMMA H" },
          { code: "22AI53", title: "PRINCIPLES OF MACHINE LEARNING", dept: "RESPECTIVE ENGG DEPT", l: 4, t: 2, faculty: "DR. NANDINI P" },
          { code: "22AIL54", title: "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING LAB", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SHREYA G" },
          { code: "22AI55A", title: "HUMAN COMPUTER INTERFACE", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "DR. BASAVARAJ S. MATHAPATI" },
          { code: "22AIMP56", title: "MINI-PROJECT", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SONALI M" },
          { code: "22RMI57", title: "RESEARCH METHODOLOGY AND IPR", dept: "RESPECTIVE ENGG DEPT", l: 3, t: 0, faculty: "PROF. LAXMI J" },
          { code: "22ES58", title: "ENVIRONMENTAL STUDIES", dept: "CIVIL ENGG DEPT", l: 2, t: 0, faculty: "DR. AFIYA A" },
          { code: "22NS59", title: "MANDATORY COURSE (NSS)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. LAXMI J" },
          { code: "22PES59", title: "MANDATORY COURSE (PHY)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. SONALI M" },
          { code: "22YO59", title: "MANDATORY COURSE (YOGA)", dept: "RESPECTIVE ENGG DEPT", l: 0, t: 2, faculty: "PROF. NEHA A" },
        ],
        schedule: {
          Mon: ["MINI-PROJ(B1)", "MINI-PROJ(B1)", "HCI (LH-16)", "DBMS (LH-16)", "DSA (LH-16)", "RMIPR (LH-16)", "–"],
          Tue: ["MINI-PROJ(B2)", "MINI-PROJ(B2)", "ES (LH-16)", "DSA (LH-16)", "PML (LH-16)", "–", "–"],
          Wed: ["COE", "COE", "DSA (LH-16)", "PML (LH-16)", "DBMS (LH-16)", "–", "NSS/PHY/YOGA"],
          Thu: ["HCI (LH-16)", "ES (LH-16)", "COE", "COE", "DSA (LH-16)", "PML (LH-16)", "–"],
          Fri: ["HCI (LH-16)", "PML (LH-16)", "RMIPR (LH-16)", "DBMS (LH-16)", "AIML LAB(B2)/DBMS LAB(B1)", "AIML LAB(B2)/DBMS LAB(B1)", "–"],
          Sat: ["–", "RMIPR (LH-16)", "AIML LAB(B1)/DBMS LAB(B2)", "AIML LAB(B1)/DBMS LAB(B2)", "–", "–", "–"],
        },
      },
    },
  };

  const L = {
    en: {
      botTitle: "Campus Bot",
      botSubtitle: "P.D.A. College of Engineering",
      greeting: "Hello! 👋 Welcome to <b>P.D.A. College of Engineering</b>'s <b>Campus Bot</b>. Select a section below or ask any question:",
      menuAdm: "1. Admission",
      menuStu: "2. Student Enquiry",
      menuStf: "3. Staff",
      menuSch: "4. Scholarship",
      menuAsk: "5. Ask a Question",
      admSub: ["Program & intake", "Fee finder", "Document list", "Fees & cut-offs", "Admission Contact"],
      stuSub: ["Departments, schemes & study material", "Class timetable", "Exam timetable & notices"],
      matSub: ["Syllabus", "Notes", "Previous year question papers", "VTU model papers", "Class timetable"],
      ttSub: ["1st year (Sections A–I)", "Departments (All Departments)", "AIML 3rd Sem (A, B)", "AIML 5th Sem (A, B)"],
      stfSub: ["Faculty list", "Find a teacher", "Staff timetable", "Post a notice"],
      schSub: ["Government portals (NSP, Karnataka SSP)", "Eligibility & documents", "How to apply", "College help desk"],
      askSub: ["Type a question", "Voice question (English, Hindi, Kannada)", "Built-in answers (college data, timetable, faculty)", "Not sure? Say so and give the office contact", "Optional AI answers (AI_URL backend)"],
      backBtn: "← Main Menu",
      inClass: "In Class Now",
      notInClass: "Available in Cabin",
      likelyIn: "Location",
      nextClass: "Next Class",
      notUploaded: "This section is ready. Official data will be displayed here as soon as you provide it step-by-step.",
      placeholder: "Ask any question (e.g. 'AIML fees & cutoff', 'Dr. S. R. Patil')...",
    },
    kn: {
      botTitle: "ಕ್ಯಾಂಪಸ್ ಬಾಟ್ (Campus Bot)",
      botSubtitle: "ಪಿ.ಡಿ.ಎ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜು",
      greeting: "ನಮಸ್ಕಾರ! 👋 <b>ಪಿ.ಡಿ.ಎ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿನ</b> <b>Campus Bot</b> ಗೆ ಸ್ವಾಗತ. ಕೆಳಗಿನ ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಪ್ರಶ್ನೆ ಕೇಳಿ:",
      menuAdm: "1. ಪ್ರವೇಶ (Admission)",
      menuStu: "2. ವಿದ್ಯಾರ್ಥಿ ವಿಚಾರಣೆ (Student Enquiry)",
      menuStf: "3. ಸಿಬ್ಬಂದಿ ಮತ್ತು ಶಿಕ್ಷಕರು (Staff)",
      menuSch: "4. ವಿದ್ಯಾರ್ಥಿವೇತನ (Scholarship)",
      menuAsk: "5. ಪ್ರಶ್ನೆ ಕೇಳಿ (Ask a Question)",
      admSub: ["ಪ್ರೋಗ್ರಾಂ ಮತ್ತು ಸೀಟುಗಳು (Program & intake)", "ಶುಲ್ಕ ಹುಡುಕಿ (Fee finder)", "ದಾಖಲೆಗಳ ಪಟ್ಟಿ (Document list)", "ಶುಲ್ಕ ಮತ್ತು ಕಟ್-ಆಫ್ (Fees & cut-offs)", "ಪ್ರವೇಶ ಸಂಪರ್ಕ (Admission Contact)"],
      stuSub: ["ವಿಭಾಗಗಳು, ಸ್ಕೀಮ್ ಮತ್ತು ಸ್ಟಡಿ ಮೆಟೀರಿಯಲ್", "ತರಗತಿ ವೇಳಾಪಟ್ಟಿ (Class timetable)", "ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಸೂಚನೆಗಳು"],
      matSub: ["ಪಠ್ಯಕ್ರಮ (Syllabus)", "ನೋಟ್ಸ್ (Notes)", "ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು", "ವಿಟಿಯು ಮಾದರಿ ಪತ್ರಿಕೆಗಳು (VTU model papers)", "ತರಗತಿ ವೇಳಾಪಟ್ಟಿ (Class timetable)"],
      ttSub: ["1ನೇ ವರ್ಷ (ವಿಭಾಗ A–I)", "ಎಲ್ಲಾ ವಿಭಾಗಗಳು (All Departments)", "AIML 3ನೇ ಸೆಮಿಸ್ಟರ್ (A, B)", "AIML 5ನೇ ಸೆಮಿಸ್ಟರ್ (A, B)"],
      stfSub: ["ಶಿಕ್ಷಕರ ಪಟ್ಟಿ (Faculty list)", "ಶಿಕ್ಷಕರನ್ನು ಹುಡುಕಿ (Find a teacher)", "ಸಿಬ್ಬಂದಿ ವೇಳಾಪಟ್ಟಿ (Staff timetable)", "ಸೂಚನೆ ಪ್ರಕಟಿಸಿ (Post a notice)"],
      schSub: ["ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು (NSP, Karnataka SSP)", "ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆಗಳು", "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ (How to apply)", "ಕಾಲೇಜು ಸಹಾಯ ಕೇಂದ್ರ (College help desk)"],
      askSub: ["ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ (Type a question)", "ಧ್ವನಿ ಪ್ರಶ್ನೆ (ಕನ್ನಡ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್)", "ಅಂತರ್ನಿರ್ಮಿತ ಉತ್ತರಗಳು (ಕಾಲೇಜು ಡೇಟಾ, ವೇಳಾಪಟ್ಟಿ, ಶಿಕ್ಷಕರು)", "ಖಚಿತವಿಲ್ಲವೇ? ಕಚೇರಿ ಸಂಪರ್ಕ ನೀಡಿ", "ಐಚ್ಛಿಕ AI ಉತ್ತರಗಳು (AI_URL backend)"],
      backBtn: "← ಮುಖ್ಯ ಮೆನು",
      inClass: "ಈಗ ತರಗತಿಯಲ್ಲಿದ್ದಾರೆ",
      notInClass: "ಕ್ಯಾಬಿನ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದ್ದಾರೆ",
      likelyIn: "ಸ್ಥಳ",
      nextClass: "ಮುಂದಿನ ತರಗತಿ",
      notUploaded: "ಈ ವಿಭಾಗ ಸಿದ್ಧವಾಗಿದೆ. ನೀವು ಹಂತ-ಹಂತವಾಗಿ ಡೇಟಾ ನೀಡಿದ ತಕ್ಷಣ ಇಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.",
      placeholder: "ಶಿಕ್ಷಕರ ಹೆಸರು, ಶುಲ್ಕ ಅಥವಾ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...",
    },
    hi: {
      botTitle: "कैंपस बॉट (Campus Bot)",
      botSubtitle: "पी.डी.ए. कॉलेज ऑफ इंजीनियरिंग",
      greeting: "नमस्ते! 👋 <b>पी.डी.ए. कॉलेज ऑफ इंजीनियरिंग</b> के <b>Campus Bot</b> में आपका स्वागत है। नीचे से एक विकल्प चुनें या अपना प्रश्न लिखें:",
      menuAdm: "1. प्रवेश (Admission)",
      menuStu: "2. छात्र पूछताछ (Student Enquiry)",
      menuStf: "3. स्टाफ और शिक्षक (Staff)",
      menuSch: "4. छात्रवृत्ति (Scholarship)",
      menuAsk: "5. प्रश्न पूछें (Ask a Question)",
      admSub: ["प्रोग्राम और सीटें (Program & intake)", "फीस फाइंडर (Fee finder)", "दस्तावेज़ सूची (Document list)", "फीस और कट-ऑफ (Fees & cut-offs)", "प्रवेश संपर्क (Admission Contact)"],
      stuSub: ["विभाग, स्कीम और अध्ययन सामग्री", "कक्षा टाइमटेबल (Class timetable)", "परीक्षा टाइमटेबल और सूचनाएँ"],
      matSub: ["पाठ्यक्रम (Syllabus)", "नोट्स (Notes)", "पिछले वर्ष के प्रश्न पत्र", "VTU मॉडल पेपर", "कक्षा टाइमटेबल (Class timetable)"],
      ttSub: ["प्रथम वर्ष (सेक्शन A–I)", "सभी विभाग (All Departments)", "AIML तृतीय सेमेस्टर (A, B)", "AIML पंचम सेमेस्टर (A, B)"],
      stfSub: ["शिक्षक सूची (Faculty list)", "शिक्षक खोजें (Find a teacher)", "स्टाफ टाइमटेबल (Staff timetable)", "सूचना पोस्ट करें (Post a notice)"],
      schSub: ["सरकारी पोर्टल (NSP, Karnataka SSP)", "पात्रता और दस्तावेज़", "आवेदन कैसे करें (How to apply)", "कॉलेज हेल्प डेस्क"],
      askSub: ["प्रश्न टाइप करें (Type a question)", "वॉइस प्रश्न (अंग्रेजी, हिंदी, कन्नड़)", "इन-बिल्ट उत्तर (कॉलेज डेटा, टाइमटेबल, शिक्षक)", "पक्का नहीं पता? कार्यालय संपर्क दें", "वैकल्पिक AI उत्तर (AI_URL backend)"],
      backBtn: "← मुख्य मेनू",
      inClass: "अभी कक्षा में हैं",
      notInClass: "केबिन में उपलब्ध हैं",
      likelyIn: "संभावित स्थान",
      nextClass: "अगली कक्षा",
      notUploaded: "यह अनुभाग तैयार है। जैसे ही आप चरण-दर-चरण डेटा प्रदान करेंगे, यहाँ प्रदर्शित किया जाएगा।",
      placeholder: "शिक्षक का नाम, फीस या प्रश्न लिखें...",
    },
  };

  // Inject Styles
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    :root {
      --bg1: #0b1020;
      --bg2: #1b2a6b;
      --glass: rgba(255, 255, 255, 0.09);
      --glass2: rgba(255, 255, 255, 0.16);
      --bd: rgba(255, 255, 255, 0.22);
      --tx: #f4f6ff;
      --mu: #b6bddc;
      --ac: #7c8cff;
      --ac2: #35d0c0;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg1: #e8ecff;
        --bg2: #b9c4ff;
        --glass: rgba(255, 255, 255, 0.55);
        --glass2: rgba(255, 255, 255, 0.8);
        --bd: rgba(255, 255, 255, 0.9);
        --tx: #14183a;
        --mu: #4a527f;
      }
    }

    #pda-widget-root * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Kannada", sans-serif;
    }

    #pda-chat-launcher {
      position: fixed;
      bottom: 18px;
      right: 18px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--bg2), #4c1d95);
      border: 1px solid var(--bd);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999998;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      animation: pda-pulse 3s infinite;
    }
    #pda-chat-launcher:hover {
      transform: scale(1.06);
    }
    @keyframes pda-pulse {
      0% {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 0 var(--ac);
      }
      70% {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 14px rgba(124, 140, 255, 0);
      }
      100% {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(124, 140, 255, 0);
      }
    }
    #pda-chat-launcher img {
      width: 42px;
      height: 42px;
      object-fit: contain;
      border-radius: 50%;
      pointer-events: none;
    }
    #pda-chat-launcher .pda-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #f59e0b;
      color: #1e1b4b;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 999px;
      border: 1.5px solid var(--bd);
    }

    #pda-chat-window {
      position: fixed;
      bottom: 18px;
      right: 18px;
      width: min(400px, 100% - 36px);
      height: min(640px, 100% - 36px);
      border-radius: 22px;
      overflow: hidden;
      background: var(--glass);
      border: 1px solid var(--bd);
      -webkit-backdrop-filter: blur(22px) saturate(160%);
      backdrop-filter: blur(22px) saturate(160%);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      display: none;
      flex-direction: column;
      z-index: 999999;
      color: var(--tx);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    @supports not (backdrop-filter: blur(1px)) {
      #pda-chat-window {
        background: rgba(20, 26, 60, 0.92);
      }
    }
    @supports not (-webkit-backdrop-filter: blur(1px)) {
      #pda-chat-window {
        background: rgba(20, 26, 60, 0.92);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #pda-chat-launcher {
        animation: none !important;
        transition: none !important;
      }
      #pda-chat-window, .pda-msg-in, .pda-b {
        animation: none !important;
        transition: none !important;
      }
    }
    @media (max-width: 480px) {
      #pda-chat-window {
        bottom: env(safe-area-inset-bottom, 12px);
        right: 12px;
        left: 12px;
        width: auto;
        height: calc(100vh - 24px - env(safe-area-inset-bottom, 0px));
        border-radius: 18px;
      }
    }

    .pda-header {
      padding: 12px 14px;
      background: linear-gradient(135deg, rgba(76, 29, 149, 0.35), rgba(27, 42, 107, 0.35));
      border-bottom: 1px solid var(--bd);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }
    .pda-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }
    .pda-header-left img {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      object-fit: contain;
      background: rgba(255, 255, 255, 0.15);
      padding: 2px;
      border: 1px solid var(--bd);
      flex-shrink: 0;
    }
    .pda-header-title {
      display: flex;
      flex-direction: column;
      line-height: 1.25;
      overflow: hidden;
    }
    .pda-header-title b {
      font-size: 15px;
      font-weight: 700;
      color: var(--tx);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .pda-header-title small {
      font-size: 11.5px;
      color: var(--mu);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .pda-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .pda-lang-select, .pda-hbtn {
      background: var(--glass2);
      border: 1px solid var(--bd);
      color: var(--tx);
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: all 0.2s ease;
    }
    .pda-lang-select:hover, .pda-hbtn:hover {
      border-color: var(--ac);
      background: rgba(255, 255, 255, 0.25);
    }

    #pda-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scrollbar-width: thin;
      scrollbar-color: var(--bd) transparent;
    }
    #pda-chat-messages::-webkit-scrollbar {
      width: 6px;
    }
    #pda-chat-messages::-webkit-scrollbar-thumb {
      background: var(--bd);
      border-radius: 3px;
    }

    .pda-b {
      max-width: 86%;
      padding: 11px 14px;
      border-radius: 16px;
      border-bottom-left-radius: 5px;
      background: var(--glass2);
      color: var(--tx);
      border: 1px solid var(--bd);
      overflow-wrap: anywhere;
      font-size: 14px;
      line-height: 1.45;
      animation: pdaFade 0.25s ease-out;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    @keyframes pdaFade {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .pda-b.me {
      align-self: flex-end;
      background: linear-gradient(135deg, var(--ac), #5566e6);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 5px;
      padding: 10px 14px;
      box-shadow: 0 4px 16px rgba(85, 102, 230, 0.3);
    }
    .pda-b a {
      color: var(--ac);
      font-weight: 700;
      text-decoration: underline;
    }

    .pda-tag {
      display: inline-block;
      font-size: 10.5px;
      background: var(--glass2);
      color: var(--ac2);
      border: 1px solid var(--bd);
      border-radius: 999px;
      padding: 2px 9px;
      margin-bottom: 6px;
      font-weight: 600;
    }

    .pda-chips-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 12px;
      max-height: 36%;
      overflow-y: auto;
      border-top: 1px solid var(--bd);
      background: rgba(0, 0, 0, 0.08);
      scrollbar-width: thin;
      scrollbar-color: var(--bd) transparent;
    }
    .pda-chip {
      background: var(--glass2);
      border: 1px solid var(--bd);
      color: var(--tx);
      border-radius: 999px;
      padding: 7px 12px;
      font-size: 12.5px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    }
    .pda-chip:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.55);
      background: rgba(255, 255, 255, 0.28);
    }

    .pda-footer-form {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-top: 1px solid var(--bd);
      background: rgba(0, 0, 0, 0.12);
      flex-shrink: 0;
    }
    .pda-input-text {
      flex: 1;
      background: var(--glass2);
      border: 1px solid var(--bd);
      color: var(--tx);
      border-radius: 14px;
      padding: 10px 14px;
      font-size: 13.5px;
      outline: none;
      transition: border-color 0.2s;
    }
    .pda-input-text:focus {
      border-color: var(--ac);
    }
    .pda-input-text::placeholder {
      color: var(--mu);
    }
    .pda-mic-btn, .pda-send-btn {
      width: 42px;
      height: 42px;
      min-width: 42px;
      min-height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--ac), var(--ac2));
      border: none;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s ease, opacity 0.15s ease;
      box-shadow: 0 4px 12px rgba(53, 208, 192, 0.2);
    }
    .pda-mic-btn:hover, .pda-send-btn:hover {
      transform: scale(1.04);
      opacity: 0.95;
    }

    .pda-table-wrap {
      overflow-x: auto;
      border: 1px solid var(--bd);
      border-radius: 10px;
      margin: 8px 0;
      background: rgba(0, 0, 0, 0.05);
    }
    .pda-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .pda-table th {
      background: transparent;
      color: var(--mu);
      padding: 7px 9px;
      text-align: left;
      border-bottom: 1px solid var(--bd);
      font-weight: 600;
    }
    .pda-table td {
      padding: 7px 9px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      color: var(--tx);
    }

    .pda-menu-card {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--glass2);
      border: 1px solid var(--bd);
      border-radius: 12px;
      padding: 9px 12px;
      margin: 6px 0;
      color: var(--tx);
      cursor: pointer;
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
    }
    .pda-menu-card:hover {
      transform: translateY(-1px);
      background: rgba(255, 255, 255, 0.28);
      border-color: var(--ac);
    }
    .pda-menu-icon { font-size: 16px; flex-shrink: 0; }
    .pda-menu-text { flex: 1; }
    .pda-menu-title { font-size: 13px; color: var(--tx); font-weight: 600; }
    .pda-menu-arrow { font-size: 12px; color: var(--mu); }

    .pda-back-bar { margin-bottom: 8px; }
    .pda-back-btn {
      background: var(--glass2);
      border: 1px solid var(--bd);
      color: var(--tx);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11.5px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .pda-back-btn:hover {
      border-color: var(--ac);
      background: rgba(255, 255, 255, 0.25);
    }

    .pda-website-btn {
      display: inline-block;
      margin-top: 8px;
      padding: 7px 14px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--ac), var(--ac2));
      color: #ffffff !important;
      font-weight: 600;
      font-size: 12px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(124, 140, 255, 0.3);
    }
    .pda-website-btn:hover {
      opacity: 0.92;
    }
`;
  document.head.appendChild(styleEl);

  const root = document.createElement("div");
  root.id = "pda-widget-root";
  root.innerHTML = `
    <div id="pda-chat-launcher" title="Open PDA Campus Bot">
      <img src="${API_BASE}/static/pda_logo.png" alt="PDA Crest" onerror="this.src='${API_BASE}/static/pda_logo.webp'" />
      <span class="pda-badge">AI</span>
    </div>

    <div id="pda-chat-window">
      <div class="pda-header">
        <div class="pda-header-left">
          <img src="${API_BASE}/static/pda_logo.png" alt="PDA Logo" onerror="this.src='${API_BASE}/static/pda_logo.webp'" />
          <div class="pda-header-title">
            <b id="pda-hdr-title">Campus Bot</b>
            <small id="pda-hdr-sub">P.D.A. College of Engineering</small>
          </div>
        </div>
        <div class="pda-header-actions">
          <select id="pda-lang-select" class="pda-lang-select" title="Select Language">
            <option value="en">EN</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="hi">हिन्दी</option>
          </select>
          <button id="pda-home-btn" class="pda-hbtn" title="Main Menu">🏠</button>
          <button id="pda-tts-btn" class="pda-hbtn" title="Toggle Voice Output">🔊</button>
          <button id="pda-close-btn" class="pda-hbtn" title="Minimize">✕</button>
        </div>
      </div>

      <div id="pda-chat-messages" aria-live="polite"></div>

      <div id="pda-chips-bar" class="pda-chips-bar">
        <button type="button" class="pda-chip" data-chip="admission">🎓 Admission</button>
        <button type="button" class="pda-chip" data-chip="student">📚 Student Enquiry</button>
        <button type="button" class="pda-chip" data-chip="staff">👨‍🏫 Staff</button>
        <button type="button" class="pda-chip" data-chip="scholarship">💰 Scholarship</button>
        <button type="button" class="pda-chip" data-chip="ask">❓ Ask a question</button>
      </div>

      <form id="pda-chat-form" class="pda-footer-form">
        <input type="text" id="pda-query-input" class="pda-input-text" placeholder="Ask any question (e.g. 'AIML fees & cutoff', 'Dr. S. R. Patil')..." autocomplete="off" />
        <button type="button" class="pda-mic-btn" id="pda-mic-btn" aria-label="Voice Search">🎤</button>
        <button type="submit" id="pda-send-btn" class="pda-send-btn">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  // Wire up chips
  root.querySelectorAll(".pda-chip").forEach(function(btn) {
    btn.onclick = function() {
      const chipType = btn.getAttribute("data-chip");
      if (chipType === "admission") {
        add("Admission", null, true);
        adm();
      } else if (chipType === "student") {
        add("Student Enquiry", null, true);
        stu();
      } else if (chipType === "staff") {
        add("Staff", null, true);
        stf();
      } else if (chipType === "scholarship") {
        add("Scholarship", null, true);
        schola();
      } else if (chipType === "ask") {
        add("Ask a question", null, true);
        queryInput.focus();
      }
    };
  });

  const launcher = document.getElementById("pda-chat-launcher");
  const chatWindow = document.getElementById("pda-chat-window");
  const closeBtn = document.getElementById("pda-close-btn");
  const homeBtn = document.getElementById("pda-home-btn");
  const ttsBtn = document.getElementById("pda-tts-btn");
  const chat = document.getElementById("pda-chat-messages");
  const langS = document.getElementById("pda-lang-select");
  const form = document.getElementById("pda-chat-form");
  const queryInput = document.getElementById("pda-query-input");
  const micB = document.getElementById("pda-mic-btn");

  homeBtn.onclick = function () {
    home();
  };

  function lg() { return langS.value; }

  function tag(label) {
    return `<span class="pda-tag">✨ ${label || "Verified PDA College Knowledge Engine · pdacek.ac.in"}</span><br>`;
  }

  function getNowTime() {
    const now = new Date();
    const day = D[now.getDay()];
    const mins = now.getHours() * 60 + now.getMinutes();
    const timeStr = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
    return { day, mins, timeStr, dayIndex: now.getDay() };
  }

  let speakOn = false;
  const CODES = { en: "en-IN", kn: "kn-IN", hi: "hi-IN" };
  function speak(t) {
    try {
      if (!speakOn || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = CODES[lg()];
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  ttsBtn.onclick = function () {
    speakOn = !speakOn;
    ttsBtn.textContent = speakOn ? "🔈" : "🔊";
    ttsBtn.title = speakOn ? "Voice Output: ON" : "Voice Output: OFF";
    if (speakOn) speak("CampusBot voice output enabled");
  };

  function formatMarkdownLine(line) {
    return line
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/`(.*?)`/g, "<code style='background:#f5f3ff;color:#4c1d95;border:1px solid #ddd6fe;padding:1px 5px;border-radius:4px;font-weight:700;font-size:12px;'>$1</code>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function createMenuCard(opt) {
    const card = document.createElement("button");
    card.className = "pda-menu-card";
    card.type = "button";
    card.innerHTML = `
      <div class="pda-menu-icon">${opt.icon || "➔"}</div>
      <div class="pda-menu-text">
        <div class="pda-menu-title">${opt.title}</div>
      </div>
      <div class="pda-menu-arrow">➔</div>
    `;
    card.onclick = function () {
      add(opt.title, null, true);
      opt.action();
    };
    return card;
  }

  // Stream lines progressively like an ML model generating line-by-line output
  function streamLinesIntoElement(container, linesArray, columnOptions, onDone) {
    let i = 0;
    function nextLine() {
      if (i >= linesArray.length) {
        if (columnOptions && columnOptions.length > 0) {
          const colDiv = document.createElement("div");
          colDiv.className = "pda-col-menu";
          columnOptions.forEach(function (opt) {
            colDiv.appendChild(createMenuCard(opt));
          });
          container.appendChild(colDiv);
          chat.scrollTop = chat.scrollHeight;
        }
        if (onDone) onDone();
        return;
      }

      const raw = linesArray[i++];
      if (!raw || !raw.trim()) {
        nextLine();
        return;
      }

      const lineEl = document.createElement("div");
      if (raw.startsWith("### ")) {
        lineEl.className = "pda-ml-heading";
        lineEl.innerHTML = formatMarkdownLine(raw.replace(/^###\s+/, ""));
      } else {
        lineEl.className = "pda-ml-line";
        lineEl.innerHTML = formatMarkdownLine(raw);
      }
      container.appendChild(lineEl);
      chat.scrollTop = chat.scrollHeight;
      setTimeout(nextLine, 35);
    }
    nextLine();
  }

  function add(html, columnOptions, me, showBack) {
    const b = document.createElement("div");
    b.className = "pda-b" + (me ? " me" : "");

    if (showBack) {
      const backDiv = document.createElement("div");
      backDiv.className = "pda-back-bar";
      const backBtn = document.createElement("button");
      backBtn.className = "pda-back-btn";
      backBtn.type = "button";
      backBtn.innerHTML = L[lg()].backBtn;
      backBtn.onclick = function () { home(); };
      backDiv.appendChild(backBtn);
      b.appendChild(backDiv);
    }

    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = html;
    b.appendChild(contentDiv);

    if (columnOptions && columnOptions.length > 0) {
      const colDiv = document.createElement("div");
      colDiv.className = "pda-col-menu";
      columnOptions.forEach(function (opt) {
        colDiv.appendChild(createMenuCard(opt));
      });
      b.appendChild(colDiv);
    }

    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;

    if (!me) {
      const cl = contentDiv.cloneNode(true);
      speak(cl.textContent);
    }
  }

  function addLineByLine(headerLabel, linesArray, columnOptions, audioText) {
    const b = document.createElement("div");
    b.className = "pda-b";

    const backDiv = document.createElement("div");
    backDiv.className = "pda-back-bar";
    const backBtn = document.createElement("button");
    backBtn.className = "pda-back-btn";
    backBtn.type = "button";
    backBtn.innerHTML = L[lg()].backBtn;
    backBtn.onclick = function () { home(); };
    backDiv.appendChild(backBtn);
    b.appendChild(backDiv);

    const badgeDiv = document.createElement("div");
    badgeDiv.innerHTML = tag(headerLabel);
    b.appendChild(badgeDiv);

    const streamContainer = document.createElement("div");
    b.appendChild(streamContainer);

    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;

    streamLinesIntoElement(streamContainer, linesArray, columnOptions, function () {
      speak(audioText || streamContainer.textContent);
    });
  }

  // --- 1. MAIN MENU (Exact 5-Branch Structure) ---
  function home() {
    const x = L[lg()];
    document.getElementById("pda-hdr-title").textContent = x.botTitle;
    document.getElementById("pda-hdr-sub").textContent = x.botSubtitle;
    queryInput.placeholder = x.placeholder;

    add(
      x.greeting,
      [
        { icon: "🎓", title: x.menuAdm, action: adm },
        { icon: "📚", title: x.menuStu, action: stu },
        { icon: "👨‍🏫", title: x.menuStf, action: stf },
        { icon: "💰", title: x.menuSch, action: schola },
        { icon: "❓", title: x.menuAsk, action: askSectionMenu },
      ],
      false,
      false
    );
  }

  function askSectionMenu() {
    const x = L[lg()];
    add(
      tag(x.menuAsk) + "<b>" + x.menuAsk + ":</b>",
      [
        {
          icon: "⌨️",
          title: x.askSub[0],
          action: function () {
            add("Type your question in the text box below and press <b>Send</b>.", null, false, true);
            queryInput.focus();
          },
        },
        {
          icon: "🎤",
          title: x.askSub[1],
          action: function () {
            micB.click();
          },
        },
        {
          icon: "🏛️",
          title: x.askSub[2],
          action: function () {
            add(
              tag(x.askSub[2]) + "<b>Select a built-in query:</b>",
              [
                { icon: "💳", title: "AIML fees & intake", action: function () { triggerSearchQuery("AIML fees and intake"); } },
                { icon: "📍", title: "Where is Dr. S. R. Patil?", action: function () { triggerSearchQuery("Where is Dr. S. R. Patil?"); } },
                { icon: "🗓️", title: "AIML 3rd Sem Section A Timetable", action: function () { showAIMLSection(DEPTS[1], "3", "A"); } },
              ],
              false,
              true
            );
          },
        },
        {
          icon: "📞",
          title: x.askSub[3],
          action: function () {
            add(
              tag("Official Contact Policy") +
                "<b>If the bot is not sure about a specific detail, it clearly says so and provides the official PDA College contact:</b><br>" +
                "• <b>Main Office Phone:</b> <a href='tel:+9108472224360'>08472-224360</a><br>" +
                "• <b>UG Admissions (Dr. M. S. Aspalli):</b> <a href='tel:+919449618898'>+91 9449618898</a><br>" +
                "• <b>Email:</b> <a href='mailto:principal@pdaengg.com'>principal@pdaengg.com</a> · <a href='https://www.pdacek.ac.in' target='_blank' rel='noopener'>pdacek.ac.in</a>",
              null,
              false,
              true
            );
          },
        },
        {
          icon: "🤖",
          title: x.askSub[4],
          action: function () {
            add(
              tag("Optional AI_URL Backend") +
                "<b>AI Backend Endpoint:</b> Connected to <code>" + API_BASE + "/api/chat</code> (supports custom <code>AI_URL</code> environment variable).",
              null,
              false,
              true
            );
          },
        },
      ],
      false,
      true
    );
  }

  // AUTO-BUILD each AIML teacher's personal weekly timetable directly from the official class timetables (AIML_TT)
  (function buildTeacherTimetablesFromClassTT() {
    const FACULTY_ALIASES = {
      "dr. basavaraj m": "dr. basavaraj s. mathapati",
      "dr. basavaraj s mathapati": "dr. basavaraj s. mathapati",
      "dr. nandini p": "dr. nandini p",
      "prof. rajshekhar p": "prof. rajashekhar b",
      "prof. rajashekhar b": "prof. rajashekhar b",
      "prof. priyanka d": "prof. priyanka devani",
      "prof. priyanka devani": "prof. priyanka devani",
      "prof. sowmya g": "prof. sowmya gaitond",
      "prof. sowmya gaitond": "prof. sowmya gaitond",
      "prof. mallinath s": "prof. mallinath swamy",
      "prof. mallinath swamy": "prof. mallinath swamy",
      "prof. kaveri k": "dr. kaveri kori",
      "dr. kaveri kori": "dr. kaveri kori",
      "prof. ashwini h": "prof. ashwini hatti",
      "prof. ashwini hatti": "prof. ashwini hatti",
      "prof. sonali m": "prof. sonali m",
      "prof. neha a": "prof. neha a",
      "prof. savitha p": "prof. savitha p",
      "prof. laxmi j": "prof. laxmi j",
      "prof. santoshi p": "prof. santoshi p",
      "dr. sharanamma h": "dr. sharanamma h",
      "prof. shreya g": "prof. shreya g",
      "prof. shreya p": "prof. shreya g",
      "prof. chandrakant biradar": "prof. chandrakant biradar"
    };
    const norm = function (s) { return s.toLowerCase().replace(/\s+/g, " ").trim(); };
    const findT = function (fname) {
      const f = norm(fname);
      const target = FACULTY_ALIASES[f] || f;
      return T.find(function (t) {
        if (t.d !== "AIML") return false;
        const tn = norm(t.n);
        return tn === target || tn.indexOf(target) !== -1 || target.indexOf(tn) !== -1;
      });
    };
    const courseFor = function (courses, key) {
      const k = key.toUpperCase();
      const has = function (w) { return k.indexOf(w) !== -1; };
      const byTitle = function (w) { return courses.filter(function (c) { return c.title.toUpperCase().indexOf(w) !== -1; }); };
      const isLab = has("LAB") || has("MINI-PROJ");
      if (has("DSC LAB")) return { list: byTitle("DSC LAB"), lab: true };
      if (has("DSC")) return { list: courses.filter(function (c) { return c.title.toUpperCase() === "DSC"; }), lab: false };
      if (has("DSDO")) return { list: byTitle("DSDO"), lab: isLab };
      if (has("OOP")) return { list: byTitle("OOP"), lab: isLab };
      if (has("AIML LAB")) return { list: byTitle("MACHINE LEARNING LAB"), lab: true };
      if (has("DBMS")) return { list: byTitle("DATABASE"), lab: isLab };
      if (has("MINI-PROJ")) return { list: byTitle("MINI-PROJECT"), lab: true };
      if (has("PML")) return { list: byTitle("PRINCIPLES"), lab: false };
      if (has("DSA")) return { list: byTitle("DATA SCIENCE"), lab: false };
      if (has("HCI")) return { list: byTitle("HUMAN COMPUTER"), lab: false };
      if (has("RMIPR")) return { list: byTitle("RESEARCH"), lab: false };
      if (has("AEC")) return { list: byTitle("AEC"), lab: true };
      if (has("OS")) return { list: courses.filter(function (c) { return c.title.toUpperCase() === "OS"; }), lab: false };
      if (has("CP")) return { list: byTitle("CP("), lab: true };
      if (has("NSS/PHY")) return { list: courses.filter(function (c) { return /NSS|PHY|YOGA/.test(c.title); }), lab: false };
      return { list: [], lab: false };
    };
    const fresh = {};
    ["3", "5"].forEach(function (sem) {
      ["A", "B"].forEach(function (sec) {
        const cls = AIML_TT[sem][sec];
        const roomDefault = cls.room.split("/")[0].trim();
        Object.keys(cls.schedule).forEach(function (day) {
          cls.schedule[day].forEach(function (cell, pi) {
            if (!cell || cell === "–") return;
            cell.split("/").forEach(function (part, partIdx) {
              if (/^(COE|MATDIP|Co-Curricular)/i.test(part.trim())) return;
              const roomM = part.match(/\(([^)]*LH[^)]*)\)/i);
              const batchM = part.match(/\((B[12])\)/i);
              const label = part.replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
              const res = courseFor(cls.courses, label);
              res.list.forEach(function (course) {
                const names = course.faculty.split("/").map(function (n) { return n.trim(); });
                let who = names;
                if (course.labFaculty && res.lab) who = [course.labFaculty];
                else if (names.length > 1) {
                  if (batchM && res.lab) who = [names[batchM[1].toUpperCase() === "B1" ? 0 : 1]];
                  else who = [names[0]];
                }
                who.forEach(function (fn) {
                  const t = findT(fn);
                  if (!t) return;
                  const room = roomM ? roomM[1] : (/LAB|MINI|AEC/i.test(label) ? (/DBMS/i.test(label) ? "DBMS Lab" : "AIML Lab") : roomDefault);
                  const title = sem + (sem === "3" ? "rd" : "th") + " Sem AIML-" + sec + " (" + label + (batchM ? " " + batchM[1].toUpperCase() : "") + ")";
                  fresh[t.n] = fresh[t.n] || {};
                  fresh[t.n][day] = fresh[t.n][day] || {};
                  fresh[t.n][day][pi] = [title, room];
                });
              });
            });
          });
        });
      });
    });

    // Merge 1st Year AIML faculty slots into fresh
    const tAshwini = T.find(function (t) { return t.n.indexOf("Ashwini") !== -1; });
    if (tAshwini) {
      fresh[tAshwini.n] = fresh[tAshwini.n] || {};
      fresh[tAshwini.n]["Wed"] = fresh[tAshwini.n]["Wed"] || {};
      fresh[tAshwini.n]["Wed"][0] = ["1st Sem AIML-G (Prog in C)", "FB LH07"];
      fresh[tAshwini.n]["Fri"] = fresh[tAshwini.n]["Fri"] || {};
      fresh[tAshwini.n]["Fri"][1] = ["1st Sem AIML-G (Prog in C)", "FB LH07"];
      fresh[tAshwini.n]["Sat"] = fresh[tAshwini.n]["Sat"] || {};
      fresh[tAshwini.n]["Sat"][1] = ["1st Sem AIML-G (Prog in C)", "FB LH07"];
    }
    const tChandra = T.find(function (t) { return t.n.indexOf("Chandrakant") !== -1; });
    if (tChandra) {
      fresh[tChandra.n] = fresh[tChandra.n] || {};
      fresh[tChandra.n]["Mon"] = fresh[tChandra.n]["Mon"] || {};
      fresh[tChandra.n]["Mon"][1] = ["1st Sem AIML-H (Prog in C)", "FB LH08"];
      fresh[tChandra.n]["Tue"] = fresh[tChandra.n]["Tue"] || {};
      fresh[tChandra.n]["Tue"][3] = ["1st Sem AIML-H (Prog in C)", "FB LH08"];
      fresh[tChandra.n]["Wed"] = fresh[tChandra.n]["Wed"] || {};
      fresh[tChandra.n]["Wed"][0] = ["1st Sem AIML-H (Prog in C)", "FB LH08"];
    }

    T.forEach(function (t) { if (t.d === "AIML" && fresh[t.n]) t.s = fresh[t.n]; });
  })();
  // Helper: Format department name & short code exactly ONCE (never "(AIML) (AIML)")
  function deptLabel(d) {
    if (!d) return "";
    if (d.code === "AIML") return "Artificial Intelligence & Machine Learning (AIML)";
    if (d.name.indexOf("(") !== -1) return d.name;
    return d.name + " (" + d.code + ")";
  }

  // Helper: Build live status badge string for inside a faculty member's name bar
  function getFacultyBarSummary(t) {
    const curTime = getNowTime();
    const di = curTime.dayIndex;
    const day = curTime.day;
    const nowMins = curTime.mins;
    const sl = t.s[day] || {};
    let cur = -1;
    let nxt = -1;
    for (let i = 0; i < P.length; i++) {
      const pStart = parseInt(P[i][0].split(":")[0]) * 60 + parseInt(P[i][0].split(":")[1]);
      const pEnd = parseInt(P[i][1].split(":")[0]) * 60 + parseInt(P[i][1].split(":")[1]);
      if (nowMins >= pStart && nowMins < pEnd) cur = i;
      if (pStart > nowMins && nxt < 0 && sl[i]) nxt = i;
    }
    if (cur >= 0 && sl[cur]) {
      return `${t.n} — ${t.d} Dept · 🔴 In Class (${P[cur][0]}–${P[cur][1]} · ${sl[cur][1]})`;
    }
    if (nxt >= 0 && di !== 0) {
      return `${t.n} — ${t.d} Dept · 🟢 Cabin (Next: ${P[nxt][0]}–${P[nxt][1]})`;
    }
    return `${t.n} — ${t.d} Dept · 🟢 Cabin (09:00–16:00)`;
  }

  // Helper: Build HTML table of a faculty member's weekly timetable
  function buildFacultyTimetableHtml(t) {
    let rows = "";
    for (let di = 1; di < 7; di++) {
      rows += `<tr><td><b>${D[di]}</b></td>`;
      for (let i = 0; i < P.length; i++) {
        const x = (t.s[D[di]] || {})[i];
        rows += `<td>${x ? x[0] + "<br><small style='color:#6d28d9;'>" + x[1] + "</small>" : "–"}</td>`;
      }
      rows += "</tr>";
    }
    return (
      `<div style="margin-top:10px"><b>📅 Weekly Timetable — ${t.n} (${t.d} Dept):</b>` +
      `<div class="pda-wrap"><table class="pda-table">` +
      `<thead><tr><th>Day</th>${P.map(p => `<th>${p[0]}–${p[1]}</th>`).join("")}</tr></thead>` +
      `<tbody>${rows}</tbody></table></div></div>`
    );
  }

  // --- 1. ADMISSION ---
  function adm() {
    const x = L[lg()];
    const opts = [
      {
        icon: "📊",
        title: x.admSub[0],
        action: function () {
          let tbl = `<div class="pda-wrap"><table class="pda-table"><thead><tr><th>B.E. Program</th><th>Intake</th><th>HOD</th></tr></thead><tbody>`;
          DEPTS.forEach(function (d) {
            tbl += `<tr><td><b>${deptLabel(d)}</b></td><td>${d.intake}</td><td>${d.hod}</td></tr>`;
          });
          tbl += `<tr><td><b>B.Arch (Architecture)</b></td><td>80</td><td>Architecture Dept</td></tr></tbody></table></div>`;
          add(tag(x.menuAdm + " · " + x.admSub[0]) + "<b>Approved UG Intake (pdacek.ac.in):</b>" + tbl, null, false, true);
        },
      },
      {
        icon: "🔍",
        title: x.admSub[1],
        action: function () {
          add(
            tag(x.menuAdm + " · " + x.admSub[1]) + "<b>Select a Department to find its KCET, COMEDK & Management fees:</b>",
            DEPTS.map(function (d) {
              return { icon: "🏛️", title: deptLabel(d), action: function () { showDeptDetail(d); } };
            }),
            false,
            true
          );
        },
      },
      {
        icon: "📑",
        title: x.admSub[2],
        action: function () {
          const docs = [
            "KEA / COMEDK Allotment Order (Original + 3 Xerox)",
            "10th / SSLC Marks Card (Original + 3 Xerox)",
            "2nd PUC / 12th Marks Card (Original + 3 Xerox)",
            "Transfer Certificate (TC) & Study Certificates (Min 7 yrs in KA)",
            "Caste & Income Certificate (SC/ST/Cat-1/2A/2B/3A/3B)",
            "371(J) Kalyana Karnataka (HK) Region Certificate (if applicable)",
            "Aadhaar Card Copy & 6 Passport-size Photographs",
          ];
          const b = document.createElement("div");
          b.className = "pda-b";
          b.innerHTML =
            `<div class="pda-back-bar"><button class="pda-back-btn" type="button">${x.backBtn}</button></div>` +
            tag(x.menuAdm + " · " + x.admSub[2]) +
            `<b>Interactive Document Checklist:</b><br><small>Tick documents you have ready:</small>` +
            `<div style="margin:6px 0;background:#ede9fe;border-radius:6px;height:8px;overflow:hidden"><div id="pda-doc-bar" style="width:0%;height:100%;background:#6d28d9;transition:width .25s"></div></div>` +
            `<div id="pda-doc-stat" style="font-size:11px;color:#4c1d95;font-weight:700;margin-bottom:6px">0 / ${docs.length} ready</div>` +
            `<div id="pda-doc-list"></div>`;
          b.querySelector(".pda-back-btn").onclick = adm;
          const listEl = b.querySelector("#pda-doc-list");
          const barEl = b.querySelector("#pda-doc-bar");
          const statEl = b.querySelector("#pda-doc-stat");
          docs.forEach(function (doc) {
            const row = document.createElement("label");
            row.style.cssText = "display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;cursor:pointer;border-bottom:1px dashed #e5e7eb";
            row.innerHTML = `<input type="checkbox" style="accent-color:#6d28d9"> <span>${doc}</span>`;
            row.querySelector("input").onchange = function () {
              const checked = listEl.querySelectorAll("input:checked").length;
              barEl.style.width = Math.round((checked / docs.length) * 100) + "%";
              statEl.textContent = `${checked} / ${docs.length} ready`;
            };
            listEl.appendChild(row);
          });
          chat.appendChild(b);
          chat.scrollTop = chat.scrollHeight;
        },
      },
      {
        icon: "💳",
        title: x.admSub[3],
        action: function () {
          let tbl = `<div class="pda-wrap"><table class="pda-table"><thead><tr><th>Department</th><th>KCET Aided</th><th>KCET Un-Aided</th><th>COMEDK</th><th>Mgmt</th><th>KCET Cut-off</th></tr></thead><tbody>`;
          DEPTS.forEach(function (d) {
            tbl += `<tr><td><b>${deptLabel(d)}</b></td><td>₹${d.fee.toLocaleString("en-IN")}</td><td>₹${(d.fee_unaided || 130956).toLocaleString("en-IN")}</td><td>₹${d.comedk.toLocaleString("en-IN")}</td><td>₹${d.mgmt.toLocaleString("en-IN")}</td><td>Rank ${d.cut.toLocaleString("en-IN")}</td></tr>`;
          });
          tbl += `</tbody></table></div>`;
          add(tag(x.menuAdm + " · " + x.admSub[3]) + "<b>Official Fees & KCET Cut-offs (pdacek.ac.in):</b>" + tbl, null, false, true);
        },
      },
      {
        icon: "📞",
        title: x.admSub[4],
        action: function () {
          add(
            tag(x.menuAdm + " · " + x.admSub[4]) +
              "<b>PDA College Admission Office:</b><br>" +
              "• <b>Dr. M. S. Aspalli (UG Admissions):</b> <a href='tel:+919449618898'>+91 9449618898</a><br>" +
              "• <b>Mr. Sangamesh (Admission Desk):</b> <a href='tel:+919986111396'>+91 9986111396</a><br>" +
              "• <b>Mrs. Monika Shah (PG & Ph.D.):</b> <a href='tel:+919035221078'>+91 9035221078</a><br>" +
              "• <b>Main Office:</b> <a href='tel:+9108472224360'>08472-224360</a> · <a href='mailto:principal@pdaengg.com'>principal@pdaengg.com</a>",
            null,
            false,
            true
          );
        },
      },
    ];

    add(
      `<b>🎓 ${x.menuAdm} (pdacek.ac.in):</b>`,
      opts,
      false,
      true
    );
  }

  function showDeptDetail(d) {
    const label = deptLabel(d);
    const lines = [
      `### 🏛️ ${label} — Admission Details`,
      `• **Head of Department (HOD):** ${d.hod} (\`${d.cabin}\`)`,
      `• **Approved Intake:** \`${d.intake} Seats / year\` (Open Seats: \`${d.open}\`)`,
      `• **KCET Govt Quota Fee:** Aided: \`₹${d.fee.toLocaleString("en-IN")}/yr\` | Un-Aided: \`₹${(d.fee_unaided || 130956).toLocaleString("en-IN")}/yr\``,
      `• **COMEDK Merit Quota Fee:** \`₹${d.comedk.toLocaleString("en-IN")} / year\` (Includes VTU Fee \`₹10,610\`)`,
      `• **Management Quota Fee:** \`₹${d.mgmt.toLocaleString("en-IN")} / year\``,
      `• **KCET Cutoff Rank:** \`Rank ${d.cut.toLocaleString("en-IN")}\` | **COMEDK Cutoff:** \`Rank ${d.comedk_cut.toLocaleString("en-IN")}\``,
      `• **Placement Package:** ${d.pkg}`,
      `• **Top Recruiting Companies:** ${d.recruiters}`,
      `• **Department Laboratories:** ${d.labs}`,
      `• **Eligibility:** 2nd PUC / 10+2 with min **45% in PCM** (**40% for SC/ST/OBC** of Karnataka)`,
      `• **College Codes:** KEA KCET: \`E017 / E018\` | COMEDK: \`E095\``,
      `• **Admission Coordinators:** Dr. M. S. Aspalli (\`+91 9449618898\`), Mr. Sangamesh (\`+91 9986111396\`), Mrs. Monika Shah (\`+91 9035221078\`)`,
    ];

    addLineByLine(
      `Official Department Profile · ${d.code}`,
      lines,
      [
        { icon: "📚", title: `Open ${label} in Student Enquiry`, action: function () { stuPickScheme(d); } },
        { icon: "🔄", title: "Select Another Department", action: adm },
      ],
      `${label} has an intake of ${d.intake} seats, KCET fee starting at ${d.fee} rupees per year, Management quota fee of ${d.mgmt} rupees per year, and KCET cutoff rank ${d.cut}.`
    );
  }

  // --- 2. STUDENT ENQUIRY (Exact Tree: Departments/Schemes/Study Material, Class Timetable, Exam Timetable & Notices) ---
  function stu() {
    const x = L[lg()];
    add(
      `<b>📚 ${x.menuStu}:</b>`,
      [
        {
          icon: "🏛️",
          title: x.stuSub[0],
          action: stuDeptList,
        },
        {
          icon: "🗓️",
          title: x.stuSub[1],
          action: stuTimetableMenu,
        },
        {
          icon: "📢",
          title: x.stuSub[2],
          action: stuNoticesView,
        },
      ],
      false,
      true
    );
  }

  function showComingSoonDept(d, backAction) {
    const label = deptLabel(d);
    const csText = lg() === "kn" ? "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ" : (lg() === "hi" ? "जल्द आ रहा है" : "Coming soon");
    add(
      tag(`${label} · ${csText}`) +
        `<b>🏛️ ${label}</b><br>` +
        `<b>Status:</b> <span style="color:#d97706;font-weight:700">⏳ ${csText}</span><br>` +
        `• Currently, complete academic data & timetables are live for <b>1st Year (Sections A–R & ESC-I)</b> and <b>Artificial Intelligence & Machine Learning (AIML)</b>.<br>` +
        `• Scheme, syllabus, notes, question papers & class timetable for <b>${label}</b> are <b>${csText}</b>.<br>` +
        `• <b>HOD:</b> ${d.hod} (${d.cabin})<br>` +
        `<a href="https://www.pdacek.ac.in" target="_blank" rel="noopener" class="pda-website-btn">🌐 Visit PDA College Website</a>`,
      [
        { icon: "🤖", title: "Open Artificial Intelligence & Machine Learning (AIML)", action: function () { stuPickScheme(DEPTS[1]); } },
        { icon: "1️⃣", title: "Open 1st Year Timetable (Sections A–I / A–R)", action: firstYearTT },
        { icon: "⬅️", title: "← Back", action: backAction || stuDeptList },
      ],
      false,
      true
    );
  }

  function stuDeptList() {
    const x = L[lg()];
    const bars = [
      {
        icon: "1️⃣",
        title: "1st Year Common (Sections A–I / A–R & ESC-I) — Available",
        action: firstYearTT,
      },
    ];
    DEPTS.forEach(function (d) {
      const isAIML = d.code === "AIML";
      bars.push({
        icon: isAIML ? "✅" : "⏳",
        title: isAIML ? `${deptLabel(d)} — Available` : `${deptLabel(d)} — Coming Soon`,
        action: function () {
          if (isAIML) {
            stuPickScheme(d);
          } else {
            showComingSoonDept(d, stuDeptList);
          }
        },
      });
    });
    bars.push({ icon: "⬅️", title: x.backBtn, action: stu });
    add(tag(x.stuSub[0]) + "<b>Select Department (1st Year & AIML Available · Other Departments Coming Soon):</b>", bars, false, true);
  }

  function stuPickScheme(d) {
    if (d.code !== "AIML") {
      showComingSoonDept(d, stuDeptList);
      return;
    }
    const label = deptLabel(d);
    const schemes = ["2025", "2022", "2021"];
    const bars = schemes.map(function (sch) {
      return {
        icon: "📘",
        title: `${sch} Scheme — ${label}`,
        action: function () { stuSchemeMaterials(d, sch); },
      };
    });
    bars.push({ icon: "⬅️", title: "← Departments", action: stuDeptList });
    add(
      tag(`${label} · Scheme`) +
        `<b>🏛️ ${label}</b><br><b>HOD:</b> ${d.hod} (${d.cabin})<br><small>Select Scheme (2025 / 2022 / 2021):</small>`,
      bars,
      false,
      true
    );
  }


  function showAIML2025Menu(d) {
    const labelDept = deptLabel(d);
    add(
      tag("AIML · 2025 Scheme") + `<b>🏛️ ${labelDept} — 2025 Scheme:</b><br><small>Select a category to view verified academic records:</small>`,
      [
        { icon: "📘", title: "1st Sem P-Cycle Subjects (9 Subjects)", action: function () { show2025CycleSubjects("P", d); } },
        { icon: "📗", title: "2nd Sem C-Cycle Subjects (8 Subjects)", action: function () { show2025CycleSubjects("C", d); } },
        { icon: "📝", title: "📚 Subject Notes (Python & C Programming)", action: function () { showNotesSelectionMenu(d); } },
        { icon: "🗓️", title: "1st Sem Timetables (Sections G & H)", action: function () { show2025TimetableMenu(d); } },
        { icon: "⚡", title: "ESC-I Batches & Faculty Distribution", action: function () { show2025ESCBatches(d); } },
        { icon: "📐", title: "CSCED103 Development Problems (4.1–4.16)", action: function () { show2025DevResources(d); } },
        { icon: "⬅️", title: `← ${d.code} Schemes`, action: function () { stuPickScheme(d); } },
      ],
      false,
      true
    );
  }

  const SUBJECT_NOTES = {
    "KKPYP205B": [
      {
        module_number: 1,
        title: "Module 1: The way of the program & Control Structures",
        description: "Python installation, variables, expressions, operators, if-elif-else, while & for loops, functions",
        link: "/static/materials/2nd_sem_python/Python%20Programming%20Module%201.pdf"
      },
      {
        module_number: 2,
        title: "Module 2: Strings, Tuples & Lists",
        description: "String slicing, traversal, tuple immutability, list operations, matrices & comprehension",
        link: "/static/materials/2nd_sem_python/Python%20Programming%20Module%202.pdf"
      },
      {
        module_number: 3,
        title: "Module 3: Dictionaries, Numpy & Files",
        description: "Dictionary operations, numpy shape & slicing, file reading/writing and web data fetching",
        link: "/static/materials/2nd_sem_python/Python%20Programming%20Module%203.pdf"
      },
      {
        module_number: 4,
        title: "Module 4: Modules & Object-Oriented Programming",
        description: "Random/math/time modules, namespaces, classes, object instantiation & instance methods",
        link: "/static/materials/2nd_sem_python/Python%20Programming%20Module%204.pdf"
      },
      {
        module_number: 5,
        title: "Module 5: OOP Inheritance & Exception Handling",
        description: "Inheritance, polymorphism, operator overloading, try-except blocks & custom exceptions",
        link: "/static/materials/2nd_sem_python/Python%20Programming%20Module%205.pdf"
      }
    ],
    "CSPOC105": [
      {
        module_number: 1,
        title: "Module 1: Algorithms, Flowcharts & Introduction to C",
        description: "Constants, variables, data types, arithmetic/logical/bitwise operators, formatted I/O",
        link: "/static/materials/1st_sem_c/POC%20Module%201%20Notes.pdf"
      },
      {
        module_number: 2,
        title: "Module 2: Decision Making, Branching & Looping",
        description: "Conditional control (if, if-else, switch, ternary operator) and loops (while, do-while, for)",
        link: "/static/materials/1st_sem_c/POC%20Module%202%20Notes.pdf"
      },
      {
        module_number: 3,
        title: "Module 3: Arrays & String Operations",
        description: "1D & 2D arrays, matrix algebra, string declarations, reading/writing and string functions",
        link: "/static/materials/1st_sem_c/POC%20Module%203%20Notes.pdf"
      },
      {
        module_number: 4,
        title: "Module 4: Functions, Recursion & Structures",
        description: "User-defined functions, recursion, structures definition, declaration, and member access",
        link: "/static/materials/1st_sem_c/POC%20Module%204%20Notes.pdf"
      },
      {
        module_number: 5,
        title: "Module 5: Pointers & File Management",
        description: "Pointer declaration, address of variable, pointer expressions, file creation, reading & writing",
        link: "/static/materials/1st_sem_c/POC%20Module%205%20Notes.pdf"
      }
    ],
    "KKIEC104C": [
      {
        module_number: 1,
        title: "Complete Subject Notes: Introduction to Electronics & Communication",
        description: "Semiconductor diodes, bipolar junction transistors, operational amplifiers & communication systems",
        link: "/static/materials/esc/KKIEC104C_Notes_Full.pdf"
      }
    ]
  };

  function showNotesSelectionMenu(d) {
    add(
      tag("2025 Scheme · Subject Notes") +
        `<b>📚 2025 Scheme Verified Subject Notes & Study Materials:</b><br>` +
        `<small>Select an individual subject to view all module notes, downloads & syllabus:</small>`,
      [
        {
          icon: "🐍",
          title: "Python Programming (KKPYP205B) — 5 Module Notes",
          action: function () { show2025SubjectDetail("KKPYP205B", "C", d); }
        },
        {
          icon: "💻",
          title: "Programming in C (CSPOC105) — 5 Module Notes",
          action: function () { show2025SubjectDetail("CSPOC105", "P", d); }
        },
        {
          icon: "⚡",
          title: "Intro to Electronics & Communication (KKIEC104C) — Full Notes",
          action: function () { show2025SubjectDetail("KKIEC104C", "P", d); }
        },
        {
          icon: "📐",
          title: "Engineering Drawing (CSCED103) — Development Problems 4.1–4.16",
          action: function () { show2025DevResources(d); }
        },
        {
          icon: "⬅️",
          title: "← 2025 Scheme Menu",
          action: function () { showAIML2025Menu(d); }
        }
      ],
      false,
      true
    );
  }

  function show2025CycleSubjects(cycle, d) {
    const csText = lg() === "kn" ? "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ" : (lg() === "hi" ? "जल्द आ रहा है" : "Coming soon");
    fetch(`${API_BASE}/api/aiml-2025/subjects?cycle=${cycle}`)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        const subjects = (res && res.subjects) || [];
        const bars = subjects.map(function (s) {
          const isCs = s.data_status === "coming_soon";
          const hasNotes = Boolean(SUBJECT_NOTES[s.code] || (s.notes && s.notes.length > 0) || s.notes_available);
          return {
            icon: isCs ? "⏳" : (hasNotes ? "📚" : "📄"),
            title: `${s.code}: ${s.name} (${s.credits} Credits)${hasNotes ? " • 📝 Notes Available" : ""}${isCs ? " — " + csText : ""}`,
            action: function () { show2025SubjectDetail(s.code, cycle, d); },
          };
        });
        bars.push({ icon: "⬅️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } });
        add(
          tag(`AIML 2025 · ${cycle}-Cycle`) + `<b>${cycle}-Cycle Subjects (${subjects.length} Total):</b><br><small>Click any course to inspect syllabus & details:</small>`,
          bars,
          false,
          true
        );
      })
      .catch(function () {
        add("Error fetching 2025 subjects. Please try again.", [{ icon: "⬅️", title: "← Back", action: function () { showAIML2025Menu(d); } }], false, true);
      });
  }

  function show2025SubjectDetail(code, cycle, d) {
    const csText = lg() === "kn" ? "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ" : (lg() === "hi" ? "जल्द आ रहा है" : "Coming soon");
    fetch(`${API_BASE}/api/aiml-2025/syllabus/${code}`)
      .then(function (r) { return r.json(); })
      .then(function (s) {
        const notesList = (Array.isArray(s.notes) && s.notes.length > 0)
          ? s.notes
          : (SUBJECT_NOTES[code] || SUBJECT_NOTES[s.code] || []);

        let h = tag(`${s.code} · Syllabus & Notes`);
        h += `<b>${s.code}: ${s.name}</b><br>`;
        h += `<b>Scheme:</b> 2025 | <b>Credits:</b> ${s.credits} | <b>Cycle:</b> ${s.cycle} | <b>Stream:</b> ${s.stream || "CS Stream"}<br>`;
        h += `<div style="margin:8px 0;display:flex;gap:8px;flex-wrap:wrap;">`;
        h += `<a href="${API_BASE}/static/pdfs/I-II-SEM-Syllabus-2025.pdf" target="_blank" rel="noopener" class="pda-website-btn" style="font-size:11.5px;padding:5px 12px;">📄 Official 2025 Syllabus PDF</a>`;
        if (notesList.length > 0) {
          h += `<a href="#pda-notes-box" class="pda-website-btn" style="font-size:11.5px;padding:5px 12px;background:linear-gradient(135deg, #10b981, #059669);color:#fff;">📝 Notes Available (${notesList.length} Modules)</a>`;
        }
        h += `</div>`;
        h += `<b>Status:</b> ${s.data_status === "coming_soon" ? '<span style="color:#d97706;font-weight:700">⏳ ' + csText + '</span>' : '<span style="color:#10b981;font-weight:700">✅ Verified</span>'}<br>`;

        // ==========================================
        // DEDICATED NOTES SECTION BELOW SUBJECT NAME
        // ==========================================
        if (notesList.length > 0) {
          h += `<div id="pda-notes-box" style="margin:12px 0 16px 0;padding:12px 14px;background:linear-gradient(135deg, rgba(109,40,217,0.22), rgba(79,70,229,0.14));border:1.5px solid rgba(167,139,250,0.5);border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,0.22);">`;
          h += `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">`;
          h += `<div style="font-size:13.5px;font-weight:700;color:#ddd6fe;display:flex;align-items:center;gap:6px;">`;
          h += `<span>📝</span> <span>Official Study Notes & Module Handouts</span>`;
          h += `</div>`;
          h += `<span style="font-size:10.5px;background:#10b981;color:#fff;padding:2px 8px;border-radius:12px;font-weight:700;">Verified</span>`;
          h += `</div>`;
          h += `<div style="font-size:11px;color:#cbd5e1;margin-bottom:10px;">Module-wise study materials, lecture summaries & exam notes for <b>${s.name}</b>:</div>`;
          h += `<div style="display:flex;flex-direction:column;gap:7px;">`;
          notesList.forEach(function (n, idx) {
            h += `<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(15,23,42,0.7);padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);gap:8px;">`;
            h += `<div style="flex:1;">`;
            h += `<div style="font-size:12px;font-weight:700;color:#f8fafc;">${n.title || ('Module ' + (n.module_number || idx + 1) + ' Notes')}</div>`;
            if (n.description) {
              h += `<div style="font-size:10.5px;color:#94a3b8;margin-top:2px;">${n.description}</div>`;
            }
            h += `</div>`;
            h += `<a href="${API_BASE}${n.link}" target="_blank" rel="noopener" class="pda-website-btn" style="white-space:nowrap;padding:5px 11px;font-size:11px;background:linear-gradient(135deg, #10b981, #059669);color:#fff;border-radius:6px;text-decoration:none;font-weight:700;display:inline-flex;align-items:center;gap:4px;">📥 Download PDF</a>`;
            h += `</div>`;
          });
          h += `</div>`;
          h += `</div>`;
        } else {
          h += `<div style="margin:10px 0 14px 0;padding:10px 12px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.15);border-radius:10px;">`;
          h += `<div style="font-size:11.5px;color:#94a3b8;">📝 <b>Subject Notes:</b> Handouts & lecture notes for this course are uploaded step-by-step as released by the department. You can inspect the prescribed syllabus & textbooks below.</div>`;
          h += `</div>`;
        }

        if (s.data_status === "coming_soon") {
          h += `• <b>Syllabus Details:</b> ${csText}<br>`;
          h += `<a href="https://www.pdacek.ac.in" target="_blank" rel="noopener" class="pda-website-btn">🌐 Visit PDA College Website</a>`;
        } else {
          // Objectives
          if (s.objectives && s.objectives.status === "coming_soon") {
            h += `<b>Course Objectives:</b> <i>${csText}</i><br><br>`;
          } else if (Array.isArray(s.objectives) && s.objectives.length > 0) {
            h += `<b>Course Objectives:</b><br>`;
            s.objectives.forEach(function (obj) { h += `• ${obj}<br>`; });
            h += `<br>`;
          }

          // Modules
          if (Array.isArray(s.modules) && s.modules.length > 0) {
            h += `<b>Modules & Lecture Units:</b><br>`;
            s.modules.forEach(function (m) {
              var mNote = notesList.find(function (n) { return n.module_number === m.module_number; });
              h += `<b>Module ${m.module_number}: ${m.title}</b> (${m.hours || 0} Hours)`;
              if (mNote && mNote.link) {
                h += ` &nbsp;<a href="${API_BASE}${mNote.link}" target="_blank" rel="noopener" style="font-size:11px;color:#a855f7;text-decoration:none;font-weight:700;">[📥 Module ${m.module_number} Notes PDF]</a>`;
              }
              h += `<br>`;
              if (m.topics && m.topics.length > 0) {
                h += `<small style="color:var(--mu)">${m.topics.join("; ")}</small><br>`;
              }
            });
            h += `<br>`;
          }

          // Lab Experiments
          if (Array.isArray(s.lab_experiments) && s.lab_experiments.length > 0) {
            h += `<b>Lab Experiments:</b><br>`;
            s.lab_experiments.forEach(function (exp) {
              h += `• ${typeof exp === "string" ? exp : exp.title || JSON.stringify(exp)}<br>`;
            });
            h += `<br>`;
          }

          // Textbooks
          if (Array.isArray(s.textbooks) && s.textbooks.length > 0) {
            h += `<b>Textbooks:</b><br>`;
            s.textbooks.forEach(function (tb) { h += `• ${tb}<br>`; });
            h += `<br>`;
          }

          // References
          if (Array.isArray(s.references) && s.references.length > 0) {
            h += `<b>Reference Books:</b><br>`;
            s.references.forEach(function (ref) { h += `• ${ref}<br>`; });
            h += `<br>`;
          }

          // Question Paper Pattern
          if (s.question_paper_pattern) {
            if (s.question_paper_pattern.status === "coming_soon") {
              h += `<b>SEE Pattern:</b> <i>${csText}</i><br>`;
            } else if (typeof s.question_paper_pattern === "string") {
              h += `<b>SEE Pattern:</b> ${s.question_paper_pattern}<br>`;
            }
          }
        }

        add(
          h,
          [
            { icon: "📝", title: "📚 View All Subject Notes", action: function () { showNotesSelectionMenu(d); } },
            { icon: "⬅️", title: `← Back to ${cycle}-Cycle`, action: function () { show2025CycleSubjects(cycle, d); } },
            { icon: "🏛️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } },
          ],
          false,
          true
        );
      })
      .catch(function () {
        add("Error loading subject details.", [{ icon: "⬅️", title: "← Back", action: function () { show2025CycleSubjects(cycle, d); } }], false, true);
      });
  }

  function show2025TimetableMenu(d) {
    add(
      tag("AIML 2025 · 1st Sem Timetables") + `<b>🗓️ 1st Sem Timetable (w.e.f. 07-09-2026):</b><br><small>Select your section:</small>`,
      [
        { icon: "🔠", title: "Section G (AIML — Room 001)", action: function () { show2025SectionTT("G", d); } },
        { icon: "🔠", title: "Section H (AIML — Room 002)", action: function () { show2025SectionTT("H", d); } },
        { icon: "⚡", title: "ESC-I Batches & Faculty Distribution", action: function () { show2025ESCBatches(d); } },
        { icon: "⬅️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } },
      ],
      false,
      true
    );
  }

  function show2025SectionTT(sec, d) {
    const secLetter = sec.toUpperCase();
    const pdfPage = secLetter === "G" ? 7 : (secLetter === "H" ? 8 : 1);
    fetch(`${API_BASE}/api/aiml-2025/timetable?section=${sec}`)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        const days = res.schedule || {};
        let h = tag(`Section ${sec} · Timetable`);
        h += `<b>🗓️ 1st Sem AIML — Section ${sec} (Room ${res.room || "TBA"}):</b><br>`;
        h += `<small>Academic Year 2026-27 · Effective 07-09-2026</small><br><br>`;
        
        // PDF download & high-res image buttons
        h += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">`;
        h += `<a href="${API_BASE}/static/pdfs/BE_Time_Table_1_SEM__26-27_Draft2.pdf" target="_blank" rel="noopener" class="pda-website-btn">📄 Open Original PDF Document</a>`;
        h += `<a href="${API_BASE}/static/timetables/timetable_section_${sec.toLowerCase()}.png" target="_blank" rel="noopener" class="pda-website-btn" style="background:linear-gradient(135deg, #10b981, #059669);">🔍 View Full Image</a>`;
        h += `</div>`;

        // Official Scanned Image
        h += `<div style="margin:10px 0 14px 0;border-radius:12px;overflow:hidden;border:1px solid var(--bd);background:rgba(0,0,0,0.25);">`;
        h += `<a href="${API_BASE}/static/timetables/timetable_section_${sec.toLowerCase()}.png" target="_blank" title="Click to view full-size official timetable">`;
        h += `<img src="${API_BASE}/static/timetables/timetable_section_${sec.toLowerCase()}.png" alt="Official Section ${sec} Timetable Sheet" style="width:100%;height:auto;display:block;border-radius:10px;" />`;
        h += `</a>`;
        h += `<div style="font-size:11px;color:var(--mu);padding:5px 8px;text-align:center;">🔍 Official Timetable Draft (Page ${pdfPage}) — Tap image to open full resolution</div>`;
        h += `</div>`;

        // Clean Interactive Day-by-Day Table
        h += `<b>📅 Day-by-Day Class Schedule:</b><br>`;
        h += `<div class="pda-table-wrap"><table class="pda-table"><thead><tr><th>Day</th><th>P1 (9-10)</th><th>P2 (10-11)</th><th>P3 (11:15-12:15)</th><th>P4 (12:15-1:15)</th><th>P5 (2:15-3:15)</th><th>P6 (3:15-4:15)</th><th>P7 (4:15-5:15)</th></tr></thead><tbody>`;
        
        ["MON", "TUE", "WED", "THU", "FRI", "SAT"].forEach(function (dayKey) {
          const periods = (days[dayKey] && days[dayKey].periods) || [];
          h += `<tr><td><b>${dayKey}</b></td>`;
          for (let pNum = 1; pNum <= 7; pNum++) {
            const p = periods.find(function (it) { return it.period === pNum; });
            if (p && p.subject_code) {
              h += `<td><b>${p.subject_code}</b><br><small style="color:var(--mu)">${p.faculty || ""}</small></td>`;
            } else {
              h += `<td style="color:var(--mu)">—</td>`;
            }
          }
          h += `</tr>`;
        });
        h += `</tbody></table></div>`;

        // Faculty list
        if (res.faculty && res.faculty.length > 0) {
          h += `<b>Faculty Allocation:</b><br>`;
          res.faculty.forEach(function (fac) {
            h += `• <b>${fac.subject_code}:</b> ${fac.faculty_name} (${fac.initials})<br>`;
          });
        }

        add(
          h,
          [
            { icon: "📄", title: "View Original Timetable PDF", action: function () { window.open(`${API_BASE}/static/pdfs/BE_Time_Table_1_SEM__26-27_Draft2.pdf`, "_blank"); } },
            { icon: "⬅️", title: "← Other Sections", action: function () { show2025TimetableMenu(d); } },
            { icon: "🏛️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } },
          ],
          false,
          true
        );
      })
      .catch(function () {
        add("Error fetching timetable.", [{ icon: "⬅️", title: "← Back", action: function () { show2025TimetableMenu(d); } }], false, true);
      });
  }

  function show2025ESCBatches(d) {
    fetch(`${API_BASE}/api/aiml-2025/esc-batches`)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        let h = tag("ESC-I Batches");
        h += `<b>⚡ Emerging Science Course - I (ESC-I) Batches:</b><br>`;
        h += `<small>BE 1st Semester 2026-27 Draft Timetable (Page 19)</small><br><br>`;
        
        // PDF & Image links
        h += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">`;
        h += `<a href="${API_BASE}/static/pdfs/BE_Time_Table_1_SEM__26-27_Draft2.pdf" target="_blank" rel="noopener" class="pda-website-btn">📄 Open Original Timetable PDF</a>`;
        h += `<a href="${API_BASE}/static/timetables/esc_batches_page19.png" target="_blank" rel="noopener" class="pda-website-btn" style="background:linear-gradient(135deg, #10b981, #059669);">🔍 View Page 19 Image</a>`;
        h += `</div>`;

        // Official Scanned Image
        h += `<div style="margin:10px 0 14px 0;border-radius:12px;overflow:hidden;border:1px solid var(--bd);background:rgba(0,0,0,0.25);">`;
        h += `<a href="${API_BASE}/static/timetables/esc_batches_page19.png" target="_blank" title="Click to view full-size sheet">`;
        h += `<img src="${API_BASE}/static/timetables/esc_batches_page19.png" alt="Official ESC-I Sheet" style="width:100%;height:auto;display:block;border-radius:10px;" />`;
        h += `</a>`;
        h += `<div style="font-size:11px;color:var(--mu);padding:5px 8px;text-align:center;">🔍 Official ESC-I Allocation (Page 19) — Tap image to open full resolution</div>`;
        h += `</div>`;

        h += `<div class="pda-table-wrap"><table class="pda-table"><thead><tr><th>Batch</th><th>Course Title</th><th>Faculty</th><th>Room</th></tr></thead><tbody>`;
        const courses = res.courses || [];
        courses.forEach(function (c) {
          const cName = c.course_title || c.course_name || '';
          const batches = c.batches || [];
          batches.forEach(function (b) {
            h += `<tr><td><b>${b.batch || b.batch_id}</b></td><td>${cName} (${c.course_code})</td><td>${b.faculty}</td><td>${b.room}</td></tr>`;
          });
        });
        h += `</tbody></table></div>`;

        add(
          h,
          [
            { icon: "📄", title: "View Original Timetable PDF", action: function () { window.open(`${API_BASE}/static/pdfs/BE_Time_Table_1_SEM__26-27_Draft2.pdf`, "_blank"); } },
            { icon: "⬅️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } },
          ],
          false,
          true
        );
      })
      .catch(function () {
        add("Error fetching ESC batches.", [{ icon: "⬅️", title: "← Back", action: function () { showAIML2025Menu(d); } }], false, true);
      });
  }

  function show2025DevResources(d) {
    fetch(`${API_BASE}/api/aiml-2025/resources/development`)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        let h = tag("CSCED103 · Development");
        h += `<b>📐 Computer Aided Engineering Drawing (CSCED103):</b><br>`;
        h += `<small>Development of Lateral Surfaces — Problems 4.1 to 4.16</small><br><br>`;
        
        const problems = res.problems || [];
        problems.forEach(function (p) {
          h += `<b>Problem ${p.problem_number}:</b> ${p.title} <small style="color:var(--mu)">(PDF Page ${p.pdf_page})</small><br>`;
        });

        add(
          h,
          [
            { icon: "⬅️", title: "← 2025 Scheme Menu", action: function () { showAIML2025Menu(d); } },
          ],
          false,
          true
        );
      })
      .catch(function () {
        add("Error fetching development resources.", [{ icon: "⬅️", title: "← Back", action: function () { showAIML2025Menu(d); } }], false, true);
      });
  }

  function stuSchemeMaterials(d, sch) {
    if (d.code !== "AIML") {
      showComingSoonDept(d, stuDeptList);
      return;
    }
    if (sch === "2025") {
      showAIML2025Menu(d);
      return;
    }
    const x = L[lg()];
    const labelDept = deptLabel(d);
    const icons = ["📘", "📓", "📝", "📄", "🗓️"];
    const keys = ["syllabus", "notes", "pyq", "vtu_model", "timetable"];
    const bars = x.matSub.map(function (label, idx) {
      return {
        icon: icons[idx],
        title: `${label} (${d.code} · ${sch} Scheme)`,
        action: function () {
          if (keys[idx] === "timetable") {
            add(
              tag(`AIML · ${sch} Scheme · Class Timetable`) + "<b>Select AIML Semester & Section:</b>",
              [
                { icon: "🔠", title: "AIML 3rd Sem — Section A", action: function () { showAIMLSection(d, "3", "A"); } },
                { icon: "🔠", title: "AIML 3rd Sem — Section B", action: function () { showAIMLSection(d, "3", "B"); } },
                { icon: "🔠", title: "AIML 5th Sem — Section A", action: function () { showAIMLSection(d, "5", "A"); } },
                { icon: "🔠", title: "AIML 5th Sem — Section B", action: function () { showAIMLSection(d, "5", "B"); } },
                { icon: "🗓️", title: "1st Year Common (Sections A–I / A–R)", action: firstYearTT },
              ],
              false,
              true
            );
            return;
          }
          fetch(`${API_BASE}/api/study-materials?dept=${encodeURIComponent(d.code)}&scheme=${encodeURIComponent(sch)}&category=${encodeURIComponent(keys[idx])}`)
            .then(function (r) { return r.json(); })
            .then(function (res) {
              const items = (res && res.materials) || [];
              if (items.length > 0) {
                let html = tag(`${d.code} · ${sch} · ${label}`) + `<b>${labelDept} (${sch} Scheme) — ${label}:</b><br>`;
                items.forEach(function (it) {
                  html += `• <b>${it.title}:</b> ${it.content} ${it.link ? `<a href="${it.link}" target="_blank">Open Link</a>` : ""}<br>`;
                });
                add(html, [{ icon: "⬅️", title: `Back to ${d.code} (${sch})`, action: function () { stuSchemeMaterials(d, sch); } }], false, true);
              } else {
                triggerSearchQuery(`AIML ${label} subjects and units`);
              }
            })
            .catch(function () {
              triggerSearchQuery(`AIML ${label} subjects and units`);
            });
        },
      };
    });
    bars.push({ icon: "⬅️", title: `← ${d.code} Schemes`, action: function () { stuPickScheme(d); } });
    add(tag(`${d.code} · ${sch} Scheme`) + `<b>${labelDept} (${sch} Scheme) — Study Material:</b>`, bars, false, true);
  }

  function stuTimetableMenu() {
    const x = L[lg()];
    add(
      tag(x.stuSub[1]) + `<b>🗓️ ${x.stuSub[1]}:</b>`,
      [
        {
          icon: "1️⃣",
          title: x.ttSub[0],
          action: firstYearTT,
        },
        {
          icon: "🏛️",
          title: x.ttSub[1],
          action: function () {
            const deptBars = DEPTS.map(function (d) {
              const isAIML = d.code === "AIML";
              return {
                icon: isAIML ? "✅" : "⏳",
                title: isAIML ? `${deptLabel(d)} — Available` : `${deptLabel(d)} — Coming Soon`,
                action: function () {
                  if (isAIML) {
                    add(
                      tag("AIML Class Timetables") + "<b>Select AIML Semester & Section:</b>",
                      [
                        { icon: "🔠", title: "AIML 3rd Sem — Section A", action: function () { showAIMLSection(d, "3", "A"); } },
                        { icon: "🔠", title: "AIML 3rd Sem — Section B", action: function () { showAIMLSection(d, "3", "B"); } },
                        { icon: "🔠", title: "AIML 5th Sem — Section A", action: function () { showAIMLSection(d, "5", "A"); } },
                        { icon: "🔠", title: "AIML 5th Sem — Section B", action: function () { showAIMLSection(d, "5", "B"); } },
                      ],
                      false,
                      true
                    );
                  } else {
                    showComingSoonDept(d, stuTimetableMenu);
                  }
                },
              };
            });
            deptBars.push({ icon: "⬅️", title: "← Back", action: stuTimetableMenu });
            add(tag(x.ttSub[1]) + "<b>All Departments — Class Timetables (1st Year & AIML Available · Others Coming Soon):</b>", deptBars, false, true);
          },
        },
        {
          icon: "🤖",
          title: x.ttSub[2],
          action: function () {
            const aiml = DEPTS.find(function (d) { return d.code === "AIML"; }) || DEPTS[1];
            add(
              tag(x.ttSub[2]) + "<b>Select AIML 3rd Sem Section:</b>",
              [
                { icon: "🔠", title: "AIML 3rd Sem — Section A", action: function () { showAIMLSection(aiml, "3", "A"); } },
                { icon: "🔠", title: "AIML 3rd Sem — Section B", action: function () { showAIMLSection(aiml, "3", "B"); } },
                { icon: "⬅️", title: "← Back", action: stuTimetableMenu },
              ],
              false,
              true
            );
          },
        },
        {
          icon: "🧠",
          title: x.ttSub[3],
          action: function () {
            const aiml = DEPTS.find(function (d) { return d.code === "AIML"; }) || DEPTS[1];
            add(
              tag(x.ttSub[3]) + "<b>Select AIML 5th Sem Section:</b>",
              [
                { icon: "🔠", title: "AIML 5th Sem — Section A", action: function () { showAIMLSection(aiml, "5", "A"); } },
                { icon: "🔠", title: "AIML 5th Sem — Section B", action: function () { showAIMLSection(aiml, "5", "B"); } },
                { icon: "⬅️", title: "← Back", action: stuTimetableMenu },
              ],
              false,
              true
            );
          },
        },
        {
          icon: "👨‍🏫",
          title: "Teacher Timetable — AIML Faculty (Available)",
          action: function () { stfDeptFacultyList(DEPTS[1]); },
        },
        { icon: "⬅️", title: x.backBtn, action: stu },
      ],
      false,
      true
    );
  }

  function stuNoticesView() {
    const x = L[lg()];
    fetch(`${API_BASE}/api/notices`)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        const list = (res && res.notices) || [];
        let html = tag(x.stuSub[2]) + `<b>📢 ${x.stuSub[2]} (pdacek.ac.in):</b><br><br>`;
        list.forEach(function (n) {
          html += `<div style="padding:8px 10px;margin-bottom:6px;background:#f5f3ff;border-left:3px solid #6d28d9;border-radius:6px">` +
                  `<b>${n.title}</b> <small style="color:#6d28d9">[${n.category || "Notice"} · ${n.date || ""}]</small><br>` +
                  `<span>${n.body}</span></div>`;
        });
        add(html, [{ icon: "⬅️", title: "← Back to Student Enquiry", action: stu }], false, true);
      })
      .catch(function () {
        triggerSearchQuery("Latest college notifications circulars and exam dates");
      });
  }

  function selectSem(d) {
    stuPickScheme(d);
  }

  function showSemResources(d, sem) {
    stuSchemeMaterials(d, "2022");
  }

  function showAIMLSection(d, sem, sec) {
    const s = AIML_TT[sem][sec];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let facHtml = '<div class="pda-wrap"><table class="pda-table"><thead><tr><th>Code</th><th>Course Title</th><th>Hrs (L+T)</th><th>Faculty</th></tr></thead><tbody>';
    s.courses.forEach(function (c) {
      facHtml += '<tr><td><b>' + c.code + '</b></td><td>' + c.title + '</td><td>' + c.l + '+' + c.t + '</td><td>' + c.faculty + '</td></tr>';
    });
    facHtml += '</tbody></table></div>';

    let ttHtml = '<div class="pda-wrap" style="overflow-x:auto"><table class="pda-table"><thead><tr><th>Day</th>';
    for (let pi = 1; pi <= 7; pi++) {
      ttHtml += '<th>P' + pi + '</th>';
    }
    ttHtml += '</tr></thead><tbody>';
    days.forEach(function (day) {
      const row = s.schedule[day] || ["–","–","–","–","–","–","–"];
      ttHtml += '<tr><td><b>' + day.toUpperCase() + '</b></td>';
      row.forEach(function (cell) {
        const lc = cell.toLowerCase();
        const bg = cell === "–" ? "color:#999" :
                   lc.includes("lab") || lc.includes("mini-proj") ? "background:#f0fdf4;color:#166534" :
                   lc.includes("coe") ? "background:#fef9c3;color:#854d0e" :
                   lc.includes("aec") || lc.includes("cp") ? "background:#f5f3ff;color:#5b21b6" :
                   lc.includes("nss") || lc.includes("co-curricular") ? "background:#fff7ed;color:#9a3412" :
                   "background:#f0f9ff;color:#0c4a6e";
        ttHtml += '<td style="font-size:11px;padding:4px 3px;' + bg + '">' + cell + '</td>';
      });
      ttHtml += '</tr>';
    });
    ttHtml += '</tbody></table></div>';

    const otherSec = sec === "A" ? "B" : "A";
    const seenT = {};
    const teacherOpts = [];
    s.courses.forEach(function (c) {
      c.faculty.split("/").forEach(function (fn) {
        const t = T.find(function (x) { return x.d === "AIML" && x.n.toLowerCase() === fn.trim().toLowerCase(); });
        if (t && !seenT[t.n]) {
          seenT[t.n] = true;
          teacherOpts.push({ icon: "👤", title: t.n + " — Personal Timetable", action: function () { loc(t); } });
        }
      });
    });
    const navOpts = teacherOpts.concat([
      { icon: "🔠", title: `Switch to Section ${otherSec} (${otherSec}-SECTION)`, action: function () { showAIMLSection(d, sem, otherSec); } },
      { icon: "📘", title: `Back to AIML · Sem ${sem} Resources`, action: function () { showSemResources(d, sem); } },
      { icon: "📅", title: "Select Another AIML Semester", action: function () { selectSem(d); } },
    ]);

    const imgName = 'timetable_aiml_' + sem + sec.toLowerCase() + '.png';
    const pdfName = 'AIML ' + (sem === '3' ? 'III' : 'V') + ' ' + sec + ' SECTION TIME_TABLE_2025-26(ODD)-1.pdf';
    const pdfBtnHtml = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 12px 0;">' +
      '<a href="' + API_BASE + '/static/pdfs/' + encodeURIComponent(pdfName) + '" target="_blank" rel="noopener" class="pda-website-btn">📄 Open Original PDF Document</a>' +
      '<a href="' + API_BASE + '/static/timetables/' + imgName + '" target="_blank" rel="noopener" class="pda-website-btn" style="background:linear-gradient(135deg, #10b981, #059669);">🔍 View High-Res Scanned Sheet</a>' +
      '</div>';
    const imgHtml = '<div style="margin:10px 0 14px 0;border-radius:12px;overflow:hidden;border:1px solid var(--bd);background:rgba(0,0,0,0.25);">' +
      '<a href="' + API_BASE + '/static/timetables/' + imgName + '" target="_blank" title="Click to view full-size official timetable">' +
      '<img src="' + API_BASE + '/static/timetables/' + imgName + '" alt="Official Timetable Sheet" style="width:100%;height:auto;display:block;border-radius:10px;" />' +
      '</a>' +
      '<div style="font-size:11px;color:var(--mu);padding:5px 8px;text-align:center;">🔍 Official Timetable Scanned Sheet — Tap image to open full resolution</div>' +
      '</div>';

    add(
      tag(`AIML · Sem ${sem} · Section ${sec} Official Timetable`) +
        '<h3>📋 ' + s.title + '</h3>' +
        '<b>Department:</b> Artificial Intelligence & Machine Learning (AIML)<br>' +
        '<b>W.E.F:</b> ' + s.wef + ' &nbsp;|&nbsp; <b>Lecture Hall:</b> <code>' + s.room + '</code><br>' +
        '<b>Class Coordinator:</b> <b>' + s.coordinator + '</b><br><br>' +
        pdfBtnHtml +
        imgHtml +
        '<b>📚 Courses & Assigned Faculty:</b>' + facHtml +
        '<br><b>📅 Weekly Schedule (Mon–Sat, Periods 1–7):</b>' +
        '<br><small style="color:#6d28d9">P1: 9:00–10:00 · P2: 10:00–11:00 · P3: 11:15–12:15 · P4: 12:15–1:15 · Lunch: 1:15–2:15 · P5: 2:15–3:15 · P6: 3:15–4:15 · P7: 4:15–5:15</small>' +
        ttHtml,
      navOpts,
      false,
      true
    );
  }

  function firstYearTT() {
    var sections = Object.keys(FY_DATA);
    var opts = sections.map(function (sec) {
      var s = FY_DATA[sec];
      return {
        icon: "🔠",
        title: "Section " + sec + " — " + s.dept + " (" + s.room + ")",
        action: (function (k) { return function () { showFYSection(k); }; })(sec),
      };
    });
    opts.push({
      icon: "🔬",
      title: "ESC-I (Engineering Science Courses - I) Batch & Room List",
      action: showESC,
    });
    opts.push({
      icon: "⬅️",
      title: "Back to Student Enquiry",
      action: stu,
    });
    add(
      "<b>🗓️ B.E. 1st Year – 1st Semester Timetable (w.e.f. 07.09.2026)</b><br><small>Select your section for full schedule & faculty list:</small>",
      opts,
      false,
      true
    );
  }

  function showFYSection(sec) {
    var s = FY_DATA[sec];
    var days = ["Mon","Tue","Wed","Thu","Fri","Sat"];

    var facHtml = '<div class="pda-wrap"><table class="pda-table"><thead><tr><th>Code</th><th>Subject</th><th>Faculty</th><th>Dept.</th></tr></thead><tbody>';
    s.faculties.forEach(function (f) {
      facHtml += '<tr><td><b>' + f.code + '</b></td><td>' + f.title + '</td><td>' + f.faculty + '</td><td>' + f.fdept + '</td></tr>';
    });
    facHtml += '</tbody></table></div>';

    var ttHtml = '<div class="pda-wrap" style="overflow-x:auto"><table class="pda-table"><thead><tr><th>Day</th>';
    for (var pi = 1; pi <= 7; pi++) {
      ttHtml += '<th>P' + pi + '</th>';
    }
    ttHtml += '</tr></thead><tbody>';
    days.forEach(function (day) {
      var row = s.schedule[day] || ["–","–","–","–","–","–","–"];
      ttHtml += '<tr><td><b>' + day + '</b></td>';
      row.forEach(function (cell) {
        var bg = cell === "–" ? "color:#999" : cell.toLowerCase().includes("lab") ? "background:#f0fdf4;color:#166534" :
                  cell.toLowerCase().includes("coe") ? "background:#fef9c3;color:#854d0e" :
                  cell.toLowerCase().includes("library") ? "background:#f5f3ff;color:#5b21b6" :
                  cell.toLowerCase().includes("esc") ? "background:#ffe4e6;color:#9f1239" :
                  cell.toLowerCase().includes("idt") ? "background:#fff7ed;color:#9a3412" :
                  "background:#f0f9ff;color:#0c4a6e";
        ttHtml += '<td style="font-size:11px;padding:4px 3px;' + bg + '">' + cell + '</td>';
      });
      ttHtml += '</tr>';
    });
    ttHtml += '</tbody></table></div>';

    var navOpts = [
      { icon: "🔄", title: "View Another 1st Year Section (A–R)", action: firstYearTT },
      { icon: "📚", title: "Back to Student Enquiry", action: stu },
    ];

    var fyImgHtml = '';
    var fyPdfHtml = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 12px 0;">' +
      '<a href="' + API_BASE + '/static/pdfs/BE_Time_Table_1_SEM__26-27_Draft2.pdf" target="_blank" rel="noopener" class="pda-website-btn">📄 Open Original Timetable PDF</a>';
    if (sec === 'G' || sec === 'H') {
      var secLower = sec.toLowerCase();
      fyPdfHtml += '<a href="' + API_BASE + '/static/timetables/timetable_section_' + secLower + '.png" target="_blank" rel="noopener" class="pda-website-btn" style="background:linear-gradient(135deg, #10b981, #059669);">🔍 View Scanned Sheet</a>';
      fyImgHtml = '<div style="margin:10px 0 14px 0;border-radius:12px;overflow:hidden;border:1px solid var(--bd);background:rgba(0,0,0,0.25);">' +
        '<a href="' + API_BASE + '/static/timetables/timetable_section_' + secLower + '.png" target="_blank" title="Click to view full-size official timetable">' +
        '<img src="' + API_BASE + '/static/timetables/timetable_section_' + secLower + '.png" alt="Official Section ' + sec + ' Timetable Sheet" style="width:100%;height:auto;display:block;border-radius:10px;" />' +
        '</a>' +
        '<div style="font-size:11px;color:var(--mu);padding:5px 8px;text-align:center;">🔍 Official Timetable Scanned Sheet — Tap image to open full resolution</div>' +
        '</div>';
    }
    fyPdfHtml += '</div>';

    add(
      tag("1st Year Sem 1 Official Timetable") +
        '<h3>📋 Section ' + sec + ' — ' + s.dept + '</h3>' +
        '<b>Stream:</b> ' + s.stream + '<br>' +
        '<b>Classroom:</b> ' + s.room + '<br><br>' +
        fyPdfHtml +
        fyImgHtml +
        '<b>📚 Subjects & Assigned Faculty:</b>' + facHtml +
        '<br><b>📅 Weekly Schedule (Mon–Sat, Periods 1–7):</b>' +
        '<br><small style="color:#6d28d9">P1:09:00 · P2:10:00 · P3:11:15 · P4:12:15 · Break:13:15–14:00 · P5:14:00 · P6:15:00 · P7:16:00</small>' +
        ttHtml,
      navOpts,
      false,
      true
    );
  }

  function showESC() {
    var html = tag("1st Year ESC-I Batches") + '<h3>🔬 ESC-I: Engineering Science Courses - I</h3>';
    html += '<small>Batch-wise Faculty & Room allocation:</small><br><br>';
    FY_ESC.forEach(function (course) {
      html += '<b>' + course.code + ' — ' + course.title + '</b><br>';
      html += '<div class="pda-wrap"><table class="pda-table"><thead><tr><th>Batch</th><th>Faculty</th><th>Room</th></tr></thead><tbody>';
      course.batches.forEach(function (b) {
        html += '<tr><td>' + b.batch + '</td><td>' + b.faculty + '</td><td>' + b.room + '</td></tr>';
      });
      html += '</tbody></table></div><br>';
    });
    add(html, [{ icon: "🔄", title: "Back to Student Enquiry", action: stu }], false, true);
  }

  // --- 3. STAFF SECTION (Faculty list -> Departments -> Respective Faculty -> Timetable & Live Status, Find a Teacher) ---
  function stf() {
    const x = L[lg()];
    add(
      `<b>👨‍🏫 ${x.menuStf}:</b>`,
      [
        {
          icon: "📖",
          title: x.stfSub[0], // Faculty list
          action: stfFacultyMenu,
        },
        {
          icon: "📅",
          title: x.stfSub[2], // Staff timetable
          action: stfStaffTimetable,
        },
        {
          icon: "📝",
          title: x.stfSub[3], // Post a notice
          action: stfPostNotice,
        },
      ],
      false,
      true
    );
  }

  function stfFacultyMenu() {
    const x = L[lg()];
    add(
      tag(x.menuStf + " · " + x.stfSub[0]) +
        "<b>👨‍🏫 Faculty List & Live Teacher Locator:</b><br>" +
        "<small>Select <b>Departments</b> to view respective faculty from each department separately, or use <b>Find a teacher</b> to insert any name directly:</small>",
      [
        {
          icon: "🏛️",
          title: "Departments (All Department Names)",
          action: stfDeptList,
        },
        {
          icon: "🔍",
          title: "Find a teacher (Insert their name)",
          action: stfInsertTeacherName,
        },
        {
          icon: "👤",
          title: "All Available Faculty (Quick List)",
          action: stfAllFacultyList,
        },
        {
          icon: "⬅️",
          title: "← " + x.menuStf,
          action: stf,
        },
      ],
      false,
      true
    );
  }

  function stfDeptList() {
    const x = L[lg()];
    const deptBars = [
      {
        icon: "🤖",
        title: "Artificial Intelligence & Machine Learning (AIML) — Faculty List (Available)",
        action: function () { stfDeptFacultyList(DEPTS[1]); },
      },
      {
        icon: "1️⃣",
        title: "1st Year (Basic Sciences & Humanities) — Faculty List (Available)",
        action: stfFYFacultyList,
      },
    ];

    DEPTS.forEach(function (d) {
      if (d.code === "AIML") return;
      deptBars.push({
        icon: "⏳",
        title: `${deptLabel(d)} — Coming Soon`,
        action: function () { stfDeptFacultyList(d); },
      });
    });

    deptBars.push({ icon: "⬅️", title: "← Faculty Menu", action: stfFacultyMenu });
    add(
      tag("Departments · Faculty List") +
        "<b>Select Department to view respective faculty names & timetables:</b><br><small>AIML & 1st Year available · Other departments will be updated soon.</small>",
      deptBars,
      false,
      true
    );
  }

  function stfDeptFacultyList(d) {
    const x = L[lg()];
    const label = deptLabel(d);

    if (d.code === "AIML") {
      // Official AIML Faculty List in exact order
      const aimlOrder = [
        "Dr. Basavaraj S. Mathapati",
        "Dr. Nandini P",
        "Prof. Rajashekhar B",
        "Prof. Priyanka Devani",
        "Prof. Sowmya Gaitond",
        "Prof. Mallinath Swamy",
        "Dr. Kaveri Kori",
        "Prof. Ashwini Hatti",
        "Prof. Sonali M",
        "Prof. Neha A",
        "Prof. Savitha P",
        "Prof. Laxmi J",
        "Prof. Santoshi P",
        "Dr. Sharanamma H",
        "Prof. Shreya G",
        "Prof. Chandrakant Biradar",
      ];

      const bars = [];
      aimlOrder.forEach(function (name) {
        const t = T.find(function (item) {
          return item.n.toLowerCase().indexOf(name.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "")) !== -1;
        });
        if (t) {
          bars.push({
            icon: "👤",
            title: getFacultyBarSummary(t),
            action: function () { loc(t); },
          });
        } else {
          bars.push({
            icon: "👤",
            title: `${name} — AIML Dept · 🟢 In Cabin`,
            action: function () {
              add(
                tag("AIML Faculty Profile") +
                  `<h3>👨‍🏫 ${name}</h3>` +
                  `• <b>Department:</b> Artificial Intelligence & Machine Learning (AIML)<br>` +
                  `• <b>Location:</b> AIML Dept, Zen AI Block, Faculty Cabin<br>` +
                  `• <b>Timetable:</b> Will be updated soon.`,
                [{ icon: "⬅️", title: "← AIML Faculty List", action: function () { stfDeptFacultyList(d); } }],
                false,
                true
              );
            },
          });
        }
      });

      bars.push({
        icon: "🔍",
        title: "Find a teacher in AIML (Insert name)",
        action: stfInsertTeacherName,
      });
      bars.push({
        icon: "⬅️",
        title: "← All Departments",
        action: stfDeptList,
      });

      add(
        tag("AIML · Official Faculty List") +
          `<h3>🤖 ${label} — Faculty Directory</h3>` +
          `<b>Head of Department (HOD):</b> <b>Dr. Basavaraj S. Mathapati</b> (HOD Cabin, Zen AI Block)<br>` +
          `<small style="color:#6d28d9">Click any teacher below to view their <b>Live Location Status</b> and <b>Full Weekly Timetable</b> directly below their name:</small>`,
        bars,
        false,
        true
      );
      return;
    }

    // Other Unavailable Departments -> Coming Soon
    add(
      tag(`${d.code} · Faculty Timetable`) +
        `<h3>🏛️ ${label} — Faculty List & Timetable</h3>` +
        `<b>Status:</b> <span style="color:#d97706;font-weight:700">⏳ Coming Soon</span><br><br>` +
        `• Faculty directory and teacher timetables for <b>${label}</b> <b>are Coming Soon</b>.<br>` +
        `• Only 1st Year and AIML currently have complete timetable and faculty data populated.<br>` +
        `• <b>Head of Department (HOD):</b> ${d.hod} (<code>${d.cabin}</code>)<br>` +
        `• <b>College Contact:</b> <code>08472-224360</code>`,
      [
        { icon: "🤖", title: "View AIML Faculty Timetables (Available)", action: function () { stfDeptFacultyList(DEPTS[1]); } },
        { icon: "1️⃣", title: "View 1st Year Faculty List (Available)", action: stfFYFacultyList },
        { icon: "⬅️", title: "← All Departments", action: stfDeptList },
      ],
      false,
      true
    );
  }

  function stfFYFacultyList() {
    const fyTeachersMap = {};
    Object.keys(FY_DATA).forEach(function (sec) {
      FY_DATA[sec].faculties.forEach(function (f) {
        if (f.faculty && f.faculty.length > 3 && !fyTeachersMap[f.faculty]) {
          fyTeachersMap[f.faculty] = f.fdept + " · " + f.title;
        }
      });
    });

    const bars = Object.keys(fyTeachersMap).map(function (name) {
      return {
        icon: "👤",
        title: `${name} — ${fyTeachersMap[name]}`,
        action: function () {
          // Check if in T
          const matched = T.find(function (t) { return t.n.toLowerCase().indexOf(name.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "")) !== -1; });
          if (matched) {
            loc(matched);
          } else {
            add(
              tag("1st Year Faculty Profile") +
                `<h3>👨‍🏫 ${name}</h3>` +
                `• <b>Department:</b> ${fyTeachersMap[name]}<br>` +
                `• <b>Classes Handled:</b> B.E. 1st Year (Sections A–R)<br>` +
                `• <b>Full Section Timetable:</b> Available under 1st Year Timetable.`,
              [{ icon: "🗓️", title: "Open 1st Year Section Timetable", action: firstYearTT }],
              false,
              true
            );
          }
        },
      };
    });

    bars.push({ icon: "⬅️", title: "← All Departments", action: stfDeptList });
    add(
      tag("1st Year Faculty List") +
        "<b>1st Year (Basic Sciences & Humanities) — Respective Faculty:</b>",
      bars,
      false,
      true
    );
  }

  function stfAllFacultyList() {
    const x = L[lg()];
    const facBars = T.map(function (t) {
      return {
        icon: "👤",
        title: getFacultyBarSummary(t),
        action: function () { loc(t); },
      };
    });
    facBars.push({ icon: "⬅️", title: "← Faculty Menu", action: stfFacultyMenu });
    add(
      tag(x.menuStf + " · Faculty Directory") +
        "<b>All Faculty Members (Department & Live Time Status on Each Bar):</b><br>" +
        "<small>Click any faculty member to view their <b>Live Location + Full Weekly Timetable</b> directly below their name:</small>",
      facBars,
      false,
      true
    );
  }

  function stfInsertTeacherName() {
    const x = L[lg()];
    const b = document.createElement("div");
    b.className = "pda-b";
    b.innerHTML =
      `<div class="pda-back-bar"><button class="pda-back-btn" type="button">${x.backBtn}</button></div>` +
      tag("Find a Teacher (Insert Name)") +
      `<b>🔍 Find a Teacher & View Their Weekly Timetable:</b><br>` +
      `<small>Insert any teacher's or HOD's name (e.g. <i>Dr. Basavaraj S Mathapati</i>, <i>Prof. Ashwini</i>, <i>Dr. S. R. Patil</i>):</small>` +
      `<div style="display:flex;gap:6px;margin-top:8px">` +
      `<input id="pda-teacher-find-input" placeholder="Insert teacher name..." style="flex:1;padding:8px 10px;border:1px solid #c4b5fd;border-radius:6px;font-size:13px">` +
      `<button id="pda-teacher-find-btn" type="button" style="background:linear-gradient(135deg,#6d28d9,#4c1d95);color:#fff;border:none;padding:8px 12px;border-radius:6px;font-weight:700;cursor:pointer">Find</button>` +
      `</div>`;
    b.querySelector(".pda-back-btn").onclick = stfFacultyMenu;

    function doSearch() {
      const val = b.querySelector("#pda-teacher-find-input").value.trim();
      if (!val) return;
      const l = val.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "");
      const matched = T.find(function (t) {
        const tn = t.n.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "");
        const parts = tn.split(/\s+/).filter(function (p) { return p.length >= 3; });
        const aliasMatch = (t.a || []).some(function (al) { return val.toLowerCase().indexOf(al.toLowerCase()) !== -1; });
        return aliasMatch || tn.indexOf(l) !== -1 || parts.some(function (p) { return l.indexOf(p) !== -1; });
      });
      if (matched) {
        loc(matched);
      } else {
        const otherDept = DEPTS.find(function (d) {
          if (d.code === "AIML") return false;
          return d.hod.toLowerCase().indexOf(l) !== -1 || d.code.toLowerCase() === l || (d.aliases || []).some(function (a) { return l.indexOf(a) !== -1; });
        });
        if (otherDept) {
          add(
            tag(`${otherDept.code} · Faculty Timetable`) +
              `<b>${val}</b> is from <b>${deptLabel(otherDept)}</b>.<br>` +
              `• <b>Status:</b> <span style="color:#d97706;font-weight:700">⏳ Coming Soon</span><br>` +
              `• Teacher timetables are currently available only for the <b>AIML Department</b>.<br>` +
              `• Timetables for other departments will be updated soon as official data is provided.`,
            [
              { icon: "🤖", title: "View AIML Faculty Timetables (Available)", action: function () { stfDeptFacultyList(DEPTS[1]); } },
              { icon: "🔄", title: "Try Another Teacher Name", action: stfInsertTeacherName },
              { icon: "⬅️", title: "← Faculty Menu", action: stfFacultyMenu },
            ],
            false,
            true
          );
        } else {
          add(
            tag("Teacher Search") +
              `<b>Search result for: "${val}"</b><br>` +
              `• No matching teacher found in the AIML Faculty directory.<br>` +
              `• Teacher timetables are currently available only for the <b>AIML Department</b> (other departments are coming soon).`,
            [
              { icon: "🤖", title: "AIML Faculty Timetables (All 16 Available)", action: function () { stfDeptFacultyList(DEPTS[1]); } },
              { icon: "🏛️", title: "All Department Names", action: stfDeptList },
              { icon: "🔄", title: "Try Another Teacher Name", action: stfInsertTeacherName },
            ],
            false,
            true
          );
        }
      }
    }

    b.querySelector("#pda-teacher-find-btn").onclick = doSearch;
    b.querySelector("#pda-teacher-find-input").onkeydown = function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        doSearch();
      }
    };

    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
    b.querySelector("#pda-teacher-find-input").focus();
  }

  function stfStaffTimetable() {
    const x = L[lg()];
    add(
      tag(x.menuStf + " · " + x.stfSub[2]) +
        "<b>📅 Staff / Teacher Timetables:</b><br>" +
        "<small>Teacher timetables are currently available only for the <b>AIML Department</b>. Other departments will be updated soon:</small>",
      [
        {
          icon: "🤖",
          title: "AIML Department — All Faculty Timetables (Available)",
          action: function () { stfDeptFacultyList(DEPTS[1]); },
        },
        {
          icon: "🔍",
          title: "Find a Teacher & View Their Weekly Timetable",
          action: stfInsertTeacherName,
        },
        {
          icon: "🏛️",
          title: "Other Departments — Timetables (Coming Soon)",
          action: stfDeptList,
        },
        {
          icon: "⬅️",
          title: "← " + x.menuStf,
          action: stf,
        },
      ],
      false,
      true
    );
  }

  function stfPostNotice() {
    const x = L[lg()];
    const b = document.createElement("div");
    b.className = "pda-b";
    b.innerHTML =
      `<div class="pda-back-bar"><button class="pda-back-btn" type="button">${x.backBtn}</button></div>` +
      tag(x.menuStf + " · " + x.stfSub[3]) +
      `<b>📢 Post an Official Campus Notice:</b><br>` +
      `<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">` +
      `<input id="pda-nt-title" placeholder="Notice Title (e.g. Exam Schedule)" style="padding:7px 9px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px">` +
      `<select id="pda-nt-cat" style="padding:7px 9px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px"><option value="Exam">Exam</option><option value="Academic">Academic</option><option value="Placement">Placement</option><option value="Scholarship">Scholarship</option></select>` +
      `<textarea id="pda-nt-body" rows="3" placeholder="Notice details..." style="padding:7px 9px;border:1px solid #c4b5fd;border-radius:6px;font-size:12px"></textarea>` +
      `<button id="pda-nt-btn" type="button" style="background:linear-gradient(135deg,#6d28d9,#4c1d95);color:#fff;border:none;padding:8px;border-radius:6px;font-weight:700;cursor:pointer">Publish Notice</button>` +
      `</div>`;
    b.querySelector(".pda-back-btn").onclick = stf;
    b.querySelector("#pda-nt-btn").onclick = function () {
      const title = b.querySelector("#pda-nt-title").value.trim();
      const cat = b.querySelector("#pda-nt-cat").value;
      const body = b.querySelector("#pda-nt-body").value.trim();
      if (!title || !body) return;
      fetch(`${API_BASE}/api/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, category: cat, body: body, author: "Staff" }),
      })
        .then(function () {
          add(tag("Notice Published") + `<b>✅ Notice Posted Successfully:</b><br><b>${title}</b> (${cat})<br>${body}`, [{ icon: "📢", title: "View All Notices", action: stuNoticesView }], false, true);
        })
        .catch(function () {
          add(tag("Notice Saved") + `<b>✅ Notice Saved:</b><br><b>${title}</b> (${cat})<br>${body}`, null, false, true);
        });
    };
    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
  }

  function loc(t) {
    const curTime = getNowTime();
    const di = curTime.dayIndex;
    const day = curTime.day;
    const nowMins = curTime.mins;
    const sl = t.s[day] || {};
    let cur = -1;
    let nxt = -1;

    for (let i = 0; i < P.length; i++) {
      const pStart = parseInt(P[i][0].split(":")[0]) * 60 + parseInt(P[i][0].split(":")[1]);
      const pEnd = parseInt(P[i][1].split(":")[0]) * 60 + parseInt(P[i][1].split(":")[1]);
      if (nowMins >= pStart && nowMins < pEnd) cur = i;
      if (pStart > nowMins && nxt < 0 && sl[i]) nxt = i;
    }

    let statusHtml = "";
    if (cur >= 0 && sl[cur]) {
      statusHtml =
        `• <b>Current Status:</b> <span style="color:#dc2626;font-weight:700">🔴 IN CLASS RIGHT NOW</span><br>` +
        `• <b>Active Classroom:</b> <code>${sl[cur][1]}</code> — Teaching <b>${sl[cur][0]}</b> (<code>${P[cur][0]} – ${P[cur][1]}</code>)<br>`;
    } else {
      let reason = "No class scheduled in this slot — Available in Cabin.";
      if (di === 0) reason = "Sunday (College Closed).";
      else if (nowMins < 9 * 60 || nowMins >= 16 * 60) reason = "Outside regular class hours (09:00 AM – 04:00 PM) — Available in Cabin/Dept.";
      else if (nowMins >= 13 * 60 + 15 && nowMins < 14 * 60) reason = "Lunch Break (01:15 PM – 02:00 PM).";
      else if (nowMins >= 11 * 60 && nowMins < 11 * 60 + 15) reason = "Short Break (11:00 AM – 11:15 AM).";

      statusHtml =
        `• <b>Current Status:</b> <span style="color:#16a34a;font-weight:700">🟢 AVAILABLE IN CABIN</span><br>` +
        `• <b>Details:</b> ${reason}<br>`;
      if (nxt >= 0 && di !== 0) {
        statusHtml += `• <b>Next Scheduled Class Today:</b> <code>${P[nxt][0]} – ${P[nxt][1]}</code> in <code>${sl[nxt][1]}</code> (<b>${sl[nxt][0]}</b>)<br>`;
      }
    }

    const cardHtml =
      tag(`Faculty Profile & Timetable · ${t.d} Dept`) +
      `<h3>👨‍🏫 ${t.n} — ${t.d} Department</h3>` +
      `• <b>Department:</b> ${t.d}<br>` +
      `• <b>Faculty Cabin:</b> <code>${t.cab}</code><br>` +
      `• <b>Queried Time:</b> <code>${day}, ${curTime.timeStr}</code><br>` +
      statusHtml +
      buildFacultyTimetableHtml(t);

    add(
      cardHtml,
      [
        { icon: "🔄", title: "Select Another Faculty Member", action: stfFindTeacher },
        { icon: "⬅️", title: "← Back to Staff Menu", action: stf },
      ],
      false,
      true
    );
    speak(`${t.n} from ${t.d} department is located at ${cur >= 0 && sl[cur] ? sl[cur][1] : t.cab}.`);
  }

  function tt(t) {
    loc(t);
  }

  function dash() {
    stf();
  }

  // --- 4. SCHOLARSHIP SECTION (Government portals, Eligibility & documents, How to apply, College help desk) ---
  function schola() {
    const x = L[lg()];
    add(
      `<b>💰 ${x.menuSch} (pdacek.ac.in):</b>`,
      [
        {
          icon: "🌐",
          title: x.schSub[0],
          action: function () {
            add(
              tag(x.menuSch + " · " + x.schSub[0]) +
                `<b>🌐 Official Government Scholarship Portals:</b><br>` +
                `• <b>Karnataka State Scholarship Portal (SSP):</b> <a href="https://ssp.postmatric.karnataka.gov.in" target="_blank" rel="noopener">ssp.postmatric.karnataka.gov.in</a> (SC / ST / OBC / Cat-1 / 2A / 3A / 3B / Minorities & Vidyasiri)<br>` +
                `• <b>National Scholarship Portal (NSP):</b> <a href="https://scholarships.gov.in" target="_blank" rel="noopener">scholarships.gov.in</a> (AICTE Pragati ₹50,000/yr, Saksham ₹50,000/yr, Swanath ₹50,000/yr & Central Sector Schemes)`,
              [{ icon: "⬅️", title: "← " + x.menuSch, action: schola }],
              false,
              true
            );
          },
        },
        {
          icon: "📋",
          title: x.schSub[1],
          action: function () {
            triggerSearchQuery("Show all scholarships eligibility benefit documents");
          },
        },
        {
          icon: "📝",
          title: x.schSub[2],
          action: function () {
            add(
              tag(x.menuSch + " · " + x.schSub[2]) +
                `<b>📝 Step-by-Step Scholarship Application Process:</b><br>` +
                `1. Register/Login on <b>Karnataka SSP</b> or <b>NSP Portal</b> using Aadhaar & Kutumba ID.<br>` +
                `2. Select College: <b>P.D.A. College of Engineering, Kalaburagi (KEA Code: E017 / E018)</b>.<br>` +
                `3. Enter your USN / Admission Fee Receipt Number and RD Caste & Income Certificate numbers.<br>` +
                `4. E-Sign and submit the online application, then submit <b>1 hardcopy with fee receipt & documents</b> to the PDA Scholarship Desk (Administrative Block).`,
              [{ icon: "⬅️", title: "← " + x.menuSch, action: schola }],
              false,
              true
            );
          },
        },
        {
          icon: "🏛️",
          title: x.schSub[3],
          action: function () {
            add(
              tag(x.menuSch + " · " + x.schSub[3]) +
                `<b>🏛️ PDA College Scholarship Help Desk:</b><br>` +
                `• <b>Location:</b> Administrative Block — Scholarship Section (Ground Floor), PDA College of Engineering, Aiwan-E-Shahi Area, Kalaburagi.<br>` +
                `• <b>Office Phone:</b> <a href="tel:+9108472224360">08472-224360</a><br>` +
                `• <b>Email:</b> <a href="mailto:principal@pdaengg.com">principal@pdaengg.com</a>`,
              [{ icon: "⬅️", title: "← " + x.menuSch, action: schola }],
              false,
              true
            );
          },
        },
      ],
      false,
      true
    );
  }

  // --- 6. ML / NLP LINE-BY-LINE & DIRECT ACTION QUERY ROUTER ---
  function triggerSearchQuery(qText) {
    if (chatWindow.style.display !== "flex") {
      chatWindow.style.display = "flex";
    }
    add(qText, null, true);
    askAI(qText);
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    const v = queryInput.value.trim();
    if (!v) return;
    queryInput.value = "";
    add(v, null, true);
    askAI(v);
  };

  // Smart NLP Pre-Router: High-level understanding of what the user actually wants
  function tryDirectSmartAnswer(v) {
    const l = v.toLowerCase().trim();

    // Subject Notes direct interceptor
    if (
      /\b(notes?|study\s*material|handout|module\s*notes?)\b/.test(l) &&
      (/\b(python|pyp|c\s*programming|programming\s*in\s*c|cspoc|poc|c\s*lang|electronics|iec)\b/.test(l) || l === "notes" || l === "subject notes")
    ) {
      if (l.indexOf("python") !== -1 || l.indexOf("pyp") !== -1) {
        show2025SubjectDetail("KKPYP205B", "C", DEPTS[1]);
        return true;
      }
      if (l.indexOf("c") !== -1 || l.indexOf("poc") !== -1) {
        show2025SubjectDetail("CSPOC105", "P", DEPTS[1]);
        return true;
      }
      if (l.indexOf("iec") !== -1 || l.indexOf("electronic") !== -1) {
        show2025SubjectDetail("KKIEC104C", "P", DEPTS[1]);
        return true;
      }
      showNotesSelectionMenu(DEPTS[1]);
      return true;
    }


    // 1. AIML HOD Queries ("aiml hod", "who is hod of aiml", "mathapati", "dr basavaraj s mathapati")
    if (
      (l.indexOf("hod") !== -1 && (l.indexOf("aiml") !== -1 || l.indexOf("ai") !== -1 || l.indexOf("machine learning") !== -1)) ||
      l.indexOf("mathapati") !== -1 ||
      (l.indexOf("basavaraj") !== -1 && (l.indexOf("hod") !== -1 || l.indexOf("mathapati") !== -1 || l.indexOf("aiml") !== -1))
    ) {
      const hodTeacher = T.find(function (t) { return t.n.indexOf("Mathapati") !== -1 || t.n.indexOf("Basavaraj") !== -1; });
      if (hodTeacher) {
        loc(hodTeacher);
        return true;
      }
    }

    // 2. Other Department HOD queries ("cse hod", "ise hod", "civil hod", "mech hod", etc.)
    if (l.indexOf("hod") !== -1 || l.indexOf("head of") !== -1) {
      for (let i = 0; i < DEPTS.length; i++) {
        const d = DEPTS[i];
        if (l.indexOf(d.code.toLowerCase()) !== -1 || d.aliases.some(function (a) { return l.indexOf(a) !== -1; })) {
          const hodTeacher = T.find(function (t) { return t.n.toLowerCase().indexOf(d.hod.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "")) !== -1; });
          if (hodTeacher) {
            loc(hodTeacher);
          } else {
            add(
              tag(`${d.code} · Head of Department`) +
                `<h3>👨‍🏫 ${d.hod} — HOD, ${deptLabel(d)}</h3>` +
                `• <b>Department:</b> ${deptLabel(d)}<br>` +
                `• <b>Cabin Location:</b> <code>${d.cabin}</code><br>` +
                `• <b>Contact / College Phone:</b> <code>08472-224360</code><br>` +
                `• <b>UG Intake:</b> ${d.intake} Seats`,
              [
                { icon: "🏛️", title: `View ${d.code} Faculty`, action: function () { stfDeptFacultyList(d); } },
                { icon: "🎓", title: `View ${d.code} Fees & Intake`, action: function () { showDeptDetail(d); } },
              ],
              false,
              true
            );
          }
          return true;
        }
      }
    }

    // Teacher / Faculty / Staff Timetable query handling
    if (
      (/(teacher|faculty|staff|prof|sir|mam)/.test(l) && /(time\s*table|timetable|schedule)/.test(l)) ||
      l.indexOf("teacher time table") !== -1 ||
      l.indexOf("faculty timetable") !== -1 ||
      l.indexOf("staff timetable") !== -1
    ) {
      const hasOtherDept = DEPTS.some(function (d) {
        return d.code !== "AIML" && (l.indexOf(d.code.toLowerCase()) !== -1 || (d.aliases || []).some(function (a) { return l.indexOf(a) !== -1; }));
      });
      if (!hasOtherDept || l.indexOf("aiml") !== -1 || l.indexOf("ai") !== -1) {
        stfStaffTimetable();
        return true;
      }
    }

    // 3. Subject-Teacher Inquiries in AIML ("who teaches dsa", "dbms teacher", "java teacher", "who teaches pml", etc.)
    const subjectMap = [
      { key: ["dsa", "data science & its", "data science and its"], sub: "Data Science & Its Applications (22AI51)", teacher: "Dr. Basavaraj S. Mathapati (HOD)", sec: "Sec-A", tObj: "Mathapati" },
      { key: ["dbms", "database"], sub: "Database Management System (22AI52)", teacher: "Prof. Santoshi P (Sec-A) & Dr. Sharanamma H (Sec-B)", sec: "5th Sem A/B", tObj: "Santoshi" },
      { key: ["pml", "principles of machine learning"], sub: "Principles of Machine Learning (22AI53)", teacher: "Prof. Mallinath S (Sec-A) & Dr. Nandini P (Sec-B)", sec: "5th Sem A/B", tObj: "Mallinath" },
      { key: ["hci", "human computer interface"], sub: "Human Computer Interface (22AI55A)", teacher: "Prof. Neha A (Sec-A) & Dr. Basavaraj S. Mathapati (Sec-B)", sec: "5th Sem A/B", tObj: "Mathapati" },
      { key: ["java", "oop", "object oriented"], sub: "OOP with Java (AIOOP303)", teacher: "Prof. Rajshekhar P & Dr. Sharanamma H", sec: "3rd Sem A/B", tObj: "Rajshekhar" },
      { key: ["os", "operating system"], sub: "Operating Systems (AIOSS304)", teacher: "Prof. Savitha P (Sec-A) & Prof. Sowmya G (Sec-B)", sec: "3rd Sem A/B", tObj: "Sowmya" },
      { key: ["dsc", "data structures using c"], sub: "Data Structures & Applications (AIDSC305)", teacher: "Prof. Neha A (Sec-A) & Prof. Ashwini H (Sec-B)", sec: "3rd Sem A/B", tObj: "Ashwini" },
      { key: ["dsdo", "digital system"], sub: "Digital System Design (AIDS0302)", teacher: "Prof. Laxmi J (Sec-A) & Prof. Sonali M (Sec-B)", sec: "3rd Sem A/B", tObj: "Laxmi" },
      { key: ["rmipr", "research methodology"], sub: "Research Methodology and IPR (22RMI57)", teacher: "Prof. Kaveri K (Sec-A) & Prof. Laxmi J (Sec-B)", sec: "5th Sem A/B", tObj: "Kaveri" },
      { key: ["math", "maths", "calculus"], sub: "Engineering Mathematics III", teacher: "Prof. Rajeshwari B (Sec-A) & Prof. Gopichand P (Sec-B)", sec: "3rd Sem A/B", tObj: "Rajeshwari" },
    ];

    if (/\b(who\s*teaches|teacher\s*of|faculty\s*for|sir|mam|prof|faculty|teacher)\b/.test(l)) {
      for (let sIdx = 0; sIdx < subjectMap.length; sIdx++) {
        const item = subjectMap[sIdx];
        if (item.key.some(function (k) { return l.indexOf(k) !== -1; })) {
          const tMatch = T.find(function (t) { return t.n.indexOf(item.tObj) !== -1; });
          add(
            tag(`AIML Course Faculty`) +
              `<b>📚 ${item.sub}:</b><br>` +
              `• <b>Assigned Faculty:</b> <b>${item.teacher}</b><br>` +
              `• <b>Classes / Batches:</b> AIML ${item.sec}<br>` +
              `• Click below to inspect their live timetable:`,
            [
              { icon: "📅", title: `View ${item.teacher} Timetable`, action: function () { if (tMatch) loc(tMatch); else stfDeptFacultyList(DEPTS[1]); } },
              { icon: "🤖", title: "Open AIML Timetables", action: function () { showAIMLSection(DEPTS[1], "3", "A"); } },
            ],
            false,
            true
          );
          return true;
        }
      }
    }

    // 4. Check if user typed any Faculty Member's name -> Show Live Status + Weekly Timetable directly below their name!
    for (let i = 0; i < T.length; i++) {
      const t = T[i];
      const cleanName = t.n.toLowerCase().replace(/^(dr\.|prof\.)\s+/, "");
      const parts = cleanName.split(/\s+/).filter(function (p) { return p.length >= 3; });
      const aliasMatch = (t.a || []).some(function (al) { return v.indexOf(al) !== -1; });
      if (aliasMatch || (parts.length > 0 && parts.some(function (p) { return l.indexOf(p) !== -1; }))) {
        loc(t);
        return true;
      }
    }

    // 5. Check if user asked for Department Faculty List ("aiml teachers", "faculty list", "aiml faculty")
    if (/\b(faculty\s*list|teachers|staff\s*list|faculty\s*names|teacher\s*names)\b/.test(l)) {
      if (l.indexOf("aiml") !== -1 || l.indexOf("ai") !== -1) {
        stfDeptFacultyList(DEPTS[1]);
        return true;
      }
      stfDeptList();
      return true;
    }

    // 6. Check if user typed a request for AIML 3rd or 5th Sem Timetable
    const aimlDept = DEPTS.find(function (d) { return d.code === "AIML"; }) || DEPTS[1];
    if (/\b(aiml|ai\s*&?\s*ml|machine learning)\b/.test(l) && /\b(time\s*table|schedule|class|sem|section)\b/.test(l)) {
      const is5 = /\b(5|5th|fifth|v)\b/.test(l);
      const isB = /\b(sec\s*b|section\s*b|\bb\b)\b/.test(l);
      showAIMLSection(aimlDept, is5 ? "5" : "3", isB ? "B" : "A");
      return true;
    }

    // 7. Check if user typed a request for 1st Year Section Timetable
    if (/\b(1st\s*year|first\s*year|1st\s*sem|fe|f\.e)\b/.test(l) && /\b(time\s*table|schedule|section|sec)\b/.test(l)) {
      const secMatch = l.match(/\b(?:section|sec)\s*([a-r])\b/i);
      if (secMatch) {
        const secKey = secMatch[1].toUpperCase();
        if (FY_DATA[secKey]) {
          showFYSection(secKey);
          return true;
        }
      }
      firstYearTT();
      return true;
    }

    // 8. Check if user typed a request for another department's study material / notes / syllabus / timetable -> Coming Soon
    if (/\b(time\s*table|schedule|notes|syllabus|pyq|question\s*paper|model\s*paper|scheme|study\s*material)\b/.test(l)) {
      for (let i = 0; i < DEPTS.length; i++) {
        const d = DEPTS[i];
        if (d.code === "AIML") continue;
        if (l.indexOf(d.code.toLowerCase()) !== -1 || d.aliases.some(function (a) { return l.indexOf(a) !== -1; })) {
          showComingSoonDept(d, stu);
          return true;
        }
      }
    }

    return false;
  }

  async function askAI(v) {
    if (tryDirectSmartAnswer(v)) {
      return;
    }

    const loadingBubble = document.createElement("div");
    loadingBubble.className = "pda-b";
    loadingBubble.innerHTML = `<span class="pda-tag">⚡ Automated RAG Engine Searching...</span><br><i>Retrieving verified knowledge from PDA College corpus...</i>`;
    chat.appendChild(loadingBubble);
    chat.scrollTop = chat.scrollHeight;

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: v, lang: lg() }),
      });
      if (res.ok) {
        const data = await res.json();
        chat.removeChild(loadingBubble);
        const lines = (data.lines && data.lines.length > 0)
          ? data.lines
          : data.reply.split("\n").filter(Boolean);
        const conf = data.confidence ? ` · Match: ${Math.round(data.confidence * 100)}%` : "";
        const lat = data.latency_ms ? ` (${data.latency_ms}ms)` : "";
        addLineByLine(
          `⚡ Automated RAG Grounded Search${conf}${lat}`,
          lines,
          [
            { icon: "🎓", title: "1. Admission", action: adm },
            { icon: "📚", title: "2. Student Enquiry", action: stu },
            { icon: "👨‍🏫", title: "3. Staff", action: stf },
          ],
          data.audio_text
        );
        return;
      }
    } catch (e) {}

    // Client-side ML Fallback if backend is unreachable
    chat.removeChild(loadingBubble);
    const localLines = clientSideMLFallback(v);
    addLineByLine(
      "Offline ML Knowledge Search · Line-by-Line",
      localLines,
      [
        { icon: "🎓", title: "1. Admission", action: adm },
        { icon: "📚", title: "2. Student Enquiry", action: stu },
        { icon: "👨‍🏫", title: "3. Staff", action: stf },
      ]
    );
  }

  function clientSideMLFallback(v) {
    const l = v.toLowerCase();
    for (let i = 0; i < DEPTS.length; i++) {
      const d = DEPTS[i];
      if (
        l.includes(d.code.toLowerCase()) ||
        d.aliases.some(a => l.includes(a)) ||
        (d.code === "AIML" && /machin|larn|learn|artific/.test(l))
      ) {
        return [
          `### 🏛️ ${deptLabel(d)} — Official Line-by-Line Details`,
          `• **HOD:** ${d.hod} (\`${d.cabin}\`)`,
          `• **Approved Intake:** \`${d.intake} Seats\` (Open Seats: \`${d.open}\`)`,
          `• **KCET Govt Quota Fee:** Aided \`₹${d.fee.toLocaleString("en-IN")}/yr\` | Un-Aided \`₹${(d.fee_unaided || 130956).toLocaleString("en-IN")}/yr\``,
          `• **COMEDK Fee:** \`₹${d.comedk.toLocaleString("en-IN")}/yr\` | **Management Fee:** \`₹${d.mgmt.toLocaleString("en-IN")}/yr\``,
          `• **KCET Cutoff Rank:** \`Rank ${d.cut.toLocaleString("en-IN")}\` | **COMEDK Cutoff:** \`Rank ${d.comedk_cut.toLocaleString("en-IN")}\``,
          `• **Placements:** ${d.pkg} | **Recruiters:** ${d.recruiters}`,
          `• **Study Materials & Timetable:** ${d.code === "AIML" ? "Available in Student Enquiry" : "⏳ Coming Soon"}`,
        ];
      }
    }
    return [
      "### 🎓 PDA College of Engineering, Kalaburagi — Official Summary",
      "• **Institution:** H.K.E. Society's Poojya Doddappa Appa College of Engineering (Estd. 1958, Autonomous under VTU).",
      "• **KEA KCET Code:** `E017 / E018` | **COMEDK Code:** `E095`",
      "• **13 B.E. Branches & Intake:** CSE (240), Civil (180), ECE (180), Mech (120), EEE (120), AIML (120), AI&DS (120), ISE (60), CSD (60), IPE (60), EIE (30), Auto (30), CCT (30).",
      "• **Official Fees:** KCET Aided: `₹67,866/yr` | KCET Un-Aided: `₹1,30,956/yr` | COMEDK: `₹1,10,610 – ₹2,16,610/yr` | Mgmt: `₹1,40,000 – ₹2,50,000/yr`.",
      "• **Placements:** Highest Package `₹18.50 LPA` | Average `₹4.80 – ₹5.80 LPA` (520+ offers).",
      "• **Admission Coordinators:** Dr. M. S. Aspalli (`+91 9449618898`), Mr. Sangamesh (`+91 9986111396`), Mrs. Monika Shah (`+91 9035221078`).",
    ];
  }

  // --- Voice Input (SpeechRecognition) ---
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  micB.onclick = function () {
    if (!SR) {
      add("Voice input is not supported in this browser. Try Chrome or Edge, or type your question.", null, false, true);
      return;
    }
    const r = new SR();
    r.lang = CODES[lg()];
    r.onresult = function (e) {
      speakOn = true;
      queryInput.value = e.results[0][0].transcript;
      form.requestSubmit();
    };
    r.onerror = function () {
      add("Couldn’t access microphone. Please allow microphone permissions or type your question.", null, false, true);
    };
    r.onend = function () {
      micB.classList.remove("recording");
      micB.textContent = "🎤";
    };
    micB.classList.add("recording");
    micB.textContent = "🎙️";
    r.start();
  };

  queryInput.addEventListener("input", function () {
    speakOn = false;
  });

  langS.onchange = function () {
    speakOn = false;
    chat.innerHTML = "";
    home();
  };

  launcher.onclick = function () {
    const isHidden = chatWindow.style.display === "none" || chatWindow.style.display === "";
    chatWindow.style.display = isHidden ? "flex" : "none";
    if (isHidden && chat.children.length === 0) {
      home();
    }
    if (isHidden) queryInput.focus();
  };

  closeBtn.onclick = function () {
    chatWindow.style.display = "none";
  };

  // If widget-only mode is active, center and auto-open the assistant widget immediately
  if (window.PDA_WIDGET_ONLY) {
    chatWindow.style.position = "fixed";
    chatWindow.style.top = "50%";
    chatWindow.style.left = "50%";
    chatWindow.style.right = "auto";
    chatWindow.style.bottom = "auto";
    chatWindow.style.transform = "translate(-50%, -50%)";
    chatWindow.style.width = "100%";
    chatWindow.style.maxWidth = "520px";
    chatWindow.style.height = "100%";
    chatWindow.style.maxHeight = "100vh";
    chatWindow.style.borderRadius = "0px";
    chatWindow.style.border = "1px solid rgba(124, 58, 237, 0.3)";
    chatWindow.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.6)";
    chatWindow.style.display = "flex";
    if (window.innerWidth > 560) {
      chatWindow.style.maxHeight = "95vh";
      chatWindow.style.borderRadius = "20px";
    }
    if (launcher) launcher.style.display = "none";
    if (closeBtn) closeBtn.style.display = "none";
    home();
  }

  // Expose Public API
  window.PDACampusBot = {
    ask: function (query) {
      triggerSearchQuery(query);
    },
    open: function () {
      if (chatWindow.style.display !== "flex") {
        launcher.click();
      }
    },
    openStaffDash: function () {
      if (chatWindow.style.display !== "flex") {
        chatWindow.style.display = "flex";
      }
      dash();
    },
  };
})();
