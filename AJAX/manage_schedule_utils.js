"use strict";

//schedule que sacaste
const schedules_url = "http://localhost:8080/users/schedules/" 
//(agregar email y name para hacer GET, PUT y DELETE)
const group_url = "http://localhost:8080/groups"

const deleteGr_url = "http://localhost:8080/users/schedules/groups/"
//(agregar email, name, y code de grupo)

const subj_url = "http://localhost:8080/subjects/"

let email = JSON.parse(readSession()).email;
console.log(email);

let schedName = readSessionStorage();
console.log(schedName);

//cambiar nombre del horario que se mostrará
let scheduleName = document.getElementById('scheduleName');
//console.log(scheduleName);
scheduleName.value = schedName;

//Desplegar clases del horario en la tabla y en cards
let selectedSchedule = schedName;
let clases = "";

let classesTable = document.getElementsByClassName('table')[0].querySelector('tbody');
//console.log(classesTable);

let schedTable = document.getElementsByClassName('table')[1].querySelector('tbody');
//console.log(schedTable);

loadGroups(selectedSchedule);

//obtener grupos
function loadGroups(name) {
    //console.log("holaaa");
    loadSchedule(schedules_url + email + '/' + name).then(schedule => {
     
      for (let i = 0; i < schedule.groups.length; i++) {
        loadClasses(group_url+ '/' + schedule.groups[i]).then(group => {
          let name = group.subject;
          let code = group.code;
          let professor = group.professor;
          let classroom = group.classroom;
          let language = group.language;
          let days = group.days;
          let hours = group.hours;
  
          clases += classToHTML(name, code, professor, classroom, language);
          //console.log(i);
          changeInnerHTML(scheduleClasses, clases)
          scheduleToHTML(name, code, days, hours);
          //changeTableHTML(sched);
        });
      }
    });
  }
  
/*function changeInnerHTML(classes) {
    scheduleClasses.innerHTML = classes;
} */

function changeInnerHTML(node, html) {
    let clone = node.cloneNode(false);
    clone.insertAdjacentHTML('afterbegin', html);
    node.replaceWith(clone);
}

//cards de las clases a HTML
function classToHTML(name, code, professor, classroom, language) {
    return `
    <div class="card mb-3">
    <div class="row">
      <div  class="col-1 ml-5 d-flex justify-content-center align-items-center">
        <button onclick="deleteGroupSchedule('${code}')" id="pencil" type="button" class="btn btn-dark btn-sm"> <i style="color:white;"
            class="fas fa-trash-alt"></i></button>
      </div>
      <div class="col ml-0 pl-0">
        <div class="card-body d-flex justify-content-around align-middle flex-wrap">
          <card>Professor: ${professor}</card>
          <card>Classroom: ${classroom}</card>
          <card>Language: ${language}</card>
        </div>
      </div>
    </div>
    <div id="scheduleName" class="card-footer">
    <span>${name} </span>
    <span> ${code}</span>
   </div> 
  </div>
    `
}

//clases para tabla de horario en HTML
var DaysEnum = {
    MON : 0,
    TUE : 1,
    WED : 2,
    THU : 3,
    FRI : 4,
    SAT : 5
  };
  
  function scheduleToHTML(name, code, days, hours) {
    for(let i=0; i<days.length; i++){
      let rowNum = parseInt(hours.split("-")[0])-7;
      let row = schedTable.querySelector('tr:nth-of-type(n+'+rowNum+')');
  
      let colNum = DaysEnum[days[i]]+1;
      let cell = row.querySelector('td:nth-of-type(n+'+colNum+')');
    
      //console.log(cell);

      cell.innerHTML = 
      `       
      <p title="${name}" >${name}</p>
      <p title="${code}">${code}</p>
      `;
      cell.classList.remove('table-light');
      cell.classList.add('table-success');
    }
    
  }

let oldName = "";

//editar nombre del horario
function editName(event){
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.getElementsByTagName('input')[0];
    let confirm = parent.getElementsByClassName('btn-success')[0];
    let cancel = parent.getElementsByClassName('btn-danger')[0];
    let edit = parent.getElementsByClassName('btn-info')[0];

    //console.log(edit);
    //console.log(cancel);
    //console.log(name.value);

    oldName = name.value;

    name.disabled = false;
    confirm.hidden = false;
    cancel.hidden = false;
    edit.hidden = true;
}

function changeName(event){
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.getElementsByTagName('input')[0];
    let confirm = parent.getElementsByClassName('btn-success')[0];
    let cancel = parent.getElementsByClassName('btn-danger')[0];
    let edit = parent.getElementsByClassName('btn-info')[0];

    let sched = {
        "name": name.value
    }

    //console.log(sched);
    //console.log(schedules_url + email + '/' + oldName);

    confirm.hidden = true;
    cancel.hidden = true;
    edit.hidden = false;
    name.disabled = true;

    //LLAMADA A AJAX
    putSchedule(schedules_url + email + '/' + oldName, sched, msg => {
        console.log(msg);
    }, err => console.log(err));
}

function cancelName(event){
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.getElementsByTagName('input')[0];
    let confirm = parent.getElementsByClassName('btn-success')[0];
    let cancel = parent.getElementsByClassName('btn-danger')[0];
    let edit = parent.getElementsByClassName('btn-info')[0];

    name.value = oldName;

    confirm.hidden = true;
    cancel.hidden = true;
    edit.hidden = false;
    name.disabled = true;

}

//eliminar clases
function deleteGroupSchedule(code){
    console.log(code);

    console.log(deleteGr_url + email + '/' + selectedSchedule + '/' + code);
    
    //Llamada a AJAX
    deleteGroupFromSchedule(deleteGr_url + email + '/' + selectedSchedule + '/' + code, msg => {
        console.log(msg);
        //loadGroups(selectedSchedule) 
    }, err => console.log(err));

    //loadGroups(selectedSchedule) 

}

//loadGroups(selectedSchedule);

//TABLA DE MATERIAS Y CLASES
let subjectRow = document.getElementById('subjectsList');

function displaySubjects() {
  loadSubjects(subj_url).then(subjects => {

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
    <li class="list-group-item d-flex align-items-center">
    <div class="col-3 p-0 m-0" id="department">${department}</div>
    <div class="col-2 m-0" id="credits">${credits}</div>
    <div class="col-sm-4 col-md-5 m-0" id="name">${name}</div>
    <span class="ml-auto"><button onclick="viewClasses('${name}')" id="details" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#classesModal">
        <i style="color:white;" class="fas fa-info-circle"></i>
    </button></span>
  </li>
    `
}

//Obtener clases de una materia
//classesTable

function viewClasses(name){
  let s = "";
  loadClasses(group_url+'?subject=' + name).then(groups => {
    
    console.log(groups);

    Object.values(groups).forEach(group => {
        console.log(group.days)

       let id = group.code;
       let prof = group.professor;
       let days = group.days.map((day)=> day[0]).join('-');
       let hours = group.hours;
       let classroom = group.classroom;
       let language = group.language;
       let subject = group.subject;

       console.log(days);

       s += `
      <tr>
      <td>${id}</td>
      <td>${days}</td>
      <td>${hours}</td>
      <td>${prof}/td>
      <td>${language}</td>
      <td>${classroom}</td>
    </tr>
      `
      });
      //console.log(name);
      classesTable.innerHTML = s;
  });
}