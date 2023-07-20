import { Volunteer } from "./volunteer";
import { BadRequestError, UnprocessableEntityError } from "../utils/errors";

import db  from "../db";

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

  test("registers a new volunteer successfuly", async () => {
    const volunteerInfo = {
      email: "fiona@gmail.com",
      password: "123",
      firstName: "Fiona",
      lastName: "Apple",
      bio: "Looking to help out",
      skills: ["Machine Learning"],
      userType: "volunteer",
    }

    

  })


});





afterAll(function () {
  db.end();
});
