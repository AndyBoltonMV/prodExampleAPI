const { readFile } = require("fs/promises");
const { db } = require("../../src/db/connection");
const { User } = require("../../src/models");
let mockData;

beforeAll(async () => {
  mockData = JSON.parse(await readFile("./tests/MOCK_DATA.json"));
});

beforeEach(async () => {
  await db.sync({ force: true });
});

describe("User integrity tests", () => {
  it("should have a username property", async () => {
    for (const obj of mockData) {
      const user = await User.create(obj);
      expect(user).toHaveProperty("username", obj.username);
    }
  });

  it("should have a email property", async () => {
    for (const obj of mockData) {
      const user = await User.create(obj);
      expect(user).toHaveProperty("email", obj.email);
    }
  });

  it("should have a password property", async () => {
    for (const obj of mockData) {
      const user = await User.create(obj);
      expect(user).toHaveProperty("password", obj.password);
    }
  });
});
