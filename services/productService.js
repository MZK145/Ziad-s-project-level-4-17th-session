import Product from "../models/Product.js";

export async function createProduct(data) {
  const product = await Product.create(data);
  return product;
}

export async function getAllProducts() {
  const products = await Product.find();
  return products;
}

export async function deleteProduct(id) {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new Error("Product not found");
  return { deleted: true };
}
