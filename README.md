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
