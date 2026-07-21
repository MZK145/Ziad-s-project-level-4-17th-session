import { formatUsername, validateEmail } from "../../utils.js";

// TODO: write unit tests for formatUsername and validateEmail
// Use the AAA pattern: Arrange, Act, Assert
// Cover the happy path and at least one edge case for each function

describe("utils", () => {

  describe("formatUsername", () => {
    // TODO: happy path — "John Doe" should return "john_doe"
    it("should format 'John Doe' as 'john_doe'", () => {
      // Arrange
      const input = "John Doe";
      // Act
      const result = formatUsername(input);
      // Assert
      expect(result).toBe("john_doe");
    });

    // TODO: edge case — what happens with extra spaces?
    it("should handle extra spaces correctly", () => {
      // Arrange
      const input = "   Jane   Smith   ";
      // Act
      const result = formatUsername(input);
      // Assert
      expect(result).toBe("jane_smith");
    });

    // TODO: error case — what happens with an empty string or invalid input?
    it("should throw an error for invalid input", () => {
      // Arrange + Act + Assert
      expect(() => formatUsername("")).toThrow("Invalid name");
      expect(() => formatUsername(123)).toThrow("Invalid name");
    });
  });

  describe("validateEmail", () => {
    // TODO: happy path — a valid email should return true
    it("should return true for a valid email", () => {
      // Arrange
      const input = "user@example.com";
      // Act
      const result = validateEmail(input);
      // Assert
      expect(result).toBe(true);
    });

    // TODO: edge case — an email missing the @ should return false
    it("should return false for missing @ symbol", () => {
      // Arrange
      const input = "userexample.com";
      // Act
      const result = validateEmail(input);
      // Assert
      expect(result).toBe(false);
    });

    // TODO: edge case — an empty string should return false
    it("should return false for empty string", () => {
      // Arrange
      const input = "";
      // Act
      const result = validateEmail(input);
      // Assert
      expect(result).toBe(false);
    });
  });

});
