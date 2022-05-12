class BookStore {
  constructor(booksLink) {
    this.booksLink = booksLink;
    this.bag = [];
    this.dragBookTitle = "";
    this.total = 0;
    this.validFormElements = ["present"];
    this.isFormValid = false;
    this.orderInfo = {};
  }

  async init() {
    let fetchedBooks = await this.fetchBooks();
    this.renderHtml(fetchedBooks);
    this.addListeners();
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

  addListeners(firstRun = true) {
    if (firstRun) {
      Array.from(document.querySelectorAll(".book__show-more")).forEach(el => el.addEventListener("click", this.showModal.bind(this)));
      Array.from(document.querySelectorAll(".book__add-to-bag")).forEach(el => el.addEventListener("click", this.addToBag.bind(this)));
      Array.from(document.querySelectorAll(".book__item")).forEach(el => el.addEventListener("dragstart", this.dragStart.bind(this)));
      document.querySelector(".bag").addEventListener("dragover", this.dragOver.bind(this));
      document.querySelector(".books").addEventListener("dragover", this.dragOver.bind(this));
      document.querySelector(".bag").addEventListener("drop", this.drop.bind(this));
      document.querySelector(".order__form").addEventListener("input", this.validateForm.bind(this));
      document.querySelector(".order__form").addEventListener("focusout", this.validateForm.bind(this));
      document.querySelector(".order__form").addEventListener("submit", this.submitForm.bind(this));
    } else {
      Array.from(document.querySelectorAll(".bag__remove")).forEach(el => el.addEventListener("click", this.removeBookFromBag.bind(this)));
      if (document.querySelector(".bag__confirm")) {
        document.querySelector(".bag__confirm").addEventListener("click", this.toConfirmationPage.bind(this));
      }
    } 
  }

  renderHtml(data) {
    if (!data) {
      return
    }

    let fragment = new DocumentFragment();

    let main = document.createElement('main');
    main.classList.add('main');

    let booksWrapper = document.createElement("div");
    booksWrapper.classList.add("books");

    let ul = document.createElement('ul');
    ul.classList.add("book__list");
    ul.setAttribute("id", "books");

    let bagWrapper = document.createElement("div");
    bagWrapper.classList.add("bag");

    for (let {author, imageLink, price, title} of data) {
      let li = document.createElement("li");
      li.classList.add("book__item");
      li.setAttribute("draggable", "true");

      let figure = document.createElement("figure");
      figure.classList.add("book__art");

      let bookFront = document.createElement("ul");
      bookFront.classList.add("book__front");

      let bookImgPage = document.createElement("li");
      bookImgPage.classList.add("book__page-with-image");

      let bookImg = document.createElement("img");
      bookImg.classList.add("book__image");
      bookImg.setAttribute("src", imageLink);
      bookImg.setAttribute("alt", title);
      bookImg.setAttribute("width", "100%");
      bookImg.setAttribute("height", "100%");

      bookImgPage.append(bookImg);

      let bookImgEmptyPage = document.createElement("li");
      bookImgEmptyPage.classList.add("book__empty-page");

      bookFront.append(bookImgPage);
      bookFront.append(bookImgEmptyPage);
      figure.append(bookFront);

      let bookPages = document.createElement("ul");
      bookPages.classList.add("book__pages");

      let bookPagesEmptyPageOne = document.createElement("li");
      bookPagesEmptyPageOne.classList.add("book__empty-page");

      bookPages.append(bookPagesEmptyPageOne);

      let bookPageWithLinks = document.createElement("li");
      bookPageWithLinks.classList.add("book__empty-page");

      let addToBag = document.createElement("a");
      addToBag.classList.add("book__add-to-bag");
      addToBag.setAttribute("href", "#");
      addToBag.textContent = "Add to bag";
      addToBag.setAttribute("draggable", "false");

      let showMore = document.createElement("a");
      showMore.classList.add("book__show-more");
      showMore.setAttribute("href", "#");
      showMore.textContent = "Show more";
      showMore.setAttribute("draggable", "false");

      bookPageWithLinks.append(addToBag);
      bookPageWithLinks.append(showMore);

      bookPages.append(bookPageWithLinks);

      for (let i = 0; i < 3; i++) {
        let emptyPage = document.createElement("li");
        emptyPage.classList.add("book__empty-page");
        bookPages.append(emptyPage);
      }

      figure.append(bookPages);

      let bookBack = document.createElement("ul");
      bookBack.classList.add("book__back");

      for (let i = 0; i < 2; i++) {
        let emptyPage = document.createElement("li");
        emptyPage.classList.add("book__empty-page");
        bookBack.append(emptyPage);
      }

      figure.append(bookBack);

      let bookSpine = document.createElement("ul");
      bookSpine.classList.add("book__spine");

      for (let i = 0; i < 2; i++) {
        let emptyPage = document.createElement("li");
        emptyPage.classList.add("book__empty-page");
        bookSpine.append(emptyPage);
      }

      figure.append(bookSpine);
      li.append(figure);

      let bookInfo = document.createElement("div");
      bookInfo.classList.add("book__info");

      let bookTitle = document.createElement("h2");
      bookTitle.classList.add("book__title");
      bookTitle.textContent = title;

      bookInfo.append(bookTitle);

      let bookAuthor = document.createElement("span");
      bookAuthor.classList.add("book__author");
      bookAuthor.textContent = author;

      bookInfo.append(bookAuthor);

      let bookPrice = document.createElement("span");
      bookPrice.classList.add("book__price");
      bookPrice.textContent = `${price} €`;

      bookInfo.append(bookPrice);

      li.append(bookInfo);
      ul.append(li);
    }

    booksWrapper.append(ul);

    main.append(booksWrapper);
    main.append(bagWrapper);

    fragment.append(main);
    document.body.prepend(fragment);
  }

  async showModal(e) {
    if (e) {
      e.preventDefault();
    }
    
    let bookName = e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".book__title").innerText;

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

  renderBag() {
    this.clearBag();

    let bagElement = document.querySelector(".bag");

    let fragment = new DocumentFragment();

    let ul = document.createElement("ul");
    ul.classList.add("bag__list");

    this.bag.forEach(el => {
      let {author, imageLink, title} = el;

      let li = document.createElement("li");
      li.classList.add("book-in-bag__wrapper");

      let bookInBagWrapper = document.createElement("div");
      bookInBagWrapper.classList.add("book-in-bag");

      let bookInBagBack = document.createElement("div");
      bookInBagBack.classList.add("book-in-bag__back");

      bookInBagBack.setAttribute("style", `background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.25) 25%, rgba(0, 0, 0, 0.15) 50%, rgba(255, 255, 255, 0) 100%), url("${imageLink}");`)

      bookInBagWrapper.append(bookInBagBack);

      let bookInBackFrontWrapper = document.createElement("div");

      bookInBackFrontWrapper.classList.add("book-in-bag__front");

      bookInBackFrontWrapper.setAttribute("style", `background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.25) 25%, rgba(0, 0, 0, 0.15) 50%, rgba(255, 255, 255, 0) 100%), url("${imageLink}");`)

      let bookInBackFrontTrim = document.createElement("div");
      bookInBackFrontTrim.classList.add("book-in-bag__front_trim");

      let bookInBagFrontImg = document.createElement("img");
      bookInBagFrontImg.classList.add("book-in-bag__img");
      bookInBagFrontImg.setAttribute("src", imageLink);
      bookInBagFrontImg.setAttribute("alt", title);

      bookInBackFrontTrim.append(bookInBagFrontImg);

      bookInBackFrontWrapper.append(bookInBackFrontTrim);

      bookInBagWrapper.append(bookInBackFrontWrapper);

      let contentWrapper = document.createElement("div");
      contentWrapper.classList.add("bag__content-wrapper");
  
      let titleParagraph = document.createElement("p");
      titleParagraph.classList.add("bag__title");
      titleParagraph.innerHTML = title;
      contentWrapper.append(titleParagraph);
  
      let authorParagraph = document.createElement("p");
      authorParagraph.classList.add("bag__author");
      authorParagraph.textContent = author;
      
      let removeBookBtn = document.createElement("div");
      removeBookBtn.classList.add("bag__remove");
      li.append(removeBookBtn);
      
      contentWrapper.append(authorParagraph);
      li.append(bookInBagWrapper)
      li.append(contentWrapper);
      ul.append(li);
    })

    fragment.append(ul);

    if (this.bag.length > 0) {
      let totalPriceElement = document.createElement("p");
      totalPriceElement.classList.add("bag__total");
      totalPriceElement.innerText = `Total price: ${this.calculateTotal()} €`;
      
      bagElement.append(fragment);
      bagElement.append(totalPriceElement);
      
      if (!document.querySelector(".bag__confirm")) {
        let confirmOrderElement = document.createElement("button");
        confirmOrderElement.classList.add("bag__confirm");
        confirmOrderElement.innerText = "Confirm order";
        bagElement.append(confirmOrderElement);
      }
  
      this.addListeners(false);
    }
    

    let priceEl = document.querySelector(".bag__total") || undefined;
    
    if (priceEl && this.bag.length === 0) {
      priceEl.remove();
    }

    let confirmOrderEl = document.querySelector(".bag__confirm") || undefined;
    
    if (confirmOrderEl && this.bag.length === 0) {
      confirmOrderEl.remove();
    }
  }

  dragStart(e) {
    e.stopPropagation();
    let title = e.target.querySelector(".book__title").innerText;
    this.dragBookTitle = title;
  }

  dragOver(e) {
    e.preventDefault();
    document.querySelector(".bag").style = "background: aliceblue";
  }

  drop(e) {
    e.preventDefault();
    this.addToBag(e);
    this.dragBookTitle = "";
    document.querySelector(".bag").style = "background: initial";
  }

  async addToBag(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      
      let bookToAddTitle = this.dragBookTitle || e.target.parentNode.parentNode.parentNode.parentNode.querySelector(".book__title").innerText;
      
      let addedBook = Array.from(await this.fetchBooks()).filter(el => el.title === bookToAddTitle)[0];
      
      let isBookInBag = this.bag.some(item => {
        return addedBook.title === item.title
      });

      if (!isBookInBag) {
        this.bag.push(addedBook);
      } else {
        let alertElement = document.createElement("p");
        alertElement.classList.add("book-is-in-bag");
        alertElement.textContent = "This book is already in bag!"
        document.body.append(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 1000);
      }

      this.renderBag();
    }
  }

  removeBookFromBag(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    } 
    
    let bookName = e.target.parentNode.querySelector(".bag__title").innerHTML;
    
    let removingBookIndex = this.bag.findIndex(el => el.title === bookName);
    
    if (removingBookIndex === -1) {
      return
    }

    this.bag.splice(removingBookIndex, 1);

    this.renderBag();
  }

  clearBag() {
    let element = document.querySelector(".bag");

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  calculateTotal() {
    let total = this.bag.reduce((acc,curr) => acc + curr.price, 0);
    this.total = total;

    return total
  }

  toConfirmationPage() {
    document.querySelector("main").remove();
    document.querySelector(".order").classList.add("visible");
  }

  validateForm(e) {
    e.preventDefault();
    
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    let onlyLettersRgx = /^[A-Za-z]+$/;
    let lettersAndNumbersRgx = /^[0-9a-zA-Z]+$/;
    let positiveNumberRgx = /^[1-9]+[0-9]*$/;
    let positiveNumberAndDashRgx = /^[-1-9–]+[-0-9–]*$/;

    function textAndNumberValidation(e, fieldName, fieldValue, textLength, regexp) {
      if (regexp.test(fieldValue) && fieldValue.length >= textLength) {
        e.target.className = "valid";
        e.target.nextElementSibling.textContent = "";
        return true;
      } else {
          e.target.className = "invalid";
          if (fieldValue.length < textLength) {
            e.target.nextElementSibling.textContent = `Too short for ${fieldName}`;
          }

          if (!regexp.test(fieldValue)) {
            e.target.nextElementSibling.textContent = `You can't use such symbols in ${fieldName} field`;
          }

          if (!regexp.test(fieldValue) && fieldValue.length < textLength) {
            e.target.nextElementSibling.textContent = `You can't use such symbols in ${fieldName} field, too short for ${fieldName}`;
          }

          if (fieldValue.length === 0) {
            e.target.className = "invalid";
            e.target.nextElementSibling.textContent = "The field can't be empty";
          }
          return false
      }
    }

    function dateValidation(e, fieldValue) {
      let today = new Date();
      let inputDate = new Date(fieldValue);

      if (fieldValue.length === 0){
        e.target.className = "invalid";
        e.target.nextElementSibling.textContent= "Data field can't be empty";
        return false;
      } 

      if (inputDate <= today) {
        e.target.className = "invalid";
        e.target.nextElementSibling.textContent= "Shipping is available from tomorrow date";
        return false;
      } 
      
      e.target.className = "valid";
      e.target.nextElementSibling.textContent= "";
      return true;
    }

    function paymentValidation(e) {
      e.target.parentNode.parentNode.classList.remove("invalid");
      if (e.target.value.length === 0) {
        e.target.parentNode.parentNode.lastElementChild.innerText = "Please, choose a value";
        
        !Array.from(e.target.parentNode.parentNode.classList).includes("invalid") ? e.target.parentElement.parentElement.className += " invalid" : null;
      }
      
      return e.target.value.length > 0 ? true : false
    }

    function presentValidation (e) {
      let elements = Array.from(e.target.parentElement.querySelectorAll('.checkbox-field-wrapper > input'));
      let checkedElementsQuantity = elements.reduce((acc,curr) => acc + curr.checked,0);
      let moreThanTwoSelected = checkedElementsQuantity > 2;

      if (moreThanTwoSelected) {
        e.target.parentElement.getElementsByTagName("span")[0].textContent = "You can't select more than 2 gifts"
      } else {
        e.target.parentElement.getElementsByTagName("span")[0].textContent = ""
      }

      return !moreThanTwoSelected
    }

    let validation = {
      name: (e) => textAndNumberValidation(e, fieldName, fieldValue, 4, onlyLettersRgx),
      surname: (e) => textAndNumberValidation(e, fieldName, fieldValue, 5, onlyLettersRgx),
      date: (e) => dateValidation(e, fieldValue),
      street: (e) => textAndNumberValidation(e, fieldName, fieldValue, 5, lettersAndNumbersRgx), 
      house: (e) => textAndNumberValidation(e, fieldName, fieldValue, 1, positiveNumberRgx),
      flat: (e) => textAndNumberValidation(e, fieldName, fieldValue, 1, positiveNumberAndDashRgx),
      paymenttype: (e) => paymentValidation(e),
      present: (e) => presentValidation(e),
    }

    function checkIsFormValid() {
      validation[fieldName](e) ? this.validFormElements.push(fieldName) : null;

      this.validFormElements = Array.from(new Set(this.validFormElements));

      !validation[fieldName](e) && this.validFormElements.includes(fieldName) ? this.validFormElements.splice(this.validFormElements.indexOf(fieldName), 1) : null;

      if (this.validFormElements.length === Object.keys(validation).length) {
        this.isFormValid = true;
        document.querySelector(".order__complete").classList.remove("disabled");
      } else {
        this.isFormValid = false;
        document.querySelector(".order__complete").classList.add("disabled");
      }
    }

    validation[fieldName](e);
    
    checkIsFormValid.bind(this)();
  }

  submitForm(e) {
    e.preventDefault();

    if (!this.isFormValid) {
      return
    }
    let formData = new FormData(document.forms[0]);

    formData.forEach((value, key) => {
      if (key === "present") {
        !this.orderInfo.hasOwnProperty("present") ?  this.orderInfo[key] = [value] : this.orderInfo[key].push(value);
      } else {
        this.orderInfo[key] = value;
      }
    });
    document.querySelector(".order").remove();

    function renderThanksForOrderPage() {
      let fragment = new DocumentFragment();

      let main = document.createElement('main');
      main.classList.add('thanks');

      let thanksTitle = document.createElement("h1");
      thanksTitle.classList.add("thanks__title");
      thanksTitle.innerText = "Thank you for your order, it's been created! Here you can see order information:"

      let thanksWrapper = document.createElement("ul");
      thanksWrapper.classList.add("thanks__list");

      for (let key in this.orderInfo) {
        let li = document.createElement("li");
        li.classList.add("thanks__item");

        let nameOfKey = document.createElement("p");
        nameOfKey.classList.add("thanks__key-name");
        nameOfKey.innerText = decodeText(key);

        let valueOfKey = document.createElement("p");
        valueOfKey.classList.add("thanks__value");
        valueOfKey.innerText = this.orderInfo[key];

        li.append(nameOfKey);
        li.append(valueOfKey);
        thanksWrapper.append(li);
      }

      main.append(thanksTitle);
      main.append(thanksWrapper);

      fragment.append(main);
      document.querySelector("body").prepend(fragment);

      function decodeText(key) {
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

    renderThanksForOrderPage.bind(this)()
  }
}



let bookStore = new BookStore("./assets/JSON/books.json");
bookStore.init();