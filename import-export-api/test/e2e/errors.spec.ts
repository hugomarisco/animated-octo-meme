import assert from "assert";
import request from "supertest";
import app from "../../src/app";

describe("HTTP Errors", () => {
  describe("GET /random", () => {
    it("should return a 404", () => {
      return request(app)
        .get("/random")
        .expect(404)
        .then((res) => assert.deepEqual(res.body, { reason: "Not found" }));
    });
  });
});
