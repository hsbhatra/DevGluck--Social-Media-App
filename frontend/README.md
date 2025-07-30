# DevGluck Frontend

A modern, responsive React frontend for the DevGluck Social Media App, built with Vite, Redux Toolkit, and Tailwind CSS. Features real-time updates, beautiful animations, and an intuitive user interface.

## 🚀 Features

### User Interface
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Dark/Light Mode** - Theme switching capability
- **Real-time Updates** - Live notifications and chat updates
- **Image Upload** - Drag-and-drop file uploads with preview
- **Voice Messages** - Record and send voice clips in chat

### Core Functionality
- **Authentication** - Secure login/signup with form validation
- **User Profiles** - Customizable profiles with avatar and cover images
- **Feed System** - Infinite scroll post feed with engagement features
- **Post Creation** - Rich text editor with image support
- **Social Interactions** - Like, comment, share, and save posts
- **Follow System** - Follow/unfollow users with real-time updates
- **Real-time Chat** - Instant messaging with Socket.IO
- **Notifications** - Live notification system
- **Search** - Advanced search for users and posts
- **Blogs** - Long-form content creation and sharing
- **Status Updates** - Temporary status sharing
- **Settings** - Comprehensive user preferences

### Technical Features
- **State Management** - Redux Toolkit for global state
- **Routing** - React Router for navigation
- **Real-time Communication** - Socket.IO client integration
- **API Integration** - Axios for HTTP requests
- **Animations** - Framer Motion for smooth transitions
- **Styling** - Tailwind CSS for utility-first styling
- **Icons** - Lucide React and React Icons
- **Form Handling** - Custom form components with validation

## 🛠️ Tech Stack

### Core
- **React 19** - UI library with latest features
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets

### Communication
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API calls

### Utilities
- **Lodash** - JavaScript utility library
- **React Share** - Social media sharing
- **usehooks-ts** - Custom React hooks

## 📦 Installation

### Prerequisites
- Node.js (v22 or higher)
- Backend API running (see backend README)

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── authentication/  # Login/Signup components
│   │   ├── blogs/          # Blog-related components
│   │   ├── buttons/        # Reusable button components
│   │   ├── chat/           # Chat and messaging components
│   │   ├── feed/           # Post feed and interaction components
│   │   ├── followers/      # Follow system components
│   │   ├── loaders/        # Loading and spinner components
│   │   ├── notifications/  # Notification components
│   │   ├── Other/          # Miscellaneous components
│   │   │   └── ui/         # UI components (buttons, navigation)
│   │   ├── post/           # Post creation and display
│   │   ├── profile/        # User profile components
│   │   ├── routeLock/      # Route protection components
│   │   ├── search/         # Search functionality
│   │   └── status/         # Status update components
│   ├── pages/              # Page components
│   │   ├── Blogs.jsx
│   │   ├── EditProfilePage.jsx
│   │   ├── FollowUnfollowPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SavedPostsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── UserPersonalPosts.jsx
│   ├── slices/             # Redux Toolkit slices
│   │   ├── BlogSlice.js
│   │   ├── ChatSlice.js
│   │   ├── NotificationSlice.js
│   │   ├── PostSlice.js
│   │   ├── SearchSlice.js
│   │   ├── SettingSlice.js
│   │   ├── StatusSlice.js
│   │   └── UserSlice.js
│   ├── api/                # API integration
│   │   ├── axiosInstance.js
│   │   ├── notificationApi.js
│   │   └── postApi.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   ├── profileContext.jsx  # Profile context provider
│   └── store.js            # Redux store configuration
├── public/                 # Static assets
│   ├── general/           # General images
│   ├── icons/             # SVG icons
│   └── svg/               # Additional SVG assets
└── package.json           # Dependencies and scripts
```

## 🎨 Component Architecture

### Authentication Components
- `LoginPage.jsx` - User login interface
- `SignupPage.jsx` - User registration interface
- `ProtectedRoute.jsx` - Route protection for authenticated users

### Feed Components
- `Feed.jsx` - Main post feed
- `Post.jsx` - Individual post display
- `PostInput.jsx` - Post creation interface
- `PostInteractions.jsx` - Like, comment, share buttons
- `Comments.jsx` - Comment system

### Chat Components
- `ChatPage.jsx` - Main chat interface
- `Messages.jsx` - Message display
- `MessageInput.jsx` - Message input with voice support
- `MessageCard.jsx` - Individual message display

### Profile Components
- `UserProfileHeader.jsx` - Profile header with stats
- `FollowersFollowing.jsx` - Follow system interface
- `UserPosts.jsx` - User's posts display

## 🔧 Configuration

### Environment Variables
The frontend connects to the backend API. Ensure the backend is running and accessible.

### API Configuration
- Backend URL: `http://localhost:5000` (default)
- Socket.IO connection for real-time features
- Axios interceptors for authentication

### Styling Configuration
- Tailwind CSS configuration in `tailwind.config.js`
- Custom CSS in `src/index.css`
- Component-specific styling with Tailwind classes

## 🚀 Key Features Implementation

### Real-time Updates
- Socket.IO integration for live chat
- Real-time notifications
- Live post interactions

### State Management
- Redux Toolkit for global state
- Local state for component-specific data
- Context API for theme and user preferences

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

### Performance Optimization
- Code splitting with React Router
- Lazy loading for components
- Optimized image loading
- Efficient re-renders with React.memo

## 🎯 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Use TypeScript-like prop validation

### Component Structure
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop drilling prevention
- Follow the single responsibility principle

### State Management
- Use Redux for global state
- Use local state for component-specific data
- Implement proper loading states
- Handle error states gracefully

## 🧪 Testing

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing Considerations
- Component testing with React Testing Library
- Integration testing for API calls
- E2E testing for critical user flows
- Performance testing for large datasets

## 🚀 Deployment

### Build Process
1. Run `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production

### Hosting Options
- Vercel (recommended for React apps)
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

### Production Considerations
- Enable HTTPS
- Configure proper caching headers
- Set up monitoring and analytics
- Optimize bundle size
- Implement error tracking

## 🤝 Contributing

1. Follow the existing component structure
2. Use consistent naming conventions
3. Implement proper error handling
4. Add loading states for async operations
5. Test on multiple devices and browsers
6. Follow accessibility guidelines

## 📞 Support

For frontend-specific issues or questions, please refer to the main project README or create an issue in the repository.

---

**Note**: This frontend is designed to work with the DevGluck backend API. Ensure the backend is properly configured and running before using the frontend.
