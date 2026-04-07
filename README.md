# 🚀 PrepWise – AI Interview Platform

PrepWise is a full-stack AI-powered mock interview platform that helps candidates practice role-based interviews, receive real-time feedback, and track performance with detailed analytics and reports.

---

## 🌐 Live Demo

🔗 **Frontend:** https://prepwiseai.onrender.com/
🔗 **Backend API:** https://ai-interview-system-nsjo.onrender.com

---

## 🌟 Key Highlights

* 💡 End-to-End Full Stack Application (MERN + AI)
* 🤖 AI-powered question generation & answer evaluation
* 🎤 Voice-based interview simulation
* 💳 Razorpay payment integration (credit system)
* 📊 Analytics dashboard with PDF reports
* ☁️ Production-ready deployment (Render)

---

## 🧠 Features

### 🔐 Authentication

* Google Sign-In using Firebase
* JWT-based authentication with secure HTTP-only cookies

### 📄 Resume Analysis

* Upload PDF resumes
* AI extracts structured data (skills, experience, etc.)

### 🎯 Interview System

* Role-based and experience-based questions
* AI-generated dynamic interview flow
* Timed interview sessions

### 🎙️ Voice Interaction

* Speech-to-text (user answers)
* Text-to-speech (AI interviewer)

### 📈 Performance Tracking

* Real-time feedback
* Final scorecard:

  * Communication
  * Confidence
  * Technical accuracy

### 📑 Reports

* Downloadable PDF reports
* Interview history tracking

### 💰 Payment System

* Razorpay integration
* Credit-based usage system

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Tailwind CSS
* Recharts
* jsPDF

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (File Uploads)

### AI & Integrations

* OpenRouter API
* Firebase Authentication
* Razorpay Payment Gateway

---

## 📂 Project Structure

```
INTERVIEW_BOT/
│
├── client/                # React Frontend
├── server/                # Express Backend
│   ├── controller/        # Business Logic
│   ├── routes/            # API Routes
│   ├── middlewares/       # Auth & Upload Middleware
│   ├── models/            # Database Schemas
│   ├── services/          # AI & Payment Services
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd INTERVIEW_BOT
```

### 2️⃣ Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

---

### 3️⃣ Environment Variables

#### 📌 Server (`server/.env`)

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
CLIENT_URLS=http://localhost:5173
NODE_ENV=development
```

#### 📌 Client (`client/.env`)

```env
VITE_FIREBASE_APIKEY=your_key
VITE_RAZORPAY_KEY_ID=your_key
VITE_SERVER_URL=http://localhost:8000
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| POST   | `/api/auth/google`                  | Login/Register       |
| GET    | `/api/auth/logout`                  | Logout               |
| GET    | `/api/user/current-user`            | Get current user     |
| POST   | `/api/interview/resume`             | Parse resume         |
| POST   | `/api/interview/generate-questions` | Generate interview   |
| POST   | `/api/interview/submit-answer`      | Evaluate answer      |
| POST   | `/api/interview/finish`             | Generate report      |
| GET    | `/api/interview/report/:id`         | Fetch report         |
| POST   | `/api/payment/order`                | Create payment order |
| POST   | `/api/payment/verify`               | Verify payment       |

---

## ☁️ Deployment (Render)

* Backend Start Command: `npm start`
* Add environment variables in Render dashboard
* Configure:

  * `CLIENT_URLS`
  * `VITE_SERVER_URL`

---

## 🔐 Security Features

* HTTP-only cookies for authentication
* JWT-based session handling
* Route protection & ownership validation
* Input validation & error handling
* Secure file upload handling

---

## 📌 Resume Highlights

* Built a scalable AI-powered interview platform using MERN stack
* Integrated AI for resume parsing and automated evaluation
* Implemented secure authentication & payment gateway
* Designed analytics dashboard with PDF reporting
* Deployed production-ready application using cloud infrastructure

---

## 🚀 Future Improvements

* AI video interview simulation
* Real-time proctoring system
* Company-specific interview preparation
* Advanced analytics dashboard

---

## ⚠️ Important Notes

* Never commit `.env` files
* Rotate API keys if exposed
* Use environment variables in production

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 📬 Contact

Feel free to connect for collaboration or opportunities 🚀
