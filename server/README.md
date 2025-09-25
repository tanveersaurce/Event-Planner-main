# EventPlanner Backend

This is the backend API for the EventPlanner application, built with Node.js, Express, and MongoDB.

## Features
- User authentication (JWT-based)
- Admin authentication and authorization
- User profile management
- Contact/Support query management
- Admin dashboard endpoints
- Cloudinary integration for image uploads

## Folder Structure
```
server/
  src/
    config/         # Database and cloudinary config
    controllers/    # Route controllers (auth, user, admin, etc.)
    middlewares/    # Auth and other middleware
    models/         # Mongoose models
    routes/         # Express route definitions
    seeders/        # (Optional) Seed scripts
    utils/          # Utility functions
  index.js          # Entry point
  package.json      # Dependencies and scripts
```

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd EventPlanner/server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment variables:**
   - Create a `.env` file in the `server/` directory with the following:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
4. **Run the server:**
   ```bash
   npm run dev
   ```
   The server will start on the port specified in your `.env` (default: 5000).

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/auth/logout` — Logout

### User
- `GET /api/user/profile` — Get user profile
- `PUT /api/user/update` — Update user profile

### Admin
- `GET /api/admin/contacts` — Get all contact/support queries (admin only)
- `PUT /api/admin/contacts/:Qid` — Update a contact/support query (admin only)

## Middleware
- `Protect` — Requires authentication
- `isAdmin` — Requires admin privileges

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Cloudinary for image uploads

## License
MIT

---

For any questions or issues, please open an issue or contact the maintainer.
