# ChatMate AI - Modern AI Chat Assistant

A professional, feature-rich AI chat application with ChatGPT-style interface, AI tools marketplace, image gallery, and intelligent conversation management. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Repository**: [https://github.com/realvivekrana/chatmate-ai-assistant](https://github.com/realvivekrana/chatmate-ai-assistant)

## ✨ Features

### 💬 Advanced Chat System
- **Multi-Chat Management** - Create, rename, and delete multiple conversations
- **Smart History Grouping** - Conversations organized by Today, Yesterday, and Previous Chats
- **Persistent Storage** - All chats saved to localStorage
- **AI Response Engine** - Keyword-based intelligent responses for React, JavaScript, Python, startups, health, and more
- **Code Block Support** - Syntax highlighting with copy functionality
- **Voice Input** - Web Speech API integration for hands-free messaging
- **Message Actions** - Copy, regenerate, and delete messages
- **Auto-scroll** - Smart scrolling with user detection
- **Typing Indicators** - Animated typing dots during AI responses

### 🎨 AI Tools Marketplace
- **AI Code Helper** - Generate code snippets instantly
- **Text Summarizer** - Summarize long articles and documents
- **Blog Generator** - Create engaging blog posts
- **Language Translator** - Translate between 100+ languages
- **Startup Idea Generator** - Get innovative business ideas
- **Email Writer** - Compose professional emails
- **Study Assistant** - Get homework help and explanations
- **Resume Writer** - Create ATS-optimized resumes

### 🖼️ Image Gallery
- **AI-Generated Images** - Curated collection of AI artwork
- **Image Fallback System** - Automatic placeholder for broken images
- **Lazy Loading** - Optimized performance
- **Modal Preview** - Full-screen image viewing with download
- **Responsive Grid** - 2/3/4 columns based on screen size

### 🔍 Additional Features
- **Deep Research** - AI-powered research assistant
- **Health Assistant** - General health information and wellness tips
- **Search Functionality** - Search through all conversations (Ctrl+K)
- **Quick Actions Menu** - Plus button with New Chat, Upload, Generate Image, Gallery
- **Dark/Light Theme** - Toggle between themes with persistence
- **Authentication UI** - Demo login system with multiple providers (Google, Apple, Phone, Email)
- **Mobile Responsive** - Perfect on all devices (320px - 1280px+)

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Web Speech API** - Voice input support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/realvivekrana/chatmate-ai-assistant.git
cd chatmate-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
chat-mate/
├── src/
│   ├── components/
│   │   ├── chat/              # Chat interface components
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatGPTSidebar.tsx
│   │   │   ├── TopNavbar.tsx
│   │   │   ├── WelcomeScreen.tsx
│   │   │   └── AuthModal.tsx
│   │   ├── sections/          # Feature sections
│   │   │   ├── ImagesSection.tsx
│   │   │   ├── AppsSection.tsx
│   │   │   ├── ResearchSection.tsx
│   │   │   └── HealthSection.tsx
│   │   ├── common/            # Shared components
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                 # Custom hooks
│   │   └── useChat.ts
│   ├── utils/                 # Utilities
│   │   └── aiResponses.ts
│   ├── data/                  # Static data
│   │   ├── apps.ts
│   │   ├── galleryData.ts
│   │   └── research.ts
│   └── pages/                 # Page components
│       └── ChatPage.tsx
├── public/                    # Static assets
└── index.html                # Entry point
```

## 🎯 Key Features Explained

### Chat History Grouping
Conversations are automatically organized into:
- **Today** - Chats from today
- **Yesterday** - Chats from yesterday  
- **Previous Chats** - Older conversations

### AI Response Engine
Intelligent keyword-based responses for:
- React & JavaScript development
- Python programming
- Startup ideas & business
- Health & wellness tips
- UI/UX design principles
- AI/ML concepts
- Database queries

### Voice Input
- Click microphone icon to start listening
- Speech automatically converted to text
- Visual feedback with pulse animation
- Browser support detection

### Quick Actions
Plus button menu includes:
- New Chat - Start fresh conversation
- Upload File - Share documents (coming soon)
- Generate Image - AI image creation (demo)
- Open Gallery - Browse AI images

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

Output directory: `dist/`

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize colors:
```css
:root {
  --primary: ...;
  --background: ...;
  /* etc */
}
```

### AI Responses
Modify `src/utils/aiResponses.ts` to customize AI behavior

### Gallery Images
Update `src/data/galleryData.ts` with your images

## 📱 Mobile Support

Fully responsive across all breakpoints:
- 320px (small phones)
- 375px (iPhone SE)
- 412px (Pixel)
- 480px (larger phones)
- 768px (tablets)
- 1024px+ (desktop)

## 🔒 Security Note

This is a frontend-only demo application. For production use:
- Implement proper backend authentication
- Add API rate limiting
- Secure sensitive data
- Use environment variables

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Vivek Rana**
- GitHub: [@realvivekrana](https://github.com/realvivekrana)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

⭐ Star this repo if you find it helpful!
