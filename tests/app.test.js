const request = require("supertest");
const app = require("../src/app");

test("should first check health of API", async () => {
  const response = await request(app).get("/health");
  expect(response.statusCode).toBe(200);
});
