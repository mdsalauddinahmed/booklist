 // Get the UI elements
 

let form = document.querySelector('#book-form');
let booklist  = document.querySelector('#book-list');
 
 function removeBook(){
    booklist.remove(); 
 }
 
// Add eventlistenr

form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
 
// UI class

class UI {
    constructor(){

    }
    addToBookList(book){
       let list = document.querySelector('#book-list');
       let row = document.createElement('tr');
       row.innerHTML=`
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a herf='#' class="delete">X</a></td>`;
       list.appendChild(row);
    }
    clearfields(){
     document.querySelector('#title').value='';
     document.querySelector('#author').value= '';
    document.querySelector('#isbn').value='';

    }
    showAlert(message,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div,form); 

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }

  static deleteFormBook(target){
    if (target.hasAttribute('herf')){
        target.parentElement.parentElement.remove();
        UI.showAlert('Book Removed!', 'success');
    }
 }
        
  
}
//local storage Class
class Store {
    static getbooks(){
        let books;
        if(localStorage.getItem('books')=== null)  {
            books=[];

        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getbooks();
        books.forEach(book =>{
            UI.addToBookList(book);
        });
    }
     
}
 

 // Book Class
 class Book{
    constructor(title,author, isbn){
        this.title=title;
        this.author=author;
        this.isbn = isbn;
         

    }
 }

 //Define functions

 function newBook(e){
     let title = document.querySelector('#title').value,
      author = document.querySelector('#author').value,
     isbn = document.querySelector('#isbn').value;
     let ui = new UI();

     if(title === ''|| author===''|| isbn===''){
         ui.showAlert("please fill all the Fields!","error");
    }else{
        let book = new Book (title,author,isbn);
        ui.addToBookList(book);
        ui.clearfields();
        ui.showAlert("Book added!","success");
         Store.addBook(book); 
    }

      
      
     e.preventDefault();
 }