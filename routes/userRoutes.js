import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secret = process.env.JWT_SECRET || "testsecret";

// Register route
router.post("/register", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = { id: 1, username, email };
  const token = jwt.sign(user, secret, { expiresIn: "1h" });
  res.status(201).json(user);
});

// Profile route
router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, secret);
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
