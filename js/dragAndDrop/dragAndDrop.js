class DragAndDrop {
  constructor(draggableNodesArray, placeToDropElement, onDrop, thisContext) {
    this.draggableNodesArray = draggableNodesArray;
    this.placeToDropElement = placeToDropElement;
    this.onDrop = onDrop;
    this.thisContext = thisContext
    this.addListeners();
  }

  addListeners() {
    this.draggableNodesArray.forEach(el => {
      el.node.addEventListener("dragstart", (e) => this.onStart(e, el));
      el.node.addEventListener("dragend", (e) => this.onDragEnd(e, el))
    });
    this.placeToDropElement.addEventListener("dragover", (e) => this.onDragOver(e))
    this.placeToDropElement.addEventListener("drop", (e) => this.onDrop.call(this.thisContext, e, this.draggingBookData));
  }

  onStart(e, el) {
    this.draggingBookData = el.bookData;
  }

  onDragOver(e) {
    e.preventDefault();
    this.placeToDropElement.style = "background: aliceblue";
  }

  onDragEnd(e) {
    e.preventDefault();
    this.placeToDropElement.style = "background: transparent";
  }
}

export default DragAndDrop