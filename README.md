# 🔥 Resume Roaster
<img width="1340" height="678" alt="Screenshot 2026-03-13 201438" src="https://github.com/user-attachments/assets/647edc69-b50f-404f-81ae-2547244f6bd9" />

**Resume Roaster** is an AI-powered tool that analyzes your resume and provides **brutally honest recruiter-style feedback**.

Upload your resume, and the AI will:

* Roast weak points
* Evaluate ATS compatibility
* Suggest improvements
* Rewrite your summary

The goal is simple: **make your resume stronger before recruiters see it.**

---

# 🚀 Live Demo
[Click](https://resume-roaster-alpha.vercel.app/)

---

# ✨ Features

### 🔥 Brutal Resume Roast

AI analyzes your resume like a tired tech recruiter and highlights weak areas.

### 📊 ATS Score

Estimate how well your resume will perform in **Applicant Tracking Systems (ATS)**.

### 🧠 Smart Suggestions

Receive actionable tips to improve projects, skills, and descriptions.

### ✍️ Resume Rewrite

AI generates a **stronger version of your resume summary**.

### 📄 PDF Upload

Upload your resume directly as a **PDF file**.

### 💻 Terminal Style Results

Results are displayed in a **Matrix-inspired terminal UI**.

---

# 🖥️ Application Screenshots

<img width="1340" height="678" alt="Screenshot 2026-03-13 201438" src="https://github.com/user-attachments/assets/647edc69-b50f-404f-81ae-2547244f6bd9" />
<img width="1353" height="679" alt="Screenshot 2026-03-13 201458" src="https://github.com/user-attachments/assets/b9cb52bb-a696-42a3-92ab-eb4f2a98e76f" />

---

# 🧠 How It Works

```
User uploads resume
        ↓
PDF is parsed
        ↓
Resume text sent to AI
        ↓
AI analyzes resume
        ↓
ATS score + roast generated
        ↓
Results displayed in terminal UI
```

---

# 🏗️ Tech Stack

Frontend

* React
* TypeScript
* Tailwind CSS
* Vite
* Axios

Backend

* Node.js
* Express
* Multer (file uploads)
* pdf-parse (PDF extraction)
* node-cron (file cleanup)

AI

* OpenRouter API
* DeepSeek LLM

Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```
resume-roaster
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── services
│   │
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── routes
│   │   └── utils
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/RohitVerma2003/Resume-Roaster
```

Move into project

```
cd Resume-Roaster
```

---

# ▶️ Run Backend

```
cd backend
npm install
npm run dev
```

Backend runs on

```
http://localhost:8000
```

---

# ▶️ Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:8000/api
```

Backend `.env`

```
PORT=8000
OPENROUTER_API_KEY=your_api_key
```

---

# 📦 Deployment

Frontend deployed on **Vercel**

```
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Backend deployed on **Render**

```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

---

# ⚠️ Upload Limits

For optimal performance:

* Only **PDF resumes**
* Maximum **2 pages**
* Maximum **5MB file size**

---

# 📈 Future Improvements

* Resume section-by-section analysis
* Cover letter generator
* Job description matching
* Shareable roast results
* Resume improvement scoring

---

# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first.

---

# 👨‍💻 Author

[Rohit Verma](https://www.rohiit.in/)

LinkedIn
[https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/rohitdverma/)

GitHub
[https://github.com/yourusername](https://github.com/RohitVerma2003)
