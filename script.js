document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const addBookForm = document.getElementById("add-book-form");
    const searchBox = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.getElementById("search-results");
    const books = [];

    addBookForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const ISBN = document.getElementById("ISBN").value;

        if (title && author) {
            if (!isDuplicate(title, author, ISBN)) {
                const newBook = { title, author, ISBN };
                books.push(newBook);
                displayBookList(books);
                addBookForm.reset();
            } else {
                alert("This book already exists in the library.");
            }
        }
    });

    searchButton.addEventListener("click", function () {
        const query = searchBox.value.toLowerCase();
        const results = books.filter((book) =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query) || book.ISBN.toLowerCase().includes(query)
        );
        displaySearchResults(results);
    });

    function displayBookList(books) {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${book.title} by ${book.author} ISBN: ${book.ISBN}`;
            bookList.appendChild(listItem);
        });
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = "";
        results.forEach((book, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${book.title} by ${book.author} ISBN: ${book.ISBN}`;
            searchResults.appendChild(listItem);
        });
    }

    function isDuplicate(title, author, ISBN) {
        return books.some(
            (book) => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase() && book.ISBN.toLowerCase() === ISBN.toLowerCase()
        );
    }
});
