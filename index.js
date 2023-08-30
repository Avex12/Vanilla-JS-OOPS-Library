const book_name = document.querySelector("#book_name");
const book_author = document.querySelector("#book_author");
const book_type = document.querySelector("#book_type");
const library_form = document.querySelector("#library_form");
const tableBody = document.querySelector("#table_body");
const alert_box = document.querySelector("#alert_box");
let display = new Display();

// Event Listener
library_form.addEventListener("submit", function (event) {
  event.preventDefault();
  let name = book_name.value;
  let author = book_author.value;
  let type = book_type.value;

  // Validation
  if (!display.validate(name, author, type)) {
    display.alert(false);
    return;
  }
  // New book creation
  let book = new Book(name, author, type);
  const previousBooks = JSON.parse(localStorage.getItem("books"));
  if (previousBooks !== null) {
    localStorage.setItem("books", JSON.stringify([...previousBooks, book]));
  } else {
    localStorage.setItem("books", JSON.stringify([book]));
  }
  display.displayData();
  display.alert(true);
  display.clear();
});

// Book constructor
function Book(bookName, bookAuthor, bookType) {
  this.bookName = bookName;
  this.bookAuthor = bookAuthor;
  this.bookType = bookType;
}

// Display Constructor
function Display() {}

// Methods in display prototype
Display.prototype.validate = function (name, author, type) {
  if (name.length < 3 || author.length < 3 || type.length < 3) {
    return false;
  }
  return true;
};

Display.prototype.clear = function () {
  library_form.reset();
};

Display.prototype.remove = function (bookIndex) {
  const books = JSON.parse(localStorage.getItem("books"));
  books.splice(bookIndex, 1);
  localStorage.setItem("books", JSON.stringify(books));
  tableBody.innerHTML = "";
  this.displayData();
};

Display.prototype.alert = function (validation) {
  alert_box.innerHTML = `<div class="alert alert-${
    validation ? "success" : "danger"
  } alert-dismissible fade show text-center" role="alert">
 ${validation ? "Book Added Successfully" : "Fill the form correctly."}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

  // Clearing the alert after 2 secs
  setTimeout(() => {
    alert_box.innerHTML = "";
  }, 2000);
};

Display.prototype.displayData = function () {
  tableBody.innerHTML = "";
  const books = JSON.parse(localStorage.getItem("books"));
  if (books !== null) {
    books.forEach((book, index) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<th scope="row">${index + 1}</th>
      <td>${book.bookName}</td>
      <td>${book.bookAuthor}</td>
      <td>${book.bookType}</td>
      <td><button onclick="display.remove('${index}')" class="btn btn-danger">Delete</button></td>`;

      tableBody.appendChild(tableRow);
    });
  }
};

display.displayData();
