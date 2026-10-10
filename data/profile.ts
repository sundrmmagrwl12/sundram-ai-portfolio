// ============================================================
//  SUNDRAM SINGHAL — MASTER PORTFOLIO CONFIG
//  Edit this single file to update your entire portfolio + AI
// ============================================================

export const PROFILE = {
  name: "Sundram Singhal",
  tagline: "Backend Developer & Cloud Enthusiast",
  title: "Java Backend Developer | SDE-1 | Full Stack Engineer",
  bio: "B.Tech CSE graduate (2022–2026) specializing as a Software Engineer with a core focus on Backend Development. I build low-latency event-driven systems, distributed architectures, and cloud CI/CD pipelines. Strong foundations in Data Structures & Algorithms with production-grade experience in Java 17/21, Spring Boot 3, Apache Kafka, Redis, and AWS CI/CD automation. Available for Immediate Joining.",

  status: {
    available: true,
    label: "Open to Work — Immediate Joiner",
    noticePeriod: "Open to Opportunities",
    workPreference: "Remote / Hybrid / On-site",
    relocation: "Open to relocate anywhere in India",
    targetRoles: [
      "Software Development Engineer (SDE-1)",
      "Java Backend Developer",
      "Full Stack Developer",
      "Software Engineer — Backend",
      "Backend Engineer",
    ],
  },

  contact: {
    email: "sundramsinghal944@gmail.com",
    phone: "+91 7906389315",
    location: "Greater Noida, Uttar Pradesh, India",
    github: "https://github.com/sundrmmagrwl12",
    linkedin: "https://www.linkedin.com/in/sundram-singhal-b94069252/",
    leetcode: "https://leetcode.com/u/Sundram_Singhal/",
    gfg: "https://www.geeksforgeeks.org/profile/sundramsihn0i?tab=activity",
    resume: "/Sundram_Singhal_Resume.pdf",
    photo: "/sundram.jpg",
  },

  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lloyd Institute of Engineering & Technology",
    location: "Greater Noida, Uttar Pradesh",
    duration: "2022 – 2026",
    cgpa: "8.21 / 10",
    honors: "1st Division with Honors",
    highlights: [
      "Institute Rank #3 on GeeksforGeeks (Coding Score: 1512)",
    ],
  },

  experience: [
    {
      company: "Step2gen Technologies",
      role: "Software Trainee",
      location: "Mohali, Punjab",
      duration: "Jan 2026 – Jun 2026",
      type: "Training & Internship",
      highlights: [
        "Underwent rigorous industry-standard software engineering training across Web Fundamentals (HTML5, CSS3, JavaScript) and Enterprise Backend (C#, ASP.NET Core, LINQ, MS SQL Server).",
        "Completed milestone-based module assignments under strict 24–48 hour sprint deadlines, passing mandatory mentor code reviews and technical evaluations at each stage to progress.",
        "Built and integrated robust RESTful Web APIs, applying SOLID principles, Clean Architecture, Dependency Injection, and Entity Framework Core data access.",
        "Engineered relational database schemas and optimized SQL queries, incorporating server-side input validation, error handling, Postman testing, and Git version control workflows.",
      ],
    },
  ],

  projects: [
    {
      id: "zeromesh",
      title: "ZeroMesh-UPI",
      subtitle: "Offline Distributed Mesh Payment System",
      description:
        "A fault-tolerant distributed offline payment system enabling transactions in network dead zones using Bluetooth Mesh Gossip Protocol with TTL-based hop decay. Built with enterprise-grade cryptography (RSA-2048 + AES-256-GCM) and a 4-stage ingestion pipeline for sub-millisecond deduplication and double-spend prevention.",
      live: "https://zeromesh-upi.onrender.com",
      github: "https://github.com/sundrmmagrwl12/ZeroMesh-UPI",
      tags: ["Java 17","Spring Boot 3","Apache Kafka","Redis","PostgreSQL","RSA-2048","AES-256-GCM","Docker"],
      highlights: [
        "Engineered ad-hoc Bluetooth Mesh Gossip Protocol with TTL-based hop decay for offline P2P relay.",
        "End-to-end Hybrid Cryptography (RSA-2048 + AES-256-GCM) for tamper-proof encrypted payments.",
        "Redis SETNX (25h TTL) distributed locks for sub-millisecond deduplication, preventing replay attacks.",
        "Async settlement via Kafka KRaft with atomic PostgreSQL ACID transactions using JPA @Version optimistic locking.",
      ],
      featured: true,
      category: "distributed-systems",
    },
    {
      id: "wanderlust",
      title: "WanderLust",
      subtitle: "Full-Stack Hotel Listing Platform",
      description:
        "A production-ready full-stack hotel listing and booking platform built with Node.js, Express, and MongoDB. Features complete user authentication with Passport.js, dynamic image management via Cloudinary, interactive maps with Mapbox, MVC architecture, and RESTful API design.",
      live: "",
      github: "https://github.com/sundrmmagrwl12/WanderLust",
      tags: ["Node.js","Express.js","MongoDB","EJS","Passport.js","Cloudinary","Mapbox","REST APIs"],
      highlights: [
        "Full MVC architecture with Express.js, MongoDB & Mongoose ORM for hotel CRUD operations.",
        "Secure authentication & authorization flows using Passport.js strategies.",
        "Dynamic image upload & CDN delivery via Cloudinary integration.",
        "Interactive location maps with Mapbox Geocoding API integration.",
      ],
      featured: true,
      category: "full-stack",
    },
    // ⬇ ADD YOUR NEXT SPRING BOOT PROJECT HERE (Just copy-paste a new object)
  ],

  skills: {
    "Java & Core Backend": [
      "Java 8","Java 11","Java 17","Java 21",
      "Multithreading & Concurrency","Collections Framework",
      "Stream API","Virtual Threads","ExecutorService","Locks",
    ],
    "Frameworks & Architecture": [
      "Spring Boot 3","Spring Data JPA","Hibernate ORM",
      "RESTful APIs","Microservices Architecture",
      "Clean Architecture","SOLID Principles",
      "Dependency Injection","Spring Security","Maven",
    ],
    "Distributed Systems & Messaging": [
      "Apache Kafka (KRaft)","Kafka Producers & Consumers",
      "Redis (Distributed Caching)","Redis SETNX Distributed Locking",
      "Cache Invalidation & TTL Eviction",
      "Idempotency & Deduplication","Optimistic Locking (JPA @Version)",
    ],
    "Databases & Storage": [
      "PostgreSQL","MySQL","ACID Transactions",
      "Query Optimization & Indexing","Schema Migrations",
      "MongoDB","Mongoose ORM",
    ],
    "Cloud & DevOps (AWS)": [
      "AWS IAM (Roles & Policies)","AWS EC2",
      "AWS CodeBuild","AWS CodeArtifact","AWS S3",
      "AWS CloudFormation","CI/CD Pipeline Automation",
      "Docker","Docker Compose","GitHub Webhooks",
    ],
    "Testing & Engineering Tools": [
      "JUnit 5","Mockito",
      "Unit Testing","Integration Testing",
      "Git & GitHub","Postman","SonarLint",
    ],
    ".NET & Microsoft Ecosystem": [
      "C#", "ASP.NET Core", "Web APIs", "Entity Framework Core",
      "LINQ", "MS SQL Server", "Dependency Injection"
    ],
    "Other Languages & Stack": [
      "C++","SQL","JavaScript (ES6+)","Node.js","Express.js","EJS",
    ],
  },

  achievements: [
    "Solved 800+ Data Structures & Algorithms problems across LeetCode (385) & GeeksforGeeks (456).",
    "Ranked #3 across the entire institute on GeeksforGeeks (Coding Score: 1512, 110 POTDs).",
    "B.Tech CSE — 1st Division with Honors (CGPA: 8.21 / 10)",
  ],

  certifications: [
    {
      title: "AWS Cloud DevOps Hands-on Track",
      issuer: "Nextwork / AWS Community",
      date: "Sep – Oct 2026",
      subtitle: "6-Day Intensive Implementation",
      highlights: [
        "Day 1: IAM secure roles, least-privilege policies & EC2 instance setup",
        "Day 2: GitHub repo connected with AWS DevOps via webhooks",
        "Day 3: Private dependency management via AWS CodeArtifact",
        "Day 4: Automated CI pipeline with buildspec.yml on AWS CodeBuild",
        "Day 5: Production automated CI/CD deployment workflow",
        "Day 6: Build a CI/CD Pipeline with AWS (End-to-end multi-stage pipeline integration)",
      ],
      completeProof: "/aws-proofs/aws-devops-complete-proofs.pdf",
      proofs: [
        { day: "Day 1", title: "IAM & EC2 Instance Setup", file: "/aws-proofs/day-1-iam-ec2.pdf" },
        { day: "Day 2", title: "GitHub + AWS DevOps Webhook", file: "/aws-proofs/day-2-aws-devops-github.pdf" },
        { day: "Day 3", title: "AWS CodeArtifact Repository", file: "/aws-proofs/day-3-codeartifact.pdf" },
        { day: "Day 4", title: "AWS CodeBuild Pipeline", file: "/aws-proofs/day-4-codebuild.pdf" },
        { day: "Day 5", title: "Automated Deployment Pipeline", file: "/aws-proofs/day-5-deployment.pdf" },
      ],
      tags: ["AWS IAM", "EC2", "CodeArtifact", "CodeBuild", "CI/CD Pipeline"],
    },
    {
      title: "GeeksforGeeks Data Structures & Algorithms with C++",
      issuer: "GeeksforGeeks",
      date: "Jun 2025",
      link: "https://media.geeksforgeeks.org/courses/certificates/be42b109bbce1155ad5b0a6bb7c313d9.pdf",
      tags: ["Data Structures", "Algorithms", "C++"],
    },
    {
      title: "Forage Advanced Software Engineering Simulation",
      issuer: "Forage",
      date: "Apr 2025",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_LwLFzj58gDzCPsJue_1744826470937_completion_certificate.pdf",
      tags: ["Software Engineering", "Architecture"],
    },
  ],

  promptChips: [
    { emoji: "⚡", text: "Why should you hire Sundram as Backend Developer / SDE-1?" },
    { emoji: "🛡️", text: "How does ZeroMesh-UPI prevent double-spending offline?" },
    { emoji: "☁️", text: "What hands-on AWS & CI/CD experience does Sundram have?" },
    { emoji: "⚙️", text: "Tell me about his internship at Step2gen Technologies." },
    { emoji: "🔄", text: "Why did Sundram switch from MERN/Node.js to Java Spring Boot?" },
    { emoji: "📊", text: "What is Sundram's DSA & problem-solving track record?" },
  ],

  aiSystemPrompt: `You are the official AI Portfolio Assistant for Sundram Singhal — a highly skilled Backend Engineer and B.Tech CSE graduate (2022–2026) from Lloyd Institute of Engineering & Technology, Greater Noida (CGPA: 8.21/10, 1st Division with Honors).

YOUR ROLE: Represent Sundram professionally and accurately to recruiters, hiring managers, and engineers. Be polite, articulate, technically precise, and confident.

PERSONAL INFO:
- Full Name: Sundram Singhal
- Location: Greater Noida, UP (Open to Relocate Anywhere in India / Remote / Hybrid)
- Phone: +91 7906389315 | Email: sundramsinghal944@gmail.com
- LinkedIn: https://www.linkedin.com/in/sundram-singhal-b94069252/
- GitHub: https://github.com/sundrmmagrwl12 | LeetCode: https://leetcode.com/u/Sundram_Singhal/
- Availability: Immediate Joiner — Open to full-time roles & relocation
- Target Roles: SDE-1, Java Backend Developer, Full Stack Developer, Backend Engineer, Software Engineer

TECHNICAL EXPERTISE:
- Core Java: Java 8/11/17/21, Multithreading & Concurrency (ExecutorService, Locks, Virtual Threads), Stream API, Collections Framework
- Frameworks: Spring Boot 3, Spring Data JPA, Hibernate ORM, RESTful APIs, Microservices Architecture, SOLID Principles, Clean Architecture, Maven, Spring Security
- Distributed Systems: Apache Kafka (KRaft), Redis (Distributed Caching, SETNX Atomic Locks, TTL Eviction), Idempotency, Optimistic Locking (JPA @Version), Race Condition Elimination
- Databases: PostgreSQL, MySQL, ACID Transactions, Query Optimization, MongoDB, Mongoose
- Testing: JUnit 5, Mockito (Unit + Integration Testing)
- Cloud & DevOps: AWS (IAM, EC2, CodeBuild, CodeArtifact, S3, CloudFormation, CI/CD), Docker, Docker Compose, Git, GitHub, Postman

EXPERIENCE:
- Software Trainee at Step2gen Technologies (Jan 2026 – Jun 2026, Mohali, Punjab):
  Completed rigorous milestone-driven industry engineering training: progressed through Web Fundamentals (HTML5, CSS3, JavaScript) to Enterprise Backend (C#, ASP.NET Core, LINQ, MS SQL Server, EF Core). Built production-ready RESTful APIs under 24-48hr sprint deadlines, clearing mandatory mentor code evaluations at each stage. Applied SOLID principles, Clean Architecture, Dependency Injection, Postman testing, and Git branching.

EDUCATION:
- B.Tech CSE, Lloyd Institute of Engineering & Technology, Greater Noida (2022–2026)
  CGPA: 8.21/10 | 1st Division with Honors

KEY PROJECTS:
1. ZeroMesh-UPI (Flagship Distributed Systems Project):
   Offline distributed mesh payment system using Java 17, Spring Boot 3, Kafka KRaft, Redis SETNX, PostgreSQL ACID, RSA-2048+AES-256-GCM Hybrid Cryptography, Bluetooth Gossip Protocol with TTL decay.
   Live: https://zeromesh-upi.onrender.com | GitHub: https://github.com/sundrmmagrwl12/ZeroMesh-UPI

2. WanderLust (Full-Stack Foundation Project):
   Hotel listing & booking platform using Node.js, Express, MongoDB, EJS, Passport.js, Cloudinary, Mapbox.
   GitHub: https://github.com/sundrmmagrwl12/WanderLust

ACHIEVEMENTS:
- 800+ DSA problems solved (LeetCode 385, GFG 456)
- Institute Rank #3 on GeeksforGeeks (Lloyd Institute)

CERTIFICATIONS & HANDS-ON TRACKS:
- AWS DevOps Hands-on Track (6 Days: IAM, EC2, CodeArtifact, CodeBuild, CloudFormation, CI/CD Pipeline Automation)
- Forage Advanced Software Engineering Job Simulation (Apr 2025)
- GeeksforGeeks DSA with C++ (Jun 2025)

STRICT GUARDRAIL — MOST IMPORTANT RULE:
You ONLY answer questions directly related to Sundram Singhal's professional background, education, skills, projects, experience, availability, or career goals.

If ANYONE asks ANYTHING unrelated (general knowledge, news, someone else's coding problems, math, trivia, other people, weather, finance, unrelated topics), you MUST politely decline:
"I'm specifically calibrated to represent Sundram Singhal's engineering profile and career journey. I'd love to tell you about his distributed systems expertise, ZeroMesh-UPI architecture, AWS CI/CD experience, or why he'd be a great addition to your engineering team. What would you like to know about Sundram?"

TONE: Professional, confident, articulate, technically precise. You are a polished spokesperson for a high-potential backend engineer who builds real distributed systems.`,
};
