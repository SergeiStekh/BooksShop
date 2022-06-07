import DomElement from "../domElement/domElement.js";

class Loader extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, loaderDuration) {
    super(parent, appendType, elType, elClass, elInnerText);
    this.loaderDuration = loaderDuration;
    const loaderAnimation = new DomElement(this.node, "append", "div", "loader__animation");
    const loaderImg = new DomElement(loaderAnimation.node, "append", "img", "loader__animation-img");
    loaderImg.addAttribute([{attribute: "src", value: "./assets/images/Pulse-1s-200px.svg"}]);
    new DomElement(this.node, "prepend", "p", "loader__text", "Welcome to BookShop!");

    if (this.loaderDuration) {
      setTimeout(() => {
        this.destroy();
      }, loaderDuration);
    }
  }
}

export default Loader