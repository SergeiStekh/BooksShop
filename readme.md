# BookShop - interactive book store


[Deploy link](https://sergeycodejs.github.io/BooksShop/).

[Link to Github repository](https://github.com/SergeyCodeJs/BooksShop).

## What it is:
The online shop to buy books with delivery to user's home. The user able to look through the books' catalog, see the description of a particular book, add a book to the bag, choose the appropriate date and address to deliver.

## Installation:
An application does not require installation, pure JS.

## Technology:
```HTML5```, ```CSS3```, ```JavaScript ES6```

## Technical features:
1. The provided layout is designed cross-browser. Browser requirements met: ```Internet Explorer 11```, ```edge``` and ```Chrome```, ```Opera```, ```Yandex Browser```, ```Firefox``` latest versions.
1. ```JS``` code divided into modules;
1. OOP approach;
1. Validity checked using [https://validator.w3.org/](https://validator.w3.org/), Document checking completed. No errors or warnings.

## Implementation nuances

1. The component approach is applied, the code is divided into modules, which are contained in the ```/js``` folder.
1. First we fetch data. Then data is passed to the required components.
1. The content of catalog page created thru the JavaScript.
1. Added action to page: 
- add book to the bag by click on appropriate button or by drag the image of book to the bag (drag and drop);
- show popup with book description by click on Show more button;
- close popup by click on Close or cross button
remove book from the bag by the cross button;
- When user click on Confirm order he appears in the Order form page.
- The Complete button is disabled until the user full form with valid information.
- validation of form fields after user left the field,
summarize the personal information after user clicks on Complete button.

