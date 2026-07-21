// models/User.js
export default class User {
  static async create(data) {
    return { id: Date.now(), ...data };
  }

  static async findById(id) {
    return { id, username: "Test User", email: "test@example.com" };
  }

  static async find() {
    return [
      { id: 1, username: "User1", email: "user1@example.com" },
      { id: 2, username: "User2", email: "user2@example.com" },
    ];
  }
}
