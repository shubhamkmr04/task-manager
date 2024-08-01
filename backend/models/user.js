class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.tasks = [];
  }
}

module.exports = User;
