const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const users = require("../models/user");
const runs = require("../models/run");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
  await users.deleteMany({});
  await runs.deleteMany({});
  await users.create({
    _id: "53f63ef61584ab8441b3fdd8",
    username: "user1",
    email: "user1@stuff.com",
    name: "user1",
    password: "12345",
    profile_image_url: "",
  });
  await users.create({
    _id: "93f63ef61584ab8441b3fdd8",
    username: "user1000",
    email: "user1000@stuff.com",
    name: "user1000",
    password: "12345",
    profile_image_url: "",
  });
  await runs.create({
    user_id: "53f63ef61584ab8441b3fdd8",
    run_data: [],
    achievements: [],
    created_at: new Date(Date.now()).toISOString(),
  });
});

/* Closing database connection after each test. */
afterAll(async () => {
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

function runsByUserId(token) {
  return request(app)
    .get(`/runs/53f63ef61584ab8441b3fdd8?secret_token=${token}`)
    .expect(200)
    .then(({ body }) => {
      // console.log("body", body);
      // console.log("token", token);
      return { body, token };
    });
}

describe("App", () => {
  describe('Error-handling - 404 error for incorrect endpoint', () => {
    it('should return 404 error if an endpoint is misspelled', () => {
      return request(app).get("/loginn")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Path not found")
        })
    });
  });
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
    it("should return 204, delete user from Db", () => {
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(({ body }) => {
            return request(app)
              .delete(`/user/${body.user._id}?secret_token=${token}`)
              .expect(204);
          });
      });
    });
    it("should update user", () => {
      const obj = {
        username: "user100",
        email: "user100@user.com",
        profile_image_url: "",
      };
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then((res) => {
            return { body: res._body.user._id, token: res._body.token };
          })
          .then(({ body, token }) => {
            obj._id = body;
            return request(app)
              .patch(`/user?secret_token=${token}`)
              .send(obj)
              .expect(200)
              .then(({ body }) => {
                expect(body.result.username).toBe("user100")
                expect(body.result.email).toBe("user100@user.com")
              });
          });
      });
    });
  });

  describe("POST /signup", () => {
    it("should return 201 for successful signup", () => {
      const obj = {
        username: "user4",
        email: "user4@stuff.com",
        name: "user4",
        password: "12345",
        profile_image_url: "",
      };
      return request(app).post("/signup")
      .send(obj)
      .expect(201)
      .then(({body}) => {
        expect(body.message).toBe("success")
      })
    });
    it("should return 422, field missing", () => {
      const obj = {
        username: "user4",
        name: "user4",
        password: "12345",
        profile_image_url: "",
      };
      return request(app)
        .post("/signup")
        .send(obj)
        .expect(422)
        .then(({ _body: { message } }) => {
          expect(message).toBe(
            "users validation failed. Please enter all required fields"
          );
        });
    });    
    it("should return 400, duplicate field error", () => {
      const obj = {
        username: "user1",
        email: "user1@stuff.com",
        name: "user1",
        password: "12345",
        profile_image_url: "",
      };
      return request(app)
        .post("/signup")
        .send(obj)
        .expect(400)
        .then(({ _body: { message } }) => {
          expect(message).toBe(
            "Duplicate field. Please enter a unique username/email"
          );
        });
    });
  });

  describe("runs", () => {
    it("should create a run", () => {
      const obj = {
        user_id: "263248919372",
        run_data: [],
        achievements: [],
        created_at: new Date(Date.now()).toISOString(),
      };
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.message).toBe("You made it to the secure route");
            return request(app)
              .post(`/runs?secret_token=${token}`)
              .send(obj)
              .expect(201)
              .then(({ body }) => {
                expect(body.result.user_id).toBe("263248919372");
              });
          });
      });
    });
    it("should get all runs by user id", () => {
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.message).toBe("You made it to the secure route");
            const userId = body.user._id
            return request(app)
              .get(`/runs/${userId}?secret_token=${token}`)
              .expect(200)
              .then(({ body }) => {
                expect(body.result.length).toBe(1);
              });
          });
      });
    });
    it("200; run not found with user id", () => {
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.message).toBe("You made it to the secure route");
            return request(app)
              .get(`/runs/93f63ef61584ab8441b3fdd8?secret_token=${token}`)
              .expect(200)
              .then(({body}) => {
                expect(body.message).toBe("No runs found")
              })
          });
      });
    });
    it("should update run", () => {
      const obj = {
        user_id: "53f63ef61584ab8441b3fdd8",
        created_at: new Date(1676989500431).toISOString(),
      };
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(() => {
            return runsByUserId(token);
          })
          .then(({ body, token }) => {
            obj._id = body.result[0]._id;
            return request(app)
              .patch(`/runs/?secret_token=${token}`)
              .send(obj)
              .expect(200)
              .then(({ body }) => {
                expect(body.result).toHaveProperty("created_at", expect.any(String))
                expect(body.result).toHaveProperty("user_id", "53f63ef61584ab8441b3fdd8")
              });
          });
      });
    });
    it("status 204; delete run by id", () => {
      return loginDefaultUser().then((token) => {
        return request(app)
          .get(`/user?secret_token=${token}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.message).toBe("You made it to the secure route");
            return request(app)
              .get(`/runs/53f63ef61584ab8441b3fdd8?secret_token=${token}`)
              .expect(200)
              .then(({ body }) => {
                const run_id = body.result[0]._id;
                return request(app)
                  .delete(`/runs/${run_id}?secret_token=${token}`)
                  .expect(204);
              });
          });
      });
    });
  });
  describe('Default api endpoint', () => {
    it('200; returns with JSON for the api endpoints and their details', () => {
      return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(typeof endpoints).toBe("object")
        expect(Object.keys(endpoints)).toHaveLength(10);
        expect(endpoints).toHaveProperty('GET /api');
        expect(endpoints).toHaveProperty('POST /signup');
        expect(endpoints).toHaveProperty('POST /login');
        expect(endpoints).toHaveProperty('GET /user');
        expect(endpoints).toHaveProperty('PATCH /user');
        expect(endpoints).toHaveProperty('DELETE /user/:user_id');
        expect(endpoints).toHaveProperty('POST /runs');
        expect(endpoints).toHaveProperty('GET /runs:user_id');
        expect(endpoints).toHaveProperty('PATCH /runs');
        expect(endpoints).toHaveProperty('DELETE /runs/:run_id');
      })
    });
  });
});
