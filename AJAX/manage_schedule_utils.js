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
    console.log("holaaa");
    loadSchedule(schedules_url + email + '/' + name).then(schedule => {
      document.getElementById("scheduleClasses").innerHTML = "";
      clases = "";
      for (let i = 0; i < schedule.groups.length; i++) {
        console.log(schedule.groups[i]);
        loadClasses(group_url+ '/' + schedule.groups[i]).then(group => {
          let name = group.subject;
          let code = group.code;
          let professor = group.professor;
          let classroom = group.classroom;
          let language = group.language;
          let days = group.days;
          let hours = group.hours;

          
          scheduleToHTML(name, code, days, hours);

          clases += classToHTML(name, code, professor, classroom, language);
          //console.log(i);
          changeInnerHTML(scheduleClasses, clases);
          
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
  
  let groupsArray = []; 

  function scheduleToHTML(name, code, days, hours) {
    if (groupsArray.findIndex(g => g.code == code) != -1) return ""; 
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
    groupsArray.push({subject: name, code: code, days: days, hours: hours});
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
        window.location.href = 'http://localhost:8080/manage-schedule'
    }, err => console.log(err));

    loadGroups(selectedSchedule) 

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

document.getElementById('minHour').addEventListener('change', function () {
  minHour = this.value;
});

document.getElementById('maxHour').addEventListener('change', function () {
  maxHour = this.value;
});

//DIAS
document.getElementById('daySearch').addEventListener('click', (event) => {
  if(event.target.nodeName === 'BUTTON'){
      if(!days.includes(event.target.innerHTML)){
          days.push(event.target.innerHTML);
          event.target.style.background = '#6e77f0';
      }else{
          days.splice(days.indexOf(event.target.innerHTML),1);
          event.target.style.background = '#5bc0de';
      }
      console.log(days);
      //console.log(event.target.innerHTML);
  }
  
}); 

function viewClasses(name){
  document.getElementById('classesForSubject').innerHTML = `Classes for ${name}`;
  let s = "";
  loadClasses(group_url+'?subject=' + name).then(groups => {
    
    //console.log(groups);

    Object.values(groups).forEach(group => {

       let id = group.code;
       let prof = group.professor;
       let days = group.days;
       let shortDays = days.map((day)=> (day =="TUE" || day=="THU")? day.substring(0,2) :day[0]).join('-');
       let hours = group.hours;
       let classroom = group.classroom;
       let language = group.language;
       let subject = group.subject;

      s += `
        <tr onclick="selectGroup('${id}','${days}','${hours}','${subject}', this)">
        <td>${id}</td>
        <td>${shortDays}</td>
        <td>${hours}</td>
        <td>${prof}/td>
        <td>${language}</td>
        <td>${classroom}</td>
        </tr> `
      });
      //console.log(name);
      classesTable.innerHTML = s;
  });
}

let selectedClass = null;
function selectGroup(code, days, hours, subject, row){
  console.log("Groups Array:");
  console.log(groupsArray);
  if (selectedClass != null) selectedClass.row.style.background ="white";
  row.style.background ="#b5e8fc";
  selectedClass = {code: code, days:days, hours:hours, subject:subject, row:row};
  console.log(selectedClass);
}

function verifyClass(group){
  if (group == null) return false;
  if (groupsArray.findIndex(g => g.subject == group.subject) != -1){
    alert("Group from same subject already in schedule.");
    return false;
  }
  let sameHours = groupsArray.filter(g => g.hours == group.hours);
  if (sameHours.length == 0) return true;
  let coincidences = sameHours.filter(g => g.days.some(gd=> group.days.includes(gd)));
  if (coincidences.length == 0) return true;
  alert(`${group.code} crosses with other groups!`);
  return false;
}

//agregar clase con Modal POST
function addGroupToSched(event) {
  if(!verifyClass(selectedClass)) return;
  let group = {
    "code": selectedClass.code
  }

  //LLAMADA A AJAX
  addGroupToSchedule(schedules_url + 'groups/' + email + '/' + schedName, group, msg => {
      console.log(msg);
      loadGroups(selectedSchedule);
  }, err => console.log(err)); 

  document.getElementById("closeModal").click();
}

function clearModal(){
  selectedClass = null;
  document.getElementById('professorSearch').value = "";
  document.getElementById('classroomSearch').value = "";
  let dayButtons = document.querySelectorAll('#daySearch button');
  for (let i=0; i<dayButtons.length;i++)
      dayButtons[i].style.background = "#5bc0de";
  days = [];
  groupsArray = [];
}

