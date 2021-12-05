"use strict";

const groups_url = "http://localhost:8080/groups/";

let classRow = document.getElementById('classRow');
let Subject = document.getElementById('Subject');

let email = JSON.parse(readSession()).email;
console.log(email);

let successAlert = document.getElementById("successAlert");
let failAlert = document.getElementById("failAlert");

console.log(successAlert)

let oldId = "";
let oldProf = "";
let oldSch = "";
let oldClass = "";
let oldLang= "";

function displayClasses() {
    // load users from server and display them
    loadClasses(groups_url).then(groups => {

        let clas = groups;
        let s = "";

    
        Object.values(clas).forEach(group => {
           let id = group.code;
           let prof = group.professor;
           let days = group.days;
           let hours = group.hours;
           let classroom = group.classroom;
           let language = group.language;
           let subject = group.subject;

           s+= `
          
        <thead class="table-secondary col-11">
          <tr>
            <th id="Subject" colspan="7" style="background-color: rgb(84, 25, 139); color:white">${subject}</th>
          </tr>
        </thead>

        <thead >
          <tr class="table-secondary">
            <th scope="col">Class ID</th>
            <th scope="col">Professor</th>
            <th scope="col">Schedule</th>
            <th scope="col">Classroom</th>
            <th scope="col">Language</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
           `

            //console.log(name);
            s += subRowToHTML(id, prof, days, hours, classroom, language, subject);

        });

        classRow.innerHTML = s + '\n</div>';

    });

}

displayClasses();

//Function To HTML
function subRowToHTML(id, prof, days, hours, classroom, language) {
    //console.log(name);
    return `

    <tr>
<th class="table-light" scope="row">
<input disabled type="text" id="subjDep" value= "${id}""
    style = "border-style: none; background-color: white; font-size: 13px; color: black;">
</th>

<td class="table-light">
<input disabled type="text" id="subjDep" value= "${prof}""
style = "border-style: none; background-color: white; font-size: 13px; color: black;">
</td>

<td class="table-light">
<input disabled type="text" id="subjDep" value= "${days} ${hours}""
style = "border-style: none; background-color: white; font-size: 13px; color: black;">
</td>

<td class="table-light">
<input disabled type="text" id="subjDep" value= "${classroom}""
    style = "border-style: none; background-color: white; font-size: 13px; color: black;">
</td>
<td class="table-light">
<input disabled type="text" id="subjDep" value= "${language}""
style = "border-style: none; background-color: white; font-size: 13px; color: black;">
</td>

<td class="table-light">

<button onclick="editClass(event)" id="edit" type="button" class="btn btn-dark btn-sm"> <i style="color:white;"
  class="fas fa-pencil-alt"></i></button>

  <button type="button" class="btn btn-success btn-sm" id="confirm" hidden onclick="saveChanges(event)" >
  <i class="fas fa-check-circle"></i></button>

  <button type="button" class="btn btn-danger btn-sm" id="cancel" hidden onclick="cancelChanges(event)" >
  <i class="fas fa-times-circle"></i></button>
 
</div>

</td>
<td class="table-light">
<button onclick="deleteClass(event)" id="delete" type="button" class="btn btn-dark btn-sm"> <i style="color:white;"
  class="fas fa-trash-alt"></i></button>
</td>
</tr>
    `
}



function editClass(event){
    let edit = event.target;
    let confirm = event.target.parentNode.getElementsByClassName('btn btn-success')[0];
    let cancel = event.target.parentNode.getElementsByClassName('btn btn-danger')[0];

    edit.setAttribute("hidden", true);
    confirm.removeAttribute("hidden");
    cancel.removeAttribute("hidden");

    let id = event.target.parentNode.parentNode.getElementsByTagName('input')[0];
    let prof = event.target.parentNode.parentNode.getElementsByTagName('input')[1];
    let sch= event.target.parentNode.parentNode.getElementsByTagName('input')[2];
    let clasr = event.target.parentNode.parentNode.getElementsByTagName('input')[3];
    let lang= event.target.parentNode.parentNode.getElementsByTagName('input')[4];

    oldId = id.value;
    oldProf = prof.value;
    oldSch = sch.value;
    oldClass = clasr.value;
    oldLang = lang.value;

    console.log(oldId + " " + oldProf + " " + oldSch + " " + oldClass + " " + oldLang);

    id.disabled = false;
    prof.disabled = false;
    sch.disabled = false;
    clasr.disabled = false;
    lang.disabled = false;

}

function saveChanges(event){
    let parent = event.target.parentNode.parentNode;
    let id = event.target.parentNode.parentNode.getElementsByTagName('input')[0];
    let prof = event.target.parentNode.parentNode.getElementsByTagName('input')[1];
    let sch= event.target.parentNode.parentNode.getElementsByTagName('input')[2];
    let clasr = event.target.parentNode.parentNode.getElementsByTagName('input')[3];
    let lang= event.target.parentNode.parentNode.getElementsByTagName('input')[4];
    let edit = parent.getElementsByClassName('btn btn-dark')[0];
    let cancel = parent.getElementsByClassName('btn btn-danger')[0];
    let confirm = parent.getElementsByClassName('btn btn-success')[0];

    let group = {
       "code": id.value,
       "classroom": clasr.value,
       "professor": prof.value,
       "language": lang.value,
       "days": sch.value.split(" ")[0],
       "hours": sch.value.split(" ")[1]
    }

    //console.log(groups_url + oldId);
    console.log(group);

    console.log(groups_url + oldId);

    //LLAMADA A AJAX
    putGroup(groups_url + oldId, group, msg => {
        console.log(msg);
        displayClasses();
    }, err => console.log(err));

    id.disabled = true;
    prof.disabled = true;
    sch.disabled = true;
    clasr.disabled = true;
    lang.disabled = true;
    edit.hidden = false;
    confirm.hidden = true;
    cancel.hidden = true;
    successAlert.hidden = false;
}

function cancelChanges(event){
    let parent = event.target.parentNode.parentNode;
    let id = event.target.parentNode.parentNode.getElementsByTagName('input')[0];
    let prof = event.target.parentNode.parentNode.getElementsByTagName('input')[1];
    let sch= event.target.parentNode.parentNode.getElementsByTagName('input')[2];
    let clasr = event.target.parentNode.parentNode.getElementsByTagName('input')[3];
    let lang= event.target.parentNode.parentNode.getElementsByTagName('input')[4];
    let edit = parent.getElementsByClassName('btn btn-dark')[0];
    let cancel = parent.getElementsByClassName('btn btn-danger')[0];
    let confirm = parent.getElementsByClassName('btn btn-success')[0];

    id.value = oldId;
    prof.value = oldProf;
    sch.value = oldSch;
    clasr.value = oldClass;
    lang.value = oldLang;

    id.disabled = true;
    prof.disabled = true;
    sch.disabled = true;
    clasr.disabled = true;
    lang.disabled = true;
    edit.hidden = false;
    confirm.hidden = true;
    cancel.hidden = true;

    failAlert.hidden = false;
}

function deleteClass(event){
    let parent = event.target.parentNode.parentNode;
    console.log(parent);
    let id = parent.getElementsByTagName('input')[0].value;
    console.log(groups_url + id);

    //LLAMADA A AJAX
    deleteSubject(groups_url + id, msg => {
        console.log(msg);
        displayClasses();
    }, err => console.log(err));
}

//AGREGAR CLASE
let minHour = "7";
let maxHour = "22";
let languageSelect = "Español";
let days = [];

//HORARIO
document.getElementById('minHour').addEventListener('change', function () {
    minHour = this.value;
});

document.getElementById('maxHour').addEventListener('change', function () {
    maxHour = this.value;
});

//IDIOMA
document.getElementById('languageSelect').addEventListener('change', function () {
    languageSelect = this.value;
});

//DIAS
document.getElementById('daySearch').addEventListener('click', (event) => {
    if(event.target.nodeName === 'BUTTON'){
        if(!days.includes(event.target.innerHTML)){
            days.push(event.target.innerHTML);
        }else{
            days.splice(days.indexOf(event.target.innerHTML),1);
        }
        //console.log(event.target.innerHTML);
    }
    
}); 



//agregar clase con Modal POST
function addGroup(event) {
    let classProf = document.getElementById('classProf');
    let classGr = document.getElementById('classGr');
    let classSubj = document.getElementById('classSubj');
    let code = document.getElementById('code');
    let hours = minHour + "-" + maxHour;



    let group = {
        "code": code.value,
        "subject": classSubj.value,
        "classroom": classGr.value,
        "professor": classProf.value,
        "language": languageSelect,
        "days": days,
        "hours": hours
     }
 

    console.log(group);

    //LLAMADA A AJAX
   postSubject(groups_url, group, msg => {
        console.log(msg);
        displayClasses();
    }, err => console.log(err)); 

}