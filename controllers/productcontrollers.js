import { createProduct, getAllProducts, deleteProduct } from "../services/productService.js";

export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addProduct(req, res) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeProduct(req, res) {
  try {
    const result = await deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
