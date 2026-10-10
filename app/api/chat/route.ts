import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROFILE } from "@/data/profile";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  let userMessage = "";
  try {
    const { message, history } = await req.json();
    userMessage = message || "";

    if (!userMessage.trim()) {
      return NextResponse.json({ reply: "Please send a message!" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        reply: getDemoReply(userMessage),
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: PROFILE.aiSystemPrompt,
    });

    const chatHistory = (history || [])
      .filter((m: { role: string; content: string }) => m.role !== "assistant" || m.content !== history[0]?.content)
      .slice(-10)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error, smoothly falling back:", error);
    return NextResponse.json({ reply: getDemoReply(userMessage) });
  }
}

// Fallback demo replies when no API key is set
function getDemoReply(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("hire") || msg.includes("why sundram") || msg.includes("why should")) {
    return `**Here's why Sundram is an exceptional hire for Backend Developer / SDE-1 roles:**

**1. Real Distributed Systems Experience**
Most freshers have toy CRUD projects. Sundram built **ZeroMesh-UPI** — a production-grade offline payment system using Java 17, Spring Boot 3, Apache Kafka (KRaft), Redis SETNX distributed locking, and PostgreSQL ACID transactions. He implemented RSA-2048 + AES-256-GCM hybrid cryptography and a Bluetooth Mesh Gossip Protocol.

**2. Proven Academic Excellence**
- CGPA: **8.21/10** (1st Division with Honors)
- **Institute Rank #3** on GeeksforGeeks (Score: 1512, 456 solved)
- **800+ total DSA problems** solved across platforms (456 GeeksforGeeks + 385 LeetCode)

**3. Industry Experience & Training**
Software Trainee at **Step2gen Technologies** (Jan 2026 – Jun 2026) — underwent rigorous milestone-driven training across Web Fundamentals & C# / ASP.NET Core, clearing mentor code evaluations and delivering under 24–48hr sprint deadlines.

**4. Cloud & DevOps Experience**
Hands-on AWS experience: IAM, EC2, CodeBuild, CodeArtifact, CloudFormation, CI/CD pipelines.

**5. Immediate Availability**
Available immediately. Open to relocate anywhere in India or work remotely.`;
  }

  if (msg.includes("zeromesh") || msg.includes("double-spending") || msg.includes("offline")) {
    return `**ZeroMesh-UPI — Offline Mesh Payment System** 🛡️

**The Problem Solved:**
How do you enable secure, verified digital payments when there's **no internet connectivity**?

**Architecture & Solutions:**

**1. Offline P2P Relay via Bluetooth Mesh Gossip Protocol**
Each device acts as a relay node. Messages propagate through the mesh with **TTL-based hop decay** — each hop reduces the TTL until the message either reaches the destination or expires, preventing infinite propagation.

**2. Hybrid Cryptography (RSA-2048 + AES-256-GCM)**
Each payment packet is encrypted with AES-256-GCM (symmetric, fast for payload) with the AES key itself encrypted using RSA-2048 (asymmetric, secure for key exchange). This prevents tampering during P2P relay.

**3. Preventing Double-Spending & Replay Attacks**
Redis \`SETNX\` (atomic SET if Not eXists) with 25-hour TTL creates distributed locks — when a transaction ID is received, it's atomically locked. Any duplicate with the same ID is immediately rejected in **sub-millisecond** time.

**4. ACID-Guaranteed Settlement**
When the device reconnects, transactions are flushed to Kafka KRaft and settled via PostgreSQL with JPA \`@Version\` **optimistic locking** — preventing race conditions and double-credits.

🔗 [Live Demo](https://zeromesh-upi.onrender.com) | [GitHub](https://github.com/sundrmmagrwl12/ZeroMesh-UPI)`;
  }

  if (msg.includes("aws") || msg.includes("cloud") || msg.includes("devops") || msg.includes("ci/cd")) {
    return `**Sundram's AWS & Cloud DevOps Experience** ☁️

He completed a structured **6-day hands-on AWS DevOps challenge** through Nextwork:

| Day | Topic | What He Built |
|-----|-------|---------------|
| Day 1 | **IAM & EC2** | Configured IAM roles, policies, and EC2 instances with SSH access |
| Day 2 | **GitHub + AWS DevOps** | Connected GitHub repositories with AWS services via webhooks |
| Day 3 | **AWS CodeArtifact** | Set up private artifact repositories for dependency management |
| Day 4 | **AWS CodeBuild** | Built a full CI pipeline with \`buildspec.yml\`, automated build execution |
| Day 5 | **Automated Deployment** | Wired the full CI → CD pipeline for automated deployments |
| Day 6 | **Build a CI/CD Pipeline with AWS** | Architected end-to-end multi-stage pipeline connecting source, build, and automated deployment |

**Also used in projects:**
- **Docker & Docker Compose** — ZeroMesh-UPI local orchestration
- **CloudFormation templates** — infrastructure as code
- **GitHub Actions/Webhooks** — automated build triggers

📄 **Verified Hands-on Implementation Proofs (View in New Tab):**
- 🌟 [**All-in-One Master Proof Document (Days 1–5 Merged PDF)**](/aws-proofs/aws-devops-complete-proofs.pdf)
- [**Day 1: IAM & EC2 Instance Proof (PDF)**](/aws-proofs/day-1-iam-ec2.pdf)
- [**Day 2: GitHub + AWS DevOps Webhook Proof (PDF)**](/aws-proofs/day-2-aws-devops-github.pdf)
- [**Day 3: AWS CodeArtifact Repo Proof (PDF)**](/aws-proofs/day-3-codeartifact.pdf)
- [**Day 4: AWS CodeBuild CI Pipeline Proof (PDF)**](/aws-proofs/day-4-codebuild.pdf)
- [**Day 5: Automated Deployment Pipeline Proof (PDF)**](/aws-proofs/day-5-deployment.pdf)

This makes Sundram a **cloud-ready backend engineer**, not just someone who puts "AWS" on a resume!`;
  }

  if (msg.includes("internship") || msg.includes("step2gen") || msg.includes("experience")) {
    return `**Step2gen Technologies — Software Trainee (Jan 2026 – Jun 2026)** 💼

**Location:** Mohali, Punjab

**Real Industry Development & Mentorship Model:**

- 🎯 **Milestone-Driven Progression** — Underwent structured, production-grade training across the entire stack: from **Web Fundamentals (HTML5, CSS3, JavaScript)** to **Enterprise Backend (C#, ASP.NET Core, LINQ, MS SQL Server)**.
- 👨‍🏫 **Mandatory Mentor Code Reviews** — After completing each technology module, had to build and submit complex assignments that were rigorously code-reviewed and evaluated by senior mentors before unlocking the next module.
- ⚡ **High-Pressure Sprint Deadlines** — Delivered backend and API modules under strict **24–48 hour sprint deadlines**, ensuring industry-grade code quality, SOLID principles, Clean Architecture, and Dependency Injection.
- 🗃️ **Database & ORM Mastery** — Built optimized data-access layers using **LINQ** and **Entity Framework Core** with **MS SQL Server**, handling schema design, stored procedures, server-side validations, and Postman API contract testing.

This wasn't a passive certificate course — it was hands-on, mentor-verified engineering that proved Sundram can learn fast, write clean maintainable code, and deliver under real sprint deadlines!`;
  }

  if (msg.includes("switch") || msg.includes("mern") || msg.includes("node") || msg.includes("why java")) {
    return `**Why did Sundram switch from MERN/Node.js to Java Spring Boot?** 🔄

Great question that shows deliberate career engineering!

**Phase 1: Full-Stack Foundations (Node.js / MERN)**
Sundram started with the JavaScript ecosystem — building **WanderLust** (a full-stack hotel listing platform with Node.js, Express, MongoDB, Passport.js, Cloudinary, and Mapbox). This gave him:
- End-to-end web development experience
- REST API design, MVC architecture, auth flows
- Database design with MongoDB & Mongoose

**Phase 2: The Conscious Switch to Java Backend**
After gaining full-stack foundations, Sundram made a deliberate decision to specialize in **enterprise-grade Java backend engineering** because:

1. **Market Demand** — Java Spring Boot dominates enterprise backend roles (banking, fintech, e-commerce)
2. **Architectural Depth** — Java's ecosystem enables true distributed systems: Kafka, Redis locking, ACID transactions, Microservices
3. **Career Trajectory** — Backend/systems engineering requires deep specialization, not broad surface knowledge

The result: **ZeroMesh-UPI** — a project that most mid-level developers couldn't architect.

This switch story actually makes Sundram *more* valuable — he understands full-stack context but specializes in high-performance backend systems.`;
  }

  if (msg.includes("dsa") || msg.includes("leetcode") || msg.includes("gfg") || msg.includes("geeksforgeeks") || msg.includes("problem") || msg.includes("algorithm")) {
    return `**Sundram's DSA & Algorithmic Problem-Solving Track Record** 📊

**Verified Live Statistics (Zero Exaggeration):**
- 🏆 **GeeksforGeeks:** **Institute Rank #3** across Lloyd Institute of Engineering & Technology (Coding Score: **1512**, **456** Problems Solved, **110** POTDs Solved) — [GFG Profile](https://www.geeksforgeeks.org/profile/sundramsihn0i?tab=activity)
- 💻 **LeetCode:** **385** Problems Solved (212 Medium, 148 Easy, 25 Hard) — [LeetCode Profile](https://leetcode.com/u/Sundram_Singhal/)
- 🚀 **Combined Total:** **800+** Data Structures & Algorithms problems solved across platforms.

**Core Topic Strengths:**
- Arrays, Hashing & Two Pointers
- Dynamic Programming & Recursion
- Graph Theory, BFS/DFS & Shortest Paths
- Sliding Window, Heaps & Monotonic Stacks
- System Design & Concurrency Patterns

**Certifications:**
- GeeksforGeeks **Data Structures & Algorithms with C++** (Jun 2025)
- Forage **Advanced Software Engineering Job Simulation** (Apr 2025)

**Engineering Application in Real Systems:**
In his flagship project **ZeroMesh-UPI**, his algorithmic thinking is directly evident:
1. The **Bluetooth Mesh Gossip Protocol** with hop decay is applied **Graph Traversal (TTL decay)**.
2. The **Redis SETNX deduplication** uses sub-millisecond **Hash Map O(1)** distributed lookups.
3. The **Kafka partitions & JPA @Version** implement concurrency control and **distributed idempotency**.`;
  }

  if (msg.includes("contact") || msg.includes("reach") || msg.includes("email") || msg.includes("phone")) {
    return `**Here's how to reach Sundram Singhal directly:** 📬

- 📧 **Email:** sundramsinghal944@gmail.com
- 📞 **Phone:** +91 7906389315
- 💼 **LinkedIn:** [linkedin.com/in/sundram-singhal-b94069252](https://www.linkedin.com/in/sundram-singhal-b94069252/)
- 💻 **GitHub:** [github.com/sundrmmagrwl12](https://github.com/sundrmmagrwl12)
- 📍 **Location:** Greater Noida, Uttar Pradesh

**Availability:**
- ✅ Immediate Joiner (Available for full-time roles)
- 🌍 Open to relocate anywhere in India
- 💻 Also open to Remote / Hybrid opportunities

Feel free to reach out — he responds promptly!`;
  }

  if (msg.includes("resume") || msg.includes("cv") || msg.includes("download")) {
    return `**Sundram Singhal — Resume Options** 📄

You can access Sundram's verified resume directly:

- 👁️ [**View Resume in New Tab**](${PROFILE.contact.resume}) — Instant in-browser preview without downloading or cluttering your storage.
- ⬇️ [**Download Resume (PDF)**](${PROFILE.contact.resume}) — Direct PDF file download for ATS screening or forwarding to hiring teams.

**Quick Summary:**
- **Target Role:** Backend Developer / SDE-1
- **Core Stack:** Java 17/21, Spring Boot 3, Kafka, Redis, PostgreSQL, AWS DevOps CI/CD
- **DSA Record:** 800+ Solved (LeetCode 385, GFG 456, GFG Rank #3)
- **Education:** B.Tech CSE (2022–2026), 8.21 CGPA (1st Division with Honours)
- **Availability:** Immediate Joiner (Open to Opportunities)`;
  }

  return `I'm Sundram Singhal's AI Portfolio Assistant! I can answer detailed questions about:

- ⚡ **Why to hire Sundram** for Backend Developer / SDE-1 roles
- 🛡️ **ZeroMesh-UPI** — his flagship distributed systems project
- ☁️ **AWS & CI/CD** hands-on experience
- 💼 **Step2gen internship** experience
- 🔄 His **career switch** from MERN to Java Spring Boot
- 📊 **DSA track record** and academic achievements
- 📬 **How to contact** him

What would you like to know about Sundram?`;
}
