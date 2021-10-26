public class CreateBook {
    @AuraEnabled
    public static List<Book__c> createRecord(String setName, String setAuthor, String setPublisher, Decimal setYear, Decimal setCost) {
        Book__c[] books = new List<Book__c>();
        Book__c book = new Book__c(Name = setName,Author__c = setAuthor, Year__c = setYear, Publisher__c = setPublisher, Cost__c = setCost);
        books.add(book);
        insert book;
        System.debug('New Book created' + book);
        return books;
    }
}

