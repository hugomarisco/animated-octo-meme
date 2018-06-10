import PaginationController from "./pagination.controller";
import template from "./pagination.template.html";

class PaginationComponent implements ng.IComponentOptions {
  public template: string = template;
  public controller = PaginationController;

  public bindings = {
    currentPage: "=",
    recordsPerPage: "<",
    totalRecords: "<",
  };
}

export default PaginationComponent;
