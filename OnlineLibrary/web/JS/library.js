/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function checkValue (form, message){
    var userInput = form[form.id + ":username"];
    
    if (userInput.vlaue === ''){
        alert(message);
        userInput.focus();
        return false;
    }
    return true;
}

function showProgress(data){
    if(data.status === "begin"){
        document.getElemetById('loading_wrapper').style.display="block";   
    }
    else if (data.status==="success"){
        document.getElemetById('loading_wrapper').style.display="nine";
    }
}