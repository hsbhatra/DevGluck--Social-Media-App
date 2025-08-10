# DevGluck - Social Media App

A modern, full-stack social media application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time chat, post sharing, user profiles, and more.

## Features

### Core Features
- User Authentication: Secure login/signup with JWT
- User Profiles: Customizable user profiles with avatars and cover images
- Posts & Content: Create, edit, and share posts with images
- Social Interactions: Like, comment, share, and save posts
- Follow System: Follow/unfollow other users
- Real-time Chat: Instant messaging with Socket.IO
- Notifications: Real-time notifications for interactions
- Search: Search for users and posts
- Blogs: Create and share blog posts
- Status Updates: Share temporary status updates
- Voice Messages: Send voice messages in chat

### Technical Features
- Responsive Design: Works on desktop and mobile
- Real-time Updates: Live notifications and chat
- Image Upload: AWS S3 integration for media storage
- Modern UI: Built with Tailwind CSS and Framer Motion
- State Management: Redux Toolkit for global state
- API Integration: RESTful API with Express.js

## Screenshots

Below are some screenshots showcasing the main features and UI of DevGluck:

### Home Page
![Home Page](screenshots/Home%20Page.png)

### Signup Page
![Signup Page](screenshots/Signup%20Page.png)

### Login Page
![Login Page](screenshots/Login%20Page.png)

### Profile Page
![Profile Page](screenshots/Profile%20Page.png)

### Edit Profile Pop-up
![Edit Profile Pop-up](screenshots/Edit%20Profile%20Pop-up.png)

### Add New Post
![Add New Post](screenshots/Add%20New%20Post.png)

### Saved Posts Page
![Saved Posts Page](screenshots/Saved%20Posts%20Page.png)

### Chat Page
![Chat Page](screenshots/Chat%20Page.png)

## Tech Stack

### Backend
- Node.js: Runtime environment
- Express.js: Web framework
- MongoDB: Database
- Mongoose: ODM for MongoDB
- Socket.IO: Real-time communication
- JWT: Authentication
- AWS S3: File storage
- Multer: File upload handling
- bcrypt: Password hashing

### Frontend
- React 19: UI library
- Vite: Build tool
- Redux Toolkit: State management
- React Router: Navigation
- Tailwind CSS: Styling
- Framer Motion: Animations
- Socket.IO Client: Real-time features
- Axios: HTTP client

## Installation

### Prerequisites
- Node.js (v22 or higher)
- MongoDB (local or cloud)
- AWS S3 bucket (for file storage)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DevGluck-Social-Media-App
   ```
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Environment Configuration:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will be available at `http://localhost:5173`

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `MongoDB` | MongoDB connection string | Yes | - |
| `secretMessage` | JWT secret key | Yes | - |
| `accessKeyId` | AWS access key ID | Yes | - |
| `secretAccessKey` | AWS secret access key | Yes | - |
| `region` | AWS region | Yes | us-east-1 |
| `bucketName` | S3 bucket name | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:5173 |

### AWS S3 Setup

1. Create an AWS S3 bucket
2. Configure CORS for your bucket:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```
3. Create an IAM user with S3 access
4. Add the access keys to your `.env` file

## Usage

### User Registration & Authentication
- Sign up with email and password
- Login to access the platform
- JWT tokens are used for session management

### Creating Content
- **Posts**: Share text and images with your followers
- **Blogs**: Write longer-form content
- **Status**: Share temporary updates
- **Comments**: Engage with other users' content

### Social Features
- **Follow/Unfollow**: Connect with other users
- **Like/Comment**: Interact with posts
- **Share**: Repost content to your followers
- **Save**: Bookmark posts for later viewing

### Communication
- **Real-time Chat**: Send instant messages
- **Voice Messages**: Record and send voice clips
- **Notifications**: Get notified of interactions

## Project Structure

```
DevGluck-Social-Media-App/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── aws/           # AWS S3 integration
│   │   ├── socket/        # Socket.IO setup
│   │   └── utils/         # Utility functions
│   ├── config.mjs         # Configuration
│   └── index.mjs          # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── slices/        # Redux slices
│   │   ├── api/          # API integration
│   │   └── assets/       # Static assets
│   └── public/           # Public assets
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Design Inspiration**: [Figma Design](https://www.figma.com/design/wylvoa6Ht96ci8cBShDLE2/Social-Media-App-Ui-Design--Community-?node-id=0-1&p=f&t=pxncupn9XLh5xb39-0)
- **Icons**: Lucide React, React Icons
- **UI Components**: Tailwind CSS, Framer Motion

## Support

For support, email support@devgluck.com or create an issue in the repository.

---

**Note**: This is a development project. For production use, ensure proper security measures, environment configuration, and deployment setup.