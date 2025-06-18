# mChat - AI-Powered Chat Application

A modern, production-ready chatbot web application built with React, TypeScript, and Tailwind CSS. Features secure authentication, real-time messaging, and an intuitive user interface with both light and dark modes.

![mChat Screenshot](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=mChat+Demo)

## ✨ Features

### Core Functionality

- 🔐 **Secure Authentication** - JWT-based login and registration system
- 💬 **Real-time Chat Interface** - Smooth messaging experience with typing indicators
- 🎨 **Modern UI/UX** - Clean, responsive design with light/dark mode support
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🎤 **Voice Input** - Speak your messages using the browser's speech recognition
- 📤 **Chat Export** - Export conversations as JSON or individual messages as text
- 🔍 **Chat Search** - Find previous conversations quickly
- ⚡ **Auto-scroll** - Automatic scrolling to new messages
- 📝 **Message Templates** - Quick access to common prompts

### Technical Features

- 🚀 **React 18** with TypeScript for type safety
- 🎯 **React Router 6** for client-side routing
- 🎨 **Tailwind CSS** for modern styling
- 🧩 **Radix UI** components for accessibility
- 🌙 **Theme Support** - Light, dark, and system themes
- 🔥 **Vite** for fast development and building
- 🧪 **Vitest** for testing
- 📦 **Production Ready** - Optimized build with proper error boundaries

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd mChat
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

For testing purposes, you can use these demo accounts:

- **Email:** `demo@example.com` **Password:** `demo123`
- **Email:** `test@example.com` **Password:** `test123`

Or create a new account using the registration form.

## 🏗️ Architecture

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and auth logic
├── pages/              # Route components
└── main.tsx           # Application entry point
```

### Key Components

- **AuthProvider** - Manages authentication state globally
- **ThemeProvider** - Handles light/dark mode switching
- **ChatInterface** - Main chat component with real-time messaging
- **MessageInput** - Advanced input with voice support and templates
- **ChatSidebar** - Chat history with search and organization

## 🎯 Usage

### Authentication

1. Visit the application homepage
2. Choose between **Sign In** or **Sign Up**
3. Use demo credentials or create a new account
4. You'll be redirected to the chat interface upon successful authentication

### Chatting

1. Type your message in the input field at the bottom
2. Press **Enter** to send (or **Shift+Enter** for new lines)
3. Use the **microphone icon** for voice input (if supported by your browser)
4. Click the **lightbulb icon** for message templates
5. Export conversations using the **download icon** in the header

### Voice Input

1. Click the microphone icon in the message input
2. Allow microphone access when prompted
3. Speak your message clearly
4. The text will appear in the input field
5. Edit if needed and send

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run type checking:

```bash
npm run typecheck
```

## 🏗️ Building for Production

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory, ready for deployment.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Other Platforms

The application builds to static files and can be deployed to any static hosting service.

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your-api-endpoint
VITE_APP_NAME=mChat
```

### Theming

Customize the application theme by editing:

- `src/index.css` - CSS variables for colors
- `tailwind.config.ts` - Tailwind configuration
- Brand colors are defined in the `brand` color palette

## 🛠️ Development

### Code Quality

- **ESLint** and **Prettier** are configured for code formatting
- **TypeScript** provides type safety
- **Husky** can be added for pre-commit hooks

### Adding New Features

1. Create components in the appropriate directory
2. Export from index files for clean imports
3. Add tests for new functionality
4. Update this README if needed

## 📚 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router 6
- **UI Components:** Radix UI, Lucide Icons
- **Styling:** Tailwind CSS with CSS variables
- **Build Tool:** Vite
- **Testing:** Vitest
- **Authentication:** JWT (mock implementation)
- **State Management:** React Context + Hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Live Demo:** [Deploy and add your URL here]

**Repository:** [Add your GitHub repository URL here]
