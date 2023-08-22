const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary() {
    myLibrary.forEach((book) => {
        console.log(book);
    })
}

let i = 0;
// populate an entry on table
function populateTable(book) {
    // create a reference to the table
    const table = document.querySelector('.book-table');

    // create a new row
    let tr = document.createElement(`tr`);

    // create entries
    let title = document.createElement('td');
    let author = document.createElement('td');
    let pages = document.createElement('td');
    let haveRead = document.createElement('td');

    // populate entry
    title.appendChild(document.createTextNode(book.title));
    author.appendChild(document.createTextNode(book.author));
    pages.appendChild(document.createTextNode(book.pages));

    if (book.haveRead) {
        haveRead.appendChild(document.createTextNode('Read'));
    } else {
        haveRead.appendChild(document.createTextNode('Not Read'));
    }

    // add to table
    tr.appendChild(title)
    tr.appendChild(author)
    tr.appendChild(pages)
    tr.appendChild(haveRead)

    table.appendChild(tr);
} 

const form = document.querySelector('.book-form');
form.addEventListener('submit', bookSubmit);

function bookSubmit(e) {
    e.preventDefault();

    let title = document.getElementById("book-title");
    let author = document.getElementById('book-author');
    let numPages = document.getElementById('book-pages');
    let haveRead = document.getElementById('have-read');

    const newBook = new Book(title.value, author.value, numPages.value, haveRead.checked);

    populateTable(newBook)
    form.reset();
}


// runners
const exampleBook = new Book('Joe', 'Joe Joe', 1323, true);
populateTable(exampleBook)
populateTable(new Book('Keith', 'Harring', 12312, true));