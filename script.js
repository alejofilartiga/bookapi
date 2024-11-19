let books = [];

document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('addBookForm');
    const searchBook = document.getElementById('searchBook');

    addBookForm.addEventListener('submit', addBook);
    searchBook.addEventListener('input', filterBooks);

    fetchBooks();
});

async function fetchBooks() {
    try {
        const response = await fetch('https://bookapi-xlqg.onrender.com/todo');
        books = await response.json();
        renderBooks();
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function addBook(e) {
    e.preventDefault();
    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        expirationDate: document.getElementById('expirationDate').value,
        reservedBy: document.getElementById('reservedBy').value,
        available: true
    };
    try {
        const response = await fetch('https://bookapi-xlqg.onrender.com/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });
        const addedBook = await response.json();
        books.push(addedBook);
        renderBooks();
        e.target.reset();
    } catch (error) {
        console.error('Error adding book:', error);
    }
}

function renderBooks(booksToRender = books) {
    const bookTableBody = document.querySelector('#bookTable tbody');
    bookTableBody.innerHTML = '';
    booksToRender.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.expirationDate}</td>
            <td>${book.reservedBy}</td>
            <td>
                <input type="checkbox" ${book.available ? 'checked' : ''} onchange="updateAvailability(${book.id}, this.checked)">
            </td>
            <td class="book-actions">
                <button onclick="editBook(${book.id})">Editar</button>
                <button onclick="deleteBook(${book.id})">Eliminar</button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

async function updateAvailability(id, available) {
    const book = books.find(b => b.id === id);
    if (book) {
        book.available = available;
        try {
            await fetch(`https://bookapi-xlqg.onrender.com/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    }
}

async function editBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        document.getElementById('expirationDate').value = book.expirationDate;
        document.getElementById('reservedBy').value = book.reservedBy;
        // Eliminar el libro existente y dejar que el usuario lo agregue de nuevo con los cambios
        await deleteBook(id);
    }
}

async function deleteBook(id) {
    try {
        await fetch(`https://bookapi-xlqg.onrender.com/todo/${id}`, {
            method: 'DELETE'
        });
        books = books.filter(b => b.id !== id);
        renderBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

function filterBooks() {
    const searchTerm = document.getElementById('searchBook').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}