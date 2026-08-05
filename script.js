const myLibrary = [];
let titleGlobal;
let authorGlobal;

const titleButton = document.getElementById("title");
const authorButton = document.getElementById("author");
const createBookButton = document.getElementById("create");
const showBookButton = document.getElementById("show");
const bookTableBody = document.querySelector("tbody");

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = crypto.randomUUID();
}

function createBook(title, author) {
  const book = new Book(title, author);
  myLibrary.push(book);
  addBookToTable(book);
}

function addBookToTable(book) {
  const row = bookTableBody.insertRow(-1);
  const headerRow = document.getElementById("id-for-column-count");
  const columns = headerRow.querySelectorAll("th");
  for (i = 0; i < columns.length; i++) {
    const cell = row.insertCell(i);
    switch (i) {
      case 0:
        cell.innerHTML = myLibrary.length;
        break;
      case 1:
        cell.innerHTML = myLibrary[myLibrary.length - 1].title;
        break;
      case 2:
        cell.innerHTML = myLibrary[myLibrary.length - 1].author;
        break;
      case 3:
        cell.innerHTML = myLibrary[myLibrary.length - 1].id;
        break;
    }
  }
}

titleButton.addEventListener("click", (e) => {
  titleGlobal = prompt("What is the book title?");
});

authorButton.addEventListener("click", (e) => {
  authorGlobal = prompt("What is the author's name?");
});

createBookButton.addEventListener("click", (e) => {
  createBook(titleGlobal, authorGlobal);
});
