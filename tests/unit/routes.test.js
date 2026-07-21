import { jest } from "@jest/globals";
import request from "supertest";
import jwt from "jsonwebtoken";
import app, { JWT_SECRET } from "../../app.js";

// Mock userService so no real DB is called during route tests
jest.mock("../services/userService.js", () => ({
  createUser: jest.fn(),
}));

import { createUser } from "../../services/userService.js";

describe("routes", () => {

  beforeEach(() => jest.clearAllMocks());

  describe("POST /register", () => {
   // TODO 1: send a valid body { username, email }, assert 201
it("should create user and return 201", async () => {
  const fakeUser = { username: "john", email: "john@example.com" };
  createUser.mockResolvedValue(fakeUser);

  const res = await request(app).post("/register").send(fakeUser);

  expect(res.status).toBe(201);
  expect(res.body).toEqual(fakeUser);
});


   // TODO 2: send a body missing email, assert 400
it("should return 400 when email missing", async () => {
  const res = await request(app).post("/register").send({ username: "john" });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Missing fields");
});

  });

  describe("GET /profile", () => {
    // TODO 3: generate a JWT with jwt.sign, attach with .set("Authorization", "Bearer " + token), assert 200
it("should return 200 with valid token", async () => {
  const token = jwt.sign({ id: 1, username: "john" }, JWT_SECRET);

  const res = await request(app)
    .get("/profile")
    .set("Authorization", "Bearer " + token);

  expect(res.status).toBe(200);
  expect(res.body.user.username).toBe("john");
});


   // TODO 4: send request with no token, assert 401
it("should return 401 when no token provided", async () => {
  const res = await request(app).get("/profile");

  expect(res.status).toBe(401);
  expect(res.body.error).toBe("No token");
});


    // TODO 5: send request with an invalid token, assert 401
it("should return 401 for invalid token", async () => {
  const res = await request(app)
    .get("/profile")
    .set("Authorization", "Bearer invalidtoken");

  expect(res.status).toBe(401);
  expect(res.body.error).toBe("Invalid token");
});

  });

});
