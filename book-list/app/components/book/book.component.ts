import BookController from "./book.controller";
import template from "./book.template.html";

class BookComponent implements ng.IComponentOptions {
  public template = template;

  public controller = BookController;

  public bindings = {
    authors: "<",
    description: "<",
    image: "<",
    links: "<",
    rating: "<",
    title: "<",
    year: "<",
  };
}

export default BookComponent;
