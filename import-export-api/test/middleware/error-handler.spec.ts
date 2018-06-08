import assert from "assert";
import sinon, { SinonFakeTimers, SinonStub } from "sinon";
import { ValidationError } from "../../src/errors";
import errorHandler from "../../src/middleware/error-handler";

describe("Error Handler", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {};
    res = {};
    next = sinon.stub();
  });

  it("should not change the req/res and call next if no error is provided", () => {
    errorHandler(null, req, res, next);

    assert.deepEqual(res, {});
    assert.deepEqual(res, {});
    assert(next.calledOnce);
  });

  it("should default to a 500 error when an unknown error class is provided", () => {
    res.json = sinon.stub();
    res.status = sinon.stub().returns(res);

    errorHandler(new Error("boom"), req, res, next);

    assert(res.status.withArgs(500).calledOnce);
    assert(res.json.withArgs({ reason: "boom" }).calledOnce);
  });

  it("should call status(422) and append the reason to the body when providing a ValidationError", () => {
    res.json = sinon.stub();
    res.status = sinon.stub().returns(res);

    errorHandler(new ValidationError("boom"), req, res, next);

    assert(res.status.withArgs(422).calledOnce);
    assert(res.json.withArgs({ reason: "boom" }).calledOnce);
  });
});
