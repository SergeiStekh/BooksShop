import ThankForOrder from "../thankForOrder/thankForOrder.js"

class AppValidation {
  constructor(formElement, validationRules) {
    this.formElement = formElement;
    this.validationRules = validationRules;
    this.orderInfo = {};

    this.validatedFormFields = Object.keys(validationRules).reduce((acc,curr) => {
        return {
          ...acc,
          [curr]: curr === "present" ? true : false
        }
    }, {});

    this.isAllFieldsValidated = false;
    this.formElement.addEventListener('focusout', (e) => this.validateForm(e));
    this.formElement.addEventListener('submit', (e) => this.submitForm(e));
  } 

  validateForm(e) {
    e.preventDefault();
    const target = e.target;
    const targetName = e.target.name;
    const targetValue = e.target.value;
    
    this.validateField(target, targetName, targetValue, this.validationRules[targetName]);
  }

  validateField(element, elementName, inputValue, validationRules) {
    if (!element || !elementName || !inputValue || !validationRules) {
      return
    }

    let regExpValidated = true;
    let lengthValidated = true;

    if (Object.keys(validationRules).includes("minLength")) {
      const errorElement = element.nextElementSibling;
      lengthValidated = inputValue.length >= validationRules.minLength;
      regExpValidated = validationRules.regExp.test(inputValue);
      lengthValidated && regExpValidated ? errorElement.innerText = "" : errorElement.innerText = validationRules.dataAllowed;
      lengthValidated && regExpValidated ? this.validatedFormFields[elementName] = true : this.validatedFormFields[elementName] = false;
    }

    if (!Object.keys(validationRules).includes("minLength") && Object.keys(validationRules).includes("regExp")) {
      const errorElement = element.nextElementSibling;
      regExpValidated = validationRules.regExp.test(inputValue);
      regExpValidated ? errorElement.innerText = "" : errorElement.innerText = validationRules.dataAllowed;
      regExpValidated ? this.validatedFormFields[elementName] = true : this.validatedFormFields[elementName] = false;
    }
    
    if (elementName === "date") {
      let today = new Date();
      let inputDate = new Date(inputValue);
      let errorElement = element.nextElementSibling;

      if (inputValue.length === 0 || inputDate <= today) {
        this.validatedFormFields[elementName] = false;
        errorElement.innerText = validationRules.dataAllowed;
      } else {
        this.validatedFormFields[elementName] = true;
        errorElement.innerText = "";
      }
    }

    if (elementName === "paymenttype") {
      const errorElement = element.closest("DIV").closest("FIELDSET").querySelector('.error');
      
      if (inputValue.length === 0) {
        this.validatedFormFields[elementName] = false;
        errorElement.innerText = validationRules.dataAllowed;
      } else {
        this.validatedFormFields[elementName] = true;
        errorElement.innerText = "";
      }
    }

    if (elementName === "present") {
      const presentInputs = Array.from(element.closest("FIELDSET").querySelectorAll("input"));
      const errorElement = element.closest("FIELDSET").querySelector(".error");
      const presentsQuantity = presentInputs.reduce((acc, curr) => acc + curr.checked, 0);
      
      if (presentsQuantity <= 2) {
        this.validatedFormFields[elementName] = true;
        errorElement.innerText = "";
      } else {
        this.validatedFormFields[elementName] = false;
        errorElement.innerText = validationRules.dataAllowed;
      }
    }

    this.toggleClasses(element, elementName);
    this.checkIsAllFieldsValidated();
  }

  checkIsAllFieldsValidated() {
    const completeButton = document.querySelector(".order__complete");
    if (Object.keys(this.validatedFormFields).every(el => this.validatedFormFields[el] === true)) {
      this.isAllFieldsValidated = true;
      completeButton.classList.remove("disabled");
    } else {
      this.isAllFieldsValidated = false;
      completeButton.classList.add("disabled");
    }
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isAllFieldsValidated) {
      return
    }

    let formData = new FormData(this.formElement);

    formData.forEach((value, key) => {
      if (key === "present") {
        !this.orderInfo.hasOwnProperty("present") ?  this.orderInfo[key] = [value] : this.orderInfo[key].push(value);
      } else {
        this.orderInfo[key] = value;
      }
    });
    document.querySelector(".order").remove();
    new ThankForOrder(document.body, "prepend", "main", "thanks", "", "Thank you for your order! Here are the shipping details.", this.orderInfo);
  }

  toggleClasses(element, elementName) {
    if (this.validatedFormFields[elementName]) {
      element.classList.remove("invalid");
      element.classList.add("valid");
    } else {
      element.classList.remove("valid");
      element.classList.add("invalid");
    }
  }
}

export default AppValidation