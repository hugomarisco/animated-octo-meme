const assert = require("assert");
const sinon = require("sinon");
const Operation = require("../src/operation");

describe("Operation", () => {
  describe("Operation.combine(op1, op2)", () => {
    it("should resolve move + move conflicts", () => {
      const op1 = new Operation([{ move: 3 }]);
      const op2 = new Operation([{ move: 1 }]);

      const expected = [{ move: 1 }, { move: 2 }];

      assert.deepEqual(Operation.combine(op1, op2).edits, expected);
      assert.deepEqual(Operation.combine(op2, op1).edits, expected);
    });

    it("should resolve delete + delete conflicts", () => {
      const op1 = new Operation([{ delete: 3 }]);
      const op2 = new Operation([{ delete: 1 }]);

      const expected = [{ delete: 1 }, { delete: 2 }];

      assert.deepEqual(Operation.combine(op1, op2).edits, expected);
      assert.deepEqual(Operation.combine(op2, op1).edits, expected);
    });

    it("should resolve insert + insert conflicts", () => {
      const op1 = new Operation([{ insert: "test1" }]);
      const op2 = new Operation([{ insert: "test2" }]);

      assert.deepEqual(Operation.combine(op1, op2).edits, [
        { insert: "test1" },
        { insert: "test2" }
      ]);
      assert.deepEqual(Operation.combine(op2, op1).edits, [
        { insert: "test2" },
        { insert: "test1" }
      ]);
    });

    it("should resolve move + delete conflicts", () => {
      const op1 = new Operation([{ move: 3 }]);
      const op2 = new Operation([{ delete: 1 }]);

      const expected = [{ delete: 1 }, { move: 2 }];

      assert.deepEqual(Operation.combine(op1, op2).edits, expected);
      assert.deepEqual(Operation.combine(op2, op1).edits, expected);
    });

    it("should resolve move + insert conflicts", () => {
      const op1 = new Operation([{ move: 3 }]);
      const op2 = new Operation([{ insert: "test" }]);

      const expected = [{ insert: "test" }, { move: 3 }];

      assert.deepEqual(Operation.combine(op1, op2).edits, expected);
      assert.deepEqual(Operation.combine(op2, op1).edits, expected);
    });

    it("should resolve insert + delete conflicts", () => {
      const op1 = new Operation([{ insert: "test" }]);
      const op2 = new Operation([{ delete: 3 }]);

      const expected = [{ insert: "test" }, { delete: 3 }];

      assert.deepEqual(Operation.combine(op1, op2).edits, expected);
      assert.deepEqual(Operation.combine(op2, op1).edits, expected);
    });
  });

  describe("Operation.prototype.combine(op2)", () => {
    let combineOp;

    beforeEach(() => {
      combineOp = Operation.combine;

      Operation.combine = sinon.stub().returns({ edits: [] });
    });

    afterEach(() => {
      Operation.combine = combineOp;
    });

    it("should call Operation.combine() and store the results", () => {
      const op1 = new Operation([{ move: 3 }]);
      const op2 = new Operation([{ move: 1 }]);

      op1.combine(op2);

      assert(Operation.combine.withArgs(op1, op2).calledOnce);
      assert.deepEqual(op1.edits, []);
    });
  });

  describe("Operation.prototype.apply(str)", () => {
    it("should correctly apply insert + insert", () => {
      const op = new Operation([{ insert: "abc" }, { insert: "xyz" }]);

      const expected = "abcxyztest";

      assert.equal(op.apply("test"), expected);
    });

    it("should correctly apply delete + delete", () => {
      const op = new Operation([{ delete: 1 }, { delete: 2 }]);

      const expected = "xyz";

      assert.equal(op.apply("abcxyz"), expected);
    });

    it("should correctly apply move + insert", () => {
      const op = new Operation([{ move: 2 }, { insert: "xyz" }]);

      const expected = "abxyzc";

      assert.equal(op.apply("abc"), expected);
    });

    it("should correctly apply move + delete", () => {
      const op = new Operation([{ move: 2 }, { delete: 2 }]);

      const expected = "abyz";

      assert.equal(op.apply("abcxyz"), expected);
    });

    it("should correctly apply insert + delete", () => {
      const op = new Operation([{ insert: "abc" }, { delete: 2 }]);

      const expected = "abcz";

      assert.equal(op.apply("xyz"), expected);
    });

    it("should correctly handle cases where operations reach the end of str", () => {
      const op = new Operation([{ delete: 6 }]);

      const expected = "";

      assert.equal(op.apply("abcxyz"), expected);
    });
  });
});

it("should handle the example provided ;)", () => {
  const s = "abcdefg";
  const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
  const op2 = new Operation([{ move: 3 }, { insert: "BAR" }]);

  assert.equal(op1.apply(s), "aFOObcdefg");
  assert.equal(op2.apply(s), "abcBARdefg");

  op1.combine(op2);

  assert.deepEqual(op1.edits, [
    { move: 1 },
    { insert: "FOO" },
    { move: 2 },
    { insert: "BAR" }
  ]);

  assert.equal(op1.apply(s), "aFOObcBARdefg");
});
