import { Volunteer } from "./volunteer";
import { db } from "../db";
import { before } from "node:test";



/** fetchVolunteerByEmail */
describe("fetchVolunteerByEmail", () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns volunteer when found", async ()=> {
      const mockResult = {
        rows: [
          {
            "volunteer": {
              "id": 1,
              "email": "melyssa@gmail.com",
              "first_name": "Melyssa",
              "last_name": "Cristino",
              "bio": "Interested in getting design experience",
              "image_url": "image.url"
            }
          }
        ]
      }

      db.query = jest.fn().mockReturnValue(mockResult)

      const volunteer = await Volunteer.fetchVolunteerByEmail("melyssa@gmail.com")
      expect(db.query).toHaveBeenCalledTimes(1); // Ensure that the db.query function is called once
      expect(volunteer).toEqual(mockResult.rows[0]); 

    })
  
    // test("should return null when no volunteer is found", async () => {
    //   // Arrange
    //   const email = "nonexistent@example.com";
    //   db.query.mockResolvedValueOnce({ rows: [] });
  
    //   // Act
    //   const volunteer = await Volunteer.fetchVolunteerByEmail(email);
  
    //   // Assert
    //   expect(volunteer).toBeNull();
    //   expect(db.query).toHaveBeenCalledWith(
    //     "SELECT * FROM volunteers WHERE email=$1",
    //     [email]
    //   );
    // });
  }
  );