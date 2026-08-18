let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

const readStatuses = ["Read", "Reading", "Not read"];
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
  const headerRow = document.getElementById("tableHeaderRow");
  const columns = headerRow.querySelectorAll("th");

  for (i = 0; i < columns.length; i++) {
    const cell = row.insertCell(i);
    switch (i) {
      case 0: {
        if (myLibrary.length === 1) {
          const title = "The Odin Project"
          const a = document.createElement("a");
          a.href = "https://www.theodinproject.com";
          a.target = "_blank";
          a.textContent = title;
          cell.appendChild(a);
          break;
        } else {
          const textValue = document.createTextNode(myLibrary[myLibrary.length - 1].title);
          cell.appendChild(textValue);
          break;
        }
      }
      case 1: {
        if (myLibrary.length === 1) {
          const author = "v6lurkoer";
          const a = document.createElement("a");
          a.href = "https://www.github.com/v6lurkoer";
          a.target = "_blank";
          a.textContent = author;
          cell.appendChild(a);
        }
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

let expanded = false;
function resizeBookFormPanel() {
  const form = document.getElementById("formSection");
  if (!expanded) {
    addBookButton.style.width = "50px";
    addBookButton.style.fontSize = "2rem";
    addBookButton.textContent = "CLOSE";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.justifyContent = "center";
    expanded = true;
  } else if (expanded) {
    addBookButton.style.width = "100%";
    addBookButton.style.fontSize = "6rem";
    addBookButton.textContent = "ADD BOOK";
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

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", (e) => {
  resizeBookFormPanel();
});

const deleteAllButton = document.getElementById("deleteAllButton");
deleteAllButton.addEventListener("click", (e) => {
  deleteAllBooksFromArray();
  deleteAllBooksFromTable();
});

const table = document.querySelector("table");
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
