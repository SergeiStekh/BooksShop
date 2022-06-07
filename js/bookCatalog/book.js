import DomElement from "../domElement/domElement.js";

class Book extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, data) {
    super(parent, appendType, elType, elClass, elInnerText);
    this.bookId = data.id;
    this.bookData = data;
    this.createBook(data);
  }
  
  createBook(data) {
    const bookWrapper = new DomElement(this.node, "append", 'figure', "book__art");
    this.createBookFrontWithImage(bookWrapper.node, data.title, data.imageLink);
    this.createBookPages(bookWrapper.node, data);
    this.createBookBack(bookWrapper.node);
    this.createBookSpine(bookWrapper.node);
  }

  createBookFrontWithImage(parent, alt, src) {
    const bookFront = new DomElement(parent, "append", 'ul', "book__front");
    const bookImgPage = new DomElement(bookFront.node, "append", 'li', "book__page-with-image");
    this.bookImg = new DomElement(bookImgPage.node, "append", 'img', "book__image");
    this.bookImg.addAttribute([{attribute: "src", value: src}, {attribute: "alt", value: alt}, {attribute: "width", value: "100%"}, {attribute: "height", value: "100%"}]);
    this.createEmptyPage(bookFront.node, 1);
    return bookFront
  }

  createBookBack(parent) {
    const bookBack = new DomElement(parent, "append", 'ul', "book__back");
    this.createEmptyPage(bookBack.node, 3);
  }

  createBookSpine(parent) {
    const bookSpine = new DomElement(parent, "append", 'ul', "book__spine");
    this.createEmptyPage(bookSpine.node, 2);
  }

  createBookPages(parent, data) {
    const bookPages = new DomElement(parent, "append", 'ul', "book__pages");
    this.createEmptyPage(bookPages.node, 1);
    const bookPageWithLinks = new DomElement(bookPages.node, "append", 'li', "book__empty-page");
    const bookInfo = new DomElement(bookPageWithLinks.node, "append", 'div', "book__info");
    this.createBookTexts(bookInfo.node, data.title, data.author, data.price);
    this.createBookButtons(bookPageWithLinks.node, bookPages.node);
  }

  createBookTexts(parent, title, author, price) {
    this.bookTitle = new DomElement(parent, "append", 'h2', "book__title", title);
    this.bookAuthor = new DomElement(parent, "append", 'span', "book__author", author);
    this.bookPrice = new DomElement(parent, "append", 'span', "book__price", `${price} €`);
  }

  createBookButtons(parent, bookPagesNode) {
    this.addToBagBtn = new DomElement(parent, "append", 'a', "book__add-to-bag", "Add to bag");
    this.addToBagBtn.addAttribute([{attribute: "draggable", value: "false"}]);
    this.showMoreBtn = new DomElement(parent, "append", 'a', "book__show-more", `Show more`);
    this.showMoreBtn.addAttribute([{attribute: "draggable", value: "false"}]);
    this.createEmptyPage(bookPagesNode, 3);
    this.addToBagBtn.node.addEventListener("click", () => this.onBuy());
    this.showMoreBtn.node.addEventListener("click", () => this.onShowMore());
  }

  createEmptyPage(parentNode, quantity) {
    for(let i = 0; i < quantity; i++) {
      new DomElement(parentNode, "append", 'li', "book__empty-page");
    }
  }
}

export default Book;