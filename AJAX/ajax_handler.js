"use strict";

//xhr request casi lo mismo un objeto creado con cosas de mi formulario
//crear usuario status:estudiante
//materias vacias
//crear esquema y mandarlo a ruta con xhr



//POST funcion login

//POST funcion signup

//boton normal en signup y login


//DE LA SESION21 JAJA
async function loadSchedules(url) {
    // fetch from localhost:3000/????
    let response = await fetch(url);
    if(response.status != 200) return [];
    let users = await response.json();
    return users;
}

async function loadClasses(url) {
    // fetch from localhost:3000/????
    let response = await fetch(url);
    if(response.status != 200) return [];
    let users = await response.json();
    return users;
}

async function loadSubjects(url) {
    // fetch from localhost:3000/????
    let response = await fetch(url);
    if(response.status != 200) return [];
    let users = await response.json();
    return users;
}

function storeUser(url, user, onSuccess, onError) {
    // POST XHR to localhost:3000/api/users/{email} with body 'user' ????
    let xhr = new XMLHttpRequest();

    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function putUser(url, user, onSuccess, onError) {
    // PUT XHR to localhost:3000/api/users/{email} with body 'user'
    let xhr = new XMLHttpRequest();

    xhr.open('PUT',url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr,onSuccess, onError);
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}