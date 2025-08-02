# 🌟 Community Platform - LinkedIn-like Social Network

Run Commands:- 
Frontend: npm run dev
Backend: npm run dev

live demo video url :- https://www.loom.com/share/eaf49fb1ac9f4fbd9372bc1dcd163ef7?sid=ddd23f77-43d7-4560-bdfd-613ce31aac50

A modern, professional social networking platform built for the Full Stack Development Internship challenge at CIAAN Cyber Tech Pvt Ltd. This application provides a complete social media experience with user authentication, post creation, profile management, and user discovery features.

## 🚀 Live Demo

- **Frontend**: (https://mini-linkedin-frontend.vercel.app/login)
- **Backend API**: Getting trouble with type script

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Frontend Components](#-frontend-components)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 **Authentication & User Management**
- ✅ **User Registration** - Create account with name, username, email, password, and bio
- ✅ **User Login** - Secure JWT-based authentication
- ✅ **Profile Management** - View and edit user profiles
- ✅ **Bio Editing** - Update personal bio with character limit
- ✅ **Protected Routes** - Secure access to authenticated features

### 📝 **Post Management**
- ✅ **Create Posts** - Share text content with images
- ✅ **Image Upload** - Upload and resize images with Cloudinary integration
- ✅ **View Posts** - Browse all posts in chronological order
- ✅ **Delete Posts** - Remove your own posts with confirmation
- ✅ **Post Interactions** - Like, comment, and share buttons (UI ready)

### 👥 **User Discovery & Profiles**
- ✅ **User Search** - Find users by username
- ✅ **User Profiles** - View any user's profile and posts
- ✅ **Clickable Usernames** - Navigate to profiles from posts
- ✅ **Profile Statistics** - Post count and user information
- ✅ **Own Profile Detection** - Special UI for viewing your own profile

### 🎨 **Professional UI/UX**
- ✅ **Modern Design System** - Professional, clean interface
- ✅ **Responsive Layout** - Works on all device sizes
- ✅ **Loading States** - Professional loading indicators
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Smooth Animations** - Polished transitions and effects
- ✅ **Accessibility** - WCAG compliant design

### 🔧 **Technical Features**
- ✅ **TypeScript Backend** - Type-safe server-side code
- ✅ **React Frontend** - Modern component-based UI
- ✅ **Database Integration** - PostgreSQL with Prisma ORM
- ✅ **File Upload** - Image processing and cloud storage
- ✅ **API Validation** - Zod schema validation
- ✅ **Error Boundaries** - Graceful error handling

## 🛠 Tech Stack

### **Frontend**
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Modern database ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and processing
- **Zod** - Schema validation

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
community-platform/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── user.controller.ts
│   │   │   └── post.controller.ts
│   │   ├── middlewares/       # Custom middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── multer.middleware.ts
│   │   ├── models/           # Data models and validation
│   │   │   ├── user.model.ts
│   │   │   └── post.model.ts
│   │   ├── routes/           # API routes
│   │   │   ├── user.routes.ts
│   │   │   └── post.routes.ts
│   │   ├── types/            # TypeScript definitions
│   │   │   └── express.d.ts
│   │   ├── utils/            # Utility functions
│   │   │   ├── ApiError.ts
│   │   │   ├── ApiResponse.ts
│   │   │   ├── asyncHandler.ts
│   │   │   ├── cloudinary.ts
│   │   │   └── token.ts
│   │   ├── lib/              # External service configs
│   │   │   └── prisma.ts
│   │   ├── db/               # Database utilities
│   │   │   └── index.ts
│   │   ├── app.ts            # Express app configuration
│   │   └── index.ts          # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   └── schema.prisma
│   ├── public/               # Static files
│   │   └── temp/            # Temporary file uploads
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditBio.jsx
│   │   │   ├── UserSearch.jsx
│   │   │   ├── ImageResizer.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── context/          # React context providers
│   │   │   └── AuthContext.jsx
│   │   ├── services/         # API service functions
│   │   │   └── api.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── localStorage.js
│   │   │   └── imageUtils.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json
│   └── vite.config.js
├── README.md                 # Project documentation
└── .gitignore               # Git ignore rules
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for image uploads)
- Git

### **1. Clone the Repository**
```bash
git clone <your-repository-url>
cd community-platform
```

### **2. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/community_db"

# JWT Secrets
JWT_ACCESS_SECRET="your-super-secret-jwt-access-key"
JWT_REFRESH_SECRET="your-super-secret-jwt-refresh-key"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

**Setup Database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

**Start Backend Server:**
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### **3. Frontend Setup**

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Access the Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📚 API Documentation

### **Authentication Endpoints**

#### **POST** `/api/v1/users` - Register User
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Software developer passionate about creating amazing user experiences."
}
```

#### **POST** `/api/v1/users/login` - Login User
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### **PUT** `/api/v1/users/bio` - Update User Bio (Auth Required)
```json
{
  "bio": "Updated bio content here..."
}
```

### **Post Endpoints**

#### **GET** `/api/v1/posts` - Get All Posts
- **Query Parameters:**
  - `userId` (optional) - Filter posts by user ID

#### **POST** `/api/v1/posts` - Create Post (Auth Required)
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `content` (string) - Post text content
  - `image` (file) - Image file upload

#### **DELETE** `/api/v1/posts/:id` - Delete Post (Auth Required)
- **Parameters:**
  - `id` - Post ID to delete

#### **GET** `/api/v1/posts/user/:username` - Get User Posts by Username
- **Parameters:**
  - `username` - Username to fetch posts for

### **Response Format**
All API responses follow this structure:
```json
{
  "statusCode": 200,
  "data": { /* response data */ },
  "message": "Success message",
  "success": true
}
```

### **Error Response Format**
```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false
}
```

## 🎨 Frontend Components

### **Pages**
- **Login** - User authentication page
- **Register** - User registration page
- **Home** - Main feed with posts and create post form
- **Profile** - Current user's profile page
- **UserProfile** - View any user's profile by username

### **Components**
- **Navbar** - Navigation bar with search functionality
- **PostCard** - Individual post display component
- **CreatePost** - Post creation form with image upload
- **EditBio** - Modal for editing user bio
- **UserSearch** - Modal for searching users by username
- **ImageResizer** - Image processing and resizing component
- **ErrorBoundary** - Error handling wrapper component

### **Context & Services**
- **AuthContext** - Authentication state management
- **API Service** - Centralized API request handling
- **LocalStorage Utils** - Safe localStorage operations

## 🗄 Database Schema

### **User Model**
```prisma
model User {
  id           String   @id @default(cuid())
  name         String
  username     String   @unique
  email        String   @unique
  password     String
  bio          String?
  refreshToken String?
  posts        Post[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### **Post Model**
```prisma
model Post {
  id        String   @id @default(cuid())
  content   String
  imageUrl  String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔐 Environment Variables

### **Backend Environment Variables**
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT Configuration
JWT_ACCESS_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### **Frontend Environment Variables**
```env
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api/v1"
```

## 🚀 Deployment

### **Backend Deployment (Railway/Render)**

1. **Prepare for deployment:**
```bash
npm run build
```

2. **Environment Variables:**
   - Set all required environment variables in your hosting platform
   - Update `DATABASE_URL` to production database
   - Set `NODE_ENV=production`

3. **Database Setup:**
```bash
npx prisma migrate deploy
npx prisma generate
```

### **Frontend Deployment (Vercel/Netlify)**

1. **Build the application:**
```bash
npm run build
```

2. **Deploy Configuration:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18+

3. **Environment Variables:**
   - Set `VITE_API_BASE_URL` to your deployed backend URL

## 📱 Features Walkthrough

### **🔐 Authentication Flow**
1. **Registration:** Users create accounts with email, username, and bio
2. **Login:** Secure JWT-based authentication
3. **Protected Routes:** Automatic redirection for unauthenticated users
4. **Profile Management:** Edit bio and view profile statistics

### **📝 Post Management**
1. **Create Posts:** Rich text editor with image upload
2. **Image Processing:** Automatic image resizing and optimization
3. **View Feed:** Chronological post display with author information
4. **Delete Posts:** Secure deletion with confirmation dialog

### **👥 User Discovery**
1. **Search Users:** Find users by username with search modal
2. **View Profiles:** Comprehensive user profiles with posts
3. **Navigate Easily:** Clickable usernames throughout the app
4. **Profile Statistics:** Post counts and user information

### **🎨 User Experience**
1. **Professional Design:** Clean, modern interface
2. **Responsive Layout:** Works on all devices
3. **Loading States:** Professional loading indicators
4. **Error Handling:** User-friendly error messages
5. **Smooth Animations:** Polished transitions

## 🧪 Testing

### **Backend Testing**
```bash
cd backend
npm test
```

### **Frontend Testing**
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of an internship application at CIAAN Cyber Tech Pvt Ltd.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- CIAAN Cyber Tech Pvt Ltd for the internship opportunity
- React and Node.js communities for excellent documentation
- Tailwind CSS for the amazing utility-first framework
- Prisma for the excellent database toolkit

---

**Built with ❤️ for the Full Stack Development Internship Challenge**
