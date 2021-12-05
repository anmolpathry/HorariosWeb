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

function readSessionStorage(){
    let sched = sessionStorage.getItem('sched');
    console.log(sched);
    return sched;
 }
 
 function writeSessionStorage(response){
     console.log(response);
     sessionStorage.setItem('sched', response);
 }
