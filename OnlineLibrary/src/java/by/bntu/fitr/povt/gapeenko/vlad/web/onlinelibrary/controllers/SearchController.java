/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;

import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.enums.SearchType;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

/**
 *
 * @author Vladislav
 */
@ManagedBean
@SessionScoped
public class SearchController {
    private SearchType searchType;
    private static final Map<String, SearchType> searchList = new HashMap<>();

    public SearchController() {
        ResourceBundle bundle = ResourceBundle.getBundle("by.bntu.fitr.povt.gapeenko.web.library.nls.messages", FacesContext.getCurrentInstance().getViewRoot().getLocale());
        searchList.put(bundle.getString("author_name"), SearchType.AUTHOR);
        searchList.put(bundle.getString("book_name"), SearchType.TITLE);
    }

    public SearchType getSearchType() {
        return searchType;
    }

    public Map<String, SearchType> getSearchList() {
        return searchList;
    }
    
}
