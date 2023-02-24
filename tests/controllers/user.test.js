const { Request } = require("jest-express/lib/request");
const { Response } = require("jest-express/lib/response");
const { readFile } = require("fs/promises");
const { db } = require("../../src/db/connection");
const { User } = require("../../src/models");
const { login } = require("../../src/controllers");
let mockData;
let req;
let res;

beforeAll(async () => {
  mockData = JSON.parse(await readFile("./tests/mockData/MOCK_USERS.json"));
});

beforeEach(async () => {
  await db.sync({ force: true });
  req = new Request();
  res = new Response();
});

describe("controller logic tests", () => {
  test("get should bring back correct user", async () => {
    for (const obj of mockData) {
      const user = await User.create(obj);
      req.user = user;
      await login(req, res);
      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("username", obj.username);
    }
  });
});
