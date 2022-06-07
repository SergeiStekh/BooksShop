import DomElement from "../domElement/domElement.js";

class BookInBag extends DomElement {
  constructor(parent, appendType, elType, elClass, bookData) {
    super(parent, appendType, elType, elClass);
    this.bookData = bookData;
    this.renderBookInBag();
  }

  renderBookInBag() {
    const bookInBag = new DomElement(this.node, "append", "div", "book-in-bag");

    const bookInBagBack = new DomElement(bookInBag.node, "append", "div", "book-in-bag__back");
    bookInBagBack.addAttribute([{attribute: "style", value: `background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.25) 25%, rgba(0, 0, 0, 0.15) 50%, rgba(255, 255, 255, 0) 100%), url("${this.bookData.imageLink}");`}]);

    const bookInBackFront = new DomElement(bookInBag.node, "append", "div", "book-in-bag__front");
    bookInBackFront.addAttribute([{attribute: "style", value: `background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.25) 25%, rgba(0, 0, 0, 0.15) 50%, rgba(255, 255, 255, 0) 100%), url("${this.bookData.imageLink}");`}]);

    const bookInBackFrontTrim = new DomElement(bookInBackFront.node, "append", "div", "book-in-bag__front_trim");
    const bookInBagFrontImg = new DomElement(bookInBackFrontTrim.node, "append", "img", "book-in-bag__img");
    bookInBagFrontImg.addAttribute([{attribute: "src", value: this.bookData.imageLink}]);
    bookInBagFrontImg.addAttribute([{attribute: "alt", value: this.bookData.title}]);

    const contentWrapper = new DomElement(this.node, "append", "div", "bag__content-wrapper");
    new DomElement(contentWrapper.node, "append", "h2", "bag__title", this.bookData.title);

    new DomElement(contentWrapper.node, "append", "p", "bag__author", this.bookData.author);

    new DomElement(contentWrapper.node, "append", "p", "bag__price", `${this.bookData.price} €`);

    const removeBookBtn = new DomElement(this.node, "append", "div", "bag__remove");
    removeBookBtn.node.addEventListener('click', () => this.onRemove());
  }
}

export default BookInBag;