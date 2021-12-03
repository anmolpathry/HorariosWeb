"use strict";

//RUTAS QUE SE USARAN
const schedule_url = "http://localhost:8080/users/schedules/";
const schedules = document.getElementById('scheduleList');
console.log("HOla");

//schedule que sacaste
/* let email = JSON.parse(readSession()).email;
console.log(email); */

loadSchedules("http://localhost:8080/users/schedules/anmol@pruebas.com").then(
    schedules => scheduleListToHTML(schedules)
);

//Function To HTML
function scheduleCard(schedule){
    return `
    <div class="card">
    <a id="scheduleLink" style="color: black;" class="button text-decoration-none" href>
    <div class="card-body">
      <h5 id="scheduleName" class="card-title">${schedule.name}</h5>
    </div>
    <div class="card-footer">
      <small class="text-muted">${schedule.period}</small>
    </div>
    </a>
  </div>
  `
}

function scheduleListToHTML(scheduleList){
    schedules.innerHTML = '<div class="card-deck justify-content-center"></div>\n' + scheduleList.map(scheduleCard).join("\n") + '\n</div>';
}

/*function classToHTML(class){
    let classes ="";

    return `
    <div class="row mb-3">
    <div class="col-4 p-0" style="width: 28%;flex: 0 0 28%;max-width: 28%; ">
      <div id="cardLeft" class="card" >
        <div class="card-body d-flex align-items-center flex-wrap justify-content-center">
          <div>
          <h6 class="card-title">Cálculo Multivariable</h6>
          <p>DESI13EF</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col p-0 mr-3">
      <div id="cardRight" class="card">
        <div class="card-body d-flex justify-content-around align-middle flex-wrap">
          <card>Professor: Maria rosales </card>
          <card>Classroom: A-208</card>
          <card>Language: Spanish</card>
        </div>
      </div>
    </div>
  </div>
    `
    return classes;
}*/