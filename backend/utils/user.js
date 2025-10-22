const { users, saveUsers } = require("../DB/users");

class User {
  static nextId = 1;

  constructor(email, name) {
    this.id = User.nextId++; //Unique ID
    this.email = email; //Unique Email
    this.name = name;
  }
}

class UserManager {
  constructor(userSet) {
    this.users = userSet;

    // Keep nextId in sync with existing users
    const maxId = Array.from(this.users).reduce(
      (max, u) => Math.max(max, u.id || 0),
      0
    );
    User.nextId = maxId + 1;
  }

  findUserByEmail(email) {
    for (const user of this.users) {
      if (user.email === email) return user;
    }
    return null;
  }

  addUser(email, name) {
    if (this.findUserByEmail(email)) {
      throw new Error(`Email ${email} already exists`);
    }
    const newUser = new User(email, name);
    this.users.add(newUser);
    saveUsers(this.users);
    console.log("++++++++++++++++++++++++++++++");
    console.log(`A new user: EMAIL: ${newUser.email} / NAME: ${newUser.name} / ID: ${newUser.id} has been created...`);
    console.log("++++++++++++++++++++++++++++++");
    return newUser;
  }

  listUsers() {
    return Array.from(this.users);
  }

  removeUser(email) {
    const user = this.findUserByEmail(email);
    if (!user) return false;
    this.users.delete(user);
    saveUsers(this.users);
    console.log("---------------------------");
    console.log(`User: email: ${user.email} / name: ${user.name} / id: ${user.id} has been deleted...`);
    console.log("---------------------------");
    return true;
  }
}

const userManager = new UserManager(users);
module.exports = { User, userManager };
