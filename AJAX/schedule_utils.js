"use strict";

//schedule que sacaste
const schedules_url = "http://localhost:8080/users/schedules/"
const group_url = "http://localhost:8080/groups/"

let schedulesList = document.getElementById('scheduleList');
console.log(schedulesList);

let email = JSON.parse(readSession()).email;
console.log(email); 

loadSchedules(schedules_url + email).then(schedules => {
  let usr_sched = schedules;
  let s = "";

  s += '<div class="card-deck justify-content-center"></div>\n';

  Object.values(usr_sched)[0].forEach(schedule => {
    let name = schedule.name;
    let period = schedule.period;

    s += scheduleCardToHTML(name, period);

     /* for(let i=0; i < schedule.groups.length; i++){
    loadClasses(group_url + schedule.groups[i]).then(group => {
        console.log(group)});
        console.log(group_url + "hola");
     
    }*/
  });
  
  schedulesList.innerHTML = s + '\n</div>';

});


//Function To HTML
function scheduleCardToHTML(name, period){
    return `
    <div class="card">
    <a id="scheduleLink" style="color: black;" class="button text-decoration-none" href>
    <div class="card-body">
      <h5 id="scheduleName" class="card-title">${name}</h5>
    </div>
    <div class="card-footer">
      <small class="text-muted">${period}</small>
    </div>
    </a>
  </div>
  `
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