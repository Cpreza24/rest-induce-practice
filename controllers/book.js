//const books = require('../data/books');
const Book = require("../models/books");
const book = require("../models/books");

async function index(req, res) {
    try {
        const books = await book.find({});
        res.render("books", { title: "Book List", books });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    // res.render('books', { title: "Book List", books })
}

function newBook(req, res) {
    res.render("books/new", { title: "New Book" });
}

async function postBook(req, res) {
    try {
        const { title = "new book", author = "New Author" } = req.body;
        const newBook = new Book({
            title: title,
            author: author,
        });
        await newBook.save();
        res.status(201).redirect("/books");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
}

async function showBook(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.render("books/show", { title: "Book Details", book });
        } else {
            res.status(404).render("404/notFound", { title: "Book not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

async function editBook(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.render("books/edit", { title: "Edit Book", book });
        } else {
            res.status(404).render("404/notFound", {
                title: "Book Not Found!",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body);

        if (updatedBook) {
            res.status(200).redirect("/books");
        } else {
            res.status(404).render("Book not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            res.status(200).redirect("/books");
        } else {
            res.status(404).render("404/notFound", { title: "Book Not Found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).render("Internal server error");
    }
}

module.exports = {
    index,
    newBook,
    postBook,
    editBook,
    updateBook,
    showBook,
    deleteBook,
};

// ROUTES (I.N.D.U.C.E.S) Follow this method when making routes!!
// INDEX
// app.get('/books', (req, res) => {
//     res.render('books', {title: 'Book List', books});
// });

// NEW
// app.get('/books/new', (req, res) => {
//     //res.json({message: 'Form with an empty form to submit the new book'});
//     res.render('books/new', { title: 'New Book' })
// });

// CREATE
// app.post('/books', (req, res) => {
//     const newBook = {
//         id: books.length + 1,
//         title: req.body.title || 'New Book',
//         author: req.body.author || 'Cesar Preza',
//     }

//     books.push(newBook);
//     console.log(books);
//     res.status(201).redirect('/books');
// })

// SHOW
// app.get('/books/:id', (req, res) => {
//         //NEVER use loops inside API
//         // When passing a variable into a URL, Must convert the string variable into a number.
//     const book = books.find(book => book.id === parseInt(req.params.id));
//     if (book) {
//         res.render('books/show', {title: 'Book Details', book})
//     } else {
//         res.status(404).render('404/notFound', {title: 'Book not found'});
//     }
// });

// app.get('/books/:id/edit', (req, res) => {
//     const book = books.find(book => book.id === parseInt(req.params.id));
//     if (book) {
//         res.render('books/edit', { title: 'Edit Book', book });
//     } else {
//         res.status(404).render('404/notFound', { title: 'Book Not Found!' })
//     }
// })

// // EDIT
// app.put('/books/:id', (req, res) => {
//     const bookId = parseInt(req.params.id);
//     const bookIndex = books.findIndex(book => book.id === bookId);
//     if (bookIndex !== -1) {
//         books[bookIndex] = {...books[bookIndex], ...req.body};
//         //res.json({message: 'Book updated successfuflly', book: books[bookIndex]});
//         res.status(200).redirect('/books')
//     } else {
//         res.status(404).render('404/notFound', {title: 'Book Not Found'});
//     };
// });

// // DELETE
// app.delete('/books/:id', (req, res) => {
//     const bookId = parseInt(req.params.id);
//     const bookIdx = books.findIndex(book => book.id === bookId);
//     if (bookIdx !== -1) {
//         books.splice(bookIdx, 1);
//     } else {
//         res.status(404).render('404/notFound', { title: 'Book Not Found' });
//     }
//     res.status(200).redirect('/books');
// })
