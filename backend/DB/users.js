// /DB/users.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

// Load users from JSON file (or start empty)
function loadUsers() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(data);
    return new Set(parsed);
  }
  return new Set();
}

// Save users back to JSON file
function saveUsers(usersSet) {
  const usersArray = Array.from(usersSet);
  fs.writeFileSync(filePath, JSON.stringify(usersArray, null, 2), "utf8");
}

const users = loadUsers();

module.exports = { users, saveUsers };
