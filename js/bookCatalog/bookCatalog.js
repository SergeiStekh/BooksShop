import DomElement from "../domElement/domElement.js";
import Book from "./book.js";
import Modal from '../modal/modal.js'

class BookCatalog extends DomElement {
  constructor(parent, appendType, elType, elClass, books) {
    super(parent, appendType, elType, elClass);
    this.books = books;
    this.loadCatalog();
    this.node.addEventListener("wheel", this.catalogWheelScroll, {passive: false}); 
  }

  async loadCatalog() {
    this.renderBookShell();
    this.update(this.books);
  }

  renderBookShell() {
    let shellWrapper = new DomElement(this.node, "append", 'div', "shell__wrapper");
    let shell = new DomElement(shellWrapper.node, "append", 'div', "shell");
    let shellElements = ["front", "back", "top", "bottom", "left", "right"];
    shellElements.forEach(el => new DomElement(shell.node, "append", 'div', el));
  }

  update(catalogData) {
    let wrapper = new DomElement(this.node, "prepend", "ul", "book__list");
    this.items = catalogData.map(bookData => {
      const book = new Book(wrapper.node, "append", "li", "book__item", "", bookData);
      book.addAttribute([{attribute: "draggable", value: "true"}]);
      book.onBuy = (e) => {
        this.onBuy(e, bookData);
      }
      book.onShowMore = () => {
        this.onShowMore(bookData);
      }
      return book;
    });
  }

  showModal(bookData) {
    new Modal(document.body, "append", "div", "modal__wrapper visible", "", bookData);
  }

  catalogWheelScroll(e) {
    e.preventDefault();
    let deltaX = -0;
    if (e.deltaX !== deltaX) {
      this.scrollLeft += e.deltaX;
    } else {
      this.scrollLeft += e.deltaY;
    }
  }
}

export default BookCatalog;