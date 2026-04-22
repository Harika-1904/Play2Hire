 🎯 **Play2Hire**

**Project Overview**

Play2Hire is a full-stack MERN web application that connects learners and recruiters through interactive learning modules, quizzes, and games.  
It helps users improve their skills and track progress while enabling recruiters to find and invite suitable candidates.

## Frontend

The frontend of this project is developed using React, a powerful JavaScript library. It handles routing and rendering of multiple components such as the learner dashboard, recruiter dashboard, login/register pages, quiz modules, and game interfaces.

The UI is designed using HTML, CSS, and JavaScript to provide a smooth and engaging user experience. It also supports multi-language functionality using i18n.

The frontend communicates with the backend using API calls to fetch and update user data such as scores, progress, and recruiter invites.

## Backend

The backend of this project is built using Node.js and Express.js. It acts as a bridge between the frontend and the database.

It provides APIs for:
- User registration and login  
- Score updating and tracking  
- Recruiter invite system  
- Fetching user data  

MongoDB Atlas is used as the database to store user details, module scores, and invite data efficiently.

**Key Features**

- Quiz Modules for skill assessment (HTML, CSS, JS, Aptitude, HR)
- Interactive Games for learning (Memory Game, HR Match Game)
- Real-time Progress Tracking with dashboard
- Recruiter Invite & Notification System
- Multi-language Support (i18n)
- Responsive UI for smooth user experience

**Tech Stack**

Category    Technology  
Frontend    React.js  
Backend     Node.js, Express.js  
Database    MongoDB Atlas  
Deployment  AWS EC2  

**Project Structure**

Play2Hire/
│  
├── backend/          # API & database logic  
├── frontend/           # Frontend application  
├── package.json  
└── README.md  

**Installation & Setup**

Step 1: Clone Repository

git clone https://github.com/Hark- 1904/Play2Hire.git  
cd play2hire  

Step 2: Install Dependencies

Backend
cd backend  
npm install  

Frontend
cd frontend  
npm install  

Step 4: Run Application

Backend
npm start

Frontend
npm run dev  

**API**

- Base URL: "http://localhost:5000"  
- Provides features like:
  - User authentication  
  - Score updates  
  - Recruiter invites  
  - Dashboard data  

**Future Enhancements**

- AI-based skill analysis  
- Advanced mock interview system  
- Mobile application  
- Gamification (badges, leaderboards)  

**Project Goal**

To build a platform that combines learning and hiring by helping users improve skills and connect with recruiters efficiently.

**Author**

Harika  

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
