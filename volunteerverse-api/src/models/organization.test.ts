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

describe("Organization Model Functions", async () => {
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
