# 🚀 TelecomAI - Proactive AI Support Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with NextGen Cloud](https://img.shields.io/badge/Built%20with-NextGen%20Cloud-ff69b4)](https://nextgencloud.dev)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Features Explained](#core-features-explained)
- [Backend & Database](#backend--database)
- [AI Integration](#ai-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**TelecomAI** is a revolutionary AI-powered customer support ecosystem designed specifically for telecommunications companies. It transforms traditional reactive support into a proactive, intelligent, and human-centric system that predicts and resolves issues before customers even notice them.

### The Problem We Solve

Traditional telecom customer support faces critical challenges:
- ⏱️ **High Response Times**: Customers wait hours for simple queries
- 📊 **Overwhelming Volume**: Support teams drowning in repetitive tickets
- 🔄 **Reactive Approach**: Issues discovered only after complaints

### Our Solution

A comprehensive 4-part AI ecosystem that:
- 🔮 Predicts issues before they arise
- 💬 Provides instant, intelligent responses
- 🎯 Routes complex cases to human experts
- 📈 Continuously learns and improves

## ✨ Key Features

### 1. **Proactive Notification Sender** 📢
- AI-powered predictive analytics
- Automated customer alerts before issues occur
- Smart notification summaries
- Multi-channel delivery (SMS, email, push)

### 2. **AI Chatbot Assistant** 🤖
- Natural language understanding
- Context-aware responses
- 24/7 availability
- Handles billing, plans, and technical queries
- Seamless escalation to human agents

### 3. **AI Caller System** 📞
- Voice-enabled AI support
- Emotional intelligence detection
- Natural conversation flow
- Automatic call summarization
- Smart routing to human agents when needed

### 4. **Smart Ticketing System** 🎫
- Automatic ticket creation and categorization
- AI-powered priority assignment
- Real-time ticket tracking
- Integration with all support channels
- Advanced analytics and reporting

### 5. **SMS Summarizer** 📱
- Condenses long SMS threads
- Extracts key information
- Action item identification
- Real-time processing

## 🛠️ Technology Stack

### Frontend
- **React 18.3**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **React Router**
- **TanStack Query**
- **Lucide React**

### Backend & Infrastructure
- **NextGen Cloud** - Full-stack cloud platform powered by Supabase
- **PostgreSQL** - Reliable database
- **Edge Functions** - Serverless backend logic
- **Real-time Subscriptions** - Live data updates

### AI & ML
- **NextGen Cloud AI** - Integrated AI capabilities
- **Google Gemini 2.5** (Flash/Pro) - Advanced language models
- **OpenAI GPT-5** (Nano/Mini) - Powerful reasoning
- **Streaming Responses** - Real-time AI output

### Design System
- **Custom CSS Variables** - HSL-based color system
- **Gradient Animations**
- **Glassmorphism**
- **Responsive Design**

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Git**

### Installation

```bash
git clone <YOUR_GIT_URL>
cd intelligent-cust-flow
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Environment Variables

The project uses **NextGen Cloud**, which automatically configures environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

> Note: `.env` file is auto-generated — do not edit manually.

## 📁 Project Structure

```
intelligent-cust-flow/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── integrations/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── functions/
│   └── config.toml
├── public/
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## 🎯 Core Features Explained

### Interactive Support Demo

Located in `/demo`, showcasing:
- Live proactive notifications
- Real-time AI chat
- Voice call simulation
- Automatic ticket creation

### Smart Ticketing Workflow

1. Creation from any channel  
2. Categorization by AI  
3. Assignment to the right agent  
4. Tracking in real-time  
5. Resolution assisted by AI  

**Categories**:
- 📱 Technical Issues  
- 💰 Billing Queries  
- 📦 Service Requests  
- 🔐 Account Management  

### SMS Summarizer

1. Input SMS thread  
2. AI generates concise summary  
3. Highlights key action points  
4. Streams results live  

## 🗄️ Backend & Database

### NextGen Cloud (Supabase)

Includes:
- Managed PostgreSQL  
- Row Level Security (RLS)  
- Real-time updates  
- Edge Functions  
- Authentication  

**Key Tables:**
- `tickets`
- `chat_messages`
- `notifications`
- `call_logs`
- `profiles`

**Edge Functions:**
- `chat`
- `categorize-ticket`
- `generate-notification`

## 🤖 AI Integration

### NextGen Cloud AI Models

1. **Google Gemini 2.5 Pro**
2. **Google Gemini 2.5 Flash**
3. **Google Gemini 2.5 Flash Lite**
4. **OpenAI GPT-5**
5. **OpenAI GPT-5 Mini**
6. **OpenAI GPT-5 Nano**

### Example: AI Chat

```typescript
const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: userMessage }
      ]
    })
  }
);
```

## 🎨 Design System

**Colors:**
- `--primary` (263° 70% 60%)  
- `--secondary` (195° 95% 55%)  
- `--accent` (330° 85% 60%)  

**Typography:**
- Headings → Space Grotesk  
- Body → Inter  
- Monospace → Orbitron  

**Animations:**
- `animate-float`
- `animate-glow-pulse`
- `animate-shimmer`

## 🌐 Deployment

### Custom Domain
1. Go to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS setup

### Manual Deployment

```bash
npm run build
```

Then deploy `/dist` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting provider

## 🤝 Contributing

1. **Fork the repo**
2. **Create a feature branch**
3. **Commit and push**
4. **Open a PR**

Follow code style:
- TypeScript
- ESLint + Prettier
- Semantic colors
- Mobile-first UI

## 🧪 Testing

Before PR:
- Test on multiple devices
- Validate AI responses
- Check for console errors
- Verify real-time data updates

## 📝 License

© 2025 Ishika Saxena. All rights reserved.


---

## 📧 Contact

For questions or support:
- Email: ishikasaxena2306@gmail.com
- GitHub Issues: [Report a bug](../../issues)
