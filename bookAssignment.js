import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOK_OBJECT from '@salesforce/schema/Book__c'
import TITLE_FIELD from '@salesforce/schema/Book__c.Name'
import AUTHOR_FIELD from '@salesforce/schema/Book__c.Author__c'
import YEAR_FIELD from '@salesforce/schema/Book__c.Year__c'
import PUBLISHER_FIELD from '@salesforce/schema/Book__c.Publisher__c'
import COST_FIELD from '@salesforce/schema/Book__c.Cost__c'

export default class BookAssignment extends LightningElement {
    @api recordId
    @api objectApiName
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
}