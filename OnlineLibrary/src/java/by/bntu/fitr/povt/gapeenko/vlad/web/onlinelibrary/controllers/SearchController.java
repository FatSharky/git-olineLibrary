/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;

import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.beans.Book;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.db.Database;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.enums.SearchType;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

/**
 *
 * @author Vladislav
 */
@ManagedBean(eager = true)
@SessionScoped
public class SearchController implements Serializable {

    private SearchType searchType;// хранит выбранный тип поиска
    private String searchString; // хранит поисковую строку
    private static final Map<String, SearchType> searchList = new HashMap<>(); // хранит все виды поисков (по автору, по названию)
    private ArrayList<Book> currentBookList; // текущий список книг для отображения

    public SearchController() {
        fillBooksAll();

        ResourceBundle bundle = ResourceBundle.getBundle("ru.javabegin.training.web.nls.messages", FacesContext.getCurrentInstance().getViewRoot().getLocale());
        searchList.put(bundle.getString("author_name"), SearchType.AUTHOR);
        searchList.put(bundle.getString("book_name"), SearchType.TITLE);
    }

    private void fillBooksBySQL(String sql) {

        Statement stmt = null;
        ResultSet rs = null;
        Connection conn = null;

        try {
            conn = Database.getConnection();
            stmt = conn.createStatement();

            rs = stmt.executeQuery(sql);

            currentBookList = new ArrayList<>();

            while (rs.next()) {
                Book book = new Book();
                book.setId(rs.getLong("id"));
                book.setName(rs.getString("name"));
                book.setGenre(rs.getString("genre"));
                book.setIsbn(rs.getString("isbn"));
                book.setAuthor(rs.getString("author"));
                book.setPageCount(rs.getInt("page_count"));
                book.setPublishDate(rs.getInt("publish_year"));
                book.setPublisher(rs.getString("publisher"));
//              book.setImage(rs.getBytes("image"));
//              book.setContent(rs.getBytes("content"));
                book.setDescr(rs.getString("descr"));
                currentBookList.add(book);
            }

        } catch (SQLException ex) {
            Logger.getLogger(SearchController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(SearchController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }

    private void fillBooksAll() {
        fillBooksBySQL("select b.id,b.name,b.isbn,b.page_count,b.publish_year, p.name as publisher, b.descr, "
                + "a.fio as author, g.name as genre, b.image from book b inner join author a on b.author_id=a.id "
                + "inner join genre g on b.genre_id=g.id inner join publisher p on b.publisher_id=p.id order by b.name");
    }

    public void fillBooksByGenre() {

        Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        Integer genre_id = Integer.valueOf(params.get("genre_id"));

        fillBooksBySQL("select b.id,b.name,b.isbn,b.page_count,b.publish_year, p.name as publisher, a.fio as author, g.name as genre, b.descr, b.image from book b "
                + "inner join author a on b.author_id=a.id "
                + "inner join genre g on b.genre_id=g.id "
                + "inner join publisher p on b.publisher_id=p.id "
                + "where genre_id=" + genre_id + " order by b.name ");
    }

    public void fillBooksByLetter() {

        Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        String searchLetter = params.get("letter");

        fillBooksBySQL("select b.id,b.name,b.isbn,b.page_count,b.publish_year, p.name as publisher, a.fio as author, g.name as genre, b.descr, b.image from book b "
                + "inner join author a on b.author_id=a.id "
                + "inner join genre g on b.genre_id=g.id "
                + "inner join publisher p on b.publisher_id=p.id "
                + "where substr(b.name,1,1)='" + searchLetter + "' order by b.name ");

    }

    public void fillBooksBySearch() {

        if (searchString.trim().length() == 0) {
            fillBooksAll();
            return;
        }

        StringBuilder sql = new StringBuilder("select b.descr, b.id,b.name,b.isbn,b.page_count,b.publish_year, p.name as publisher, a.fio as author, g.name as genre, b.image from book b "
                + "inner join author a on b.author_id=a.id "
                + "inner join genre g on b.genre_id=g.id "
                + "inner join publisher p on b.publisher_id=p.id ");

        if (searchType == SearchType.AUTHOR) {
            sql.append("where lower(a.fio) like '%").append(searchString.toLowerCase()).append("%' order by b.name ");

        } else if (searchType == SearchType.TITLE) {
            sql.append("where lower(b.name) like '%").append(searchString.toLowerCase()).append("%' order by b.name ");
        }



        fillBooksBySQL(sql.toString());


    }

    public byte[] getContent(int id) {
        Statement stmt = null;
        ResultSet rs = null;
        Connection conn = null;


        byte[] content = null;
        try {
            conn = Database.getConnection();
            stmt = conn.createStatement();

            rs = stmt.executeQuery("select content from book where id=" + id);
            while (rs.next()) {
                content = rs.getBytes("content");
            }
        } catch (SQLException ex) {
            Logger.getLogger(Book.class
                    .getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(Book.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return content;

    }

    public byte[] getImage(int id) {
        Statement stmt = null;
        ResultSet rs = null;
        Connection conn = null;

        byte[] image = null;

        try {
            conn = Database.getConnection();
            stmt = conn.createStatement();

            rs = stmt.executeQuery("select image from book where id=" + id);
            while (rs.next()) {
                image = rs.getBytes("image");
            }

        } catch (SQLException ex) {
            Logger.getLogger(Book.class
                    .getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(Book.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return image;
    }

    public Character[] getRussianLetters() {
        Character[] letters = new Character[33];
        letters[0] = 'А';
        letters[1] = 'Б';
        letters[2] = 'В';
        letters[3] = 'Г';
        letters[4] = 'Д';
        letters[5] = 'Е';
        letters[6] = 'Ё';
        letters[7] = 'Ж';
        letters[8] = 'З';
        letters[9] = 'И';
        letters[10] = 'Й';
        letters[11] = 'К';
        letters[12] = 'Л';
        letters[13] = 'М';
        letters[14] = 'Н';
        letters[15] = 'О';
        letters[16] = 'П';
        letters[17] = 'Р';
        letters[18] = 'С';
        letters[19] = 'Т';
        letters[20] = 'У';
        letters[21] = 'Ф';
        letters[22] = 'Х';
        letters[23] = 'Ц';
        letters[24] = 'Ч';
        letters[25] = 'Ш';
        letters[26] = 'Щ';
        letters[27] = 'Ъ';
        letters[28] = 'Ы';
        letters[29] = 'Ь';
        letters[30] = 'Э';
        letters[31] = 'Ю';
        letters[32] = 'Я';

        return letters;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public SearchType getSearchType() {
        return searchType;
    }

    public void setSearchType(SearchType searchType) {
        this.searchType = searchType;
    }

    public Map<String, SearchType> getSearchList() {
        return searchList;
    }

    public ArrayList<Book> getCurrentBookList() {
        return currentBookList;
    }
}
