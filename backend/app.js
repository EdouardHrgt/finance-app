require("dotenv").config({ debug: false });

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const HttpError = require("./utils/HttpError");
const db = require("./config/database");
const { userManager } = require("./utils/user");

const app = express();

// ================================
// Middleware configuration
// ================================
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies

// Configure CORS for the frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// Store all registered routes for debugging 404s
const registeredRoutes = [];

// Block all DELETE requests globally
app.use((req, res, next) => {
  if (req.method === "DELETE") {
    return res.status(403).json({ error: "DELETE method is not allowed on this server." });
  }
  next();
});

// ================================
// Helper function to register GET routes
// ================================
const createGetRoute = (pathUrl, fetchFunction, itemName) => {
  // Keep track of the route
  registeredRoutes.push({ method: "GET", path: pathUrl });

  app.get(pathUrl, async (req, res, next) => {
    try {
      let data = await fetchFunction();

      // If no data, throw 404
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new HttpError(`No ${itemName} found`, 404);
      }

      // Special case: if route is /api/transactions, map avatar URLs
      if (pathUrl === "/api/transactions") {
        const baseUrl =
          process.env.BASE_URL ||
          `http://localhost:${process.env.PORT || 3000}`;

        data = data.map((tx) => ({
          ...tx,
          avatar: `${baseUrl}/images/${path.basename(tx.avatar)}`,
        }));
      }

      //  Simulate 3-second delay for testing front app loading states...
      await new Promise((resolve) => setTimeout(resolve, 2000));

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};

// ================================
// USERS API (using UserManager)
// ================================

// POST /api/users → Create a new user
app.post("/api/users", (req, res, next) => {
  try {
    const { email, name } = req.body;

    // Validate input
    if (!email || !name) {
      throw new HttpError("Missing email or name", 400);
    }

    // Add new user
    const newUser = userManager.addUser(email, name);

    res.status(201).json(newUser);
  } catch (err) {
    // Handle email conflict
    if (err.message.includes("already exists")) {
      next(new HttpError(err.message, 409));
    } else {
      next(err);
    }
  }
});

// GET /api/users → Retrieve all users
app.get("/api/users", (req, res) => {
  const users = userManager.listUsers();
  res.json(users);
});

// ================================
// Existing Database Routes
// ================================
createGetRoute("/api/balance", db.getBalance, "balance");
createGetRoute("/api/transactions", db.getTransactions, "transactions");
createGetRoute("/api/budgets", db.getBudgets, "budgets");
createGetRoute("/api/pots", db.getPots, "pots");

// ================================
// 404 Middleware for unknown routes
// ================================
app.use((req, res, next) => {
  next(
    new HttpError(`Route not found: ${req.originalUrl}`, 404, registeredRoutes)
  );
});

// ================================
// Global error handler
// ================================
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const response = { error: err.message };

    if (Array.isArray(err.routes) && err.routes.length > 0) {
      response.availableRoutes = err.routes;
    }

    return res.status(err.status).json(response);
  }

  // Generic 500 fallback
  res.status(500).json({ error: "Internal Server Error" });
});

// ================================
// Static file serving for images
// ================================
app.use("/images", express.static(path.join(__dirname, "images/avatars")));

module.exports = app;
