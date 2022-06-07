import BookInBag from "./bookInBag.js";
import DomElement from "../domElement/domElement.js";
import Notification from "../notifications/notifications.js"
import Total from "./total.js";

class Bag extends DomElement {
  constructor(parent, appendType, elType, elClass, booksInBag = []) {
    super(parent, appendType, elType, elClass);
    this.wrapper = new DomElement(this.node, "prepend", "ul", "bag__list");
    this.booksInBag = booksInBag;
    if (this.booksInBag.length === 0) {
      this.advice = new Notification(this.node, "append", "p", "bag__advice", "Drag the book here to put it in the bag!");
    }
    this.node.addEventListener("wheel", this.bagWheelScroll, {passive: false});
  }

  updateBag(bookData) {
    const isBookInBag = this.booksInBag.some((bookInBag) => bookInBag.bookData.id === bookData.id);
    if (bookData && !isBookInBag) {
      const newBookInBag = new BookInBag(this.wrapper.node, "append", "li", "book-in-bag__wrapper", bookData);
      this.booksInBag.push(newBookInBag);
      this.updateTotal(this.booksInBag);
      newBookInBag.onRemove = () => this.onRemove(bookData);
    } else {
      new Notification(this.node, "append", "p", "book-is-in-bag", "This book is already in bag", 1000);
    }

    if (this.advice) {
      this.advice.destroy();
    }
  }

  onRemove(bookData) {
    const bookToRemove = this.booksInBag.filter((book) => book.bookData.id === bookData.id);
    this.booksInBag = this.booksInBag.filter((book) => book.bookData.id !== bookData.id);
    bookToRemove[0].destroy();
    
    this.updateTotal();

    if (this.booksInBag.length === 0) {
      this.advice = new Notification(this.node, "append", "p", "bag__advice", "Drag the book here to put it in the bag!");
    }
  }

  updateTotal() {
    if (!this.total && this.booksInBag.length > 0) {
      this.total = new Total(this.node, "append", "div", "total__wrapper", "", this.booksInBag);
    } else if (this.booksInBag.length === 0 && this.total) {
      this.total.destroy();
      this.total = undefined;
    } else {
      this.total.updateTotal(this.booksInBag);
    }
  }

  bagWheelScroll(e) {
    e.preventDefault();
    let deltaX = -0;
    if (e.deltaX !== deltaX) {
      this.scrollLeft += e.deltaX;
    } else {
      this.scrollLeft += e.deltaY;
    }
  }
}

export default Bag;