import books from "../books.json";
import IBook from "./interfaces/book";

class AppController implements ng.IComponentController {
  public books: IBook[] = books;
  public currentPage: number = 1;
}

export default AppController;
