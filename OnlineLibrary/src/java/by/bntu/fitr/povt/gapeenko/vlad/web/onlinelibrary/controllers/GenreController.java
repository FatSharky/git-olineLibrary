/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;


import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.comparators.ListComparator;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.db.DataHelper;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.entity.Genre;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.model.SelectItem;


/**
 *
 * @author Vladislav
 */
@ManagedBean(eager = false)
@ApplicationScoped
public class GenreController implements Serializable, Converter {

    private final List<SelectItem> selectItems = new ArrayList<>();
    private final Map<Long, Genre> map;
    private final List<Genre> list;

    public GenreController() {

        map = new HashMap<>();
        list = DataHelper.getInstance().getAllGenres();
        Collections.sort(list, ListComparator.getInstance());

        list.stream().map((genre) -> {
            map.put(genre.getId(), genre);
            return genre;
        }).forEach((genre) -> {
            selectItems.add(new SelectItem(genre, genre.getName()));
        });

    }

    public List<SelectItem> getSelectItems() {
        return selectItems;
    }

    public List<Genre> getGenreList() {
        return list;
    }

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        return map.get(Long.valueOf(value));
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        return ((Genre)value).getId().toString();
    }
    
    
}
