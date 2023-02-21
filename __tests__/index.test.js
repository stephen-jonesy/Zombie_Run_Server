const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const users = require("../models/user");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
  await users.deleteMany({});
  await users.create({
    username: "user1",
    email: "user1@stuff.com",
    name: "user1",
    password: "12345",
    profile_image_url: "",
  });
});

/* Closing database connection after each test. */
afterAll(async () => {
  await users.deleteMany({});
  await mongoose.connection.close();
});

function loginDefaultUser() {
  return request(app)
    .post("/login")
    .send({ email: "user1@stuff.com", password: "12345" })
    .then(({ body: { token } }) => {
      return token;
    });
}

describe("get /user", () => {
  it("returns status: 200 and logged in user ", () => {
    return loginDefaultUser().then((token) => {
      return request(app)
        .get(`/user?secret_token=${token}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe("You made it to the secure route");
        });
    });
  });
  it("return a 401 unauthorised status if query string is invalid", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjM3ZmQ3YzFiMWQxMzE3NGE1MGJkNCIsImVtYWlsIjoidXNlcjVAc3R1ZmYuY29tIn0sImlhdCI6MTY3NjkwMjc3MH0.d9Cwt52r-G-6yeR6aPECI7hnr6dKE50IkK34daO--129";
    return request(app)
      .get(`/user?secret_token=${invalidToken}`)
      .expect(401)
      .then(({ res }) => {
        expect(res.statusMessage).toBe("Unauthorized");
      });
  });
});

describe("POST /signup", () => {
  it("should ", () => {
    const obj = {
      username: "user4",
      email: "user4@stuff.com",
      name: "user4",
      password: "12345",
      profile_image_url: "",
    };
    return request(app).post("/signup").send(obj).expect(201);
  });
});

describe("runs", () => {
  it("should create a run", () => {
    return loginDefaultUser().then((token) => {
      return request(app)
        .get(`/user?secret_token=${token}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe("You made it to the secure route");
        });
    });
  });
});
