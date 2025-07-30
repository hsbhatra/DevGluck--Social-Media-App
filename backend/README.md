# DevGluck Backend API

A robust Node.js/Express.js backend API for the DevGluck Social Media App, featuring real-time communication, file uploads, and comprehensive social media functionality.

## 🚀 Features

### API Endpoints
- **Authentication**: JWT-based user registration and login
- **User Management**: Profile CRUD operations, follow/unfollow system
- **Posts**: Create, read, update, delete posts with image support
- **Interactions**: Like, comment, share, and save posts
- **Real-time Chat**: Socket.IO integration for instant messaging
- **Notifications**: Real-time notification system
- **File Upload**: AWS S3 integration for media storage
- **Search**: User and post search functionality

### Technical Features
- **RESTful API**: Clean, consistent API design
- **Real-time Communication**: Socket.IO for live updates
- **File Storage**: AWS S3 for scalable media storage
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and error handling
- **CORS**: Cross-origin resource sharing support

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware
- **AWS SDK** - S3 file storage
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v22 or higher)
- MongoDB (local or cloud instance)
- AWS S3 bucket and credentials

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp env-example.txt .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MongoDB=mongodb://localhost:27017/devgluck
   
   # JWT Secret
   secretMessage=your_jwt_secret_key_here
   
   # AWS S3 Configuration
   accessKeyId=your_aws_access_key_id
   secretAccessKey=your_aws_secret_access_key
   region=us-east-1
   bucketName=your_s3_bucket_name
   
   # Optional: Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/search` - Search users

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment
- `GET /api/posts/:id/comments` - Get post comments

### Follow System
- `POST /api/follow/:id` - Follow user
- `DELETE /api/follow/:id` - Unfollow user
- `GET /api/follow/followers` - Get followers
- `GET /api/follow/following` - Get following

### Chat & Messages
- `GET /api/messages/:conversationId` - Get messages
- `POST /api/messages` - Send message
- `GET /api/conversations` - Get conversations

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   │   ├── authController.mjs
│   │   ├── userController.mjs
│   │   ├── postController.mjs
│   │   ├── followController.mjs
│   │   ├── messageController.mjs
│   │   └── notificationController.mjs
│   ├── models/         # MongoDB models
│   │   ├── userModel.mjs
│   │   ├── postModel.mjs
│   │   ├── commentModel.mjs
│   │   ├── likeModel.mjs
│   │   ├── followModel.mjs
│   │   ├── messageModel.mjs
│   │   ├── conversationModel.mjs
│   │   └── notificationModel.mjs
│   ├── routes/         # API routes
│   │   ├── authRoutes.mjs
│   │   ├── userRoutes.mjs
│   │   ├── postRoute.mjs
│   │   ├── followRoutes.mjs
│   │   ├── messageRoute.mjs
│   │   └── notificationRoutes.mjs
│   ├── middleware/     # Custom middleware
│   │   ├── authMiddleware.mjs
│   │   ├── multer.mjs
│   │   └── multerErrorHandler.mjs
│   ├── aws/           # AWS S3 integration
│   │   └── aws.mjs
│   ├── socket/        # Socket.IO setup
│   │   └── socket.mjs
│   └── utils/         # Utility functions
│       ├── messageService.mjs
│       └── validators.mjs
├── config.mjs         # Configuration
├── index.mjs          # Server entry point
└── package.json       # Dependencies
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Request validation and sanitization
- **CORS Protection**: Configurable cross-origin policies
- **File Upload Security**: File type and size validation
- **Error Handling**: Secure error responses

## 📊 Database Models

### User Model
- Basic info (name, email, password)
- Profile details (bio, avatar, cover image)
- Social connections (followers, following)
- Account settings

### Post Model
- Content (text, images)
- Author reference
- Engagement metrics (likes, comments, shares)
- Timestamps and visibility settings

### Interaction Models
- Like, Comment, Follow relationships
- Message and Conversation models
- Notification system

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection string
- JWT secret key
- AWS S3 credentials
- CORS origins

### Production Considerations
- Use HTTPS in production
- Set up proper logging
- Configure rate limiting
- Set up monitoring and error tracking
- Use environment-specific configurations

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write clear API documentation
5. Test all endpoints thoroughly

## 📞 Support

For backend-specific issues or questions, please refer to the main project README or create an issue in the repository.
