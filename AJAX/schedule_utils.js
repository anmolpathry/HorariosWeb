"use strict";

//schedule que sacaste
const schedules_url = "http://localhost:8080/users/schedules/"
const group_url = "http://localhost:8080/groups/"

let schedulesList = document.getElementById('scheduleList');
console.log(schedulesList);

let email = JSON.parse(readSession()).email;
console.log(email);

let scheduleClasses = document.getElementById('scheduleClasses');
console.log(scheduleClasses);

let table = document.getElementsByClassName('table')[0].querySelector('tbody');
console.log(table);

let selectedSchedule = "";

function loadCardSchedules() {
  loadSchedules(schedules_url + email).then(schedules => {
    let usr_sched = schedules;
    let s = "";

    s += '<div class="card-deck justify-content-center">\n';

    Object.values(usr_sched)[0].forEach(schedule => {
      let name = schedule.name;
      let period = schedule.period;

      s += scheduleCardToHTML(name, period);
    });

    schedulesList.innerHTML = s + '\n</div>';

  });
}

loadCardSchedules();

//Function To HTML
//ON CLICK PARA SELECCIONAR HORARIO Y DESPLEGAR CLASES
function scheduleCardToHTML(name, period) {
  return `
    <div class="card">
    <a id="scheduleLink" style="color: black;" class="button text-decoration-none" href>
    <div onclick="selectSchedule(event)" class="card-body">
      <h5 id="scheduleName" class="card-title">${name}</h5>
    </div>
    <div class="card-footer">
      <small class="text-muted">${period}</small>
    </div>
    </a>
  </div>
  `
}

let clases = " ";
let sched = " ";
//obtener grupos
function loadGroups(name) {
  loadSchedule(schedules_url + email + '/' + name).then(schedule => {
    if(name == ""){
      document.getElementById('schedName').innerHTML = "Selecciona un Horario";
    }
    else{
       document.getElementById('schedName').innerHTML = schedule.name;

    for (let i = 0; i < schedule.groups.length; i++) {
      loadClasses(group_url + schedule.groups[i]).then(group => {
        let name = group.subject;
        let code = group.code;
        let professor = group.professor;
        let classroom = group.classroom;
        let language = group.language;
        let days = group.days;
        let hours = group.hours;

        clases += classToHTML(name, code, professor, classroom, language);
        //console.log(i);
        changeInnerHTML(clases);
        sched += scheduleToHTML(name, code, days, hours);
        //changeTableHTML(sched);
      });
    }
    }
  });
}

function changeInnerHTML(classes) {
  //console.log(clases);
  scheduleClasses.innerHTML = clases;
}

//onclick en cards para seleccionar horario
function selectSchedule(event){
  console.log(event.target);
  //loadGroups(selectedSchedule);
}

loadGroups(selectedSchedule);

//cards de las clases a html
function classToHTML(name, code, professor, classroom, language) {
  return `
    <div class="row mb-3">
    <div class="col-4 p-0" style="width: 28%;flex: 0 0 28%;max-width: 28%; ">
      <div id="cardLeft" class="card" >
        <div class="card-body d-flex align-items-center flex-wrap justify-content-center">
          <div>
          <h6 class="card-title">${name}</h6>
          <p>${code}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col p-0 mr-3">
      <div id="cardRight" class="card">
        <div class="card-body d-flex justify-content-around align-middle flex-wrap">
          <card>Professor: ${professor} </card>
          <card>Classroom: ${classroom}</card>
          <card>Language: ${language}</card>
        </div>
      </div>
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
    //let rowNum = 0;
    let row = table.querySelector('tr:nth-of-type(n+'+rowNum+')');
    //console.log(row);

    let colNum = DaysEnum[days[i]]+1;
    console.log(name + "" + colNum);
    let col = row.querySelector('td:nth-of-type(n+'+colNum+')');
    console.log(col);

    col.innerHTML = 
    `       
    <p title="${name}" >${name}</p>
    <p title="${code}">${code}</p>
    `

   col.classList.add('table-success');
   col.classList.remove('table-light');
  }
  
}

//POST de horario con modal

//DELETE horario

//cambiar ventana
let editSchedule = document.getElementById('editSchedule');

function changeWindow(event) {
  console.log(document.getElementById('schedName').innerHTML);
  let schedName = document.getElementById('schedName').innerHTML
  //console.log(JSON.parse(readSession) );
  writeSessionStorage(schedName);
  window.location.href = 'http://localhost:8080/manage-schedule'
}