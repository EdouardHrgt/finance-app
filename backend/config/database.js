// Here im faking asynchronous calls for an eventual external DB...And exporting those feteched datas as modules.

const balance = require("../DB/balance");
const transactions = require("../DB/transactions");
const budgets = require("../DB/budgets");
const pots = require("../DB/pots");

const getBalance = async () => balance;
const getTransactions = async () => transactions;
const getBudgets = async () => budgets;
const getPots = async () => pots;

module.exports = {
  getBalance,
  getTransactions,
  getBudgets,
  getPots
};
