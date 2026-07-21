import { jest } from "@jest/globals";
import request from "supertest";
import jwt from "jsonwebtoken";
import app, { JWT_SECRET } from "../../app.js";

describe("routes", () => {

  describe("POST /users/register", () => {
    it("should create user and return 201", async () => {
      const res = await request(app)
        .post("/users/register")
        .send({ username: "john", email: "john@example.com" });

      expect(res.status).toBe(201);
      expect(res.body.username).toBe("john");
      expect(res.body.email).toBe("john@example.com");
    });

    it("should return 400 when email missing", async () => {
      const res = await request(app)
        .post("/users/register")
        .send({ username: "john" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Missing fields");
    });
  });

  describe("GET /users/profile", () => {
    it("should return 200 with valid token", async () => {
      const token = jwt.sign({ id: 1, username: "john" }, JWT_SECRET);

      const res = await request(app)
        .get("/users/profile")
        .set("Authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body.user.username).toBe("john");
    });

    it("should return 401 when no token provided", async () => {
      const res = await request(app).get("/users/profile");

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("No token");
    });

    it("should return 401 for invalid token", async () => {
      const res = await request(app)
        .get("/users/profile")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid token");
    });
  });

});
