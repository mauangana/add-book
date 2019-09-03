// book constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

// UI Constructor
class UI {
    constructor() { }
    //add book to list
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a><td>
    `;
        list.appendChild(row);
    }
    // show alert
    showAlert(message, className) {
        // create div
        const div = document.createElement('div');
        // create classname
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#book-form');
        // insert alert
        container.insertBefore(div, form);
        // timeout after 3 second
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    // delte book
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}



// event listeners

document.getElementById('book-form').addEventListener('submit', function(e){
    // get form values

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

          // instantiate 
          const book = new Book(title, author, isbn);

          // instantiate
          const ui = new UI;

          if (title === ''||author === '' || isbn === ''){
                ui.showAlert('Please fill in all fields', 'error');
          } else {
              
            
            ui.addBookToList(book); // add book 
            //show success alert
            ui.showAlert('Book Added!', 'success');
          
 

          //clear fields
          ui.clearFields();
        }
          e.preventDefault();

});

// event listener for delete 
document.getElementById('book-list').addEventListener('click', function(e){
    // instantiate
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

});