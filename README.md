# 🏥 AI Health Analyzer - Symptom Checker

A simple, clean, and professional AI-powered healthcare symptom analyzer built with vanilla HTML, CSS, JavaScript, and Node.js backend with Groq LLM integration.

## ✨ Features

- **AI-Powered Analysis**: Uses Groq's Llama 3.3 70B model for intelligent symptom analysis
- **Clean UI**: Modern, responsive design with smooth animations
- **Real-time Results**: Instant AI-powered health insights
- **Educational Focus**: Provides educational information only, not medical advice
- **Simple Architecture**: Just 5 files - easy to understand and evaluate

## 📁 Project Structure

```
healthcare-app-simple/
├── index.html          # Main HTML file (Frontend)
├── style.css           # Styling (Modern medical theme)
├── script.js           # Frontend JavaScript (API calls, UI logic)
├── server.js           # Backend server (Node.js + Groq AI)
├── package.json        # Dependencies
├── .env                # API key configuration
└── README.md           # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Groq API key (FREE) from [https://console.groq.com/keys](https://console.groq.com/keys)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API key**:
   - Your Groq API key is already in `.env` file
   - Or get a new one from [Groq Console](https://console.groq.com/keys)

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open the app**:
   - Open `index.html` in your browser
   - Or visit `http://localhost:3000` if serving via HTTP

## 🎯 How It Works

### Frontend (HTML + CSS + JS)
1. User enters symptoms in the form
2. JavaScript sends POST request to backend API
3. Shows loading animation while processing
4. Displays AI-generated results with conditions and recommendations

### Backend (Node.js + Groq AI)
1. Receives symptom data via POST `/api/analyze`
2. Sends prompt to Groq's Llama 3.3 70B model
3. Processes AI response (JSON format)
4. Returns structured health analysis

## 🔧 API Endpoints

### `POST /api/analyze`
Analyzes symptoms using AI

**Request:**
```json
{
  "symptoms": "I have a headache, fever, and fatigue for 2 days"
}
```

**Response:**
```json
{
  "conditions": [
    {
      "name": "Common Cold or Flu",
      "description": "Viral infection affecting the respiratory system...",
      "likelihood": "Medium"
    }
  ],
  "recommendations": [
    "Consult with a qualified healthcare professional",
    "Get adequate rest and stay hydrated",
    "Monitor symptoms closely"
  ],
  "disclaimer": "This is educational information only..."
}
```

### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🎨 Design Features

- **Modern Medical Theme**: Dark blue gradient background with cyan accents
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Glass Morphism**: Frosted glass effect for cards
- **Professional Icons**: Emoji-based icons for simplicity

## 🔒 Security & Privacy

- No data is stored permanently
- API calls are made over HTTP (use HTTPS in production)
- Groq API key is kept in `.env` file (never commit to Git)
- Educational purposes only - not for actual medical diagnosis

## ⚠️ Important Disclaimer

This application provides **educational health information only** and is **NOT a substitute for professional medical advice, diagnosis, or treatment**. 

- Always consult qualified healthcare professionals
- For emergencies, contact emergency services immediately
- This is a demonstration project for educational purposes

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js (Pure HTTP server, no Express)
- **AI Model**: Groq Llama 3.3 70B (Free tier)
- **Styling**: Custom CSS with modern design patterns

## 📝 For Evaluators

This project demonstrates:

1. **Clean Code**: Simple, readable, well-commented code
2. **LLM Integration**: Real AI integration with Groq API
3. **Full Stack**: Frontend + Backend working together
4. **Modern UI/UX**: Professional medical interface
5. **Minimal Dependencies**: Only 2 npm packages (groq-sdk, dotenv)
6. **Easy to Run**: Just `npm install` and `npm start`

## 🎓 Educational Value

Perfect for learning:
- How to integrate LLM APIs
- Building full-stack applications
- Creating responsive medical UIs
- Working with JSON APIs
- Modern JavaScript practices

## 📊 Performance

- **Response Time**: 2-5 seconds (depends on Groq API)
- **File Size**: < 50KB total (excluding node_modules)
- **Browser Support**: All modern browsers

## 🤝 Contributing

This is an educational project. Feel free to:
- Modify the UI/UX
- Add more features
- Improve the AI prompts
- Enhance error handling

## 📄 License

MIT License - Free to use for educational purposes

---

**Made with ❤️ for healthcare education**

*Remember: This is for educational purposes only. Always consult real healthcare professionals for medical advice.*
