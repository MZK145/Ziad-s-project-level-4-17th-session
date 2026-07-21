import { jest } from "@jest/globals";

jest.mock("../models/Product.js", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

import Product from "../../models/Product.js";
import { createProduct, getAllProducts, deleteProduct } from "../../services/productService.js";

describe("productService", () => {

  beforeEach(() => jest.clearAllMocks());

  describe("createProduct", () => {
    it("should return the created product", async () => {
      const fake = { _id: "p1", name: "Phone", price: 999 };
      Product.create.mockResolvedValue(fake);

      const result = await createProduct({ name: "Phone", price: 999 });

      expect(result).toEqual(fake);
    });

    // TODO: write a test that catches Break 4 (error swallowed silently)
    // Use Product.create.mockRejectedValue(new Error("DB error"))
    // and assert the function rejects
    it("should throw when Product.create fails", async () => {
      Product.create.mockRejectedValue(new Error("DB error"));
      await expect(createProduct({ name: "Bad" })).rejects.toThrow("DB error");
    });

    // Extra test to catch Break 2 (createProduct returns undefined)
    it("should not return undefined when product is created", async () => {
      const fake = { _id: "p1", name: "Phone", price: 999 };
      Product.create.mockResolvedValue(fake);

      const result = await createProduct({ name: "Phone", price: 999 });

      expect(result).not.toBeUndefined();
    });
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const fakeList = [
        { _id: "p1", name: "Phone", price: 999 },
        { _id: "p2", name: "Laptop", price: 1499 },
      ];
      Product.find.mockResolvedValue(fakeList);

      const result = await getAllProducts();

      // TODO: add an assertion here checking result.length equals 2
      // This will catch Break 3
      expect(result).toEqual(fakeList);
      expect(result.length).toBe(2);
    });

    it("should return an empty array when there are no products", async () => {
      Product.find.mockResolvedValue([]);
      const result = await getAllProducts();
      expect(result).toEqual([]);
    });
  });

  describe("deleteProduct", () => {
    it("should return { deleted: true } when product exists", async () => {
      Product.findByIdAndDelete.mockResolvedValue({ _id: "p1" });
      const result = await deleteProduct("p1");
      expect(result).toEqual({ deleted: true });
    });

    // TODO: write a test that catches Break 1 (null check removed)
    // Use Product.findByIdAndDelete.mockResolvedValue(null)
    // and assert the function throws "Product not found"
    it("should throw 'Product not found' when product does not exist", async () => {
      Product.findByIdAndDelete.mockResolvedValue(null);
      await expect(deleteProduct("missingId")).rejects.toThrow("Product not found");
    });
  });

});
