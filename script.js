class BookStore {
  constructor(booksLink) {
    this.booksLink = booksLink;
  }

  async init() {
    this.fetchBooks().then(books => this.renderHtml(books));
  }

  async fetchBooks() {
    const response = await fetch(this.booksLink);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const books = await response.json();
    return books;
  }

  renderHtml(data) {
    let fragment = new DocumentFragment();

    let main = document.createElement('main');
    main.classList.add('main');

    let booksWrapper = document.createElement("div");
    booksWrapper.classList.add("books");

    let ul = document.createElement('ul');
    ul.classList.add("books-list");
    ul.setAttribute("id", "books");

    let bagWrapper = document.createElement("div");
    bagWrapper.classList.add("bag");

    let bag = document.createElement("ul");
    bag.classList.add("bag-list");
    bag.setAttribute("id", "bagList");

    bagWrapper.append(bag);

    for (let {author, description, imageLink, price, title} of data) {
      let li = document.createElement("li");
      li.classList.add("books__item");

      let authorParagraph = document.createElement("p");
      authorParagraph.classList.add("books__author");
      authorParagraph.textContent = author;
      li.append(authorParagraph);

      let bookDescriptionParagraph = document.createElement("p");
      bookDescriptionParagraph.classList.add("books__description");
      bookDescriptionParagraph.textContent = description;
      li.append(bookDescriptionParagraph);

      let imageElement = document.createElement("img");
      imageElement.setAttribute("alt", title);
      imageElement.setAttribute("src", imageLink);
      imageElement.classList.add("books__img");
      li.append(imageElement);

      let priceParagraph = document.createElement("p");
      priceParagraph.classList.add("books__price");
      priceParagraph.textContent = price;
      li.append(priceParagraph);

      let titleParagraph = document.createElement("p");
      titleParagraph.classList.add("books__title");
      titleParagraph.innerHTML = title;
      li.append(titleParagraph);

      ul.append(li);
    }

    booksWrapper.append(ul);

    main.append(booksWrapper);
    main.append(bagWrapper);

    fragment.append(main);
    document.body.prepend(fragment);
  }
}

let bookStore = new BookStore("./assets/JSON/books.json");
bookStore.init();
