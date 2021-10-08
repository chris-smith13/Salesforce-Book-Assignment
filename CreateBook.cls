public with sharing class CreateBook {
    @InvocableMethod(label='Create Books' description='Creates a new book object')
    public static List<Book__c> createBook(List<String> name) {
        //Book__c books = new Book__c();
        List<Book__c> book = new List<Book__c>();
        Name = name;
        // Author = author;
        // Year = year;
        // Publisher = publisher;
        // Cost = cost;
        insert book;
        return book;
    }
}
