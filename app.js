import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// ✅ Export JWT secret for tests
export const JWT_SECRET = process.env.JWT_SECRET || "testsecret";

export default app;
