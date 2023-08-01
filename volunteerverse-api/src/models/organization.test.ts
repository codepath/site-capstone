import { Organization } from "./organization";
import  db  from "../db";
import { after, describe } from "node:test";
import { BadRequestError, UnprocessableEntityError } from "../utils/errors";
import { BCRYPT_WORK_FACTOR } from "../config";
import bcrypt from "bcrypt";
jest.mock("");

// jest.mock("../database", () => {
//     return {
//       database: {
//         query: jest.fn(),
//       },
//     };
//   });

describe("Testing fetchOrgByEmail function", async () => {
  const validEmail = "hii@gaffamawfwfil.com";

  const mockData = {
    rows: [
      {
    organization_name: "JelloWorld",
    organization_description: "a compnau duh",
    organization_email: "hii@gaffamawfwfil.com ",
    logo_url: "xgxhhsb",
    userType: "organization",
    password: "1234",
    founders: "people",
      }
    ]
  };

  beforeAll(() => {
    db.query = jest.fn().mockReturnValue(mockData);
  });

  test("it should get email", async function () {
    const result = await Organization.fetchOrganizationByEmail(validEmail);
    expect(result).toStrictEqual({
      organization_name: "JelloWorld",
      organization_description: "a compnau duh",
      organization_email: "hii@gaffamawfwfil.com ",
      logo_url: "xgxhhsb",
      userType: "organization",
      password: "1234",
      founders: "people",
    });
  });


  test("it should return undefined" , async function ()  {
    Organization.fetchOrganizationByEmail = jest.fn().mockReturnValue(undefined)
    const invaildEmail = "iamstudentgmail.com "
    const result = await Organization.fetchOrganizationByEmail(invaildEmail)
    expect (result).toBeUndefined();
  })
});


describe("organization registration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an error if input does not contain all required fields", async () => {
    const organizationInfo = {
      orgName : " Helping Hands ",
      orgDescription: "",
      email: "",
      logoUrl : "",
      userType : "",
     password :"",
     founders : "",
    orgWebsite: ""
    };
    await expect(Organization.register(organizationInfo)).rejects.toThrow(
      UnprocessableEntityError
    );
  });

  test("can not register a duplicate email", async () => {
    const organizationInfo = {
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
// describe("Testing fetchAllOrgProjects function", async () => {
//   const validEmail = "hii@gaffamawfwfil.com";

//   const mockData = {
//     project_name: "JelloWorldWebsite",
//       project_description: "doing the website of the compnau duh",
//       image_url: "xgxhhsb",
//       requested_people: 2,
//       approved_people: 3,
//       created_at: "5:30",
    
//   };

//   beforeAll(() => {
//     db.query = jest.fn().mockReturnValue(mockData);
//   });

//   test("it should get projects", async function () {
//     const result = await Organization.fetchAllOrganizationProjects(validEmail);
//     expect(result).toStrictEqual({
//       project_name: "JelloWorldWebsite",
//       project_description: "doing the website of the compnau duh",
//       image_url: "xgxhhsb",
//       requested_people: 2,
//       approved_people: 3,
//       created_at: "5:30",
//     });
//   });
// });
