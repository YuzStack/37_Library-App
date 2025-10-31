'use strict';

// DOMM ELEMENTS
const librayEl = document.querySelector('.library-container');
const dialogBox = document.querySelector('.dialog');
const newBookBtn = document.querySelector('.new-book-btn');

const titleInputEl = document.querySelector('#book-title');
const authorInputEl = document.querySelector('#author');
const pagesInputEl = document.querySelector('#pages');
const optionsEl = document.querySelector('#options');

const dialogFormEl = document.querySelector('.dialog-form');
const submitModalBtn = document.querySelector('.submit-modal-btn');

// APP LOGICS
const myLibrary = [];

// Contructor Function ‼️
const Book = function (title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

const addBookToLibrary = function (title, author, pages, isRead = false) {
  const newBook = new Book(title, author, pages, isRead);
  newBook.ID = crypto.randomUUID();
  myLibrary.push(newBook);
  return newBook;
};

const displayBook = function (book) {
  const html = `
      <div class="library-unit-card" data-id="${book.ID}">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p class="isRead-para">
          <span class="read-status-text">${
            book.isRead ? 'Read ✅✅' : 'Not yet read ❌'
          }</span>
          <span class="change-read-status-btn">Change status</span>
        </p>
        <span class="remove-book-btn">&#x2715;</span>
      </div>
    `;
  librayEl.insertAdjacentHTML('afterbegin', html);
};

// Dialog Box / Modal Window ‼️
newBookBtn.addEventListener('click', function () {
  dialogBox.showModal();
});

dialogFormEl.addEventListener('submit', function () {
  const title = titleInputEl.value;
  const author = authorInputEl.value;
  const pages = pagesInputEl.value;
  const isRead = optionsEl.value === 'Yes' ? true : false;

  titleInputEl.value = authorInputEl.value = pagesInputEl.value = '';
  optionsEl.value = 'No';

  const newBook = addBookToLibrary(title, author, pages, isRead);
  displayBook(newBook);

  // Remove book logic ‼️
  const removeBookBtn = document.querySelector('.remove-book-btn');

  removeBookBtn.addEventListener('click', function () {
    const unitCard = this.closest('.library-unit-card');

    // Find the book object index from database
    const bookObjectID = unitCard.dataset.id;
    const bookObjectIndex = myLibrary.findIndex(
      bookObj => bookObj.ID === bookObjectID
    );

    // Remove the book object from the libray database
    myLibrary.splice(bookObjectIndex, 1);

    // Remove the book card fromm UI
    unitCard.remove();
  });

  // Toggle read status logic ‼️
  const togReadStatBtn = document.querySelector('.change-read-status-btn');
  togReadStatBtn.addEventListener('click', function () {
    const unitCard = this.closest('.library-unit-card');

    // Find the book object from database
    const bookObjectID = unitCard.dataset.id;
    const bookObject = myLibrary.find(bookObj => bookObj.ID === bookObjectID);

    // Toggle object's read status in database
    bookObject.toggleRead();

    // Toggle object's read status in UI
    const readStatusEl = unitCard.querySelector('.read-status-text');
    readStatusEl.textContent =
      readStatusEl.textContent === 'Read ✅✅'
        ? 'Not yet read ❌'
        : 'Read ✅✅';
  });
});
