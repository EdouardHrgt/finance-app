require("dotenv").config({ debug: false });
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const path = require("path");
const HttpError = require("./utils/HttpError");
const db = require("./config/database");

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; // default dev front
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

const registeredRoutes = [];

// GENERAL FUNCTION TO CREATE ALL ROUTES
const createGetRoute = (pathUrl, fetchFunction, itemName) => {
  // Register the route for the available routes list
  registeredRoutes.push({ method: "GET", path: pathUrl });

  app.get(pathUrl, async (req, res, next) => {
    try {
      let data = await fetchFunction();

      // If no data is returned, throw a 404 HttpError
      if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new HttpError(`No ${itemName} found`, 404);
      }

      // If the route is /api/transactions, convert avatar field to a public URL
      if (pathUrl === "/api/transactions") {
        const baseUrl =
          process.env.BASE_URL ||
          `http://localhost:${process.env.PORT || 3000}`;
        data = data.map((tx) => ({
          ...tx,
          avatar: `${baseUrl}/images/${path.basename(tx.avatar)}`,
        }));
      }

      // Send the response with the data
      res.status(200).json(data);
    } catch (err) {
      // Pass any error to the global error handling middleware
      next(err);
    }
  });
};

// ROUTES
createGetRoute("/api/balance", db.getBalance, "balance");
createGetRoute("/api/transactions", db.getTransactions, "transactions");
createGetRoute("/api/budgets", db.getBudgets, "budgets");
createGetRoute("/api/pots", db.getPots, "pots");

// Middleware for unexisting routes
app.use((req, res, next) => {
  next(
    new HttpError(`Route not found: ${req.originalUrl}`, 404, registeredRoutes)
  );
});

// Middleware for global error handling
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const response = { error: err.message };

    if (Array.isArray(err.routes) && err.routes.length > 0) {
      response.availableRoutes = err.routes;
    }

    return res.status(err.status).json(response);
  }

  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/images", express.static(path.join(__dirname, "images/avatars")));

module.exports = app;
