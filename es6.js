class Book{
    constructor(title, author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
            const list = document.getElementById('book-list');
            const row = document.createElement('tr');
            row.innerHTML = `
            
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</a></td>
    
            `;
    list.appendChild(row);
    }
    showAlert(message, className){
                const div = document.createElement('div');
                div.className = `alert ${className}`;
                div.appendChild(document.createTextNode(message));
                const card = document.querySelector('.card');
                const form = document.querySelector('#book-form');
                card.insertBefore(div, form);
                setTimeout(() => {
                    document.querySelector('.alert').remove();
                }, 3000);
    }
    deleteBook(target) {
        const ui = new UI();
        (target.className === 'delete')
        ?(target.parentElement.parentElement.remove(),ui.showAlert('Book Removed!', 'success')) 
        : null; 
        }
    
    
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
    // local storage class
    class Store{
        static getBooks(){
            let books;
            (localStorage.getItem('books') === null)
            ? books=[] 
            : books = JSON.parse(localStorage.getItem('books'));
            return books;
        }
        static displayBooks(){
            const books = Store.getBooks();

            // books.forEach(function(book){
            //     const ui = new UI;
            //     ui.addBookToList(book);
            // });

            books.forEach((book) => {
                const ui = new UI;
                ui.addBookToList(book);
            }); 
        }
        static addBook(book){
            const books = Store.getBooks();

            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
        static removeBook(isbn){
            const books = Store.getBooks();
            books.forEach((book,index) => {
                (book.isbn === isbn)? books.splice(index,1) : null;
            });
            localStorage.setItem('books', JSON.stringify(books));
        }
    }

    document.addEventListener('DOMContentLoaded', Store.displayBooks());


    document.getElementById('book-form').addEventListener('submit',(e) => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const book = new Book(title, author, isbn);

        const ui = new UI();
        
        (title === '' || author === '' || isbn === '')
        ?ui.showAlert('please fill in all fields', 'error')
        :(ui.addBookToList(book),
        ui.showAlert('Book Added', 'success'),
        Store.addBook(book),
        ui.clearFields());
        
        e.preventDefault();
        })
        
        document.getElementById('book-list').addEventListener('click',(e) =>{
        const ui = new UI();
        ui.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        e.preventDefault();
        });