let characteristics = [];
let papaya = new XMLHttpRequest();
papaya.open('GET',`http://10.3.0.81:10005/listVMs?token=${localStorage.getItem("chef")}`);
papaya.send();//отправляем запрос на сервер

// Этот код сработает после того, как мы получим ответ сервера
papaya.onload = function(){
  if(papaya.status != 200){
    console.log(papaya.status + " Ошибка");
  } else{
    let jsontext = papaya.response;
    let arrVMs = JSON.parse(jsontext);
    let car = document.getElementById("car");

     for(let i in arrVMs){
       let mashina = arrVMs[i];
       console.log(mashina);
       car.insertAdjacentHTML("beforeend",`<li class="dropdown-item sm"><span>${mashina.params.nameVM[1]}</span><img src="../res/play.svg" class="kr"><img src="../res/krestik.svg" class="kr"></li>`)

       let home = document.getElementById("home");
       let characteristic = document.createElement('div');
       characteristic.style.display = "none";
       characteristic.setAttribute("id","vm"+i);
       characteristic.setAttribute("class","content_vm");
       characteristic.insertAdjacentHTML("afterbegin", `
       <div class="name">
         <h1>${mashina.params.nameVM[1]}</h1>
       </div>
       `);
       delete mashina.params.nameVM;

       let text = document.createElement('div');
       text.className = "text";
       for(let key in mashina.params){
         text.insertAdjacentHTML(
           "beforeend",
            `<div>
             <div class="tittle_param">${mashina.params[key][0]}</div>
             <div class="kvadrat">${mashina.params[key][1]}</div>
           </div>`
         );
       }
       characteristic.append(text);

       characteristics.push(characteristic);
       home.prepend(characteristic);

       document.getElementById("vm0").style.display = "";
       console.log(characteristic);
     }
  }
}

function klik(){
    document.location.href = "index3.html";
}
