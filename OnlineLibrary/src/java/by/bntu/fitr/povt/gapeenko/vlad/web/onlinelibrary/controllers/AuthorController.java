package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;

import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.comparators.ListComparator;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.db.DataHelper;
import by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.entity.Author;
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


@ManagedBean(eager = false)
@ApplicationScoped
public class AuthorController implements Serializable, Converter {

    private final List<SelectItem> selectItems = new ArrayList<>();;
    private final Map<Long,Author> map;
    private final List<Author> list;


    public AuthorController() {
        map = new HashMap<>();
        list = DataHelper.getInstance().getAllAuthors();       
        Collections.sort(list, ListComparator.getInstance());
        
        list.stream().map((author) -> {
            map.put(author.getId(), author);
            return author;
        }).forEach((author) -> {
            selectItems.add(new SelectItem(author, author.getFio()));
        });
    }
    
    public List<Author> getAuthorList(){
        return list;
    }

    public List<SelectItem> getSelectItems() {
        return selectItems;
    }

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        return map.get(Long.valueOf(value));
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        return ((Author)value).getId().toString();
    }

    

    

}
