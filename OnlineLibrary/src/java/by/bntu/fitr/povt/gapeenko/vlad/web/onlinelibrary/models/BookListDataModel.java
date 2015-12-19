package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.models;

import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.beans.Pager;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.db.DataHelper;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.entity.Book;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;
import org.primefaces.model.SortOrder;  
import java.util.List;
import java.util.Map;



public class BookListDataModel extends LazyDataModel<Book> {  
    
    private List<Book> bookList;
    private DataHelper dataHelper = DataHelper.getInstance();
    private Pager pager = Pager.getInstance();

    public BookListDataModel() {
        
    }
    
    

      
    @Override  
    public Book getRowData(String rowKey) {      
        
        for(Book book : bookList) {  
            if(book.getId().intValue() == Integer.parseInt(rowKey))  
                return book;  
        }  
  
        return null;  
    }  
  
    @Override  
    public Object getRowKey(Book book) {  
        return book.getId();  
    }  
    
    @Override  
    public List<Book> load(int first, int pageSize, String sortField, SortOrder sortOrder, Map<String,Object> filters) {   
        
        pager.setFrom(first);
        pager.setTo(pageSize);
     
        dataHelper.populateList();

        this.setRowCount(pager.getTotalBooksCount());  
        
        return pager.getList();
        
    }  
  

}  
