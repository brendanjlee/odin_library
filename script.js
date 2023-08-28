// Global Variables
const table = document.querySelector('.book-table');
const form = document.querySelector('.book-form');

/*  Library Functions   */ 
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

// delete book from library
function deleteBook(book, library) {
    console.log(library)
    for (let i = 0; i < library.length; i++) {
        if (isEqual(book, library[i])) {
            library.splice(i, 1);
            return true;
        }
    }
    return false;
}

// equates two books
function isEqual(book1, book2) {
    return (book1.title === book2.title &&
        book1.author === book2.author &&
        book1.pages == book2.pages);
}

// Find all books by title
function findBookByTitle(bookTitle, library) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === bookTitle) return library[i];
    }
    return null;
}

// Find book by titleAuthor toString
function findBookByString(titleAuthor, library) {
    // replace underscores with space
    let title = titleAuthor.split('-')[0].replace('_', ' ');    
    let author = titleAuthor.split('-')[1].replace('_', ' ');
    for (let i = 0; i < library.length; i++) {
        let currBook = library[i];
        if (currBook.title == title && currBook.author == author) return currBook;
    }
    return null;
}

function convertBookToString(book) {
    let bookString = `${book.title}-${book.author}`;
    // replace whitespace with underscore
    return bookString.split(' ').join('_');
}


/*  Rednering Functions  */
const myLibrary = [
    new Book('JK Rowlilng', 'Harry Potter', 399, true),
    new Book('Dune', 'Frank Herbert', 1000, false),
    new Book('1984', 'George Orwell', 200, true),
];

// Render all books in the library
function render() {
    myLibrary.forEach((book) => {
        renderBook(book);
    })
}

// Clear the Table
function clearTable() {
    while(table.childNodes.length > 2) {
        table.removeChild(table.lastChild);
    }
}

// populate an entry on table
function renderBook(book) {
    // create a new row
    let tr = document.createElement(`tr`);

    // add data class to the row
    tr.setAttribute(`data-book`, `${convertBookToString(book)}`);

    // create entries
    let title = document.createElement('td');
    let author = document.createElement('td');
    let pages = document.createElement('td');
    let readButton = document.createElement('button');
    readButton.classList.add('book-status');
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = "Delete"


    // populate entry
    title.appendChild(document.createTextNode(book.title));
    author.appendChild(document.createTextNode(book.author));
    pages.appendChild(document.createTextNode(book.pages));

    if (book.haveRead) {
        readButton.innerHTML = 'Read';
    } else {
        readButton.innerHTML = 'Not Read';
    }

    // add to table
    tr.appendChild(title)
    tr.appendChild(author)
    tr.appendChild(pages)
    tr.appendChild(readButton);
    tr.appendChild(deleteBtn);
    table.appendChild(tr);

    // event listeners
    readButton.addEventListener('click', changeBookStatus);

    deleteBtn.addEventListener('click', removeBookFromTable);
} 


// adds book to the library and renders the book 
function bookSubmit(e) {
    e.preventDefault();

    let title = document.getElementById("book-title");
    let author = document.getElementById('book-author');
    let numPages = document.getElementById('book-pages');
    let haveRead = document.getElementById('have-read');

    const newBook = new Book(title.value, author.value, numPages.value, haveRead.checked);
    
    myLibrary.push(newBook);
    renderBook(newBook);
    form.reset();
}

function changeBookStatus(e) {
    let bookString = e.currentTarget.parentNode.dataset.book;
    let currBook = findBookByString(bookString, myLibrary);
    for (let i = 0; i < myLibrary.length; i++) {
        if (isEqual(currBook, myLibrary[i])) {
            myLibrary[i].haveRead = !myLibrary[i].haveRead;
        }
    }
    clearTable();
    render();
}

function removeBookFromTable(e) {
    let bookString = e.currentTarget.parentNode.dataset.book;
    deleteBook(findBookByString(bookString, myLibrary), myLibrary);
    clearTable();
    render();
}

// Event Listeners
form.addEventListener('submit', bookSubmit);
render();