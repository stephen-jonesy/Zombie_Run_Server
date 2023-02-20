const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("get /user", () => {
  it("returns status: 200 and logged in user ", () => {
    const validToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjM3ZmQ3YzFiMWQxMzE3NGE1MGJkNCIsImVtYWlsIjoidXNlcjVAc3R1ZmYuY29tIn0sImlhdCI6MTY3NjkwMjc3MH0.d9Cwt52r-G-6yeR6aPECI7hnr6dKE50IkK34daO--18";
    return request(app)
      .get(`/user?secret_token=${validToken}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body.message);
        expect(body.message).toBe("You made it to the secure route");
      });
  });
  it("return a 401 unauthurised status if query string is invalid", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjM3ZmQ3YzFiMWQxMzE3NGE1MGJkNCIsImVtYWlsIjoidXNlcjVAc3R1ZmYuY29tIn0sImlhdCI6MTY3NjkwMjc3MH0.d9Cwt52r-G-6yeR6aPECI7hnr6dKE50IkK34daO--129";
    return request(app)
      .get(`/user?secret_token=${invalidToken}`)
      .expect(401)
      .then(({ res }) => {
        console.log(res.statusMessage);
        expect(res.statusMessage).toBe("Unauthorized");
      });
  });
});

describe("POST /signup", () => {
  const obj = {
    username: "user5",
    email: "user5@stuff.com",
    name: "user5",
    password: "12345",
    profile_image_url: "",
  };
  return request(app).get("signup").expect(201);
});
