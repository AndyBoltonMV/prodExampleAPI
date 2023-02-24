const request = require("supertest");
const { readFile } = require("fs/promises");
const { db } = require("../../src/db/connection");
const { User } = require("../../src/models");
const app = require("../../src/app");
let mockData;

beforeAll(async () => {
  mockData = JSON.parse(await readFile("./tests/mockData/MOCK_USERS.json"));
});

beforeEach(async () => {
  await db.sync({ force: true });
});

test("should get a user based on username and password", async () => {
  for (const obj of mockData) {
    await User.create(obj);
    const response = await request(app)
      .get("/user/")
      .send({ username: obj.username, password: obj.password });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("username", obj.username);
  }
});
