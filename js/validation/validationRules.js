const validationRules = {
  name: {
    dataAllowed: "the length not less than 4 symbols, strings only",
    regExp: /^[A-Za-z]+$/,
    minLength: 4,
  },
  surname: {
    dataAllowed: "the length not less than 5 symbols, strings only",
    regExp: /^[A-Za-z]+$/,
    minLength: 5
  },
  date: {
    dataAllowed: "not earlier than next day",
  }, 
  street: {
    dataAllowed: "the length not less than 5 symbols, the numbers are allowed",
    regExp: /^[0-9a-zA-Z]+$/,
    minLength: 5
  },
  house: {
    dataAllowed: "positive numbers only",
    regExp: /^[1-9]+[0-9]*$/
  },
  flat: {
    dataAllowed: "positive numbers only, the dash symbol is allowed",
    regExp: /^[1-9–]+[-0-9–]*$/
  },
  paymenttype: {
    dataAllowed: "You to choose payment type"
  },
  present: {
    dataAllowed: "Now more than 2 presents allowed",
    maxValue: 2
  }
}

export default validationRules