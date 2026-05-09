# 🛡️ CyberHero - Cybersecurity Awareness Game

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0%2B-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0%2B-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0%2B-38b2ac?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)](/))

> 🎮 An interactive **cybersecurity awareness game** that educates players about digital threats and safe online behavior. Features engaging gameplay, real-world scenarios, and educational content about cybersecurity best practices.

### 🌟 Key Features
- 🎯 **Educational Gameplay** - Learn cybersecurity through gaming
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- 📱 **Mobile Responsive** - Play on any device
- 🏆 **Scoring System** - Track progress and achievements
- 🎮 **Joystick Support** - Controller support for enhanced gameplay
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🌐 **Web Deployed** - Play directly in browser

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Gameplay](#gameplay)
- [Scenarios](#scenarios)
- [Controls](#controls)
- [Development](#development)
- [Contributing](#contributing)
- [Deployment](#deployment)

---

## 🎯 Overview

CyberHero is an educational game designed to teach cybersecurity awareness through interactive gameplay. Players face realistic security scenarios and make decisions that impact their score and learning outcomes.

### What You'll Learn
- ✅ Identifying phishing emails
- ✅ Creating strong passwords
- ✅ Recognizing malware symptoms
- ✅ Social engineering tactics
- ✅ Safe browsing practices
- ✅ Data protection principles
- ✅ Incident response basics

---

## ✨ Features

### 1. Interactive Scenarios
Face realistic cybersecurity challenges and make decisions that affect your score.

### 2. Real-time Feedback
Get immediate feedback on your choices with explanations.

### 3. Progress Tracking
Monitor your learning with achievements and statistics.

### 4. Leaderboard
Compete with other players globally.

### 5. Mobile Controls
Full joystick and touch support for enhanced gameplay.

### 6. Responsive Design
Plays perfectly on desktop, tablet, and mobile devices.

---

## 💻 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Modern web browser

### Step 1: Clone Repository
```bash
git clone https://github.com/adammoos/CyberHero.git
cd CyberHero
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Build for Production
```bash
npm run build
```

---

## 🚀 Getting Started

### Development
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
CyberHero/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx
│   │   ├── ScenarioCard.tsx
│   │   ├── PlayerStats.tsx
│   │   └── Leaderboard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Game.tsx
│   │   └── Results.tsx
│   ├── types/
│   │   └── game.ts
│   ├── styles/
│   │   └── globals.css
│   └── App.tsx
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🎮 Gameplay

### Scenario Types

#### 1. Phishing Detection
Identify suspicious emails with phishing indicators.
```
Email: "Urgent: Verify your PayPal account"
├─ Sender: paypal-verify@securemail.net
├─ Link Preview: http://paypal-verify-account.ru
└─ Risk Level: 🔴 HIGH
```

#### 2. Password Strength
Create and evaluate password strength.
```
Password: "MyP@ssw0rd2024!"
├─ Length: 15 characters ✓
├─ Uppercase: Yes ✓
├─ Lowercase: Yes ✓
├─ Numbers: Yes ✓
├─ Special: Yes ✓
└─ Strength: Very Strong 💪
```

#### 3. Malware Recognition
Identify signs of malware infection.
```
Computer Symptoms:
├─ Unusual pop-ups appearing
├─ Browser homepage changed
├─ Computer running slowly
├─ Antivirus disabled
└─ Diagnosis: Likely Malware Infection
```

#### 4. Social Engineering
Recognize and resist social engineering attempts.
```
Phone Call Scenario:
├─ Caller: Claims to be from IT Support
├─ Request: Remote access to your computer
├─ Red Flag: Unsolicited contact
└─ Recommended Action: Hang up and contact IT directly
```

---

## 🎮 Controls

### Keyboard
- **Arrow Keys** - Move player
- **Space** - Jump/Action
- **Enter** - Select option
- **Esc** - Pause game

### Joystick
- **Left Stick** - Move player
- **Button A** - Jump/Action
- **Button X** - Select option
- **Button Start** - Pause

### Mobile
- **Touch Controls** - Tap to move
- **Tap Buttons** - Select options

---

## 🛠️ Development

### Project Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start dev server
npm run dev
```

### Code Structure

#### Component Example
```typescript
// src/components/ScenarioCard.tsx
import { useState } from 'react'
import type { Scenario } from '../types/game'

interface ScenarioCardProps {
  scenario: Scenario
  onAnswer: (correct: boolean) => void
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onAnswer,
}) => {
  const [answered, setAnswered] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{scenario.title}</h2>
      <p className="text-gray-700 mb-6">{scenario.description}</p>
      
      <div className="space-y-3">
        {scenario.options.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setAnswered(true)
              onAnswer(option.correct)
            }}
            disabled={answered}
            className="w-full p-3 text-left bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}
```

### Adding New Scenarios

```typescript
// src/data/scenarios.ts
export const scenarios: Scenario[] = [
  {
    id: 'phish-001',
    title: 'Suspicious Email',
    description: 'You received an email claiming...',
    type: 'phishing',
    options: [
      { id: 'opt-1', text: 'Click the link', correct: false },
      { id: 'opt-2', text: 'Report as spam', correct: true },
    ],
    difficulty: 'easy',
  },
  // Add more scenarios
]
```

---

## 📊 Demo & Output

### Game Statistics
```
╔════════════════════════════════════════╗
║     CYBERHERO - Game Statistics        ║
╠════════════════════════════════════════╣
║                                        ║
║  Total Score: 8,750 points            ║
║  Accuracy: 87%                         ║
║  Scenarios Completed: 25               ║
║  Time Played: 2 hours 45 minutes       ║
║                                        ║
║  ACHIEVEMENTS:                         ║
║  ✓ Phishing Master (5/5 correct)      ║
║  ✓ Password Expert (10/10 strong)     ║
║  ✓ Quick Learner (Complete 5 in 10min)║
║                                        ║
║  NEXT CHALLENGE:                       ║
║  Malware Detection Level - Hard        ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy dist folder to Netlify
netlify deploy --prod --dir=dist
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

```bash
# Build and run
docker build -t cyberhero .
docker run -p 3000:3000 cyberhero
```

---

## 🐛 Troubleshooting

### Problem: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Vite dev server not starting
```bash
# Check if port is in use, try different port
npm run dev -- --port 5174
```

### Problem: Build size too large
```bash
# Analyze bundle
npm run build -- --analyze

# Optimize images and assets
npx imagemin src/assets -o src/assets
```

---

## 🤝 Contributing

### Contribution Ideas
- 🎮 New game scenarios
- 🎨 UI/UX improvements
- 📊 Analytics dashboard
- 🌍 Multilingual support
- ♿ Accessibility enhancements
- 🎯 Mobile app (React Native)
- 📱 Progressive Web App

### How to Contribute
1. Fork repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new scenario'`)
4. Push to branch
5. Open Pull Request

---

## 📚 Resources

### Technologies
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Cybersecurity
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Cybersecurity Basics](https://www.cisa.gov/)

---

## 📞 Support

**Author:** Mohammed Adam Mejri  
**Website:** [Live Demo](https://cyberhero.vercel.app/)  
**GitHub:** [adammoos](https://github.com/adammoos)  
**LinkedIn:** [Mohammed Adam Mejri](https://www.linkedin.com/in/mohammed-adam-mejri-259124404/)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<div align="center">

### ⭐ If this project helped you learn cybersecurity, consider giving it a star!

**Made with ❤️ for cybersecurity awareness by [Mohammed Adam Mejri](https://github.com/adammoos)**

[⬆ Back to Top](#-cyberhero---cybersecurity-awareness-game)

</div>
