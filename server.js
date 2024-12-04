const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const books = require('./data/books');
const app = express();
const path = require('path');

// ************
//  MIDDLEWARE
// *************

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); 


// ROUTES (I.N.D.U.C.E.S) Follow this method when making routes!!

// INDEX (Root Route)
app.get('/', (req, res) => {
    res.render('home');
});

// INDEX
app.get('/books', (req, res) => {
    res.render('books', {title: 'Book List', books});
});


// NEW
app.get('/books/new', (req, res) => {
    //res.json({message: 'Form with an empty form to submit the new book'});
    res.render('books/new', { title: 'New Book' })
});


// CREATE
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title || 'New Book',
        author: req.body.author || 'Cesar Preza',
    }

    books.push(newBook);
    console.log(books);
    res.status(201).redirect('/books');
})

// SHOW
app.get('/books/:id', (req, res) => {
        //NEVER use loops inside API
        // When passing a variable into a URL, Must convert the string variable into a number.
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (book) {
        res.render('books/show', {title: 'Book Details', book})
    } else {
        res.status(404).render('404/notFound', {title: 'Book not found'});
    }
});

// EDIT 
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = {...books[bookIndex], ...req.body};
        //res.json({message: 'Book updated successfuflly', book: books[bookIndex]});
    } else {
        res.status(404).json({message: 'Book not found'});
    }
})


// DELETE 




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})