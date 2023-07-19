import { Organization } from "./organization";
import  db  from "../db";
import { describe } from "node:test";
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
    organization_name: "JelloWorld",
    organization_description: "a compnau duh",
    organization_email: "hii@gaffamawfwfil.com ",
    logo_url: "xgxhhsb",
    userType: "organization",
    password: "1234",
    founders: "people",
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
});

describe("Testing fetchAllOrgProjects function", async () => {
  const validEmail = "hii@gaffamawfwfil.com";

  const mockData = {
    project_name: "JelloWorldWebsite",
      project_description: "doing the website of the compnau duh",
      image_url: "xgxhhsb",
      requested_people: 2,
      approved_people: 3,
      created_at: "5:30",
    
  };

  beforeAll(() => {
    db.query = jest.fn().mockReturnValue(mockData);
  });

  test("it should get projects", async function () {
    const result = await Organization.fetchAllOrganizationProjects(validEmail);
    expect(result).toStrictEqual({
      project_name: "JelloWorldWebsite",
      project_description: "doing the website of the compnau duh",
      image_url: "xgxhhsb",
      requested_people: 2,
      approved_people: 3,
      created_at: "5:30",
    });
  });
});
