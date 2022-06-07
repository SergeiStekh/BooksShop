import DomElement from "../domElement/domElement.js"; '../domElement/domElement.js'

class Notification extends DomElement {
  constructor(parent, appendType, elType, elClass, elInnerText, notificationTime) {
    super(parent, appendType, elType, elClass, elInnerText);

    this.notificationTime = notificationTime;

    if (this.notificationTime) {
      this.removeNotification();
    }
  }

  removeNotification() {
    if (this.notificationTime) {
      setTimeout(() => {
        this.destroy();
      }, this.notificationTime);
    } else {
      this.destroy();
    }
  }
}

export default Notification