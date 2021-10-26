public class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBookList(List<Book__c> book){
        return [SELECT Id, Name, Author__c, Year__c, Publisher__c, Cost__c  from Book__c];
    }
    @AuraEnabled
    public static Boolean deleteBooks(String deletedTitle){
        Boolean flag;
        deletedTitle = '%' + deletedTitle + '%';
        Book__c[] deletedBooks = [SELECT Id from Book__c WHERE Name LIKE :deletedTitle];
        if(deletedBooks.size() == 0 ) {
            flag = false;
        }
        else{
            flag = true;
        }
        delete deletedBooks;
        
        return flag;
    }
    @AuraEnabled
    public static void deleteAllBooks(){
       String allTitles = '%%';
       Book__c[] deletedBooks = [SELECT Id from Book__c WHERE Name LIKE :allTitles];
       delete deletedBooks;
    }
}
