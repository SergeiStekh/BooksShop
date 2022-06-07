class DomElement {
  node = null;

  constructor(parent, appendType = "append", elType = 'div', elClass, elInnerText) {
    const element = document.createElement(elType);
    element.className = elClass;
    if (elInnerText) {
      element.innerText = elInnerText;
    }
    if (appendType === "append") {
      parent.append(element);
    } else {
      parent.prepend(element);
    }
    this.node = element;
  }

  addAttribute(arrayOfAttributesAndValues) {
    arrayOfAttributesAndValues.forEach(attr => this.node.setAttribute(attr.attribute, attr.value));
  }

  updateInnerText(newText) {
    this.node.innerText = newText;
  }

  destroy() {
    this.node.remove();
  }
}

export default DomElement;