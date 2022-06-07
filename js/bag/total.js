import DomElement from "../domElement/domElement.js"

class Total extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, books) {
    super(parent, appendType, elType, elClass, elInnerText);
    this.total = books.reduce((acc, curr) => acc + curr.bookData.price, 0);
    this.totalPrice = new DomElement(this.node, "append", "p", "bag__total", `Total price: ${this.total} €`);
    this.confirmOrder = new DomElement(this.node, "append", "button", "bag__confirm", "Confirm order");
    this.confirmOrder.node.addEventListener("click", this.toConfirmationPage);
  }

  updateTotal(books) {
    this.total = books.reduce((acc, curr) => acc + curr.bookData.price, 0);
    this.totalPrice.updateInnerText(`Total price: ${this.total} €`);
  }

  toConfirmationPage() {
    document.querySelector("main").remove();
    document.querySelector(".order").classList.add("visible");
  }
}

export default Total;