let loading = new bootstrap.Modal(document.getElementById('loading'), {
  backdrop: "static"
});
let empty_in = new bootstrap.Modal(document.getElementById('empty_in'));
let empty_in1 = new bootstrap.Modal(document.getElementById('empty_in1'));
let modal_error = new bootstrap.Modal(document.getElementById('modal_error'), {
  backdrop: "static"
});
let xhr = new XMLHttpRequest();
xhr.open('GET', `http://10.3.0.13:10005/params?token=${localStorage.getItem("token")}`);

document.getElementsByClassName('template')[0].addEventListener('submit', submitForm);

let url = `http://10.3.0.13:10005/params?token=${localStorage.getItem("token")}` // url откуда берем информацию по машинам
// запрос на сервер, раскоментировать потом TODO


async function getData() {
  const response = await fetch(url)

  const data = await response.text()

  console.log(data);
  if (response.status === 200) {
    createFormForSystem(JSON.parse(data));
  } else {
    document.getElementById('error_message').innerHTML = data;
    modal_error.show();
  }
}

getData()

const createFormForSystem = (response) => {
  // response = {"nameVM":{"name":"Имя хоста","type":"butters","OYA":true},"ram":{"name":"Оперативная память, МБ","type":"kenny","values":[1024,2048,4096],"OYA":true},"disk_size":{"name":"Размер памяти машины, ГБ","type":"kenny","values":[10,20,50],"OYA":true},"vcpus":{"name":"Количество ядер","type":"kenny","values":[1,2,4]},"os":{"name":"Тип системы","type":"kenny","values":[],"OYA":true}}

  const nameKey = Object.entries(response).map(el => el[0])

  let parentEl = document.getElementsByClassName('glav')[0];

  let parameters_for_new_system = Object.entries(response).map(el => el[1])


  console.log(parameters_for_new_system);

  for (let i = 0; i < parameters_for_new_system.length; i++) {

    parentEl.insertAdjacentHTML("beforeend", `
            <div id = 'input_for_new_system${i}' class = 'kaka'><h2 class = 'title_css'>${parameters_for_new_system[i].name}</h2></div>
        `)



    if (parameters_for_new_system[i].type === 'input') {
      document.getElementById(`input_for_new_system${i}`).insertAdjacentHTML('beforeend', `
                <input class = 'form-control' maxlength='16' placeholder = '${parameters_for_new_system[i].placeholder}' name = '${nameKey[i]}'>
            `)
    }

    if (parameters_for_new_system[i].type === 'number') {
      document.getElementById(`input_for_new_system${i}`).insertAdjacentHTML('beforeend', `
                <input type="number" min="${parameters_for_new_system[i].min}" max="${parameters_for_new_system[i].max}" value="${parameters_for_new_system[i].default}" placeholder="${parameters_for_new_system[i].max}" class = 'form-control' name = '${nameKey[i]}'>
            `)
    }

    if (parameters_for_new_system[i].type === 'kenny') {
      document.getElementById(`input_for_new_system${i}`).insertAdjacentHTML("beforeend", `
              <select id = 'kyle${i}' name = '${nameKey[i]}' class = 'form-select'>${name}</select>
            `)
      for (x in parameters_for_new_system[i].values) {
        document.getElementById(`kyle${i}`).insertAdjacentHTML("beforeend", `
                    <option value="${parameters_for_new_system[i].values[x].value}">${parameters_for_new_system[i].values[x].name}</option>
                `)
      }
    }
  }
  document.getElementsByClassName('square')[0].style.display = "";
}

function submitForm(event) {
  let create_VM_butt = document.getElementById("create_VM_butt");
  // Отменяем стандартное поведение браузера с отправкой формы
  event.preventDefault();
  // event.target — это HTML-элемент form
  let formData = new FormData(event.target);

  // Собираем данные формы в объект
  let obj = {};
  let a = false;
  formData.forEach((value, key) => {
    if (value == "") {
      empty_in.show();
      a = true;
    };
    obj[key] = value
  });
  if (a) {
    return;
  }

  let validRegEx = /[A-Za-z0-9]/
  if (obj.nameVM.match(validRegEx) == null) {
    empty_in1.show();
    return;
  }

  let xhr = new XMLHttpRequest();
  console.log(`http://10.3.0.13:10005/containNameVM?name=${obj.nameVM}`);
  xhr.open('GET', `http://10.3.0.13:10005/containNameVM?name=${obj.nameVM}`);
  xhr.send(); //отправляет запрос на сервер
  create_VM_butt.disabled = true;
  xhr.onload = function() {
    if (xhr.status === 200) {
      if (xhr.response == 'true') {
        document.getElementById('error_message').innerHTML = "Смени название.";
        modal_error.show();
        create_VM_butt.disabled = false;
      } else {
        let json = JSON.stringify(obj);
        console.log(obj);

        xhr.open('POST', `http://10.3.0.13:10005/createVM?token=${localStorage.getItem("token")}`);
        xhr.send(json);
        loading.show();

        xhr.onload = function() {
          create_VM_butt.disabled = false;
          if (xhr.status === 200) {
            let myNode = document.getElementsByClassName('template')[0];
            myNode.innerHTML = '';
            document.getElementById("name_new_system").innerHTML = "Данные для входа";

            let data_id_port = JSON.parse(xhr.responseText);

            let window_text = document.createElement("div");
            window_text.className = 'window_text';
            let ip = document.createElement("h2");
            ip.innerHTML = "ip:";
            let ip_h2 = document.createElement("h2");
            ip_h2.className = "ta";
            ip_h2.innerHTML = data_id_port.ip;
            window_text.append(ip);
            window_text.append(ip_h2);
            myNode.append(window_text);

            let window_text_if_port = document.createElement("div");
            window_text_if_port.className = 'window_text';
            let port = document.createElement("h2");
            port.innerHTML = "Порт:";
            let port_h2 = document.createElement("h2");
            port_h2.className = "ta";
            port_h2.innerHTML = data_id_port.port;
            window_text_if_port.append(port);
            myNode.append(window_text_if_port);
            window_text_if_port.append(port_h2);
          }

          if (xhr.status === 400) {
            console.log(xhr.response);
          }
          loading.hide();
        }
      }
    }
  }
}

function creat() {
  document.location.href = "/list_vm";
}
