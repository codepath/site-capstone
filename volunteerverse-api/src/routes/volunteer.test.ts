import { app } from "../app"
import request from "supertest"
import { database } from "../database";




/************************************** POST /auth/register */
describe("POST /volunteer/register/", function () {
    test("Allows user to register with valid credentials", async function () {
      const resp = await request(app).post("/volunteer/register/").send({
        email: "neweemaafallll@gmail",
        password: "string",
        firstName: "Alice",
        lastName: "Blue",
        bio: "Interested in education",
        skills: ["HTML/CSS"],
        user_type: "volunteer"
      })
      expect(resp.statusCode).toEqual(201)
      expect(resp.body).toEqual({
        volunteer: expect.any(Object),
      })
    })

    test("Throws Unprocessable Entity error when user doesn't provide all fields", async function () {
      const resp = await request(app).post("/volunteer/register/").send({
        username: "new",
      })
      expect(resp.statusCode).toEqual(422)
    })
  })
