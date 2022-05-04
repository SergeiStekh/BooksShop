class BookStore {
  constructor(booksLink) {
    this.booksLink = booksLink;
    this.isModalOpen = false;
  }

  async init() {
    this.fetchBooks().then(books => this.renderHtml(books));
  }

  addListeners() {
    Array.from(document.querySelectorAll(".books__show-more")).forEach(el => el.addEventListener("click", this.showModal.bind(this)))
  }

  async fetchBooks() {
    try {
      const response = await fetch(this.booksLink);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const books = await response.json();
      return books;
    } catch {
      throw new Error("Something went wrong!");
    }
    
  }

  renderHtml(data) {
    let fragment = new DocumentFragment();

    let main = document.createElement('main');
    main.classList.add('main');

    let booksWrapper = document.createElement("div");
    booksWrapper.classList.add("books");

    let ul = document.createElement('ul');
    ul.classList.add("books__list");
    ul.setAttribute("id", "books");

    let bagWrapper = document.createElement("div");
    bagWrapper.classList.add("bag");

    let bag = document.createElement("ul");
    bag.classList.add("bag__list");
    bag.setAttribute("id", "bagList");

    bagWrapper.append(bag);

    for (let {author, description, imageLink, price, title} of data) {
      let li = document.createElement("li");
      li.classList.add("books__item");

      let imageWrapper = document.createElement("div");
      imageWrapper.classList.add("books__img-wrapper");

      let imageElement = document.createElement("img");
      imageElement.setAttribute("alt", title);
      imageElement.setAttribute("src", imageLink);
      imageElement.classList.add("books__img");
      imageWrapper.append(imageElement);
      li.append(imageWrapper);

      let contentWrapper = document.createElement("div");
      contentWrapper.classList.add("books__content-wrapper");

      let titleParagraph = document.createElement("p");
      titleParagraph.classList.add("books__title");
      titleParagraph.innerHTML = title;
      contentWrapper.append(titleParagraph);

      let authorParagraph = document.createElement("p");
      authorParagraph.classList.add("books__author");
      authorParagraph.textContent = author;
      contentWrapper.append(authorParagraph);

      let priceParagraph = document.createElement("p");
      priceParagraph.classList.add("books__price");
      priceParagraph.textContent = `${price} €`;
      contentWrapper.append(priceParagraph);

      let showMore = document.createElement("button");
      showMore.classList.add("books__show-more");
      showMore.textContent = "Show more";
      contentWrapper.append(showMore);

      let addToBag = document.createElement("button");
      addToBag.classList.add("books__add-to-bag");
      addToBag.textContent = "Add to bag";
      contentWrapper.append(addToBag);

      li.append(contentWrapper)
      ul.append(li);
    }

    booksWrapper.append(ul);

    main.append(booksWrapper);
    main.append(bagWrapper);

    fragment.append(main);
    document.body.prepend(fragment);
    this.addListeners();
  }

  async showModal(e) {
    if (e) {
      e.preventDefault();
    }

    let bookName = e.target.parentNode.querySelector(".books__title").innerText;

    let allBooks = await this.fetchBooks();
    
    let chosenBook = Array.from(allBooks).filter(el => el.title === bookName)[0];

    let {author, description, imageLink, price, title} = chosenBook;
    
    let modalFragment = new DocumentFragment();

    let modalWrapper = document.createElement("div");
    modalWrapper.classList.add("modal__wrapper");

    let modal = document.createElement("div");
    modal.classList.add("modal");
    
    let modalBookImage = document.createElement("img");
    modalBookImage.setAttribute("src", imageLink);
    modalBookImage.classList.add("modal__img");

    let modalTextWrapper = document.createElement("div");
    modalTextWrapper.classList.add("modal__text-wrapper");

    let closeBtn = document.createElement("div");
    closeBtn.classList.add("modal__close");
    closeBtn.setAttribute("id", "closeModal");
    modal.append(closeBtn);

    let modalBookTitle = document.createElement("p");
    modalBookTitle.classList.add("modal__title");
    modalBookTitle.innerText = title;
    modalTextWrapper.append(modalBookTitle);

    let modalBookAuthor = document.createElement("p");
    modalBookAuthor.classList.add("modal__author");
    modalBookAuthor.innerText = author;
    modalTextWrapper.append(modalBookAuthor);

    let modalBookDescription = document.createElement("p");
    modalBookDescription.classList.add("modal__description");
    modalBookDescription.innerText = description;
    modalTextWrapper.append(modalBookDescription);

    let modalBookPrice = document.createElement("p");
    modalBookPrice.classList.add("modal__price");
    modalBookPrice.innerText = `${price} €`;
    modalTextWrapper.append(modalBookPrice);

    modal.append(modalBookImage);
    modal.append(modalTextWrapper);
    modalWrapper.append(modal);
    modalFragment.append(modalWrapper);
    document.body.append(modalFragment);

    document.querySelector(".modal__wrapper").classList.add("visible");
    document.querySelector(".modal__wrapper").addEventListener("click", this.closeModal.bind(this));
    document.body.style.overflow = "hidden";
    document.querySelector("#closeModal").addEventListener("click", this.closeModal);
  }

  closeModal(e) {
    e.preventDefault();
    e.stopPropagation();

    let isWrapperClick = Array.from(e.target.classList).includes("modal__wrapper");
    let isCloseBtnClick = Array.from(e.target.classList).includes("modal__close");

    if (!isWrapperClick && !isCloseBtnClick) {
      return
    }
    
    if (isWrapperClick) {
      e.target.remove();
    } 

    if (isCloseBtnClick) {
      e.target.parentNode.parentNode.remove();
    }

    document.body.style.overflow = "visible";
  }
}

let bookStore = new BookStore("./assets/JSON/books.json");
bookStore.init();