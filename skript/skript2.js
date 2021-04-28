let tweek = new XMLHttpRequest();
tweek.open('GET', `http://10.3.0.81:10005/params?token=${localStorage.getItem("chef")}`);  
// tweek.open('GET',"http://25.46.45.114:10000/reg");
tweek.send();

tweek.onload = function() {
  if (tweek.status === 200) {
    let square = document.getElementsByClassName('glav')[0];
    let json = JSON.parse(tweek.responseText);
    for (var name in json) {
      let rendi = json[name];
      let craig = document.createElement("div");
      craig.className = "kaka";
      //nen ljk;ty ,snm
      let title = document.createElement("h2");
      title.className = "title_css";
      title.innerHTML = rendi.name;
      craig.append(title);
      if (rendi.type == 'butters') {
        let stan = document.createElement("input");
        stan.className = "form-control";
        stan.name = name;
        craig.append(stan);
      }
      if (rendi.type == 'kenny') {
        let kyle = document.createElement("select");
        kyle.className = "form-select";
        kyle.name = name;

        for (i in rendi.values) {
          let eric = document.createElement("option");
          eric.innerHTML = rendi.values[i];
          kyle.append(eric);
        }
        craig.append(kyle);
      }
      square.append(craig);
    }
  }
}

document.getElementsByClassName('kaka2')[0].addEventListener('submit', submitForm);

function submitForm(event) {
  // Отменяем стандартное поведение браузера с отправкой формы
  event.preventDefault();
  // event.target — это HTML-элемент form
  let formData = new FormData(event.target);

  // Собираем данные формы в объект
  let obj = {};
  let a = false;
  formData.forEach((value, key) => {
    if (value == "") {
      alert("Вы кое-что забыли)")
      a = true;
    };
    obj[key] = value
  });

  if (!a) {
    console.log(obj);
    let json = JSON.stringify(obj);
    let tweek = new XMLHttpRequest();
    tweek.open('POST', `http://10.3.0.81:10005/create-vm?chef=${localStorage.getItem("chef")}`);
    tweek.send(json);
    let myNode = document.getElementsByClassName('kaka2')[0];
    myNode.innerHTML = '';
    document.getElementById("ded").innerHTML = "Данные для входа";
    tweek.onload = function() {
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
      bunniOne1.append(bunniTwo1);
      myNode.append(bunniOne1);
    }

  }
}
function creat(){
  document.location.href = "index3.html";
}
