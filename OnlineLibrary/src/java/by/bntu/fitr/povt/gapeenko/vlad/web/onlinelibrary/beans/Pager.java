/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.beans;

import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.entity.Book;
import java.util.List;


/**
 *
 * @author Vladislav
 */

public class Pager {

    private static Pager pager;
    
    private int rowIndex;

    private Pager() {
    }

    public static Pager getInstance() {
        if (pager == null) {
            pager = new Pager();
        }
        return pager;
    }
    
    
    private int totalBooksCount;
    private Book selectedBook;
    private List<Book> list;
    private int from;
    private int to;

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public List<Book> getList() {
        return list;
    }

    public void setList(List<Book> list) {
        rowIndex = -1;
        this.list = list;
    }

    public void setTotalBooksCount(int totalBooksCount) {
        this.totalBooksCount = totalBooksCount;
    }

    public int getTotalBooksCount() {
        return totalBooksCount;
    }

    public Book getSelectedBook() {
        return selectedBook;
    }

    public void setSelectedBook(Book selectedBook) {
        this.selectedBook = selectedBook;
    }

    public int getRowIndex() {
        rowIndex+=1;
        return rowIndex;
    }

    public void setRowIndex(int rowIndex) {
        this.rowIndex = rowIndex;
    }
    
    
}
