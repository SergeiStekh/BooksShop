import DomElement from "./domElement/domElement.js";
import BookCatalog from "./bookCatalog/bookCatalog.js";
import Bag from "./bag/bag.js";
import FetchBooks from "./fetchData/fetchBooks.js";
import Loader from "./loader/loader.js";
import DragAndDrop from "./dragAndDrop/dragAndDrop.js";
import AppValidation from "./validation/validation.js";
import validationRules from "./validation/validationRules.js";

class BookShop extends DomElement{
  constructor(parent, appendType, elType, elClass) {
    super(parent, appendType, elType, elClass);
  }

  async init() {
    new Loader(this.node, "append", "div", "loader", "", 3000);
    this.books = await new FetchBooks("./books.json").getBooks();
    this.bookCatalog = new BookCatalog(this.node, "append", 'div', "books", this.books);
    this.bag = new Bag(this.node, "append", "div", "bag");
    new DragAndDrop(this.bookCatalog.items, this.bag.node, this.onBuy, this);
    this.bookCatalog.onBuy = this.onBuy.bind(this);
    this.bookCatalog.onShowMore = this.onShowMore.bind(this);
    this.orderValidation();
  }

  onBuy(e, bookData) {
    this.bag.updateBag(bookData);
  }

  onShowMore(bookData) {
    this.bookCatalog.showModal(bookData);
  }

  orderValidation() {
    new AppValidation(document.querySelector(".order__form"), validationRules);
  }
}

export default BookShop;