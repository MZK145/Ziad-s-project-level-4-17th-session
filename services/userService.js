import User from "../models/User.js";

export async function createUser(data) {
  const user = await User.create(data);
  return user;
}

export async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
}
