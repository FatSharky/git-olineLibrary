/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.controllers;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

/**
 *
 * @author Vladislav
 */
@ManagedBean
@RequestScoped
public class LoginController {

    /**
     * Creates a new instance of LoginController
     */
    public LoginController() {
    }
    
    public String login(){
        return "books";
    }
   
    public String exit(){  
        FacesContext.getCurrentInstance().getExternalContext().invalidateSession();
        return "exit";
    }
}
