import { jest } from "@jest/globals";

// ✅ Properly mock the User class with static methods
jest.mock("../../models/User.js", () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn(),
      findById: jest.fn(),
    },
  };
});

import User from "../../models/User.js";
import { createUser, getUserById } from "../../services/userService.js";

describe("userService", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return created user on success", async () => {
    const fakeUser = { username: "test", email: "test@example.com" };
    User.create.mockResolvedValue(fakeUser);

    const result = await createUser(fakeUser);

    expect(result).toEqual(fakeUser);
  });

  it("should throw error when DB fails", async () => {
    User.create.mockRejectedValue(new Error("DB error"));

    await expect(createUser({})).rejects.toThrow("DB error");
  });

  it("should return user when found", async () => {
    const fakeUser = { id: "123", username: "test" };
    User.findById.mockResolvedValue(fakeUser);

    const result = await getUserById("123");

    expect(result).toEqual(fakeUser);
  });

  it("should throw when user not found", async () => {
    User.findById.mockResolvedValue(null);

    await expect(getUserById("999")).rejects.toThrow("User not found");
  });
});
