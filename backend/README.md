# Node.js / Express Backend

This project is a **Node.js backend server** using **Express**, featuring:  
- Route and middleware management  
- Security with **Helmet**  
- Cross-Origin Resource Sharing (**CORS**) support  
- JWT authentication  
- Environment variables via **dotenv**  
- Automatic restart during development with **Nodemon**  

---

## 📂 Project Structure

backend/
│
├── app.js # Express configuration and middlewares
├── server.js # HTTP server creation
├── middlewares/ # Custom middlewares (e.g., authentication)
├── routes/ # API routes
├── utils/ # Utility classes (e.g., HttpError)
├── .env # Environment variables

---

## ⚙️ Prerequisites

- Node.js >= 18.x  
- npm >= 10.x  
- Terminal / command line (PowerShell, CMD, or bash)  

---

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/backend.git
cd backend

Install dependencies:

```npm install```

Create a .env file in the root:

PORT=3000
JWT_SECRET=yourJWTSecret

Nodemon will automatically restart the server on code changes.

Start the server in production:

```npm start```