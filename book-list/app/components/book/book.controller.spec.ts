import { assert } from "chai";
import BookController from "./book.controller";

describe("BookController", () => {
  let bookController: BookController;

  beforeEach(() => {
    bookController = new BookController();
  });

  it("should toggle the description visibility", () => {
    assert.equal(bookController.showingDescription, false);

    bookController.toggleDescription();

    assert.equal(bookController.showingDescription, true);
  });
});
