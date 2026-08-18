const readStatuses = ["Read", "Reading", "Not read"];
const addBookButton = document.getElementById("addBookButton");
const deleteAllButton = document.getElementById("deleteAllButton");
const table = document.querySelector("table");
let myLibrary = [];
let expanded = false;

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
  if (this.readStatus === readStatuses[0]) {
    this.readStatus = readStatuses[1];
  } else if (this.readStatus === readStatuses[1]) {
    this.readStatus = readStatuses[2];
  } else if (this.readStatus === readStatuses[2]) {
    this.readStatus = readStatuses[0];
  }
  return this.readStatus;
}

function createBook(title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
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
      case 0: {
        const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].title);
        cell.appendChild(textValue);
        break;
      }
      case 1: {
        const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].author);
        cell.appendChild(textValue);
        break;
      }
      case 2: {
        const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].pages);
        cell.appendChild(textValue);
        break;
      }
      case 3: {
        const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].readStatus);
        const statusButton = document.createElement("button");
        statusButton.classList.add("statusButton");
        statusButton.appendChild(textValue);
        cell.appendChild(statusButton);
        break;
      }
      case 4: {
        const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].id);
        cell.appendChild(textValue);
        break;
      }
      case 5: {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        const textValue = document.createTextNode("DELETE");
        deleteButton.appendChild(textValue);
        cell.appendChild(deleteButton);
        break;
      }
    }
  }
}

function submit() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.querySelector("input[name=readStatus]:checked").value;
  createBook(title, author, pages, readStatus);
  document.getElementById("bookForm").reset();
}

function expandBookFormPanel() {
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
}

function deleteAllBooksFromArray() {
  const rows = document.querySelectorAll("tr");
  for (let i = rows.length - 1; i > 0; i--) {
    myLibrary.pop(i);
  }
}

function deleteAllBooksFromTable() {
  const rows = document.querySelectorAll("tr");
  for (let i = rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function deleteBookFromArray(e) {
  const bookId = e.target.parentNode.parentNode.lastChild.previousSibling.textContent;
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
}

function deleteBookFromTable(e) {
  e.target.parentNode.parentNode.remove();
}

addBookButton.addEventListener("click", (e) => {
  expandBookFormPanel();
});

deleteAllButton.addEventListener("click", (e) => {
  deleteAllBooksFromArray();
  deleteAllBooksFromTable();
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteButton")) {
    deleteBookFromArray(e);
    deleteBookFromTable(e);
  }
  if (e.target.classList.contains("statusButton")) {
    const bookId = e.target.parentNode.parentNode.lastChild.previousSibling.textContent;
    const obj = myLibrary.find((book) => book.id === bookId);
    e.target.innerHTML = obj.toggleRead();
  }
});
