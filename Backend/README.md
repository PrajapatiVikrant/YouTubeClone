# YouTube Clone - Backend

This is the backend of a YouTube Clone application built using **Node.js**, **Express.js**, and **MongoDB**.  
It provides RESTful APIs for user authentication, video management, comment handling, channel operations, and AI-powered video suggestions (title, description, hashtags).

---

## 🌐 Live API Endpoint

- Backend deployed at: `https://youtube-backend-lovat.vercel.app`  


---

## Features

- JWT-based user authentication
- Video upload, update, delete, and fetch
- Comment add/edit/delete on videos
- Channel creation and channel-specific video listing
- Search by video title and category filtering
- AI-powered feature: suggest video titles, descriptions, and hashtags
- Secure routes using middleware
- Error handling and proper HTTP response codes

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (for authentication)
- dotenv
- Axios (for internal/external requests, e.g., AI services)

---

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/PrajapatiVikrant/YouTubeClone.git
cd YouTubeClone/backend
npm install
npm run dev
