# 💼 Job by Emad

> ابحث عن وظيفتك في أي مكان — Find your job anywhere

A professional React Native (Expo) job search application with Arabic/English support, subscription plans, and a Vercel-powered backend.

## ✨ Features

- 🔍 **Smart Search** — Find job opportunities across embassies and diplomatic missions worldwide
- 🌍 **24+ Countries** — Egypt, Saudi Arabia, UAE, Kuwait, Qatar, and many more
- 🌐 **Bilingual** — Full Arabic & English support with RTL layout
- ⭐ **Subscription Plans** — Free, Basic, Pro, and Global tiers
- 🔔 **Daily Alerts** — Automated job notifications (Pro feature)
- 🎨 **Professional Design** — Navy & gold theme with smooth animations
- 📱 **Cross-Platform** — iOS & Android via Expo

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/job-by-emad.git
cd job-by-emad

# Install dependencies
npm install

# Start the app
npx expo start
```

### Backend Deployment (Vercel)

```bash
cd backend
npm install
npx vercel deploy
```

Then update `src/utils/api.js` with your Vercel URL.

## 🏗️ Project Structure

```
job-by-emad/
├── App.js                    # Main entry + tab navigation
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Search screen
│   │   ├── ResultsScreen.js  # Results display
│   │   ├── PackagesScreen.js # Subscription plans
│   │   └── SettingsScreen.js # Settings & preferences
│   ├── components/
│   │   ├── Header.js         # Reusable header
│   │   ├── Button.js         # Styled button
│   │   └── Card.js           # Card container
│   ├── context/
│   │   └── AppContext.js     # Global state management
│   ├── utils/
│   │   ├── api.js            # Backend API client
│   │   └── i18n.js           # Translations (AR/EN)
│   └── constants/
│       └── colors.js         # Design tokens
├── backend/
│   ├── api/
│   │   └── search.js         # Search API endpoint
│   ├── package.json
│   └── vercel.json           # Vercel config
└── README.md
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#0A1628` | Deep navy backgrounds |
| Accent | `#F5A623` | Gold highlights & CTAs |
| Secondary | `#2E86DE` | Electric blue accents |
| Success | `#2ED573` | Success states |
| Danger | `#FF4757` | Error states |

## 📄 License

MIT © Emad
