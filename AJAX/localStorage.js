"use strict";

function readSession(){
   let user = localStorage.getItem('user');
   //console.log(user);
   return user;
}

function writeUserStorage(response){
    //console.log(response);
    localStorage.setItem('user', response);
}
