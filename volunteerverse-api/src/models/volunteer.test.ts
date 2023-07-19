import { Volunteer } from "./volunteer";
import db  from "../db";

jest.mock("../db", () => {
    return {
      db: {
        query: jest.fn(),
      },
    };
  });


/** fetchVolunteerByEmail */
describe("fetchVolunteerByEmail", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
  
    test("should return null when no volunteer is found", async () => {
      // Arrange
      const email = "nonexistent@example.com";
      db.query.mockResolvedValueOnce({ rows: [] });
  
      // Act
      const volunteer = await Volunteer.fetchVolunteerByEmail(email);
  
      // Assert
      expect(volunteer).toBeNull();
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM volunteers WHERE email=$1",
        [email]
      );
    });
  });