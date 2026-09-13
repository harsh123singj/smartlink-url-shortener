# SmartLink 🔗

SmartLink is a full-stack URL shortener that I built to practice building and deploying a complete web application.

It lets users create short links, manage their links from a dashboard, and see basic analytics such as clicks, referrers, and recent activity.

## Live Demo

https://smartlink-url-shortener.vercel.app/

## What can you do with SmartLink?

- Create short URLs
- Create custom aliases for links
- Set an expiration date for links
- Enable or disable a link
- Edit and delete links
- Track the number of clicks
- View clicks by day
- See where clicks are coming from through referrer tracking
- View recent click information
- Manage links from a personal dashboard
- Register and log in with JWT authentication

## Tech Stack

**Frontend**
- React.js
- React Router
- Tailwind CSS
- Recharts
- Vite

**Backend**
- Node.js
- Express.js
- JWT
- bcrypt
- Mongoose
- UAParser

**Database**
- MongoDB Atlas

**Deployment**
- Vercel
- Render

## How it works

The basic flow is:

```text
User
  ↓
React Frontend
  ↓
Express REST API
  ↓
MongoDB