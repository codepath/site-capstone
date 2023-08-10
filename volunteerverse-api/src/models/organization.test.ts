import { Organization } from "./organization";
import  db  from "../db";
import { after, describe, mock } from "node:test";
import { BadRequestError, UnprocessableEntityError } from "../utils/errors";
import { BCRYPT_WORK_FACTOR } from "../config";
import bcrypt from "bcrypt";
jest.mock("");

// // jest.mock("../database", () => {
// //     return {
// //       database: {
// //         query: jest.fn(),
// //       },
// //     };
// //   });

// describe("Testing fetchOrgByEmail function", async () => {
//   const validEmail = "hii@gaffamawfwfil.com";

//   const mockData = {
//     rows: [
//       {
//     organization_name: "JelloWorld",
//     organization_description: "a compnau duh",
//     organization_email: "hii@gaffamawfwfil.com",
//     logo_url: "xgxhhsb",
//     userType: "organization",
//     password: "1234",
//     founders: "people",
//       }
//     ]
//   };

//   beforeAll(() => {
//     db.query = jest.fn().mockReturnValue(mockData);
//   });

//   test("it should get email", async function () {
//     const result = await Organization.fetchOrganizationByEmail(validEmail);
//     expect(result).toStrictEqual({
//       organization_name: "JelloWorld",
//       organization_description: "a compnau duh",
//       organization_email: "hii@gaffamawfwfil.com",
//       logo_url: "xgxhhsb",
//       userType: "organization",
//       password: "1234",
//       founders: "people",
//     });
//   });


//   test("it should return undefined" , async function ()  {
//     Organization.fetchOrganizationByEmail = jest.fn().mockReturnValue(undefined)
//     const invaildEmail = "forhelpgmail.com"
//     const result = await Organization.fetchOrganizationByEmail(invaildEmail)
//     expect (result).toBeUndefined();
//   })
// });


// describe("organization registration", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should return an error if input does not contain all required fields", async () => {
   
//     const organizationInfo = {
//       orgName : "Helping Hands",
//       orgDescription: "",
//       email: "",
//       logoUrl : "",
//       userType : "",
//      password :"",
//     orgWebsite: "",
//     founders : "",
//     };
//      expect(Organization.register(organizationInfo)).rejects.toThrow(
//       UnprocessableEntityError
//     );
//   });

//   test("can not register a duplicate email", async () => {
//     const organizationInfo = {
// 	 orgName : "Helping Hands",
//    orgDescription: "a compnau duh",
//    email: "forhelp1@gmail.com",
//    logoUrl : "https://helpme",
//    userType : "organization",
//   password :"1234",
//   founders : "people",
//  orgWebsite: "https://towebsite"
// }
    

//     const existingOrganization = {
//       organization: {
//         id: 1,
//         organization_name : "Helping Hands",
//         organization_description : "a compnau duh",
//         organization_email: "forhelp1@gmail.com",
//         logo_url  : "https://helpme",
//        founders : "people",
//       website: "https://towebsite",
//       },
//     };

//     // Mock the behavior of fetchOrganizationByEmail to simulate an existing organization 
//     Organization.fetchOrganizationByEmail = jest
//       .fn()
//       .mockReturnValue(existingOrganization);

//     await expect(Organization.register(organizationInfo)).rejects.toThrow(
//       new BadRequestError(`Duplicate email: forhelp1@gmail.com`)
//     );
//   });

//   test("registers a new organization successfully", async () => {
//     const organizationInfo = {
//    orgName : "Helping Hands",
//    orgDescription: "a compnau duh",
//    email: "forhelpnew@gmail.com ",
//    logoUrl : "https://helpme",
//    userType : "organization",
//   password :"1234",
//   founders : "people",
//   orgWebsite: "https://towebsite"
//     };

//     const mockResult = {
//       rows: [
//         {
//    orgName : "Helping Hands",
//    orgDescription: "a compnau duh",
//    email: "forhelpnew@gmail.com ",
//    logoUrl : null,
//    userType : "organization",
//   founders : "people",
//  orgWebsite: "https://towebsite"
//         },
//       ],
//     };

  beforeAll(() => {
    db.query = jest.fn().mockReturnValue(mockData);
  });

  test("it should get email", async function () {
    const result = await Organization.fetchOrganizationByEmail(validEmail);
    expect(result).toStrictEqual({
      organization_name: "JelloWorld",
      organization_description: "a compnau duh",
      organization_email: "hii@gaffamawfwfil.com",
      logo_url: "xgxhhsb",
      userType: "organization",
      password: "1234",
      founders: "people",
    });
  });


  test("it should return undefined" , async function ()  {
    Organization.fetchOrganizationByEmail = jest.fn().mockReturnValue(undefined)
    const invaildEmail = "forhelpgmail.com"
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
      orgName : "Helping Hands",
      orgDescription: "",
      email: "",
      logoUrl : "",
      userType : "",
     password :"",
    orgWebsite: "",
    founders : "",
    publicEmail : "test@contact.com",
    publicNumber : "",
    };
     expect(Organization.register(organizationInfo)).rejects.toThrow(
      UnprocessableEntityError
    );
  });

  test("can not register a duplicate email", async () => {
    const organizationInfo = {
	 orgName : "Helping Hands",
   orgDescription: "a compnau duh",
   email: "forhelp1@gmail.com",
   logoUrl : "https://helpme",
   userType : "organization",
  password :"1234",
  founders : "people",
 orgWebsite: "https://towebsite",
 publicEmail : "tacky@contact.com",
 publicNumber : "",
}
    

    const existingOrganization = {
      organization: {
        id: 1,
        organization_name : "Helping Hands",
        organization_description : "a compnau duh",
        organization_email: "forhelp1@gmail.com",
        logo_url  : "https://helpme",
       founders : "people",
      website: "https://towebsite",
      },
    };

    // Mock the behavior of fetchOrganizationByEmail to simulate an existing organization 
    Organization.fetchOrganizationByEmail = jest
      .fn()
      .mockReturnValue(existingOrganization);

    await expect(Organization.register(organizationInfo)).rejects.toThrow(
      new BadRequestError(`Duplicate email: forhelp1@gmail.com`)
    );
  });

  test("registers a new organization successfully", async () => {
    const organizationInfo = {
   orgName : "Helping Hands",
   orgDescription: "a compnau duh",
   email: "forhelpnew@gmail.com ",
   logoUrl : "https://helpme",
   userType : "organization",
  password :"1234",
  founders : "people",
  orgWebsite: "https://towebsite",
  publicNumber: "1234567890",
  publicEmail: "helpers@contact.org",
    };

    const mockResult = {
      rows: [
        {
   orgName : "Helping Hands",
   orgDescription: "a compnau duh",
   email: "forhelpnew@gmail.com ",
   logoUrl : null,
   userType : "organization",
  founders : "people",
 orgWebsite: "https://towebsite"
        },
      ],
    };

    // Mock the fetchOrganizationByEmail method to return null, indicating no duplicate email exists
    Organization.fetchOrganizationByEmail = jest.fn().mockResolvedValue(undefined);

    // Create a mock for bcrypt.hash to spy on its usage
    const mockHash = jest.spyOn(bcrypt, "hash");

    db.query = jest.fn().mockReturnValue(mockResult);
    const organization = await Organization.register(organizationInfo);
    console.log('organizatopm', organization)
    
//     const { id }  = organization
//     expect(organization).toEqual(mockResult.rows[0]);
//     expect(db.query).toHaveBeenCalledTimes(3); //3 query calls made during the register function if done successfully
//      expect(mockHash).toHaveBeenCalledWith( organizationInfo.password, BCRYPT_WORK_FACTOR);
//   });
// });
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
