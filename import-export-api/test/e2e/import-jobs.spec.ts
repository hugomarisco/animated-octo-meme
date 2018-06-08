import assert from "assert";
import sinon, { SinonFakeTimers } from "sinon";
import request from "supertest";
import app from "../../src/app";

describe("/import-jobs", () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describe("GET /", () => {
    it("should return a 200 with an empty list when no jobs are available", () => {
      return request(app)
        .get("/import-jobs")
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body, []);
        });
    });

    it("should return a 200 with a list of import jobs", () => {
      const jobs = [
        { book_id: "1", type: "word", url: "http://example.com" },
        { book_id: "2", type: "wattpad", url: "http://anotherexample.com" },
      ];

      return Promise.all(
        jobs.map((job) =>
          request(app)
            .post("/import-jobs")
            .send(job),
        ),
      ).then(() => {
        return request(app)
          .get("/import-jobs")
          .expect(200)
          .then((res) =>
            assert.deepEqual(
              res.body,
              jobs.map((j) => ({
                ...j,
                created_at: new Date().toJSON(),
                state: "pending",
              })),
            ),
          );
      });
    });
  });

  describe("POST /", () => {
    it("should return a 422 with a reason when no book_id is provided", () => {
      return request(app)
        .post("/import-jobs")
        .expect(422)
        .then((res) => {
          assert.equal(res.body.reason, "'book_id' is a required field");
        });
    });

    it("should return a 422 with a reason when a non-string book_id is provided", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: 10 })
        .expect(422)
        .then((res) => {
          assert.equal(res.body.reason, "'book_id' must be a string");
        });
    });

    it("should return a 422 with a reason when no type is provided", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: "1" })
        .expect(422)
        .then((res) => {
          assert.equal(res.body.reason, "'type' is a required field");
        });
    });

    it("should return a 422 with a reason when an invalid type is provided", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: "1", type: "other" })
        .expect(422)
        .then((res) => {
          assert.equal(
            res.body.reason,
            "'type' must be one of the following: word, pdf, wattpad, evernote",
          );
        });
    });

    it("should return a 422 with a reason when no url is provided", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: "1", type: "pdf" })
        .expect(422)
        .then((res) => {
          assert.equal(res.body.reason, "'url' is a required field");
        });
    });

    it("should return a 422 with a reason when an invalid url is provided", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: "1", type: "pdf", url: "http" })
        .expect(422)
        .then((res) => {
          assert.equal(
            res.body.reason,
            "'url' must be a valid URL",
          );
        });
    });

    it("should return a 201 along with a JSON representation of the created job when succesful", () => {
      return request(app)
        .post("/import-jobs")
        .send({ book_id: "1", type: "pdf", url: "http://example.com" })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.body, {
            book_id: "1",
            created_at: new Date().toJSON(),
            state: "pending",
            type: "pdf",
            url: "http://example.com",
          });
        });
    });
  });
});
