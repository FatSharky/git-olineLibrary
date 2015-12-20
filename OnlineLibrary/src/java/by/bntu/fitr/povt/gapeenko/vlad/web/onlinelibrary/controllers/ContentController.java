/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;

import java.io.Serializable;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.faces.bean.SessionScoped;
import javax.faces.event.ActionEvent;
import javax.faces.event.ActionListener;
import org.primefaces.event.FileUploadEvent;

/**
 *
 * @author Vladislav
 */
@ManagedBean
@SessionScoped
public class ContentController implements Serializable {

    private byte[] uploadedContent;
    private boolean showContent;
    
    @ManagedProperty(value = "#{bookListController}")
    private BookListController bookListController;

    public BookListController getBookListController() {
        return bookListController;
    }

    public void setBookListController(BookListController bookListController) {
        this.bookListController = bookListController;
    }

    public void handleFileUpload(FileUploadEvent event) {
        uploadedContent = event.getFile().getContents();
        if (uploadedContent!=null && uploadedContent.length>0){
            showContent = true;
        }
    }

    public ActionListener saveListener() {
        return new ActionListener() {
            @Override
            public void processAction(ActionEvent event) {
                if (uploadedContent != null) {
                    bookListController.getSelectedBook().setContent(uploadedContent);
                    bookListController.getSelectedBook().setContentEdited(true);
                }
                clear();
            }
        };
    }

    public ActionListener clearListener() {
        return new ActionListener() {
            @Override
            public void processAction(ActionEvent event) {
                clear();
            }
        };
    }

    public void clear() {
        uploadedContent = null;
        showContent = false;
    }

    public boolean isShowContent() {
        return showContent;
    }

    public byte[] getUploadedContent() {
        return uploadedContent;
    }
    
    
    
}



