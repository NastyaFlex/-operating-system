let loading = new bootstrap.Modal(document.getElementById('loading'), {
  backdrop: "static"
});
let empty_in = new bootstrap.Modal(document.getElementById('empty_in'));
let empty_in1 = new bootstrap.Modal(document.getElementById('empty_in1'));
let modal_error = new bootstrap.Modal(document.getElementById('modal_error'), {
  backdrop: "static"
});
let tweek = new XMLHttpRequest();
tweek.open('GET', `http://10.3.0.13:10005/params?token=${localStorage.getItem("chef")}`);
// // tweek.open('GET',"http://25.46.45.114:10000/reg");
// tweek.send();
// tweek.onload = function() {
//   if (tweek.status === 200) {
//     let square = document.getElementsByClassName('glav')[0];
//     let json = JSON.parse(tweek.responseText);
//     for (var name in json) {
//       let rendi = json[name];
//       let craig = document.createElement("div");
//       craig.className = "kaka";
//       //nen ljk;ty ,snm
//       let title = document.createElement("h2");
//       title.className = "title_css";
//       title.innerHTML = rendi.name;
//       craig.append(title);
//       if (rendi.type == 'input') {
//         let stan = document.createElement("input");
//         stan.className = "form-control";
//         stan.name = name;
//         stan.placeholder = rendi.placeholder;
//         stan.setAttribute("maxlength", "16");
//         craig.append(stan);
//       }
//
//       if (rendi.type == 'number') {
//         let stan = document.createElement("input");
//         stan.type = "number";
//         stan.min = rendi.min;
//         stan.max = rendi.max;
//         stan.placeholder =  "Ваш лимит " + rendi.max;
//         stan.value = rendi.default;
//         stan.className = "form-control";
//         stan.name = name;
//         craig.append(stan);
//       }
//
//       if (rendi.type == 'kenny') {
//         let kyle = document.createElement("select");
//         kyle.className = "form-select";
//         kyle.name = name;
//
//         for (i in rendi.values) {
//           let eric = document.createElement("option");
//           eric.innerHTML = rendi.values[i];
//           kyle.append(eric);
//         }
//         craig.append(kyle);
//       }
//       square.append(craig);
//     }
//     document.getElementsByClassName('square')[0].style.display = "";
//   }
// }

document.getElementsByClassName('kaka2')[0].addEventListener('submit', submitForm);

let url = `http://10.3.0.13:10005/params?token=${localStorage.getItem("chef")}` // url откуда берем информацию по машинам
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

  let rendi = Object.entries(response).map(el => el[1])


  console.log(rendi);

  for (let i = 0; i < rendi.length; i++) {

    parentEl.insertAdjacentHTML("beforeend", `
            <div id = 'craig${i}' class = 'kaka'><h2 class = 'title_css'>${rendi[i].name}</h2></div>
        `)



    if (rendi[i].type === 'input') {
      document.getElementById(`craig${i}`).insertAdjacentHTML('beforeend', `
                <input class = 'form-control' maxlength='16' placeholder = '${rendi[i].placeholder}' name = '${nameKey[i]}'>
            `)
    }

    if (rendi[i].type === 'number') {
      document.getElementById(`craig${i}`).insertAdjacentHTML('beforeend', `
                <input type="number" min="${rendi[i].min}" max="${rendi[i].max}" value="${rendi[i].default}" placeholder="${rendi[i].max}" class = 'form-control' name = '${nameKey[i]}'>
            `)
    }

    if (rendi[i].type === 'kenny') {
      document.getElementById(`craig${i}`).insertAdjacentHTML("beforeend", `
              <select id = 'kyle${i}' name = '${nameKey[i]}' class = 'form-select'>${name}</select>
            `)
      for (x in rendi[i].values) {
        document.getElementById(`kyle${i}`).insertAdjacentHTML("beforeend", `
                    <option>${rendi[i].values[x]}</option>
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

  let tweek = new XMLHttpRequest();
  console.log(`http://10.3.0.13:10005/containNameVM?name=${obj.nameVM}`);
  tweek.open('GET', `http://10.3.0.13:10005/containNameVM?name=${obj.nameVM}`);
  tweek.send(); //отправляет запрос на сервер
  create_VM_butt.disabled = true;
  tweek.onload = function() {
    if (tweek.status === 200) {
      if (tweek.response == 'true') {
        document.getElementById('error_message').innerHTML = "Смени название.";
        modal_error.show();
        create_VM_butt.disabled = false;
      } else {
        let json = JSON.stringify(obj);

        tweek.open('POST', `http://10.3.0.13:10005/createVM?token=${localStorage.getItem("chef")}`);
        tweek.send(json);
        loading.show();

        tweek.onload = function() {
          create_VM_butt.disabled = false;
          if (tweek.status === 200) {
            let myNode = document.getElementsByClassName('kaka2')[0];
            myNode.innerHTML = '';
            document.getElementById("ded").innerHTML = "Данные для входа";

            let timmi = JSON.parse(tweek.responseText);

            let bunniOne = document.createElement("div");
            bunniOne.className = 'dt';
            let bunni = document.createElement("h2");
            bunni.innerHTML = "ip:";
            let bunniTwo = document.createElement("h2");
            bunniTwo.className = "ta";
            bunniTwo.innerHTML = timmi.ip;
            bunniOne.append(bunni);
            bunniOne.append(bunniTwo);
            myNode.append(bunniOne);

            let bunniOne1 = document.createElement("div");
            bunniOne1.className = 'dt';
            let bunni1 = document.createElement("h2");
            bunni1.innerHTML = "Порт:";
            let bunniTwo1 = document.createElement("h2");
            bunniTwo1.className = "ta";
            bunniTwo1.innerHTML = timmi.port;
            bunniOne1.append(bunni1);
            myNode.append(bunniOne1);
            bunniOne1.append(bunniTwo1);
          }

          if (tweek.status === 400) {
            console.log(tweek.response);
          }
          loading.hide();
        }
      }
    }
  }
}

function creat() {
  document.location.href = "index4v2.html";
}
