let characteristics = [];
let id_car;
let papaya = new XMLHttpRequest();
let loading = new bootstrap.Modal(document.getElementById('loading'), {
  backdrop: "static"
});
list_vm();

function list_vm() {
  papaya.open('GET', `http://10.3.0.13:10005/listVMs?token=${localStorage.getItem("chef")}`);
  papaya.send(); //отправляем запрос на сервер

  // Этот код сработает после того, как мы получим ответ сервера
  papaya.onload = function() {
    if (papaya.status != 200) {
      console.log(papaya.status + " Ошибка");
    } else {
      let jsontext = papaya.response;
      let arrVMs = JSON.parse(jsontext);
      let car = document.getElementById("car");

      if (arrVMs.length == 0) {
        document.getElementById("carEmpty").classList.remove("hide");
        return;
      } else {
        document.getElementById("carNoEmpty").classList.remove("hide");
      }

      for (let i in arrVMs) {
        let mashina = arrVMs[i];
        console.log(mashina);
        car.insertAdjacentHTML("beforeend", `<li class="dropdown-item sm" onclick="switch_car('${mashina.id}')">${mashina.name}</li>`)

        let container = document.getElementById("container");
        let characteristic = document.createElement('div');
        characteristic.style.display = "none";
        characteristic.setAttribute("id", mashina.id);
        characteristic.setAttribute("class", "content_vm");
        characteristic.insertAdjacentHTML("afterbegin", `
         <div class="name">
           <h1 class="very_big_text">${mashina.name}</h1>
         </div>
         `);

        let text = document.createElement('div');
        text.className = "text";
        for (let key in mashina.params) {
          text.insertAdjacentHTML(
            "beforeend",
            `<div>
               <div class="big_text">${mashina.params[key][0]}</div>
               <div class="kvadrat input_text small_text" name="${key}">${mashina.params[key][1]}</div>
             </div>`
          );
        }
        characteristic.append(text);

        console.log(characteristic);

        characteristics.push(characteristic);
        container.prepend(characteristic);

        if (mashina.params.status[1] == "running") {
          let turn_on = document.getElementById('turn_on');
          turn_on.classList.add("hide");
          let turn_off = document.getElementById('turn_off');
          turn_off.classList.remove("hide");
        }
        if (mashina.params.status[1] == "shut off") {
          let turn_off = document.getElementById('turn_off');
          turn_off.classList.add("hide");
          let turn_on = document.getElementById('turn_on');
          turn_on.classList.remove("hide");
        }
        //Загрузка дисков
        list_disks(mashina.id);
      }

      let car_characteristic = document.getElementById("container").firstChild;
      car_characteristic.style.display = "";

      id_car = car_characteristic.getAttribute("id");
    }
  }
}

function delete_car() {
  papaya.open('GET', `http://10.3.0.13:10005/removeVM?token=${localStorage.getItem("chef")}&vmID=${id_car}`);
  papaya.send();
  loading.show();

  papaya.onload = function() {
    if (papaya.status == 200) {
      location.reload(); //обновление страницы
    } else {
      console.log("это злобное сообщение");
    }
  }
}

function toggle_car(toggle) {

  loading.show();
  papaya.open('GET', `http://10.3.0.13:10005/toggleVM?token=${localStorage.getItem("chef")}&vmID=${id_car}&status=${toggle}`);
  papaya.send();
  papaya.onload = function() {
    if (papaya.status == 200) {
      loading.hide();
      document.getElementById("turn_on").classList.toggle("hide");
      document.getElementById("turn_off").classList.toggle("hide");
      document.getElementById(id_car).querySelector("[name=status]").innerHTML = papaya.response;
    }
  }
}

function switch_car(id) {
  if (id_car == id) {
    return
  }
  let curr_car = document.getElementById(id);
  curr_car.style.display = "";
  document.getElementById(id_car).style.display = "none";

  document.querySelector(`tbody#${CSS.escape(id)}`).style.display = "";
  document.querySelector(`tbody#${CSS.escape(id_car)}`).style.display = "none";

  id_car = id;

  if (curr_car.querySelector("[name=status]").innerHTML == "running") {
    let turn_on = document.getElementById('turn_on');
    turn_on.classList.add("hide");
    let turn_off = document.getElementById('turn_off');
    turn_off.classList.remove("hide");
  }
  if (curr_car.querySelector("[name=status]").innerHTML == "shut off") {
    let turn_off = document.getElementById('turn_off');
    turn_off.classList.add("hide");
    let turn_on = document.getElementById('turn_on');
    turn_on.classList.remove("hide");
  }
}

function vm() {
  document.location.href = "index2.html";
}

function klik() {
  document.location.href = "index2.html";
}
