const { readFile } = require("fs/promises");
const { db } = require("../../src/db/connection");
const { User, Post } = require("../../src/models");
let mockUsers;
let mockPosts;

beforeAll(async () => {
  mockUsers = JSON.parse(await readFile("./tests/mockData/MOCK_USERS.json"));
  mockPosts = JSON.parse(await readFile("./tests/mockData/MOCK_POSTS.json"));
});

beforeEach(async () => {
  await db.sync({ force: true });
  for (let i = 0; i < 1000; i++) {
    await User.create(mockUsers[i]);
    await Post.create(mockPosts[i]);
  }
});

describe("Association integrity tests", () => {
  it("should relate any user to any post", async () => {
    for (let i = 1; i < 1001; i++) {
      const ranNum = Math.floor(Math.random() * 1000 + 1);
      const user = await User.findByPk(ranNum);
      const post = await Post.findByPk(i);
      await user.addPost(post);
      expect(await user.hasPost(post)).toBe(true);
    }
  });
});
