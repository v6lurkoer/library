const myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = crypto.randomUUID();
}

function getBook() {
  const book = new Book(prompt("What is the book title?"), prompt("What is the book title?"));
  myLibrary.push(book);
}

getBook();

console.log(myLibrary[0]);
