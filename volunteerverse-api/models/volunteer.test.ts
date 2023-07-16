import { Volunteer } from "./volunteer";
import { database } from "../database";

jest.mock("../database", () => {
    return {
      database: {
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
      database.query.mockResolvedValueOnce({ rows: [] });
  
      // Act
      const volunteer = await Volunteer.fetchVolunteerByEmail(email);
  
      // Assert
      expect(volunteer).toBeNull();
      expect(database.query).toHaveBeenCalledWith(
        "SELECT * FROM volunteers WHERE email=$1",
        [email]
      );
    });
  });