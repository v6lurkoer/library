const myLibrary = [];

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
  console.log("now we here");
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
        cell.innerHTML = myLibrary.length;
        break;
      case 1:
        cell.innerHTML = myLibrary[myLibrary.length - 1].title;
        break;
      case 2:
        cell.innerHTML = myLibrary[myLibrary.length - 1].author;
        break;
      case 3:
        cell.innerHTML = myLibrary[myLibrary.length - 1].pages;
        break;
      case 4:
        cell.innerHTML = myLibrary[myLibrary.length - 1].read;
        break;
      case 5:
        cell.innerHTML = myLibrary[myLibrary.length - 1].id;
        break;
      case 6:
        const deleteButton = document.createElement("button");
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

function createDeleteButton() {

}

const btn = document.getElementById("addBookButton");
let expanded = 0;

btn.addEventListener("click", (e) => {
  const body = document.querySelector("body");
  const entry = document.querySelector(".entrySection");
  const form = document.getElementById("formSection");

  if (expanded === 0) {
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.justifyContent = "center";
    expanded = 1;
  } else if (expanded === 1) {
    form.style.display = "none";
    form.style.flexDirection = "";
    form.style.justifyContent = "";
    expanded = 0;
  }
});
