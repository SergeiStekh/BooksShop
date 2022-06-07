import DomElement from "../domElement/domElement.js";

class Modal extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, bookData) {
    super(parent, appendType, elType, elClass, elInnerText);
    this.bookData = bookData;
    this.createModal();
  } 

  createModal() {
    const modal = new DomElement(this.node, "append", "div", "modal");
    const modalImg = new DomElement(modal.node, "append", "img", "modal__img");
    modalImg.addAttribute([{attribute: "src", value: this.bookData.imageLink}]);

    const modalTextWrapper = new DomElement(modal.node, "append", "div", "modal__text-wrapper");

    const modalCloseBtn = new DomElement(modal.node, "append", "div", "modal__close");
    modalCloseBtn.addAttribute([{attribute: "id", value: "closeModal"}]);
    modalCloseBtn.node.addEventListener("click", () => this.destroyModal());

    new DomElement(modalTextWrapper.node, "append", "p", "modal__title", this.bookData.title);
    new DomElement(modalTextWrapper.node, "append", "p", "modal__author", this.bookData.author);
    new DomElement(modalTextWrapper.node, "append", "p", "modal__description", this.bookData.description);
    new DomElement(modalTextWrapper.node, "append", "p", "modal__price", `${this.bookData.price} €`);
  }

  destroyModal() {
    this.destroy();
  }
}

export default Modal