const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

console.log(process.env.NODE_ENV);

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("get gets user with passport.js from query string", () => {
  it("returns status: 200 and logged in user ", () => {
    return request(app)
      .get(
        "/user?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjM3ZmQ3YzFiMWQxMzE3NGE1MGJkNCIsImVtYWlsIjoidXNlcjVAc3R1ZmYuY29tIn0sImlhdCI6MTY3NjkwMjc3MH0.d9Cwt52r-G-6yeR6aPECI7hnr6dKE50IkK34daO--18"
      )
      .expect(200);
  });
});
