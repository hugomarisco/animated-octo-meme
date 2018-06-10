import * as angular from "angular";
import AppComponent from "./app/app.component";
import BookComponent from "./app/components/book/book.component";
import PaginationComponent from "./app/components/pagination/pagination.component";
import "./index.less";

angular
  .module("book-list", [])
  .component("app", new AppComponent())
  .component("book", new BookComponent())
  .component("pagination", new PaginationComponent());
