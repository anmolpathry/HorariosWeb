"use strict";

const subjects_url = "http://localhost:8080/subjects";

let subjectRow = document.getElementById('subjectRow');

let email = JSON.parse(readSession()).email;
console.log(email);

let successAlert = document.getElementById("successAlert");
let failAlert = document.getElementById("failAlert");

console.log(successAlert)

let oldName = "";
let oldDep = "";
let oldCred = "";

function displaySubjects() {
    // load users from server and display them
    loadSubjects(subjects_url).then(subjects => {

        let subj = subjects;
        let s = "";

        Object.values(subj).forEach(subject => {
            let name = subject.name;
            let department = subject.department;
            let credits = subject.credits;

            //console.log(name);
            s += subRowToHTML(name, department, credits);

        });

        subjectRow.innerHTML = s + '\n</div>';

    });

}

displaySubjects();

//Function To HTML
function subRowToHTML(name, department, credits) {
    //console.log(name);
    return `
    <tr>
    <th class="table-light" scope="row"><input disabled type="text" id="subjName" value= "${name}"
    style = "border-style: none; background-color: white; font-size: 13px; font-weight: bold; color: black;">
    </th>
    
    <td class="table-light">
      <input disabled type="text" id="subjDep" value= "${department}""
    style = "border-style: none; background-color: white; font-size: 13px; color: black;">
    </td>
    <td class="table-light">
    <input disabled type="text" id="subjCred" value= "${credits}"
    style = "border-style: none; background-color: white; font-size: 13px;  color: black;">
    </td>
    <td class="table-light">

      <button onclick="editSubject(event)" id="edit" type="button" class="btn btn-dark btn-sm"> <i style="color:white;"
        class="fas fa-pencil-alt"></i></button>

        <button type="button" class="btn btn-success btn-sm" id="confirm" hidden onclick="saveChanges(event)" >
        <i class="fas fa-check-circle"></i></button>

        <button type="button" class="btn btn-danger btn-sm" id="cancel" hidden onclick="cancelChanges(event)" >
        <i class="fas fa-times-circle"></i></button>
       
      </div>

    </td>
    <td class="table-light">
      <button onclick="deleteSubj(event)" id="delete" type="button" class="btn btn-dark btn-sm"> <i style="color:white;"
        class="fas fa-trash-alt"></i></button>
    </td>
    </tr>
  `
}


//onclick en editar: habilitar inputs, habilitar botones
function editSubject(event) {
    let edit = event.currentTarget;
    let confirm = edit.parentNode.getElementsByClassName('btn btn-success')[0];
    let cancel = edit.parentNode.getElementsByClassName('btn btn-danger')[0];

    edit.setAttribute("hidden", true);
    confirm.removeAttribute("hidden");
    cancel.removeAttribute("hidden");

    //console.log(edit.parentNode.parentNode);

    let name = edit.parentNode.parentNode.getElementsByTagName('input')[0];
    let depart = edit.parentNode.parentNode.getElementsByTagName('input')[1];
    let cred = edit.parentNode.parentNode.getElementsByTagName('input')[2];

    oldName = name.value;
    oldDep = depart.value;
    oldCred = cred.value;

    name.removeAttribute("disabled");
    depart.removeAttribute("disabled");
    cred.removeAttribute("disabled");


}
//onclick en guardar: hacer document.getById, crear el objeto, promesa para funcion ajax
function saveChanges(event) {
    let parent = event.currentTarget.parentNode.parentNode;
    let name = parent.getElementsByTagName('input')[0];
    let depart = parent.getElementsByTagName('input')[1];
    let cred = parent.getElementsByTagName('input')[2];
    let edit = parent.getElementsByClassName('btn btn-dark')[0];
    let cancel = parent.getElementsByClassName('btn btn-danger')[0];
    let confirm = parent.getElementsByClassName('btn btn-success')[0];

    //console.log(name);

    let subject = {
        "name": name.value,
        "department": depart.value,
        "credits": cred.value
    }

    console.log(subjects_url + "/" +oldName);

    //LLAMADA A AJAX
    putSubject(subjects_url + "/"+ oldName, subject, msg => {
        console.log(msg);
        displaySubjects();
    }, err => console.log(err));

    successAlert.hidden = false;
    name.disabled = true;
    depart.disabled = true;
    cred.disabled = true;
    edit.hidden = false;
    confirm.hidden = true;
    cancel.hidden = true;
}

function cancelChanges(event) {
    let parent = event.currentTarget.parentNode.parentNode;
    let name = parent.getElementsByTagName('input')[0];
    let depart = parent.getElementsByTagName('input')[1];
    let cred = parent.getElementsByTagName('input')[2];
    let edit = parent.getElementsByClassName('btn btn-dark')[0];
    let cancel = parent.getElementsByClassName('btn btn-danger')[0];
    let confirm = parent.getElementsByClassName('btn btn-success')[0];

    name.value = oldName;
    depart.value = oldDep;
    cred.value = oldCred;

    name.disabled = true;
    depart.disabled = true;
    cred.disabled = true;
    edit.hidden = false;
    confirm.hidden = true;
    cancel.hidden = true;

    failAlert.hidden = false;
}

//onclick en eliminar
function deleteSubj(event) {
    let parent = event.currentTarget.parentNode.parentNode;
    console.log(parent);
    let name = parent.getElementsByTagName('input')[0].value;
    console.log(subjects_url + "/" + name);

    //LLAMADA A AJAX
    deleteSubject(subjects_url + "/" + name, msg => {
        console.log(msg);
        displaySubjects();
    }, err => console.log(err));
}

let cred = "4";
document.getElementById('creditsSelect').addEventListener('change', function () {
    cred = this.value;
});

//agregar materia con Modal POST
function addSub(event) {
    let modalName = document.getElementById('modalName');
    let modalDepart = document.getElementById('modalDepart');

    let subject = {
        "name": modalName.value,
        "department": modalDepart.value,
        "credits": cred
    }

    console.log(subject);

    //LLAMADA A AJAX
    postSubject(subjects_url, subject, msg => {
        console.log(msg);
        displaySubjects();
    }, err => console.log(err));

    document.getElementById("closeModal").click();
}

function clearModal(){
    document.getElementById('modalName').value="";
    document.getElementById('modalDepart').value="";
}