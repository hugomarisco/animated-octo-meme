import { assert } from "chai";
import PaginationController from "./pagination.controller";

describe("PaginationController", () => {
  let paginationController: PaginationController;

  beforeEach(() => {
    paginationController = new PaginationController();
  });

  it("should compute the total number of pages", () => {
    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 90;

    assert.equal(paginationController.totalPages(), 9);

    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 99;

    assert.equal(paginationController.totalPages(), 10);
  });

  it("should return when prev() operation is not available", () => {
    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 100;
    paginationController.currentPage = 1;

    assert.equal(paginationController.canPrev(), false);

    paginationController.currentPage = 2;

    assert.equal(paginationController.canPrev(), true);
  });

  it("should return when next() operation is not available", () => {
    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 100;
    paginationController.currentPage = 10;

    assert.equal(paginationController.canNext(), false);

    paginationController.currentPage = 9;

    assert.equal(paginationController.canNext(), true);
  });

  it("should move to previous page on prev()", () => {
    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 100;
    paginationController.currentPage = 4;

    paginationController.prev();

    assert.equal(paginationController.currentPage, 3);
  });

  it("should move to next page on next()", () => {
    paginationController.recordsPerPage = 10;
    paginationController.totalRecords = 100;
    paginationController.currentPage = 4;

    paginationController.next();

    assert.equal(paginationController.currentPage, 5);
  });
});
