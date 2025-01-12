# Frontend React Project Setup Envision Blogs site 

This is a React frontend project that connects to our Node.js backend API.

## Backend API Repository
Backend repository: [https://github.com/Udayanzoysa/envision-back.git](https://github.com/Udayanzoysa/envision-back.git)
Live Demo URL: [https://envision-olive.vercel.app/]

## Getting Started

1. **Clone the Frontend Repository**
```bash
git clone https://github.com/Udayanzoysa/envision.git
cd envision
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_API_URL = 'http://localhost:5000/api/' {user_backend_server}
```

4. **Start Development Server**
```bash
npm run dev
```

The application will open at [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm start` - Runs development server
- `npm test` - Runs test suite
- `npm run build` - Builds for production
- `npm run eject` - Ejects from Create React App

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

## Connect to Backend

Make sure the backend server is running at `http://localhost:5000`
(See backend repository for setup instructions)

## Need Help?
Contact Me `https://github.com/Udayanzoysa`
Gmail `unzoysa.un@gmail.com `


# Envision Blog - New Features Update! 🎉

## Latest Features Added

### 1. Guest Comments
- Visitors can now comment on blog posts without logging in
- Enhanced community engagement

### 2. Draft & Publishing System
![Blog List Status Feature](https://raw.githubusercontent.com/your-repo/path-to-image.jpg)

New status management features:
- Blogs are saved as drafts by default
- Double-click the status column to toggle between:
  - `Draft` ⚪
  - `Published` 🟢
- Quick and intuitive status changes directly from the blog list

### Blog List Features
The blog list view now includes:
- Title
- Teaser text
- Tags
- Status (Draft/Published)
- Last Updated timestamp
- Action buttons (Edit/Delete)

## How to Use

1. **Creating a New Blog**
   - Click "New Article"
   - Write your content
   - Blog saves as draft automatically

2. **Publishing a Blog**
   - Navigate to Article Lists
   - Find your blog post
   - Double-click the status column
   - Select "Published"

3. **Guest Comments**
   - Available on all published posts

Cheers! 🎊 Happy blogging
Developer Udaya
