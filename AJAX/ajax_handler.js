"use strict";

//RUTAS QUE SE USARAN
/*const login = 'http://localhost:8080/login'
const signup = 'http://localhost:8080/users' */

const login = "https://schedulemakerweb.herokuapp.com/login"
const signup = "https://schedulemakerweb.herokuapp.com/signup"

async function loadSchedules(schedules_url) {
    let response = await fetch(schedules_url);
    if(response.status != 200) return [];
    return await response.json();
}

async function loadSchedule(schedule_url) {
    let response = await fetch(schedule_url);
    if(response.status != 200) return [];
    return await response.json();;
}

async function loadClasses(classes_url) {
    let response = await fetch(classes_url);
    if(response.status != 200) return [];
    return await response.json();
}

async function loadSubjects(subjects_url) {
    let response = await fetch(subjects_url);
    if(response.status != 200) return [];
    return await response.json();
}

//POST funcion login
async function postLogin(){
    let xhr = new XMLHttpRequest();

    let usr = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    xhr.open('POST',login);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(usr));

    xhr.onload = () => {
        let response = xhr.response;
        writeUserStorage(response);
        //console.log(response);

        if(JSON.parse(response).role == "ADMIN"){
            //console.log(readSession());
            window.location.href = 'https://schedulemakerweb.herokuapp.com/admin-subjects'
        }else{
            //console.log(readSession());
            window.location.href = 'https://schedulemakerweb.herokuapp.com/home'
        }
    }
    return false;
}

//POST funcion signup
function signUp(){
    let xhr = new XMLHttpRequest();

    let usr = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role:"USER"
    };

    console.log(usr);

    xhr.open('POST',signup);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(usr));
    xhr.onreadystatechange = function(){
        if(this.status==200 && this.readyState ==4){
            window.location.href = 'https://schedulemakerweb.herokuapp.com/login'
        }
    }
    return false;
}

//AJAX SCHEDULES
function postSchedule(url, schedule, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(schedule));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

//AJAX SCHEDULE
function putSchedule(url, schedule, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('PUT',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(schedule));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function deleteSchedule(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE',url);
    xhr.send();
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function deleteGroupFromSchedule(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE',url);
    xhr.send();
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function addGroupToSchedule(url, code, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(code));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}
//AJAX SUBJECTS
function postSubject(url, subject, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(subject));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function putSubject(url, subject, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('PUT',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(subject));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function deleteSubject(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE',url);
    xhr.send();
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

//AJAX GROUPS
function postGroup(url, group, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(group));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function putGroup(url, group, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('PUT',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(group));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function deleteGroup(url, onSuccess, onError){
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE',url);
    xhr.send();
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}