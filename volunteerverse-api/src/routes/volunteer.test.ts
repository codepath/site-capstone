import { app } from "../app"
import request from "supertest"
import { db } from "../db";



/************************************** POST /auth/register */
describe("POST /auth/register/", function () {
    test("Allows user to register with valid credentials", async function () {
      const resp = await request(app).post("/auth/register").send({
        email: "neweemaafallll@gmail",
        password: "string",
        firstName: "Alice",
        lastName: "Blue",
        imageUrl: "imageUrl",
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
      const resp = await request(app).post("/auth/register").send({
        username: "new",
      })
      expect(resp.statusCode).toEqual(422)
    })
  })
