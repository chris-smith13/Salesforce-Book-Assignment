import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOK_OBJECT from '@salesforce/schema/Book__c'
import TITLE_FIELD from '@salesforce/schema/Book__c.Name'
import AUTHOR_FIELD from '@salesforce/schema/Book__c.Author__c'
import YEAR_FIELD from '@salesforce/schema/Book__c.Year__c'
import PUBLISHER_FIELD from '@salesforce/schema/Book__c.Publisher__c'
import COST_FIELD from '@salesforce/schema/Book__c.Cost__c'
import createBooks from '@salesforce/apex/CreateBook.createRecord';
import getBooks from '@salesforce/apex/BookController.getBookList';
import deleteBooks from '@salesforce/apex/BookController.deleteBooks';
import deleteAllBooks from '@salesforce/apex/BookController.deleteAllBooks';


export default class BookAssignment extends LightningElement {
    @api recordId
    @api objectApiName
    @api name;
    @api setAuthor;
    @api setPublisher;
    @api setYear;
    @api setCost;
    @api deletedTitle;
    objectName = BOOK_OBJECT
    fieldList = [TITLE_FIELD, AUTHOR_FIELD, YEAR_FIELD, PUBLISHER_FIELD, COST_FIELD]

    successHandler(event){
        console.log(event.detail.id)
        const toastEvent = new ShowToastEvent({
            title:"Book successfully created",
            message:"Record ID: " + event.detail.id,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
    bookList;
    books;
    author;
    deletedBook;
    empty;
    

    successfulDelete(title){
        //console.log(event.detail.id)
        const toastEvent = new ShowToastEvent({
            title:"Book successfully deleted",
            message:"Deleted Book with title " + title,
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
    failedDelete(title){
        //console.log(event.detail.id)
        const toastEvent = new ShowToastEvent({
            title:"Book was not found",
            message:"Could not find Book with title " + title + ". Please enter a valid title",
            variant:"error"
        })
        this.dispatchEvent(toastEvent)
    }
 
    
 
    handleClick(){
        
        getBooks().then(result=>{
            for(let i = 0;i<result.length;i++) {
                this.author = JSON.stringify(result[i].Name)
                // console.log(result)
                console.log(this.author)
            }
            this.bookList = result;
            console.log(this.bookList)
        }).catch(error=>{
            console.error(error)
        })
    }
    createBook(event){
        createBooks({setName: this.name,setAuthor: this.setAuthor, setPublisher: this.setPublisher, setYear: this.setYear, setCost: this.setCost}).then(result=>{
            this.books = JSON.stringify(result);
            console.log(this.books)
            this.successHandler(event);
        }).catch(error=>{
            console.log(error)
        })
    }
    handleChange(event){
        if(event.target.name==='name'){
            //console.log('new books name is ' + event.target.value)
            this.name = event.target.value;
        }
        if(event.target.name==='setAuthor'){
            //console.log('new author name is ' +event.target.value)
            this.setAuthor = event.target.value;
        }
        if(event.target.name==='setYear'){
            //console.log('new year is ' +event.target.value)
            this.setYear = event.target.value;
        }
        if(event.target.name==='setPublisher'){
            //console.log('new publisher is ' +event.target.value)
            this.setPublisher = event.target.value;
        }
        if(event.target.name==='setCost'){
            //console.log('new cost is ' +event.target.value)
            this.setCost = event.target.value;
        }
        if(event.target.name==='deletedTitle'){
            //console.log('deleted title is ' +event.target.value)
            this.deletedTitle = event.target.value;
        }
    }

    toggleBookList(){
        this.bookList = null;
    }

    deleteBook() {
        deleteBooks({deletedTitle: this.deletedTitle}).then(result=>{
           // this.deletedBook = JSON.stringify(result);
           //this.successfulDelete(event)
           var flag = result;
           console.log(flag);
           if(flag == true) {
              console.log("success")
              this.successfulDelete(this.deletedTitle)
              
           }
           if(flag == false) {
                console.log("failure")
               this.failedDelete(this.deletedTitle)
           }
        }).catch(error=>{
            console.log(error);
        })
       
    }

    deleteAll() {
        deleteAllBooks().then(result=>{
            //this.empty = result
            console.log("Deleted all Books")
        }).catch(error=>{
            console.log(error)
        })
    }
}