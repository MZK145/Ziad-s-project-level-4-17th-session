import { jest } from "@jest/globals";

jest.mock("../../models/Product.js", () => ({
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

    it("should throw when Product.create fails", async () => {
      Product.create.mockRejectedValue(new Error("DB error"));
      await expect(createProduct({ name: "Bad" })).rejects.toThrow("DB error");
    });

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

    it("should throw 'Product not found' when product does not exist", async () => {
      Product.findByIdAndDelete.mockResolvedValue(null);
      await expect(deleteProduct("missingId")).rejects.toThrow("Product not found");
    });
  });

});