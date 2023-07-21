import { Volunteer } from "./volunteer";
import { BadRequestError, UnprocessableEntityError } from "../utils/errors";
import db from "../db";
import { BCRYPT_WORK_FACTOR } from "../config";
import bcrypt from "bcrypt";

/** fetchVolunteerByEmail */
describe("fetchVolunteerByEmail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns volunteer when found", async () => {
    const mockResult = {
      rows: [
        {
          volunteer: {
            id: 1,
            email: "melyssa@gmail.com",
            first_name: "Melyssa",
            last_name: "Cristino",
            bio: "Interested in getting design experience",
            image_url: "image.url",
          },
        },
      ],
    };

    db.query = jest.fn().mockReturnValue(mockResult);

    const volunteer = await Volunteer.fetchVolunteerByEmail(
      "melyssa@gmail.com"
    );
    expect(db.query).toHaveBeenCalledTimes(1); // Ensure that the db.query function is called once
    expect(volunteer).toEqual(mockResult.rows[0]);
  });

  test("should return null when volunteer is not found", async () => {
    const mockResult = { rows: [] };
    db.query = jest.fn().mockReturnValue(mockResult);
    const volunteer = await Volunteer.fetchVolunteerByEmail(
      "nonexistent@gmail.com"
    );
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(volunteer).toBeNull();
  });
});

describe("volunteer registration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an error if input does not contain all required fields", async () => {
    const volunteerInfo = {
      email: "example@gmail.com",
      password: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      bio: "",
      skills: [],
      userType: "",
    };
    await expect(Volunteer.register(volunteerInfo)).rejects.toThrow(
      UnprocessableEntityError
    );
  });

  test("can not register a duplicate email", async () => {
    const volunteerInfo = {
      email: "melyssa@gmail.com",
      password: "123",
      firstName: "Melyssa",
      lastName: "Cristino",
      imageUrl: "image.url",
      bio: "Interested in getting design experience",
      skills: ["UI/UX design", "HTML", "CSS", "React"],
      userType: "volunteer",
    };

    const existingVolunteer = {
      volunteer: {
        id: 1,
        email: "melyssa@gmail.com",
        first_name: "Melyssa",
        last_name: "Cristino",
        bio: "Interested in getting design experience",
        image_url: "image.url",
      },
    };

    // Mock the behavior of fetchVolunteerByEmail to simulate an existing volunteer
    Volunteer.fetchVolunteerByEmail = jest
      .fn()
      .mockReturnValue(existingVolunteer);

    await expect(Volunteer.register(volunteerInfo)).rejects.toThrow(
      new BadRequestError(`Duplicate email: melyssa@gmail.com`)
    );
  });

  test("registers a new volunteer successfully", async () => {
    const volunteerInfo = {
      email: "kenneth@gmail.com",
      password: "123",
      firstName: "Kenneth",
      lastName: "Cristino",
      bio: "Looking to help out",
      skills: ["Machine Learning"],
      userType: "volunteer",
    };

    const mockResult = {
      rows: [
        {
          email: "kenneth@gmail.com",
          firstName: "Kenneth",
          lastName: "Cristino",
          imageUrl: null,
          bio: "Looking to help out",
          skills: ["Machine Learning"],
          userType: "volunteer",
        },
      ],
    };

    // Mock the fetchVolunteerByEmail method to return null, indicating no duplicate email exists
    Volunteer.fetchVolunteerByEmail = jest.fn().mockResolvedValue(null);

    // Create a mock for bcrypt.hash to spy on its usage
    const mockHash = jest.spyOn(bcrypt, "hash");

    db.query = jest.fn().mockReturnValue(mockResult);
    const volunteer = await Volunteer.register(volunteerInfo);
    expect(volunteer).toEqual(mockResult.rows[0]);
    expect(db.query).toHaveBeenCalledTimes(3); //3 query calls made during the register function if done successfully

    expect(mockHash).toHaveBeenCalledWith(
      volunteerInfo.password,
      BCRYPT_WORK_FACTOR
    );
  });
});

describe('volunteer skills functions', () => {
  test('should insert skill for a volunteer in the database', async () => {
    // Input data for the skill insertion
    const emailInput = 'john@gmail.com';
    const skillInput = 'skill';

    db.query = jest.fn().mockReturnValue({ rows: [] }); 

    // Call the insertSkill function
    await Volunteer.insertSkill(emailInput, skillInput);

    // Verify that db.query was called with the correct query and parameters
    const expectedQuery = `INSERT into volunteer_skills(email, skill) VALUES ($1, $2) RETURNING *`;
    const expectedParameters = [emailInput, skillInput];


    expect(db.query).toHaveBeenCalledWith(expectedQuery, expectedParameters);
  })

  test("should fetch all skills for a volunteer from database", async () => {

  })
})



afterAll(function () {
  db.end();
});
