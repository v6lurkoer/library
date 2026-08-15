let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  addBookToTable(book);
}

function addBookToTable(book) {
  const tableBody = document.querySelector("tbody");
  const row = tableBody.insertRow(-1);
  const headerRow = document.getElementById("idForColumnCount");
  const columns = headerRow.querySelectorAll("th");

  for (i = 0; i < columns.length; i++) {
    const cell = row.insertCell(i);
    switch (i) {
      case 0:
        cell.innerHTML = myLibrary[myLibrary.length - 1].title;
        break;
      case 1:
        cell.innerHTML = myLibrary[myLibrary.length - 1].author;
        break;
      case 2:
        cell.innerHTML = myLibrary[myLibrary.length - 1].pages;
        break;
      case 3:
        cell.innerHTML = myLibrary[myLibrary.length - 1].read;
        break;
      case 4:
        cell.innerHTML = myLibrary[myLibrary.length - 1].id;
        break;
      case 5:
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = "DELETE";
        cell.appendChild(deleteButton);
        break;
    }
  }
}

function submit() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.querySelector("input[name=read]:checked").value;
  createBook(title, author, pages, read);
  document.getElementById("bookForm").reset();
}

const addBookButton = document.getElementById("addBookButton");
let expanded = false;
addBookButton.addEventListener("click", (e) => {
  const form = document.getElementById("formSection");

  if (!expanded) {
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.justifyContent = "center";
    expanded = true;
  } else if (expanded) {
    form.style.display = "none";
    form.style.flexDirection = "";
    form.style.justifyContent = "";
    expanded = false;
  }
});

const table = document.querySelector("table");
const deleteAllButton = document.getElementById("deleteAllButton");

deleteAllButton.addEventListener("click", (e) => {
  const rows = document.querySelectorAll("tr");
  for (let i = rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
    myLibrary.pop(i);
  }
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteButton")) {
    const bookId = e.target.parentNode.parentNode.lastChild.previousSibling.textContent;

    myLibrary = myLibrary.filter((book) => book.id !== bookId);

    e.target.parentNode.parentNode.remove();
  }
});
