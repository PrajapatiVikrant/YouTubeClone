# YouTube Clone - Frontend

This is the frontend of a YouTube Clone built using **React.js**. It connects with the backend APIs and offers a full-featured video browsing experience similar to YouTube.  
Recently, **AI-powered features** have been integrated to automatically generate suggested video titles, descriptions, and hashtags for creators.

---

## 🌐 Live Demo

- [Live Site](https://youtubefrontend-tau.vercel.app)
- [Project Demo Video](VIDEO_LINK_HERE)

---

## Features

### Home Page
- Header with search bar & sign-in button
- Toggleable sidebar
- Grid layout for video thumbnails
- Category filter buttons

### User Authentication
- Sign in & register via Google Form
- After login, show username in header
- JWT stored in localStorage

### Search & Filter
- Search videos by title
- Filter videos by category

### Video Player Page
- Video player
- Title, description, likes/dislikes
- Add/edit/delete comments

### Channel Page
- Create/manage channel
- Upload/edit/delete videos
- **AI-powered suggestion** for video title, description, and hashtags when uploading a video

### Responsive Design
- Mobile, tablet, and desktop layouts supported

---

## Tech Stack

- React.js
- React Router DOM
- Axios
- Tailwind CSS (or your chosen CSS framework)
- LocalStorage for token management
- **AI Integration** for auto-generating video titles, descriptions, and hashtags

---

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/PrajapatiVikrant/YouTubeClone.git
cd YouTubeClone/frontend
npm install
npm run dev
