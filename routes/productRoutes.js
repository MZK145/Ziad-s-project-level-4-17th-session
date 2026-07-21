import express from "express";
import { getProducts, addProduct, removeProduct } from "../controllers/productcontrollers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", removeProduct);

export default router;
