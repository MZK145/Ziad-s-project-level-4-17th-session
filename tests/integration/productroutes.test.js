import request from "supertest";
import app from "../../app.js";

describe("Integration: Product Routes", () => {
  it("should respond to GET /products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
  });

  it("should respond to POST /products", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Phone", price: 999 });
    expect(res.status).toBe(201);
  });

  it("should respond to DELETE /products/:id", async () => {
    const res = await request(app).delete("/products/123");
    expect([200, 404]).toContain(res.status);
  });
});
