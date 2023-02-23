const { readFile } = require("fs/promises");
const { db } = require("../../src/db/connection");
const { Post } = require("../../src/models");
let mockData;

beforeAll(async () => {
  mockData = JSON.parse(await readFile("./tests/mockData/MOCK_POSTS.json"));
});

beforeEach(async () => {
  await db.sync({ force: true });
});

describe("Post integrity tests", () => {
  it("should have a title property", async () => {
    for (const obj of mockData) {
      const post = await Post.create(obj);
      expect(post).toHaveProperty("title", obj.title);
    }
  });

  it("should have a content property", async () => {
    for (const obj of mockData) {
      const post = await Post.create(obj);
      expect(post).toHaveProperty("content", obj.content);
    }
  });

  it("should have a likes property", async () => {
    for (const obj of mockData) {
      const post = await Post.create(obj);
      expect(post).toHaveProperty("likes", obj.likes);
    }
  });
});
