import DomElement from "../domElement/domElement.js";

class ThankForOrder extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, titleText = "Thanks", orderInfo = {}) {
    super(parent, appendType, elType, elClass, elInnerText);
    this.titleText = titleText;
    this.orderInfo = orderInfo;
    this.render();
  }

  render() {
    const title = new DomElement(this.node, "append", "h1", "thanks__title", this.titleText);
    const wrapper = new DomElement(this.node, "append", "ul", "thanks__list");

    for (let key in this.orderInfo) {
      const li = new DomElement(wrapper.node, "append", "li", "thanks__item");
      const nameOfKey = new DomElement(li.node, "append", "p", "thanks__key-name", this.decodeText(key));
      const valueOfKey = new DomElement(li.node, "append", "p", "thanks__key-value", this.orderInfo[key]);
    }
  }

  decodeText(key) {
    let result = "";
    
    switch(key) {
      case "name": result = "Customer name: ";
      break;
      case "surname": result = "Customer surname: ";
      break;
      case "date": result = "Shipping date: ";
      break;
      case "street": result = "Shipping street: ";
      break;
      case "house": result = "Shipping house number: ";
      break;
      case "flat": result = "Shipping flat number: ";
      break;
      case "paymenttype": result = "Payment type: ";
      break;
      case "present": result = "Present: ";
      break;
    }

    return result
  }
}

export default ThankForOrder