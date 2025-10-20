require("dotenv").config({ debug: false });
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");

const db = require("./config/database");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// GENERAL FUNCTION TO CREATRE ALL ROUTES
const createGetRoute = (path, fetchFunction, itemName) => {
  app.get(path, async (req, res) => {
    try {
      const data = await fetchFunction();
      if (!data || (Array.isArray(data) && data.length === 0)) {
        return res.status(404).json({ error: `No ${itemName} found` });
      }
      res.status(200).json(data);
    } catch (err) {
      console.error(`Error fetching ${itemName}:`, err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};


// ROUTES
createGetRoute("/api/balance", db.getBalance, "balance");
createGetRoute("/api/transactions", db.getTransactions, "transactions");
createGetRoute("/api/budgets", db.getBudgets, "budgets");
createGetRoute("/api/pots", db.getPots, "pots");

module.exports = app;
