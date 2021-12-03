"use strict";

function readSession(){
   window.localStorage.getItem('user');
   
}

function writeUserStorage(response){
    window.localStorage.setItem('user', JSON.stringify(response));
}
