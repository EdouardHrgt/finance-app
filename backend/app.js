require("dotenv").config({ debug: false });

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const HttpError = require("./utils/HttpError");
const db = require("./config/database");
const { users, saveUsers } = require("./utils/user");

const app = express();

// ================================
// CONFIGURATION
// ================================
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ================================
// MIDDLEWARES
// ================================
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false, 
  })
);

app.use(express.json());

// ================================
// BLOCK ALL DELETE REQUESTS
// ================================
app.use((req, res, next) => {
  if (req.method === "DELETE") {
    return res
      .status(403)
      .json({ error: "DELETE method is not allowed on this server." });
  }
  next();
});

// ================================
// AUTOMATIZING ROUTES CREATION
// ================================
const registeredRoutes = [];

const createGetRoute = (pathUrl, fetchFunction, itemName) => {
  registeredRoutes.push({ method: "GET", path: pathUrl });

  app.get(pathUrl, async (req, res, next) => {
    try {
      let data = await fetchFunction();

      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new HttpError(`No ${itemName} found`, 404);
      }

      // SPECIAL CASE FOR IMAGES
      if (pathUrl === "/api/transactions") {
        data = data.map((tx) => ({
          ...tx,
          avatar: `${BASE_URL}/images/${path.basename(tx.avatar)}`,
        }));
      }

      // FRONT END "FAKE" DELAY.. Can delete this row in production
      await new Promise((resolve) => setTimeout(resolve, 100));
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};

// ================================
// GET ROUTES
// ================================
createGetRoute("/api/balance", db.getBalance, "balance");
createGetRoute("/api/transactions", db.getTransactions, "transactions");
createGetRoute("/api/budgets", db.getBudgets, "budgets");
createGetRoute("/api/pots", db.getPots, "pots");

// ================================
// USERS ROUTES
// ================================
app.post("/api/users", (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) throw new HttpError("Missing email or name", 400);

    if (users.has(email)) throw new HttpError("User already exists", 409);

    users.add(email);
    saveUsers(users);

    res.status(201).json({ email, name });
  } catch (err) {
    next(err);
  }
});

app.get("/api/users", (req, res) => {
  const usersArray = Array.from(users).map((email) => ({ email }));
  res.json(usersArray);
});

// ================================
// SERVE STATIC IMAGES ONLY TO FRONT APP
// ================================
app.use(
  "/images",
  cors({ origin: FRONTEND_URL }),
  express.static(path.join(__dirname, "images"))
);

// ================================
// 404 handler
// ================================
app.use((req, res, next) => {
  next(
    new HttpError(`Route not found: ${req.originalUrl}`, 404, registeredRoutes)
  );
});

// ================================
// GLOBAL ERROR HANDLING
// ================================
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const response = { error: err.message };
    if (err.routes) response.availableRoutes = err.routes;
    return res.status(err.status).json(response);
  }

  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
